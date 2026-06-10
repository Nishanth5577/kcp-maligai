import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { useProduct } from '../../context/ProductContext';
import SectionHeading from '../ui/SectionHeading';

export default function CategoriesSection() {
  const { t, lang } = useLanguage();
  const { categories } = useProduct();

  return (
    <section className="section-padding bg-white dark:bg-surface-900" id="categories-section">
      <div className="container-custom">
        <SectionHeading title={t('categoriesTitle')} subtitle={t('categoriesSubtitle')} />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                to={`/products?category=${encodeURIComponent(cat.name)}`}
                className="group flex flex-col items-center p-5 rounded-2xl bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 hover:border-primary-300 dark:hover:border-primary-600 hover:shadow-lg hover:shadow-primary-500/10 transition-all hover:-translate-y-1"
              >
                <span className="text-4xl mb-3 group-hover:scale-110 transition-transform">{cat.icon}</span>
                <span className="text-sm font-medium text-surface-700 dark:text-surface-300 text-center leading-tight">
                  {lang === 'ta' ? cat.nameTamil : cat.name}
                </span>
                <span className="text-xs text-surface-400 mt-1">{cat.count} items</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
