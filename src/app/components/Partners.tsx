import baiterekLogo from '@/assets/7996a9f894e346ddc3643c082f3da20302ae0988.png';

const imgBaiterek = baiterekLogo;

export function Partners() {
  // Используем логотип Baiterek и добавляем placeholder'ы для других партнеров
  const partners = [
    { logo: imgBaiterek, name: "Baiterek" },
    { logo: imgBaiterek, name: "БРК" },
    { logo: imgBaiterek, name: "Eurasian Bank" },
    { logo: imgBaiterek, name: "Сбербанк" },
    { logo: imgBaiterek, name: "Freedom Finance" },
    { logo: imgBaiterek, name: "AFRY" },
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-8">
        <div className="pl-8 mb-16">
          <div className="inline-block bg-gray-900 text-white px-6 py-2 text-xs font-bold mb-6 uppercase tracking-widest rounded-md shadow-lg">
            Доверие лидеров
          </div>
          <h2 className="text-5xl font-bold text-[#0D0D0D] mb-4 uppercase tracking-tight leading-[1.1]">
            Наши партнёры
          </h2>
        </div>

        {/* Partners Logos Grid */}
        <div className="max-w-6xl mx-auto mb-12">
          <div className="grid grid-cols-6 gap-8 items-center">
            {partners.map((partner, idx) => (
              <div
                key={idx}
                className="flex items-center justify-center p-8 bg-white shadow-lg hover:shadow-xl transition-all group"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="w-full h-auto max-h-20 object-contain transition-all duration-500"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="flex justify-center gap-2">
          {[0, 1, 2, 3].map((idx) => (
            <div
              key={idx}
              className={`h-2 rounded transition-all duration-300 cursor-pointer hover:bg-[#006442] ${
                idx === 0 ? 'w-10 bg-[#006442]' : 'w-2 bg-gray-300'
              }`}
            ></div>
          ))}
        </div>
      </div>
    </section>
  );
}