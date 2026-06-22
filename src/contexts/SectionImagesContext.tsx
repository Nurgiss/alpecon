import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { contentApi } from '@/services/contentApi';
import {
  DEFAULT_SECTION_IMAGES,
  SECTION_GROUPS,
  resolveSectionImage,
  type SectionGroupKey,
  type SectionImageKey,
} from '@/config/sectionImages';

interface SectionImagesContextType {
  images: Partial<Record<SectionImageKey, string>>;
  getSectionImage: (key: SectionImageKey) => string;
  getGroupImage: (group: SectionGroupKey, slot: string) => string;
  refreshSectionImages: () => Promise<void>;
}

const SectionImagesContext = createContext<SectionImagesContextType | undefined>(undefined);

function parseSectionImages(data: { ru?: Record<string, unknown> }): Partial<Record<SectionImageKey, string>> {
  const raw = data.ru || {};
  const result: Partial<Record<SectionImageKey, string>> = {};

  for (const group of SECTION_GROUPS) {
    const nested = raw[group.key];
    if (nested && typeof nested === 'object' && !Array.isArray(nested)) {
      for (const img of group.images) {
        const value = (nested as Record<string, unknown>)[img.slot];
        if (typeof value === 'string' && value.trim()) {
          result[img.key] = value;
        }
      }
    }
  }

  return result;
}

export function SectionImagesProvider({ children }: { children: ReactNode }) {
  const [images, setImages] = useState<Partial<Record<SectionImageKey, string>>>({});

  const refreshSectionImages = useCallback(async () => {
    try {
      const data = await contentApi.getPage('section-images');
      setImages(parseSectionImages(data));
    } catch {
      setImages({});
    }
  }, []);

  useEffect(() => {
    refreshSectionImages();
  }, [refreshSectionImages]);

  const getSectionImage = useCallback(
    (key: SectionImageKey) => resolveSectionImage(key, images),
    [images]
  );

  const getGroupImage = useCallback(
    (group: SectionGroupKey, slot: string) => {
      const fullKey = `${group}.${slot}` as SectionImageKey;
      if (fullKey in DEFAULT_SECTION_IMAGES) {
        return getSectionImage(fullKey);
      }
      return '';
    },
    [getSectionImage]
  );

  return (
    <SectionImagesContext.Provider value={{ images, getSectionImage, getGroupImage, refreshSectionImages }}>
      {children}
    </SectionImagesContext.Provider>
  );
}

export function useSectionImage(key: SectionImageKey): string {
  const ctx = useContext(SectionImagesContext);
  if (!ctx) {
    return DEFAULT_SECTION_IMAGES[key];
  }
  return ctx.getSectionImage(key);
}

export function useGroupSectionImage(group: SectionGroupKey, slot: string): string {
  const ctx = useContext(SectionImagesContext);
  if (!ctx) {
    const fullKey = `${group}.${slot}` as SectionImageKey;
    return DEFAULT_SECTION_IMAGES[fullKey] ?? '';
  }
  return ctx.getGroupImage(group, slot);
}

export function useSectionImagesAdmin() {
  const ctx = useContext(SectionImagesContext);
  if (!ctx) {
    throw new Error('useSectionImagesAdmin must be used within SectionImagesProvider');
  }
  return ctx;
}
