import { Router, Request, Response } from 'express';
import prisma from '../config/database.js';
import { requireAuth } from '../middleware/auth.middleware.js';
import { DEFAULT_BLOCKS, type BlockType } from '../data/default-blocks.js';

const router = Router();
const VALID_TYPES: BlockType[] = ['direction', 'team', 'project'];

function parseFields(value: string): Record<string, string> {
  try {
    const parsed = JSON.parse(value);
    return typeof parsed === 'object' && parsed !== null ? parsed : {};
  } catch {
    return {};
  }
}

function formatBlock(block: {
  id: string;
  type: string;
  sortOrder: number;
  image: string;
  active: boolean;
  fieldsRu: string;
  fieldsKz: string;
  fieldsEn: string;
  updatedAt: Date;
}) {
  return {
    id: block.id,
    type: block.type,
    sortOrder: block.sortOrder,
    image: block.image,
    active: block.active,
    fields: {
      ru: parseFields(block.fieldsRu),
      kz: parseFields(block.fieldsKz),
      en: parseFields(block.fieldsEn),
    },
    updatedAt: block.updatedAt.toISOString(),
  };
}

const BROKEN_IT_PLATFORM_IMAGE =
  'https://images.unsplash.com/photo-1744230673231-865d54a0aba4?w=800&auto=format&fit=crop';
const IT_PLATFORM_IMAGE = '/images/it-platform.jpg';

async function repairBrokenImages(): Promise<void> {
  const updated = await prisma.contentBlock.updateMany({
    where: { image: BROKEN_IT_PLATFORM_IMAGE },
    data: { image: IT_PLATFORM_IMAGE },
  });

  if (updated.count > 0) {
    console.log(`✅ Repaired ${updated.count} block image(s) with broken IT platform URL`);
  }
}

async function ensureSeeded(type?: BlockType): Promise<void> {
  const typesToSeed = type ? [type] : VALID_TYPES;

  for (const blockType of typesToSeed) {
    const count = await prisma.contentBlock.count({ where: { type: blockType } });
    if (count > 0) continue;

    const seeds = DEFAULT_BLOCKS.filter((b) => b.type === blockType);
    for (const seed of seeds) {
      await prisma.contentBlock.create({
        data: {
          type: seed.type,
          sortOrder: seed.sortOrder,
          image: seed.image,
          fieldsRu: JSON.stringify(seed.fieldsRu),
          fieldsKz: JSON.stringify(seed.fieldsKz),
          fieldsEn: JSON.stringify(seed.fieldsEn),
        },
      });
    }
    console.log(`✅ Seeded ${seeds.length} ${blockType} blocks`);
  }
}

// GET /api/blocks?type=direction
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const type = req.query.type as string | undefined;

    if (type && !VALID_TYPES.includes(type as BlockType)) {
      res.status(400).json({ error: 'Неизвестный тип блока' });
      return;
    }

    await ensureSeeded(type as BlockType | undefined);
    await repairBrokenImages();

    const blocks = await prisma.contentBlock.findMany({
      where: {
        ...(type ? { type } : {}),
        active: true,
      },
      orderBy: { sortOrder: 'asc' },
    });

    res.json(blocks.map(formatBlock));
  } catch (error) {
    console.error('Error fetching blocks:', error);
    res.status(500).json({ error: 'Ошибка при получении блоков' });
  }
});

// GET /api/blocks/all — includes inactive (admin)
router.get('/all', requireAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const type = req.query.type as string | undefined;

    if (type && !VALID_TYPES.includes(type as BlockType)) {
      res.status(400).json({ error: 'Неизвестный тип блока' });
      return;
    }

    await ensureSeeded(type as BlockType | undefined);
    await repairBrokenImages();

    const blocks = await prisma.contentBlock.findMany({
      where: type ? { type } : {},
      orderBy: { sortOrder: 'asc' },
    });

    res.json(blocks.map(formatBlock));
  } catch (error) {
    console.error('Error fetching all blocks:', error);
    res.status(500).json({ error: 'Ошибка при получении блоков' });
  }
});

// POST /api/blocks
router.post('/', requireAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const { type, image, fields, active } = req.body;

    if (!type || !VALID_TYPES.includes(type)) {
      res.status(400).json({ error: 'Укажите тип: direction, team или project' });
      return;
    }

    const maxOrder = await prisma.contentBlock.aggregate({
      where: { type },
      _max: { sortOrder: true },
    });

    const block = await prisma.contentBlock.create({
      data: {
        type,
        sortOrder: (maxOrder._max.sortOrder ?? -1) + 1,
        image: image || '',
        active: active !== false,
        fieldsRu: JSON.stringify(fields?.ru || {}),
        fieldsKz: JSON.stringify(fields?.kz || {}),
        fieldsEn: JSON.stringify(fields?.en || {}),
      },
    });

    res.status(201).json(formatBlock(block));
  } catch (error) {
    console.error('Error creating block:', error);
    res.status(500).json({ error: 'Ошибка при создании блока' });
  }
});

// PUT /api/blocks/reorder
router.put('/reorder', requireAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const { type, ids } = req.body as { type: BlockType; ids: string[] };

    if (!type || !VALID_TYPES.includes(type) || !Array.isArray(ids)) {
      res.status(400).json({ error: 'Требуются type и ids' });
      return;
    }

    await Promise.all(
      ids.map((id, index) =>
        prisma.contentBlock.update({
          where: { id },
          data: { sortOrder: index },
        })
      )
    );

    const blocks = await prisma.contentBlock.findMany({
      where: { type },
      orderBy: { sortOrder: 'asc' },
    });

    res.json(blocks.map(formatBlock));
  } catch (error) {
    console.error('Error reordering blocks:', error);
    res.status(500).json({ error: 'Ошибка при изменении порядка' });
  }
});

// PUT /api/blocks/:id
router.put('/:id', requireAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const { image, fields, active } = req.body;

    const existing = await prisma.contentBlock.findUnique({ where: { id } });
    if (!existing) {
      res.status(404).json({ error: 'Блок не найден' });
      return;
    }

    const block = await prisma.contentBlock.update({
      where: { id },
      data: {
        ...(image !== undefined ? { image } : {}),
        ...(active !== undefined ? { active } : {}),
        ...(fields?.ru ? { fieldsRu: JSON.stringify(fields.ru) } : {}),
        ...(fields?.kz ? { fieldsKz: JSON.stringify(fields.kz) } : {}),
        ...(fields?.en ? { fieldsEn: JSON.stringify(fields.en) } : {}),
      },
    });

    res.json(formatBlock(block));
  } catch (error) {
    console.error('Error updating block:', error);
    res.status(500).json({ error: 'Ошибка при обновлении блока' });
  }
});

// DELETE /api/blocks/:id
router.delete('/:id', requireAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

    const existing = await prisma.contentBlock.findUnique({ where: { id } });
    if (!existing) {
      res.status(404).json({ error: 'Блок не найден' });
      return;
    }

    await prisma.contentBlock.delete({ where: { id } });
    res.json({ message: 'Блок удалён' });
  } catch (error) {
    console.error('Error deleting block:', error);
    res.status(500).json({ error: 'Ошибка при удалении блока' });
  }
});

export default router;
