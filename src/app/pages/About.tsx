import { ImagePlaceholder } from '@/app/components/ImagePlaceholder';
import { Button } from '@/app/components/Button';
import { useLanguage } from '@/app/contexts/LanguageContext';

export function About() {
  const { t } = useLanguage();
  
  return (
    <div>
      {/* Hero Section - Full Screen */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1513467535987-fd81bc7d62f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=2000"
            alt={t('about.hero.title')}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black/85"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 lg:pt-32">
          <div className="pl-4 sm:pl-8">
            <h1 className="text-white text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 uppercase tracking-tight leading-[1.1]">{t('about.hero.title')}</h1>
            <p className="text-white/90 text-base sm:text-lg lg:text-2xl max-w-3xl leading-tight">
              {t('about.hero.subtitle')}
            </p>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-12 border-2 border-white/50 flex items-start justify-center p-2 rounded-md">
            <div className="w-1 h-4 bg-white rounded-md"></div>
          </div>
        </div>
      </section>

      {/* Mission Section with Detailed Cards */}
      <section className="py-16 sm:py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center mb-20 sm:mb-24 lg:mb-32">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 mb-6 sm:mb-8 uppercase">{t('about.mission.title')}</h2>
              <p className="text-base sm:text-lg lg:text-xl text-gray-700 mb-4 sm:mb-6 leading-relaxed">
                {t('about.mission.text1')}
              </p>
              <p className="text-base sm:text-lg lg:text-xl text-gray-700 mb-4 sm:mb-6 lg:mb-8 leading-relaxed">
                {t('about.mission.text2')}
              </p>
              <p className="text-base sm:text-lg lg:text-xl text-gray-700 mb-6 sm:mb-8 leading-relaxed">
                {t('about.mission.text3')}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-4 sm:space-y-6">
                <ImagePlaceholder height="h-64 sm:h-72" label="Plant Facility 1" className="rounded-md" />
                <ImagePlaceholder height="h-48 sm:h-56" label="Plant Facility 2" className="rounded-md" />
              </div>
              <div className="space-y-4 sm:space-y-6 pt-8 sm:pt-12">
                <ImagePlaceholder height="h-48 sm:h-56" label="Plant Facility 3" className="rounded-md" />
                <ImagePlaceholder height="h-64 sm:h-72" label="Plant Facility 4" className="rounded-md" />
              </div>
            </div>
          </div>

          {/* Key Achievements Grid */}
         
        </div>
      </section>

      {/* Values Section with Visual Elements */}
      <section className="py-16 sm:py-24 lg:py-32 bg-gray-100 text-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-12 sm:mb-16 lg:mb-20 text-center uppercase">{t('about.values.title')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
            {[
              { 
                title: t('about.values.quality.title'), 
                desc: t('about.values.quality.desc'),
                icon: '⭐',
                image: 'Quality Value'
              },
              { 
                title: t('about.values.innovation.title'), 
                desc: t('about.values.innovation.desc'),
                icon: '💡',
                image: 'Innovation Value'
              },
              { 
                title: t('about.values.reliability.title'), 
                desc: t('about.values.reliability.desc'),
                icon: '🤝',
                image: 'Reliability Value'
              },
              { 
                title: t('about.values.ecology.title'), 
                desc: t('about.values.ecology.desc'),
                icon: '🌱',
                image: 'Ecology Value'
              },
            ].map((value, idx) => (
              <div key={idx} className="text-center bg-white shadow-md rounded-md p-8 sm:p-10 hover:shadow-xl transition-all group">
                <ImagePlaceholder height="h-40 sm:h-48" label={value.image} className="rounded mb-4 sm:mb-6" />
                <div className="text-4xl sm:text-5xl lg:text-6xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform">{value.icon}</div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 uppercase">{value.title}</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 sm:py-24 lg:py-32 bg-[#0D0D0D] text-white overflow-hidden">

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left - Main CTA */}
            <div className="pl-4 sm:pl-8">
              <div className="inline-block bg-white text-gray-900 px-6 py-2 text-xs font-bold mb-6 uppercase tracking-widest rounded-lg shadow-lg">
                {t('about.contact.badge')}
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight uppercase tracking-tight">
                {t('about.contact.title')}
              </h2>
              <p className="text-base sm:text-lg text-white/90 mb-8 leading-relaxed">
                {t('about.contact.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="w-full sm:w-auto">{t('about.contact.button')}</Button>
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
                      {t('about.contact.phone')}
                    </div>
                    <div className="text-lg font-bold">
                      +7 (727) 123-45-67
                    </div>
                    <div className="text-sm text-white/80">
                      {t('footer.workTime')}
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
                      {t('about.contact.email')}
                    </div>
                    <div className="text-lg font-bold">
                      info@alpecon.kz
                    </div>
                    <div className="text-sm text-white/80">
                      {t('footer.email')}
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
                      {t('about.contact.address')}
                    </div>
                    <div className="text-lg font-bold">
                      {t('about.contact.addressText')}
                    </div>
                    <div className="text-sm text-white/80">
                      {t('header.location')}
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