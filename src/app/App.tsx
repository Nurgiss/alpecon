import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { Home } from '@/app/pages/Home';
import { About } from '@/app/pages/About';
import { News } from '@/app/pages/News';
import { NewsDetail } from '@/app/pages/NewsDetail';
import { Contacts } from '@/app/pages/Contacts';
import { Admin } from '@/app/pages/Admin';
import { AdminLogin } from '@/app/pages/AdminLogin';
import { NotFound } from '@/app/pages/NotFound';
import { HeroImagesProvider } from '@/contexts/HeroImagesContext';
import { SectionImagesProvider } from '@/contexts/SectionImagesContext';
import { Projects } from '@/app/pages/Projects';
// import { Investors } from '@/app/pages/Investors';
import { Vacancies } from '@/app/pages/Vacancies';
import { Analytics } from '@/app/components/Analytics';
import { LanguageProvider } from '@/app/contexts/LanguageContext';
import { useEffect } from 'react';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <LanguageProvider>
      <HeroImagesProvider>
      <SectionImagesProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Analytics />
        <Routes>
          {/* Admin routes without header/footer */}
          <Route path="/dashboard-cms-2025/login" element={<AdminLogin />} />
          <Route path="/dashboard-cms-2025" element={<Admin />} />

          {/* Public routes with header/footer */}
          <Route path="*" element={
            <div className="min-h-screen bg-white flex flex-col">
              <Header />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/projects" element={<Projects />} />
                  {/* <Route path="/investors" element={<Investors />} /> */}
                  <Route path="/vacancies" element={<Vacancies />} />
                  <Route path="/news" element={<News />} />
                  <Route path="/news/:id" element={<NewsDetail />} />
                  <Route path="/contacts" element={<Contacts />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
          } />
        </Routes>
      </BrowserRouter>
      </SectionImagesProvider>
      </HeroImagesProvider>
    </LanguageProvider>
  );
}