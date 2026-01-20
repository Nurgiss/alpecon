import { useState } from 'react';

export function Vacancies() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission
    console.log('Form submitted:', formData);
    alert('Ваша заявка отправлена! Мы свяжемся с вами в ближайшее время.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[50vh] sm:h-[60vh] flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=2000"
            alt="Карьера"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block bg-white/10 backdrop-blur-md px-6 py-2 text-xs font-bold mb-6 uppercase tracking-widest text-white rounded-md">
              Карьера в Alpecon Group
            </div>
            <h1 className="text-white text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 uppercase tracking-tight leading-[1.1]">
              Присоединяйтесь к нам
            </h1>
            <p className="text-white/90 text-base sm:text-lg lg:text-xl leading-relaxed">
              Отправьте заявку, и мы свяжемся с вами при открытии подходящих вакансий
            </p>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="relative py-12 sm:py-16 lg:py-20 bg-gray-50 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=2000"
            alt="Background"
            className="w-full h-full object-cover opacity-10"
          />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-md shadow-2xl p-6 sm:p-8 lg:p-12">
              <div className="text-center mb-8 sm:mb-10">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 uppercase tracking-tight">
                  Форма заявки
                </h2>
                <p className="text-base sm:text-lg text-gray-600">
                  Заполните форму ниже, и наш HR-менеджер свяжется с вами
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-wider">
                    Полное имя *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-md focus:border-[#006442] focus:outline-none transition-colors"
                    placeholder="Иванов Иван Иванович"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-wider">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-md focus:border-[#006442] focus:outline-none transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-wider">
                    Телефон *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-md focus:border-[#006442] focus:outline-none transition-colors"
                    placeholder="+7 (777) 123-45-67"
                  />
                </div>

                {/* Position */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-wider">
                    Желаемая позиция *
                  </label>
                  <input
                    type="text"
                    name="position"
                    required
                    value={formData.position}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-md focus:border-[#006442] focus:outline-none transition-colors"
                    placeholder="Например: Технолог, Инженер, Менеджер"
                  />
                </div>

                {/* Experience */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-wider">
                    Опыт работы
                  </label>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-md focus:border-[#006442] focus:outline-none transition-colors"
                  >
                    <option value="">Выберите опыт</option>
                    <option value="no-experience">Без опыта</option>
                    <option value="1-3">1-3 года</option>
                    <option value="3-5">3-5 лет</option>
                    <option value="5+">Более 5 лет</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-wider">
                    Дополнительная информация
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-md focus:border-[#006442] focus:outline-none transition-colors resize-none"
                    placeholder="Расскажите о своем образовании, навыках и опыте работы..."
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-[#006442] text-white px-8 py-4 font-bold text-sm uppercase tracking-wider hover:bg-[#005236] transition-colors rounded-md shadow-lg"
                  >
                    Отправить заявку
                  </button>
                </div>

                <p className="text-sm text-gray-600 text-center mt-4">
                  * Обязательные поля
                </p>
              </form>
            </div>

            {/* Contact Info */}
            <div className="mt-8 sm:mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              {[
                { icon: '📧', label: 'Email', value: 'hr@alpecon.kz' },
                { icon: '📞', label: 'Телефон', value: '+7 (727) 123-45-68' },
                { icon: '📍', label: 'Адрес', value: 'Алматы, Казахстан' },
              ].map((contact, idx) => (
                <div key={idx} className="bg-white p-5 sm:p-6 rounded-md shadow-lg text-center">
                  <div className="text-3xl sm:text-4xl mb-3">{contact.icon}</div>
                  <div className="text-xs text-gray-600 mb-2 uppercase tracking-wider font-bold">
                    {contact.label}
                  </div>
                  <div className="text-sm font-bold text-gray-900">{contact.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
