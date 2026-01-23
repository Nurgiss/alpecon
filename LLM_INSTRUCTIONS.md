# LLM Instructions for Alpecon Project

This file provides context and guidelines for any AI/LLM assistant working on the Alpecon project.

---

## Project Overview

**Alpecon** is a corporate website and business showcase for potential investors, employees, and the general public. It features company information, news articles, projects, and career opportunities.

**Tech Stack:**
- **Frontend:** React 18 + TypeScript + Vite + Tailwind CSS
- **Backend:** Express.js + TypeScript + Prisma ORM
- **Database:** SQLite (development), PostgreSQL-ready (production)
- **Deployment:** Single VPS with nginx reverse proxy

---

## Priority Order

When making changes, follow this priority:

1. **Security** - Never introduce vulnerabilities (XSS, injection, CORS issues)
2. **Simplicity** - Keep code readable and maintainable
3. **Performance** - Optimize images, lazy load, minimize bundle size

---

## Key Files & Structure

```
alpecon/
├── src/                    # Frontend (React)
│   ├── app/
│   │   ├── pages/          # Page components
│   │   ├── components/     # Reusable components
│   │   └── context/        # React contexts (language, etc.)
│   ├── services/
│   │   └── newsApi.ts      # API client
│   └── i18n/
│       └── translations.ts # Multi-language strings
├── server/                 # Backend (Express)
│   ├── src/
│   │   ├── index.ts        # Main server file
│   │   ├── config/         # Configuration (auth, etc.)
│   │   ├── dto/            # Data transfer objects
│   │   └── middleware/     # Express middleware
│   ├── prisma/
│   │   └── schema.prisma   # Database schema
│   └── uploads/            # Local file storage
└── public/                 # Static assets
```

---

## Important Conventions

### TypeScript
- Use strict typing, avoid `any` when possible
- Use interfaces for data structures
- Use enums for fixed sets of values

### React
- Functional components with hooks
- Use context for global state (language, auth)
- Keep components small and focused

### API
- All endpoints under `/api/`
- Protected routes use JWT Bearer token
- Return consistent error format: `{ error: string }`

### Multi-language
- Three languages: Russian (ru), Kazakh (kz), English (en)
- All three are equally important
- Use `getLocalizedField()` helper for language-specific content
- Translation keys in `src/i18n/translations.ts`

---

## Security Rules

**ALWAYS:**
- Validate all user inputs on the server
- Use parameterized queries (Prisma handles this)
- Check authentication on protected routes
- Sanitize file uploads

**NEVER:**
- Store sensitive data in localStorage (except JWT token for now)
- Use `eval()` or `dangerouslySetInnerHTML` without sanitization
- Commit `.env` files or secrets
- Disable CORS in production
- Log passwords or sensitive data

---

## Current Known Issues

These issues are documented and planned for fixing:

1. **Pagination** - Frontend UI exists but backend doesn't support it yet
2. **File uploads** - Stored locally, need cleanup mechanism
3. **Newsletter form** - UI exists but not functional
4. **Vacancies form** - Logs to console only, no backend

---

## Testing Changes

Before committing:

```bash
# Frontend
npm run build          # Check for build errors
npm run dev            # Test locally

# Backend
cd server
npm run build          # Check TypeScript errors
npm run dev            # Test API locally
```

---

## Deployment

The project deploys to a single VPS:

```bash
# On VPS
cd /var/www/alpecon/server
bash deploy.sh
```

Key files:
- `server/deploy.sh` - Deployment script
- `server/VPS-SETUP.md` - Full VPS setup guide
- `server/CHECKLIST.md` - Deployment checklist

---

## Environment Variables

### Frontend (.env)
```
VITE_API_URL=/api              # Production (relative)
VITE_API_URL=http://localhost:3002/api  # Development
```

### Backend (server/.env)
```
DATABASE_URL="file:./dev.db"
JWT_SECRET="<secure-random-string>"
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="<bcrypt-hash>"
NODE_ENV="production"
PORT=3002
```

---

## Common Tasks

### Add a new news field
1. Update `server/prisma/schema.prisma`
2. Run `npx prisma migrate dev --name add_field_name`
3. Update DTOs in `server/src/dto/`
4. Update `NewsItem` interface in `src/services/newsApi.ts`
5. Update frontend components as needed

### Add a new API endpoint
1. Add route in `server/src/index.ts`
2. Add auth middleware if protected: `requireAuth`
3. Update `newsApi.ts` with new method
4. Test with curl or frontend

### Add a new page
1. Create component in `src/app/pages/`
2. Add route in `src/App.tsx`
3. Add translations in `src/i18n/translations.ts`
4. Update navigation if needed

---

## Related Documentation

- `GUIDELINES.md` - Coding standards and conventions
- `PROJECT.md` - Project overview and structure
- `PLAN.md` - Project roadmap and tasks
- `server/VPS-SETUP.md` - VPS deployment guide

---

*Last updated: January 2026*
