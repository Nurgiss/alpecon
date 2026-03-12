import 'reflect-metadata';
import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import bodyParser from 'body-parser';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { randomUUID } from 'crypto';
import multer from 'multer';
import prisma from './config/database.js';
import { CreateNewsDTO, UpdateNewsDTO, NewsResponseDTO } from './dto/index.js';
import { validateDTO } from './middleware/validation.middleware.js';
import { requireAuth } from './middleware/auth.middleware.js';
import { AUTH_CONFIG, generateToken, verifyPassword } from './config/auth.config.js';

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

// CORS configuration
const corsOrigins = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(',').map(origin => origin.trim())
  : [
      'http://localhost:5173', 
      'http://localhost:5174', 
      'http://82.115.43.184',
      'http://alpecon.kz', 
      'https://alpecon.kz',
      'https://www.alpecon.kz'
    ];

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    // Log the incoming origin for debugging
    console.log('🔍 CORS request from origin:', origin);
    console.log('📋 Allowed origins:', corsOrigins);
    
    // Allow all origins for now to debug
    console.log('✅ Origin allowed (debug mode)');
    callback(null, true);
  },
  credentials: true,
};

// Rate limiting for login endpoint
const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per window
  message: {
    success: false,
    message: 'Слишком много попыток входа. Попробуйте через 15 минут.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Middleware
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static(UPLOADS_DIR));

// Эндпоинт для авторизации с JWT (rate limited)
app.post('/api/login', loginRateLimiter, async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      res.status(400).json({
        success: false,
        message: 'Логин и пароль обязательны'
      });
      return;
    }

    // Check username (case-insensitive)
    if (username.toLowerCase() !== AUTH_CONFIG.adminUsername.toLowerCase()) {
      res.status(401).json({
        success: false,
        message: 'Неверный логин или пароль'
      });
      return;
    }

    // Verify password (supports both plain text and bcrypt hash)
    const isPasswordValid = await verifyPassword(password, AUTH_CONFIG.adminPassword);

    if (!isPasswordValid) {
      res.status(401).json({
        success: false,
        message: 'Неверный логин или пароль'
      });
      return;
    }

    // Generate JWT token
    const token = generateToken(username);

    res.json({
      success: true,
      message: 'Авторизация успешна',
      token,
      username
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Ошибка сервера при авторизации'
    });
  }
});

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

// Получить все новости (с пагинацией)
app.get('/api/news', async (req: Request, res: Response): Promise<void> => {
  try {
    // Parse pagination parameters
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit as string) || 12));
    const skip = (page - 1) * limit;

    // Get total count and paginated data in parallel
    const [total, newsList] = await Promise.all([
      prisma.news.count(),
      prisma.news.findMany({
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
    ]);

    const data = NewsResponseDTO.fromEntities(newsList);
    const pages = Math.ceil(total / limit);

    res.json({
      data,
      pagination: {
        page,
        limit,
        total,
        pages,
      },
    });
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
        date: dto.date ? new Date(dto.date) : new Date(),
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
        ...(dto.date ? { date: new Date(dto.date) } : {}),
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

// Отправка заявки на вакансию → Telegram
app.post('/api/apply', async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, phone, position, experience, message } = req.body;

    if (!name || !email || !phone || !position) {
      res.status(400).json({ success: false, message: 'Заполните обязательные поля' });
      return;
    }

    const experienceLabels: Record<string, string> = {
      'no-experience': 'Без опыта',
      '1-3': '1–3 года',
      '3-5': '3–5 лет',
      '5+': 'Более 5 лет',
    };

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.warn('⚠️  Telegram не настроен. Заявка получена:', { name, email, phone, position });
      res.json({ success: true, message: 'Заявка получена' });
      return;
    }

    const text = [
      `🟢 <b>Новая заявка на вакансию</b>`,
      ``,
      `👤 <b>ФИО:</b> ${name}`,
      `📧 <b>Email:</b> ${email}`,
      `📞 <b>Телефон:</b> ${phone}`,
      `💼 <b>Должность:</b> ${position}`,
      `🕐 <b>Опыт:</b> ${experienceLabels[experience] || experience || '—'}`,
      message ? `📝 <b>Сообщение:</b> ${message}` : null,
    ].filter(Boolean).join('\n');

    const tgRes = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' }),
      }
    );

    if (!tgRes.ok) {
      const err = await tgRes.text();
      throw new Error(`Telegram error: ${err}`);
    }

    console.log(`✅ Заявка отправлена в Telegram: ${name} → ${position}`);
    res.json({ success: true, message: 'Заявка отправлена' });
  } catch (error) {
    console.error('Ошибка отправки заявки:', error);
    res.status(500).json({ success: false, message: 'Ошибка сервера' });
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
