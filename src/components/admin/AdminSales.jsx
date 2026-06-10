import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Calendar, IndianRupee, Receipt, ShoppingBag } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function AdminSales() {
  const [view, setView] = useState('daily'); // 'daily' or 'monthly'
  const { t, lang } = useLanguage();

  const invoices = useMemo(() => {
    try {
      const saved = localStorage.getItem('kcp-invoices');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  }, []);

  const dailyData = useMemo(() => {
    const map = {};
    invoices.forEach(inv => {
      const date = new Date(inv.timestamp).toLocaleDateString(lang === 'ta' ? 'ta-IN' : 'en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
      if (!map[date]) map[date] = { date, revenue: 0, bills: 0, items: 0 };
      map[date].revenue += inv.grandTotal;
      map[date].bills += 1;
      map[date].items += inv.totalItems;
    });
    return Object.values(map).sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [invoices, lang]);

  const monthlyData = useMemo(() => {
    const map = {};
    invoices.forEach(inv => {
      const d = new Date(inv.timestamp);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      const label = d.toLocaleDateString(lang === 'ta' ? 'ta-IN' : 'en-IN', { month: 'long', year: 'numeric' });
      if (!map[key]) map[key] = { key, label, revenue: 0, bills: 0, items: 0 };
      map[key].revenue += inv.grandTotal;
      map[key].bills += 1;
      map[key].items += inv.totalItems;
    });
    return Object.values(map).sort((a, b) => b.key.localeCompare(a.key));
  }, [invoices, lang]);

  const totalRevenue = invoices.reduce((sum, inv) => sum + inv.grandTotal, 0);
  const avgBillValue = invoices.length > 0 ? totalRevenue / invoices.length : 0;
  const totalItemsSold = invoices.reduce((sum, inv) => sum + inv.totalItems, 0);

  const data = view === 'daily' ? dailyData : monthlyData;
  const maxRevenue = data.length > 0 ? Math.max(...data.map(d => d.revenue)) : 1;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-surface-800 dark:text-white font-[var(--font-heading)]">
            {t('salesReports')}
          </h1>
          <p className="text-sm text-surface-500">
            {lang === 'ta' ? `மொத்தம் ${invoices.length} இன்வாய்ஸ்கள்` : `${invoices.length} total invoices`}
          </p>
        </div>
        <div className="flex bg-surface-100 dark:bg-surface-800 rounded-xl p-1">
          <button
            onClick={() => setView('daily')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${view === 'daily' ? 'bg-white dark:bg-surface-700 text-primary-600 shadow-sm' : 'text-surface-400'}`}
          >
            {t('dailySalesTab')}
          </button>
          <button
            onClick={() => setView('monthly')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${view === 'monthly' ? 'bg-white dark:bg-surface-700 text-primary-600 shadow-sm' : 'text-surface-400'}`}
          >
            {t('monthlySalesTab')}
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: t('totalRevenueLabel'), value: `₹${totalRevenue.toFixed(0)}`, icon: IndianRupee, color: 'text-primary-500 bg-primary-500/10' },
          { label: t('avgBillValue'), value: `₹${avgBillValue.toFixed(0)}`, icon: Receipt, color: 'text-blue-500 bg-blue-500/10' },
          { label: t('itemsSoldLabel'), value: totalItemsSold, icon: ShoppingBag, color: 'text-accent-500 bg-accent-500/10' },
        ].map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-5 rounded-2xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700"
          >
            <div className={`w-10 h-10 rounded-xl ${card.color} flex items-center justify-center mb-3`}>
              <card.icon className="w-5 h-5" />
            </div>
            <p className="text-2xl font-black text-surface-800 dark:text-white">{card.value}</p>
            <p className="text-xs text-surface-400 mt-1">{card.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Bar Chart */}
      {data.length > 0 ? (
        <div className="bg-white dark:bg-surface-800 rounded-2xl border border-surface-200 dark:border-surface-700 p-5">
          <h3 className="text-sm font-bold text-surface-800 dark:text-white mb-4 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-primary-500" />
            {view === 'daily' 
              ? (lang === 'ta' ? 'தினசரி வருவாய்' : 'Daily Revenue') 
              : (lang === 'ta' ? 'மாதாந்திர வருவாய்' : 'Monthly Revenue')
            }
          </h3>
          <div className="space-y-3">
            {data.slice(0, 15).map((d, i) => (
              <motion.div
                key={d.date || d.key}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-3"
              >
                <span className="text-xs font-medium text-surface-500 w-28 shrink-0 truncate">
                  {d.date || d.label}
                </span>
                <div className="flex-1 h-7 bg-surface-100 dark:bg-surface-700 rounded-lg overflow-hidden relative">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(d.revenue / maxRevenue) * 100}%` }}
                    transition={{ delay: i * 0.05 + 0.2, duration: 0.5 }}
                    className="h-full gradient-primary rounded-lg"
                  />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-bold text-surface-500 font-mono">
                    ₹{d.revenue.toFixed(0)}
                  </span>
                </div>
                <span className="text-[10px] text-surface-400 w-16 shrink-0 text-right">
                  {d.bills} {lang === 'ta' ? 'பில்கள்' : 'bills'}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-surface-800 rounded-2xl border border-surface-200 dark:border-surface-700 p-10 text-center">
          <BarChart3 className="w-12 h-12 text-surface-300 mx-auto mb-3" />
          <p className="text-sm text-surface-400">
            {lang === 'ta' 
              ? 'விற்பனைத் தரவு இன்னும் இல்லை. பில்லிங் பக்கத்திலிருந்து இன்வாய்ஸ்களை உருவாக்கவும்.' 
              : 'No sales data yet. Generate invoices from the Billing page.'}
          </p>
        </div>
      )}

      {/* Detailed Table */}
      {data.length > 0 && (
        <div className="bg-white dark:bg-surface-800 rounded-2xl border border-surface-200 dark:border-surface-700 overflow-hidden">
          <div className="px-5 py-4 border-b border-surface-200 dark:border-surface-700">
            <h3 className="text-sm font-bold text-surface-800 dark:text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary-500" />
              {lang === 'ta' 
                ? `${view === 'daily' ? 'தினசரி' : 'மாதாந்திர'} சுருக்கம்` 
                : `${view === 'daily' ? 'Daily' : 'Monthly'} Summary`}
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-surface-50 dark:bg-surface-900/50">
                  <th className="px-5 py-3 text-left text-[10px] font-bold text-surface-400 uppercase">
                    {view === 'daily' 
                      ? (lang === 'ta' ? 'தேதி' : 'Date') 
                      : (lang === 'ta' ? 'மாதம்' : 'Month')}
                  </th>
                  <th className="px-5 py-3 text-left text-[10px] font-bold text-surface-400 uppercase">
                    {lang === 'ta' ? 'வருவாய்' : 'Revenue'}
                  </th>
                  <th className="px-5 py-3 text-left text-[10px] font-bold text-surface-400 uppercase">
                    {lang === 'ta' ? 'பில்கள்' : 'Bills'}
                  </th>
                  <th className="px-5 py-3 text-left text-[10px] font-bold text-surface-400 uppercase">
                    {t('itemsSoldLabel')}
                  </th>
                  <th className="px-5 py-3 text-left text-[10px] font-bold text-surface-400 uppercase">
                    {lang === 'ta' ? 'சராசரி பில்' : 'Avg Bill'}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-100 dark:divide-surface-700">
                {data.map(d => (
                  <tr key={d.date || d.key} className="hover:bg-surface-50 dark:hover:bg-surface-750">
                    <td className="px-5 py-3 font-medium text-surface-800 dark:text-white">{d.date || d.label}</td>
                    <td className="px-5 py-3 font-bold text-primary-600 dark:text-primary-400 font-mono">₹{d.revenue.toFixed(2)}</td>
                    <td className="px-5 py-3 text-surface-600 dark:text-surface-300">{d.bills}</td>
                    <td className="px-5 py-3 text-surface-600 dark:text-surface-300">{d.items}</td>
                    <td className="px-5 py-3 font-mono text-surface-600 dark:text-surface-300">₹{(d.revenue / d.bills).toFixed(0)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
