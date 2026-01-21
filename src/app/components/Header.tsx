import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Instagram, Linkedin, Phone, MapPin, Menu, X } from 'lucide-react';
import logoColor from '@/assets/logo-color.png';
import logoWhite from '@/assets/logo-white.png';
import { useLanguage } from '@/app/contexts/LanguageContext';

export function Header() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const navigation = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.about'), path: '/about' },
    { name: t('nav.projects'), path: '/projects' },
    { name: t('nav.investors'), path: '/investors' },
    { name: t('nav.vacancies'), path: '/vacancies' },
    { name: t('nav.news'), path: '/news' },
    { name: t('nav.contacts'), path: '/contacts' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top Info Bar - Hidden on mobile */}
      <div className={`hidden lg:block transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-xl border-b border-gray-200' 
          : 'bg-transparent border-b border-white/10'
      }`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-2">
            {/* Left - Address */}
            <div className={`flex items-center gap-2 text-xs uppercase tracking-wider ${
              scrolled ? 'text-gray-700' : 'text-white/70'
            }`}>
              <MapPin className="w-3.5 h-3.5" />
              <span className="truncate">{t('header.location')}</span>
            </div>

            {/* Right - Social & Phone */}
            <div className="flex items-center gap-6">
              {/* Social Links */}
              <div className="flex items-center gap-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`transition-colors ${
                    scrolled ? 'text-gray-700 hover:text-[#006442]' : 'text-white/70 hover:text-[#006442]'
                  }`}
                >
                  <Instagram className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`transition-colors ${
                    scrolled ? 'text-gray-700 hover:text-[#006442]' : 'text-white/70 hover:text-[#006442]'
                  }`}
                >
                  <Linkedin className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Phone */}
              <div className={`flex items-center gap-2 text-xs uppercase tracking-wider ${
                scrolled ? 'text-gray-700' : 'text-white/70'
              }`}>
                <Phone className="w-3.5 h-3.5" />
                <span>{t('header.phone')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className={`transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-lg' 
          : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center z-50">
              <div className="w-28 h-10 sm:w-32 sm:h-11 lg:w-36 lg:h-12">
                <img src={scrolled ? logoColor : logoWhite} alt="Alpecon Group" className="w-full h-full object-contain" />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex gap-1 items-center">
              {navigation.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-xs tracking-widest transition-all uppercase px-4 xl:px-6 py-3 relative whitespace-nowrap ${
                    scrolled
                      ? location.pathname === item.path
                        ? 'text-gray-900 font-bold bg-gray-100'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      : location.pathname === item.path
                      ? 'text-white font-bold bg-white/5'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.name}
                  {location.pathname === item.path && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#006442]"></div>
                  )}
                </Link>
              ))}
            </nav>

            {/* Language Switcher + Mobile Menu Button */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => setLanguage('kz')}
                  className={`font-bold text-xs transition-all px-3 sm:px-4 py-2 uppercase tracking-widest ${
                    language === 'kz' 
                      ? 'text-white bg-[#006442]' 
                      : scrolled
                      ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  KZ
                </button>
                <button 
                  onClick={() => setLanguage('en')}
                  className={`font-bold text-xs transition-all px-3 sm:px-4 py-2 uppercase tracking-widest ${
                    language === 'en' 
                      ? 'text-white bg-[#006442]' 
                      : scrolled
                      ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  EN
                </button>
                <button 
                  onClick={() => setLanguage('ru')}
                  className={`font-bold text-xs transition-all px-3 sm:px-4 py-2 uppercase tracking-widest ${
                    language === 'ru' 
                      ? 'text-white bg-[#006442]' 
                      : scrolled
                      ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  RU
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`lg:hidden p-2 ${
                  scrolled ? 'text-gray-900' : 'text-white'
                }`}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-16 bg-white z-40">
          <nav className="container mx-auto px-4 py-6 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block text-sm font-bold uppercase tracking-wider py-3 px-4 rounded-md transition-all ${
                  location.pathname === item.path
                    ? 'text-white bg-[#006442]'
                    : 'text-gray-900 hover:bg-gray-100'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}