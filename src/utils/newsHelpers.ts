import type { Language } from '@/app/contexts/LanguageContext';
import type { NewsItem } from '@/services/newsApi';

const LANG_SUFFIX: Record<Language, 'Ru' | 'Kz' | 'En'> = {
  ru: 'Ru',
  kz: 'Kz',
  en: 'En',
};

export function getLocalizedNewsField(
  item: NewsItem,
  language: Language,
  field: 'title' | 'content' | 'category'
): string {
  const localizedKey = `${field}${LANG_SUFFIX[language]}` as keyof NewsItem;
  const localized = item[localizedKey];
  if (typeof localized === 'string' && localized.trim()) {
    return localized;
  }

  const ruKey = `${field}Ru` as keyof NewsItem;
  const ruValue = item[ruKey];
  if (typeof ruValue === 'string' && ruValue.trim()) {
    return ruValue;
  }

  const base = item[field];
  return typeof base === 'string' ? base : '';
}
