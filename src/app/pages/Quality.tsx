import { ImagePlaceholder } from '@/app/components/ImagePlaceholder';

export function Quality() {
  return (
    <div>
      {/* Hero Section - Full Screen */}
      <section className="relative h-screen flex items-center">
        <div className="absolute inset-0">
          <ImagePlaceholder height="h-full" label="Background Video/Image" className="rounded-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/60"></div>
        </div>
        <div className="relative z-10 container mx-auto px-8 pt-32">
          <h1 className="text-white text-7xl font-bold mb-6 uppercase">Качество и стандарты</h1>
          <p className="text-white/90 text-2xl max-w-3xl">
            Международные стандарты и непрерывный контроль
          </p>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-12 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-4 bg-white rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Quality Policy */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-5xl font-bold text-gray-900 mb-8">Политика качества</h2>
              <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                Наша компания придерживается строгих стандартов качества на всех этапах производства. Мы используем только сертифицированное сырьё и современное оборудование для обеспечения высочайшего качества готовой продукции.
              </p>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                Система менеджмента качества охватывает все процессы: от приёмки сырья до отгрузки готовой продукции.
              </p>
              <ul className="space-y-4">
                {[
                  'Входной контроль сырья',
                  'Мониторинг производственных процессов',
                  'Лабораторные испытания',
                  'Контроль готовой продукции',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center text-xl text-gray-700">
                    <span className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold mr-4">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-md opacity-20 blur-2xl"></div>
              <ImagePlaceholder height="h-96" label="Quality Control" className="relative" />
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-32 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold text-gray-900 mb-20 text-center">Сертификаты и награды</h2>
          <div className="grid grid-cols-4 gap-10">
            {[
              { name: 'ISO 9001:2015', desc: 'Система менеджмента качества' },
              { name: 'ISO 22000:2018', desc: 'Безопасность пищевой продукции' },
              { name: 'HACCP', desc: 'Анализ рисков и критических точек' },
              { name: 'ГОСТ Р', desc: 'Российские стандарты качества' },
              { name: 'Organic', desc: 'Органическая продукция' },
              { name: 'Halal', desc: 'Халяльная сертификация' },
              { name: 'IFS Food', desc: 'Международный стандарт' },
              { name: 'BRC', desc: 'Британский стандарт розничной торговли' },
            ].map((cert, idx) => (
              <div key={idx} className="bg-white rounded-md shadow-xl p-8 flex flex-col items-center text-center border border-gray-100 hover:shadow-2xl transition-all hover:-translate-y-2">
                <div className="w-32 h-32 bg-gray-100 border-2 border-gray-300 rounded-md mb-6 flex items-center justify-center">
                  <span className="text-xs text-gray-500 font-mono">CERT</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{cert.name}</h3>
                <p className="text-sm text-gray-600">{cert.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Standards Compliance */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold text-gray-900 mb-20 text-center">Соответствие стандартам</h2>
          <div className="grid grid-cols-2 gap-12">
            {[
              [
                { title: 'Контроль качества сырья', text: 'Проверка каждой партии поступающего сырья на соответствие требованиям безопасности' },
                { title: 'Производственный контроль', text: 'Непрерывный мониторинг технологических процессов и параметров производства' },
                { title: 'Микробиологический контроль', text: 'Регулярные лабораторные анализы на патогенные микроорганизмы' },
              ],
              [
                { title: 'Контроль упаковки', text: 'Проверка герметичности и целостности упаковки готовой продукции' },
                { title: 'Прослеживаемость', text: 'Полная идентификация продукции на всех этапах от сырья до потребителя' },
                { title: 'Документация', text: 'Ведение полной документации по качеству и безопасности' },
              ],
            ].map((column, colIdx) => (
              <div key={colIdx} className="space-y-8">
                {column.map((item, idx) => (
                  <div key={idx} className="bg-gray-50 rounded-md p-8 border-l-8 border-green-600 hover:shadow-xl transition-shadow">
                    <div className="flex items-start gap-6">
                      <div className="w-16 h-16 bg-green-100 rounded-md flex-shrink-0 flex items-center justify-center">
                        <span className="text-green-600 text-2xl font-bold">{colIdx * 3 + idx + 1}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                        <p className="text-lg text-gray-600 leading-relaxed">{item.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testing & Laboratory */}
      <section className="py-32 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold text-gray-900 mb-20 text-center">Лабораторные исследования</h2>
          <div className="grid grid-cols-3 gap-12 mb-16">
            {[
              { title: 'Химический анализ', desc: 'Определение состава и содержания питательных веществ' },
              { title: 'Микробиологический анализ', desc: 'Контроль микробиологической безопасности продукции' },
              { title: 'Органолептический анализ', desc: 'Оценка вкуса, запаха, внешнего вида продукции' },
            ].map((test, idx) => (
              <div key={idx} className="bg-white rounded-md shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all hover:-translate-y-2">
                <ImagePlaceholder height="h-64" label="Lab Testing" className="rounded-none" />
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{test.title}</h3>
                  <p className="text-lg text-gray-600 leading-relaxed">{test.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-br from-green-600 to-blue-600 text-white rounded-md shadow-2xl p-16">
            <h3 className="text-4xl font-bold mb-12 text-center">Показатели качества за 2024 год</h3>
            <div className="grid grid-cols-4 gap-12">
              {[
                { value: '99.8%', label: 'Соответствие стандатам' },
                { value: '100%', label: 'Прослеживаемость' },
                { value: '0', label: 'Нарушений' },
                { value: '12', label: 'Успешных аудитов' },
              ].map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-6xl font-bold mb-4">{stat.value}</div>
                  <div className="text-xl opacity-90">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}