import baiterekLogo from '@/assets/7996a9f894e346ddc3643c082f3da20302ae0988.png';

const imgBaiterek = baiterekLogo;

export function Partners() {
  // Используем логотип Baiterek и placeholder'ы для других партнеров
  const partners = [
    { logo: imgBaiterek, name: "Baiterek", alt: "Baiterek Logo" },
    { logo: "https://via.placeholder.com/200x100/006442/FFFFFF?text=БРК", name: "БРК", alt: "БРК Logo" },
    { logo: "https://via.placeholder.com/200x100/006442/FFFFFF?text=Eurasian+Bank", name: "Eurasian Bank", alt: "Eurasian Bank Logo" },
    { logo: "https://via.placeholder.com/200x100/006442/FFFFFF?text=Сбербанк", name: "Сбербанк", alt: "Сбербанк Logo" },
    { logo: "https://via.placeholder.com/200x100/006442/FFFFFF?text=Freedom+Finance", name: "Freedom Finance", alt: "Freedom Finance Logo" },
    { logo: "https://via.placeholder.com/200x100/006442/FFFFFF?text=AFRY", name: "AFRY", alt: "AFRY Logo" },
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-8">
        <div className="pl-8 mb-16">
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
                className="flex items-center justify-center p-8 bg-white transition-all group"
              >
                <img
                  src={partner.logo}
                  alt={partner.alt}
                  className="w-full h-auto max-h-20 object-contain transition-all duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}