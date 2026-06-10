import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, X, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useProduct } from '../context/ProductContext';
import ProductCard from '../components/ui/ProductCard';
import SectionHeading from '../components/ui/SectionHeading';

export default function Products() {
  const { t, lang } = useLanguage();
  const { products, categories } = useProduct();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [sortBy, setSortBy] = useState('');

  const [prevSearch, setPrevSearch] = useState(searchParams.get('search') || '');
  const [prevCategory, setPrevCategory] = useState(searchParams.get('category') || '');

  // Synchronize state with URL search parameters during rendering
  const currentSearch = searchParams.get('search') || '';
  if (currentSearch !== prevSearch) {
    setPrevSearch(currentSearch);
    setSearchQuery(currentSearch);
  }

  const currentCategory = searchParams.get('category') || '';
  if (currentCategory !== prevCategory) {
    setPrevCategory(currentCategory);
    setSelectedCategory(currentCategory);
  }

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by category
    if (selectedCategory) {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.nameTamil.includes(query) ||
        p.category.toLowerCase().includes(query)
      );
    }

    // Filter by offers (from URL)
    if (searchParams.get('filter') === 'offers') {
      result = result.filter(p => p.isOffer);
    }

    // Sort
    switch (sortBy) {
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return result;
  }, [searchQuery, selectedCategory, sortBy, searchParams]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSortBy('');
    setSearchParams({});
  };

  const hasActiveFilters = searchQuery || selectedCategory || sortBy;

  return (
    <div className="page-transition pb-16">
      {/* Spacer for fixed navbar */}
      <div className="h-16 md:h-20" />

      {/* Sticky Filter Bar — sticks right below the fixed navbar */}
      <div className="sticky top-16 md:top-20 z-40 bg-white/95 dark:bg-surface-900/95 backdrop-blur-md border-b border-surface-200 dark:border-surface-800 shadow-sm">
        <div className="container-custom py-3">
          {/* Search & Filter Row */}
          <div className="flex flex-col sm:flex-row gap-2 mb-2">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('search')}
                className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 text-surface-800 dark:text-surface-200 placeholder-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all text-sm"
                id="products-search"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-surface-200 dark:hover:bg-surface-700"
                >
                  <X className="w-3.5 h-3.5 text-surface-400" />
                </button>
              )}
            </div>

            {/* Category Select */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="appearance-none w-full sm:w-44 px-4 py-2.5 pr-10 rounded-xl bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 text-surface-800 dark:text-surface-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50 cursor-pointer"
                id="category-filter"
              >
                <option value="">{t('allCategories')}</option>
                {categories.map(cat => (
                  <option key={cat.name} value={cat.name}>
                    {lang === 'ta' ? cat.nameTamil : cat.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400 pointer-events-none" />
            </div>

            {/* Sort Select */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none w-full sm:w-44 px-4 py-2.5 pr-10 rounded-xl bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 text-surface-800 dark:text-surface-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50 cursor-pointer"
                id="sort-select"
              >
                <option value="">{t('sortBy')}</option>
                <option value="name-asc">{t('nameAZ')}</option>
                <option value="name-desc">{t('nameZA')}</option>
                <option value="price-asc">{t('priceLowHigh')}</option>
                <option value="price-desc">{t('priceHighLow')}</option>
                <option value="rating">{t('ratingHighLow')}</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400 pointer-events-none" />
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="px-4 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 border border-red-200 dark:border-red-500/20 transition-colors"
              >
                {t('clearAll')}
              </button>
            )}
          </div>

          {/* Category Chips Row */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setSelectedCategory('')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                !selectedCategory
                  ? 'gradient-primary text-white shadow-md'
                  : 'bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-700'
              }`}
            >
              {t('allCategories')}
            </button>
            {categories.map(cat => (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name === selectedCategory ? '' : cat.name)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1 ${
                  selectedCategory === cat.name
                    ? 'gradient-primary text-white shadow-md'
                    : 'bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-700'
                }`}
              >
                <span>{cat.icon}</span>
                {lang === 'ta' ? cat.nameTamil : cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Page Content */}
      <div className="container-custom pt-6">
        {/* Header */}
        <SectionHeading
          title={t('allProducts')}
          subtitle={`${t('showingProducts')} ${filteredProducts.length} ${t('of')} ${products.length} ${t('productsText')}`}
        />

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filteredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-surface-700 dark:text-surface-300 mb-2">{t('noProducts')}</h3>
            <p className="text-surface-500 text-sm mb-6">
              {lang === 'ta' ? 'உங்கள் தேடல் அல்லது வடிகட்டி அளவுகோல்களை மாற்ற முயற்சிக்கவும்.' : 'Try adjusting your search or filter criteria.'}
            </p>
            <button onClick={clearFilters} className="btn-primary text-sm">
              {t('clearAll')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
