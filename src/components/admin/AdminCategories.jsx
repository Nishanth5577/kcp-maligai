import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit3, Trash2, Save, X, Tags } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useProduct } from '../../context/ProductContext';

const EMOJIS = ['🌾', '🫘', '🥕', '🥛', '🍪', '☕', '🏠', '🧴', '🍎', '🧹', '🧈', '🥚', '🍚', '🫒', '🧂', '🍯', '🥤', '🍫'];

export default function AdminCategories() {
  const { categories, saveCategories } = useProduct();

  const [editingIdx, setEditingIdx] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [showAdd, setShowAdd] = useState(false);
  const [newCat, setNewCat] = useState({ name: '', nameTamil: '', icon: '🛒', count: 0 });
  const { t, lang } = useLanguage();

  const handleAdd = () => {
    if (!newCat.name) return;
    saveCategories([...categories, { ...newCat, count: parseInt(newCat.count) || 0 }]);
    setNewCat({ name: '', nameTamil: '', icon: '🛒', count: 0 });
    setShowAdd(false);
  };

  const handleSave = () => {
    const updated = [...categories];
    updated[editingIdx] = { ...editForm, count: parseInt(editForm.count) || 0 };
    saveCategories(updated);
    setEditingIdx(null);
  };

  const handleDelete = (idx) => {
    const nameToConfirm = lang === 'ta' && categories[idx].nameTamil ? categories[idx].nameTamil : categories[idx].name;
    if (window.confirm(lang === 'ta' ? `வகை "${nameToConfirm}" ஐ நீக்க வேண்டுமா?` : `Delete category "${nameToConfirm}"?`)) {
      saveCategories(categories.filter((_, i) => i !== idx));
    }
  };

  const getCategoryName = (catName, catNameTamil) => {
    if (lang === 'ta' && catNameTamil) return catNameTamil;
    if (lang === 'ta') {
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
      return mapping[catName] || catName;
    }
    return catName;
  };

  const inputClass = "px-3 py-2 rounded-lg bg-surface-50 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 text-sm text-surface-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-surface-800 dark:text-white font-[var(--font-heading)]">
            {t('sidebarCategories')}
          </h1>
          <p className="text-sm text-surface-500">
            {lang === 'ta' ? `மொத்தம் ${categories.length} வகைகள்` : `${categories.length} categories`}
          </p>
        </div>
        <button onClick={() => setShowAdd(!showAdd)} className="btn-primary text-sm py-2.5">
          <Plus className="w-4 h-4" />
          {t('addCategory')}
        </button>
      </div>

      {/* Add Form */}
      <AnimatePresence>
        {showAdd && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <div className="p-5 rounded-2xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 space-y-4">
              <h3 className="text-sm font-bold text-surface-800 dark:text-white flex items-center gap-2">
                <Tags className="w-4 h-4 text-primary-500" />
                {t('manageCategories')}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <input value={newCat.name} onChange={e => setNewCat({...newCat, name: e.target.value})} placeholder={t('categoryName') + " *"} className={inputClass} />
                <input value={newCat.nameTamil} onChange={e => setNewCat({...newCat, nameTamil: e.target.value})} placeholder={t('nameTamil')} className={inputClass} />
                <div>
                  <p className="text-[10px] text-surface-400 mb-1 font-bold uppercase">
                    {lang === 'ta' ? 'சின்னம்' : 'Icon'}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {EMOJIS.map(e => (
                      <button key={e} onClick={() => setNewCat({...newCat, icon: e})} className={`w-8 h-8 rounded-lg flex items-center justify-center text-lg transition-all ${newCat.icon === e ? 'bg-primary-500/20 ring-2 ring-primary-500' : 'hover:bg-surface-100 dark:hover:bg-surface-700'}`}>{e}</button>
                    ))}
                  </div>
                </div>
                <div className="flex items-end gap-2">
                  <button onClick={() => setShowAdd(false)} className="px-4 py-2 rounded-xl text-sm text-surface-500 hover:bg-surface-100 dark:hover:bg-surface-700">
                    {t('cancelBtn')}
                  </button>
                  <button onClick={handleAdd} className="btn-primary text-sm py-2">
                    <Save className="w-4 h-4" />
                    {t('saveChanges')}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {categories.map((cat, idx) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="p-5 rounded-2xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 card-hover"
          >
            {editingIdx === idx ? (
              <div className="space-y-3">
                <input value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} className={`${inputClass} w-full`} />
                <input value={editForm.nameTamil || ''} onChange={e => setEditForm({...editForm, nameTamil: e.target.value})} className={`${inputClass} w-full`} placeholder={t('nameTamil')} />
                <div className="flex flex-wrap gap-1">
                  {EMOJIS.map(e => (
                    <button key={e} onClick={() => setEditForm({...editForm, icon: e})} className={`w-7 h-7 rounded-md flex items-center justify-center text-sm ${editForm.icon === e ? 'bg-primary-500/20 ring-2 ring-primary-500' : 'hover:bg-surface-100 dark:hover:bg-surface-700'}`}>{e}</button>
                  ))}
                </div>
                <div className="flex gap-2">
                  <button onClick={handleSave} className="p-1.5 rounded-lg bg-primary-500/10 text-primary-600 hover:bg-primary-500/20"><Save className="w-4 h-4" /></button>
                  <button onClick={() => setEditingIdx(null)} className="p-1.5 rounded-lg bg-surface-100 dark:bg-surface-700 text-surface-500"><X className="w-4 h-4" /></button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-start justify-between mb-3">
                  <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center text-2xl">
                    {cat.icon}
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => { setEditingIdx(idx); setEditForm({...cat}); }} className="p-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-500/10 text-surface-400 hover:text-blue-500 transition-colors"><Edit3 className="w-3.5 h-3.5" /></button>
                    <button onClick={() => handleDelete(idx)} className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 text-surface-400 hover:text-red-500 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
                <h3 className="font-bold text-surface-800 dark:text-white text-sm">
                  {getCategoryName(cat.name, cat.nameTamil)}
                </h3>
                <p className="text-xs text-surface-500 mt-1">
                  {lang === 'ta' ? `${cat.count} பொருட்கள்` : `${cat.count} products`}
                </p>
              </>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
