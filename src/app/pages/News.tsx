import { Button } from '@/app/components/Button';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { newsApi, NewsItem } from '@/services/newsApi';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { useHeroImage } from '@/contexts/HeroImagesContext';

export function News() {
  const { language, t } = useLanguage();
  const heroImage = useHeroImage('news');
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getLocalizedField = (item: NewsItem, field: 'title' | 'content' | 'category') => {
    const langField = `${field}_${language}` as keyof NewsItem;
    return (item[langField] as string) || item[field];
  };

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    try {
      setLoading(true);
      const response = await newsApi.getAll();
      setNews(response.data);
      setError(null);
    } catch (err) {
      setError(t('newsPage.error'));
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl font-bold text-gray-600">{t('newsPage.loading')}</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl font-bold text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section - Full Screen */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 lg:pt-32 text-center flex flex-col items-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-geologica font-bold text-white uppercase tracking-tight leading-[1.1] mb-6">
            {t('newsPage.hero.title')}
          </h1>
          <p className="text-white/90 text-base sm:text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto">
            {t('newsPage.hero.subtitle')}
          </p>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-12 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-4 bg-white rounded-full"></div>
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-8">
          <div className="text-center mb-16">
            <div className="inline-block bg-gray-900 text-white px-4 py-1.5 rounded-md text-xs font-bold mb-4 uppercase shadow-lg">
              {t('newsPage.archive')}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-geologica font-bold text-gray-900 uppercase tracking-tight leading-[1.1] mb-4">{t('newsPage.allNewsTitle')}</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {news.map((newsItem) => (
              <div key={newsItem.id} className="bg-white rounded-md shadow-lg overflow-hidden hover:shadow-xl transition-all group">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={newsItem.image}
                    alt={newsItem.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="inline-block bg-[#006442] text-white px-3 py-1 rounded-md text-xs font-bold uppercase shadow-lg">
                      {getLocalizedField(newsItem, 'category')}
                    </div>
                    <span className="text-white/90 text-sm ml-3">
                      {new Date(newsItem.date).toLocaleDateString('ru-RU')}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl sm:text-2xl font-geologica font-bold text-gray-900 uppercase tracking-tight leading-tight mb-3 group-hover:text-[#006442] transition-colors">
                    {getLocalizedField(newsItem, 'title')}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                    {getLocalizedField(newsItem, 'content')}
                  </p>
                  <Link to={`/news/${newsItem.id}`}>
                    <Button size="sm">{t('newsPage.readMore')}</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}