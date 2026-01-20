
export function Investors() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1579621970795-87f9a79363a9?w=2000"
            alt="Инвесторам"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black/85"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 lg:pt-32">
          <div className="pl-4 sm:pl-8">
            <h1 className="text-white text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 uppercase tracking-tight leading-[1.1]">
              Инвесторам
            </h1>
            <p className="text-white/90 text-base sm:text-lg lg:text-2xl max-w-3xl leading-tight">
              Alpecon Group — надежный партнер для инвестиций в агропромышленный сектор Казахстана
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
                Инвестиции в будущее
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-gray-700 mb-4 sm:mb-6 leading-relaxed">
                Alpecon Group реализует масштабный экспортно-ориентированный проект по созданию интегрированного агропромышленного кластера глубокой переработки фруктов и овощей в Алматинской области.
              </p>
              <p className="text-base sm:text-lg lg:text-xl text-gray-700 mb-4 sm:mb-6 leading-relaxed">
                Наш проект — это создание современной экосистемы, объединяющей фермеров, промышленную переработку, цифровые технологии и международные рынки сбыта.
              </p>
              <p className="text-base sm:text-lg lg:text-xl text-gray-700 mb-6 sm:mb-8 leading-relaxed">
                Мы предлагаем инвесторам участие в развитии производства продукции с высокой добавленной стоимостью и расширении несырьевого экспорта Казахстана.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-4 sm:space-y-6">
                <div className="bg-gray-100 h-64 sm:h-72 rounded-md"></div>
                <div className="bg-gray-100 h-48 sm:h-56 rounded-md"></div>
              </div>
              <div className="space-y-4 sm:space-y-6 pt-8 sm:pt-12">
                <div className="bg-gray-100 h-48 sm:h-56 rounded-md"></div>
                <div className="bg-gray-100 h-64 sm:h-72 rounded-md"></div>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {[
              { value: '$200M', label: 'Инвестиций', desc: 'Общий объем проекта', icon: '💰' },
              { value: '150K', label: 'Тонн/год', desc: 'Производственная мощность', icon: '🏭' },
              { value: '50+', label: 'Заготовителей', desc: 'Партнерская сеть', icon: '🤝' },
              { value: '1000+', label: 'Рабочих мест', desc: 'Будет создано', icon: '👥' },
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

      {/* Why Invest Section */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-12 sm:mb-16 uppercase">
            Почему Alpecon Group
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                title: 'Экспортный потенциал',
                text: 'Производство продукции для экспорта в страны СНГ, Европы и Азии. Рост несырьевого экспорта Казахстана.',
                icon: '🌍',
              },
              {
                title: 'Передовые технологии',
                text: 'Современное европейское оборудование и инновационные методы переработки сырья с максимальной эффективностью.',
                icon: '⚙️',
                highlight: true,
              },
              {
                title: 'Полный цикл',
                text: 'Интеграция всех этапов — от выращивания до переработки и реализации готовой продукции на международных рынках.',
                icon: '🔄',
              },
              {
                title: 'Господдержка',
                text: 'Проект реализуется при поддержке государственных программ развития АПК и экспорта.',
                icon: '🏛️',
              },
              {
                title: 'Устойчивое развитие',
                text: 'Создание рабочих мест, развитие регионов, поддержка местных фермеров и экологичное производство.',
                icon: '🌱',
                highlight: true,
              },
              {
                title: 'Растущий рынок',
                text: 'Стабильно растущий спрос на органические и здоровые продукты питания в мире.',
                icon: '📈',
              },
            ].map((item, idx) => (
              <div key={idx} className={`p-6 sm:p-8 rounded-md shadow-lg hover:shadow-xl transition-all ${
                item.highlight ? 'bg-[#006442] text-white' : 'bg-white'
              }`}>
                <div className="text-4xl sm:text-5xl mb-4 sm:mb-6">{item.icon}</div>
                <h3 className={`text-lg sm:text-xl font-bold mb-3 sm:mb-4 uppercase ${
                  item.highlight ? 'text-white' : 'text-gray-900'
                }`}>
                  {item.title}
                </h3>
                <p className={`text-sm sm:text-base leading-relaxed ${
                  item.highlight ? 'text-white/90' : 'text-gray-600'
                }`}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Structure */}
      <section className="py-16 sm:py-24 lg:py-32 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <div className="inline-block bg-gray-900 text-white px-6 py-2 text-xs font-bold mb-6 uppercase tracking-widest rounded-md shadow-lg">
                Структура проекта
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 uppercase tracking-tight leading-[1.1]">
                Инвестиционный план
              </h2>
            </div>

            <div className="space-y-4 sm:space-y-6">
              {[
                {
                  phase: 'Фаза 1',
                  title: 'Qazaq Global Food',
                  budget: '$80M',
                  timeline: '2024-2026',
                  status: 'В процессе',
                  description: 'Строительство завода переработки фруктов и овощей мощностью 50,000 тонн в год.',
                },
                {
                  phase: 'Фаза 2',
                  title: 'Заготовительная сеть',
                  budget: '$30M',
                  timeline: '2025-2027',
                  status: 'Запланировано',
                  description: 'Создание 50+ заготовительных пунктов и логистической инфраструктуры.',
                },
                {
                  phase: 'Фаза 3',
                  title: 'Qazaq Agro Processing',
                  budget: '$50M',
                  timeline: '2026-2028',
                  status: 'Запланировано',
                  description: 'Завод глубокой переработки для производства пектина и пищевых волокон.',
                },
                {
                  phase: 'Фаза 4',
                  title: 'Run Planet Organic',
                  budget: '$40M',
                  timeline: '2027-2029',
                  status: 'Запланировано',
                  description: 'Премиальная линия органических соков прямого отжима.',
                },
              ].map((phase, idx) => (
                <div key={idx} className="bg-white p-6 sm:p-8 rounded-md shadow-lg hover:shadow-xl transition-all">
                  <div className="flex flex-col sm:flex-row items-start justify-between mb-4 gap-4">
                    <div>
                      <div className="inline-block bg-[#006442] text-white px-4 py-1 text-xs font-bold uppercase rounded-md mb-3">
                        {phase.phase}
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 uppercase tracking-tight">
                        {phase.title}
                      </h3>
                    </div>
                    <div className="text-left sm:text-right">
                      <div className="text-2xl sm:text-3xl font-bold text-[#006442] mb-1">{phase.budget}</div>
                      <div className="text-sm text-gray-600">{phase.timeline}</div>
                    </div>
                  </div>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">{phase.description}</p>
                  <div className="inline-block bg-gray-100 text-gray-700 px-4 py-2 text-xs font-bold uppercase rounded-md">
                    Статус: {phase.status}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 sm:mt-12 bg-gray-900 text-white p-8 sm:p-10 lg:p-12 rounded-md text-center">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 uppercase">Общий объем инвестиций</h3>
              <div className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#006442] mb-4 sm:mb-6">$200M</div>
              <p className="text-base sm:text-lg lg:text-xl text-white/80">
                Создание крупнейшего агропромышленного кластера глубокой переработки в Казахстане
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 sm:mb-8 uppercase">
              Свяжитесь с нами
            </h2>
            <p className="text-base sm:text-lg text-gray-600 mb-10 sm:mb-12 leading-relaxed max-w-2xl mx-auto">
              Для получения подробной информации о возможностях инвестирования и участия в проекте свяжитесь с нашей командой
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              <div className="bg-gray-50 p-6 sm:p-8 rounded-md hover:shadow-lg transition-shadow">
                <div className="text-4xl sm:text-5xl mb-4">📧</div>
                <div className="text-xs sm:text-sm text-gray-600 mb-2 uppercase tracking-wider font-bold">
                  Email
                </div>
                <div className="text-sm sm:text-base font-bold text-gray-900">info@alpecon.kz</div>
              </div>
              <div className="bg-gray-50 p-6 sm:p-8 rounded-md hover:shadow-lg transition-shadow">
                <div className="text-4xl sm:text-5xl mb-4">📞</div>
                <div className="text-xs sm:text-sm text-gray-600 mb-2 uppercase tracking-wider font-bold">
                  Телефон
                </div>
                <div className="text-sm sm:text-base font-bold text-gray-900">+7 (727) 123-45-67</div>
              </div>
              <div className="bg-gray-50 p-6 sm:p-8 rounded-md hover:shadow-lg transition-shadow">
                <div className="text-4xl sm:text-5xl mb-4">📍</div>
                <div className="text-xs sm:text-sm text-gray-600 mb-2 uppercase tracking-wider font-bold">
                  Офис
                </div>
                <div className="text-sm sm:text-base font-bold text-gray-900">г. Алматы, Казахстан</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
