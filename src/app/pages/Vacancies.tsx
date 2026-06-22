import { useState, useEffect } from 'react';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { useHeroImage } from '@/contexts/HeroImagesContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3002/api';

export function Vacancies() {
  const { t } = useLanguage();
  const heroImage = useHeroImage('vacancies');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [snackbar, setSnackbar] = useState<{ show: boolean; type: 'success' | 'error' }>({ show: false, type: 'success' });

  useEffect(() => {
    if (snackbar.show) {
      const t = setTimeout(() => setSnackbar(s => ({ ...s, show: false })), 4000);
      return () => clearTimeout(t);
    }
  }, [snackbar.show]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch(`${API_URL}/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Server error');
      setStatus('idle');
      setFormData({ name: '', email: '', phone: '', position: '', experience: '', message: '' });
      setSnackbar({ show: true, type: 'success' });
    } catch {
      setStatus('idle');
      setSnackbar({ show: true, type: 'error' });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      {/* Snackbar */}
      <div
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-4 rounded-lg shadow-2xl text-white text-sm font-medium transition-all duration-500 ${
          snackbar.show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        } ${snackbar.type === 'success' ? 'bg-[#006442]' : 'bg-red-600'}`}
      >
        {snackbar.type === 'success' ? (
          <>
            <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            {t('vacancies.form.submitSuccess')}
          </>
        ) : (
          <>
            <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            {t('vacancies.form.submitError')}
          </>
        )}
        <button onClick={() => setSnackbar(s => ({ ...s, show: false }))} className="ml-2 opacity-70 hover:opacity-100">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Application Form */}
      <section className="relative py-16 sm:py-24 lg:py-32 bg-gray-50 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Background"
            className="w-full h-full object-cover opacity-10"
          />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-md shadow-2xl p-4 sm:p-6 lg:p-8">
              <div className="text-center mb-8 sm:mb-10">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-geologica font-bold text-gray-900 uppercase tracking-tight leading-[1.1] mb-4">
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
                    disabled={status === 'loading'}
                    className="w-full bg-[#006442] text-white px-8 py-4 font-bold text-sm uppercase tracking-wider hover:bg-[#005236] transition-colors rounded-md shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === 'loading' ? t('vacancies.form.submitting') : t('vacancies.form.submit')}
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
