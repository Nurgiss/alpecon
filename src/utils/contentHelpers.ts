import { translations } from '@/locales/translations';
import type { Language } from '@/app/contexts/LanguageContext';
import type { ContentPageConfig } from '@/config/contentPages';
import { deepMerge } from '@/utils/deepMerge';

export type LangContent = Record<string, unknown>;

export interface PageContentData {
  pageKey: string;
  ru: LangContent;
  kz: LangContent;
  en: LangContent;
  updatedAt?: string | null;
}

export type AllContentResponse = Record<string, PageContentData>;

export function getDefaultPageContent(page: ContentPageConfig): Record<Language, LangContent> {
  const result: Record<Language, LangContent> = { ru: {}, kz: {}, en: {} };

  for (const lang of ['ru', 'kz', 'en'] as const) {
    for (const topKey of page.topKeys) {
      const section = (translations[lang] as Record<string, unknown>)[topKey];
      if (section && typeof section === 'object') {
        result[lang][topKey] = JSON.parse(JSON.stringify(section));
      }
    }
  }

  return result;
}

export function mergePageContent(
  defaults: Record<Language, LangContent>,
  saved?: Partial<Record<Language, LangContent>>
): Record<Language, LangContent> {
  const result: Record<Language, LangContent> = {
    ru: { ...defaults.ru },
    kz: { ...defaults.kz },
    en: { ...defaults.en },
  };

  for (const lang of ['ru', 'kz', 'en'] as const) {
    if (saved?.[lang]) {
      result[lang] = deepMerge(result[lang], saved[lang]!);
    }
  }

  return result;
}

function isExcludedPath(path: string, excludePrefixes: string[] = []): boolean {
  return excludePrefixes.some((p) => path === p || path.startsWith(`${p}.`));
}

export function flattenStrings(
  obj: Record<string, unknown>,
  prefix = '',
  excludePrefixes: string[] = []
): Record<string, string> {
  const result: Record<string, string> = {};

  for (const [key, value] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (isExcludedPath(path, excludePrefixes)) continue;
    if (typeof value === 'string') {
      result[path] = value;
    } else if (value && typeof value === 'object' && !Array.isArray(value)) {
      Object.assign(result, flattenStrings(value as Record<string, unknown>, path, excludePrefixes));
    }
  }

  return result;
}

export function unflattenStrings(flat: Record<string, string>): Record<string, unknown> {
  const result: Record<string, unknown> = {};

  for (const [path, value] of Object.entries(flat)) {
    const keys = path.split('.');
    let current = result;

    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]] || typeof current[keys[i]] !== 'object') {
        current[keys[i]] = {};
      }
      current = current[keys[i]] as Record<string, unknown>;
    }

    current[keys[keys.length - 1]] = value;
  }

  return result;
}

export function groupFieldsBySection(
  fields: Record<string, string>
): Record<string, Record<string, string>> {
  const groups: Record<string, Record<string, string>> = {};

  for (const [path, value] of Object.entries(fields)) {
    const section = path.split('.')[0];
    if (!groups[section]) groups[section] = {};
    groups[section][path] = value;
  }

  return groups;
}

export function applyContentToTranslations(
  base: typeof translations,
  apiContent: AllContentResponse
): typeof translations {
  const result = JSON.parse(JSON.stringify(base)) as typeof translations;

  for (const [pageKey, pageData] of Object.entries(apiContent)) {
    if (!pageData) continue;

    for (const lang of ['ru', 'kz', 'en'] as const) {
      const overrides = pageData[lang];
      if (!overrides || Object.keys(overrides).length === 0) continue;

      if (pageKey === 'global') {
        (result[lang] as Record<string, unknown>) = deepMerge(
          result[lang] as Record<string, unknown>,
          overrides
        );
      } else {
        const langObj = result[lang] as Record<string, unknown>;
        if (pageKey === 'news') {
          for (const key of ['newsPage', 'newsDetail']) {
            if (overrides[key]) {
              langObj[key] = deepMerge(
                (langObj[key] as Record<string, unknown>) || {},
                overrides[key] as Record<string, unknown>
              );
            }
          }
        } else if (overrides[pageKey]) {
          langObj[pageKey] = deepMerge(
            (langObj[pageKey] as Record<string, unknown>) || {},
            overrides[pageKey] as Record<string, unknown>
          );
        } else {
          langObj[pageKey] = deepMerge(
            (langObj[pageKey] as Record<string, unknown>) || {},
            overrides
          );
        }
      }
    }
  }

  return result;
}
