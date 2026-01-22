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
├── src/
│   ├── index.ts              # Main server file
│   ├── config/
│   │   └── database.ts       # Prisma client configuration
│   ├── dto/                  # Data Transfer Objects
│   │   ├── create-news.dto.ts
│   │   ├── update-news.dto.ts
│   │   └── news-response.dto.ts
│   └── middleware/
│       └── validation.middleware.ts
├── prisma/
│   ├── schema.prisma         # Database schema
│   └── migrations/           # Database migrations
├── uploads/                  # Uploaded images
├── scripts/
│   └── migrate-data.ts       # Data migration script
├── deploy.sh                 # Deployment script
├── DEPLOYMENT.md             # Deployment guide
└── README.md                 # This file
```

## 📝 Available Scripts

### Development
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript for production
- `npm start` - Start production server

### Database
- `npm run prisma:generate` - Generate Prisma Client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio GUI
- `npm run migrate:data` - Migrate data from old news.json

## 🔧 Технологии

- **Runtime:** Node.js 20+
- **Framework:** Express.js 4
- **Language:** TypeScript
- **ORM:** Prisma 5
- **Database:** SQLite (dev) / PostgreSQL (prod recommended)
- **Validation:** class-validator + class-transformer
- **File Upload:** Multer
- **Process Manager:** PM2 (production)

## 🔐 Authentication

Временная аутентификация (ИЗМЕНИТЬ В PRODUCTION!):
- Username: `Admin`
- Password: `admin`

## 🚢 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed VPS deployment instructions.

Quick deploy on VPS:
```bash
./deploy.sh
```

## 🗄️ Database

### Migrations
```bash
# Create migration
npm run prisma:migrate -- --name migration_name

# Apply migrations
npm run prisma:migrate

# Open Prisma Studio
npm run prisma:studio
```
