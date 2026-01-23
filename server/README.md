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

### Security & Deployment
- `npm run generate:jwt-secret` - Generate secure JWT secret
- `npm run hash:password <password>` - Hash password with bcrypt

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

The backend uses JWT-based authentication to protect admin routes.

### Default Credentials (Development Only)
- Username: `Admin`
- Password: `admin`

**⚠️ WARNING:** These defaults are blocked in production. You MUST change them!

### Setup Production Credentials

1. **Generate JWT Secret:**
   ```bash
   npm run generate:jwt-secret
   ```
   Copy the generated secret to your `.env` file.

2. **Hash Admin Password:**
   ```bash
   npm run hash:password "YourSecurePassword"
   ```
   Copy the bcrypt hash to your `.env` file.

3. **Update .env:**
   ```env
   JWT_SECRET=<generated-secret-from-step-1>
   ADMIN_USERNAME=your_admin_username
   ADMIN_PASSWORD=<bcrypt-hash-from-step-2>
   ```

### Protected Endpoints
- `POST /api/news` - Create news (requires auth)
- `PUT /api/news/:id` - Update news (requires auth)
- `DELETE /api/news/:id` - Delete news (requires auth)
- `POST /api/upload` - Upload image (requires auth)

### Authentication Flow
1. Login: `POST /api/login` with `{username, password}`
2. Receive JWT token in response
3. Include token in requests: `Authorization: Bearer <token>`
4. Token expires after 24 hours (configurable)

## 🚢 Deployment

### Quick Start on VPS

**First time setup:**
```bash
chmod +x deploy.sh
./deploy.sh --initial
```

This will:
- Install PM2 process manager
- Setup PM2 to start on boot
- Create `.env` file from example
- Guide you through configuration

**After configuring .env:**
```bash
./deploy.sh
```

**Quick redeployments:**
```bash
./deploy.sh --skip-deps        # Skip npm install (faster)
./deploy.sh --skip-build       # Skip build (restart only)
```

### Full Guide
See [VPS-SETUP.md](./VPS-SETUP.md) for complete VPS setup guide with:
- Node.js installation
- PostgreSQL setup
- Nginx reverse proxy
- SSL certificates
- Firewall configuration
- Backup scripts

See [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment checklist and troubleshooting.

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
