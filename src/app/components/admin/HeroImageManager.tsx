import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExternalLink, Save, Upload } from 'lucide-react';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { useHeroImagesAdmin } from '@/contexts/HeroImagesContext';
import { contentApi } from '@/services/contentApi';
import { newsApi, getUploadUrl } from '@/services/newsApi';
import { HERO_PAGES, DEFAULT_HERO_IMAGES, type HeroPageKey } from '@/config/heroImages';

export function HeroImageManager() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { refreshHeroImages } = useHeroImagesAdmin();

  const [form, setForm] = useState<Record<HeroPageKey, string>>({ ...DEFAULT_HERO_IMAGES });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingKey, setUploadingKey] = useState<HeroPageKey | null>(null);
  const [dragOverKey, setDragOverKey] = useState<HeroPageKey | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadTargetRef = useRef<HeroPageKey | null>(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        setLoading(true);
        const data = await contentApi.getPage('heroes');
        if (cancelled) return;
        const saved = (data.ru || {}) as Record<string, string>;
        const merged = { ...DEFAULT_HERO_IMAGES };
        for (const page of HERO_PAGES) {
          if (typeof saved[page.key] === 'string' && saved[page.key].trim()) {
            merged[page.key] = saved[page.key];
          }
        }
        setForm(merged);
      } catch {
        if (!cancelled) alert(t('admin.content.loadError'));
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [t]);

  const uploadFile = async (key: HeroPageKey, file: File) => {
    if (!file.type.startsWith('image/')) {
      alert(t('admin.blocks.uploadTypeError'));
      return;
    }
    try {
      setUploadingKey(key);
      const data = await newsApi.uploadImage(file);
      setForm((prev) => ({ ...prev, [key]: getUploadUrl(data.url) }));
    } catch (error) {
      if ((error as Error).message === 'UNAUTHORIZED') {
        navigate('/dashboard-cms-2025/login');
      } else {
        alert((error as Error).message || t('admin.blocks.uploadError'));
      }
    } finally {
      setUploadingKey(null);
      setDragOverKey(null);
    }
  };

  const openFilePicker = (key: HeroPageKey) => {
    uploadTargetRef.current = key;
    fileInputRef.current?.click();
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const key = uploadTargetRef.current;
    if (file && key) uploadFile(key, file);
    e.target.value = '';
    uploadTargetRef.current = null;
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const payload: Record<string, string> = {};
      for (const page of HERO_PAGES) {
        payload[page.key] = form[page.key] || '';
      }
      await contentApi.savePage('heroes', { ru: payload, kz: payload, en: payload });
      await refreshHeroImages();
      alert(t('admin.heroes.savedSuccess'));
    } catch (error) {
      if ((error as Error).message === 'UNAUTHORIZED') navigate('/dashboard-cms-2025/login');
      else alert(t('admin.content.saveError'));
    } finally {
      setSaving(false);
    }
  };

  const resetToDefault = (key: HeroPageKey) => {
    setForm((prev) => ({ ...prev, [key]: DEFAULT_HERO_IMAGES[key] }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32 text-gray-500">{t('admin.loading')}</div>
    );
  }

  return (
    <div className="max-w-5xl">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{t('admin.heroes.title')}</h2>
          <p className="text-gray-500 text-sm mt-1">{t('admin.heroes.hint')}</p>
        </div>
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#006442] text-white font-bold text-sm rounded-xl hover:bg-[#005033] disabled:opacity-50 shrink-0"
        >
          <Save size={16} />
          {saving ? t('admin.content.saving') : t('admin.content.save')}
        </button>
      </div>

      <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={onFileChange} />

      <div className="space-y-6">
        {HERO_PAGES.map((page) => {
          const isUploading = uploadingKey === page.key;
          const isDragOver = dragOverKey === page.key;
          const isCustom = form[page.key] !== DEFAULT_HERO_IMAGES[page.key];

          return (
            <div key={page.key} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
                <div>
                  <h3 className="font-bold text-gray-900">{page.label}</h3>
                  <p className="text-xs text-gray-400 mt-0.5">{page.path}</p>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={page.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg text-gray-400 hover:text-[#006442] hover:bg-green-50"
                    title={t('admin.content.viewPage')}
                  >
                    <ExternalLink size={16} />
                  </a>
                  {isCustom && (
                    <button
                      type="button"
                      onClick={() => resetToDefault(page.key)}
                      className="px-3 py-1.5 text-xs font-semibold text-gray-500 hover:text-gray-800 border border-gray-200 rounded-lg"
                    >
                      {t('admin.heroes.reset')}
                    </button>
                  )}
                </div>
              </div>

              <div className="p-5">
                <div
                  onClick={() => !isUploading && openFilePicker(page.key)}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragOverKey(page.key);
                  }}
                  onDragLeave={(e) => {
                    e.preventDefault();
                    setDragOverKey(null);
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    const file = e.dataTransfer.files?.[0];
                    if (file) uploadFile(page.key, file);
                    else setDragOverKey(null);
                  }}
                  className={`relative rounded-xl overflow-hidden cursor-pointer group border-2 border-dashed transition-colors h-40 sm:h-48 ${
                    isDragOver
                      ? 'border-[#006442] bg-[#006442]/10'
                      : 'border-gray-200 hover:border-[#006442]'
                  }`}
                >
                  <img src={form[page.key]} alt={page.label} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white text-sm font-bold flex items-center gap-2">
                      <Upload size={16} />
                      {isUploading ? t('admin.blocks.uploading') : t('admin.blocks.replacePhoto')}
                    </span>
                  </div>
                </div>
                <p className="text-[11px] text-gray-400 mt-2">{t('admin.blocks.dragHint')} · {t('admin.blocks.compressHint')}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-8 py-3 bg-[#006442] text-white font-bold text-sm rounded-xl hover:bg-[#005033] disabled:opacity-50"
        >
          <Save size={16} />
          {saving ? t('admin.content.saving') : t('admin.content.save')}
        </button>
      </div>
    </div>
  );
}
