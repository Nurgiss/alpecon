export type ContentPageKey =
  | 'global'
  | 'home'
  | 'about'
  | 'projects'
  | 'investors'
  | 'contacts'
  | 'vacancies'
  | 'news';

export interface ContentPageConfig {
  key: ContentPageKey;
  label: string;
  path: string;
  topKeys: string[];
  /** Paths managed by block CMS — hidden from text editor */
  excludePrefixes?: string[];
}

export const CONTENT_PAGES: ContentPageConfig[] = [
  { key: 'global', label: 'Меню и подвал', path: '/', topKeys: ['nav', 'header', 'footer'] },
  { key: 'home', label: 'Главная (тексты)', path: '/', topKeys: ['home'], excludePrefixes: ['home.directions'] },
  { key: 'about', label: 'О нас (тексты)', path: '/about', topKeys: ['about'], excludePrefixes: ['about.team'] },
  { key: 'projects', label: 'Проекты (тексты)', path: '/projects', topKeys: ['projects'], excludePrefixes: ['projects.items'] },
  { key: 'investors', label: 'Инвесторам', path: '/investors', topKeys: ['investors'] },
  { key: 'contacts', label: 'Контакты', path: '/contacts', topKeys: ['contacts'] },
  { key: 'vacancies', label: 'Вакансии', path: '/vacancies', topKeys: ['vacancies'] },
  { key: 'news', label: 'Страница новостей', path: '/news', topKeys: ['newsPage', 'newsDetail'] },
];

export function getContentPage(key: ContentPageKey): ContentPageConfig | undefined {
  return CONTENT_PAGES.find((page) => page.key === key);
}
