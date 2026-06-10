import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Edit3, Trash2, Save, X, Package, Upload } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useProduct } from '../../context/ProductContext';

const UNIT_OPTIONS = [
  '1 kg', '2 kg', '5 kg', '10 kg', '25 kg',
  '50 g', '100 g', '150 g', '200 g', '250 g', '500 g',
  '100 ml', '200 ml', '250 ml', '500 ml', '1 L', '2 L', '5 L',
  '1 dozen', '1 Packet', '1 Piece', '1 Bundle', '1 Box'
];

const resizeImage = (file, callback) => {
  const reader = new FileReader();
  reader.onload = (event) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const MAX_WIDTH = 250;
      const MAX_HEIGHT = 250;
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
        }
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
      callback(dataUrl);
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(file);
};

export default function AdminProducts() {
  const { t, lang } = useLanguage();
  const { products, categories, saveProducts } = useProduct();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [newProduct, setNewProduct] = useState({
    name: '', nameTamil: '', price: '', originalPrice: '', category: '',
    unit: '', barcode: '', stock: '', image: '', description: ''
  });
  const [showCustomUnit, setShowCustomUnit] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      resizeImage(file, (base64Str) => {
        setNewProduct(prev => ({ ...prev, image: base64Str }));
      });
    }
  };

  const handleEditImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      resizeImage(file, (base64Str) => {
        setEditForm(prev => ({ ...prev, image: base64Str }));
      });
    }
  };

  const filtered = useMemo(() => {
    let result = products;
    if (filterCategory) result = result.filter(p => p.category === filterCategory);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        (p.nameTamil && p.nameTamil.toLowerCase().includes(q)) ||
        (p.barcode || '').toLowerCase().includes(q)
      );
    }
    return result;
  }, [products, searchQuery, filterCategory]);

  const handleAdd = () => {
    if (!newProduct.name || !newProduct.price) return;
    const maxId = products.reduce((max, p) => Math.max(max, p.id), 0);
    const product = {
      ...newProduct,
      id: maxId + 1,
      price: parseFloat(newProduct.price),
      originalPrice: parseFloat(newProduct.originalPrice) || parseFloat(newProduct.price),
      stock: parseInt(newProduct.stock) || 50,
      rating: 4.0,
      inStock: true,
      isOffer: false,
      isBestSeller: false,
      isNewArrival: true,
    };
    saveProducts([...products, product]);
    setNewProduct({ name: '', nameTamil: '', price: '', originalPrice: '', category: '', unit: '', barcode: '', stock: '', image: '', description: '' });
    setShowCustomUnit(false);
    setShowAddForm(false);
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setEditForm({ ...product });
  };

  const handleSaveEdit = () => {
    const updated = products.map(p => p.id === editingId ? {
      ...editForm,
      price: parseFloat(editForm.price),
      originalPrice: parseFloat(editForm.originalPrice) || parseFloat(editForm.price),
      stock: parseInt(editForm.stock) || 0,
    } : p);
    saveProducts(updated);
    setEditingId(null);
  };

  const handleDelete = (id) => {
    if (window.confirm(lang === 'ta' ? 'நிச்சயமாக இந்த பொருளை நீக்க வேண்டுமா?' : 'Are you sure you want to delete this product?')) {
      saveProducts(products.filter(p => p.id !== id));
    }
  };

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

  const inputClass = "px-3 py-2 rounded-lg bg-surface-50 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 text-sm text-surface-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all";

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-surface-800 dark:text-white font-[var(--font-heading)]">
            {t('sidebarProducts')}
          </h1>
          <p className="text-sm text-surface-500">
            {lang === 'ta' ? `மொத்தம் ${products.length} பொருட்கள்` : `${products.length} products total`}
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="btn-primary text-sm py-2.5"
        >
          <Plus className="w-4 h-4" />
          {t('addBtn')}
        </button>
      </div>

      {/* Add Product Form */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-5 rounded-2xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 space-y-4">
              <h3 className="text-sm font-bold text-surface-800 dark:text-white flex items-center gap-2">
                <Package className="w-4 h-4 text-primary-500" />
                {t('addNewProduct')}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <input value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} placeholder={t('productName') + " *"} className={inputClass} />
                <input value={newProduct.nameTamil} onChange={e => setNewProduct({...newProduct, nameTamil: e.target.value})} placeholder={t('nameTamil')} className={inputClass} />
                <input type="number" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} placeholder={t('price') + " (₹) *"} className={inputClass} />
                <input type="number" value={newProduct.originalPrice} onChange={e => setNewProduct({...newProduct, originalPrice: e.target.value})} placeholder={lang === 'ta' ? 'அசல் விலை (₹)' : 'Original Price (₹)'} className={inputClass} />
                <select value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})} className={inputClass}>
                  <option value="">{lang === 'ta' ? 'வகையைத் தேர்ந்தெடு' : 'Select Category'}</option>
                  {categories.map(c => <option key={c.name} value={c.name}>{getCategoryName(c.name)}</option>)}
                </select>
                {showCustomUnit ? (
                  <div className="flex gap-2">
                    <input
                      value={newProduct.unit}
                      onChange={e => setNewProduct({...newProduct, unit: e.target.value})}
                      placeholder={lang === 'ta' ? 'அலகு (எ.கா: 1 கிலோ)' : 'Enter custom unit'}
                      className={`${inputClass} flex-1`}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setShowCustomUnit(false);
                        setNewProduct({...newProduct, unit: ''});
                      }}
                      className="px-2.5 py-2 rounded-lg bg-surface-100 dark:bg-surface-700 text-surface-500 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors text-xs font-bold font-sans"
                    >
                      {lang === 'ta' ? 'தேர்வு' : 'Select'}
                    </button>
                  </div>
                ) : (
                  <select
                    value={newProduct.unit}
                    onChange={e => {
                      if (e.target.value === 'custom') {
                        setShowCustomUnit(true);
                        setNewProduct({...newProduct, unit: ''});
                      } else {
                        setNewProduct({...newProduct, unit: e.target.value});
                      }
                    }}
                    className={inputClass}
                  >
                    <option value="">{lang === 'ta' ? 'அளவைத் தேர்ந்தெடு' : 'Select Unit'}</option>
                    {UNIT_OPTIONS.map(u => <option key={u} value={u}>{u}</option>)}
                    <option value="custom">{lang === 'ta' ? 'மற்றவை...' : 'Other...'}</option>
                  </select>
                )}
                <input value={newProduct.barcode} onChange={e => setNewProduct({...newProduct, barcode: e.target.value.toUpperCase()})} placeholder={t('barcode')} className={inputClass} />
                <input type="number" value={newProduct.stock} onChange={e => setNewProduct({...newProduct, stock: e.target.value})} placeholder={t('stock')} className={inputClass} />
                <div className="flex items-center gap-2">
                  <label className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-surface-50 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 border-dashed text-sm text-surface-500 hover:text-surface-800 dark:hover:text-white cursor-pointer hover:border-primary-500 transition-colors h-[38px]">
                    <Upload className="w-4 h-4 text-surface-400" />
                    <span>{newProduct.image ? (lang === 'ta' ? 'படம் மாற்றுக' : 'Change Image') : (lang === 'ta' ? 'படம் பதிவேற்று' : 'Upload Image')}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                  {newProduct.image && (
                    <div className="relative w-9 h-9 rounded-lg overflow-hidden border border-surface-200 dark:border-surface-700 shrink-0 group">
                      <img src={newProduct.image} alt="Preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setNewProduct({...newProduct, image: ''})}
                        className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <textarea value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} placeholder={t('description')} className={`${inputClass} w-full`} rows={2} />
              <div className="flex gap-2 justify-end">
                <button onClick={() => setShowAddForm(false)} className="px-4 py-2 rounded-xl text-sm text-surface-500 hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors">
                  {t('cancelBtn')}
                </button>
                <button onClick={handleAdd} className="btn-primary text-sm py-2">
                  <Save className="w-4 h-4" />
                  {t('saveChanges')}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder={t('searchPlaceholder')}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 text-sm text-surface-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50"
          />
        </div>
        <select
          value={filterCategory}
          onChange={e => setFilterCategory(e.target.value)}
          className="px-4 py-2.5 rounded-xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 text-sm text-surface-800 dark:text-white focus:outline-none"
        >
          <option value="">{lang === 'ta' ? 'அனைத்து வகைகள்' : 'All Categories'}</option>
          {categories.map(c => <option key={c.name} value={c.name}>{getCategoryName(c.name)}</option>)}
        </select>
      </div>

      {/* Products Table */}
      <div className="bg-white dark:bg-surface-800 rounded-2xl border border-surface-200 dark:border-surface-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-surface-50 dark:bg-surface-900/50">
                <th className="px-4 py-3 text-left text-[10px] font-bold text-surface-400 uppercase">{t('productCol')}</th>
                <th className="px-4 py-3 text-left text-[10px] font-bold text-surface-400 uppercase hidden sm:table-cell">{t('category')}</th>
                <th className="px-4 py-3 text-left text-[10px] font-bold text-surface-400 uppercase">{t('priceCol')}</th>
                <th className="px-4 py-3 text-left text-[10px] font-bold text-surface-400 uppercase">{t('stock')}</th>
                <th className="px-4 py-3 text-left text-[10px] font-bold text-surface-400 uppercase hidden md:table-cell">{t('barcode')}</th>
                <th className="px-4 py-3 w-24"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-100 dark:divide-surface-700">
              {filtered.map(product => (
                <tr key={product.id} className="hover:bg-surface-50 dark:hover:bg-surface-750 transition-colors">
                  {editingId === product.id ? (
                    <>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-surface-200 dark:border-surface-700 shrink-0 group cursor-pointer">
                            <img src={editForm.image} alt="Edit" className="w-full h-full object-cover" />
                            <label className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                              <Upload className="w-4 h-4 text-white" />
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleEditImageUpload}
                                className="hidden"
                              />
                            </label>
                          </div>
                          <div className="flex-1 space-y-1.5 min-w-0">
                            <input value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} placeholder={t('productName')} className={`${inputClass} w-full text-xs py-1.5`} />
                            <input value={editForm.nameTamil || ''} onChange={e => setEditForm({...editForm, nameTamil: e.target.value})} placeholder={t('nameTamil')} className={`${inputClass} w-full text-xs py-1.5`} />
                            <select
                              value={editForm.unit}
                              onChange={e => {
                                if (e.target.value === 'custom') {
                                  const custom = prompt(lang === 'ta' ? 'அலகை உள்ளிடவும்:' : 'Enter custom unit:');
                                  if (custom) {
                                    setEditForm({...editForm, unit: custom});
                                  }
                                } else {
                                  setEditForm({...editForm, unit: e.target.value});
                                }
                              }}
                              className={`${inputClass} w-full text-xs py-1.5`}
                            >
                              <option value="">{lang === 'ta' ? 'அலகு' : 'Select Unit'}</option>
                              {editForm.unit && !UNIT_OPTIONS.includes(editForm.unit) && (
                                <option value={editForm.unit}>{editForm.unit}</option>
                              )}
                              {UNIT_OPTIONS.map(u => <option key={u} value={u}>{u}</option>)}
                              <option value="custom">{lang === 'ta' ? 'மற்றவை...' : 'Other...'}</option>
                            </select>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell">
                        <select value={editForm.category} onChange={e => setEditForm({...editForm, category: e.target.value})} className={inputClass}>
                          {categories.map(c => <option key={c.name} value={c.name}>{getCategoryName(c.name)}</option>)}
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <input type="number" value={editForm.price} onChange={e => setEditForm({...editForm, price: e.target.value})} className={`${inputClass} w-20`} />
                      </td>
                      <td className="px-4 py-3">
                        <input type="number" value={editForm.stock} onChange={e => setEditForm({...editForm, stock: e.target.value})} className={`${inputClass} w-20`} />
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <input value={editForm.barcode || ''} onChange={e => setEditForm({...editForm, barcode: e.target.value})} className={`${inputClass} w-24`} />
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1">
                          <button onClick={handleSaveEdit} className="p-1.5 rounded-lg bg-primary-500/10 text-primary-600 hover:bg-primary-500/20"><Save className="w-3.5 h-3.5" /></button>
                          <button onClick={() => setEditingId(null)} className="p-1.5 rounded-lg bg-surface-100 dark:bg-surface-700 text-surface-500 hover:bg-surface-200"><X className="w-3.5 h-3.5" /></button>
                        </div>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <img src={product.image} alt={lang === 'ta' && product.nameTamil ? product.nameTamil : product.name} className="w-8 h-8 rounded-lg object-cover hidden sm:block" />
                          <div>
                            <p className="font-semibold text-surface-800 dark:text-white">
                              {lang === 'ta' && product.nameTamil ? product.nameTamil : product.name}
                            </p>
                            <p className="text-[10px] text-surface-400">{product.unit}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell">
                        <span className="px-2 py-1 rounded-md bg-surface-100 dark:bg-surface-700 text-[10px] font-medium text-surface-500">
                          {getCategoryName(product.category)}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-mono font-bold text-surface-800 dark:text-white">₹{product.price}</td>
                      <td className="px-4 py-3">
                        <span className={`font-mono font-bold ${(product.stock || 0) <= 10 ? 'text-red-500' : 'text-surface-800 dark:text-white'}`}>
                          {product.stock || 0}
                        </span>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <span className="font-mono text-xs text-surface-400">{product.barcode || '-'}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1">
                          <button onClick={() => handleEdit(product)} className="p-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-500/10 text-surface-400 hover:text-blue-500 transition-colors"><Edit3 className="w-3.5 h-3.5" /></button>
                          <button onClick={() => handleDelete(product.id)} className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 text-surface-400 hover:text-red-500 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="py-10 text-center text-sm text-surface-400">{t('noProducts')}</div>
        )}
      </div>
    </div>
  );
}
