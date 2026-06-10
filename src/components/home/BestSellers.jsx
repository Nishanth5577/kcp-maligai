import { useLanguage } from '../../context/LanguageContext';
import { useProduct } from '../../context/ProductContext';
import SectionHeading from '../ui/SectionHeading';
import ProductCard from '../ui/ProductCard';

export default function BestSellers() {
  const { t } = useLanguage();
  const { products } = useProduct();
  const bestProducts = products.filter(p => p.isBestSeller).slice(0, 8);

  return (
    <section className="section-padding bg-white dark:bg-surface-900" id="bestsellers-section">
      <div className="container-custom">
        <SectionHeading title={t('bestSellersTitle')} subtitle={t('bestSellersSubtitle')} />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {bestProducts.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
