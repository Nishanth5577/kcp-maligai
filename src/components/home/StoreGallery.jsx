import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import SectionHeading from '../ui/SectionHeading';

const galleryImages = [
  {
    url: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=600&h=400&fit=crop',
    caption: 'Store Front View',
    captionTamil: 'கடை முகப்புத் தோற்றம்',
  },
  {
    url: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&h=400&fit=crop',
    caption: 'Fresh Produce Section',
    captionTamil: 'புதிய காய்கறிகள் பிரிவு',
  },
  {
    url: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=600&h=400&fit=crop',
    caption: 'Well-Stocked Shelves',
    captionTamil: 'நிறைந்த மளிகைப் பொருட்கள்',
  },
  {
    url: 'https://images.unsplash.com/photo-1579113800032-c38bd7635818?w=600&h=400&fit=crop',
    caption: 'Fruits & Vegetables',
    captionTamil: 'பழங்கள் மற்றும் காய்கறிகள்',
  },
  {
    url: 'https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=600&h=400&fit=crop',
    caption: 'Spices & Essentials',
    captionTamil: 'மசாலா மற்றும் அத்தியாவசிய பொருட்கள்',
  },
  {
    url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop',
    caption: 'Dairy Corner',
    captionTamil: 'பால் பொருட்கள் பகுதி',
  },
];

export default function StoreGallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const { lang } = useLanguage();

  const openLightbox = (index) => {
    setActiveIndex(index);
    setLightboxOpen(true);
  };

  const navigate = (direction) => {
    setActiveIndex(prev => {
      const next = prev + direction;
      if (next < 0) return galleryImages.length - 1;
      if (next >= galleryImages.length) return 0;
      return next;
    });
  };

  return (
    <section className="section-padding bg-surface-50 dark:bg-surface-950" id="store-gallery">
      <div className="container-custom">
        <SectionHeading
          title={lang === 'ta' ? 'எங்கள் கடை' : 'Our Store'}
          subtitle={lang === 'ta' ? 'KCP மளிகையின் உள்ளே ஒரு பார்வை' : 'Take a look inside KCP Maligai'}
        />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {galleryImages.map((img, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={() => openLightbox(i)}
              className={`relative group rounded-2xl overflow-hidden ${
                i === 0 ? 'md:col-span-2 md:row-span-2' : ''
              }`}
            >
              <img
                src={img.url}
                alt={lang === 'ta' ? img.captionTamil : img.caption}
                className={`w-full object-cover transition-transform duration-500 group-hover:scale-110 ${
                  i === 0 ? 'h-48 md:h-full' : 'h-32 md:h-48'
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <div className="flex items-center gap-2 text-white">
                  <Camera className="w-4 h-4" />
                  <span className="text-xs font-medium">
                    {lang === 'ta' ? img.captionTamil : img.caption}
                  </span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); navigate(-1); }}
              className="absolute left-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="max-w-3xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={galleryImages[activeIndex].url}
                alt={lang === 'ta' ? galleryImages[activeIndex].captionTamil : galleryImages[activeIndex].caption}
                className="w-full rounded-2xl object-contain max-h-[70vh]"
              />
              <p className="text-center text-white/70 text-sm mt-4 font-medium">
                {lang === 'ta' ? galleryImages[activeIndex].captionTamil : galleryImages[activeIndex].caption}
              </p>
              <p className="text-center text-white/30 text-xs mt-1">
                {activeIndex + 1} / {galleryImages.length}
              </p>
            </motion.div>

            <button
              onClick={(e) => { e.stopPropagation(); navigate(1); }}
              className="absolute right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
