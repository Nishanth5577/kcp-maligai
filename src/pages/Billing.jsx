import { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Barcode, Plus, Receipt, ArrowLeft, RotateCcw, Store, X, User, Phone
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { BillingProvider, useBilling } from '../context/BillingContext';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useProduct } from '../context/ProductContext';
import BillItemRow from '../components/billing/BillItemRow';
import InvoiceModal from '../components/billing/InvoiceModal';

function BillingContent() {
  const {
    items, customer, discount, discountType,
    subtotal, discountAmount, gstAmount, gstRate, grandTotal, totalItems,
    addItem, removeItem, updateQuantity,
    setCustomer, setDiscount, setDiscountType, clearBill,
    generateInvoice, currentInvoice, showInvoice, closeInvoice
  } = useBilling();

  const { t, lang } = useLanguage();
  const { isDark, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [barcodeInput, setBarcodeInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showProductPanel, setShowProductPanel] = useState(true);
  const barcodeRef = useRef(null);
  const searchRef = useRef(null);

  // Load products from context
  const { products: allProducts } = useProduct();

  const categories = useMemo(() => {
    const cats = [...new Set(allProducts.map(p => p.category))];
    return cats.sort();
  }, [allProducts]);

  const filteredProducts = useMemo(() => {
    let result = allProducts;
    if (selectedCategory) {
      result = result.filter(p => p.category === selectedCategory);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        (p.nameTamil && p.nameTamil.toLowerCase().includes(q)) ||
        (p.barcode && p.barcode.toLowerCase().includes(q)) ||
        p.category.toLowerCase().includes(q)
      );
    }
    return result;
  }, [allProducts, searchQuery, selectedCategory]);

  const handleBarcodeSubmit = (e) => {
    if (e.key === 'Enter' && barcodeInput.trim()) {
      const product = allProducts.find(p =>
        p.barcode && p.barcode.toLowerCase() === barcodeInput.trim().toLowerCase()
      );
      if (product) {
        addItem(product);
        setBarcodeInput('');
      }
    }
  };

  const handleGenerateInvoice = () => {
    if (items.length === 0) return;
    generateInvoice();
  };

  // Focus barcode input on mount
  useEffect(() => {
    if (barcodeRef.current) barcodeRef.current.focus();
  }, []);

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
    <div className="min-h-screen bg-surface-50 dark:bg-surface-950">
      {/* Top Bar */}
      <div className="bg-white dark:bg-surface-900 border-b border-surface-200 dark:border-surface-800 sticky top-0 z-40">
        <div className="max-w-[1600px] mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                <Store className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-bold gradient-text font-[var(--font-heading)] hidden sm:block">KCP Maligai</span>
            </Link>
            <div className="w-px h-6 bg-surface-200 dark:bg-surface-700" />
            <h1 className="text-sm font-bold text-surface-800 dark:text-white flex items-center gap-2">
              <Receipt className="w-4 h-4 text-primary-500" />
              <span className="hidden sm:inline">{t('billingSystem')}</span>
              <span className="sm:hidden">POS</span>
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowProductPanel(!showProductPanel)}
              className="p-2 rounded-lg text-xs font-medium bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors lg:hidden"
            >
              {showProductPanel 
                ? (lang === 'ta' ? 'பில் காட்டு' : 'Show Bill') 
                : (lang === 'ta' ? 'பொருட்களைச் சேர்' : 'Add Items')
              }
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-surface-500 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
            >
              {isDark ? '☀️' : '🌙'}
            </button>
            <Link to="/" className="p-2 rounded-lg text-surface-500 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto p-4">
        <div className="grid lg:grid-cols-5 gap-4 h-[calc(100vh-80px)]">
          {/* Left Panel: Product Search & Selection */}
          <div className={`lg:col-span-2 flex flex-col gap-4 overflow-hidden ${showProductPanel ? '' : 'hidden lg:flex'}`}>
            {/* Barcode & Search */}
            <div className="bg-white dark:bg-surface-900 rounded-2xl border border-surface-200 dark:border-surface-800 p-4 space-y-3">
              {/* Barcode Input */}
              <div className="relative">
                <Barcode className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-500" />
                <input
                  ref={barcodeRef}
                  type="text"
                  value={barcodeInput}
                  onChange={(e) => setBarcodeInput(e.target.value.toUpperCase())}
                  onKeyDown={handleBarcodeSubmit}
                  placeholder={t('barcodePlaceholder')}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-primary-50 dark:bg-primary-500/10 border-2 border-primary-200 dark:border-primary-500/30 text-surface-800 dark:text-white placeholder-surface-400 font-mono text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all uppercase tracking-wider"
                  id="barcode-input"
                />
              </div>

              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
                <input
                  ref={searchRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('searchPlaceholder')}
                  className="w-full pl-10 pr-8 py-2.5 rounded-xl bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 text-surface-800 dark:text-white placeholder-surface-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all"
                  id="product-search"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2">
                    <X className="w-3.5 h-3.5 text-surface-400" />
                  </button>
                )}
              </div>

              {/* Category Chips */}
              <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
                <button
                  onClick={() => setSelectedCategory('')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                    !selectedCategory ? 'gradient-primary text-white' : 'bg-surface-100 dark:bg-surface-800 text-surface-500 hover:bg-surface-200 dark:hover:bg-surface-700'
                  }`}
                >
                  {t('all')}
                </button>
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(selectedCategory === cat ? '' : cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                      selectedCategory === cat ? 'gradient-primary text-white' : 'bg-surface-100 dark:bg-surface-800 text-surface-500 hover:bg-surface-200 dark:hover:bg-surface-700'
                    }`}
                  >
                    {getCategoryName(cat)}
                  </button>
                ))}
              </div>
            </div>

            {/* Product Grid */}
            <div className="flex-1 overflow-y-auto bg-white dark:bg-surface-900 rounded-2xl border border-surface-200 dark:border-surface-800 p-3">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {filteredProducts.map(product => (
                  <motion.button
                    key={product.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => addItem(product)}
                    className="p-3 rounded-xl border border-surface-100 dark:border-surface-800 hover:border-primary-300 dark:hover:border-primary-500/30 hover:bg-primary-50/50 dark:hover:bg-primary-500/5 text-left transition-all group"
                  >
                    <img
                      src={product.image}
                      alt={lang === 'ta' && product.nameTamil ? product.nameTamil : product.name}
                      className="w-full h-16 rounded-lg object-cover mb-2"
                    />
                    <p className="text-xs font-semibold text-surface-800 dark:text-white truncate">
                      {lang === 'ta' && product.nameTamil ? product.nameTamil : product.name}
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs font-bold text-primary-600 dark:text-primary-400">₹{product.price}</span>
                      <span className="text-[9px] text-surface-400">{product.unit}</span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-[9px] font-mono text-surface-400">{product.barcode}</span>
                      <div className="w-5 h-5 rounded-md bg-primary-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Plus className="w-3 h-3 text-white" />
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
              {filteredProducts.length === 0 && (
                <div className="text-center py-10">
                  <p className="text-sm text-surface-400">{t('noProducts')}</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Panel: Bill */}
          <div className={`lg:col-span-3 flex flex-col gap-4 overflow-hidden ${!showProductPanel ? '' : 'hidden lg:flex'}`}>
            {/* Customer Info & Discount */}
            <div className="bg-white dark:bg-surface-900 rounded-2xl border border-surface-200 dark:border-surface-800 p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
                  <input
                    type="text"
                    value={customer.name}
                    onChange={(e) => setCustomer({ name: e.target.value })}
                    placeholder={t('customerName')}
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 text-sm text-surface-800 dark:text-white placeholder-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all"
                    id="customer-name"
                  />
                </div>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
                  <input
                    type="tel"
                    value={customer.mobile}
                    onChange={(e) => setCustomer({ mobile: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                    placeholder={t('customerMobile')}
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 text-sm text-surface-800 dark:text-white placeholder-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all font-mono"
                    id="customer-mobile"
                  />
                </div>
                <div className="relative flex gap-1">
                  <input
                    type="number"
                    value={discount || ''}
                    onChange={(e) => setDiscount(e.target.value)}
                    placeholder={t('discountLabel')}
                    min="0"
                    className="flex-1 pl-3 pr-3 py-2.5 rounded-l-xl bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 text-sm text-surface-800 dark:text-white placeholder-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all"
                    id="discount-input"
                  />
                  <button
                    onClick={() => setDiscountType(discountType === 'percent' ? 'flat' : 'percent')}
                    className="px-3 py-2.5 rounded-r-xl bg-surface-100 dark:bg-surface-700 border border-l-0 border-surface-200 dark:border-surface-600 text-surface-600 dark:text-surface-300 hover:bg-primary-100 dark:hover:bg-primary-500/20 transition-colors"
                    title={discountType === 'percent' ? (lang === 'ta' ? 'நிலையான தொகைக்கு மாறவும்' : 'Switch to flat amount') : (lang === 'ta' ? 'சதவீதத்திற்கு மாறவும்' : 'Switch to percentage')}
                  >
                    {discountType === 'percent' ? ' % ' : <span className="text-sm font-bold">₹</span>}
                  </button>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={clearBill}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/20 text-xs font-semibold hover:bg-red-100 dark:hover:bg-red-500/20 transition-colors"
                    title={lang === 'ta' ? 'பில்லை நீக்குக' : 'Clear Bill'}
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    {t('clearBtn')}
                  </button>
                  <button
                    onClick={handleGenerateInvoice}
                    disabled={items.length === 0}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl gradient-primary text-white text-xs font-bold hover:shadow-lg hover:shadow-primary-500/20 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <Receipt className="w-3.5 h-3.5" />
                    {t('invoiceBtn')}
                  </button>
                </div>
              </div>
            </div>

            {/* Bill Items Table */}
            <div className="flex-1 overflow-hidden bg-white dark:bg-surface-900 rounded-2xl border border-surface-200 dark:border-surface-800 flex flex-col">
              {items.length > 0 ? (
                <>
                  <div className="flex-1 overflow-y-auto">
                    <table className="w-full">
                      <thead className="sticky top-0 bg-surface-50 dark:bg-surface-800/80 backdrop-blur-sm z-10">
                        <tr>
                          <th className="py-3 px-3 text-left text-[10px] font-bold text-surface-400 uppercase tracking-wider">{t('hash')}</th>
                          <th className="py-3 px-3 text-left text-[10px] font-bold text-surface-400 uppercase tracking-wider">{t('productCol')}</th>
                          <th className="py-3 px-3 text-left text-[10px] font-bold text-surface-400 uppercase tracking-wider">{t('priceCol')}</th>
                          <th className="py-3 px-3 text-left text-[10px] font-bold text-surface-400 uppercase tracking-wider">{t('qtyCol')}</th>
                          <th className="py-3 px-3 text-left text-[10px] font-bold text-surface-400 uppercase tracking-wider">{t('totalCol')}</th>
                          <th className="py-3 px-3 w-12"></th>
                        </tr>
                      </thead>
                      <tbody>
                        <AnimatePresence>
                          {items.map((item, i) => (
                            <BillItemRow
                              key={item.id}
                              item={item}
                              index={i}
                              onUpdateQuantity={updateQuantity}
                              onRemove={removeItem}
                            />
                          ))}
                        </AnimatePresence>
                      </tbody>
                    </table>
                  </div>

                  {/* Bill Summary */}
                  <div className="border-t-2 border-dashed border-surface-200 dark:border-surface-700 p-4 space-y-2 bg-surface-50/50 dark:bg-surface-800/30">
                    <div className="flex justify-between text-sm text-surface-600 dark:text-surface-400">
                      <span>{t('subtotal')} ({totalItems} {t('items')})</span>
                      <span className="font-mono font-semibold">₹{subtotal.toFixed(2)}</span>
                    </div>
                    {discountAmount > 0 && (
                      <div className="flex justify-between text-sm text-green-600 dark:text-green-400">
                        <span>{t('discount')} ({discountType === 'percent' ? `${discount}%` : `₹${discount}`})</span>
                        <span className="font-mono font-semibold">-₹{discountAmount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm text-surface-600 dark:text-surface-400">
                      <span>{t('gst')} ({gstRate}%)</span>
                      <span className="font-mono font-semibold">₹{gstAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t-2 border-primary-500">
                      <span className="text-lg font-black text-surface-800 dark:text-white">{t('grandTotal')}</span>
                      <span className="text-lg font-black text-primary-600 dark:text-primary-400 font-mono">₹{grandTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center py-20">
                  <motion.div
                    animate={{ y: [-5, 5, -5] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="text-6xl mb-4"
                  >
                    🛒
                  </motion.div>
                  <h3 className="text-lg font-bold text-surface-400 dark:text-surface-500 mb-1">{t('noItemsTitle')}</h3>
                  <p className="text-xs text-surface-400">{t('noItemsDesc')}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Invoice Modal */}
      {showInvoice && (
        <InvoiceModal invoice={currentInvoice} onClose={closeInvoice} />
      )}
    </div>
  );
}

export default function Billing() {
  return (
    <BillingProvider>
      <BillingContent />
    </BillingProvider>
  );
}
