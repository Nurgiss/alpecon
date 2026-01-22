const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3002/api';

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
  date: string;
  createdAt: string;
  updatedAt: string;
}

export const newsApi = {
  // Получить все новости
  async getAll(): Promise<NewsItem[]> {
    const response = await fetch(`${API_URL}/news`);
    if (!response.ok) throw new Error('Failed to fetch news');
    return response.json();
  },

  // Получить одну новость
  async getById(id: string): Promise<NewsItem> {
    const response = await fetch(`${API_URL}/news/${id}`);
    if (!response.ok) throw new Error('Failed to fetch news item');
    return response.json();
  },

  // Создать новость
  async create(data: Partial<NewsItem>): Promise<NewsItem> {
    const response = await fetch(`${API_URL}/news`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create news');
    return response.json();
  },

  // Обновить новость
  async update(id: string, data: Partial<NewsItem>): Promise<NewsItem> {
    const response = await fetch(`${API_URL}/news/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update news');
    return response.json();
  },

  // Удалить новость
  async delete(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/news/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete news');
  },
};
