import { ImagePlaceholder } from '@/app/components/ImagePlaceholder';
import { Button } from '@/app/components/Button';

export function About() {
  return (
    <div>
      {/* Hero Section - Full Screen */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1513467535987-fd81bc7d62f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=2000"
            alt="О заводе"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black/85"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 lg:pt-32">
          <div className="pl-4 sm:pl-8">
            <h1 className="text-white text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 uppercase tracking-tight leading-[1.1]">Alpecon Group</h1>
            <p className="text-white/90 text-base sm:text-lg lg:text-2xl max-w-3xl leading-tight">
              Казахстанская инвестиционная компания
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
              <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 mb-6 sm:mb-8 uppercase">О нас</h2>
              <p className="text-base sm:text-lg lg:text-xl text-gray-700 mb-4 sm:mb-6 leading-relaxed">
                Alpecon Group — казахстанская инвестиционная компания, реализующая в Алматинской области масштабный экспортно-ориентированный проект по созданию интегрированного агропромышленного кластера глубокой переработки фруктов и овощей.
              </p>
              <p className="text-base sm:text-lg lg:text-xl text-gray-700 mb-4 sm:mb-6 lg:mb-8 leading-relaxed">
                Мы формируем современную экосистему, объединяющую фермеров, промышленную переработку, цифровые технологии и международные рынки. 
              </p>
              <p className="text-base sm:text-lg lg:text-xl text-gray-700 mb-6 sm:mb-8 leading-relaxed">
                Наша цель — развитие глубокой переработки сельхозсырья в Казахстане, рост несырьевого экспорта и выпуск конкурентоспособной продукции с высокой добавленной стоимостью.
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
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {[
              { value: '35+', label: 'Лет опыта', desc: 'На рынке с 1985', icon: '📅' },
              { value: '150K', label: 'Тонн/год', desc: 'Производственная мощность', icon: '🏭' },
              { value: '12', label: 'Сертификатов', desc: 'Международных стандартов', icon: '🏆' },
              { value: '500+', label: 'Сотрудников', desc: 'Квалифицированных специалистов', icon: '👥' },
            ].map((stat, idx) => (
              <div key={idx} className="bg-white shadow-xl p-5 sm:p-8 text-center hover:shadow-2xl transition-all group rounded-md">
                <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">{stat.icon}</div>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 mb-2 uppercase tracking-wide">{stat.label}</div>
                <div className="text-xs sm:text-sm text-gray-600">{stat.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* History Timeline with Images */}
      <section className="py-16 sm:py-24 lg:py-32 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 mb-12 sm:mb-16 lg:mb-20 text-center uppercase">История развития</h2>
          <div className="max-w-6xl mx-auto space-y-8 sm:space-y-12">
            {[
              { 
                year: '1985', 
                title: 'Основание завода', 
                text: 'Запуск первой производственной линии по консервированию овощей. Начало большого пути.', 
                image: 'Foundation 1985' 
              },
              { 
                year: '1995', 
                title: 'Расширение производства', 
                text: 'Открытие цеха по производству соков и введение новых технологий переработки фруктов.', 
                image: 'Expansion 1995' 
              },
              { 
                year: '2005', 
                title: 'Международная сертификация', 
                text: 'Получение сертификатов ISO 9001 и HACCP. Выход на международные рынки.', 
                image: 'Certification 2005' 
              },
              { 
                year: '2015', 
                title: 'Модернизация оборудования', 
                text: 'Установка автоматизированных линий европейского производства. Увеличение мощности на 50%.', 
                image: 'Modernization 2015' 
              },
              { 
                year: '2024', 
                title: 'Лидер отрасли', 
                text: 'Один из крупнейших производителей с современной инфраструктурой и инновационными технологиями.', 
                image: 'Leader 2024' 
              },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-12 bg-white p-6 sm:p-8 lg:p-10 rounded-md shadow-xl hover:shadow-2xl transition-shadow">
                <div className="w-full lg:w-64 flex-shrink-0">
                  <ImagePlaceholder height="h-40 sm:h-48" label={item.image} className="rounded-md mb-4" />
                  <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 text-center">{item.year}</div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 uppercase">{item.title}</h3>
                  <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team with Detailed Cards */}
      <section className="py-16 sm:py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 mb-6 sm:mb-8 text-center uppercase">Руководство</h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 text-center mb-12 sm:mb-16 lg:mb-20 max-w-3xl mx-auto">
            Команда профессионалов с многолетним опытом в пищевой индустрии
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
            {[
              { 
                name: 'Иванов Иван Петрович', 
                position: 'Генеральный директор',
                experience: '25 лет в пищевой промышленности',
                education: 'Московский государственный университет'
              },
              { 
                name: 'Петрова Мария Сергеевна', 
                position: 'Директор по производству',
                experience: '18 лет в управлении производством',
                education: 'Технологический университет'
              },
              { 
                name: 'Сидоров Алексей Николаевич', 
                position: 'Технический директор',
                experience: '22 года в технологиях переработки',
                education: 'Институт пищевых технологий'
              },
            ].map((person, idx) => (
              <div key={idx} className="bg-white rounded-md shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all hover:-translate-y-2 group">
                <div className="relative overflow-hidden">
                  <ImagePlaceholder height="h-80 sm:h-96" label="Team Member" className="rounded-none group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-6 sm:p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{person.name}</h3>
                  <p className="text-xl text-gray-600 font-semibold mb-6">{person.position}</p>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-2">
                      <span className="text-gray-400">📊</span>
                      <span className="text-gray-600">{person.experience}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-gray-400">🎓</span>
                      <span className="text-gray-600">{person.education}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section with Visual Elements */}
      <section className="py-32 bg-gray-900 text-white">
        <div className="container mx-auto px-8">
          <h2 className="text-6xl font-bold mb-20 text-center uppercase">Наши ценности</h2>
          <div className="grid grid-cols-4 gap-10">
            {[
              { 
                title: 'Качество', 
                desc: 'Строгий контроль на всех этапах производства и постоянное совершенствование процессов',
                icon: '⭐',
                image: 'Quality Value'
              },
              { 
                title: 'Инновации', 
                desc: 'Использование передовых технологий и внедрение современных решений',
                icon: '💡',
                image: 'Innovation Value'
              },
              { 
                title: 'Надёжность', 
                desc: 'Стабильное выполнение обязательств и долгосрочные партнёрские отношения',
                icon: '🤝',
                image: 'Reliability Value'
              },
              { 
                title: 'Экология', 
                desc: 'Забота об окружающей среде и устойчивое развитие производства',
                icon: '🌱',
                image: 'Ecology Value'
              },
            ].map((value, idx) => (
              <div key={idx} className="text-center bg-white/5 backdrop-blur-sm rounded-md p-10 border border-white/10 hover:bg-white/10 transition-all group">
                <ImagePlaceholder height="h-48" label={value.image} className="rounded mb-6" />
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform">{value.icon}</div>
                <h3 className="text-2xl font-bold mb-4 uppercase">{value.title}</h3>
                <p className="text-base text-white/70 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Infrastructure Section */}
      <section className="py-32 bg-gray-50">
        <div className="container mx-auto px-8">
          <h2 className="text-6xl font-bold text-gray-900 mb-20 text-center uppercase">Инфраструктура</h2>
          <div className="grid grid-cols-3 gap-8">
            {[
              { 
                title: 'Производственные цеха', 
                area: '25,000 м²',
                desc: 'Современное оборудование',
                image: 'Workshop'
              },
              { 
                title: 'Складские помещения', 
                area: '15,000 м²',
                desc: 'Температурные режимы',
                image: 'Warehouse'
              },
              { 
                title: 'Лаборатория', 
                area: '2,000 м²',
                desc: 'Контроль качества',
                image: 'Laboratory'
              },
              { 
                title: 'Административные здания', 
                area: '3,000 м²',
                desc: 'Офисы и управление',
                image: 'Admin'
              },
              { 
                title: 'Логистический центр', 
                area: '8,000 м²',
                desc: 'Отгрузка продукции',
                image: 'Logistics'
              },
              { 
                title: 'Очистные сооружения', 
                area: '1,500 м²',
                desc: 'Экологические нормы',
                image: 'Facilities'
              },
            ].map((facility, idx) => (
              <div key={idx} className="bg-white rounded-md shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all group">
                <ImagePlaceholder height="h-56" label={facility.image} className="rounded-none group-hover:scale-110 transition-transform duration-500" />
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 uppercase">{facility.title}</h3>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-bold text-gray-900">{facility.area}</span>
                    <span className="text-sm text-gray-600">{facility.desc}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gray-900 text-white">
        <div className="container mx-auto px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-6xl font-bold mb-8 uppercase">Хотите стать нашим партнёром?</h2>
            <p className="text-2xl text-white/70 mb-12">
              Свяжитесь с нами для обсуждения возможностей сотрудничества
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg">Связаться</Button>
              <Button size="lg">Презентация</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}