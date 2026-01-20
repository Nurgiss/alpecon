const imgLogoAlpecon = "https://via.placeholder.com/200x80/006442/ffffff?text=ALPECON+GROUP";
import { useLanguage } from '@/app/contexts/LanguageContext';

export function Footer() {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-[rgb(255,255,255)] text-[#0D0D0D]">
      <div className="container mx-auto px-8 py-16">
        <div className="grid grid-cols-4 gap-12 mb-12">
          {/* Column 1 - About */}
          <div>
            <div className="mb-6">
              <img 
                src={imgLogoAlpecon} 
                alt="ALPECON GROUP" 
                className="h-16 w-auto"
              />
            </div>
            <p className="text-sm text-[#0D0D0D]/60 leading-relaxed">
              {t('footer.about')}
            </p>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="font-bold text-[#0D0D0D] mb-6 uppercase tracking-wide">{t('footer.quickLinks')}</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="/about" className="text-[#0D0D0D]/60 hover:text-[#0D0D0D] transition-colors">О заводе</a></li>
              <li><a href="/production" className="text-[#0D0D0D]/60 hover:text-[#0D0D0D] transition-colors">Производство</a></li>
              <li><a href="/products" className="text-[#0D0D0D]/60 hover:text-[#0D0D0D] transition-colors">Продукция</a></li>
              <li><a href="/quality" className="text-[#0D0D0D]/60 hover:text-[#0D0D0D] transition-colors">Качество</a></li>
            </ul>
          </div>

          {/* Column 3 - Contacts */}
          <div>
            <h3 className="font-bold text-[#0D0D0D] mb-6 uppercase tracking-wide">{t('footer.contacts')}</h3>
            <ul className="space-y-3 text-sm text-[#0D0D0D]/60">
              <li>{t('header.phone')}</li>
              <li>{t('footer.email')}</li>
              <li>{t('footer.workTime')}</li>
            </ul>
          </div>

          {/* Column 4 - Address */}
          <div>
            <h3 className="font-bold text-[#0D0D0D] mb-6 uppercase tracking-wide">{t('footer.address')}</h3>
            <p className="text-sm text-[#0D0D0D]/60">
              {t('footer.addressText')}
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#0D0D0D]/10 pt-8">
          <p className="text-sm text-[#0D0D0D]/40 text-center">
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}