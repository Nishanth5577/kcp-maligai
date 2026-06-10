import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useProduct } from '../../context/ProductContext';
import SectionHeading from '../ui/SectionHeading';
import ProductCard from '../ui/ProductCard';

export default function TodaysOffers() {
  const { t } = useLanguage();
  const { products } = useProduct();
  const offerProducts = products.filter(p => p.isOffer).slice(0, 4);

  // Countdown timer calculation - resets daily
  const calculateTimeLeft = () => {
    const now = new Date();
    const endOfDay = new Date(now);
    endOfDay.setHours(23, 59, 59, 999);
    const diff = endOfDay - now;
    return {
      hours: Math.max(0, Math.floor(diff / (1000 * 60 * 60))),
      minutes: Math.max(0, Math.floor((diff / (1000 * 60)) % 60)),
      seconds: Math.max(0, Math.floor((diff / 1000) % 60)),
    };
  };

  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="section-padding bg-surface-50 dark:bg-surface-950" id="offers-section">
      <div className="container-custom">
        <SectionHeading title={t('offersTitle')} subtitle={t('offersSubtitle')} />

        {/* Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex justify-center mb-10"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-red-500/10 to-accent-500/10 border border-red-200 dark:border-red-500/20">
            <Clock className="w-5 h-5 text-red-500" />
            <span className="text-sm font-medium text-surface-600 dark:text-surface-400">{t('hurry')}</span>
            <div className="flex gap-1.5">
              {[
                { value: String(timeLeft.hours).padStart(2, '0'), label: 'h' },
                { value: String(timeLeft.minutes).padStart(2, '0'), label: 'm' },
                { value: String(timeLeft.seconds).padStart(2, '0'), label: 's' },
              ].map((t, i) => (
                <div key={i} className="flex items-center gap-0.5">
                  <span className="w-9 h-9 rounded-lg bg-red-500 text-white font-bold text-sm flex items-center justify-center font-mono">
                    {t.value}
                  </span>
                  <span className="text-xs text-surface-400">{t.label}</span>
                  {i < 2 && <span className="text-red-400 font-bold mx-0.5">:</span>}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {offerProducts.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        {/* View All */}
        <div className="text-center mt-8">
          <Link to="/products?filter=offers" className="btn-secondary text-sm">
            {t('viewAllOffers')}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
