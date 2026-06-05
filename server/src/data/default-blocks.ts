export type BlockType = 'direction' | 'team' | 'project';

export interface DefaultBlockSeed {
  type: BlockType;
  sortOrder: number;
  image: string;
  fieldsRu: Record<string, string>;
  fieldsKz: Record<string, string>;
  fieldsEn: Record<string, string>;
}

export const DEFAULT_BLOCKS: DefaultBlockSeed[] = [
  // Directions
  {
    type: 'direction',
    sortOrder: 0,
    image: 'https://images.unsplash.com/photo-1651525670099-f828fb5478a5?w=800&auto=format&fit=crop',
    fieldsRu: { title: 'Завод по производству фруктовых и овощных концентратов и пюре', category: 'ПЕРЕРАБОТКА' },
    fieldsKz: { title: 'Заманауи алма бағы', category: 'АУЫЛ ШАРУАШЫЛЫҒЫ' },
    fieldsEn: { title: 'Modern Apple Orchard', category: 'AGRICULTURE' },
  },
  {
    type: 'direction',
    sortOrder: 1,
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800',
    fieldsRu: { title: 'Завод по производству пектина и пищевых волокон', category: 'ПЕРЕРАБОТКА' },
    fieldsKz: { title: 'Жемістер мен көкөністердің концентраттары мен пюресін өндіру зауыты', category: 'ҚАЙТА ӨҢДЕУ' },
    fieldsEn: { title: 'Fruit and Vegetable Concentrates and Puree Production Plant', category: 'PROCESSING' },
  },
  {
    type: 'direction',
    sortOrder: 2,
    image: 'https://images.unsplash.com/photo-1689650552915-d547c24fe85e?w=800&auto=format&fit=crop',
    fieldsRu: { title: 'Яблоневые кооперативы', category: 'СЕЛЬСКОЕ ХОЗЯЙСТВО' },
    fieldsKz: { title: 'Пектин мен тамақ талшықтарын өндіру зауыты', category: 'ҚАЙТА ӨҢДЕУ' },
    fieldsEn: { title: 'Pectin and Dietary Fiber Production Plant', category: 'PROCESSING' },
  },
  {
    type: 'direction',
    sortOrder: 3,
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800',
    fieldsRu: { title: 'Пункты приемки фруктов и овощей', category: 'ЛОГИСТИКА' },
    fieldsKz: { title: 'Жемістер мен көкөністерді қабылдау пункттері', category: 'ЛОГИСТИКА' },
    fieldsEn: { title: 'Fruit and Vegetable Reception Points', category: 'LOGISTICS' },
  },
  {
    type: 'direction',
    sortOrder: 4,
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800',
    fieldsRu: { title: 'Фруктохранилище', category: 'ХРАНЕНИЕ' },
    fieldsKz: { title: 'Жеміс қоймасы', category: 'САҚТАУ' },
    fieldsEn: { title: 'Fruit Storage', category: 'STORAGE' },
  },
  {
    type: 'direction',
    sortOrder: 5,
    image: '/images/it-platform.jpg',
    fieldsRu: { title: 'IT Платформа', category: 'ТЕХНОЛОГИИ' },
    fieldsKz: { title: 'IT Платформа', category: 'ТЕХНОЛОГИЯЛАР' },
    fieldsEn: { title: 'IT Platform', category: 'TECHNOLOGY' },
  },

  // Team
  {
    type: 'team',
    sortOrder: 0,
    image: '',
    fieldsRu: { name: 'Балабеков Самат Жумабаевич', position: 'Генеральный директор' },
    fieldsKz: { name: 'Балабеков Самат Жұмабайұлы', position: 'Бас директор' },
    fieldsEn: { name: 'Balabekov Samat', position: 'General Director' },
  },
  {
    type: 'team',
    sortOrder: 1,
    image: '',
    fieldsRu: { name: 'Бейсенбин Бауыржан Айдарович', position: 'Коммерческий директор' },
    fieldsKz: { name: 'Бейсенбин Бауыржан Айдарұлы', position: 'Коммерциялық директор' },
    fieldsEn: { name: 'Beisenbin Baurzhan', position: 'Commercial Director' },
  },
  {
    type: 'team',
    sortOrder: 2,
    image: '',
    fieldsRu: { name: 'Хахулин Егор Александрович', position: 'Технический директор' },
    fieldsKz: { name: 'Хахулин Егор Александрович', position: 'Техникалық директор' },
    fieldsEn: { name: 'Khakhulin Egor', position: 'Technical Director' },
  },
  {
    type: 'team',
    sortOrder: 3,
    image: '',
    fieldsRu: { name: 'Ибраимов Ержан Калиевич', position: 'Руководитель аппарата' },
    fieldsKz: { name: 'Ибраимов Ержан Калиевич', position: 'Аппарат Басшысы' },
    fieldsEn: { name: 'Ibraimov Yerzhan', position: 'Head of Administration' },
  },

  // Projects
  {
    type: 'project',
    sortOrder: 0,
    image: 'https://images.unsplash.com/photo-1651525670054-279c154bc3b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    fieldsRu: {
      title: 'TOO "Qazaq Global Food JV"',
      description: 'Производство яблочного концентрата, фруктовых и овощных пюре.',
      products: 'Концентраты, пюре',
      productsLabel: 'ПРОИЗВОДСТВО',
    },
    fieldsKz: {
      title: 'TOO "Qazaq Global Food JV"',
      description: 'Алма концентратын, жеміс және көкөніс пюресін өндіру.',
      products: 'Концентраттар, пюре',
      productsLabel: 'ӨНДІРІС',
    },
    fieldsEn: {
      title: 'TOO "Qazaq Global Food JV"',
      description: 'Production of apple concentrate, fruit and vegetable purees.',
      products: 'Concentrates, purees',
      productsLabel: 'PRODUCTION',
    },
  },
  {
    type: 'project',
    sortOrder: 1,
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800',
    fieldsRu: {
      title: 'TOO "Qazaq Agro Processing"',
      description: 'Высокотехнологичное производство пектина.',
      products: 'Пектин',
      productsLabel: 'ПРОИЗВОДСТВО',
    },
    fieldsKz: {
      title: 'TOO "Qazaq Agro Processing"',
      description: 'Пектинді жоғары технологиялық өндіру.',
      products: 'Пектин',
      productsLabel: 'ӨНДІРІС',
    },
    fieldsEn: {
      title: 'TOO "Qazaq Agro Processing"',
      description: 'High-tech pectin production.',
      products: 'Pectin',
      productsLabel: 'PRODUCTION',
    },
  },
  {
    type: 'project',
    sortOrder: 2,
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800',
    fieldsRu: {
      title: 'TOO "RUN PLANET ORGANIC"',
      description: 'Производство натуральных яблочных соков и пюре.',
      products: 'Соки, пюре',
      productsLabel: 'ПРОИЗВОДСТВО',
    },
    fieldsKz: {
      title: 'TOO "RUN PLANET ORGANIC"',
      description: 'Табиғи алма шырындары мен пюресін өндіру.',
      products: 'Шырындар, пюре',
      productsLabel: 'ӨНДІРІС',
    },
    fieldsEn: {
      title: 'TOO "RUN PLANET ORGANIC"',
      description: 'Production of natural apple juices and purees.',
      products: 'Juices, purees',
      productsLabel: 'PRODUCTION',
    },
  },
  {
    type: 'project',
    sortOrder: 3,
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800',
    fieldsRu: {
      title: 'Сеть заготовительных пунктов',
      description: 'Связующее звено между фермерами и производством.',
      products: 'Логистика',
      productsLabel: 'ИНФРАСТРУКТУРА',
    },
    fieldsKz: {
      title: 'Дайындау пункттерінің желісі',
      description: 'Фермерлер мен өндіріс арасындағы байланыстырушы буын.',
      products: 'Логистика',
      productsLabel: 'ИНФРАҚҰРЫЛЫМ',
    },
    fieldsEn: {
      title: 'Network of procurement points',
      description: 'Connecting link between farmers and production.',
      products: 'Logistics',
      productsLabel: 'INFRASTRUCTURE',
    },
  },
  {
    type: 'project',
    sortOrder: 4,
    image: '/images/it-platform.jpg',
    fieldsRu: {
      title: 'Alpecon AgrOS',
      description: 'Цифровая экосистема для фермеров: от прогноза спроса до гарантированного сбыта урожая.',
      products: 'IT-платформа',
      productsLabel: 'ТЕХНОЛОГИИ',
    },
    fieldsKz: {
      title: 'Alpecon AgrOS',
      description: 'Фермерлерге арналған цифрлық экожүйе: сұраныс болжамынан өнімнің кепілді сатылымына дейін.',
      products: 'IT-платформа',
      productsLabel: 'ТЕХНОЛОГИЯЛАР',
    },
    fieldsEn: {
      title: 'Alpecon AgrOS',
      description: 'Digital ecosystem for farmers: from demand forecasting to guaranteed crop sales.',
      products: 'IT-platform',
      productsLabel: 'TECHNOLOGY',
    },
  },
];
