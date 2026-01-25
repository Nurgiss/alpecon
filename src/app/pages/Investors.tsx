
{/*
import { Button } from '@/app/components/Button';
import { useLanguage } from '@/app/contexts/LanguageContext';

export function Investors() {
  const { t } = useLanguage();
  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=2000&auto=format&fit=crop&q=80"
            alt={t('investors.hero.title')}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black/85"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 lg:pt-32">
          <div className="pl-4 sm:pl-8">
            <h1 className="text-white text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 uppercase tracking-tight leading-[1.1]">
              {t('investors.hero.title')}
            </h1>
            <p className="text-white/90 text-base sm:text-lg lg:text-2xl max-w-3xl leading-tight">
              {t('investors.hero.subtitle')}
            </p>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-12 border-2 border-white/50 flex items-start justify-center p-2 rounded-md">
            <div className="w-1 h-4 bg-white rounded-md"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 sm:py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center mb-16">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 sm:mb-8 uppercase">
                {t('investors.section.title')}
              </h2>
              <p className="text-base sm:text-lg lg:text-lg text-gray-700 mb-4 sm:mb-6 leading-relaxed">
                {t('investors.section.text1')}
              </p>
              <p className="text-base sm:text-lg lg:text-lg text-gray-700 mb-4 sm:mb-6 leading-relaxed">
                {t('investors.section.text2')}
              </p>
              <p className="text-base sm:text-lg lg:text-lg text-gray-700 mb-6 sm:mb-8 leading-relaxed">
                {t('investors.section.text3')}
              </p>
            </div>
            <div className="relative">
              <div className="overflow-hidden rounded-md shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&auto=format&fit=crop&q=80"
                  alt="Investment Growth Chart"
                  className="w-full h-96 lg:h-[500px] object-cover transition-all duration-500 hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative py-16 sm:py-24 lg:py-32 bg-[#0D0D0D] text-white overflow-hidden">

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left - Main CTA */}
            <div className="pl-4 sm:pl-8">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight uppercase tracking-tight">
                {t('investors.contact.title')}
              </h2>
              <p className="text-base sm:text-lg text-white/90 mb-8 leading-relaxed">
                {t('investors.contact.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="w-full sm:w-auto">{t('investors.contact.button')}</Button>
              </div>
            </div>

            {/* Right - Contact Cards */}
            <div className="space-y-6">
              <div className="bg-[#2A2A2A] p-6 rounded-lg hover:bg-[#333333] transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                    📞
                  </div>
                  <div>
                    <div className="text-sm text-white/70 mb-1 uppercase tracking-wider font-bold">
                      {t('investors.contact.phone')}
                    </div>
                    <div className="text-lg font-bold">
                      {t('header.phone')}
                    </div>
                    <div className="text-sm text-white/80">
                      Пн-Пт: 9:00 - 18:00
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#2A2A2A] p-6 rounded-lg hover:bg-[#333333] transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                    ✉️
                  </div>
                  <div>
                    <div className="text-sm text-white/70 mb-1 uppercase tracking-wider font-bold">
                      {t('investors.contact.email')}
                    </div>
                    <div className="text-lg font-bold">
                      {t('footer.email')}
                    </div>
                    <div className="text-sm text-white/80">
                      Ответим в течение 24 часов
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#2A2A2A] p-6 rounded-lg hover:bg-[#333333] transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                    📍
                  </div>
                  <div>
                    <div className="text-sm text-white/70 mb-1 uppercase tracking-wider font-bold">
                      {t('investors.contact.address')}
                    </div>
                    <div className="text-lg font-bold">
                      {t('header.location')}
                    </div>
                    <div className="text-sm text-white/80">
                      {t('investors.contact.addressText')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      </section>
    </div>
  );
}
*/}
