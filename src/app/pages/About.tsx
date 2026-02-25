// import { Button } from '@/app/components/Button';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { Users } from 'lucide-react';
import imgHeroAbout from '@/assets/about-hero.jpg';
import imgMission from '@/assets/image 24.jpg';
import iconExports from '@/assets/exports.png';
import iconEco from '@/assets/eco.png';
import iconFarmer from '@/assets/farmer.png';
import imgEgor from '@/assets/Egor.jpeg';
import imgBau from '@/assets/Bau.jpeg';
import imgErzhan from '@/assets/8 - Erzhan.jpeg';
import imgDirector from '@/assets/IMG_0129.JPG';
import img1 from '@/assets/1.jpg';
import img2 from '@/assets/2.jpeg';
import img3 from '@/assets/3.jpg';

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
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/45"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 lg:pt-32 text-center">
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-geologica font-bold text-white uppercase tracking-tight leading-[1.1] mb-6">{t('about.hero.title')}</h1>
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

      {/* About Section with Images */}
      <section className="py-16 sm:py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center mb-20 sm:mb-24 lg:mb-32">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-geologica font-bold text-gray-900 uppercase tracking-tight leading-[1.1] mb-6 sm:mb-8">{t('about.mission.title')}</h2>
              <div className="space-y-4 text-base sm:text-lg lg:text-lg text-gray-700 font-geist leading-relaxed text-center lg:text-left">
                {t('home.aboutSection.text').split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-4 sm:space-y-6">
                <div className="overflow-hidden rounded-md shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1651525670054-279c154bc3b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcnVpdCUyMHByb2Nlc3NpbmclMjBmYWN0b3J5JTIwcHJvZHVjdGlvbnxlbnwxfHx8fDE3NzEzNTM1OTd8MA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Apple Orchard"
                    className="w-full h-64 sm:h-72 object-cover transition-all duration-500"
                  />
                </div>
                <div className="overflow-hidden rounded-md shadow-lg">
                  <img
                    src={img2}
                    alt="Fresh Fruits"
                    className="w-full h-48 sm:h-56 object-cover transition-all duration-500"
                  />
                </div>
              </div>
              <div className="space-y-4 sm:space-y-6 pt-8 sm:pt-12">
                <div className="overflow-hidden rounded-md shadow-lg">
                  <img
                    src={img1}
                    alt="Solar Panels"
                    className="w-full h-48 sm:h-56 object-cover"
                  />
                </div>
                <div className="overflow-hidden rounded-md shadow-lg">
                  <img
                    src={img3}
                    alt="Greenhouse"
                    className="w-full h-64 sm:h-72 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Key Achievements Grid */}
         
        </div>
      </section>

      {/* Mission Section - Modern Design */}
      <section className="py-16 sm:py-24 lg:py-32 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative w-full overflow-hidden rounded-[32px] min-h-[430px]">
            {/* Фоновые изображения яблоневого сада */}
            <div className="absolute inset-0">
              <img 
                alt="Apple orchard" 
                className="absolute inset-0 w-full h-full object-cover" 
                src={imgMission} 
              />
              <img 
                alt="" 
                className="absolute inset-0 w-full h-full object-cover brightness-110 contrast-105 saturate-110" 
                src={imgMission} 
              />
            </div>
            
            {/* Темно-зеленая карточка с текстом справа */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-full lg:w-[50%] h-full flex items-center">
              <div className="bg-[#123327]/90 backdrop-blur-sm lg:rounded-l-[32px] w-full h-full lg:h-[85%] flex flex-col justify-center px-8 sm:px-12 py-12 lg:py-8">
                <h2 className="font-geologica font-bold text-3xl sm:text-4xl lg:text-[40px] text-white mb-6 sm:mb-8">
                  {t('about.mission.title')}
                </h2>
                <div className="font-geist font-normal text-base sm:text-lg lg:text-lg text-white space-y-4">
                  <p>{t('about.mission.text1')}</p>
                  <p>{t('about.mission.text2')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section - Dark Green Cards */}
      <section className="py-16 sm:py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div>
            <div className="relative min-h-[700px] rounded-3xl overflow-hidden">
              {/* Background image */}
              <img 
                src="https://images.unsplash.com/photo-1730628257362-d3ddcf952a75?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMGZpZWxkcyUyMGxhbmRzY2FwZSUyMG1vdW50YWluc3xlbnwxfHx8fDE3NzEzMzkzNzR8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Landscape background"
                className="absolute inset-0 w-full h-full object-cover"
              />
              
              {/* Затемнение */}
              <div className="absolute inset-0 bg-black/5" />
              
              {/* Заголовок */}
              <div className="relative pt-12 sm:pt-16 text-center z-10 mb-8">
                <h2 className="font-geologica font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-3 tracking-wide uppercase">
                  {t('about.values.title')}
                </h2>
                <p className="font-geist font-normal text-lg sm:text-xl text-white/90">
                  {t('about.values.subtitle')}
                </p>
              </div>
              
              {/* Карточки */}
              <div className="relative flex flex-col lg:flex-row justify-center items-stretch gap-6 sm:gap-8 px-4 sm:px-8 lg:px-12 pb-12 sm:pb-16 pt-8 sm:pt-12 z-10">
                {/* Export Card */}
                <div className="bg-[#123327] flex flex-col gap-6 items-center px-6 sm:px-8 py-8 sm:py-10 rounded-3xl w-full lg:w-[360px] transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:bg-[#1a4a38]">
                  <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full">
                    <img src={iconExports} alt={t('about.values.export.title')} className="w-10 h-10 sm:w-12 sm:h-12 object-contain" />
                  </div>
                  <h3 className="font-geologica font-bold text-xl sm:text-2xl text-white uppercase text-center">
                    {t('about.values.export.title')}
                  </h3>
                  <p className="font-geist font-normal text-base sm:text-lg text-center text-white/90 leading-relaxed">
                    {t('about.values.export.description')}
                  </p>
                </div>
                
                {/* Ecology Card */}
                <div className="bg-[#123327] flex flex-col gap-6 items-center px-6 sm:px-8 py-8 sm:py-10 rounded-3xl w-full lg:w-[360px] transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:bg-[#1a4a38]">
                  <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full">
                    <img src={iconEco} alt={t('about.values.ecology.title')} className="w-10 h-10 sm:w-12 sm:h-12 object-contain" />
                  </div>
                  <h3 className="font-geologica font-bold text-xl sm:text-2xl text-white uppercase text-center">
                    {t('about.values.ecology.title')}
                  </h3>
                  <p className="font-geist font-normal text-base sm:text-lg text-center text-white/90 leading-relaxed">
                    {t('about.values.ecology.description')}
                  </p>
                </div>
                
                {/* People Card */}
                <div className="bg-[#123327] flex flex-col gap-6 items-center px-6 sm:px-8 py-8 sm:py-10 rounded-3xl w-full lg:w-[360px] transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:bg-[#1a4a38]">
                  <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full">
                    <img src={iconFarmer} alt={t('about.values.people.title')} className="w-10 h-10 sm:w-12 sm:h-12 object-contain" />
                  </div>
                  <h3 className="font-geologica font-bold text-xl sm:text-2xl text-white uppercase text-center">
                    {t('about.values.people.title')}
                  </h3>
                  <p className="font-geist font-normal text-base sm:text-lg text-center text-white/90 leading-relaxed">
                    {t('about.values.people.description')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 sm:py-24 lg:py-32 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-geologica font-bold text-gray-900 uppercase tracking-tight leading-[1.1]">{t('about.team.title')}</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
            {/* Генеральный директор */}
            <div className="relative overflow-hidden rounded-2xl aspect-square bg-white shadow-lg hover:shadow-2xl transition-all">
              <div className="absolute inset-0">
                <img src={imgDirector} alt={t('about.team.director.name')} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
              </div>
              <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 text-white">
                <h3 className="text-xl sm:text-2xl font-geologica font-bold uppercase tracking-tight leading-tight mb-2">{t('about.team.director.name')}</h3>
                <p className="text-white/90 font-semibold uppercase text-xs sm:text-sm tracking-wide">{t('about.team.director.position')}</p>
              </div>
            </div>

            {/* Коммерческий директор */}
            <div className="relative overflow-hidden rounded-2xl aspect-square bg-white shadow-lg hover:shadow-2xl transition-all">
              <div className="absolute inset-0">
                <img src={imgBau} alt={t('about.team.commercial.name')} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
              </div>
              <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 text-white">
                <h3 className="text-xl sm:text-2xl font-geologica font-bold uppercase tracking-tight leading-tight mb-2">{t('about.team.commercial.name')}</h3>
                <p className="text-white/90 font-semibold uppercase text-xs sm:text-sm tracking-wide">{t('about.team.commercial.position')}</p>
              </div>
            </div>

            {/* Технический директор */}
            <div className="relative overflow-hidden rounded-2xl aspect-square bg-white shadow-lg hover:shadow-2xl transition-all">
              <div className="absolute inset-0">
                <img src={imgEgor} alt={t('about.team.technical.name')} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
              </div>
              <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 text-white">
                <h3 className="text-xl sm:text-2xl font-geologica font-bold uppercase tracking-tight leading-tight mb-2">{t('about.team.technical.name')}</h3>
                <p className="text-white/90 font-semibold uppercase text-xs sm:text-sm tracking-wide">{t('about.team.technical.position')}</p>
              </div>
            </div>

            {/* Руководитель аппарата */}
            <div className="relative overflow-hidden rounded-2xl aspect-square bg-white shadow-lg hover:shadow-2xl transition-all">
              <div className="absolute inset-0">
                <img src={imgErzhan} alt="Ибраимов Ержан Еркинкалиевич" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
              </div>
              <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 text-white">
                <h3 className="text-xl sm:text-2xl font-geologica font-bold uppercase tracking-tight leading-tight mb-2">Ибраимов Ержан Еркинкалиевич</h3>
                <p className="text-white/90 font-semibold uppercase text-xs sm:text-sm tracking-wide">Руководитель аппарата</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}