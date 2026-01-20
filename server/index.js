import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3002;
const NEWS_FILE = path.join(__dirname, 'data', 'news.json');
const UPLOADS_DIR = path.join(__dirname, 'uploads');

// Настройка multer для загрузки изображений
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    await fs.mkdir(UPLOADS_DIR, { recursive: true });
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
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
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'Admin' && password === 'admin') {
    // В реальном приложении здесь должен быть токен (JWT)
    res.json({ success: true, message: 'Авторизация успешна' });
  } else {
    res.status(401).json({ success: false, message: 'Неверный логин или пароль' });
  }
});

// Простой middleware для "защиты" роутов
const requireAuth = (req, res, next) => {
  // В реальном приложении здесь будет проверка JWT токена
  // Для простоты, мы будем передавать "секрет" в заголовках
  if (req.headers.authorization === 'admin-secret-token') {
    next();
  } else {
    // res.status(401).json({ error: 'Требуется авторизация' });
    next(); // Временно отключаем защиту для разработки
  }
};

// Утилиты для работы с файлами
async function readNews() {
  try {
    const data = await fs.readFile(NEWS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function writeNews(news) {
  await fs.mkdir(path.dirname(NEWS_FILE), { recursive: true });
  await fs.writeFile(NEWS_FILE, JSON.stringify(news, null, 2));
}

// Routes

// Загрузка изображения
app.post('/api/upload', requireAuth, upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Файл не загружен' });
    }
    const imageUrl = `/uploads/${req.file.filename}`;
    res.json({ url: imageUrl });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при загрузке файла' });
  }
});

// Получить все новости
app.get('/api/news', async (req, res) => {
  try {
    const news = await readNews();
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при получении новостей' });
  }
});

// Получить одну новость по ID
app.get('/api/news/:id', async (req, res) => {
  try {
    const news = await readNews();
    const newsItem = news.find(item => item.id === req.params.id);
    
    if (!newsItem) {
      return res.status(404).json({ error: 'Новость не найдена' });
    }
    
    res.json(newsItem);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при получении новости' });
  }
});

// Создать новую новость
app.post('/api/news', requireAuth, async (req, res) => {
  try {
    const { 
      title, content, image, category, author,
      title_ru, title_kz, title_en,
      content_ru, content_kz, content_en,
      category_ru, category_kz, category_en
    } = req.body;
    
    if (!title || !content) {
      return res.status(400).json({ error: 'Заголовок и содержание обязательны' });
    }
    
    const news = await readNews();
    
    const newNewsItem = {
      id: uuidv4(),
      title,
      content,
      image: image || 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800',
      category: category || 'Общее',
      author: author || 'Администратор',
      date: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      // Мультиязычные поля
      title_ru,
      title_kz,
      title_en,
      content_ru,
      content_kz,
      content_en,
      category_ru,
      category_kz,
      category_en
    };
    
    news.unshift(newNewsItem);
    await writeNews(news);
    
    res.status(201).json(newNewsItem);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при создании новости' });
  }
});

// Обновить новость
app.put('/api/news/:id', requireAuth, async (req, res) => {
  try {
    const news = await readNews();
    const index = news.findIndex(item => item.id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({ error: 'Новость не найдена' });
    }
    
    const { 
      title, content, image, category, author,
      title_ru, title_kz, title_en,
      content_ru, content_kz, content_en,
      category_ru, category_kz, category_en
    } = req.body;
    
    news[index] = {
      ...news[index],
      title: title || news[index].title,
      content: content || news[index].content,
      image: image || news[index].image,
      category: category || news[index].category,
      author: author || news[index].author,
      title_ru,
      title_kz,
      title_en,
      content_ru,
      content_kz,
      content_en,
      category_ru,
      category_kz,
      category_en,
      updatedAt: new Date().toISOString()
    };
    
    await writeNews(news);
    res.json(news[index]);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при обновлении новости' });
  }
});

// Удалить новость
app.delete('/api/news/:id', requireAuth, async (req, res) => {
  try {
    const news = await readNews();
    const filteredNews = news.filter(item => item.id !== req.params.id);
    
    if (news.length === filteredNews.length) {
      return res.status(404).json({ error: 'Новость не найдена' });
    }
    
    await writeNews(filteredNews);
    res.json({ message: 'Новость удалена успешно' });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при удалении новости' });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`✅ Сервер запущен на порту ${PORT}`);
  console.log(`📰 API новостей: http://localhost:${PORT}/api/news`);
  console.log(`❤️  Health check: http://localhost:${PORT}/health`);
});
