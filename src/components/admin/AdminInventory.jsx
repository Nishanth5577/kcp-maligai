import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Plus, Minus, Warehouse } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useProduct } from '../../context/ProductContext';

export default function AdminInventory() {
  const { products, saveProducts } = useProduct();

  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'low', 'ok'
  const [threshold] = useState(10);
  const { t, lang } = useLanguage();

  const updateStock = (id, delta) => {
    const updated = products.map(p =>
      p.id === id ? { ...p, stock: Math.max(0, (p.stock || 0) + delta) } : p
    );
    saveProducts(updated);
  };

  const setStock = (id, value) => {
    const updated = products.map(p =>
      p.id === id ? { ...p, stock: Math.max(0, parseInt(value) || 0) } : p
    );
    saveProducts(updated);
  };

  const filtered = useMemo(() => {
    let result = products;
    if (filter === 'low') result = result.filter(p => (p.stock || 0) <= threshold);
    if (filter === 'ok') result = result.filter(p => (p.stock || 0) > threshold);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) || 
        (p.nameTamil && p.nameTamil.toLowerCase().includes(q)) ||
        (p.barcode || '').toLowerCase().includes(q)
      );
    }
    return result.sort((a, b) => (a.stock || 0) - (b.stock || 0));
  }, [products, searchQuery, filter, threshold]);

  const lowStockCount = products.filter(p => (p.stock || 0) <= threshold).length;
  const totalStock = products.reduce((sum, p) => sum + (p.stock || 0), 0);

  const getCategoryName = (cat) => {
    if (lang !== 'ta') return cat;
    const mapping = {
      'Rice & Grains': 'தானியங்கள் & அரிசி',
      'Pulses & Dal': 'பருப்பு வகைகள்',
      'Fruits & Vegetables': 'பழங்கள் & காய்கறிகள்',
      'Dairy Products': 'பால் பொருட்கள்',
      'Snacks': 'சிற்றுண்டிகள்',
      'Beverages': 'பானங்கள்',
      'Household Products': 'வீட்டு உபயோக பொருட்கள்',
      'Personal Care': 'தனிநபர் பராமரிப்பு'
    };
    return mapping[cat] || cat;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-surface-800 dark:text-white font-[var(--font-heading)]">
          {t('sidebarInventory')}
        </h1>
        <p className="text-sm text-surface-500">
          {lang === 'ta' 
            ? `${products.length} பொருட்களில் மொத்தம் ${totalStock} அலகுகள் உள்ளன` 
            : `${totalStock} total units across ${products.length} products`}
        </p>
      </div>

      {/* Alert Banner */}
      {lowStockCount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-2xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5 text-red-500" />
          </div>
          <div>
            <p className="text-sm font-bold text-red-800 dark:text-red-400">
              {lang === 'ta' 
                ? `${lowStockCount} பொருட்கள் குறைந்த இருப்பில் உள்ளன!` 
                : `${lowStockCount} products have low stock!`}
            </p>
            <p className="text-xs text-red-600 dark:text-red-300">
              {lang === 'ta'
                ? `${threshold} அல்லது அதற்கும் குறைவான அலகுகள் உள்ள பொருட்கள் இருப்பை நிரப்ப வேண்டும்.`
                : `Products with ${threshold} or fewer units need restocking.`}
            </p>
          </div>
        </motion.div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder={t('searchPlaceholder')}
            className="w-full pl-4 pr-4 py-2.5 rounded-xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50 text-surface-800 dark:text-white"
          />
        </div>
        <div className="flex bg-surface-100 dark:bg-surface-800 rounded-xl p-1">
          {[
            { key: 'all', label: lang === 'ta' ? `அனைத்தும் (${products.length})` : `All (${products.length})` },
            { key: 'low', label: lang === 'ta' ? `குறைந்த இருப்பு (${lowStockCount})` : `Low Stock (${lowStockCount})` },
            { key: 'ok', label: lang === 'ta' ? 'இருப்பில் உள்ளவை' : 'In Stock' },
          ].map(f => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                filter === f.key ? 'bg-white dark:bg-surface-700 text-primary-600 shadow-sm' : 'text-surface-400'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Inventory Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((product, i) => {
          const isLow = (product.stock || 0) <= threshold;
          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className={`p-4 rounded-2xl bg-white dark:bg-surface-800 border ${
                isLow ? 'border-red-200 dark:border-red-500/20' : 'border-surface-200 dark:border-surface-700'
              } card-hover`}
            >
              <div className="flex items-start gap-3 mb-3">
                <img src={product.image} alt={lang === 'ta' && product.nameTamil ? product.nameTamil : product.name} className="w-12 h-12 rounded-xl object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-surface-800 dark:text-white truncate">
                    {lang === 'ta' && product.nameTamil ? product.nameTamil : product.name}
                  </p>
                  <p className="text-[10px] text-surface-400">{getCategoryName(product.category)}</p>
                  <p className="text-[10px] font-mono text-surface-400">{product.barcode || '-'}</p>
                </div>
                {isLow && (
                  <span className="px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 text-[10px] font-bold uppercase shrink-0 font-sans">
                    {lang === 'ta' ? 'குறைவு' : 'Low'}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-surface-400">{lang === 'ta' ? 'இருப்பு அளவு' : 'Stock Level'}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      onClick={() => updateStock(product.id, -1)}
                      className="w-7 h-7 rounded-lg bg-surface-100 dark:bg-surface-700 hover:bg-red-100 dark:hover:bg-red-500/20 flex items-center justify-center transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <input
                      type="number"
                      value={product.stock || 0}
                      onChange={e => setStock(product.id, e.target.value)}
                      className={`w-16 h-7 text-center text-sm font-bold rounded-lg border ${
                        isLow ? 'bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/30 text-red-600 dark:text-red-400' : 'bg-surface-50 dark:bg-surface-700 border-surface-200 dark:border-surface-600 text-surface-800 dark:text-white'
                      } focus:outline-none focus:ring-1 focus:ring-primary-500`}
                      min="0"
                    />
                    <button
                      onClick={() => updateStock(product.id, 1)}
                      className="w-7 h-7 rounded-lg bg-surface-100 dark:bg-surface-700 hover:bg-primary-100 dark:hover:bg-primary-500/20 flex items-center justify-center transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => updateStock(product.id, 25)}
                  className="px-3 py-1.5 rounded-lg bg-primary-500/10 text-primary-600 dark:text-primary-400 text-[10px] font-bold hover:bg-primary-500/20 transition-colors"
                >
                  {lang === 'ta' ? '+25 சேர்' : '+25 Restock'}
                </button>
              </div>

              {/* Stock Bar */}
              <div className="mt-3 h-1.5 rounded-full bg-surface-100 dark:bg-surface-700 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${isLow ? 'bg-red-500' : 'bg-primary-500'}`}
                  style={{ width: `${Math.min(100, ((product.stock || 0) / 100) * 100)}%` }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="py-10 text-center">
          <Warehouse className="w-12 h-12 text-surface-300 mx-auto mb-3" />
          <p className="text-sm text-surface-400">
            {lang === 'ta' ? 'உங்கள் தேடலுக்குப் பொருந்தும் பொருட்கள் எதுவும் இல்லை.' : 'No products found matching your criteria.'}
          </p>
        </div>
      )}
    </div>
  );
}
