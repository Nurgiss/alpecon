import { useGroupSectionImage } from '@/contexts/SectionImagesContext';

export function AboutSectionGallery() {
  const grid1 = useGroupSectionImage('aboutSection', 'grid1');
  const grid2 = useGroupSectionImage('aboutSection', 'grid2');
  const grid3 = useGroupSectionImage('aboutSection', 'grid3');
  const grid4 = useGroupSectionImage('aboutSection', 'grid4');

  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-6">
      <div className="space-y-4 sm:space-y-6">
        <div className="overflow-hidden rounded-md shadow-lg">
          <img
            src={grid1}
            alt="Apple Orchard"
            className="w-full h-64 sm:h-72 object-cover transition-all duration-500"
          />
        </div>
        <div className="overflow-hidden rounded-md shadow-lg">
          <img
            src={grid2}
            alt="Fresh Fruits"
            className="w-full h-48 sm:h-56 object-cover transition-all duration-500"
          />
        </div>
      </div>
      <div className="space-y-4 sm:space-y-6 pt-8 sm:pt-12">
        <div className="overflow-hidden rounded-md shadow-lg">
          <img
            src={grid3}
            alt="Solar Panels"
            className="w-full h-48 sm:h-56 object-cover"
          />
        </div>
        <div className="overflow-hidden rounded-md shadow-lg">
          <img
            src={grid4}
            alt="Greenhouse"
            className="w-full h-64 sm:h-72 object-cover"
          />
        </div>
      </div>
    </div>
  );
}
