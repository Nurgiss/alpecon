import logoColor from '@/assets/logo-color.png';
import { useLanguage } from '@/app/contexts/LanguageContext';

export function Footer() {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-[rgb(255,255,255)] text-[#0D0D0D]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-8 sm:mb-10 lg:mb-12">
          {/* Column 1 - About */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-4 sm:mb-6">
              <img 
                src={logoColor} 
                alt="ALPECON GROUP" 
                className="h-12 sm:h-14 lg:h-16 w-auto"
              />
            </div>
            <p className="text-sm sm:text-base text-[#0D0D0D]/60 leading-relaxed max-w-xs">
              {t('footer.about')}
            </p>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="font-bold text-[#0D0D0D] mb-4 sm:mb-6 uppercase tracking-wide text-sm sm:text-base">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base">
              <li><a href="/about" className="text-[#0D0D0D]/60 hover:text-[#0D0D0D] transition-colors">О заводе</a></li>
              <li><a href="/production" className="text-[#0D0D0D]/60 hover:text-[#0D0D0D] transition-colors">Производство</a></li>
              <li><a href="/products" className="text-[#0D0D0D]/60 hover:text-[#0D0D0D] transition-colors">Продукция</a></li>
              <li><a href="/quality" className="text-[#0D0D0D]/60 hover:text-[#0D0D0D] transition-colors">Качество</a></li>
            </ul>
          </div>

          {/* Column 3 - Contacts */}
          <div>
            <h3 className="font-bold text-[#0D0D0D] mb-4 sm:mb-6 uppercase tracking-wide text-sm sm:text-base">{t('footer.contacts')}</h3>
            <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-[#0D0D0D]/60">
              <li>{t('header.phone')}</li>
              <li className="break-all">{t('footer.email')}</li>
              <li>{t('footer.workTime')}</li>
            </ul>
          </div>

          {/* Column 4 - Address */}
          <div>
            <h3 className="font-bold text-[#0D0D0D] mb-4 sm:mb-6 uppercase tracking-wide text-sm sm:text-base">{t('footer.address')}</h3>
            <p className="text-sm sm:text-base text-[#0D0D0D]/60 leading-relaxed">
              {t('footer.addressText')}
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#0D0D0D]/10 pt-6 sm:pt-8">
          <p className="text-xs sm:text-sm text-[#0D0D0D]/40 text-center">
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}