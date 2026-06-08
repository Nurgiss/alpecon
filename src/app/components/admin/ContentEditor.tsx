import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExternalLink, Save, ChevronDown, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { contentApi } from '@/services/contentApi';
import {
  getDefaultPageContent,
  mergePageContent,
  flattenStrings,
  unflattenStrings,
  groupFieldsBySection,
} from '@/utils/contentHelpers';
import { getContentPage, type ContentPageKey } from '@/config/contentPages';

interface ContentEditorProps {
  pageKey: ContentPageKey;
}

type Lang = 'ru' | 'kz' | 'en';

export function ContentEditor({ pageKey }: ContentEditorProps) {
  const navigate = useNavigate();
  const { t, refreshContent } = useLanguage();
  const page = getContentPage(pageKey)!;

  const [fields, setFields] = useState<Record<Lang, Record<string, string>>>({ ru: {}, kz: {}, en: {} });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editLang, setEditLang] = useState<Lang>('ru');
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      const currentPage = getContentPage(pageKey);
      if (!currentPage) return;

      const excludePrefixes = currentPage.excludePrefixes ?? [];

      try {
        setLoading(true);
        const defaults = getDefaultPageContent(currentPage);
        const saved = await contentApi.getPage(pageKey);
        if (cancelled) return;

        const merged = mergePageContent(defaults, saved);

        const flat = {
          ru: flattenStrings(merged.ru, '', excludePrefixes),
          kz: flattenStrings(merged.kz, '', excludePrefixes),
          en: flattenStrings(merged.en, '', excludePrefixes),
        };
        setFields(flat);

        const sections = Object.keys(groupFieldsBySection(flat.ru));
        const exp: Record<string, boolean> = {};
        sections.forEach((s, i) => { exp[s] = i === 0; });
        setExpanded(exp);
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
  }, [pageKey]);

  const grouped = useMemo(() => groupFieldsBySection(fields.ru), [fields.ru]);

  const updateField = (path: string, lang: Lang, value: string) => {
    setFields((prev) => ({
      ...prev,
      [lang]: { ...prev[lang], [path]: value },
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await contentApi.savePage(pageKey, {
        ru: unflattenStrings(fields.ru),
        kz: unflattenStrings(fields.kz),
        en: unflattenStrings(fields.en),
      });
      await refreshContent();
      alert(t('admin.content.savedSuccess'));
    } catch (error) {
      if ((error as Error).message === 'UNAUTHORIZED') navigate('/dashboard-cms-2025/login');
      else alert(t('admin.content.saveError'));
    } finally {
      setSaving(false);
    }
  };

  const toggle = (section: string) => {
    setExpanded((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const fieldLabel = (path: string) => path.split('.').slice(1).join(' → ') || path;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32 text-gray-500">{t('admin.loading')}</div>
    );
  }

  return (
    <div className="max-w-4xl">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{page.label}</h2>
          <p className="text-gray-500 text-sm mt-1">{t('admin.content.editHint')}</p>
          {(page.excludePrefixes?.length ?? 0) > 0 && (
            <p className="text-amber-600 text-xs mt-2 font-medium">{t('admin.content.blocksNote')}</p>
          )}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <a
            href={page.path}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50"
          >
            <ExternalLink size={15} />
            {t('admin.content.viewPage')}
          </a>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#006442] text-white font-bold text-sm rounded-xl hover:bg-[#005033] disabled:opacity-50"
          >
            <Save size={16} />
            {saving ? t('admin.content.saving') : t('admin.content.save')}
          </button>
        </div>
      </div>

      {/* Language tabs */}
      <div className="flex gap-2 mb-6">
        {(['ru', 'kz', 'en'] as const).map((lang) => (
          <button
            key={lang}
            type="button"
            onClick={() => setEditLang(lang)}
            className={`px-5 py-2 rounded-xl text-sm font-bold uppercase transition-colors ${
              editLang === lang ? 'bg-[#006442] text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {lang}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {Object.entries(grouped).map(([section, sectionFields]) => (
          <div key={section} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <button
              type="button"
              onClick={() => toggle(section)}
              className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors"
            >
              <span className="font-bold text-gray-800 uppercase text-sm tracking-wide">{section}</span>
              {expanded[section] ? <ChevronDown size={18} className="text-gray-400" /> : <ChevronRight size={18} className="text-gray-400" />}
            </button>

            {expanded[section] && (
              <div className="px-5 pb-5 space-y-4 border-t border-gray-50">
                {Object.keys(sectionFields)
                  .sort()
                  .map((path) => {
                    const isLong = (fields.ru[path]?.length ?? 0) > 60;
                    return (
                      <div key={path}>
                        <label className="block text-xs font-semibold text-gray-400 mb-1.5">
                          {fieldLabel(path)}
                        </label>
                        {isLong ? (
                          <textarea
                            value={fields[editLang][path] ?? ''}
                            onChange={(e) => updateField(path, editLang, e.target.value)}
                            rows={3}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-[#006442] focus:outline-none resize-y text-sm"
                          />
                        ) : (
                          <input
                            type="text"
                            value={fields[editLang][path] ?? ''}
                            onChange={(e) => updateField(path, editLang, e.target.value)}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-[#006442] focus:outline-none text-sm"
                          />
                        )}
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        ))}
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
