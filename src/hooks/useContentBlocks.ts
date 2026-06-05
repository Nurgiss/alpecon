import { useState, useEffect, useCallback } from 'react';
import type { Language } from '@/app/contexts/LanguageContext';
import type { BlockType, ContentBlock } from '@/types/blocks';
import { blocksApi } from '@/services/blocksApi';

export function getBlockField(
  block: ContentBlock,
  lang: Language,
  key: string
): string {
  return block.fields[lang]?.[key] || block.fields.ru?.[key] || '';
}

export function useContentBlocks(type: BlockType) {
  const [blocks, setBlocks] = useState<ContentBlock[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await blocksApi.getByType(type);
      setBlocks(data);
    } catch (err) {
      setError((err as Error).message);
      setBlocks([]);
    } finally {
      setLoading(false);
    }
  }, [type]);

  useEffect(() => {
    load();
  }, [load]);

  return { blocks, loading, error, reload: load };
}
