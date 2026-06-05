import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Plus,
  X,
  Upload,
  ExternalLink,
  Eye,
  EyeOff,
  Trash2,
  Save,
  ArrowLeft,
  ArrowRight,
  GripHorizontal,
} from 'lucide-react';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { blocksApi } from '@/services/blocksApi';
import { newsApi, getUploadUrl } from '@/services/newsApi';
import { BLOCK_CONFIGS, type BlockType, type ContentBlock } from '@/types/blocks';
import { BlockPreviewCard, BlockPreviewFromForm } from './BlockPreviewCard';

interface BlockManagerProps {
  type: BlockType;
}

type Lang = 'ru' | 'kz' | 'en';

const emptyFields = (config: (typeof BLOCK_CONFIGS)[BlockType]) => ({
  ru: Object.fromEntries(config.fields.map((f) => [f.key, ''])),
  kz: Object.fromEntries(config.fields.map((f) => [f.key, ''])),
  en: Object.fromEntries(config.fields.map((f) => [f.key, ''])),
});

const GRID_CLASS: Record<BlockType, string> = {
  direction: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4',
  team: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4',
  project: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4',
};

export function BlockManager({ type }: BlockManagerProps) {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const config = BLOCK_CONFIGS[type];
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [blocks, setBlocks] = useState<ContentBlock[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [reorderSaved, setReorderSaved] = useState(false);
  const [editing, setEditing] = useState<ContentBlock | 'new' | null>(null);
  const [editLang, setEditLang] = useState<Lang>('ru');
  const [form, setForm] = useState({
    image: '',
    active: true,
    fields: emptyFields(config),
  });

  const previewLang = language as Lang;

  const loadBlocks = useCallback(async () => {
    try {
      setLoading(true);
      const data = await blocksApi.getAllForAdmin(type);
      setBlocks(data);
    } catch (error) {
      if ((error as Error).message === 'UNAUTHORIZED') navigate('/dashboard-cms-2025/login');
    } finally {
      setLoading(false);
    }
  }, [type, navigate]);

  useEffect(() => {
    loadBlocks();
  }, [loadBlocks]);

  const openCreate = () => {
    setForm({ image: '', active: true, fields: emptyFields(config) });
    setEditLang('ru');
    setEditing('new');
  };

  const openEdit = (block: ContentBlock) => {
    setForm({
      image: block.image,
      active: block.active,
      fields: {
        ru: { ...emptyFields(config).ru, ...block.fields.ru },
        kz: { ...emptyFields(config).kz, ...block.fields.kz },
        en: { ...emptyFields(config).en, ...block.fields.en },
      },
    });
    setEditLang('ru');
    setEditing(block);
  };

  const closeEditor = () => setEditing(null);

  const updateField = (lang: Lang, key: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      fields: { ...prev.fields, [lang]: { ...prev.fields[lang], [key]: value } },
    }));
  };

  const handleImageUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert(t('admin.blocks.uploadTypeError'));
      return;
    }

    try {
      setUploading(true);
      const data = await newsApi.uploadImage(file);
      setForm((prev) => ({ ...prev, image: getUploadUrl(data.url) }));
    } catch (error) {
      if ((error as Error).message === 'UNAUTHORIZED') {
        navigate('/dashboard-cms-2025/login');
        return;
      }
      const message = (error as Error).message || t('admin.blocks.uploadError');
      alert(message);
    } finally {
      setUploading(false);
      setIsDragOver(false);
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleImageUpload(file);
    e.target.value = '';
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (file) handleImageUpload(file);
    else setIsDragOver(false);
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      if (editing === 'new') {
        await blocksApi.create({ type, image: form.image, fields: form.fields, active: form.active });
      } else if (editing) {
        await blocksApi.update(editing.id, { image: form.image, fields: form.fields, active: form.active });
      }
      await loadBlocks();
      closeEditor();
    } catch (error) {
      if ((error as Error).message === 'UNAUTHORIZED') navigate('/dashboard-cms-2025/login');
      else alert(t('admin.blocks.saveError'));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm(t('admin.blocks.deleteConfirm'))) return;
    try {
      await blocksApi.delete(id);
      await loadBlocks();
      closeEditor();
    } catch {
      alert(t('admin.blocks.deleteError'));
    }
  };

  const moveBlock = async (index: number, direction: -1 | 1) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= blocks.length) return;
    const ids = [...blocks.map((b) => b.id)];
    [ids[index], ids[newIndex]] = [ids[newIndex], ids[index]];
    const reordered = await blocksApi.reorder(type, ids);
    setBlocks(reordered);
    flashReorderSaved();
  };

  const flashReorderSaved = () => {
    setReorderSaved(true);
    setTimeout(() => setReorderSaved(false), 2000);
  };

  const handleDragStart = (index: number) => setDragIndex(index);

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (dragIndex === null || dragIndex === index) return;
    const updated = [...blocks];
    const [moved] = updated.splice(dragIndex, 1);
    updated.splice(index, 0, moved);
    setBlocks(updated);
    setDragIndex(index);
  };

  const handleDragEnd = async () => {
    if (dragIndex === null) return;
    setDragIndex(null);
    try {
      const reordered = await blocksApi.reorder(type, blocks.map((b) => b.id));
      setBlocks(reordered);
      flashReorderSaved();
    } catch {
      await loadBlocks();
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="animate-pulse text-gray-500 font-medium">{t('admin.loading')}</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl">
      {/* Header */}
      <div className="flex items-start justify-between gap-6 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{config.label}</h2>
          <p className="text-gray-500 text-sm mt-1">{t('admin.blocks.hintVisual')}</p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <a
            href={config.page}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50"
          >
            <ExternalLink size={15} />
            {t('admin.blocks.viewPage')}
          </a>
          <button
            type="button"
            onClick={openCreate}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#006442] text-white font-bold text-sm rounded-xl hover:bg-[#005033] shadow-md"
          >
            <Plus size={18} />
            {t('admin.blocks.add')}
          </button>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-[#006442]/5 border border-[#006442]/20 rounded-2xl px-5 py-4 mb-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-700">
        <span className="flex items-center gap-2">
          <span className="w-6 h-6 bg-[#006442] text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
          {t('admin.blocks.step1')}
        </span>
        <span className="flex items-center gap-2">
          <span className="w-6 h-6 bg-[#006442] text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
          {t('admin.blocks.step2')}
        </span>
        <span className="flex items-center gap-2">
          <span className="w-6 h-6 bg-[#006442] text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
          {t('admin.blocks.step3')}
        </span>
        {reorderSaved && (
          <span className="ml-auto text-[#006442] font-bold text-xs uppercase animate-pulse">
            ✓ {t('admin.blocks.orderSaved')}
          </span>
        )}
      </div>

      {/* Visual grid — looks like the site */}
      {blocks.length === 0 ? (
        <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 p-16 text-center">
          <p className="text-gray-400 mb-4">{t('admin.blocks.empty')}</p>
          <button type="button" onClick={openCreate} className="px-6 py-3 bg-[#006442] text-white font-bold text-sm rounded-xl">
            {t('admin.blocks.addFirst')}
          </button>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-2 mb-3">
            <GripHorizontal size={16} className="text-gray-400" />
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              {t('admin.blocks.gridLabel')} ({previewLang.toUpperCase()})
            </span>
          </div>
          <div className={GRID_CLASS[type]}>
            {blocks.map((block, index) => (
              <div
                key={block.id}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragEnd={handleDragEnd}
                className="relative"
              >
                <BlockPreviewCard
                  block={block}
                  type={type}
                  lang={previewLang}
                  index={index}
                  isDragging={dragIndex === index}
                  onClick={() => openEdit(block)}
                />
                {/* Quick move buttons */}
                <div className="flex justify-center gap-1 mt-2">
                  <button
                    type="button"
                    onClick={() => moveBlock(index, -1)}
                    disabled={index === 0}
                    className="p-1.5 rounded-lg bg-white border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-30"
                    title={t('admin.blocks.moveUp')}
                  >
                    <ArrowLeft size={14} />
                  </button>
                  <span className="text-xs text-gray-400 font-medium self-center px-1">
                    {index + 1} / {blocks.length}
                  </span>
                  <button
                    type="button"
                    onClick={() => moveBlock(index, 1)}
                    disabled={index === blocks.length - 1}
                    className="p-1.5 rounded-lg bg-white border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-30"
                    title={t('admin.blocks.moveDown')}
                  >
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}

            {/* Add card placeholder */}
            <button
              type="button"
              onClick={openCreate}
              className="rounded-2xl border-2 border-dashed border-gray-200 hover:border-[#006442] hover:bg-[#006442]/5 transition-all flex flex-col items-center justify-center gap-2 text-gray-400 hover:text-[#006442] min-h-[220px]"
            >
              <Plus size={28} />
              <span className="text-sm font-bold">{t('admin.blocks.add')}</span>
            </button>
          </div>
        </>
      )}

      {/* Edit modal — split view with live preview */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeEditor} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
              <h3 className="text-lg font-bold text-gray-900">
                {editing === 'new' ? t('admin.blocks.create') : t('admin.blocks.edit')}
              </h3>
              <button type="button" onClick={closeEditor} className="p-2 rounded-lg hover:bg-gray-100 text-gray-500">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-0 min-h-0">
                {/* Left: live preview */}
                <div className="bg-gray-50 p-6 border-b md:border-b-0 md:border-r border-gray-100">
                  <BlockPreviewFromForm
                    type={type}
                    lang={editLang}
                    image={form.image}
                    fields={form.fields[editLang]}
                    active={form.active}
                    previewIndex={
                      editing !== 'new' && typeof editing === 'object'
                        ? blocks.findIndex((b) => b.id === editing.id)
                        : blocks.length
                    }
                  />
                  <label className="flex items-center gap-3 cursor-pointer mt-5">
                    <input
                      type="checkbox"
                      checked={form.active}
                      onChange={(e) => setForm((prev) => ({ ...prev, active: e.target.checked }))}
                      className="w-4 h-4 accent-[#006442]"
                    />
                    <span className="flex items-center gap-2 text-sm font-medium text-gray-600">
                      {form.active ? <Eye size={15} /> : <EyeOff size={15} />}
                      {t('admin.blocks.visible')}
                    </span>
                  </label>
                </div>

                {/* Right: form */}
                <div className="p-6 space-y-5">
                  {/* Photo — prominent */}
                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-2">
                      📷 {t('admin.blocks.changePhoto')}
                    </label>
                    <div
                      onClick={() => !uploading && fileInputRef.current?.click()}
                      onDragOver={onDragOver}
                      onDragLeave={onDragLeave}
                      onDrop={onDrop}
                      className={`relative rounded-xl overflow-hidden bg-gray-100 cursor-pointer group border-2 border-dashed transition-colors ${
                        isDragOver
                          ? 'border-[#006442] bg-[#006442]/10'
                          : 'border-gray-200 hover:border-[#006442]'
                      }`}
                      style={{ height: type === 'direction' ? 140 : 160 }}
                    >
                      {form.image ? (
                        <>
                          <img src={form.image} alt="" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="text-white text-sm font-bold flex items-center gap-2">
                              <Upload size={16} />
                              {uploading ? t('admin.blocks.uploading') : t('admin.blocks.replacePhoto')}
                            </span>
                          </div>
                        </>
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 gap-2 px-4 text-center">
                          <Upload size={28} className={isDragOver ? 'text-[#006442]' : ''} />
                          <span className="text-sm font-semibold">
                            {uploading
                              ? t('admin.blocks.uploading')
                              : isDragOver
                                ? t('admin.blocks.dropHere')
                                : t('admin.blocks.upload')}
                          </span>
                          <span className="text-[11px] text-gray-400">{t('admin.blocks.dragHint')}</span>
                        </div>
                      )}
                    </div>
                    <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={onFileChange} />
                    <input
                      type="text"
                      value={form.image}
                      onChange={(e) => setForm((prev) => ({ ...prev, image: e.target.value }))}
                      placeholder="или вставьте ссылку на фото"
                      className="w-full mt-2 px-3 py-2 border border-gray-200 rounded-lg text-xs focus:border-[#006442] focus:outline-none"
                    />
                  </div>

                  {/* Language tabs */}
                  <div>
                    <p className="text-sm font-bold text-gray-800 mb-2">🌐 {t('admin.blocks.texts')}</p>
                    <div className="flex gap-1.5 mb-3">
                      {(['ru', 'kz', 'en'] as const).map((lang) => (
                        <button
                          key={lang}
                          type="button"
                          onClick={() => setEditLang(lang)}
                          className={`flex-1 py-2 rounded-lg text-xs font-bold uppercase transition-colors ${
                            editLang === lang ? 'bg-[#006442] text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                          }`}
                        >
                          {lang}
                        </button>
                      ))}
                    </div>
                    <div className="space-y-3">
                      {config.fields.map((field) => (
                        <div key={field.key}>
                          <label className="block text-xs font-semibold text-gray-500 mb-1">
                            {field.label}
                          </label>
                          {field.multiline ? (
                            <textarea
                              value={form.fields[editLang][field.key] || ''}
                              onChange={(e) => updateField(editLang, field.key, e.target.value)}
                              rows={2}
                              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:border-[#006442] focus:outline-none resize-y text-sm"
                            />
                          ) : (
                            <input
                              type="text"
                              value={form.fields[editLang][field.key] || ''}
                              onChange={(e) => updateField(editLang, field.key, e.target.value)}
                              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:border-[#006442] focus:outline-none text-sm"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-100 flex gap-3 shrink-0 bg-white">
              {editing !== 'new' && (
                <button
                  type="button"
                  onClick={() => handleDelete(editing.id)}
                  className="flex items-center gap-2 px-4 py-2.5 text-red-600 hover:bg-red-50 rounded-xl text-sm font-semibold"
                >
                  <Trash2 size={16} />
                  {t('admin.actions.delete')}
                </button>
              )}
              <div className="flex-1" />
              <button
                type="button"
                onClick={closeEditor}
                className="px-5 py-2.5 border border-gray-200 text-gray-600 font-semibold text-sm rounded-xl hover:bg-gray-50"
              >
                {t('admin.form.cancel')}
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-6 py-2.5 bg-[#006442] text-white font-bold text-sm rounded-xl hover:bg-[#005033] disabled:opacity-50"
              >
                <Save size={16} />
                {saving ? t('admin.blocks.saving') : t('admin.blocks.save')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
