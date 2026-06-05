import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { translations as defaultTranslations } from '../../locales/translations';
import { contentApi } from '@/services/contentApi';
import { applyContentToTranslations } from '@/utils/contentHelpers';

export type Language = 'ru' | 'kz' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  refreshContent: () => Promise<void>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'ru';
  });
  const [mergedTranslations, setMergedTranslations] = useState(defaultTranslations);

  const refreshContent = useCallback(async () => {
    try {
      const apiContent = await contentApi.getAll();
      setMergedTranslations(applyContentToTranslations(defaultTranslations, apiContent));
    } catch {
      setMergedTranslations(defaultTranslations);
    }
  }, []);

  useEffect(() => {
    refreshContent();
  }, [refreshContent]);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: unknown = mergedTranslations[language];

    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = (value as Record<string, unknown>)[k];
      } else {
        value = undefined;
        break;
      }
    }

    return typeof value === 'string' ? value : key;
  };

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage: handleSetLanguage, t, refreshContent }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
