import { useLanguage } from '../../context/LanguageContext';
import { useProduct } from '../../context/ProductContext';
import SectionHeading from '../ui/SectionHeading';
import ProductCard from '../ui/ProductCard';

export default function FreshArrivals() {
  const { t } = useLanguage();
  const { products } = useProduct();
  const newProducts = products.filter(p => p.isNewArrival);

  return (
    <section className="section-padding bg-surface-50 dark:bg-surface-950" id="fresh-arrivals-section">
      <div className="container-custom">
        <SectionHeading title={t('freshArrivalsTitle')} subtitle={t('freshArrivalsSubtitle')} />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {newProducts.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
