import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Instagram, Linkedin, Phone, MapPin, Menu, X } from 'lucide-react';
import logoColor from '@/assets/logo-color.svg';
import logoWhite from '@/assets/logo-white.svg';
import { useLanguage, Language } from '@/app/contexts/LanguageContext';

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

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top Info Bar - Minimalist */}
      <div className={`transition-all duration-300 hidden lg:block ${
        scrolled 
          ? 'bg-[#0D0D0D]/95 backdrop-blur-xl border-b border-white/10' 
          : 'bg-transparent border-b border-white/10'
      }`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-2">
            {/* Left - Address */}
            <div className="flex items-center gap-2 text-white/70 text-xs uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5" />
              <span>{t('header.location')}</span>
            </div>

            {/* Right - Social & Phone */}
            <div className="flex items-center gap-6">
              {/* Social Links */}
              <div className="flex items-center gap-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-[#006442] transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-[#006442] transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-2 text-white/70 text-xs uppercase tracking-wider">
                <Phone className="w-3.5 h-3.5" />
                <span>{t('header.phone')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation - Clean & Sharp */}
      <div className={`transition-all duration-300 ${
        scrolled 
          ? 'bg-[#0D0D0D]/95 backdrop-blur-xl border-b border-white/10 shadow-lg' 
          : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center z-10">
              <div className="w-28 sm:w-32 lg:w-36 h-10 sm:h-11 lg:h-12">
                <img src={scrolled ? logoColor : logoWhite} alt="Alpecon Group" className="w-full h-full object-contain" />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex gap-1 items-center">
              {navigation.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-xs tracking-widest transition-all uppercase px-6 py-3 relative ${
                    location.pathname === item.path
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

            {/* Language Switcher - Desktop */}
            <div className="hidden lg:flex items-center gap-1">
              <button 
                onClick={() => setLanguage('ru')}
                className={`font-bold text-xs transition-all px-4 py-2 uppercase tracking-widest ${
                  language === 'ru' ? 'text-white bg-[#006442]' : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                RU
              </button>
              <button 
                onClick={() => setLanguage('kz')}
                className={`font-bold text-xs transition-all px-4 py-2 uppercase tracking-widest ${
                  language === 'kz' ? 'text-white bg-[#006442]' : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                KZ
              </button>
              <button 
                onClick={() => setLanguage('en')}
                className={`font-bold text-xs transition-all px-4 py-2 uppercase tracking-widest ${
                  language === 'en' ? 'text-white bg-[#006442]' : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                EN
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-white p-2 z-10"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden fixed inset-0 bg-[#0D0D0D]/98 backdrop-blur-xl transition-transform duration-300 ${
        mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`} style={{ top: scrolled ? '64px' : '64px' }}>
        <div className="container mx-auto px-4 sm:px-6 py-8 h-full overflow-y-auto">
          {/* Mobile Navigation */}
          <nav className="flex flex-col gap-2 mb-8">
            {navigation.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm tracking-widest transition-all uppercase px-6 py-4 relative border-l-4 ${
                  location.pathname === item.path
                    ? 'text-white font-bold bg-white/5 border-[#006442]'
                    : 'text-white/60 hover:text-white hover:bg-white/5 border-transparent'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Language Switcher */}
          <div className="flex gap-2 mb-8">
            <button 
              onClick={() => setLanguage('ru')}
              className={`flex-1 font-bold text-sm transition-all px-4 py-3 uppercase tracking-widest ${
                language === 'ru' ? 'text-white bg-[#006442]' : 'text-white/60 bg-white/5'
              }`}
            >
              RU
            </button>
            <button 
              onClick={() => setLanguage('kz')}
              className={`flex-1 font-bold text-sm transition-all px-4 py-3 uppercase tracking-widest ${
                language === 'kz' ? 'text-white bg-[#006442]' : 'text-white/60 bg-white/5'
              }`}
            >
              KZ
            </button>
            <button 
              onClick={() => setLanguage('en')}
              className={`flex-1 font-bold text-sm transition-all px-4 py-3 uppercase tracking-widest ${
                language === 'en' ? 'text-white bg-[#006442]' : 'text-white/60 bg-white/5'
              }`}
            >
              EN
            </button>
          </div>

          {/* Mobile Contact Info */}
          <div className="space-y-4 pt-8 border-t border-white/10">
            <div className="flex items-center gap-3 text-white/70 text-sm">
              <MapPin className="w-4 h-4" />
              <span>{t('header.location')}</span>
            </div>
            <div className="flex items-center gap-3 text-white/70 text-sm">
              <Phone className="w-4 h-4" />
              <span>{t('header.phone')}</span>
            </div>
            <div className="flex items-center gap-4 pt-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-[#006442] transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-[#006442] transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}