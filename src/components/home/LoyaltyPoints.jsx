import { motion } from 'framer-motion';
import { Gift, Star, Percent, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function LoyaltyPoints() {
  const { t } = useLanguage();

  return (
    <section className="section-padding bg-white dark:bg-surface-900" id="loyalty-section">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 p-8 md:p-12"
        >
          {/* Decorative */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24" />
          <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-accent-500/10 rounded-full" />

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white/90 text-sm mb-4">
                <Gift className="w-4 h-4" />
                Rewards Program
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 font-[var(--font-heading)]">
                {t('loyaltyTitle')}
              </h2>
              <p className="text-primary-100 mb-6">{t('loyaltySubtitle')}</p>

              <div className="space-y-3 mb-8">
                {[
                  { icon: Star, text: t('loyaltyEarn') },
                  { icon: Percent, text: t('loyaltyRedeem') },
                  { icon: Gift, text: t('loyaltyExclusive') },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-white/90">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                      <item.icon className="w-4 h-4" />
                    </div>
                    <span className="text-sm">{item.text}</span>
                  </div>
                ))}
              </div>

              <button className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white text-primary-700 font-bold text-sm hover:bg-primary-50 hover:shadow-xl transition-all hover:-translate-y-1">
                {t('loyaltyJoin')}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Points Illustration */}
            <div className="shrink-0">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="w-48 h-48 md:w-56 md:h-56 rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20 flex flex-col items-center justify-center"
              >
                <Gift className="w-16 h-16 text-accent-400 mb-3" />
                <p className="text-3xl font-black text-white">2x</p>
                <p className="text-sm text-white/70">Points This Week!</p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
