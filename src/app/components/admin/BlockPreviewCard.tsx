import { ImageIcon, GripVertical } from 'lucide-react';
import type { BlockType, ContentBlock } from '@/types/blocks';
import { BLOCK_CONFIGS } from '@/types/blocks';
import type { Language } from '@/app/contexts/LanguageContext';

interface BlockPreviewCardProps {
  block: ContentBlock;
  type: BlockType;
  lang: Language;
  index: number;
  isDragging?: boolean;
  isSelected?: boolean;
  onClick?: () => void;
  showDragHandle?: boolean;
}

function getField(block: ContentBlock, lang: Language, key: string): string {
  return block.fields[lang]?.[key] || block.fields.ru?.[key] || '';
}

export function BlockPreviewCard({
  block,
  type,
  lang,
  index,
  isDragging,
  isSelected,
  onClick,
  showDragHandle = true,
}: BlockPreviewCardProps) {
  const config = BLOCK_CONFIGS[type];
  const fields = block.fields[lang] || block.fields.ru;

  if (type === 'direction') {
    const title = getField(block, lang, 'title');
    const category = getField(block, lang, 'category');
    return (
      <div
        onClick={onClick}
        className={`relative group overflow-hidden rounded-2xl shadow-lg transition-all duration-300 h-[220px] cursor-pointer ${
          isDragging ? 'opacity-40 scale-95 ring-2 ring-[#006442]' : ''
        } ${isSelected ? 'ring-4 ring-[#006442] ring-offset-2' : 'hover:ring-2 hover:ring-[#006442]/50 hover:ring-offset-1'}`}
      >
        {showDragHandle && (
          <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs font-bold">
            <GripVertical size={12} />
            {index + 1}
          </div>
        )}
        {!block.active && (
          <div className="absolute top-3 right-3 z-20 bg-orange-500 text-white text-[10px] font-bold uppercase px-2 py-1 rounded-lg">
            Скрыт
          </div>
        )}
        {block.image ? (
          <img src={block.image} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex flex-col items-center justify-center text-gray-400">
            <ImageIcon size={32} />
            <span className="text-xs mt-2 font-medium">Нет фото</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 p-5 text-white pointer-events-none">
          <div className="text-[10px] font-bold uppercase tracking-widest mb-1.5 text-white/70">
            {category}
          </div>
          <h3 className="text-sm font-bold uppercase leading-tight line-clamp-3">{title}</h3>
        </div>
        {onClick && (
          <div className="absolute inset-0 bg-[#006442]/0 group-hover:bg-[#006442]/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
            <span className="bg-white text-[#006442] text-xs font-bold uppercase px-4 py-2 rounded-lg shadow-lg">
              Редактировать
            </span>
          </div>
        )}
      </div>
    );
  }

  if (type === 'team') {
    const name = getField(block, lang, 'name');
    const position = getField(block, lang, 'position');
    return (
      <div
        onClick={onClick}
        className={`relative overflow-hidden rounded-2xl aspect-square bg-white shadow-lg transition-all cursor-pointer ${
          isDragging ? 'opacity-40 scale-95 ring-2 ring-[#006442]' : ''
        } ${isSelected ? 'ring-4 ring-[#006442] ring-offset-2' : 'hover:ring-2 hover:ring-[#006442]/50 hover:ring-offset-1'}`}
      >
        {showDragHandle && (
          <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs font-bold">
            <GripVertical size={12} />
            {index + 1}
          </div>
        )}
        {block.image ? (
          <img src={block.image} alt={name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex flex-col items-center justify-center text-gray-400">
            <ImageIcon size={32} />
            <span className="text-xs mt-2">Добавьте фото</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 p-5 text-white pointer-events-none">
          <h3 className="text-base font-bold uppercase leading-tight mb-1">{name}</h3>
          <p className="text-white/90 text-xs font-semibold uppercase">{position}</p>
        </div>
        {onClick && (
          <div className="absolute inset-0 bg-[#006442]/0 group-hover:bg-[#006442]/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
            <span className="bg-white text-[#006442] text-xs font-bold uppercase px-4 py-2 rounded-lg shadow-lg">
              Редактировать
            </span>
          </div>
        )}
      </div>
    );
  }

  // project
  const title = getField(block, lang, 'title');
  const description = getField(block, lang, 'description');
  const products = getField(block, lang, 'products');
  const productsLabel = getField(block, lang, 'productsLabel');

  return (
    <div
      onClick={onClick}
      className={`relative overflow-hidden rounded-2xl aspect-square bg-white shadow-lg transition-all cursor-pointer group ${
        isDragging ? 'opacity-40 scale-95 ring-2 ring-[#006442]' : ''
      } ${isSelected ? 'ring-4 ring-[#006442] ring-offset-2' : 'hover:ring-2 hover:ring-[#006442]/50 hover:ring-offset-1'}`}
    >
      {showDragHandle && (
        <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs font-bold">
          <GripVertical size={12} />
          {index + 1}
        </div>
      )}
      {block.image ? (
        <img src={block.image} alt={title} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex flex-col items-center justify-center text-gray-400">
          <ImageIcon size={32} />
          <span className="text-xs mt-2">Нет фото</span>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 p-5 text-white pointer-events-none">
        <h3 className="text-sm font-bold uppercase leading-tight mb-2 line-clamp-2">{title}</h3>
        <p className="text-[11px] opacity-90 line-clamp-2 mb-3">{description}</p>
        <div className="border-l-4 border-[#007349] pl-3">
          <div className="text-sm font-bold">{products}</div>
          <div className="text-[10px] uppercase opacity-75">{productsLabel}</div>
        </div>
      </div>
      {onClick && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="bg-white text-[#006442] text-xs font-bold uppercase px-4 py-2 rounded-lg shadow-lg">
            Редактировать
          </span>
        </div>
      )}
    </div>
  );
}

// Live preview for edit modal (uses form state, not saved block)
export function BlockPreviewFromForm({
  type,
  lang,
  image,
  fields,
  active,
}: {
  type: BlockType;
  lang: Language;
  image: string;
  fields: Record<string, string>;
  active: boolean;
}) {
  const fakeBlock: ContentBlock = {
    id: 'preview',
    type,
    sortOrder: 0,
    image,
    active,
    fields: { ru: fields, kz: fields, en: fields },
    updatedAt: '',
  };
  return (
    <div className="pointer-events-none">
      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Превью на сайте</p>
      <BlockPreviewCard block={fakeBlock} type={type} lang={lang} index={0} showDragHandle={false} />
    </div>
  );
}
