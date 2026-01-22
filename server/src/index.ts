import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { randomUUID } from 'crypto';
import multer from 'multer';
import prisma from './config/database.js';
import { CreateNewsDTO, UpdateNewsDTO, NewsResponseDTO } from './dto/index.js';
import { validateDTO } from './middleware/validation.middleware.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3002;
const UPLOADS_DIR = path.join(__dirname, '..', 'uploads');

// Настройка multer для загрузки изображений
const storage = multer.diskStorage({
  destination: async (_req, _file, cb) => {
    await fs.mkdir(UPLOADS_DIR, { recursive: true });
    cb(null, UPLOADS_DIR);
  },
  filename: (_req, file, cb) => {
    const uniqueName = `${Date.now()}-${randomUUID()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (_req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error('Только изображения разрешены'));
    }
  }
});

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static(UPLOADS_DIR));

// Эндпоинт для авторизации
app.post('/api/login', (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (username === 'Admin' && password === 'admin') {
    // В реальном приложении здесь должен быть токен (JWT)
    res.json({ success: true, message: 'Авторизация успешна' });
  } else {
    res.status(401).json({ success: false, message: 'Неверный логин или пароль' });
  }
});

// Простой middleware для "защиты" роутов
const requireAuth = (_req: Request, _res: Response, next: NextFunction): void => {
  // В реальном приложении здесь будет проверка JWT токена
  // Для простоты, мы будем передавать "секрет" в заголовках
  // if (_req.headers.authorization === 'admin-secret-token') {
  //   next();
  // } else {
  //   _res.status(401).json({ error: 'Требуется авторизация' });
  // }
  next(); // Временно отключаем защиту для разработки
};

// Routes

// Загрузка изображения
app.post('/api/upload', requireAuth, upload.single('image'), (req: Request, res: Response): void => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'Файл не загружен' });
      return;
    }
    const imageUrl = `/uploads/${req.file.filename}`;
    res.json({ url: imageUrl });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при загрузке файла' });
  }
});

// Получить все новости
app.get('/api/news', async (_req: Request, res: Response): Promise<void> => {
  try {
    const newsList = await prisma.news.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    const response = NewsResponseDTO.fromEntities(newsList);
    res.json(response);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ error: 'Ошибка при получении новостей' });
  }
});

// Получить одну новость по ID
app.get('/api/news/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

    const news = await prisma.news.findUnique({
      where: { id }
    });

    if (!news) {
      res.status(404).json({ error: 'Новость не найдена' });
      return;
    }

    const response = NewsResponseDTO.fromEntity(news);
    res.json(response);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ error: 'Ошибка при получении новости' });
  }
});

// Создать новую новость
app.post('/api/news', requireAuth, validateDTO(CreateNewsDTO), async (req: Request, res: Response): Promise<void> => {
  try {
    const dto: CreateNewsDTO = req.body;

    const news = await prisma.news.create({
      data: {
        title: dto.title,
        content: dto.content,
        category: dto.category,
        image: dto.image || 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800',
        author: dto.author || 'Администратор',
        source: dto.source,
        date: new Date(),
        titleRu: dto.titleRu,
        titleKz: dto.titleKz,
        titleEn: dto.titleEn,
        contentRu: dto.contentRu,
        contentKz: dto.contentKz,
        contentEn: dto.contentEn,
        categoryRu: dto.categoryRu,
        categoryKz: dto.categoryKz,
        categoryEn: dto.categoryEn,
      }
    });

    const response = NewsResponseDTO.fromEntity(news);
    res.status(201).json(response);
  } catch (error) {
    console.error('Error creating news:', error);
    res.status(500).json({ error: 'Ошибка при создании новости' });
  }
});

// Обновить новость
app.put('/api/news/:id', requireAuth, validateDTO(UpdateNewsDTO, true), async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const dto: UpdateNewsDTO = req.body;

    // Check if news exists
    const existingNews = await prisma.news.findUnique({
      where: { id }
    });

    if (!existingNews) {
      res.status(404).json({ error: 'Новость не найдена' });
      return;
    }

    // Update news
    const updatedNews = await prisma.news.update({
      where: { id },
      data: {
        title: dto.title,
        content: dto.content,
        category: dto.category,
        image: dto.image,
        author: dto.author,
        source: dto.source,
        titleRu: dto.titleRu,
        titleKz: dto.titleKz,
        titleEn: dto.titleEn,
        contentRu: dto.contentRu,
        contentKz: dto.contentKz,
        contentEn: dto.contentEn,
        categoryRu: dto.categoryRu,
        categoryKz: dto.categoryKz,
        categoryEn: dto.categoryEn,
      }
    });

    const response = NewsResponseDTO.fromEntity(updatedNews);
    res.json(response);
  } catch (error) {
    console.error('Error updating news:', error);
    res.status(500).json({ error: 'Ошибка при обновлении новости' });
  }
});

// Удалить новость
app.delete('/api/news/:id', requireAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

    // Check if news exists
    const existingNews = await prisma.news.findUnique({
      where: { id }
    });

    if (!existingNews) {
      res.status(404).json({ error: 'Новость не найдена' });
      return;
    }

    await prisma.news.delete({
      where: { id }
    });

    res.json({ message: 'Новость удалена успешно' });
  } catch (error) {
    console.error('Error deleting news:', error);
    res.status(500).json({ error: 'Ошибка при удалении новости' });
  }
});

// Health check
app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`✅ Сервер запущен на порту ${PORT}`);
  console.log(`📰 API новостей: http://localhost:${PORT}/api/news`);
  console.log(`❤️  Health check: http://localhost:${PORT}/health`);
});
