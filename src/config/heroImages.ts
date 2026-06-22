import imgHeroHome from '@/assets/Hero.jpg';
import imgHeroAbout from '@/assets/about-hero.jpg';
import imgHeroProjects from '@/assets/13.jpg';

export type HeroPageKey = 'home' | 'about' | 'projects' | 'news' | 'investors' | 'vacancies';

export interface HeroPageConfig {
  key: HeroPageKey;
  label: string;
  path: string;
  defaultImage: string;
}

export const HERO_PAGES: HeroPageConfig[] = [
  { key: 'home', label: 'Главная', path: '/', defaultImage: imgHeroHome },
  { key: 'about', label: 'О нас', path: '/about', defaultImage: imgHeroAbout },
  { key: 'projects', label: 'Проекты', path: '/projects', defaultImage: imgHeroProjects },
  {
    key: 'news',
    label: 'Новости',
    path: '/news',
    defaultImage:
      'https://images.unsplash.com/photo-1683334086948-bd47e6fc45eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
  },
  {
    key: 'investors',
    label: 'Инвесторам',
    path: '/investors',
    defaultImage:
      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=2000&auto=format&fit=crop&q=80',
  },
  {
    key: 'vacancies',
    label: 'Вакансии',
    path: '/vacancies',
    defaultImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=2000',
  },
];

export const DEFAULT_HERO_IMAGES: Record<HeroPageKey, string> = Object.fromEntries(
  HERO_PAGES.map((p) => [p.key, p.defaultImage])
) as Record<HeroPageKey, string>;

export function getHeroPage(key: HeroPageKey): HeroPageConfig {
  return HERO_PAGES.find((p) => p.key === key)!;
}

export function resolveHeroImage(
  key: HeroPageKey,
  saved?: Partial<Record<HeroPageKey, string>>
): string {
  const custom = saved?.[key]?.trim();
  return custom || DEFAULT_HERO_IMAGES[key];
}
