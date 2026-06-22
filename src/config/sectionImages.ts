import img1 from '@/assets/1.jpg';
import img2 from '@/assets/2.jpeg';
import img3 from '@/assets/3.jpg';
import imgGroup from '@/assets/group.jpg';
import imgMission from '@/assets/image 24.jpg';

export type SectionGroupKey = 'aboutSection' | 'director' | 'stats' | 'mission' | 'values';

export type SectionImageKey =
  | 'aboutSection.grid1'
  | 'aboutSection.grid2'
  | 'aboutSection.grid3'
  | 'aboutSection.grid4'
  | 'director.photo'
  | 'stats.background'
  | 'mission.background'
  | 'values.background';

export interface SectionImageSlot {
  key: SectionImageKey;
  slot: string;
  label: string;
  defaultImage: string;
}

export interface SectionGroupConfig {
  key: SectionGroupKey;
  label: string;
  hint: string;
  pages: string[];
  images: SectionImageSlot[];
}

const UNSPLASH_FACTORY =
  'https://images.unsplash.com/photo-1651525670054-279c154bc3b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcnVpdCUyMHByb2Nlc3NpbmclMjBmYWN0b3J5JTIwcHJvZHVjdGlvbnxlbnwxfHx8fDE3NzEzNTM1OTd8MA&ixlib=rb-4.1.0&q=80&w=1080';

const UNSPLASH_STATS =
  'https://images.unsplash.com/photo-1655176198204-e939d46fc584?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2YXN0JTIwYWdyaWN1bHR1cmFsJTIwZmllbGQlMjBhZXJpYWwlMjB2aWV3JTIwZ29sZGVufGVufDF8fHx8MTc3MTM1NzUwMHww&ixlib=rb-4.1.0&q=80&w=1080';

const UNSPLASH_VALUES =
  'https://images.unsplash.com/photo-1730628257362-d3ddcf952a75?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMGZpZWxkcyUyMGxhbmRzY2FwZSUyMG1vdW50YWluc3xlbnwxfHx8fDE3NzEzMzkzNzR8MA&ixlib=rb-4.1.0&q=80&w=1080';

export const SECTION_GROUPS: SectionGroupConfig[] = [
  {
    key: 'aboutSection',
    label: 'О холдинге',
    hint: 'Главная и «О нас» — одни и те же 4 фото',
    pages: ['/', '/about'],
    images: [
      { key: 'aboutSection.grid1', slot: 'grid1', label: 'Фото 1 (верх слева)', defaultImage: UNSPLASH_FACTORY },
      { key: 'aboutSection.grid2', slot: 'grid2', label: 'Фото 2 (низ слева)', defaultImage: img2 },
      { key: 'aboutSection.grid3', slot: 'grid3', label: 'Фото 3 (верх справа)', defaultImage: img1 },
      { key: 'aboutSection.grid4', slot: 'grid4', label: 'Фото 4 (низ справа)', defaultImage: img3 },
    ],
  },
  {
    key: 'director',
    label: 'Стратегический подход',
    hint: 'Главная — фото над текстом',
    pages: ['/'],
    images: [{ key: 'director.photo', slot: 'photo', label: 'Фото секции', defaultImage: imgGroup }],
  },
  {
    key: 'stats',
    label: 'Мы в цифрах',
    hint: 'Главная — фон блока со статистикой',
    pages: ['/'],
    images: [{ key: 'stats.background', slot: 'background', label: 'Фон', defaultImage: UNSPLASH_STATS }],
  },
  {
    key: 'mission',
    label: 'Миссия',
    hint: 'О нас — фон блока миссии',
    pages: ['/about'],
    images: [{ key: 'mission.background', slot: 'background', label: 'Фон', defaultImage: imgMission }],
  },
  {
    key: 'values',
    label: 'Ценности',
    hint: 'О нас — фон блока ценностей',
    pages: ['/about'],
    images: [{ key: 'values.background', slot: 'background', label: 'Фон', defaultImage: UNSPLASH_VALUES }],
  },
];

export const DEFAULT_SECTION_IMAGES: Record<SectionImageKey, string> = Object.fromEntries(
  SECTION_GROUPS.flatMap((group) => group.images.map((img) => [img.key, img.defaultImage]))
) as Record<SectionImageKey, string>;

export function resolveSectionImage(
  key: SectionImageKey,
  saved?: Partial<Record<SectionImageKey, string>>
): string {
  const custom = saved?.[key]?.trim();
  return custom || DEFAULT_SECTION_IMAGES[key];
}

export function getSectionGroup(key: SectionGroupKey): SectionGroupConfig {
  return SECTION_GROUPS.find((g) => g.key === key)!;
}
