import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { newsApi, NewsItem, getUploadUrl, PaginationInfo } from '@/services/newsApi';
import { Button } from '@/app/components/Button';
import { useLanguage } from '@/app/contexts/LanguageContext';

const ITEMS_PER_PAGE = 20;

const emptyForm = () => ({
  titleRu: '',
  titleKz: '',
  titleEn: '',
  contentRu: '',
  contentKz: '',
  contentEn: '',
  categoryRu: '',
  categoryKz: '',
  categoryEn: '',
  image: '',
  author: 'Алпекон Групп',
  source: '',
  publishedAt: new Date().toISOString().split('T')[0],
});

export function NewsManager() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState(emptyForm());

  useEffect(() => {
    loadNews(currentPage);
  }, [currentPage]);

  const loadNews = async (page: number) => {
    try {
      setLoading(true);
      const response = await newsApi.getAll(page, ITEMS_PER_PAGE);
      setNews(response.data);
      setPagination(response.pagination);
    } catch (error) {
      console.error('Ошибка загрузки новостей:', error);
      alert(t('admin.actions.loadError'));
    } finally {
      setLoading(false);
    }
  };

  const handleUnauthorized = () => {
    alert('Сессия истекла. Пожалуйста, войдите снова.');
    newsApi.logout();
    navigate('/dashboard-cms-2025/login');
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const data = await newsApi.uploadImage(file);
      setFormData((prev) => ({ ...prev, image: getUploadUrl(data.url) }));
    } catch (error) {
      if ((error as Error).message === 'UNAUTHORIZED') handleUnauthorized();
      else alert('Ошибка при загрузке изображения');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const newsData = {
        title: formData.titleRu,
        content: formData.contentRu,
        category: formData.categoryRu,
        image: formData.image,
        author: formData.author,
        source: formData.source,
        date: formData.publishedAt ? new Date(formData.publishedAt).toISOString() : undefined,
        titleRu: formData.titleRu,
        titleKz: formData.titleKz,
        titleEn: formData.titleEn,
        contentRu: formData.contentRu,
        contentKz: formData.contentKz,
        contentEn: formData.contentEn,
        categoryRu: formData.categoryRu,
        categoryKz: formData.categoryKz,
        categoryEn: formData.categoryEn,
      };

      if (editingNews) {
        await newsApi.update(editingNews.id, newsData);
        alert(t('admin.actions.updatedSuccess'));
      } else {
        await newsApi.create(newsData);
        alert(t('admin.actions.createdSuccess'));
      }

      setFormData(emptyForm());
      setShowForm(false);
      setEditingNews(null);
      loadNews(currentPage);
    } catch (error) {
      if ((error as Error).message === 'UNAUTHORIZED') handleUnauthorized();
      else alert(t('admin.actions.error'));
    }
  };

  const handleEdit = (newsItem: NewsItem) => {
    setEditingNews(newsItem);
    setFormData({
      titleRu: newsItem.titleRu || newsItem.title,
      titleKz: newsItem.titleKz || '',
      titleEn: newsItem.titleEn || '',
      contentRu: newsItem.contentRu || newsItem.content,
      contentKz: newsItem.contentKz || '',
      contentEn: newsItem.contentEn || '',
      categoryRu: newsItem.categoryRu || newsItem.category,
      categoryKz: newsItem.categoryKz || '',
      categoryEn: newsItem.categoryEn || '',
      image: newsItem.image,
      author: newsItem.author,
      source: newsItem.source || '',
      publishedAt: newsItem.date
        ? new Date(newsItem.date).toISOString().split('T')[0]
        : new Date().toISOString().split('T')[0],
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm(t('admin.actions.deleteConfirm'))) return;

    try {
      await newsApi.delete(id);
      alert(t('admin.actions.deletedSuccess'));
      loadNews(currentPage);
    } catch (error) {
      if ((error as Error).message === 'UNAUTHORIZED') handleUnauthorized();
      else alert(t('admin.actions.deleteError'));
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingNews(null);
    setFormData(emptyForm());
  };

  if (loading && news.length === 0) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="text-2xl font-bold text-gray-600">{t('admin.loading')}</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl">
      <div className="bg-white rounded-md shadow-lg p-8 mb-8 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 uppercase">{t('admin.panel.news')}</h2>
          <p className="text-gray-600 mt-1">{t('admin.subtitle')}</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} size="lg">
          {showForm ? t('admin.cancelButton') : t('admin.createButton')}
        </Button>
      </div>

      {showForm && (
        <div className="bg-white rounded-md shadow-lg p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 uppercase">
            {editingNews ? t('admin.editNews') : t('admin.createNews')}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="border-2 border-gray-200 rounded-md p-6">
              <h4 className="text-lg font-bold text-gray-900 mb-4 uppercase">Заголовок *</h4>
              <div className="space-y-3">
                {(['ru', 'kz', 'en'] as const).map((lang) => (
                  <div key={lang}>
                    <label className="block text-xs font-bold text-gray-600 mb-1 uppercase">{lang}</label>
                    <textarea
                      value={formData[`title${lang.charAt(0).toUpperCase() + lang.slice(1)}` as 'titleRu' | 'titleKz' | 'titleEn']}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [`title${lang === 'ru' ? 'Ru' : lang === 'kz' ? 'Kz' : 'En'}`]: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-[#006442] focus:outline-none resize-y"
                      rows={2}
                      required={lang === 'ru'}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="border-2 border-gray-200 rounded-md p-6">
              <h4 className="text-lg font-bold text-gray-900 mb-4 uppercase">Содержание *</h4>
              <div className="space-y-3">
                {(['ru', 'kz', 'en'] as const).map((lang) => (
                  <div key={lang}>
                    <label className="block text-xs font-bold text-gray-600 mb-1 uppercase">{lang}</label>
                    <textarea
                      value={formData[`content${lang.charAt(0).toUpperCase() + lang.slice(1)}` as 'contentRu' | 'contentKz' | 'contentEn']}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [`content${lang === 'ru' ? 'Ru' : lang === 'kz' ? 'Kz' : 'En'}`]: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-[#006442] focus:outline-none resize-y min-h-[120px]"
                      rows={6}
                      required={lang === 'ru'}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="border-2 border-gray-200 rounded-md p-6">
              <h4 className="text-lg font-bold text-gray-900 mb-4 uppercase">Категория</h4>
              <div className="space-y-3">
                {(['ru', 'kz', 'en'] as const).map((lang) => (
                  <div key={lang}>
                    <label className="block text-xs font-bold text-gray-600 mb-1 uppercase">{lang}</label>
                    <input
                      type="text"
                      value={formData[`category${lang === 'ru' ? 'Ru' : lang === 'kz' ? 'Kz' : 'En'}` as 'categoryRu' | 'categoryKz' | 'categoryEn']}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [`category${lang === 'ru' ? 'Ru' : lang === 'kz' ? 'Kz' : 'En'}`]: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-[#006442] focus:outline-none"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="border-2 border-gray-200 rounded-md p-6">
              <h4 className="text-lg font-bold text-gray-900 mb-4 uppercase">Дата публикации</h4>
              <input
                type="date"
                value={formData.publishedAt}
                onChange={(e) => setFormData({ ...formData, publishedAt: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-md focus:border-[#006442] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase">{t('admin.form.author')}</label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-md focus:border-[#006442] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase">Ссылка на источник</label>
                <input
                  type="url"
                  value={formData.source}
                  onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-md focus:border-[#006442] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 uppercase">{t('admin.form.image')}</label>
              <input
                type="text"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-md focus:border-[#006442] focus:outline-none mb-3"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploading}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-[#006442] file:text-white"
              />
              {formData.image && (
                <img src={formData.image} alt="Preview" className="w-64 h-40 object-cover rounded-md mt-3" />
              )}
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="px-8 py-4 bg-[#006442] text-white font-bold text-sm uppercase rounded-md hover:bg-[#005033]"
              >
                {editingNews ? t('admin.form.submitUpdate') : t('admin.form.submitCreate')}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="px-8 py-4 bg-gray-300 text-gray-900 font-bold text-sm uppercase rounded-md hover:bg-gray-400"
              >
                {t('admin.form.cancel')}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-md shadow-lg p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 uppercase">
          {t('admin.allNews')} ({pagination?.total ?? news.length})
        </h3>

        <div className="space-y-4">
          {news.map((newsItem) => (
            <div key={newsItem.id} className="flex gap-6 p-6 bg-gray-50 rounded-md">
              {newsItem.image && (
                <img src={newsItem.image} alt={newsItem.title} className="w-32 h-24 object-cover rounded-md shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <h4 className="text-xl font-bold text-gray-900">{newsItem.title}</h4>
                <p className="text-gray-600 mt-1 line-clamp-2">{newsItem.content}</p>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-xs font-bold text-[#006442] uppercase px-3 py-1 bg-green-50 rounded-md">
                    {newsItem.category}
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(newsItem.date).toLocaleDateString('ru-RU')}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => handleEdit(newsItem)}
                  className="px-4 py-2 bg-blue-600 text-white text-sm font-bold uppercase rounded-md hover:bg-blue-700"
                >
                  {t('admin.actions.edit')}
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(newsItem.id)}
                  className="px-4 py-2 bg-red-600 text-white text-sm font-bold uppercase rounded-md hover:bg-red-700"
                >
                  {t('admin.actions.delete')}
                </button>
              </div>
            </div>
          ))}
        </div>

        {pagination && pagination.pages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            <button
              type="button"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded font-bold bg-gray-200 disabled:opacity-50"
            >
              ←
            </button>
            {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 rounded font-bold ${
                  page === currentPage ? 'bg-[#006442] text-white' : 'bg-gray-200'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === pagination.pages}
              className="px-4 py-2 rounded font-bold bg-gray-200 disabled:opacity-50"
            >
              →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
