import { Button } from '@/app/components/Button';

export function Production() {
  return (
    <div>
      {/* Hero Section - Full Screen */}
      <section className="relative h-screen flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&auto=format&fit=crop&q=80"
            alt="Production Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/60"></div>
        </div>
        <div className="relative z-10 container mx-auto px-8 pt-32">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-geologica font-bold text-white uppercase tracking-tight leading-[1.1] mb-6">Производство</h1>
          <p className="text-white/90 text-2xl max-w-3xl">
            Современные технологии и полный цикл переработки
          </p>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-12 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-4 bg-white rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Production Overview with Images */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-2 gap-20 items-center mb-32">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-geologica font-bold text-gray-900 uppercase tracking-tight leading-[1.1] mb-8">Производственный комплекс</h2>
              <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                Наш завод оснащён современным европейским оборудованием и автоматизированными линиями, обеспечивающими высокую производительность и качество продукции.
              </p>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                Общая площадь производственных помещений составляет 25,000 м², что позволяет перерабатывать более 150,000 тонн сырья ежегодно.
              </p>
              
              {/* Production Stats */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: '25,000 м²', label: 'Производственная площадь' },
                  { value: '150K т/год', label: 'Мощность переработки' },
                  { value: '95%', label: 'Автоматизация процессов' },
                  { value: '24/7', label: 'Круглосуточная работа' },
                ].map((stat, idx) => (
                  <div key={idx} className="bg-gray-50 rounded-md p-6 border border-gray-200">
                    <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="overflow-hidden rounded-md shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1635961179148-3d886568775c?w=600&auto=format&fit=crop&q=80"
                    alt="Production Line 1"
                    className="w-full h-72 object-cover transition-all duration-500"
                  />
                </div>
                <div className="overflow-hidden rounded-md shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1594737626072-90dc274bc2bc?w=600&auto=format&fit=crop&q=80"
                    alt="Production Line 2"
                    className="w-full h-56 object-cover transition-all duration-500"
                  />
                </div>
              </div>
              <div className="space-y-6 pt-12">
                <div className="overflow-hidden rounded-md shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1745517512760-dd48be2f7cb8?w=600&auto=format&fit=crop&q=80"
                    alt="Production Line 3"
                    className="w-full h-56 object-cover"
                  />
                </div>
                <div className="overflow-hidden rounded-md shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1586528116493-a7a7b9b4b4c?w=600&auto=format&fit=crop&q=80"
                    alt="Production Line 4"
                    className="w-full h-72 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Production Lines - Detailed Cards */}
      <section className="py-32 bg-gray-50">
        <div className="container mx-auto px-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-geologica font-bold text-gray-900 uppercase tracking-tight leading-[1.1] mb-20 text-center">Производственные линии</h2>
          <div className="space-y-32">
            {[
              {
                title: 'Линия консервирования овощей',
                desc: 'Автоматизированная линия производительностью 30 тонн готовой продукции в сутки. Полный цикл от мойки до упаковки с применением современных технологий консервирования.',
                capacity: '30 т/сутки',
                automation: '95%',
                products: '80+ видов',
                equipment: 'Европейское оборудование 2020 года',
                image1: 'Canning Line Main',
                image2: 'Canning Process',
                features: [
                  'Автоматическая мойка и сортировка',
                  'Бланширование и стерилизация',
                  'Вакуумная укупорка',
                  'Автоматическая маркировка'
                ]
              },
              {
                title: 'Линия производства соков',
                desc: 'Современное оборудование для производства соков прямого отжима с асептическим розливом. Сохранение всех витаминов и полезных свойств.',
                capacity: '50 т/сутки',
                automation: '98%',
                products: '35+ видов',
                equipment: 'Tetra Pak 2021 года',
                image1: 'Juice Line Main',
                image2: 'Juice Processing',
                features: [
                  'Прямой отжим и фильтрация',
                  'Асептический розлив',
                  'Пастеризация флеш-методом',
                  'Упаковка Tetra Pak'
                ]
              },
              {
                title: 'Линия быстрой заморозки',
                desc: 'Туннель шоковой заморозки для сохранения всех питательных свойств овощей и фруктов. Температура заморозки до -40°C обеспечивает максимальное качество.',
                capacity: '25 т/сутки',
                automation: '92%',
                products: '40+ видов',
                equipment: 'IQF технология 2022 года',
                image1: 'Freezing Line Main',
                image2: 'Freezing Process',
                features: [
                  'Индивидуальная быстрая заморозка (IQF)',
                  'Температура до -40°C',
                  'Сохранение структуры продукта',
                  'Автоматическая фасовка'
                ]
              },
            ].map((line, idx) => (
              <div key={idx} className="bg-white rounded-md shadow-2xl overflow-hidden border border-gray-100">
                <div className="grid grid-cols-2 gap-12 p-12">
                  {/* Left side - Images */}
                  <div className="space-y-6">
                    <div className="overflow-hidden rounded-md shadow-lg">
                      <img
                        src={
                          line.image1 === 'Canning Line Main' ? 'https://images.unsplash.com/photo-1635961179148-3d886568775c?w=600&auto=format&fit=crop&q=80' :
                          line.image1 === 'Juice Line Main' ? 'https://images.unsplash.com/photo-1766788467067-d443f19314b6?w=600&auto=format&fit=crop&q=80' :
                          'https://images.unsplash.com/photo-1586528116493-a7a7b9b4b4c?w=600&auto=format&fit=crop&q=80'
                        }
                        alt={line.image1}
                        className="w-full h-80 object-cover transition-all duration-500"
                      />
                    </div>
                    <div className="overflow-hidden rounded-md shadow-lg">
                      <img
                        src={
                          line.image2 === 'Canning Process' ? 'https://images.unsplash.com/photo-1594737626072-90dc274bc2bc?w=600&auto=format&fit=crop&q=80' :
                          line.image2 === 'Juice Processing' ? 'https://images.unsplash.com/photo-1745517512760-dd48be2f7cb8?w=600&auto=format&fit=crop&q=80' :
                          'https://images.unsplash.com/photo-1636319517064-2c096305df82?w=600&auto=format&fit=crop&q=80'
                        }
                        alt={line.image2}
                        className="w-full h-64 object-cover transition-all duration-500"
                      />
                    </div>
                  </div>

                  {/* Right side - Info */}
                  <div>
                    <h3 className="text-3xl sm:text-4xl font-geologica font-bold text-gray-900 uppercase tracking-tight leading-tight mb-6">{line.title}</h3>
                    <p className="text-xl text-gray-700 mb-8 leading-relaxed">{line.desc}</p>
                    
                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className="bg-gray-900 text-white rounded-md p-6">
                        <div className="text-4xl font-bold mb-2">{line.capacity}</div>
                        <div className="text-sm text-white/70">Производительность</div>
                      </div>
                      <div className="bg-gray-900 text-white rounded-md p-6">
                        <div className="text-4xl font-bold mb-2">{line.automation}</div>
                        <div className="text-sm text-white/70">Автоматизация</div>
                      </div>
                      <div className="bg-gray-50 rounded-md p-6 border border-gray-200">
                        <div className="text-3xl font-bold text-gray-900 mb-2">{line.products}</div>
                        <div className="text-sm text-gray-600">Видов продукции</div>
                      </div>
                      <div className="bg-gray-50 rounded-md p-6 border border-gray-200">
                        <div className="text-sm font-bold text-gray-900 mb-2">Оборудование</div>
                        <div className="text-xs text-gray-600">{line.equipment}</div>
                      </div>
                    </div>

                    {/* Features List */}
                    <div className="space-y-3 mb-8">
                      {line.features.map((feature, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-3 bg-gray-50 rounded p-4">
                          <span className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                            ✓
                          </span>
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Button size="lg">Подробнее о линии</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies with Detailed Cards */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-geologica font-bold text-gray-900 uppercase tracking-tight leading-[1.1] mb-8 text-center">Применяемые технологии</h2>
          <p className="text-xl text-gray-600 text-center mb-20 max-w-3xl mx-auto">
            Передовое оборудование и инновационные решения для производства высококачественной продукции
          </p>
          <div className="grid grid-cols-4 gap-8">
            {[
              { 
                name: 'Асептический розлив', 
                desc: 'Стерильная упаковка без консервантов',
                icon: '🧪',
                image: 'Aseptic Technology'
              },
              { 
                name: 'Шоковая заморозка', 
                desc: 'IQF технология -40°C',
                icon: '❄️',
                image: 'Freezing Technology'
              },
              { 
                name: 'Вакуумная упаковка', 
                desc: 'Максимальный срок хранения',
                icon: '📦',
                image: 'Vacuum Technology'
              },
              { 
                name: 'Пастеризация', 
                desc: 'Сохранение витаминов',
                icon: '🔥',
                image: 'Pasteurization'
              },
              { 
                name: 'Ультрафильтрация', 
                desc: 'Очистка и концентрация',
                icon: '💧',
                image: 'Filtration'
              },
              { 
                name: 'Автоматическая сортировка', 
                desc: 'Оптические сенсоры',
                icon: '🤖',
                image: 'Sorting'
              },
              { 
                name: 'Контроль качества', 
                desc: 'Онлайн мониторинг',
                icon: '✓',
                image: 'Quality Control'
              },
              { 
                name: 'Безотходное производство', 
                desc: 'Переработка отходов',
                icon: '♻️',
                image: 'Waste Management'
              },
            ].map((tech, idx) => (
              <div key={idx} className="bg-white rounded-md shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all hover:-translate-y-2 group">
                <div className="overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1636319517064-2c096305df82?w=400&auto=format&fit=crop"
                    alt={tech.name}
                    className="w-full h-48 object-cover transition-all duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-8 text-center">
                  <div className="text-5xl mb-4">{tech.icon}</div>
                  <h3 className="text-xl font-geologica font-bold text-gray-900 uppercase tracking-tight leading-tight mb-2">{tech.name}</h3>
                  <p className="text-sm text-gray-600">{tech.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Flow with Visual Steps */}
      <section className="py-32 bg-gray-50">
        <div className="container mx-auto px-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-geologica font-bold text-gray-900 uppercase tracking-tight leading-[1.1] mb-20 text-center">Этапы производства</h2>
          <div className="grid grid-cols-5 gap-6 mb-20">
            {[
              { step: '01', title: 'Приёмка сырья', desc: 'Входной контроль качества каждой партии', icon: '🚛' },
              { step: '02', title: 'Подготовка', desc: 'Мойка, сортировка, очистка', icon: '💧' },
              { step: '03', title: 'Переработка', desc: 'Основное производство', icon: '⚙️' },
              { step: '04', title: 'Упаковка', desc: 'Фасовка и маркировка', icon: '📦' },
              { step: '05', title: 'Контроль', desc: 'Финальная проверка', icon: '✓' },
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-md shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all group">
                <div className="overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1594737626072-90dc274bc2bc?w=400&auto=format&fit=crop"
                    alt={item.title}
                    className="w-full h-56 object-cover transition-all duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6 text-center">
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <div className="text-4xl font-bold text-gray-900 mb-2">{item.step}</div>
                  <h3 className="font-bold text-gray-900 mb-2 uppercase text-lg">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Process Details */}
          <div className="grid grid-cols-3 gap-8">
            {[
              {
                title: 'Контроль сырья',
                desc: 'Каждая партия проходит проверку на соответствие требованиям',
                points: ['Органолептический анализ', 'Химический состав', 'Микробиология', 'Документация'],
                image: 'Raw Material Control'
              },
              {
                title: 'Производственный контроль',
                desc: 'Мониторинг всех параметров в реальном времени',
                points: ['Температурный режим', 'Времени обработки', 'Концентрация', 'Герметичность'],
                image: 'Production Control'
              },
              {
                title: 'Контроль готовой продукции',
                desc: 'Финальная проверка перед отгрузкой',
                points: ['Вкус и аромат', 'Внешний вид', 'Маркировка', 'Упаковка'],
                image: 'Final Control'
              },
            ].map((control, idx) => (
              <div key={idx} className="bg-white rounded-md shadow-xl overflow-hidden border border-gray-100">
                <div className="overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop"
                    alt={control.title}
                    className="w-full h-56 object-cover"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 uppercase">{control.title}</h3>
                  <p className="text-gray-600 mb-6">{control.desc}</p>
                  <ul className="space-y-2">
                    {control.points.map((point, pIdx) => (
                      <li key={pIdx} className="flex items-center gap-2 text-sm text-gray-700">
                        <span className="w-2 h-2 bg-gray-900 rounded-full"></span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment Section */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-geologica font-bold text-gray-900 uppercase tracking-tight leading-[1.1] mb-20 text-center">Оборудование</h2>
          <div className="grid grid-cols-2 gap-12">
            {[
              {
                category: 'Основное оборудование',
                items: [
                  { name: 'Линия консервирования', manufacturer: 'JBT Corporation (США)', year: '2020' },
                  { name: 'Асептическая линия', manufacturer: 'Tetra Pak (Швеция)', year: '2021' },
                  { name: 'Туннель заморозки', manufacturer: 'GEA (Германия)', year: '2022' },
                  { name: 'Линия фасовки', manufacturer: 'Bosch Packaging (Германия)', year: '2021' },
                ]
              },
              {
                category: 'Вспомогательное оборудование',
                items: [
                  { name: 'Компрессорные станции', manufacturer: 'Bitzer (Германия)', year: '2020' },
                  { name: 'Очистные сооружения', manufacturer: 'Veolia (Франция)', year: '2019' },
                  { name: 'Парогенераторы', manufacturer: 'Certuss (Италия)', year: '2020' },
                  { name: 'Холодильные камеры', manufacturer: 'Bohn (США)', year: '2021' },
                ]
              },
            ].map((section, idx) => (
              <div key={idx} className="bg-gray-50 rounded-md p-10 border border-gray-200">
                <h3 className="text-3xl font-bold text-gray-900 mb-8 uppercase">{section.category}</h3>
                <div className="space-y-6">
                  {section.items.map((item, iIdx) => (
                    <div key={iIdx} className="bg-white rounded-md p-6 shadow-lg border border-gray-100">
                      <h4 className="text-xl font-bold text-gray-900 mb-3">{item.name}</h4>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">{item.manufacturer}</span>
                        <span className="bg-gray-900 text-white px-3 py-1 rounded-full font-bold">{item.year}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gray-900 text-white">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-geologica font-bold text-white uppercase tracking-tight leading-[1.1] mb-8">Экскурсия на производство</h2>
              <p className="text-2xl text-white/70 mb-12">
                Приглашаем партнёров и клиентов посетить наше производство и убедиться в качестве нашей продукции
              </p>
              <Button size="lg">Записаться на экскурсию</Button>
            </div>
            <div className="overflow-hidden rounded-md shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop"
                alt="Factory Tour"
                className="w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}