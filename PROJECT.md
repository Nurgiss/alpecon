# Project Overview / Обзор проекта

## About Alpecon / О проекте

**Alpecon** is a corporate website and business showcase designed for:
- Potential investors
- Job seekers
- General public interested in company news

**Alpecon** — корпоративный сайт и бизнес-витрина, созданная для:
- Потенциальных инвесторов
- Соискателей работы
- Широкой публики, интересующейся новостями компании

---

## Tech Stack / Технологический стек

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.3.1 | UI Framework |
| TypeScript | 5.6.2 | Type Safety |
| Vite | 6.0.5 | Build Tool |
| Tailwind CSS | 3.4.17 | Styling |
| React Router | 7.1.1 | Routing |
| i18n | custom | Internationalization |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Express.js | 5.1.0 | Web Framework |
| TypeScript | 5.8.2 | Type Safety |
| Prisma | 6.2.1 | ORM |
| SQLite | - | Database (dev) |
| JWT | jsonwebtoken | Authentication |
| bcrypt | 6.0.0 | Password Hashing |
| multer | 1.4.5 | File Uploads |

### Deployment
| Technology | Purpose |
|------------|---------|
| VPS (Ubuntu) | Hosting |
| nginx | Reverse Proxy |
| PM2 | Process Manager |
| Let's Encrypt | SSL Certificates |

---

## Project Structure / Структура проекта

```
alpecon/
│
├── 📁 src/                          # Frontend source code
│   ├── 📁 app/
│   │   ├── 📁 pages/                # Page components
│   │   │   ├── Home.tsx             # Главная страница
│   │   │   ├── News.tsx             # Список новостей
│   │   │   ├── NewsDetail.tsx       # Страница новости
│   │   │   ├── About.tsx            # О компании
│   │   │   ├── Projects.tsx         # Проекты
│   │   │   ├── Contacts.tsx         # Контакты
│   │   │   ├── Vacancies.tsx        # Вакансии
│   │   │   ├── Admin.tsx            # Админ панель
│   │   │   └── AdminLogin.tsx       # Вход в админку
│   │   │
│   │   ├── 📁 components/           # Reusable components
│   │   │   ├── 📁 figma/            # Design system components
│   │   │   │   ├── Header.tsx
│   │   │   │   ├── Footer.tsx
│   │   │   │   ├── Button.tsx
│   │   │   │   └── ...
│   │   │   └── 📁 ui/               # shadcn/ui components
│   │   │
│   │   └── 📁 context/              # React contexts
│   │       └── LanguageContext.tsx  # Language state
│   │
│   ├── 📁 services/
│   │   └── newsApi.ts               # API client
│   │
│   ├── 📁 i18n/
│   │   └── translations.ts          # Translation strings
│   │
│   ├── App.tsx                      # Main app component
│   ├── main.tsx                     # Entry point
│   └── index.css                    # Global styles
│
├── 📁 server/                       # Backend source code
│   ├── 📁 src/
│   │   ├── index.ts                 # Express server
│   │   ├── 📁 config/
│   │   │   └── auth.config.ts       # JWT & auth config
│   │   ├── 📁 middleware/
│   │   │   └── auth.middleware.ts   # Auth middleware
│   │   └── 📁 dto/
│   │       ├── create-news.dto.ts   # News creation DTO
│   │       ├── update-news.dto.ts   # News update DTO
│   │       └── news-response.dto.ts # News response DTO
│   │
│   ├── 📁 prisma/
│   │   ├── schema.prisma            # Database schema
│   │   └── 📁 migrations/           # DB migrations
│   │
│   ├── 📁 uploads/                  # Uploaded files
│   ├── 📁 scripts/                  # Helper scripts
│   │   ├── generate-jwt-secret.ts
│   │   └── hash-password.ts
│   │
│   ├── deploy.sh                    # Deployment script
│   ├── VPS-SETUP.md                 # VPS setup guide
│   └── CHECKLIST.md                 # Deployment checklist
│
├── 📁 public/                       # Static assets
│
├── 📄 index.html                    # HTML entry point
├── 📄 package.json                  # Frontend dependencies
├── 📄 vite.config.ts                # Vite configuration
├── 📄 tailwind.config.js            # Tailwind configuration
├── 📄 tsconfig.json                 # TypeScript config
│
├── 📄 LLM_INSTRUCTIONS.md           # Instructions for AI assistants
├── 📄 GUIDELINES.md                 # Coding guidelines
├── 📄 PROJECT.md                    # This file
└── 📄 PLAN.md                       # Project roadmap
```

---

## Database Schema / Схема базы данных

### News Model
```prisma
model News {
  id        String   @id @default(uuid())

  // Main content
  title     String
  content   String
  category  String
  image     String
  author    String
  source    String?

  // Russian translations
  titleRu   String?
  contentRu String?
  categoryRu String?

  // Kazakh translations
  titleKz   String?
  contentKz String?
  categoryKz String?

  // English translations
  titleEn   String?
  contentEn String?
  categoryEn String?

  // Timestamps
  date      DateTime
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

---

## API Endpoints / API эндпоинты

### Public Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/news` | Get all news |
| GET | `/api/news/:id` | Get single news item |
| GET | `/health` | Health check |

### Protected Endpoints (require JWT)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/login` | Admin login |
| POST | `/api/news` | Create news |
| PUT | `/api/news/:id` | Update news |
| DELETE | `/api/news/:id` | Delete news |
| POST | `/api/upload` | Upload image |

### Authentication
```bash
# Login
curl -X POST http://localhost:3002/api/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "your-password"}'

# Use token for protected routes
curl -X POST http://localhost:3002/api/news \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"title": "News Title", "content": "Content..."}'
```

---

## Multi-language Support / Мультиязычность

The website supports three languages:
- 🇷🇺 Russian (ru) - Русский
- 🇰🇿 Kazakh (kz) - Қазақша
- 🇬🇧 English (en) - English

### Implementation
1. **UI strings** - Stored in `src/i18n/translations.ts`
2. **News content** - Stored in database with language-specific fields
3. **Language switch** - Managed by `LanguageContext`

### Usage
```typescript
// Get translation
const { t, language } = useLanguage();
const welcomeText = t('common.welcome');

// Get localized news field
const title = getLocalizedField(news, 'title', language);
```

---

## Features / Функционал

### Implemented ✅
- [x] Home page with company overview
- [x] News listing page
- [x] Individual news pages
- [x] About company page
- [x] Projects showcase
- [x] Contacts page
- [x] Vacancies page
- [x] Admin panel (CRUD for news)
- [x] JWT authentication
- [x] Image uploads
- [x] Multi-language support (RU/KZ/EN)
- [x] Responsive design

### In Progress 🔄
- [ ] News pagination
- [ ] File storage improvements

### Planned 📋
- [ ] Search functionality
- [ ] Newsletter subscriptions
- [ ] Contact form backend
- [ ] Vacancy applications

---

## Running Locally / Локальный запуск

### Prerequisites
- Node.js 18+
- npm or yarn

### Frontend
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Backend
```bash
cd server

# Install dependencies
npm install

# Setup database
npx prisma generate
npx prisma migrate dev

# Start development server
npm run dev

# Build for production
npm run build
```

---

## Team / Команда

- 2 developers with LLM assistance
- Using AI tools for development acceleration

---

## Links / Ссылки

- **Production:** https://alpecon.kz
- **API:** https://alpecon.kz/api

---

*Last updated: January 2026*
