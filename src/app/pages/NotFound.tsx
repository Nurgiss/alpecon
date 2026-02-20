import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/app/contexts/LanguageContext';

export function NotFound() {
  const { language } = useLanguage();

  const content = {
    ru: {
      title: '404',
      subtitle: 'Страница не найдена',
      description: 'К сожалению, запрашиваемая страница не существует или была перемещена.',
      homeButton: 'На главную',
      backButton: 'Назад',
    },
    en: {
      title: '404',
      subtitle: 'Page Not Found',
      description: 'Sorry, the page you are looking for does not exist or has been moved.',
      homeButton: 'Go Home',
      backButton: 'Go Back',
    },
    kz: {
      title: '404',
      subtitle: 'Бет табылмады',
      description: 'Кешіріңіз, сіз іздеген бет жоқ немесе жылжытылған.',
      homeButton: 'Басты бетке',
      backButton: 'Артқа',
    },
  };

  const t = content[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-[12rem] sm:text-[16rem] lg:text-[20rem] font-geologica font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500 leading-none tracking-tighter">
            {t.title}
          </h1>
        </div>

        {/* Content */}
        <div className="mb-12 space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-geologica font-bold text-white uppercase tracking-tight">
            {t.subtitle}
          </h2>
          <p className="text-base sm:text-lg text-gray-400 max-w-md mx-auto font-['Geist']">
            {t.description}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/"
            className="group inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-semibold uppercase tracking-wide text-sm hover:bg-gray-100 transition-all duration-300 hover:scale-105 font-['Geist']"
          >
            <Home className="w-5 h-5" />
            {t.homeButton}
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="group inline-flex items-center gap-2 bg-white/10 text-white border border-white/20 px-8 py-4 rounded-full font-semibold uppercase tracking-wide text-sm hover:bg-white/20 transition-all duration-300 hover:scale-105 backdrop-blur-sm font-['Geist']"
          >
            <ArrowLeft className="w-5 h-5" />
            {t.backButton}
          </button>
        </div>

        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  );
}
