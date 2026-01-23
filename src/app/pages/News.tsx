import { Button } from '@/app/components/Button';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { newsApi, NewsItem, PaginationInfo } from '@/services/newsApi';
import { useLanguage } from '@/app/contexts/LanguageContext';

const ITEMS_PER_PAGE = 9;

export function News() {
  const { language } = useLanguage();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getLocalizedField = (item: NewsItem, field: 'title' | 'content' | 'category') => {
    const langField = `${field}_${language}` as keyof NewsItem;
    return (item[langField] as string) || item[field];
  };

  useEffect(() => {
    loadNews(currentPage);
  }, [currentPage]);

  const loadNews = async (page: number) => {
    try {
      setLoading(true);
      const response = await newsApi.getAll(page, ITEMS_PER_PAGE);
      setNews(response.data);
      setPagination(response.pagination);
      setError(null);
    } catch (err) {
      setError('Ошибка загрузки новостей');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    if (!pagination) return [];
    const { page, pages } = pagination;
    const maxVisible = 5;

    if (pages <= maxVisible) {
      return Array.from({ length: pages }, (_, i) => i + 1);
    }

    let start = Math.max(1, page - 2);
    let end = Math.min(pages, start + maxVisible - 1);

    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl font-bold text-gray-600">Загрузка...</div>
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
            src="https://images.unsplash.com/photo-1683334086948-bd47e6fc45eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwZmFjdG9yeSUyMEthemFraHN0YW4lMjBuZXdzfGVufDF8fHx8MTc2ODU1NTAzN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative z-10 container mx-auto px-8 pt-32">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 mb-8">
            <div className="w-2 h-2 bg-[#006442] rounded-full"></div>
            <span className="text-white/90 text-sm font-medium tracking-wide uppercase">
              Новости компании
            </span>
          </div>
          <h1 className="text-white font-bold mb-6 uppercase text-[56px] leading-tight max-w-4xl">
            Новости и события
          </h1>
          <p className="text-white/90 text-xl max-w-3xl leading-relaxed">
            Последние события и достижения компании
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
              Архив
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 uppercase">Все новости</h2>
          </div>
          
          <div className="grid grid-cols-3 gap-8 mb-16">
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
                  <h3 className="text-xl font-bold text-gray-900 mb-3 uppercase group-hover:text-[#006442] transition-colors">
                    {getLocalizedField(newsItem, 'title')}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                    {getLocalizedField(newsItem, 'content')}
                  </p>
                  <Link to={`/news/${newsItem.id}`}>
                    <Button size="sm">Подробнее</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {pagination && pagination.pages > 1 && (
            <div className="flex justify-center items-center gap-2">
              {/* Previous button */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="w-12 h-12 rounded font-bold transition-all bg-white text-gray-700 border-2 border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ←
              </button>

              {/* Page numbers */}
              {getPageNumbers().map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-12 h-12 rounded font-bold transition-all ${
                    page === currentPage
                      ? 'bg-[#006442] text-white shadow-lg'
                      : 'bg-white text-gray-700 border-2 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}

              {/* Next button */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === pagination.pages}
                className="w-12 h-12 rounded font-bold transition-all bg-white text-gray-700 border-2 border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                →
              </button>
            </div>
          )}

          {/* Page info */}
          {pagination && (
            <div className="text-center mt-4 text-gray-500 text-sm">
              Страница {pagination.page} из {pagination.pages} (всего {pagination.total} новостей)
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="py-24 bg-[#0D0D0D] text-white">
        <div className="container mx-auto px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-block bg-white/10 text-white px-4 py-1.5 rounded text-xs font-bold mb-6 uppercase border border-white/20">
              Рассылка
            </div>
            <h2 className="text-4xl font-bold mb-6 uppercase">Подпишитесь на новости</h2>
            <p className="text-lg opacity-90 mb-12 leading-relaxed">
              Получайте актуальную информацию о событиях компании, новых продуктах и специальных предложениях
            </p>
            <div className="max-w-xl mx-auto flex gap-4">
              <input
                type="email"
                placeholder="Ваш email"
                className="flex-1 px-6 py-4 rounded border-2 border-white/20 bg-white/10 backdrop-blur-sm focus:outline-none focus:border-[#006442] text-white placeholder:text-white/50"
              />
              <Button size="lg">Подписаться</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}