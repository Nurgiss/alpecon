
import { Button } from "@/app/components/Button";
// import { Partners } from "@/app/components/Partners";
import { useLanguage } from '@/app/contexts/LanguageContext';
import { useState, useEffect } from 'react';
import { newsApi, type NewsItem } from '@/services/newsApi';
import { Link } from 'react-router-dom';
import imgHeroBackground from '@/assets/Hero.png';
import imgDirector from '@/assets/ceo.png';

const imgGeminiGeneratedImage = "https://images.unsplash.com/photo-1594737626072-90dc274bc2bc?w=800&auto=format&fit=crop";

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

        {/* Content - Centered */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 lg:pt-32">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-white font-geologica font-bold mb-8 sm:mb-10 leading-[1.1] uppercase text-4xl sm:text-5xl lg:text-6xl tracking-tight">
              {t('home.hero.title')}
            </h1>

            <p className="text-white/80 text-base sm:text-lg font-geist leading-relaxed max-w-3xl mx-auto mb-12">
              {language === 'ru' ? 'Передовые технологии переработки сельхозпродукции. Полный производственный цикл от сырья до готовой продукции.' : language === 'kz' ? 'Ауыл шаруашылығы өнімдерін қайта өңдеудің озық технологиялары. Шикізаттан дайын өнімге дейінгі толық өндірістік цикл.' : 'Advanced agricultural processing technologies. Full production cycle from raw materials to finished products.'}
            </p>
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
              <div className="relative">
                <div className="overflow-hidden max-w-sm mx-auto rounded-md">
                  <img
                    src={imgDirector}
                    alt="Director"
                    className="w-full h-[300px] sm:h-[350px] lg:h-[400px] object-cover"
                  />
                </div>
              </div>

              {/* Right - Quote */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl sm:text-4xl font-geologica font-bold text-gray-900 leading-[1.1] uppercase tracking-tight mb-4 sm:mb-6">
                    {t('home.director.title')}
                  </h2>
                </div>

                <div className="space-y-4 text-lg text-gray-700 font-geist leading-relaxed">
                  <p className="text-lg text-gray-700 font-geist leading-relaxed">
                    {t('home.director.text1')}
                  </p>

                  <p className="font-semibold text-gray-900 pt-4 border-t border-gray-200">
                    {t('home.director.name')}
                    <br />
                    <span className="text-base text-gray-600 font-geist font-normal">
                      {t('home.director.position')}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section - Mission Style */}
      <section className="py-16 sm:py-24 lg:py-32 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center mb-20 sm:mb-24 lg:mb-32">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-geologica font-bold text-gray-900 mb-6 sm:mb-8 uppercase">О нашем холдинге</h2>
              <p className="text-base sm:text-lg lg:text-lg text-gray-700 font-geist leading-relaxed">
                Alpecon Group — казахстанская инвестиционная компания, реализующая в Алматинской области масштабный экспортно-ориентированный проект по созданию интегрированного агропромышленного кластера глубокой переработки фруктов и овощей.
              </p>
              <Link to="/about" className="w-full sm:w-auto bg-[rgb(175_37_28)] text-white px-6 sm:px-8 py-3 sm:py-4 font-bold text-sm uppercase tracking-wider hover:bg-[rgb(150_30_25)] transition-colors rounded-md shadow-lg inline-block text-center mt-6">
                {t('home.about.learnMore')}
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-4 sm:space-y-6">
                <div className="overflow-hidden rounded-md shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80"
                    alt="Plant Facility 1"
                    className="w-full h-64 sm:h-72 object-cover transition-all duration-500"
                  />
                </div>
                <div className="overflow-hidden rounded-md shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1635961179148-3d886568775c?w=800&auto=format&fit=crop&q=80"
                    alt="Plant Facility 2"
                    className="w-full h-48 sm:h-56 object-cover transition-all duration-500"
                  />
                </div>
              </div>
              <div className="space-y-4 sm:space-y-6 pt-8 sm:pt-12">
                <div className="overflow-hidden rounded-md shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1594737626072-90dc274bc2bc?w=800&auto=format&fit=crop&q=80"
                    alt="Plant Facility 3"
                    className="w-full h-48 sm:h-56 object-cover"
                  />
                </div>
                <div className="overflow-hidden rounded-md shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1745517512760-dd48be2f7cb8?w=800&auto=format&fit=crop&q=80"
                    alt="Plant Facility 4"
                    className="w-full h-64 sm:h-72 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Numbers - Clean Dark Section */}
      <section className="relative py-16 sm:py-20 bg-[#133327] text-white overflow-hidden">

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="pl-4 sm:pl-8 mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-geologica font-bold mb-3 sm:mb-4 uppercase tracking-tight">
              {t('home.stats.title')}
            </h2>
            <p className="text-lg text-white/80 font-geist max-w-2xl">
              {t('home.stats.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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
            <h2 className="text-3xl sm:text-4xl font-geologica font-bold text-gray-900 mb-6 sm:mb-8 uppercase tracking-tight leading-[1.1]">
              {t('home.directions.title')}
            </h2>
            <p className="text-base sm:text-lg text-gray-600 font-geist max-w-3xl">
              {t('home.directions.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                title: t('home.directions.item1.title'),
                icon: t('home.directions.item1.icon'),
                image: "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=800&auto=format&fit=crop"
              },
              {
                title: t('home.directions.item2.title'),
                icon: t('home.directions.item2.icon'),
                image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop"
              },
              {
                title: t('home.directions.item3.title'),
                icon: t('home.directions.item3.icon'),
                image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&auto=format&fit=crop"
              },
              {
                title: t('home.directions.item4.title'),
                icon: t('home.directions.item4.icon'),
                image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop"
              },
              {
                title: t('home.directions.item5.title'),
                icon: t('home.directions.item5.icon'),
                image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&auto=format&fit=crop"
              },
              {
                title: t('home.directions.item6.title'),
                icon: t('home.directions.item6.icon'),
                image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop"
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="relative overflow-hidden shadow-md hover:shadow-xl p-8 sm:p-10 transition-all rounded-lg min-h-[200px] flex flex-col items-center justify-center text-center bg-cover bg-center"
                style={{ backgroundImage: `url(${item.image})` }}
              >
                <div className="absolute inset-0 bg-[#133327]/85"></div>
                <div className="relative z-10">
                  <h3 className="text-xl sm:text-2xl font-geologica font-bold text-white leading-tight">
                    {item.title}
                  </h3>
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
            <h2 className="text-3xl sm:text-4xl font-geologica font-bold text-gray-900 mb-4 uppercase tracking-tight leading-[1.1]">
              {t('home.news.title')}
            </h2>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="text-gray-600 text-lg font-geist">{t('home.news.loading')}</div>
            </div>
          ) : news.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-gray-600 text-lg font-geist">{t('home.news.noNews')}</div>
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
                        <h3 className="text-xl sm:text-2xl font-geologica font-bold mb-2 sm:mb-3 leading-tight uppercase tracking-tight">
                          {getLocalizedField(item, 'title')}
                        </h3>
                        <p className="text-xs sm:text-sm font-geist leading-relaxed opacity-90 line-clamp-3">
                          {getLocalizedField(item, 'content').substring(0, 150)}...
                        </p>
                        <div className="mt-3 sm:mt-4">
                          <span className="inline-block bg-[#006442] text-white px-4 py-2 text-xs font-bold uppercase rounded-md shadow-lg">
                            {t('home.news.readMore')}
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
              <Button size="lg" variant="secondary">{t('home.news.allNews')}</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Partners Section - commented out */}
      {/* <Partners /> */}
    </div>
  );
}