# Coding Guidelines / Руководство по коду

This document defines coding standards and conventions for the Alpecon project.

Этот документ определяет стандарты кодирования для проекта Alpecon.

---

## General Principles / Общие принципы

### English
1. **Keep it simple** - Write code that is easy to read and understand
2. **Security first** - Never sacrifice security for convenience
3. **Consistency** - Follow existing patterns in the codebase
4. **Pragmatic approach** - Use what works best for the situation

### Русский
1. **Простота** - Пишите код, который легко читать и понимать
2. **Безопасность** - Никогда не жертвуйте безопасностью ради удобства
3. **Последовательность** - Следуйте существующим паттернам в коде
4. **Прагматичность** - Используйте то, что лучше подходит для ситуации

---

## TypeScript

### Typing
```typescript
// GOOD: Explicit types
interface NewsItem {
  id: string;
  title: string;
  content: string;
}

// GOOD: Function with types
function getNews(id: string): Promise<NewsItem> {
  return fetch(`/api/news/${id}`).then(res => res.json());
}

// BAD: Avoid 'any'
function processData(data: any) { ... }

// BETTER: Use unknown and type guards
function processData(data: unknown) {
  if (isNewsItem(data)) {
    // Now TypeScript knows the type
  }
}
```

### Enums
```typescript
// GOOD: Use enums for fixed values
export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

// BAD: String literals
const role = 'admin'; // No type safety
```

### Null Handling
```typescript
// GOOD: Optional chaining
const title = news?.title ?? 'Untitled';

// GOOD: Explicit null checks
if (news !== null && news !== undefined) {
  processNews(news);
}
```

---

## React Components

### Component Structure
```typescript
// GOOD: Functional component with hooks
export function NewsCard({ news }: NewsCardProps) {
  const { language } = useLanguage();
  const [loading, setLoading] = useState(false);

  // Event handlers
  const handleClick = () => { ... };

  // Effects
  useEffect(() => { ... }, [dependency]);

  // Render
  return (
    <div className="news-card">
      {/* content */}
    </div>
  );
}
```

### Props Interface
```typescript
// GOOD: Define props interface
interface NewsCardProps {
  news: NewsItem;
  onDelete?: (id: string) => void;
  className?: string;
}

// GOOD: Destructure props
export function NewsCard({ news, onDelete, className }: NewsCardProps) {
  ...
}
```

### Hooks
```typescript
// GOOD: Custom hook for reusable logic
export function useNews() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    newsApi.getAll().then(setNews).finally(() => setLoading(false));
  }, []);

  return { news, loading };
}
```

---

## API & Backend

### Express Routes
```typescript
// GOOD: Typed request handlers
app.get('/api/news/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const news = await prisma.news.findUnique({ where: { id } });

    if (!news) {
      res.status(404).json({ error: 'News not found' });
      return;
    }

    res.json(news);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
```

### Error Responses
```typescript
// GOOD: Consistent error format
res.status(400).json({ error: 'Validation failed', details: errors });
res.status(401).json({ error: 'Authentication required' });
res.status(404).json({ error: 'Resource not found' });
res.status(500).json({ error: 'Internal server error' });
```

### Authentication
```typescript
// GOOD: Use middleware for protected routes
app.post('/api/news', requireAuth, async (req, res) => {
  // Only authenticated users reach here
});

// GOOD: Check role if needed
if (req.user?.role !== UserRole.ADMIN) {
  res.status(403).json({ error: 'Admin access required' });
  return;
}
```

---

## Multi-language Support

### Localized Fields
```typescript
// GOOD: Helper function for localized content
function getLocalizedField(
  item: NewsItem,
  field: 'title' | 'content' | 'category',
  language: string
): string {
  const langField = `${field}${language.charAt(0).toUpperCase() + language.slice(1)}`;
  return (item as any)[langField] || item[field];
}

// Usage
const title = getLocalizedField(news, 'title', language);
```

### Translations
```typescript
// GOOD: Structured translation keys
const translations = {
  ru: {
    common: {
      loading: 'Загрузка...',
      error: 'Ошибка',
    },
    news: {
      title: 'Новости',
      readMore: 'Читать далее',
    },
  },
  kz: { ... },
  en: { ... },
};
```

---

## CSS / Styling

### Tailwind Classes
```tsx
// GOOD: Readable class organization
<div className={`
  flex flex-col gap-4
  p-6 rounded-lg
  bg-white shadow-md
  hover:shadow-lg transition-shadow
`}>

// GOOD: Conditional classes
<button className={`
  px-4 py-2 rounded
  ${isActive ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}
`}>
```

### Responsive Design
```tsx
// GOOD: Mobile-first approach
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Cards */}
</div>
```

---

## File Organization

### Naming Conventions
```
Components:     PascalCase.tsx     (NewsCard.tsx)
Pages:          PascalCase.tsx     (NewsDetail.tsx)
Utilities:      camelCase.ts       (formatDate.ts)
Types:          camelCase.ts       (newsTypes.ts)
Constants:      UPPER_SNAKE_CASE   (API_URL)
```

### Import Order
```typescript
// 1. External libraries
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// 2. Internal modules
import { useLanguage } from '../context/LanguageContext';
import { newsApi } from '../services/newsApi';

// 3. Types
import type { NewsItem } from '../services/newsApi';

// 4. Styles/assets
import './NewsCard.css';
```

---

## Git & Commits

### Commit Messages
```bash
# GOOD: Descriptive commit messages
git commit -m "Add pagination to news API endpoint"
git commit -m "Fix authentication token refresh bug"
git commit -m "Update Russian translations for news page"

# BAD: Vague messages
git commit -m "fix"
git commit -m "update"
git commit -m "changes"
```

### Branch Names
```bash
# Feature branches
feature/news-pagination
feature/file-upload-cloud

# Bug fixes
fix/login-token-refresh
fix/image-loading-error

# Improvements
improve/news-performance
improve/admin-ux
```

---

## Security Checklist

Before committing code, verify:

- [ ] No secrets or API keys in code
- [ ] User inputs are validated
- [ ] SQL queries use parameterized values (Prisma handles this)
- [ ] File uploads are validated (type, size)
- [ ] Authentication checked on protected routes
- [ ] No `console.log` with sensitive data
- [ ] Error messages don't expose internal details

---

## Performance Checklist

- [ ] Images are optimized (WebP, proper dimensions)
- [ ] Large lists use pagination
- [ ] API calls are not duplicated
- [ ] Components don't re-render unnecessarily
- [ ] No memory leaks (cleanup in useEffect)

---

*Last updated: January 2026*
