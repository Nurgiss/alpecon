import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { Home } from '@/app/pages/Home';
import { About } from '@/app/pages/About';
import { Production } from '@/app/pages/Production';
import { Products } from '@/app/pages/Products';
import { Quality } from '@/app/pages/Quality';
import { News } from '@/app/pages/News';
import { NewsDetail } from '@/app/pages/NewsDetail';
import { Contacts } from '@/app/pages/Contacts';
import { Admin } from '@/app/pages/Admin';
import { LanguageProvider } from '@/app/contexts/LanguageContext';
import { Projects } from '@/app/pages/Projects';
import { Investors } from '@/app/pages/Investors';
import { Vacancies } from '@/app/pages/Vacancies';

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          {/* Admin route without header/footer */}
          <Route path="/admin" element={<Admin />} />
          
          {/* Public routes with header/footer */}
          <Route path="*" element={
            <div className="min-h-screen bg-white flex flex-col">
              <Header />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/investors" element={<Investors />} />
                  <Route path="/vacancies" element={<Vacancies />} />
                  <Route path="/production" element={<Production />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/quality" element={<Quality />} />
                  <Route path="/news" element={<News />} />
                  <Route path="/news/:id" element={<NewsDetail />} />
                  <Route path="/contacts" element={<Contacts />} />
                </Routes>
              </main>
              <Footer />
            </div>
          } />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}