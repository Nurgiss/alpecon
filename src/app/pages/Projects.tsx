
export function Projects() {
  const projects = [
    {
      title: 'Qazaq Global Food',
      description: 'завод по переработке фруктов и овощей и выпуску концентратов фруктовых соков, овощных и фруктовых пюре.',
      icon: '🏭',
      stats: { capacity: '50K тонн', products: '15+ видов' },
      image: 'https://images.unsplash.com/photo-1644375386140-f22123ceeec4?w=800',
    },
    {
      title: 'Qazaq Agro Processing',
      description: 'завод по переработке выжимок фруктов и овощей и выпуску пектина, пищевых волокон.',
      icon: '⚗️',
      stats: { capacity: '20K тонн', products: 'Пектин, волокна' },
      image: 'https://images.unsplash.com/photo-1582769923195-c6e60dc1d8dc?w=800',
    },
    {
      title: 'Run Planet Organic',
      description: 'Завод по производству яблочного сока прямого отжима и яблочного пюре из отборных плодов с линией розлива.',
      icon: '🧃',
      stats: { capacity: '30K тонн', products: 'Соки, пюре' },
      image: 'https://images.unsplash.com/photo-1734773432473-d1a7a13c3507?w=800',
    },
    {
      title: 'Сеть заготовительных пунктов',
      description: 'создание обширной сети заготовительных пунктов для приемки фруктов и овощей, распределения средств защиты и удобрений, предоставления комфорта и сервиса фермерам (хоз бытовой магазин, кофейня, пространство для переговоров).',
      icon: '📦',
      stats: { capacity: '50+ пунктов', products: 'Полный сервис' },
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800',
    },
    {
      title: 'Alpecon AgrOS',
      description: 'цифровая платформа объединяющая в единую цифровую экосистему садоводов, фермеров, центр агрокомпетенции, заготовительные пункты, завод по переработке фруктов и овощей, фруктохранилища и овощехранилища.',
      icon: '💻',
      stats: { capacity: 'Cloud', products: 'Цифровая экосистема' },
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=2000"
            alt="Проекты"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 lg:pt-32">
          <div className="pl-4 sm:pl-8">
            <div className="inline-block bg-white/10 backdrop-blur-md px-6 py-2 text-xs font-bold mb-6 uppercase tracking-widest text-white rounded-md">
              Наши проекты
            </div>
            <h1 className="text-white text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 uppercase tracking-tight leading-[1.1]">
              Экосистема полного цикла
            </h1>
            <p className="text-white/90 text-base sm:text-xl lg:text-2xl max-w-3xl leading-tight mb-8">
              От полей до готовой продукции — интегрированный агропромышленный кластер
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-2xl mt-8 sm:mt-12">
              <div className="bg-white/10 backdrop-blur-md p-5 sm:p-6 rounded-md">
                <div className="text-3xl sm:text-4xl font-bold text-white mb-2">5</div>
                <div className="text-xs text-white/80 uppercase tracking-wider font-bold">Проектов</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-5 sm:p-6 rounded-md">
                <div className="text-3xl sm:text-4xl font-bold text-white mb-2">150K+</div>
                <div className="text-xs text-white/80 uppercase tracking-wider font-bold">Тонн/год</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-5 sm:p-6 rounded-md">
                <div className="text-3xl sm:text-4xl font-bold text-white mb-2">100%</div>
                <div className="text-xs text-white/80 uppercase tracking-wider font-bold">Интеграция</div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-12 border-2 border-white/50 flex items-start justify-center p-2 rounded-full">
            <div className="w-1 h-4 bg-white rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 sm:py-24 lg:py-32 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="pl-4 sm:pl-8 mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 uppercase tracking-tight leading-[1.1]">
              Наши проекты
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl leading-relaxed">
              Каждый проект — это важная часть единой экосистемы, создающей добавленную стоимость на каждом этапе
            </p>
          </div>

          <div className="space-y-6 sm:space-y-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-white rounded-md shadow-xl overflow-hidden hover:shadow-2xl transition-all group"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  {/* Image */}
                  <div className="relative h-64 sm:h-80 lg:h-[400px] overflow-hidden lg:order-1">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#006442]/80 to-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute top-6 sm:top-8 left-6 sm:left-8">
                      <div className="bg-white/20 backdrop-blur-md w-16 h-16 sm:w-20 sm:h-20 rounded-md flex items-center justify-center text-4xl sm:text-5xl border-2 border-white/40">
                        {project.icon}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 sm:p-8 lg:p-12 flex flex-col justify-center lg:order-2">
                    <div className="inline-block bg-gray-900 text-white px-4 py-2 text-xs font-bold mb-6 uppercase tracking-widest rounded-md w-fit">
                      Проект {index + 1}
                    </div>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 uppercase tracking-tight leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-6 sm:mb-8">
                      {project.description}
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-4 sm:mt-6">
                      <div className="bg-gray-50 p-4 sm:p-6 rounded-md border-l-4 border-[#006442]">
                        <div className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                          {project.stats.capacity}
                        </div>
                        <div className="text-xs text-gray-600 uppercase tracking-wider font-bold">
                          Мощность
                        </div>
                      </div>
                      <div className="bg-gray-50 p-4 sm:p-6 rounded-md border-l-4 border-[#006442]">
                        <div className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                          {project.stats.products}
                        </div>
                        <div className="text-xs text-gray-600 uppercase tracking-wider font-bold">
                          Продукция
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="relative py-16 sm:py-24 lg:py-32 bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=2000"
            alt="Integration"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gray-900/90"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 uppercase tracking-tight">
              Единая экосистема
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-white/80 leading-relaxed">
              Все проекты интегрированы в единую цифровую платформу Alpecon AgrOS, обеспечивая максимальную эффективность и прозрачность всех процессов
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {[
              { icon: '🌱', title: 'Сырье', desc: 'Контроль от поля' },
              { icon: '⚙️', title: 'Переработка', desc: 'Современное производство' },
              { icon: '📊', title: 'Аналитика', desc: 'Цифровой контроль' },
              { icon: '🚚', title: 'Логистика', desc: 'Быстрая доставка' },
            ].map((item, idx) => (
              <div key={idx} className="text-center group">
                <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 bg-white/10 backdrop-blur-md rounded-md flex items-center justify-center text-4xl sm:text-5xl border-2 border-white/20 group-hover:border-[#006442] group-hover:bg-[#006442]/20 transition-all">
                  {item.icon}
                </div>
                <h3 className="text-base sm:text-xl font-bold mb-2 uppercase">{item.title}</h3>
                <p className="text-xs sm:text-sm text-white/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
