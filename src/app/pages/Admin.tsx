import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { newsApi } from '@/services/newsApi';
import { AdminLayout, type AdminSection } from '@/app/components/admin/AdminLayout';
import { AdminDashboard } from '@/app/components/admin/AdminDashboard';
import { NewsManager } from '@/app/components/admin/NewsManager';
import { BlockManager } from '@/app/components/admin/BlockManager';
import { HeroImageManager } from '@/app/components/admin/HeroImageManager';
import { ContentEditor } from '@/app/components/admin/ContentEditor';
import { CONTENT_PAGES, type ContentPageKey } from '@/config/contentPages';
import type { BlockType } from '@/types/blocks';

const BLOCK_TYPES: BlockType[] = ['direction', 'team', 'project'];
const TEXT_KEYS = CONTENT_PAGES.map((p) => p.key);

function isBlockType(section: AdminSection): section is BlockType {
  return BLOCK_TYPES.includes(section as BlockType);
}

function isTextPage(section: AdminSection): section is ContentPageKey {
  return TEXT_KEYS.includes(section as ContentPageKey);
}

export function Admin() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<AdminSection>('dashboard');

  useEffect(() => {
    if (!newsApi.isAuthenticated()) {
      navigate('/dashboard-cms-2025/login');
    }
  }, [navigate]);

  return (
    <AdminLayout activeSection={activeSection} onSectionChange={setActiveSection}>
      {activeSection === 'dashboard' && <AdminDashboard onNavigate={setActiveSection} />}
      {activeSection === 'news' && <NewsManager />}
      {isBlockType(activeSection) && <BlockManager type={activeSection} />}
      {activeSection === 'heroes' && <HeroImageManager />}
      {isTextPage(activeSection) && <ContentEditor pageKey={activeSection} />}
    </AdminLayout>
  );
}
