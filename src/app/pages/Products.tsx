import { Button } from '@/app/components/Button';

export function Products() {
  return (
    <div>
      {/* Hero Section - Full Screen */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&auto=format&fit=crop"
            alt="Products Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/60"></div>
        </div>
        <div className="relative z-10 container mx-auto px-8 pt-32 text-center text-white">
          <h1 className="text-6xl font-geologica font-bold mb-6 uppercase">Наша продукция</h1>
          <p className="text-lg opacity-90 font-geist max-w-3xl mx-auto">
            Широкий ассортимент качественной продукции для ваших потребностей
          </p>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-12 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-4 bg-white rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-geologica font-bold text-gray-900 mb-20 text-center">Категории продукции</h2>
          <div className="grid grid-cols-3 gap-12">
            {[
              { title: 'Консервированные овощи', desc: 'Полный ассортимент консервированных овощей высшего качества в различной фасовке', products: '50+' },
              { title: 'Соки и напитки', desc: 'Натуральные соки прямого отжима и нектары без консервантов', products: '35+' },
              { title: 'Замороженная продукция', desc: 'Овощи и фрукты быстрой заморозки с сохранением всех полезных свойств', products: '40+' },
            ].map((category, idx) => (
              <div key={idx} className="bg-white rounded-md shadow-2xl overflow-hidden border border-gray-100 hover:shadow-3xl transition-all hover:-translate-y-3">
                <div className="overflow-hidden">
                  <img
                    src={
                      category.title === 'Консервированные овощи' ? 'https://images.unsplash.com/photo-1635961179148-3d886568775c?w=600&auto=format&fit=crop&q=80' :
                      category.title === 'Соки и напитки' ? 'https://images.unsplash.com/photo-1766788467067-d443f19314b6?w=600&auto=format&fit=crop&q=80' :
                      'https://images.unsplash.com/photo-1586528116493-a7a7b9b4b4c?w=600&auto=format&fit=crop&q=80'
                    }
                    alt={category.title}
                    className="w-full h-80 object-cover transition-all duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-10">
                  <h3 className="text-3xl font-geologica font-bold text-gray-900 mb-4">{category.title}</h3>
                  <p className="text-lg text-gray-600 font-geist mb-6 leading-relaxed">{category.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl text-green-600 font-bold">{category.products} видов</span>
                    <Button size="sm">Подробнее</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-32 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-geologica font-bold text-gray-900 mb-8 text-center">Популярная продукция</h2>
          <p className="text-lg text-gray-600 font-geist text-center mb-20 max-w-3xl mx-auto">
            Лучшие предложения из нашего ассортимента
          </p>
          <div className="grid grid-cols-3 gap-8">
            {[
              { name: 'Консервированные огурцы', category: 'Овощи', volume: '720 мл' },
              { name: 'Томатная паста', category: 'Соусы', volume: '500 г' },
              { name: 'Яблочный сок', category: 'Соки', volume: '1 л' },
              { name: 'Зелёный горошек', category: 'Овощи', volume: '400 г' },
              { name: 'Кукуруза сладкая', category: 'Овощи', volume: '340 г' },
              { name: 'Персиковый нектар', category: 'Соки', volume: '1 л' },
              { name: 'Замороженная смесь', category: 'Заморозка', volume: '1 кг' },
              { name: 'Фасоль в томате', category: 'Овощи', volume: '400 г' },
              { name: 'Морковь консервированная', category: 'Овощи', volume: '500 г' },
            ].map((product, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
                <div className="overflow-hidden">
                  <img
                    src={
                      product.name === 'Консервированные огурцы' ? 'https://images.unsplash.com/photo-1594737626072-90dc274bc2bc?w=400&auto=format&fit=crop&q=80' :
                      product.name === 'Томатная паста' ? 'https://images.unsplash.com/photo-1635961179148-3d886568775c?w=400&auto=format&fit=crop&q=80' :
                      product.name === 'Яблочный сок' ? 'https://images.unsplash.com/photo-1766788467067-d443f19314b6?w=400&auto=format&fit=crop&q=80' :
                      product.name === 'Зелёный горошек' ? 'https://images.unsplash.com/photo-1745517512760-dd48be2f7cb8?w=400&auto=format&fit=crop&q=80' :
                      product.name === 'Кукуруза сладкая' ? 'https://images.unsplash.com/photo-1586528116493-a7a7b9b4b4c?w=400&auto=format&fit=crop&q=80' :
                      product.name === 'Персиковый нектар' ? 'https://images.unsplash.com/photo-1636319517064-2c096305df82?w=400&auto=format&fit=crop&q=80' :
                      product.name === 'Замороженная смесь' ? 'https://images.unsplash.com/photo-1594737626072-90dc274bc2bc?w=400&auto=format&fit=crop&q=80' :
                      product.name === 'Фасоль в томате' ? 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&auto=format&fit=crop&q=80' :
                      'https://images.unsplash.com/photo-1586528116493-a7a7b9b4b4c?w=400&auto=format&fit=crop&q=80'
                    }
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-geologica font-bold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-sm text-green-600 font-geist font-semibold mb-1">{product.category}</p>
                  <p className="text-sm text-gray-500 font-geist mb-4">{product.volume}</p>
                  <Button size="sm" className="w-full">Заказать</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Specifications */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-geologica font-bold text-gray-900 mb-20 text-center">Характеристики продукции</h2>
          <div className="grid grid-cols-2 gap-16 max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-md shadow-2xl p-12 border-2 border-green-200">
              <h3 className="text-3xl font-geologica font-bold text-gray-900 mb-8">Консервированная продукция</h3>
              <div className="space-y-6">
                {[
                  { label: 'Срок хранения', value: 'до 3 лет' },
                  { label: 'Условия хранения', value: 'комнатная температура' },
                  { label: 'Состав', value: '100% натуральный' },
                  { label: 'Фасовка', value: '200 г - 3 кг' },
                  { label: 'Без ГМО', value: 'да' },
                ].map((spec, idx) => (
                  <div key={idx} className="flex justify-between items-center border-b-2 border-green-300 pb-4">
                    <span className="text-lg text-gray-700 font-medium">{spec.label}</span>
                    <span className="text-xl font-bold text-gray-900">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-md shadow-2xl p-12 border-2 border-blue-200">
              <h3 className="text-3xl font-geologica font-bold text-gray-900 mb-8">Соки и напитки</h3>
              <div className="space-y-6">
                {[
                  { label: 'Способ производства', value: 'прямой отжим' },
                  { label: 'Консерванты', value: 'не содержит' },
                  { label: 'Пастеризация', value: 'да' },
                  { label: 'Объём упаковки', value: '0.5 - 3 л' },
                  { label: 'Срок хранения', value: 'до 12 месяцев' },
                ].map((spec, idx) => (
                  <div key={idx} className="flex justify-between items-center border-b-2 border-blue-300 pb-4">
                    <span className="text-lg text-gray-700 font-medium">{spec.label}</span>
                    <span className="text-xl font-bold text-gray-900">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-32 bg-gradient-to-br from-green-600 to-blue-600 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-geologica font-bold mb-20 text-center">Преимущества нашей продукции</h2>
          <div className="grid grid-cols-4 gap-12">
            {[
              { title: 'Натуральность', desc: 'Только качественное сырье' },
              { title: 'Безопасность', desc: 'Строгий контроль качества' },
              { title: 'Сертификация', desc: 'Все необходимые документы' },
              { title: 'Доступность', desc: 'Конкурентные цены' },
            ].map((benefit, idx) => (
              <div key={idx} className="text-center">
                <div className="w-28 h-28 bg-white rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-5xl text-green-600">✓</span>
                </div>
                <h3 className="text-2xl font-geologica font-bold mb-4">{benefit.title}</h3>
                <p className="text-lg opacity-90 font-geist">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-geologica font-bold mb-6">Интересуетесь оптовыми поставками?</h2>
          <p className="text-2xl opacity-90 font-geist mb-12 max-w-2xl mx-auto">
            Свяжитесь с нашим отделом продаж
          </p>
          <Button size="lg">Получить прайс-лист</Button>
        </div>
      </section>
    </div>
  );
}