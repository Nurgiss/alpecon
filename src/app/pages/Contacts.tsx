import { ImagePlaceholder } from '@/app/components/ImagePlaceholder';
import { Button } from '@/app/components/Button';

export function Contacts() {
  return (
    <div>
      {/* Hero Section - Full Screen */}
      <section className="relative h-screen flex items-center">
        <div className="absolute inset-0">
          <ImagePlaceholder height="h-full" label="Background Video/Image" className="rounded-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/60"></div>
        </div>
        <div className="relative z-10 container mx-auto px-8 pt-32">
          <h1 className="text-white text-7xl font-bold mb-6 uppercase">Контакты</h1>
          <p className="text-white/90 text-2xl max-w-3xl">
            Свяжитесь с нами удобным способом
          </p>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-12 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-4 bg-white rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 gap-12 mb-20">
            {[
              {
                icon: '📞',
                title: 'Телефон',
                line1: '+7 (495) 123-45-67',
                line2: '+7 (495) 123-45-68',
              },
              {
                icon: '✉️',
                title: 'Email',
                line1: 'info@plant.ru',
                line2: 'sales@plant.ru',
              },
              {
                icon: '🕐',
                title: 'Режим работы',
                line1: 'Пн-Пт: 9:00 - 18:00',
                line2: 'Сб-Вс: выходной',
              },
            ].map((contact, idx) => (
              <div key={idx} className="bg-white rounded-md shadow-xl p-10 text-center border border-gray-100 hover:shadow-2xl transition-all hover:-translate-y-2">
                <div className="text-6xl mb-6">{contact.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">{contact.title}</h3>
                <p className="text-xl text-gray-700 mb-2">{contact.line1}</p>
                <p className="text-xl text-gray-700">{contact.line2}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-8">Напишите нам</h2>
              <div className="bg-white rounded-md shadow-2xl p-10 border border-gray-200">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">Ваше имя *</label>
                    <input
                      type="text"
                      className="w-full px-6 py-4 border-2 border-gray-200 rounded focus:border-green-500 focus:outline-none transition-colors"
                      placeholder="Иван Иванов"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">Email *</label>
                    <input
                      type="email"
                      className="w-full px-6 py-4 border-2 border-gray-200 rounded focus:border-green-500 focus:outline-none transition-colors"
                      placeholder="example@mail.ru"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">Телефон</label>
                    <input
                      type="tel"
                      className="w-full px-6 py-4 border-2 border-gray-200 rounded focus:border-green-500 focus:outline-none transition-colors"
                      placeholder="+7 (999) 123-45-67"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">Тема обращения</label>
                    <select className="w-full px-6 py-4 border-2 border-gray-200 rounded focus:border-green-500 focus:outline-none transition-colors">
                      <option>Общий вопрос</option>
                      <option>Оптовые поставки</option>
                      <option>Качество продукции</option>
                      <option>Сотрудничество</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">Сообщение *</label>
                    <textarea
                      rows={6}
                      className="w-full px-6 py-4 border-2 border-gray-200 rounded focus:border-green-500 focus:outline-none resize-none transition-colors"
                      placeholder="Опишите ваш вопрос..."
                    />
                  </div>
                  <Button size="lg" className="w-full">Отправить сообщение</Button>
                </div>
              </div>
            </div>

            {/* Map & Address */}
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-8">Как нас найти</h2>
              <div className="relative mb-8">
                <div className="absolute -inset-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-md opacity-20 blur-2xl"></div>
                <ImagePlaceholder height="h-96" label="Map" className="relative" />
              </div>
              <div className="bg-white rounded-md shadow-2xl p-8 border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Адрес предприятия</h3>
                <div className="space-y-4 text-lg text-gray-700">
                  <p className="flex items-start">
                    <span className="mr-3 text-2xl">📍</span>
                    <span>123456, Россия, Московская область,<br />г. Москва, ул. Промышленная, 15</span>
                  </p>
                  <p className="flex items-center">
                    <span className="mr-3 text-2xl">🚗</span>
                    <span>10 минут от МКАД</span>
                  </p>
                  <p className="flex items-center">
                    <span className="mr-3 text-2xl">🚇</span>
                    <span>Ст. метро "Промышленная", 15 мин пешком</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="py-32 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold text-gray-900 mb-20 text-center">Отделы и службы</h2>
          <div className="grid grid-cols-2 gap-10">
            {[
              {
                title: 'Отдел продаж',
                phone: '+7 (495) 123-45-67',
                email: 'sales@plant.ru',
                manager: 'Иванова Мария Петровна',
              },
              {
                title: 'Отдел снабжения',
                phone: '+7 (495) 123-45-68',
                email: 'supply@plant.ru',
                manager: 'Петров Сергей Иванович',
              },
              {
                title: 'Отдел качества',
                phone: '+7 (495) 123-45-69',
                email: 'quality@plant.ru',
                manager: 'Сидорова Елена Владимировна',
              },
              {
                title: 'Бухгалтерия',
                phone: '+7 (495) 123-45-70',
                email: 'accounting@plant.ru',
                manager: 'Кузнецова Ольга Николаевна',
              },
            ].map((dept, idx) => (
              <div key={idx} className="bg-white rounded-md shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-shadow">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">{dept.title}</h3>
                <div className="space-y-3 text-lg text-gray-700">
                  <p className="flex justify-between">
                    <span className="text-gray-600 font-medium">Телефон:</span>
                    <span className="font-bold">{dept.phone}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-600 font-medium">Email:</span>
                    <span className="font-bold text-green-600">{dept.email}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-600 font-medium">Руководитель:</span>
                    <span className="font-bold">{dept.manager}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold text-gray-900 mb-20 text-center">Часто задаваемые вопросы</h2>
          <div className="max-w-4xl mx-auto space-y-6">
            {[
              {
                q: 'Как оформить оптовый заказ?',
                a: 'Свяжитесь с нашим отделом продаж по телефону +7 (495) 123-45-67 или отправьте запрос на sales@plant.ru',
              },
              {
                q: 'Какие документы необходимы для сотрудничества?',
                a: 'Для юридических лиц необходимы реквизиты компании и копия свидетельства о регистрации',
              },
              {
                q: 'Возможна ли доставка продукции?',
                a: 'Да, мы организуем доставку по всей России и странам СНГ',
              },
              {
                q: 'Можно ли посетить производство?',
                a: 'Да, мы проводим экскурсии для партнёров. Предварительная запись обязательна',
              },
            ].map((faq, idx) => (
              <div key={idx} className="bg-white rounded-md shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-shadow">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{faq.q}</h3>
                <p className="text-lg text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}