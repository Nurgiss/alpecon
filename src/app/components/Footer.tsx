import logoColor from '@/assets/logo-color.png';
import { useLanguage } from '@/app/contexts/LanguageContext';

export function Footer() {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-[rgb(255,255,255)] text-[#0D0D0D]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 mb-8 sm:mb-10 lg:mb-12">
          {/* Column 1 - About */}
          <div>
            <div className="mb-4 sm:mb-6">
              <img 
                src={logoColor} 
                alt="ALPECON GROUP" 
                className="h-12 sm:h-14 lg:h-16 w-auto"
              />
            </div>
          </div>

          {/* Column 2 - Contacts */}
          <div>
            <h3 className="font-bold text-[#0D0D0D] mb-4 sm:mb-6 uppercase tracking-wide text-sm sm:text-base">{t('footer.contacts')}</h3>
            <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-[#0D0D0D]/60">
              <li><a href="tel:+77758284721" className="hover:opacity-80 transition-opacity">{t('header.phone')}</a></li>
              <li className="break-all">{t('footer.email')}</li>
              <li>{t('footer.workTime')}</li>
            </ul>
          </div>

          {/* Column 3 - Address */}
          <div>
            <h3 className="font-bold text-[#0D0D0D] mb-4 sm:mb-6 uppercase tracking-wide text-sm sm:text-base">{t('footer.address')}</h3>
            <div className="space-y-4">
              {t('footer.addressText').split(' | ').map((address, index) => (
                <p key={index} className="text-sm sm:text-base text-[#0D0D0D]/60 leading-relaxed">
                  {address}
                </p>
              ))}
            </div>
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