import { Minus, Plus, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

export default function BillItemRow({ item, index, onUpdateQuantity, onRemove }) {
  const lineTotal = item.price * item.quantity;
  const { lang } = useLanguage();

  return (
    <motion.tr
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ delay: index * 0.03 }}
      className="border-b border-surface-100 dark:border-surface-700 hover:bg-surface-50 dark:hover:bg-surface-800/50 transition-colors"
    >
      <td className="py-3 px-3 text-xs text-surface-500 font-mono">{index + 1}</td>
      <td className="py-3 px-3">
        <div className="flex items-center gap-3">
          <img
            src={item.image}
            alt={lang === 'ta' && item.nameTamil ? item.nameTamil : item.name}
            className="w-8 h-8 rounded-lg object-cover border border-surface-200 dark:border-surface-700 hidden sm:block"
          />
          <div>
            <p className="text-sm font-semibold text-surface-800 dark:text-white">
              {lang === 'ta' && item.nameTamil ? item.nameTamil : item.name}
            </p>
            <p className="text-[10px] text-surface-400">{item.unit}</p>
          </div>
        </div>
      </td>
      <td className="py-3 px-3 text-sm text-surface-600 dark:text-surface-300 font-mono">₹{item.price}</td>
      <td className="py-3 px-3">
        <div className="flex items-center gap-1">
          <button
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
            className="w-7 h-7 rounded-lg bg-surface-100 dark:bg-surface-700 hover:bg-red-100 dark:hover:bg-red-500/20 flex items-center justify-center transition-colors"
          >
            <Minus className="w-3 h-3" />
          </button>
          <input
            type="number"
            value={item.quantity}
            onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value) || 1)}
            className="w-12 h-7 text-center text-sm font-bold rounded-lg bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-600 text-surface-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary-500"
            min="1"
          />
          <button
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            className="w-7 h-7 rounded-lg bg-surface-100 dark:bg-surface-700 hover:bg-primary-100 dark:hover:bg-primary-500/20 flex items-center justify-center transition-colors"
          >
            <Plus className="w-3 h-3" />
          </button>
        </div>
      </td>
      <td className="py-3 px-3 text-sm font-bold text-surface-800 dark:text-white font-mono">₹{lineTotal.toFixed(2)}</td>
      <td className="py-3 px-3">
        <button
          onClick={() => onRemove(item.id)}
          className="p-1.5 rounded-lg hover:bg-red-100 dark:hover:bg-red-500/20 text-surface-400 hover:text-red-500 transition-colors"
          title="Remove item"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </td>
    </motion.tr>
  );
}
