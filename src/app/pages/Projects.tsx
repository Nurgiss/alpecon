import { useLanguage } from '@/app/contexts/LanguageContext';

interface ProjectCardProps {
  image: string;
  title: string;
  description: string;
  products: string;
  productsLabel: string;
}

function ProjectCard({ image, title, description, products, productsLabel }: ProjectCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl aspect-square bg-white shadow-lg hover:shadow-2xl transition-all duration-500">
      {/* Изображение */}
      <div className="absolute inset-0">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Градиент для читаемости текста */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
      </div>
      
      {/* Контент */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 text-white">
        <h3 className="text-xl sm:text-2xl font-geologica font-bold uppercase tracking-tight leading-tight mb-3 transform transition-transform duration-500 group-hover:-translate-y-2">
          {title}
        </h3>
        <p className="font-geist text-xs sm:text-sm mb-4 opacity-90 line-clamp-2 transition-all duration-500 group-hover:line-clamp-none">
          {description}
        </p>
        
        {/* Продукция */}
        <div className="border-l-4 border-[#007349] pl-4 bg-black/30 backdrop-blur-sm py-3 -mx-2 px-6 rounded">
          <div className="font-geologica font-bold text-base sm:text-lg mb-1">
            {products}
          </div>
          <div className="font-geist text-xs uppercase tracking-wide opacity-75">
            {productsLabel}
          </div>
        </div>
      </div>
      
      {/* Hover эффект - зеленая рамка */}
      <div className="absolute inset-0 border-4 border-[#007349] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
    </div>
  );
}

export function Projects() {
  const { t } = useLanguage();
  
  const projects = [
    {
      image: "https://images.unsplash.com/photo-1651525670054-279c154bc3b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcnVpdCUyMHByb2Nlc3NpbmclMjBmYWN0b3J5JTIwcHJvZHVjdGlvbnxlbnwxfHx8fDE3NzEzNTM1OTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
      title: 'TOO "Qazaq Global Food JV"',
      description: 'Производство яблочного концентрата, фруктовых и овощных пюре.',
      products: "Концентраты, пюре",
      productsLabel: "ПРОИЗВОДСТВО"
    },
    {
      image: "https://images.unsplash.com/photo-1762267659909-811e6dcacbe5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwYWdyaWN1bHR1cmUlMjBhcHBsZSUyMG9yY2hhcmR8ZW58MXx8fHwxNzcxMzUzNTk3fDA&ixlib=rb-4.1.0&q=80&w=1080",
      title: 'TOO "QazaqAgroProcessing"',
      description: 'Высокотехнологичное производство пектина.',
      products: "Пектин",
      productsLabel: "ПРОИЗВОДСТВО"
    },
    {
      image: "https://images.unsplash.com/photo-1652211955973-b9138bc1b09a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcHBsZSUyMGp1aWNlJTIwcHJvZHVjdGlvbnxlbnwxfHx8fDE3NzEzNTM1OTh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      title: 'TOO "RUN PLANET ORGANIC"',
      description: 'Производство натуральных яблочных соков и пюре.',
      products: "Соки, пюре",
      productsLabel: "ПРОИЗВОДСТВО"
    },
    {
      image: "https://images.unsplash.com/photo-1766158554276-fcba78477081?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHByb2R1Y2UlMjBtYXJrZXQlMjBzdG9yYWdlfGVufDF8fHx8MTc3MTM1MzU5OHww&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Сеть заготовительных пунктов",
      description: "Связующее звено между фермерами и производством.",
      products: "Логистика",
      productsLabel: "ИНФРАСТРУКТУРА"
    },
    {
      image: "https://images.unsplash.com/photo-1645628100819-981300372236?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZ3JpY3VsdHVyYWwlMjB0ZWNobm9sb2d5JTIwZmFybSUyMHNvZnR3YXJlfGVufDF8fHx8MTc3MTM1MzY2Mnww&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Alpecon AgrOS",
      description: "Агротехнологическая операционная система для управления производством.",
      products: "IT-система",
      productsLabel: "ТЕХНОЛОГИИ"
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1752706033018-da7f6ff09562?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhZ3JpY3VsdHVyYWwlMjBmYWNpbGl0eSUyMHByb2R1Y3Rpb258ZW58MXx8fHwxNzcxMzU0MjYzfDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt={t('projects.hero.title')}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 lg:pt-32">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-geologica font-bold text-white uppercase tracking-tight leading-[1.1] mb-6">
              {t('projects.hero.title')}
            </h1>
            <p className="text-white/90 text-base sm:text-lg lg:text-lg font-geist max-w-3xl leading-tight mb-8 mx-auto">
              {t('projects.hero.subtitle')}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-2xl mt-8 sm:mt-12 mx-auto">
              <div className="bg-white/10 backdrop-blur-md p-5 sm:p-6 rounded-md">
                <div className="text-3xl sm:text-4xl font-bold text-white mb-2">5</div>
                <div className="text-xs text-white/80 uppercase tracking-wider font-bold">{t('projects.hero.stat1')}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-5 sm:p-6 rounded-md">
                <div className="text-3xl sm:text-4xl font-bold text-white mb-2">150K+</div>
                <div className="text-xs text-white/80 uppercase tracking-wider font-bold">{t('projects.hero.stat2')}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-12 border-2 border-white/50 flex items-start justify-center p-2 rounded-full">
            <div className="w-1 h-4 bg-white rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Projects Grid - New Modern Design */}
      <section className="py-16 sm:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Заголовок секции */}
          <div className="mb-12 sm:mb-16 text-center">
            <h2 className="font-geologica font-bold text-4xl sm:text-5xl mb-4">
              НАШИ ПРОЕКТЫ
            </h2>
            <p className="font-geist text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Каждый проект — это важная часть единой экосистемы, создающей добавленную стоимость на каждом этапе
            </p>
          </div>

          {/* Сетка проектов - 3 в первом ряду, 2 во втором */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {projects.slice(0, 3).map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mt-6 sm:mt-8 max-w-5xl mx-auto">
            {projects.slice(3).map((project, index) => (
              <ProjectCard key={index + 3} {...project} />
            ))}
          </div>
        </div>
      </section>

      {/* Integration Section */}
    </div>
  );
}
