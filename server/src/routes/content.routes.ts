import { Router, Request, Response } from 'express';
import prisma from '../config/database.js';
import { requireAuth } from '../middleware/auth.middleware.js';
import { isValidPageKey } from '../config/content-pages.js';

const router = Router();

function parseJson(value: string): Record<string, unknown> {
  try {
    const parsed = JSON.parse(value);
    return typeof parsed === 'object' && parsed !== null && !Array.isArray(parsed)
      ? parsed as Record<string, unknown>
      : {};
  } catch {
    return {};
  }
}

function formatPageContent(record: {
  pageKey: string;
  contentRu: string;
  contentKz: string;
  contentEn: string;
  updatedAt: Date;
}) {
  return {
    pageKey: record.pageKey,
    ru: parseJson(record.contentRu),
    kz: parseJson(record.contentKz),
    en: parseJson(record.contentEn),
    updatedAt: record.updatedAt.toISOString(),
  };
}

// GET /api/content — all saved page overrides
router.get('/', async (_req: Request, res: Response): Promise<void> => {
  try {
    const records = await prisma.pageContent.findMany({
      orderBy: { pageKey: 'asc' },
    });

    const result: Record<string, ReturnType<typeof formatPageContent>> = {};
    for (const record of records) {
      result[record.pageKey] = formatPageContent(record);
    }

    res.json(result);
  } catch (error) {
    console.error('Error fetching content:', error);
    res.status(500).json({ error: 'Ошибка при получении контента' });
  }
});

// GET /api/content/:pageKey
router.get('/:pageKey', async (req: Request, res: Response): Promise<void> => {
  try {
    const pageKey = Array.isArray(req.params.pageKey) ? req.params.pageKey[0] : req.params.pageKey;

    if (!isValidPageKey(pageKey)) {
      res.status(400).json({ error: 'Неизвестная страница' });
      return;
    }

    const record = await prisma.pageContent.findUnique({ where: { pageKey } });

    if (!record) {
      res.json({ pageKey, ru: {}, kz: {}, en: {}, updatedAt: null });
      return;
    }

    res.json(formatPageContent(record));
  } catch (error) {
    console.error('Error fetching page content:', error);
    res.status(500).json({ error: 'Ошибка при получении контента страницы' });
  }
});

// PUT /api/content/:pageKey — save page content (auth required)
router.put('/:pageKey', requireAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const pageKey = Array.isArray(req.params.pageKey) ? req.params.pageKey[0] : req.params.pageKey;

    if (!isValidPageKey(pageKey)) {
      res.status(400).json({ error: 'Неизвестная страница' });
      return;
    }

    const { ru, kz, en } = req.body;

    if (!ru || !kz || !en || typeof ru !== 'object' || typeof kz !== 'object' || typeof en !== 'object') {
      res.status(400).json({ error: 'Требуются объекты ru, kz и en' });
      return;
    }

    const record = await prisma.pageContent.upsert({
      where: { pageKey },
      create: {
        pageKey,
        contentRu: JSON.stringify(ru),
        contentKz: JSON.stringify(kz),
        contentEn: JSON.stringify(en),
      },
      update: {
        contentRu: JSON.stringify(ru),
        contentKz: JSON.stringify(kz),
        contentEn: JSON.stringify(en),
      },
    });

    res.json(formatPageContent(record));
  } catch (error) {
    console.error('Error saving page content:', error);
    res.status(500).json({ error: 'Ошибка при сохранении контента' });
  }
});

export default router;
