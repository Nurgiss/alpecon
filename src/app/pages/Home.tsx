
import { Button } from "@/app/components/Button";
import { Partners } from "@/app/components/Partners";
import { useLanguage } from '@/app/contexts/LanguageContext';
import { useState, useEffect } from 'react';
import { newsApi, type NewsItem } from '@/services/newsApi';
import { Link } from 'react-router-dom';
const imgGeminiGeneratedImage = "https://images.unsplash.com/photo-1594737626072-90dc274bc2bc?w=800&auto=format&fit=crop";

const imgHeroBackground = "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1920&auto=format&fit=crop";

const imgDirector = "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&auto=format&fit=crop";

export function Home() {
  const { t, language } = useLanguage();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await newsApi.getAll();
        setNews(data.slice(0, 3)); // Берем только 3 последние новости
      } catch (error) {
        console.error('Error loading news:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  const getLocalizedField = (item: NewsItem, field: 'title' | 'content' | 'category'): string => {
    const langField = `${field}_${language}` as keyof NewsItem;
    const value = item[langField];
    if (value && typeof value === 'string') return value;
    
    const ruField = `${field}_ru` as keyof NewsItem;
    const ruValue = item[ruField];
    if (ruValue && typeof ruValue === 'string') return ruValue;
    
    const baseValue = item[field];
    return (baseValue && typeof baseValue === 'string') ? baseValue : '';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  return (
    <div>
      {/* Hero Section - Full Screen - Clean Design */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={imgHeroBackground}
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 lg:pt-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center">
            {/* Left side */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-2 rounded-md">
                <span className="text-white/90 text-xs font-bold tracking-widest uppercase">
                  {t('home.hero.badge')}
                </span>
              </div>

              <h1 className="text-white font-bold mb-6 sm:mb-8 leading-[1.1] uppercase text-3xl sm:text-4xl lg:text-[48px] tracking-tight">
                {t('home.hero.title')}
              </h1>

              <p className="text-white/70 text-base leading-relaxed max-w-xl">
                {language === 'ru' ? 'Передовые технологии переработки сельхозпродукции. Полный производственный цикл от сырья до готовой продукции.' : language === 'kz' ? 'Ауыл шаруашылығы өнімдерін қайта өңдеудің озық технологиялары. Шикізаттан дайын өнімге дейінгі толық өндірістік цикл.' : 'Advanced agricultural processing technologies. Full production cycle from raw materials to finished products.'}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="md">
                  {t('home.hero.products')}
                </Button>
                <Button size="md" variant="secondary">
                  {t('home.hero.about')}
                </Button>
              </div>
            </div>

            {/* Right side - Card */}
            <div className="hidden lg:flex justify-end">
              <div className="bg-black/60 backdrop-blur-xl p-8 border-2 border-white/20 max-w-md rounded-md">
                <div className="relative bg-[#c4c4c4] h-[220px] overflow-hidden mb-6 rounded-md">
                  <div className="absolute inset-0 overflow-hidden">
                    <img
                      alt="Казахстан"
                      className="absolute h-full w-full object-cover"
                      src={imgGeminiGeneratedImage}
                    />
                  </div>
                </div>
                <div className="pl-4">
                  <h3 className="text-white text-2xl font-bold mb-4 uppercase leading-tight tracking-tight">
                    {t('home.hero.cardTitle')}
                  </h3>
                  <p className="text-white/80 text-sm leading-relaxed">
                    {t('home.hero.cardDescription')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-12 border-2 border-white/50 flex items-start justify-center p-2 rounded-md">
            <div className="w-1 h-4 bg-white rounded-md"></div>
          </div>
        </div>
      </section>

      {/* Director Quote Section */}
      <section className="py-16 sm:py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
              {/* Left - Director Photo */}
              <div className="relative">
                <div className="overflow-hidden max-w-sm mx-auto rounded-md">
                  <img
                    src={imgDirector}
                    alt="Director"
                    className="w-full h-[300px] sm:h-[350px] lg:h-[400px] object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-[#006442] px-4 sm:px-6 py-2 sm:py-3 rounded-md shadow-lg">
                  <p className="text-white font-bold text-xs uppercase tracking-widest">
                    {language === 'ru' ? 'Руководство' : language === 'kz' ? 'Басшылық' : 'Leadership'}
                  </p>
                </div>
              </div>

              {/* Right - Quote */}
              <div className="space-y-6">
                <div className="pl-6">
                  <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-[1.2] uppercase tracking-tight mb-4 sm:mb-6">
                    {t('home.director.title')}
                  </h2>
                </div>

                <div className="space-y-4 text-base text-gray-700 leading-relaxed">
                  <p>
                    {t('home.director.text1')}
                  </p>

                  <p className="font-medium text-gray-900 pt-4 border-t border-gray-200">
                    {t('home.director.name')}
                    <br />
                    <span className="text-sm text-gray-600 font-normal">
                      {t('home.director.position')}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section - Clean Layout */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-12 lg:mb-20">
            <div>
              <div className="inline-block bg-gray-900 text-white px-6 py-2 text-xs font-bold mb-6 uppercase tracking-widest rounded-md shadow-lg">
                {t('home.about.badge')}
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 lg:mb-8 uppercase tracking-tight leading-[1.1]">
                {t('home.about.title')}
              </h2>

              <p className="text-base text-gray-700 mb-4 leading-relaxed">
                {t('home.about.text1')}
              </p>
              <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                {t('home.about.text2')}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 mt-8">
                <div className="bg-white shadow-lg p-6 rounded-md">
                  <div className="text-5xl font-bold text-gray-900 mb-2">
                    {t('home.stats.year.number')}
                  </div>
                  <div className="text-xs text-gray-600 font-bold uppercase tracking-wider">
                    {t('home.about.yearFounded')}
                  </div>
                </div>
                <div className="bg-white shadow-lg p-6 rounded-md">
                  <div className="text-5xl font-bold text-gray-900 mb-2">
                    {t('home.stats.employees.number')}
                  </div>
                  <div className="text-xs text-gray-600 font-bold uppercase tracking-wider">
                    {t('home.about.employees')}
                  </div>
                </div>
              </div>

              <button className="w-full sm:w-auto bg-gray-900 text-white px-6 sm:px-8 py-3 sm:py-4 font-bold text-sm uppercase tracking-wider hover:bg-gray-800 transition-colors rounded-md shadow-lg">
                {t('home.about.learnMore')}
              </button>
            </div>

            {/* Image Grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-8 lg:mt-0">
              <div className="space-y-3 sm:space-y-4">
                <div className="overflow-hidden rounded-md shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1636319517064-2c096305df82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXJnZSUyMGZhY3RvcnklMjBidWlsZGluZyUyMGZpZWxkJTIwY291bnRyeXNpZGV8ZW58MXx8fHwxNzY4NDk0Mzk3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Factory 1"
                    className="w-full h-48 sm:h-56 lg:h-64 object-cover transition-all duration-500"
                  />
                </div>
                <div className="overflow-hidden rounded-md shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1745517512760-dd48be2f7cb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwd2FyZWhvdXNlJTIwYWdyaWN1bHR1cmUlMjBydXJhbHxlbnwxfHx8fDE3Njg0OTQzOTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Warehouse"
                    className="w-full h-40 sm:h-44 lg:h-48 object-cover transition-all duration-500"
                  />
                </div>
              </div>
              <div className="space-y-3 sm:space-y-4 pt-6 sm:pt-8 lg:pt-12">
                <div className="overflow-hidden rounded-md shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1635961179148-3d886568775c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwcHJvY2Vzc2luZyUyMHBsYW50JTIwZXh0ZXJpb3J8ZW58MXx8fHwxNzY4NDk0Mzk4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Processing Plant"
                    className="w-full h-40 sm:h-44 lg:h-48 object-cover"
                  />
                </div>
                <div className="rounded-md overflow-hidden shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1766788467067-d443f19314b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3YXJlaG91c2UlMjBidWlsZGluZyUyMGxhbmRzY2FwZXxlbnwxfHx8fDE3Njg0OTQzOTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Logistics"
                    className="w-full h-48 sm:h-56 lg:h-64 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Numbers - Clean Dark Section */}
      <section className="relative py-16 sm:py-20 bg-gray-900 text-white overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1636319517064-2c096305df82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXJnZSUyMGZhY3RvcnklMjBidWlsZGluZyUyMGZpZWxkJTIwY291bnRyeXNpZGV8ZW58MXx8fHwxNzY4NDk0Mzk3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Factory Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gray-900/85"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="pl-4 sm:pl-8 mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 uppercase tracking-tight">
              {t('home.stats.title')}
            </h2>
            <p className="text-lg text-white/80 max-w-2xl">
              {t('home.stats.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                number: t('home.stats.year.number'),
                label: t('home.stats.year.label'),
                desc: t('home.stats.year.desc'),
                icon: "📅",
              },
              {
                number: t('home.stats.capacity.number'),
                label: t('home.stats.capacity.label'),
                desc: t('home.stats.capacity.desc'),
                icon: "🏭",
              },
              {
                number: t('home.stats.employees.number'),
                label: t('home.stats.employees.label'),
                desc: t('home.stats.employees.desc'),
                icon: "👥",
              },
              {
                number: t('home.stats.export.number'),
                label: t('home.stats.export.label'),
                desc: t('home.stats.export.desc'),
                icon: "📦",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white/5 backdrop-blur-sm border-2 border-white/10 p-8 hover:border-[#006442] transition-all group rounded-md"
              >
                <div className="text-6xl font-bold mb-3 text-white group-hover:text-[#006442] transition-colors">
                  {item.number}
                </div>
                <div className="text-sm font-bold mb-2 uppercase tracking-widest text-white/90">
                  {item.label}
                </div>
                <div className="text-xs text-white/60 uppercase tracking-wide">
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Production Directions - Clean Cards */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="pl-4 sm:pl-8 mb-12 sm:mb-16">
            <div className="inline-block bg-gray-900 text-white px-6 py-2 text-xs font-bold mb-6 uppercase tracking-widest rounded-md shadow-lg">
              {t('home.directions.badge')}
            </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 sm:mb-8 uppercase tracking-tight leading-[1.1]">
              {t('home.directions.title')}
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl">
              {t('home.directions.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                title: t('home.directions.canning.title'),
                desc: t('home.directions.canning.desc'),
                capacity: t('home.directions.canning.capacity'),
                products: t('home.directions.canning.products'),
                image:
                  "https://images.unsplash.com/photo-1644375386140-f22123ceeec4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW5uZWQlMjB2ZWdldGFibGVzfGVufDF8fHx8MTc2ODQ3MjQwMHww&ixlib=rb-4.1.0&q=80&w=1080",
                icon: "🥫",
              },
              {
                title: t('home.directions.freezing.title'),
                desc: t('home.directions.freezing.desc'),
                capacity: t('home.directions.freezing.capacity'),
                products: t('home.directions.freezing.products'),
                image:
                  "https://images.unsplash.com/photo-1622484964723-d1456419fcb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcm96ZW4lMjB2ZWdldGFibGVzfGVufDF8fHx8MTc2ODQwMzQ4Nnww&ixlib=rb-4.1.0&q=80&w=1080",
                icon: "❄️",
              },
              {
                title: t('home.directions.juice.title'),
                desc: t('home.directions.juice.desc'),
                capacity: t('home.directions.juice.capacity'),
                products: t('home.directions.juice.products'),
                image:
                  "https://images.unsplash.com/photo-1734773432473-d1a7a13c3507?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGZydWl0JTIwanVpY2V8ZW58MXx8fHwxNzY4NDcyNDAwfDA&ixlib=rb-4.1.0&q=80&w=1080",
                icon: "🧃",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="group relative bg-white overflow-hidden shadow-xl hover:shadow-2xl transition-all rounded-md"
              >
                {/* Image with Overlay */}
                <div className="relative h-96 sm:h-[400px] lg:h-80 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent"></div>

                  {/* Content on Image */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                    <div className="pl-2 sm:pl-4 mb-4 sm:mb-6">
                      <h3 className="text-xl sm:text-2xl font-bold text-white uppercase mb-2 sm:mb-3 leading-tight tracking-tight">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                      <div className="bg-white/10 backdrop-blur-sm text-white p-3 sm:p-4 rounded-md">
                        <div className="text-xl sm:text-2xl font-bold">
                          {item.capacity}
                        </div>
                        <div className="text-[10px] sm:text-xs font-bold uppercase tracking-widest mt-1">
                          {language === 'ru' ? 'Мощность' : language === 'kz' ? 'Қуаты' : 'Capacity'}
                        </div>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm text-white p-3 sm:p-4 rounded-md">
                        <div className="text-xl sm:text-2xl font-bold">
                          {item.products}
                        </div>
                        <div className="text-[10px] sm:text-xs font-bold uppercase tracking-widest mt-1">
                          {language === 'ru' ? 'Продукция' : language === 'kz' ? 'Өнім' : 'Products'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News Section - Government & Corporate News */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="pl-4 sm:pl-8 mb-12 sm:mb-16">
            <div className="inline-block bg-gray-900 text-white px-6 py-2 text-xs font-bold mb-6 uppercase tracking-widest rounded-md shadow-lg">
              {t('home.news.badge')}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 uppercase tracking-tight leading-[1.1]">
              {t('home.news.title')}
            </h2>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="text-gray-600 text-lg">Загрузка новостей...</div>
            </div>
          ) : news.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-gray-600 text-lg">Новостей пока нет</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {news.map((item) => (
                <Link to={`/news/${item.id}`} key={item.id}>
                  <div className="bg-white rounded-md overflow-hidden shadow-lg hover:shadow-2xl transition-all group cursor-pointer">
                    <div className="relative h-[350px] sm:h-[400px] overflow-hidden">
                      <img
                        src={item.image}
                        alt={getLocalizedField(item, 'title')}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

                      <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 text-white">
                        <div className="text-xs mb-2 font-bold uppercase tracking-widest opacity-90">
                          {formatDate(item.date)}
                        </div>
                        <h3 className="text-base sm:text-lg font-bold mb-2 sm:mb-3 leading-tight uppercase tracking-tight">
                          {getLocalizedField(item, 'title')}
                        </h3>
                        <p className="text-xs sm:text-sm leading-relaxed opacity-90 line-clamp-3">
                          {getLocalizedField(item, 'content').substring(0, 150)}...
                        </p>
                        <div className="mt-3 sm:mt-4">
                          <span className="inline-block bg-[#006442] text-white px-4 py-2 text-xs font-bold uppercase rounded-md shadow-lg">
                            Подробнее
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link to="/news">
              <Button size="lg" variant="secondary">Все новости →</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <Partners />

      {/* CTA Section */}
      <section className="relative py-16 sm:py-24 lg:py-32 bg-[#0D0D0D] text-white overflow-hidden rounded-xl">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1758599543152-a73184816eba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGhhbmRzaGFrZSUyMHBhcnRuZXJzaGlwfGVufDF8fHx8MTc2ODQxNTQ4M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Partnership"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-[#0D0D0D]/95"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left - Main CTA */}
            <div className="pl-4 sm:pl-8">
              <div className="inline-block bg-white text-gray-900 px-6 py-2 text-xs font-bold mb-6 uppercase tracking-widest rounded-md shadow-lg">
                Начните сотрудничество
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight uppercase tracking-tight">
                Станьте нашим партнёром
              </h2>
              <p className="text-base sm:text-lg text-white/90 mb-8 leading-relaxed">
                Свяжитесь с нами для обсуждения возможностей
                партнёрства и получения индивидуального
                коммерческого предложения
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="w-full sm:w-auto">Связаться с нами</Button>
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  Скачать презентацию
                </Button>
              </div>
            </div>

            {/* Right - Contact Cards */}
            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl hover:bg-white/15 transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 flex items-center justify-center text-2xl flex-shrink-0 border-2 border-white/40">
                    📞
                  </div>
                  <div>
                    <div className="text-sm text-white/70 mb-1 uppercase tracking-wider font-bold">
                      Телефон
                    </div>
                    <div className="text-lg font-bold">
                      +7 (727) 123-45-67
                    </div>
                    <div className="text-sm text-white/80">
                      Пн-Пт: 9:00 - 18:00
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-6 border-2 border-white/30 hover:border-[#006442] transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 flex items-center justify-center text-2xl flex-shrink-0 border-2 border-white/40">
                    ✉️
                  </div>
                  <div>
                    <div className="text-sm text-white/70 mb-1 uppercase tracking-wider font-bold">
                      Email
                    </div>
                    <div className="text-lg font-bold">
                      info@alpecon.kz
                    </div>
                    <div className="text-sm text-white/80">
                      Ответим в течение 24 часов
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-md flex items-center justify-center text-2xl flex-shrink-0 border border-white/30">
                    📍
                  </div>
                  <div>
                    <div className="text-sm text-white/70 mb-1">
                      Адрес
                    </div>
                    <div className="text-lg font-bold">
                      г. Алматы
                    </div>
                    <div className="text-sm text-white/80">
                      Республика Казахстан
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      </section>
    </div>
  );
}