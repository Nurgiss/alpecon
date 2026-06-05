import type { BlockType, ContentBlock } from '@/types/blocks';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3002/api';
const TOKEN_KEY = 'alpecon_admin_token';

const getAuthHeaders = (): HeadersInit => {
  const token = localStorage.getItem(TOKEN_KEY);
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const blocksApi = {
  async getByType(type: BlockType): Promise<ContentBlock[]> {
    const response = await fetch(`${API_URL}/blocks?type=${type}`);
    if (!response.ok) throw new Error('Failed to fetch blocks');
    return response.json();
  },

  async getAllForAdmin(type: BlockType): Promise<ContentBlock[]> {
    const response = await fetch(`${API_URL}/blocks/all?type=${type}`, {
      headers: getAuthHeaders(),
    });
    if (response.status === 401) throw new Error('UNAUTHORIZED');
    if (!response.ok) throw new Error('Failed to fetch blocks');
    return response.json();
  },

  async create(data: {
    type: BlockType;
    image?: string;
    fields: ContentBlock['fields'];
    active?: boolean;
  }): Promise<ContentBlock> {
    const response = await fetch(`${API_URL}/blocks`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    if (response.status === 401) throw new Error('UNAUTHORIZED');
    if (!response.ok) throw new Error('Failed to create block');
    return response.json();
  },

  async update(
    id: string,
    data: { image?: string; fields?: ContentBlock['fields']; active?: boolean }
  ): Promise<ContentBlock> {
    const response = await fetch(`${API_URL}/blocks/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    if (response.status === 401) throw new Error('UNAUTHORIZED');
    if (!response.ok) throw new Error('Failed to update block');
    return response.json();
  },

  async delete(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/blocks/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (response.status === 401) throw new Error('UNAUTHORIZED');
    if (!response.ok) throw new Error('Failed to delete block');
  },

  async reorder(type: BlockType, ids: string[]): Promise<ContentBlock[]> {
    const response = await fetch(`${API_URL}/blocks/reorder`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ type, ids }),
    });
    if (response.status === 401) throw new Error('UNAUTHORIZED');
    if (!response.ok) throw new Error('Failed to reorder blocks');
    return response.json();
  },
};
