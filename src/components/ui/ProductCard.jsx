import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Check, Eye } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function ProductCard({ product, index = 0 }) {
  const [added, setAdded] = useState(false);
  const { t, lang } = useLanguage();

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleViewProduct = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group bg-white dark:bg-surface-800 rounded-2xl border border-surface-200 dark:border-surface-700 overflow-hidden card-hover"
    >
      {/* Image */}
      <div className="relative img-zoom aspect-square bg-surface-100 dark:bg-surface-700">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {discount > 0 && (
            <span className="px-2 py-0.5 rounded-lg bg-red-500 text-white text-[11px] font-bold shadow-sm">
              {discount}% {t('off')}
            </span>
          )}
          {product.isNewArrival && (
            <span className="px-2 py-0.5 rounded-lg bg-primary-500 text-white text-[11px] font-bold shadow-sm">
              {t('newBadge')}
            </span>
          )}
          {product.isBestSeller && (
            <span className="px-2 py-0.5 rounded-lg bg-accent-500 text-white text-[11px] font-bold shadow-sm">
              ⭐ Best
            </span>
          )}
        </div>

        {/* Stock indicator */}
        {product.stock !== undefined && product.stock <= 10 && (
          <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded-lg bg-red-500/90 text-white text-[10px] font-bold">
            Low Stock
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-xs text-primary-600 dark:text-primary-400 font-medium mb-1">{product.category}</p>
        <h3 className="font-semibold text-surface-800 dark:text-white text-sm leading-snug mb-0.5">
          {lang === 'ta' ? product.nameTamil : product.name}
        </h3>
        <p className="text-xs text-surface-400 mb-2">{product.unit}</p>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-surface-300 dark:text-surface-600'}`}
              />
            ))}
          </div>
          <span className="text-xs text-surface-400">{product.rating}</span>
        </div>

        {/* Price & Action */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-surface-800 dark:text-white">₹{product.price}</span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-surface-400 line-through">₹{product.originalPrice}</span>
            )}
          </div>
          <button
            onClick={handleViewProduct}
            disabled={added}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
              added
                ? 'bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400'
                : 'gradient-primary text-white hover:shadow-md hover:shadow-primary-500/30 hover:-translate-y-0.5'
            }`}
          >
            {added ? (
              <>
                <Check className="w-3.5 h-3.5" />
                Available
              </>
            ) : (
              <>
                <Eye className="w-3.5 h-3.5" />
                View
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
