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
      {/* Application Form */}
      <section className="relative py-16 sm:py-24 lg:py-32 bg-gray-50 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=2000"
            alt="Background"
            className="w-full h-full object-cover opacity-10"
          />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-md shadow-2xl p-4 sm:p-6 lg:p-8">
              <div className="text-center mb-8 sm:mb-10">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-geologica font-bold text-gray-900 mb-4 uppercase tracking-tight">
                  {t('vacancies.form.title')}
                </h2>
                <p className="text-base sm:text-lg text-gray-600 font-geist">
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

                <p className="text-sm text-gray-600 font-geist text-center mt-4">
                  {t('vacancies.form.required')}
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
