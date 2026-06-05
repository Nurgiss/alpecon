import { compressImage } from '@/utils/compressImage';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3002/api';

// Base URL for uploads (extracted from API_URL)
const getBaseUrl = (): string => {
  // If API_URL is relative (e.g., '/api'), return empty string (same origin)
  if (API_URL.startsWith('/')) {
    return '';
  }
  // Otherwise extract base URL (e.g., 'http://localhost:3002' from 'http://localhost:3002/api')
  try {
    const url = new URL(API_URL);
    return url.origin;
  } catch {
    return '';
  }
};

// Build full URL for uploaded images
export const getUploadUrl = (path: string): string => {
  const baseUrl = getBaseUrl();
  return `${baseUrl}${path}`;
};

// Token storage key
const TOKEN_KEY = 'alpecon_admin_token';

export interface NewsItem {
  id: string;
  title: string;
  titleRu?: string | null;
  titleKz?: string | null;
  titleEn?: string | null;
  content: string;
  contentRu?: string | null;
  contentKz?: string | null;
  contentEn?: string | null;
  category: string;
  categoryRu?: string | null;
  categoryKz?: string | null;
  categoryEn?: string | null;
  image: string;
  author: string;
  source?: string | null;
  date: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  token?: string;
  username?: string;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface PaginatedNewsResponse {
  data: NewsItem[];
  pagination: PaginationInfo;
}

// Helper function to get auth headers
const getAuthHeaders = (): HeadersInit => {
  const token = localStorage.getItem(TOKEN_KEY);
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const newsApi = {
  // Authentication
  async login(username: string, password: string): Promise<LoginResponse> {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    // Store token if login successful
    if (data.success && data.token) {
      localStorage.setItem(TOKEN_KEY, data.token);
    }

    return data;
  },

  logout() {
    localStorage.removeItem(TOKEN_KEY);
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem(TOKEN_KEY);
  },

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },

  // Получить новости с пагинацией
  async getAll(page = 1, limit = 12): Promise<PaginatedNewsResponse> {
    const response = await fetch(`${API_URL}/news?page=${page}&limit=${limit}`);
    if (!response.ok) throw new Error('Failed to fetch news');
    return response.json();
  },

  // Получить одну новость
  async getById(id: string): Promise<NewsItem> {
    const response = await fetch(`${API_URL}/news/${id}`);
    if (!response.ok) throw new Error('Failed to fetch news item');
    return response.json();
  },

  // Создать новость (требует авторизации)
  async create(data: Partial<NewsItem>): Promise<NewsItem> {
    const response = await fetch(`${API_URL}/news`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });

    if (response.status === 401) {
      throw new Error('UNAUTHORIZED');
    }
    if (!response.ok) throw new Error('Failed to create news');
    return response.json();
  },

  // Обновить новость (требует авторизации)
  async update(id: string, data: Partial<NewsItem>): Promise<NewsItem> {
    const response = await fetch(`${API_URL}/news/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });

    if (response.status === 401) {
      throw new Error('UNAUTHORIZED');
    }
    if (!response.ok) throw new Error('Failed to update news');
    return response.json();
  },

  // Удалить новость (требует авторизации)
  async delete(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/news/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });

    if (response.status === 401) {
      throw new Error('UNAUTHORIZED');
    }
    if (!response.ok) throw new Error('Failed to delete news');
  },

  // Загрузить изображение (требует авторизации, с автосжатием)
  async uploadImage(file: File): Promise<{ url: string }> {
    const compressed = await compressImage(file);
    const formData = new FormData();
    formData.append('image', compressed);

    const token = localStorage.getItem(TOKEN_KEY);
    const response = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: formData,
    });

    if (response.status === 401) {
      throw new Error('UNAUTHORIZED');
    }

    if (response.status === 413) {
      throw new Error('Файл слишком большой (макс. 10 МБ)');
    }

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const message =
        typeof data?.error === 'string'
          ? data.error
          : response.status === 413
            ? 'Файл слишком большой (макс. 10 МБ)'
            : `Ошибка загрузки (код ${response.status})`;
      throw new Error(message);
    }

    return data as { url: string };
  },
};
