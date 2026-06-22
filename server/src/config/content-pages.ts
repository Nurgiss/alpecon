export const VALID_PAGE_KEYS = [
  'global',
  'home',
  'about',
  'projects',
  'investors',
  'contacts',
  'vacancies',
  'news',
  'heroes',
] as const;

export type PageKey = (typeof VALID_PAGE_KEYS)[number];

export function isValidPageKey(key: string): key is PageKey {
  return (VALID_PAGE_KEYS as readonly string[]).includes(key);
}
