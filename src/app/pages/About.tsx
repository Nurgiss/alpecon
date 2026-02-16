// import { Button } from '@/app/components/Button';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { Target, TrendingUp, Users, Shield, Lightbulb, Handshake, Leaf } from 'lucide-react';
import imgHeroAbout from '@/assets/image 16.jpg';

export function About() {
  const { t } = useLanguage();
  
  return (
    <div>
      {/* Hero Section - Full Screen */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0">
          <img
            src={imgHeroAbout}
            alt={t('about.hero.title')}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/65"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 lg:pt-32 text-center">
          <div>
            <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-geologica font-bold mb-6 uppercase tracking-tight leading-[1.1]">{t('about.hero.title')}</h1>
            <p className="text-white/90 text-base sm:text-lg lg:text-xl font-geist max-w-3xl leading-tight mx-auto">
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
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-geologica font-bold text-gray-900 mb-6 sm:mb-8 uppercase">{t('about.mission.title')}</h2>
              <p className="text-base sm:text-lg lg:text-lg text-gray-700 font-geist leading-relaxed">
                Alpecon Group — казахстанская инвестиционная компания, реализующая в Алматинской области масштабный экспортно-ориентированный проект по созданию интегрированного агропромышленного кластера глубокой переработки фруктов и овощей.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-4 sm:space-y-6">
                <div className="overflow-hidden rounded-md shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1589217157232-464b505b197f?w=800&auto=format&fit=crop&q=80"
                    alt="Apple Orchard"
                    className="w-full h-64 sm:h-72 object-cover transition-all duration-500"
                  />
                </div>
                <div className="overflow-hidden rounded-md shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?w=800&auto=format&fit=crop&q=80"
                    alt="Fresh Fruits"
                    className="w-full h-48 sm:h-56 object-cover transition-all duration-500"
                  />
                </div>
              </div>
              <div className="space-y-4 sm:space-y-6 pt-8 sm:pt-12">
                <div className="overflow-hidden rounded-md shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800&auto=format&fit=crop&q=80"
                    alt="Factory Facility"
                    className="w-full h-48 sm:h-56 object-cover"
                  />
                </div>
                <div className="overflow-hidden rounded-md shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop&q=80"
                    alt="Agricultural Fields"
                    className="w-full h-64 sm:h-72 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Key Achievements Grid */}
         
        </div>
      </section>

      {/* Mission Cards Section */}
      <section className="py-16 sm:py-24 lg:py-32 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-geologica font-bold text-gray-900 uppercase">Наши миссии</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
            <div className="bg-gradient-to-br from-[#133327] to-[#1a4a3d] shadow-lg rounded-lg p-6 sm:p-8 hover:shadow-xl transition-all text-center text-white">
              <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-geologica font-bold mb-4 uppercase">Цель 1</h3>
              <p className="text-sm font-geist leading-relaxed">{t('about.mission.text1')}</p>
            </div>

            <div className="bg-gradient-to-br from-[#133327] to-[#1a4a3d] shadow-lg rounded-lg p-6 sm:p-8 hover:shadow-xl transition-all text-center text-white">
              <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-geologica font-bold mb-4 uppercase">Цель 2</h3>
              <p className="text-sm font-geist leading-relaxed">{t('about.mission.text2')}</p>
            </div>

            <div className="bg-gradient-to-br from-[#133327] to-[#1a4a3d] shadow-lg rounded-lg p-6 sm:p-8 hover:shadow-xl transition-all text-center text-white">
              <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-geologica font-bold mb-4 uppercase">Цель 3</h3>
              <p className="text-sm font-geist leading-relaxed">{t('about.mission.text3')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section with Visual Elements */}
      <section className="py-16 sm:py-24 lg:py-32 bg-white text-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-geologica font-bold mb-12 sm:mb-16 lg:mb-20 text-center uppercase">{t('about.values.title')}</h2>
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
              <div key={idx} className="text-center bg-white shadow-md rounded-md p-8 sm:p-10 hover:shadow-xl transition-all border border-gray-200">
                <div className={`w-16 h-16 bg-[#006442]/20 rounded-full flex items-center justify-center mx-auto mb-6`}>
                  {idx === 0 && <Shield className="w-8 h-8 text-[#006442]" />}
                  {idx === 1 && <Lightbulb className="w-8 h-8 text-[#006442]" />}
                  {idx === 2 && <Handshake className="w-8 h-8 text-[#006442]" />}
                  {idx === 3 && <Leaf className="w-8 h-8 text-[#006442]" />}
                </div>
                <h3 className="text-xl sm:text-2xl font-geologica font-bold mb-3 sm:mb-4 uppercase">{value.title}</h3>
                <p className="text-sm sm:text-base text-gray-600 font-geist leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 sm:py-24 lg:py-32 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-geologica font-bold text-gray-900 uppercase">Наша команда</h2>
            <p className="text-base sm:text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
              Профессионалы с многолетним опытом в агропромышленной отрасли
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
            {/* Генеральный директор */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-all">
              <div className="h-64 sm:h-72 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <Users className="w-24 h-24 text-gray-400" />
              </div>
              <div className="p-6">
                <h3 className="text-xl sm:text-2xl font-geologica font-bold text-gray-900 mb-2">Самат Балабеков</h3>
                <p className="text-[#006442] font-semibold mb-3 uppercase text-sm">Генеральный директор</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Опытный руководитель с 20+ летним стажем в агропромышленной сфере
                </p>
              </div>
            </div>

            {/* Финансовый директор */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-all">
              <div className="h-64 sm:h-72 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <Users className="w-24 h-24 text-gray-400" />
              </div>
              <div className="p-6">
                <h3 className="text-xl sm:text-2xl font-geologica font-bold text-gray-900 mb-2">Асель Нурбекова</h3>
                <p className="text-[#006442] font-semibold mb-3 uppercase text-sm">Финансовый директор</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Эксперт в области финансового планирования и управления инвестициями
                </p>
              </div>
            </div>

            {/* Технический директор */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-all">
              <div className="h-64 sm:h-72 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <Users className="w-24 h-24 text-gray-400" />
              </div>
              <div className="p-6">
                <h3 className="text-xl sm:text-2xl font-geologica font-bold text-gray-900 mb-2">Ержан Абдуллаев</h3>
                <p className="text-[#006442] font-semibold mb-3 uppercase text-sm">Технический директор</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Специалист по внедрению передовых технологий в производство
                </p>
              </div>
            </div>

            {/* Директор по производству */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-all">
              <div className="h-64 sm:h-72 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <Users className="w-24 h-24 text-gray-400" />
              </div>
              <div className="p-6">
                <h3 className="text-xl sm:text-2xl font-geologica font-bold text-gray-900 mb-2">Марат Токаев</h3>
                <p className="text-[#006442] font-semibold mb-3 uppercase text-sm">Директор по производству</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Руководитель производственных процессов с опытом более 15 лет
                </p>
              </div>
            </div>

            {/* Директор по качеству */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-all">
              <div className="h-64 sm:h-72 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <Users className="w-24 h-24 text-gray-400" />
              </div>
              <div className="p-6">
                <h3 className="text-xl sm:text-2xl font-geologica font-bold text-gray-900 mb-2">Гульнара Касымова</h3>
                <p className="text-[#006442] font-semibold mb-3 uppercase text-sm">Директор по качеству</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Эксперт по контролю качества и сертификации продукции
                </p>
              </div>
            </div>

            {/* Коммерческий директор */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-all">
              <div className="h-64 sm:h-72 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <Users className="w-24 h-24 text-gray-400" />
              </div>
              <div className="p-6">
                <h3 className="text-xl sm:text-2xl font-geologica font-bold text-gray-900 mb-2">Айдар Сарсенов</h3>
                <p className="text-[#006442] font-semibold mb-3 uppercase text-sm">Коммерческий директор</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Специалист по развитию международных рынков и экспорту
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}