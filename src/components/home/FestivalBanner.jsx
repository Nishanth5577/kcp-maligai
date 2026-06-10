import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function FestivalBanner() {
  const { lang } = useLanguage();

  // Determine current festival/season
  const now = new Date();
  const month = now.getMonth();

  let festival = {
    name: lang === 'ta' ? 'சிறப்பு சலுகைகள்' : 'Special Offers',
    emoji: '🎉',
    tagline: lang === 'ta' ? 'மளிகைப் பொருட்களில் அற்புதமான சலுகைகளைப் பெறுங்கள்!' : 'Grab exciting deals on groceries!'
  };

  if (month === 0) {
    festival = {
      name: lang === 'ta' ? 'பொங்கல் பண்டிகை' : 'Pongal Festival',
      emoji: '🪔',
      tagline: lang === 'ta' ? 'KCP மளிகையின் புதிய பொருட்களுடன் பொங்கல் திருநாளைக் கொண்டாடுங்கள்!' : 'Celebrate Pongal with fresh ingredients from KCP Maligai!'
    };
  } else if (month === 3 || month === 4) {
    festival = {
      name: lang === 'ta' ? 'தமிழ் புத்தாண்டு சலுகைகள்' : 'Tamil New Year',
      emoji: '🌸',
      tagline: lang === 'ta' ? 'புதிய மளிகைப் பொருட்களுடன் புத்தாண்டைத் தொடங்குங்கள்!' : 'Start the new year with the freshest groceries!'
    };
  } else if (month === 9 || month === 10) {
    festival = {
      name: lang === 'ta' ? 'தீபாவளி சிறப்பு சலுகைகள்' : 'Diwali Offers',
      emoji: '✨',
      tagline: lang === 'ta' ? 'பண்டிகை சலுகைகளுடன் உங்கள் சமையலறையை ஒளிரச் செய்யுங்கள்!' : 'Light up your kitchen with festive deals!'
    };
  } else if (month === 7 || month === 8) {
    festival = {
      name: lang === 'ta' ? 'விநாயகர் சதுர்த்தி சலுகைகள்' : 'Ganesh Chaturthi',
      emoji: '🐘',
      tagline: lang === 'ta' ? 'இனிப்புகள் மற்றும் சிறப்புப் பொருட்களுடன் கொண்டாடுங்கள்!' : 'Celebrate with sweets and special ingredients!'
    };
  } else if (month === 11) {
    festival = {
      name: lang === 'ta' ? 'ஆண்டின் இறுதி விற்பனை' : 'Year End Sale',
      emoji: '🎄',
      tagline: lang === 'ta' ? 'அபூர்வமான மளிகை சேமிப்புடன் ஆண்டை நிறைவு செய்யுங்கள்!' : 'End the year with amazing grocery savings!'
    };
  }

  return (
    <section className="section-padding bg-white dark:bg-surface-900">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-accent-500 via-accent-600 to-primary-600 p-8 md:p-12"
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-3xl" />
          <motion.div
            animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute top-4 right-8 text-5xl md:text-7xl opacity-20"
          >
            {festival.emoji}
          </motion.div>
          <motion.div
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute bottom-4 right-24 text-4xl opacity-15"
          >
            🎁
          </motion.div>

          <div className="relative z-10 max-w-lg">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-bold mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              {lang === 'ta' ? 'குறிப்பிட்ட கால சலுகைகள்' : 'Limited Time Offers'}
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-3 font-[var(--font-heading)]">
              {festival.emoji} {festival.name}
            </h2>
            <p className="text-white/80 text-sm md:text-base mb-6">
              {festival.tagline}
            </p>
            <div className="flex flex-wrap gap-3">
              <div className="px-5 py-2.5 rounded-xl bg-white text-accent-700 font-bold text-sm hover:shadow-xl transition-all cursor-default">
                {lang === 'ta' ? '30% வரை தள்ளுபடி' : 'Up to 30% OFF'}
              </div>
              <div className="px-5 py-2.5 rounded-xl bg-white/15 backdrop-blur-sm text-white font-bold text-sm border border-white/20 cursor-default">
                {lang === 'ta' ? 'இன்றே கடைக்கு வாருங்கள்' : 'Visit Store Today'}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
