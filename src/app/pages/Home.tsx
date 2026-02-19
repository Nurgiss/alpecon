
import { Button } from "@/app/components/Button";
// import { Partners } from "@/app/components/Partners";
import { useLanguage } from '@/app/contexts/LanguageContext';
import { useState, useEffect } from 'react';
import { newsApi, type NewsItem } from '@/services/newsApi';
import { Link } from 'react-router-dom';
import imgHeroBackground from '@/assets/Hero.png';
import imgDirector from '@/assets/ceo.png';
import imgPektin from '@/assets/pektin.jpg';
import imgFoodStorage from '@/assets/foodstorage.jpg';
import img1 from '@/assets/1.jpg';
import img2 from '@/assets/2.jpeg';
import img3 from '@/assets/3.jpg';
import img4Storage from '@/assets/4 - storage.jpeg';

const imgGeminiGeneratedImage = "https://images.unsplash.com/photo-1594737626072-90dc274bc2bc?w=800&auto=format&fit=crop";

export function Home() {
  const { t, language } = useLanguage();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await newsApi.getAll(1, 3); // Fetch only 3 latest news
        setNews(response.data);
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
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-geologica font-bold text-gray-900 uppercase tracking-tight leading-[1.1] mb-4 sm:mb-6">
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
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-geologica font-bold text-gray-900 uppercase tracking-tight leading-[1.1] mb-6 sm:mb-8">{t('home.aboutSection.title')}</h2>
              <div className="space-y-4 text-base sm:text-lg lg:text-lg text-gray-700 font-geist leading-relaxed">
                {t('home.aboutSection.text').split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
              <Link to="/about" className="w-full sm:w-auto bg-[rgb(175_37_28)] text-white px-6 sm:px-8 py-3 sm:py-4 font-bold text-sm uppercase tracking-wider hover:bg-[rgb(150_30_25)] transition-colors rounded-md shadow-lg inline-block text-center mt-6">
                {t('home.about.learnMore')}
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-4 sm:space-y-6">
                <div className="overflow-hidden rounded-md shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1651525670054-279c154bc3b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcnVpdCUyMHByb2Nlc3NpbmclMjBmYWN0b3J5JTIwcHJvZHVjdGlvbnxlbnwxfHx8fDE3NzEzNTM1OTd8MA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Apple Orchard"
                    className="w-full h-64 sm:h-72 object-cover transition-all duration-500"
                  />
                </div>
                <div className="overflow-hidden rounded-md shadow-lg">
                  <img
                    src={img2}
                    alt="Fresh Fruits"
                    className="w-full h-48 sm:h-56 object-cover transition-all duration-500"
                  />
                </div>
              </div>
              <div className="space-y-4 sm:space-y-6 pt-8 sm:pt-12">
                <div className="overflow-hidden rounded-md shadow-lg">
                  <img
                    src={img1}
                    alt="Solar Panels"
                    className="w-full h-48 sm:h-56 object-cover"
                  />
                </div>
                <div className="overflow-hidden rounded-md shadow-lg">
                  <img
                    src={img3}
                    alt="Greenhouse"
                    className="w-full h-64 sm:h-72 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1655176198204-e939d46fc584?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2YXN0JTIwYWdyaWN1bHR1cmFsJTIwZmllbGQlMjBhZXJpYWwlMjB2aWV3JTIwZ29sZGVufGVufDF8fHx8MTc3MTM1NzUwMHww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black/80"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-geologica font-bold text-white uppercase tracking-tight leading-[1.1] mb-20 text-center">
            МЫ В ЦИФРАХ
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-10 rounded-2xl hover:bg-white/15 transition-all duration-300 text-center">
              <div className="text-6xl font-bold text-white mb-4 font-['Geologica']">
                262,000
              </div>
              <div className="text-sm font-bold uppercase tracking-widest text-white/80 mb-3 font-['Geist']">
                ТОНН CO₂-ЭКВ
              </div>
              <p className="text-white/70 text-sm font-['Geist']">
                Предотвращение выбросов парниковых газов
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-10 rounded-2xl hover:bg-white/15 transition-all duration-300 text-center">
              <div className="text-6xl font-bold text-white mb-4 font-['Geologica']">
                100 000
              </div>
              <div className="text-sm font-bold uppercase tracking-widest text-white/80 mb-3 font-['Geist']">
                ТОНН В ГОД
              </div>
              <p className="text-white/70 text-sm font-['Geist']">
                Мощность переработки органических отходов
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-10 rounded-2xl hover:bg-white/15 transition-all duration-300 text-center">
              <div className="text-6xl font-bold text-white mb-4 font-['Geologica']">
                2024
              </div>
              <div className="text-sm font-bold uppercase tracking-widest text-white/80 mb-3 font-['Geist']">
                ГОД ОСНОВАНИЯ
              </div>
              <p className="text-white/70 text-sm font-['Geist']">
                Начало работы компании
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Directions Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-geologica font-bold text-gray-900 uppercase tracking-tight leading-[1.1] mb-16 text-center">
            НАПРАВЛЕНИЯ ДЕЯТЕЛЬНОСТИ
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                image: "https://images.unsplash.com/photo-1689650552915-d547c24fe85e?w=800&auto=format&fit=crop",
                title: "Яблоневый сад",
                category: "СЕЛЬСКОЕ ХОЗЯЙСТВО",
              },
              {
                image: "https://images.unsplash.com/photo-1651525670099-f828fb5478a5?w=800&auto=format&fit=crop",
                title: "Завод концентратов",
                category: "ПЕРЕРАБОТКА",
              },
              {
                image: imgPektin,
                title: "Завод пектина",
                category: "ПЕРЕРАБОТКА",
              },
              {
                image: imgFoodStorage,
                title: "Пункты приемки фруктов и овощей",
                category: "ЛОГИСТИКА",
              },
              {
                image: img4Storage,
                title: "Фруктохранилище",
                category: "ХРАНЕНИЕ",
              },
              {
                image: "https://images.unsplash.com/photo-1744230673231-865d54a0aba4?w=800&auto=format&fit=crop",
                title: "IT Платформа",
                category: "ТЕХНОЛОГИИ",
              },
            ].map((direction, index) => (
              <div
                key={index}
                className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 h-[280px]"
              >
                <img
                  src={direction.image}
                  alt={direction.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <div className="text-xs font-bold uppercase tracking-widest mb-3 text-white/70 font-['Geist']">
                    {direction.category}
                  </div>
                  <h3 className="text-xl font-bold uppercase font-['Geologica']">
                    {direction.title}
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
          <div className="mb-12 sm:mb-16 text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-geologica font-bold text-gray-900 uppercase tracking-tight leading-[1.1] mb-4">
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
                        <h3 className="text-xl sm:text-2xl font-geologica font-bold uppercase tracking-tight leading-tight mb-2 sm:mb-3">
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