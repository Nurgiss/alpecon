import { useState } from 'react';
import { Button } from '@/app/components/Button';
import { useLanguage } from '@/app/contexts/LanguageContext';

export function Vacancies() {
  const { t } = useLanguage();
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
    alert(t('vacancies.form.submitSuccess'));
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
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=2000"
            alt={t('vacancies.hero.title')}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black/85"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 lg:pt-32">
          <div className="pl-4 sm:pl-8">
            <h1 className="text-white text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 uppercase tracking-tight leading-[1.1]">
              {t('vacancies.hero.title')}
            </h1>
            <p className="text-white/90 text-base sm:text-lg lg:text-2xl max-w-3xl leading-tight">
              {t('vacancies.hero.subtitle')}
            </p>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-12 border-2 border-white/50 flex items-start justify-center p-2 rounded-md">
            <div className="w-1 h-4 bg-white rounded-md"></div>
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
                  {t('vacancies.form.title')}
                </h2>
                <p className="text-base sm:text-lg text-gray-600">
                  {t('vacancies.form.subtitle')}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-wider">
                    {t('vacancies.form.name')} *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-md focus:border-[#006442] focus:outline-none transition-colors"
                    placeholder={t('vacancies.form.namePlaceholder')}
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-wider">
                    {t('vacancies.form.email')} *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-md focus:border-[#006442] focus:outline-none transition-colors"
                    placeholder={t('vacancies.form.emailPlaceholder')}
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-wider">
                    {t('vacancies.form.phone')} *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-md focus:border-[#006442] focus:outline-none transition-colors"
                    placeholder={t('vacancies.form.phonePlaceholder')}
                  />
                </div>

                {/* Position */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-wider">
                    {t('vacancies.form.position')} *
                  </label>
                  <input
                    type="text"
                    name="position"
                    required
                    value={formData.position}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-md focus:border-[#006442] focus:outline-none transition-colors"
                    placeholder={t('vacancies.form.positionPlaceholder')}
                  />
                </div>

                {/* Experience */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-wider">
                    {t('vacancies.form.experience')}
                  </label>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-md focus:border-[#006442] focus:outline-none transition-colors"
                  >
                    <option value="">{t('vacancies.form.experienceSelect')}</option>
                    <option value="no-experience">{t('vacancies.form.experienceOptions.none')}</option>
                    <option value="1-3">{t('vacancies.form.experienceOptions.oneToThree')}</option>
                    <option value="3-5">{t('vacancies.form.experienceOptions.threeToFive')}</option>
                    <option value="5+">{t('vacancies.form.experienceOptions.fivePlus')}</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-wider">
                    {t('vacancies.form.message')}
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-md focus:border-[#006442] focus:outline-none transition-colors resize-none"
                    placeholder={t('vacancies.form.messagePlaceholder')}
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-[#006442] text-white px-8 py-4 font-bold text-sm uppercase tracking-wider hover:bg-[#005236] transition-colors rounded-md shadow-lg"
                  >
                    {t('vacancies.form.submit')}
                  </button>
                </div>

                <p className="text-sm text-gray-600 text-center mt-4">
                  {t('vacancies.form.required')}
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative py-16 sm:py-24 lg:py-32 bg-[#0D0D0D] text-white overflow-hidden">

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight uppercase tracking-tight">
                Остались вопросы?
              </h2>
              <p className="text-base sm:text-lg text-white/90 leading-relaxed">
                Свяжитесь с нашим HR-отделом для получения дополнительной информации о вакансиях и условиях работы
              </p>
            </div>

            {/* Contact Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#2A2A2A] p-6 rounded-lg hover:bg-[#333333] transition-all text-center">
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center text-2xl mx-auto mb-4">
                  📞
                </div>
                <div className="text-sm text-white/70 mb-2 uppercase tracking-wider font-bold">
                  Телефон
                </div>
                <div className="text-lg font-bold mb-1">
                  +7 (727) 123-45-67
                </div>
                <div className="text-sm text-white/80">
                  Пн-Пт: 9:00 - 18:00
                </div>
              </div>

              <div className="bg-[#2A2A2A] p-6 rounded-lg hover:bg-[#333333] transition-all text-center">
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center text-2xl mx-auto mb-4">
                  ✉️
                </div>
                <div className="text-sm text-white/70 mb-2 uppercase tracking-wider font-bold">
                  Email
                </div>
                <div className="text-lg font-bold mb-1">
                  hr@alpecon.kz
                </div>
                <div className="text-sm text-white/80">
                  Ответим в течение 24 часов
                </div>
              </div>

              <div className="bg-[#2A2A2A] p-6 rounded-lg hover:bg-[#333333] transition-all text-center">
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center text-2xl mx-auto mb-4">
                  📍
                </div>
                <div className="text-sm text-white/70 mb-2 uppercase tracking-wider font-bold">
                  Адрес
                </div>
                <div className="text-lg font-bold mb-1">
                  г. Алматы
                </div>
                <div className="text-sm text-white/80">
                  Республика Казахстан
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      </section>
    </div>
  );
}
