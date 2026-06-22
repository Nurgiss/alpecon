import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import logoColor from '@/assets/logo-color.png';
import {
  LayoutDashboard,
  Newspaper,
  Factory,
  Users,
  FolderKanban,
  Type,
  Globe,
  Home,
  Info,
  Briefcase,
  Phone,
  UserPlus,
  FileText,
  Image,
  Images,
} from 'lucide-react';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { newsApi } from '@/services/newsApi';
import { CONTENT_PAGES, type ContentPageKey } from '@/config/contentPages';
import type { BlockType } from '@/types/blocks';

export type AdminSection = 'dashboard' | 'news' | 'heroes' | 'sections' | BlockType | ContentPageKey;

const BLOCK_NAV: Array<{ id: BlockType; icon: ReactNode }> = [
  { id: 'direction', icon: <Factory size={18} /> },
  { id: 'team', icon: <Users size={18} /> },
  { id: 'project', icon: <FolderKanban size={18} /> },
];

const TEXT_ICONS: Record<ContentPageKey, ReactNode> = {
  global: <Globe size={16} />,
  home: <Home size={16} />,
  about: <Info size={16} />,
  projects: <Briefcase size={16} />,
  investors: <Briefcase size={16} />,
  contacts: <Phone size={16} />,
  vacancies: <UserPlus size={16} />,
  news: <FileText size={16} />,
};

const BLOCK_LABELS: Record<BlockType, string> = {
  direction: 'Направления',
  team: 'Команда',
  project: 'Проекты',
};

interface AdminLayoutProps {
  activeSection: AdminSection;
  onSectionChange: (section: AdminSection) => void;
  children: ReactNode;
}

export function AdminLayout({ activeSection, onSectionChange, children }: AdminLayoutProps) {
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();

  const handleLogout = () => {
    if (confirm(t('admin.panel.logoutConfirm'))) {
      newsApi.logout();
      navigate('/dashboard-cms-2025/login');
    }
  };

  const navClass = (id: AdminSection) =>
    `w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
      activeSection === id
        ? 'bg-[#006442] text-white shadow-md'
        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
    }`;

  const textNavClass = (id: AdminSection) =>
    `w-full flex items-center gap-2.5 px-4 py-2 rounded-lg text-xs font-medium transition-all ${
      activeSection === id
        ? 'bg-[#006442]/10 text-[#006442] font-bold'
        : 'text-gray-500 hover:bg-gray-100 hover:text-gray-800'
    }`;

  return (
    <div className="min-h-screen bg-[#f4f6f5] flex">
      <aside className="w-64 bg-white border-r border-gray-200/80 flex flex-col shrink-0">
        <div className="px-6 py-6 border-b border-gray-100">
          <img
            src={logoColor}
            alt="Alpecon Group"
            className="h-10 w-auto object-contain"
          />
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <p className="px-4 py-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            {t('admin.panel.sections')}
          </p>
          <button type="button" onClick={() => onSectionChange('dashboard')} className={navClass('dashboard')}>
            <LayoutDashboard size={18} />
            {t('admin.panel.dashboard')}
          </button>
          <button type="button" onClick={() => onSectionChange('news')} className={navClass('news')}>
            <Newspaper size={18} />
            {t('admin.panel.news')}
          </button>
          <button type="button" onClick={() => onSectionChange('heroes')} className={navClass('heroes')}>
            <Image size={18} />
            {t('admin.panel.heroes')}
          </button>
          <button type="button" onClick={() => onSectionChange('sections')} className={navClass('sections')}>
            <Images size={18} />
            {t('admin.panel.sectionImages')}
          </button>

          <p className="px-4 py-2 mt-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            {t('admin.panel.cards')}
          </p>
          {BLOCK_NAV.map((item) => (
            <button key={item.id} type="button" onClick={() => onSectionChange(item.id)} className={navClass(item.id)}>
              {item.icon}
              {BLOCK_LABELS[item.id]}
            </button>
          ))}

          <p className="px-4 py-2 mt-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
            <Type size={11} />
            {t('admin.panel.texts')}
          </p>
          {CONTENT_PAGES.map((page) => (
            <button
              key={page.key}
              type="button"
              onClick={() => onSectionChange(page.key)}
              className={textNavClass(page.key)}
            >
              {TEXT_ICONS[page.key]}
              {page.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100 space-y-3">
          <div className="flex gap-1.5">
            {(['ru', 'kz', 'en'] as const).map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => setLanguage(lang)}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold uppercase transition-colors ${
                  language === lang ? 'bg-[#006442] text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="w-full px-4 py-2.5 bg-gray-100 text-gray-600 text-xs font-bold uppercase rounded-xl hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            {t('admin.panel.logout')}
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <div className="p-8 lg:p-10">{children}</div>
      </main>
    </div>
  );
}
