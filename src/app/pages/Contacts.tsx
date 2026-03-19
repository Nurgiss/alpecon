import { Button } from '@/app/components/Button';
import { useLanguage } from '@/app/contexts/LanguageContext';

export function Contacts() {
  const { t } = useLanguage();
  return (
    <div>
      {/* Contact Section */}
      <section className="relative py-20 sm:py-32 lg:py-40 bg-white text-gray-900 overflow-hidden">

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left - Main CTA */}
            <div className="pl-4 sm:pl-8">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-geologica font-bold text-gray-900 uppercase tracking-tight leading-[1.1] mb-6">
                {t('contacts.section.title')}
              </h2>
              <p className="text-base sm:text-lg text-gray-600 font-geist mb-8 leading-relaxed">
                {t('contacts.section.subtitle')}
              </p>
            </div>

            {/* Right - Contact Cards */}
            <div className="space-y-6">
              <div className="bg-gray-100 p-6 rounded-lg hover:bg-gray-200 transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                    📞
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-gray-600 mb-1 uppercase tracking-wider font-bold">
                      {t('contacts.section.phone')}
                    </div>
                    <div className="text-lg font-bold">
                      {t('header.phone')}
                    </div>
                    <div className="text-sm text-gray-700 mb-3">
                      {t('contacts.section.workTime')}
                    </div>
                    <a
                      href="https://t.me/alpeconbot"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[#229ED9] hover:bg-[#1a8bc2] text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.19 13.664l-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.96.895z"/>
                      </svg>
                      {t('contacts.section.telegramButton')}
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-gray-100 p-6 rounded-lg hover:bg-gray-200 transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                    ✉️
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1 uppercase tracking-wider font-bold">
                      {t('contacts.section.email')}
                    </div>
                    <div className="text-lg font-bold">
                      {t('footer.email')}
                    </div>
                    <div className="text-sm text-gray-700">
                      {t('contacts.section.responseTime')}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-100 p-6 rounded-lg hover:bg-gray-200 transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                    📍
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1 uppercase tracking-wider font-bold">
                      {t('contacts.section.address')}
                    </div>
                    <div className="text-lg font-bold">
                      {t('header.location')}
                    </div>
                    <div className="text-sm text-gray-700">
                      {t('contacts.section.addressText')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gray-100 rounded-full blur-3xl"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gray-100 rounded-full blur-3xl"></div>
      </section>
    </div>
  );
}