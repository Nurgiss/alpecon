import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { newsApi, NewsItem, getUploadUrl, PaginationInfo } from '@/services/newsApi';
import { Button } from '@/app/components/Button';
import { useLanguage } from '@/app/contexts/LanguageContext';

const ITEMS_PER_PAGE = 20;

export function Admin() {
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
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
    source: ''
  });

  useEffect(() => {
    // Check authentication on mount
    if (!newsApi.isAuthenticated()) {
      navigate('/admin/login');
      return;
    }
    loadNews(currentPage);
  }, [navigate, currentPage]);

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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const data = await newsApi.uploadImage(file);
      const imageUrl = getUploadUrl(data.url);

      setFormData(prev => ({ ...prev, image: imageUrl }));
    } catch (error) {
      if ((error as Error).message === 'UNAUTHORIZED') {
        alert('Сессия истекла. Пожалуйста, войдите снова.');
        newsApi.logout();
        navigate('/admin/login');
      } else {
        alert('Ошибка при загрузке изображения');
      }
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Преобразуем данные для API - отправляем и старые поля (для совместимости), и новые мультиязычные
      const newsData = {
        title: formData.titleRu, // Используем русский как основной
        content: formData.contentRu,
        category: formData.categoryRu,
        image: formData.image,
        author: formData.author,
        source: formData.source,
        // Добавляем мультиязычные поля
        titleRu: formData.titleRu,
        titleKz: formData.titleKz,
        titleEn: formData.titleEn,
        contentRu: formData.contentRu,
        contentKz: formData.contentKz,
        contentEn: formData.contentEn,
        categoryRu: formData.categoryRu,
        categoryKz: formData.categoryKz,
        categoryEn: formData.categoryEn
      };

      if (editingNews) {
        await newsApi.update(editingNews.id, newsData);
        alert(t('admin.actions.updatedSuccess'));
      } else {
        await newsApi.create(newsData);
        alert(t('admin.actions.createdSuccess'));
      }
      
      setFormData({ 
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
        source: ''
      });
      setShowForm(false);
      setEditingNews(null);
      loadNews(currentPage);
    } catch (error) {
      console.error('Ошибка сохранения:', error);
      if ((error as Error).message === 'UNAUTHORIZED') {
        alert('Сессия истекла. Пожалуйста, войдите снова.');
        newsApi.logout();
        navigate('/admin/login');
      } else {
        alert(t('admin.actions.error'));
      }
    }
  };

  const handleEdit = (newsItem: NewsItem) => {
    setEditingNews(newsItem);
    setFormData({
      titleRu: (newsItem as any).titleRu || newsItem.title,
      titleKz: (newsItem as any).titleKz || '',
      titleEn: (newsItem as any).titleEn || '',
      contentRu: (newsItem as any).contentRu || newsItem.content,
      contentKz: (newsItem as any).contentKz || '',
      contentEn: (newsItem as any).contentEn || '',
      categoryRu: (newsItem as any).categoryRu || newsItem.category,
      categoryKz: (newsItem as any).categoryKz || '',
      categoryEn: (newsItem as any).categoryEn || '',
      image: newsItem.image,
      author: newsItem.author,
      source: newsItem.source || ''
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
      console.error('Ошибка удаления:', error);
      if ((error as Error).message === 'UNAUTHORIZED') {
        alert('Сессия истекла. Пожалуйста, войдите снова.');
        newsApi.logout();
        navigate('/admin/login');
      } else {
        alert(t('admin.actions.deleteError'));
      }
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingNews(null);
    setFormData({
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
      source: ''
    });
  };

  const handleLogout = () => {
    if (confirm('Вы уверены, что хотите выйти?')) {
      newsApi.logout();
      navigate('/admin/login');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl font-bold text-gray-600">{t('admin.loading')}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-8">
        {/* Header */}
        <div className="bg-white rounded-md shadow-lg p-8 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 uppercase mb-2">{t('admin.title')}</h1>
              <p className="text-gray-600">{t('admin.subtitle')}</p>
            </div>
            <div className="flex gap-4 items-center">
              {/* Language Switcher */}
              <div className="flex gap-2">
                {(['ru', 'kz', 'en'] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`px-4 py-2 rounded-md text-sm font-bold uppercase transition-colors ${
                      language === lang
                        ? 'bg-[#006442] text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
              <Button
                onClick={() => setShowForm(!showForm)}
                size="lg"
              >
                {showForm ? t('admin.cancelButton') : t('admin.createButton')}
              </Button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white text-sm font-bold uppercase rounded-md hover:bg-red-700 transition-colors"
              >
                Выйти
              </button>
            </div>
          </div>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-md shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 uppercase">
              {editingNews ? t('admin.editNews') : t('admin.createNews')}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Заголовки */}
              <div className="border-2 border-gray-200 rounded-md p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 uppercase">Заголовок / Title / Тақырып *</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">Русский (RU)</label>
                    <input
                      type="text"
                      value={formData.titleRu}
                      onChange={(e) => setFormData({ ...formData, titleRu: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-[#006442] focus:outline-none"
                      required
                      placeholder="Введите заголовок на русском"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">Қазақша (KZ)</label>
                    <input
                      type="text"
                      value={formData.titleKz}
                      onChange={(e) => setFormData({ ...formData, titleKz: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-[#006442] focus:outline-none"
                      placeholder="Тақырыпты қазақ тілінде енгізіңіз"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">English (EN)</label>
                    <input
                      type="text"
                      value={formData.titleEn}
                      onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-[#006442] focus:outline-none"
                      placeholder="Enter title in English"
                    />
                  </div>
                </div>
              </div>

              {/* Содержание */}
              <div className="border-2 border-gray-200 rounded-md p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 uppercase">Содержание / Content / Мазмұны *</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">Русский (RU)</label>
                    <textarea
                      value={formData.contentRu}
                      onChange={(e) => setFormData({ ...formData, contentRu: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-[#006442] focus:outline-none resize-none"
                      rows={4}
                      required
                      placeholder="Введите текст на русском"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">Қазақша (KZ)</label>
                    <textarea
                      value={formData.contentKz}
                      onChange={(e) => setFormData({ ...formData, contentKz: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-[#006442] focus:outline-none resize-none"
                      rows={4}
                      placeholder="Мәтінді қазақ тілінде енгізіңіз"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">English (EN)</label>
                    <textarea
                      value={formData.contentEn}
                      onChange={(e) => setFormData({ ...formData, contentEn: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-[#006442] focus:outline-none resize-none"
                      rows={4}
                      placeholder="Enter content in English"
                    />
                  </div>
                </div>
              </div>

              {/* Категория */}
              <div className="border-2 border-gray-200 rounded-md p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 uppercase">Категория / Category / Санат</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">Русский (RU)</label>
                    <input
                      type="text"
                      value={formData.categoryRu}
                      onChange={(e) => setFormData({ ...formData, categoryRu: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-[#006442] focus:outline-none"
                      placeholder="Производство, Партнерство и т.д."
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">Қазақша (KZ)</label>
                    <input
                      type="text"
                      value={formData.categoryKz}
                      onChange={(e) => setFormData({ ...formData, categoryKz: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-[#006442] focus:outline-none"
                      placeholder="Өндіріс, Серіктестік және т.б."
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">English (EN)</label>
                    <input
                      type="text"
                      value={formData.categoryEn}
                      onChange={(e) => setFormData({ ...formData, categoryEn: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-[#006442] focus:outline-none"
                      placeholder="Production, Partnership, etc."
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase">
                    {t('admin.form.author')}
                  </label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-md focus:border-[#006442] focus:outline-none text-sm"
                  />
                  <p className="text-xs text-gray-500 mt-1">Источник (отображается маленьким шрифтом)</p>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase">
                    Ссылка на источник
                  </label>
                  <input
                    type="url"
                    value={formData.source}
                    onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-md focus:border-[#006442] focus:outline-none"
                    placeholder="https://example.com/article"
                  />
                  <p className="text-xs text-gray-500 mt-1">URL ссылки на оригинальную статью (опционально)</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase">
                  {t('admin.form.image')}
                </label>
                <div className="space-y-3">
                  <div>
                    <input
                      type="text"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-md focus:border-[#006442] focus:outline-none"
                      placeholder="https://example.com/image.jpg или загрузите файл ниже"
                    />
                    <p className="text-xs text-gray-500 mt-1">Вставьте URL изображения</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-600">или</span>
                  </div>
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploading}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-md focus:border-[#006442] focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#006442] file:text-white hover:file:bg-[#005033] disabled:opacity-50"
                    />
                    {uploading && <p className="text-sm text-gray-600 mt-2">Загрузка...</p>}
                  </div>
                </div>
              </div>

              {formData.image && (
                <div>
                  <img src={formData.image} alt="Preview" className="w-64 h-40 object-cover rounded-md" />
                </div>
              )}

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="px-8 py-4 bg-[#006442] text-white font-bold text-sm uppercase tracking-wider hover:bg-[#005033] transition-colors rounded-md shadow-lg"
                >
                  {editingNews ? t('admin.form.submitUpdate') : t('admin.form.submitCreate')}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-8 py-4 bg-gray-300 text-gray-900 font-bold text-sm uppercase tracking-wider hover:bg-gray-400 transition-colors rounded-md"
                >
                  {t('admin.form.cancel')}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* News List */}
        <div className="bg-white rounded-md shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 uppercase">
            {t('admin.allNews')} ({news.length})
          </h2>
          
          <div className="space-y-4">
            {news.map((newsItem) => (
              <div
                key={newsItem.id}
                className="flex gap-6 p-6 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
              >
                {newsItem.image && (
                  <img
                    src={newsItem.image}
                    alt={newsItem.title}
                    className="w-32 h-24 object-cover rounded-md flex-shrink-0"
                  />
                )}
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{newsItem.title}</h3>
                    <span className="text-sm text-gray-500">
                      {new Date(newsItem.date).toLocaleDateString('ru-RU')}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-3 line-clamp-2">{newsItem.content}</p>
                  
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-bold text-[#006442] uppercase px-3 py-1 bg-green-50 rounded-md">
                      {newsItem.category}
                    </span>
                    <span className="text-sm text-gray-500">{newsItem.author}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => handleEdit(newsItem)}
                    className="px-4 py-2 bg-blue-600 text-white text-sm font-bold uppercase rounded-md hover:bg-blue-700 transition-colors"
                  >
                    {t('admin.actions.edit')}
                  </button>
                  <button
                    onClick={() => handleDelete(newsItem.id)}
                    className="px-4 py-2 bg-red-600 text-white text-sm font-bold uppercase rounded-md hover:bg-red-700 transition-colors"
                  >
                    {t('admin.actions.delete')}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {pagination && pagination.pages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded font-bold transition-all bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ←
              </button>

              {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-10 h-10 rounded font-bold transition-all ${
                    page === currentPage
                      ? 'bg-[#006442] text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === pagination.pages}
                className="px-4 py-2 rounded font-bold transition-all bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                →
              </button>
            </div>
          )}

          {pagination && (
            <div className="text-center mt-4 text-gray-500 text-sm">
              Страница {pagination.page} из {pagination.pages} (всего {pagination.total} новостей)
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
