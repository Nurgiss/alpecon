import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { contentApi } from '@/services/contentApi';
import {
  DEFAULT_HERO_IMAGES,
  resolveHeroImage,
  type HeroPageKey,
} from '@/config/heroImages';

interface HeroImagesContextType {
  images: Partial<Record<HeroPageKey, string>>;
  getHeroImage: (key: HeroPageKey) => string;
  refreshHeroImages: () => Promise<void>;
}

const HeroImagesContext = createContext<HeroImagesContextType | undefined>(undefined);

function parseHeroImages(data: { ru?: Record<string, unknown> }): Partial<Record<HeroPageKey, string>> {
  const raw = data.ru || {};
  const result: Partial<Record<HeroPageKey, string>> = {};
  for (const key of Object.keys(DEFAULT_HERO_IMAGES) as HeroPageKey[]) {
    const value = raw[key];
    if (typeof value === 'string' && value.trim()) {
      result[key] = value;
    }
  }
  return result;
}

export function HeroImagesProvider({ children }: { children: ReactNode }) {
  const [images, setImages] = useState<Partial<Record<HeroPageKey, string>>>({});

  const refreshHeroImages = useCallback(async () => {
    try {
      const data = await contentApi.getPage('heroes');
      setImages(parseHeroImages(data));
    } catch {
      setImages({});
    }
  }, []);

  useEffect(() => {
    refreshHeroImages();
  }, [refreshHeroImages]);

  const getHeroImage = useCallback(
    (key: HeroPageKey) => resolveHeroImage(key, images),
    [images]
  );

  return (
    <HeroImagesContext.Provider value={{ images, getHeroImage, refreshHeroImages }}>
      {children}
    </HeroImagesContext.Provider>
  );
}

export function useHeroImage(key: HeroPageKey): string {
  const ctx = useContext(HeroImagesContext);
  if (!ctx) {
    return DEFAULT_HERO_IMAGES[key];
  }
  return ctx.getHeroImage(key);
}

export function useHeroImagesAdmin() {
  const ctx = useContext(HeroImagesContext);
  if (!ctx) {
    throw new Error('useHeroImagesAdmin must be used within HeroImagesProvider');
  }
  return ctx;
}
