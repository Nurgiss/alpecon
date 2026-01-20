import { useState, useEffect } from 'react';
import { newsApi, NewsItem } from '@/services/newsApi';
import { Button } from '@/app/components/Button';
import { useLanguage } from '@/app/contexts/LanguageContext';

export function Admin() {
  const { language, setLanguage, t } = useLanguage();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title_ru: '',
    title_kz: '',
    title_en: '',
    content_ru: '',
    content_kz: '',
    content_en: '',
    category_ru: '',
    category_kz: '',
    category_en: '',
    image: '',
    author: 'Алпекон Групп'
  });

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    try {
      setLoading(true);
      const data = await newsApi.getAll();
      setNews(data);
    } catch (error) {
      console.error('Ошибка загрузки новостей:', error);
      alert(t('admin.actions.loadError'));
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formDataUpload = new FormData();
    formDataUpload.append('image', file);

    try {
      setUploading(true);
      const response = await fetch('http://localhost:3002/api/upload', {
        method: 'POST',
        body: formDataUpload,
      });
      
      if (!response.ok) throw new Error('Ошибка загрузки');
      
      const data = await response.json();
      const imageUrl = `http://localhost:3002${data.url}`;
      
      setFormData(prev => ({ ...prev, image: imageUrl }));
    } catch (error) {
      alert('Ошибка при загрузке изображения');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Преобразуем данные для API - отправляем и старые поля (для совместимости), и новые мультиязычные
      const newsData = {
        title: formData.title_ru, // Используем русский как основной
        content: formData.content_ru,
        category: formData.category_ru,
        image: formData.image,
        author: formData.author,
        // Добавляем мультиязычные поля
        title_ru: formData.title_ru,
        title_kz: formData.title_kz,
        title_en: formData.title_en,
        content_ru: formData.content_ru,
        content_kz: formData.content_kz,
        content_en: formData.content_en,
        category_ru: formData.category_ru,
        category_kz: formData.category_kz,
        category_en: formData.category_en
      };

      if (editingNews) {
        await newsApi.update(editingNews.id, newsData);
        alert(t('admin.actions.updatedSuccess'));
      } else {
        await newsApi.create(newsData);
        alert(t('admin.actions.createdSuccess'));
      }
      
      setFormData({ 
        title_ru: '', 
        title_kz: '', 
        title_en: '', 
        content_ru: '', 
        content_kz: '', 
        content_en: '', 
        category_ru: '', 
        category_kz: '', 
        category_en: '', 
        image: '', 
        author: 'Алпекон Групп' 
      });
      setShowForm(false);
      setEditingNews(null);
      loadNews();
    } catch (error) {
      console.error('Ошибка сохранения:', error);
      alert(t('admin.actions.error'));
    }
  };

  const handleEdit = (newsItem: NewsItem) => {
    setEditingNews(newsItem);
    setFormData({
      title_ru: (newsItem as any).title_ru || newsItem.title,
      title_kz: (newsItem as any).title_kz || '',
      title_en: (newsItem as any).title_en || '',
      content_ru: (newsItem as any).content_ru || newsItem.content,
      content_kz: (newsItem as any).content_kz || '',
      content_en: (newsItem as any).content_en || '',
      category_ru: (newsItem as any).category_ru || newsItem.category,
      category_kz: (newsItem as any).category_kz || '',
      category_en: (newsItem as any).category_en || '',
      image: newsItem.image,
      author: newsItem.author
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm(t('admin.actions.deleteConfirm'))) return;
    
    try {
      await newsApi.delete(id);
      alert(t('admin.actions.deletedSuccess'));
      loadNews();
    } catch (error) {
      console.error('Ошибка удаления:', error);
      alert(t('admin.actions.deleteError'));
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingNews(null);
    setFormData({ 
      title_ru: '', 
      title_kz: '', 
      title_en: '', 
      content_ru: '', 
      content_kz: '', 
      content_en: '', 
      category_ru: '', 
      category_kz: '', 
      category_en: '', 
      image: '', 
      author: 'Алпекон Групп' 
    });
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
                      value={formData.title_ru}
                      onChange={(e) => setFormData({ ...formData, title_ru: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-[#006442] focus:outline-none"
                      required
                      placeholder="Введите заголовок на русском"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">Қазақша (KZ)</label>
                    <input
                      type="text"
                      value={formData.title_kz}
                      onChange={(e) => setFormData({ ...formData, title_kz: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-[#006442] focus:outline-none"
                      placeholder="Тақырыпты қазақ тілінде енгізіңіз"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">English (EN)</label>
                    <input
                      type="text"
                      value={formData.title_en}
                      onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
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
                      value={formData.content_ru}
                      onChange={(e) => setFormData({ ...formData, content_ru: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-[#006442] focus:outline-none resize-none"
                      rows={4}
                      required
                      placeholder="Введите текст на русском"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">Қазақша (KZ)</label>
                    <textarea
                      value={formData.content_kz}
                      onChange={(e) => setFormData({ ...formData, content_kz: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-[#006442] focus:outline-none resize-none"
                      rows={4}
                      placeholder="Мәтінді қазақ тілінде енгізіңіз"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">English (EN)</label>
                    <textarea
                      value={formData.content_en}
                      onChange={(e) => setFormData({ ...formData, content_en: e.target.value })}
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
                      value={formData.category_ru}
                      onChange={(e) => setFormData({ ...formData, category_ru: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-[#006442] focus:outline-none"
                      placeholder="Производство, Партнерство и т.д."
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">Қазақша (KZ)</label>
                    <input
                      type="text"
                      value={formData.category_kz}
                      onChange={(e) => setFormData({ ...formData, category_kz: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-[#006442] focus:outline-none"
                      placeholder="Өндіріс, Серіктестік және т.б."
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">English (EN)</label>
                    <input
                      type="text"
                      value={formData.category_en}
                      onChange={(e) => setFormData({ ...formData, category_en: e.target.value })}
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
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-md focus:border-[#006442] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase">
                    {t('admin.form.image')}
                  </label>
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
        </div>
      </div>
    </div>
  );
}
