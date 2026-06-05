export type BlockType = 'direction' | 'team' | 'project';

export interface BlockFields {
  ru: Record<string, string>;
  kz: Record<string, string>;
  en: Record<string, string>;
}

export interface ContentBlock {
  id: string;
  type: BlockType;
  sortOrder: number;
  image: string;
  active: boolean;
  fields: BlockFields;
  updatedAt: string;
}

export interface BlockTypeConfig {
  type: BlockType;
  label: string;
  page: string;
  icon: string;
  fields: Array<{
    key: string;
    label: string;
    multiline?: boolean;
    required?: boolean;
  }>;
  previewTitle: (fields: Record<string, string>) => string;
  previewSubtitle: (fields: Record<string, string>) => string;
}

export const BLOCK_CONFIGS: Record<BlockType, BlockTypeConfig> = {
  direction: {
    type: 'direction',
    label: 'Направления деятельности',
    page: '/',
    icon: '🏭',
    fields: [
      { key: 'title', label: 'Название', multiline: true, required: true },
      { key: 'category', label: 'Категория', required: true },
    ],
    previewTitle: (f) => f.title || 'Без названия',
    previewSubtitle: (f) => f.category || '',
  },
  team: {
    type: 'team',
    label: 'Команда',
    page: '/about',
    icon: '👥',
    fields: [
      { key: 'name', label: 'ФИО', required: true },
      { key: 'position', label: 'Должность', required: true },
    ],
    previewTitle: (f) => f.name || 'Без имени',
    previewSubtitle: (f) => f.position || '',
  },
  project: {
    type: 'project',
    label: 'Проекты',
    page: '/projects',
    icon: '📁',
    fields: [
      { key: 'title', label: 'Название', multiline: true, required: true },
      { key: 'description', label: 'Описание', multiline: true, required: true },
      { key: 'products', label: 'Продукция', required: true },
      { key: 'productsLabel', label: 'Метка', required: true },
    ],
    previewTitle: (f) => f.title || 'Без названия',
    previewSubtitle: (f) => f.products || '',
  },
};
