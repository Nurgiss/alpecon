# Alpecon Group Backend API

TypeScript + Express + Prisma backend для управления новостями на сайте Alpecon Group.

## 🚀 Quick Start

### Development

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Generate Prisma Client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Start development server
npm run dev
```

Сервер запустится на `http://localhost:3002`

## 📡 API Endpoints

### Получить все новости
```
GET /api/news
```

### Получить одну новость
```
GET /api/news/:id
```

### Создать новость
```
POST /api/news
Content-Type: application/json

{
  "title": "Заголовок новости",
  "content": "Содержание новости",
  "image": "URL изображения (опционально)",
  "category": "Категория (опционально)",
  "author": "Автор (опционально)"
}
```

### Обновить новость
```
PUT /api/news/:id
Content-Type: application/json

{
  "title": "Новый заголовок",
  "content": "Новое содержание"
}
```

### Удалить новость
```
DELETE /api/news/:id
```

### Health Check
```
GET /health
```

## 📁 Структура

```
server/
├── index.js          # Основной файл сервера
├── package.json      # Зависимости
├── data/
│   └── news.json    # Хранилище новостей
└── README.md        # Документация
```

## 🔧 Технологии

- Node.js
- Express.js
- CORS
- UUID для генерации ID
- Файловое хранилище (JSON)
