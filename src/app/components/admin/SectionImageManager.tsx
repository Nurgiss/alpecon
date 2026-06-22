import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExternalLink, Save, Upload } from 'lucide-react';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { useSectionImagesAdmin } from '@/contexts/SectionImagesContext';
import { contentApi } from '@/services/contentApi';
import { newsApi, getUploadUrl } from '@/services/newsApi';
import {
  SECTION_GROUPS,
  DEFAULT_SECTION_IMAGES,
  type SectionImageKey,
} from '@/config/sectionImages';

export function SectionImageManager() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { refreshSectionImages } = useSectionImagesAdmin();

  const [form, setForm] = useState<Record<SectionImageKey, string>>({ ...DEFAULT_SECTION_IMAGES });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingKey, setUploadingKey] = useState<SectionImageKey | null>(null);
  const [dragOverKey, setDragOverKey] = useState<SectionImageKey | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadTargetRef = useRef<SectionImageKey | null>(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        setLoading(true);
        const data = await contentApi.getPage('section-images');
        if (cancelled) return;
        const merged = { ...DEFAULT_SECTION_IMAGES };
        const raw = data.ru || {};
        for (const group of SECTION_GROUPS) {
          const nested = raw[group.key];
          if (nested && typeof nested === 'object' && !Array.isArray(nested)) {
            for (const img of group.images) {
              const value = (nested as Record<string, string>)[img.slot];
              if (typeof value === 'string' && value.trim()) {
                merged[img.key] = value;
              }
            }
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

  const uploadFile = async (key: SectionImageKey, file: File) => {
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

  const openFilePicker = (key: SectionImageKey) => {
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
      const payload: Record<string, Record<string, string>> = {};
      for (const group of SECTION_GROUPS) {
        payload[group.key] = {};
        for (const img of group.images) {
          payload[group.key][img.slot] = form[img.key] || '';
        }
      }
      await contentApi.savePage('section-images', { ru: payload, kz: payload, en: payload });
      await refreshSectionImages();
      alert(t('admin.sectionImages.savedSuccess'));
    } catch (error) {
      if ((error as Error).message === 'UNAUTHORIZED') navigate('/dashboard-cms-2025/login');
      else alert(t('admin.content.saveError'));
    } finally {
      setSaving(false);
    }
  };

  const resetToDefault = (key: SectionImageKey) => {
    setForm((prev) => ({ ...prev, [key]: DEFAULT_SECTION_IMAGES[key] }));
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
          <h2 className="text-2xl font-bold text-gray-900">{t('admin.sectionImages.title')}</h2>
          <p className="text-gray-500 text-sm mt-1">{t('admin.sectionImages.hint')}</p>
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

      <div className="space-y-8">
        {SECTION_GROUPS.map((group) => (
          <div key={group.key} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
              <div>
                <h3 className="font-bold text-gray-900">{group.label}</h3>
                <p className="text-xs text-gray-400 mt-0.5">{group.hint}</p>
                <p className="text-[11px] text-gray-400 mt-1">{group.pages.join(' · ')}</p>
              </div>
              {group.pages[0] && (
                <a
                  href={group.pages[0]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-gray-400 hover:text-[#006442] hover:bg-green-50"
                  title={t('admin.content.viewPage')}
                >
                  <ExternalLink size={16} />
                </a>
              )}
            </div>

            <div className={`p-5 grid gap-5 ${group.images.length > 1 ? 'sm:grid-cols-2' : 'grid-cols-1'}`}>
              {group.images.map((img) => {
                const isUploading = uploadingKey === img.key;
                const isDragOver = dragOverKey === img.key;
                const isCustom = form[img.key] !== DEFAULT_SECTION_IMAGES[img.key];

                return (
                  <div key={img.key}>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-semibold text-gray-600">{img.label}</p>
                      {isCustom && (
                        <button
                          type="button"
                          onClick={() => resetToDefault(img.key)}
                          className="px-2 py-1 text-[10px] font-semibold text-gray-500 hover:text-gray-800 border border-gray-200 rounded-md"
                        >
                          {t('admin.sectionImages.reset')}
                        </button>
                      )}
                    </div>
                    <div
                      onClick={() => !isUploading && openFilePicker(img.key)}
                      onDragOver={(e) => {
                        e.preventDefault();
                        setDragOverKey(img.key);
                      }}
                      onDragLeave={(e) => {
                        e.preventDefault();
                        setDragOverKey(null);
                      }}
                      onDrop={(e) => {
                        e.preventDefault();
                        const file = e.dataTransfer.files?.[0];
                        if (file) uploadFile(img.key, file);
                        else setDragOverKey(null);
                      }}
                      className={`relative rounded-xl overflow-hidden cursor-pointer group border-2 border-dashed transition-colors ${
                        group.images.length > 1 ? 'h-36 sm:h-40' : 'h-40 sm:h-48'
                      } ${
                        isDragOver
                          ? 'border-[#006442] bg-[#006442]/10'
                          : 'border-gray-200 hover:border-[#006442]'
                      }`}
                    >
                      <img src={form[img.key]} alt={img.label} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-white text-sm font-bold flex items-center gap-2">
                          <Upload size={16} />
                          {isUploading ? t('admin.blocks.uploading') : t('admin.blocks.replacePhoto')}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <p className="text-[11px] text-gray-400 mt-4">{t('admin.blocks.dragHint')} · {t('admin.blocks.compressHint')}</p>

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
