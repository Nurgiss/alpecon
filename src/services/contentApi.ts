import type { AllContentResponse, PageContentData } from '@/utils/contentHelpers';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3002/api';
const TOKEN_KEY = 'alpecon_admin_token';

const getAuthHeaders = (): HeadersInit => {
  const token = localStorage.getItem(TOKEN_KEY);
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const contentApi = {
  async getAll(): Promise<AllContentResponse> {
    const response = await fetch(`${API_URL}/content`);
    if (!response.ok) throw new Error('Failed to fetch content');
    return response.json();
  },

  async getPage(pageKey: string): Promise<PageContentData> {
    const response = await fetch(`${API_URL}/content/${pageKey}`);
    if (!response.ok) throw new Error('Failed to fetch page content');
    return response.json();
  },

  async savePage(
    pageKey: string,
    data: { ru: Record<string, unknown>; kz: Record<string, unknown>; en: Record<string, unknown> }
  ): Promise<PageContentData> {
    const response = await fetch(`${API_URL}/content/${pageKey}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });

    if (response.status === 401) throw new Error('UNAUTHORIZED');
    if (!response.ok) throw new Error('Failed to save content');
    return response.json();
  },
};
