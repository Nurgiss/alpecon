import { Factory, Users, FolderKanban, Newspaper, ExternalLink, Type, Image, Images } from 'lucide-react';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { BLOCK_CONFIGS, type BlockType } from '@/types/blocks';
import { CONTENT_PAGES } from '@/config/contentPages';
import type { AdminSection } from './AdminLayout';

interface AdminDashboardProps {
  onNavigate: (section: AdminSection) => void;
}

const QUICK_LINKS: Array<{ section: AdminSection; icon: React.ReactNode; color: string }> = [
  { section: 'news', icon: <Newspaper size={24} />, color: 'bg-blue-500' },
  { section: 'heroes', icon: <Image size={24} />, color: 'bg-rose-500' },
  { section: 'sections', icon: <Images size={24} />, color: 'bg-orange-500' },
  { section: 'direction', icon: <Factory size={24} />, color: 'bg-emerald-500' },
  { section: 'team', icon: <Users size={24} />, color: 'bg-violet-500' },
  { section: 'project', icon: <FolderKanban size={24} />, color: 'bg-amber-500' },
];

export function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  const { t } = useLanguage();

  const cards = QUICK_LINKS.map((link) => {
    if (link.section === 'news') {
      return { ...link, label: t('admin.panel.news'), desc: t('admin.subtitle'), page: '/news' };
    }
    if (link.section === 'heroes') {
      return { ...link, label: t('admin.panel.heroes'), desc: t('admin.heroes.hint'), page: '/' };
    }
    if (link.section === 'sections') {
      return { ...link, label: t('admin.panel.sectionImages'), desc: t('admin.sectionImages.hint'), page: '/about' };
    }
    const config = BLOCK_CONFIGS[link.section as BlockType];
    return { ...link, label: config.label, desc: t('admin.blocks.hint'), page: config.page };
  });

  return (
    <div className="max-w-4xl">
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">{t('admin.panel.dashboard')}</h2>
        <p className="text-gray-500">{t('admin.panel.dashboardDesc')}</p>
      </div>

      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">{t('admin.panel.cards')}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
        {cards.map((card) => (
          <button
            key={card.section}
            type="button"
            onClick={() => onNavigate(card.section)}
            className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:border-[#006442]/20 transition-all text-left"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`${card.color} text-white p-3 rounded-xl`}>{card.icon}</div>
              <a
                href={card.page}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-2 rounded-lg text-gray-300 hover:text-[#006442] hover:bg-green-50 transition-colors"
              >
                <ExternalLink size={16} />
              </a>
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-1 group-hover:text-[#006442] transition-colors">
              {card.label}
            </h3>
            <p className="text-sm text-gray-500 line-clamp-2">{card.desc}</p>
          </button>
        ))}
      </div>

      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
        <Type size={12} />
        {t('admin.panel.texts')}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {CONTENT_PAGES.map((page) => (
          <button
            key={page.key}
            type="button"
            onClick={() => onNavigate(page.key)}
            className="bg-white rounded-xl px-4 py-3 border border-gray-100 text-left text-sm font-medium text-gray-700 hover:border-[#006442]/30 hover:text-[#006442] hover:bg-green-50/50 transition-all"
          >
            {page.label}
          </button>
        ))}
      </div>
    </div>
  );
}
