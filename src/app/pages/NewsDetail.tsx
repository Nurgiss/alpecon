import { Button } from '@/app/components/Button';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { newsApi, type NewsItem } from '@/services/newsApi';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { getLocalizedNewsField } from '@/utils/newsHelpers';

export function NewsDetail() {
  const { id } = useParams<{ id: string }>();
  const { language, t } = useLanguage();
  const [news, setNews] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      if (!id) {
        setError('ID новости не указан');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await newsApi.getById(id);
        setNews(data);
        setError(null);
      } catch (err) {
        setError('Не удалось загрузить новость');
        console.error('Error fetching news:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [id]);

  const getLocalizedField = (item: NewsItem | null, field: 'title' | 'content' | 'category'): string => {
    if (!item) return '';
    return getLocalizedNewsField(item, language, field);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl font-bold text-gray-600">{t('newsDetail.loading')}</div>
      </div>
    );
  }

  if (error || !news) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900 mb-4">{t('newsDetail.notFound')}</div>
          <Link to="/news">
            <Button>{t('newsDetail.backToNews')}</Button>
          </Link>
        </div>
      </div>
    );
  }

  const title = getLocalizedField(news, 'title');
  const content = getLocalizedField(news, 'content');
  const category = getLocalizedField(news, 'category');

  return (
    <div>
      {/* Hero Section with News Image */}
      <section className="relative h-[70vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={news.image}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-8 pb-16 pt-32">
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-6">
              <span className="inline-block bg-[#006442] text-white px-4 py-2 rounded text-sm font-bold uppercase">
                {category}
              </span>
              <span className="text-white/80 text-base">{formatDate(news.date)}</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-geologica font-bold text-white uppercase tracking-tight leading-[1.1] mb-6">
              {title}
            </h1>
            
            <div className="flex items-center gap-4 text-white/80">
              <span>{t('newsDetail.author')} {news.author}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-8">
          <div className="max-w-4xl mx-auto">
            {/* Article Text */}
            <article className="prose prose-lg max-w-none">
              <div className="text-lg text-gray-700 leading-relaxed whitespace-pre-wrap">
                {content}
              </div>
            </article>

            {/* Article Footer */}
            <div className="mt-16 pt-8 border-t border-gray-200">
              <Link to="/news">
                <Button>{t('newsDetail.backToNews')}</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
