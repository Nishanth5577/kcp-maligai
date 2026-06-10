import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Receipt, AlertTriangle, Package, IndianRupee } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useProduct } from '../../context/ProductContext';

export default function AdminDashboard() {
  const { t, lang } = useLanguage();
  const { products: allProducts } = useProduct();

  const stats = useMemo(() => {
    // Load invoices
    let invoices = [];
    try {
      const saved = localStorage.getItem('kcp-invoices');
      invoices = saved ? JSON.parse(saved) : [];
    } catch { /* empty */ }

    const today = new Date().toDateString();
    const thisMonth = new Date().getMonth();
    const thisYear = new Date().getFullYear();

    const todayInvoices = invoices.filter(inv => new Date(inv.timestamp).toDateString() === today);
    const monthInvoices = invoices.filter(inv => {
      const d = new Date(inv.timestamp);
      return d.getMonth() === thisMonth && d.getFullYear() === thisYear;
    });

    const todayRevenue = todayInvoices.reduce((sum, inv) => sum + inv.grandTotal, 0);
    const monthRevenue = monthInvoices.reduce((sum, inv) => sum + inv.grandTotal, 0);
    const todayItems = todayInvoices.reduce((sum, inv) => sum + inv.totalItems, 0);
    const lowStockCount = allProducts.filter(p => (p.stock || 0) <= 10).length;

    return {
      todayBills: todayInvoices.length,
      todayRevenue,
      todayItems,
      monthBills: monthInvoices.length,
      monthRevenue,
      totalProducts: allProducts.length,
      lowStockCount,
      totalInvoices: invoices.length,
      recentInvoices: invoices.slice(0, 5),
    };
  }, [allProducts]);

  const cards = [
    {
      title: t('todayRevenue'),
      value: `₹${stats.todayRevenue.toFixed(0)}`,
      sub: lang === 'ta' 
        ? `${stats.todayBills} பில்கள் • ${stats.todayItems} பொருட்கள்` 
        : `${stats.todayBills} bills • ${stats.todayItems} items`,
      icon: IndianRupee,
      color: 'from-primary-500 to-emerald-600',
      bg: 'bg-primary-500/10',
    },
    {
      title: t('monthlyRevenue'),
      value: `₹${stats.monthRevenue.toFixed(0)}`,
      sub: lang === 'ta'
        ? `இந்த மாதம் ${stats.monthBills} பில்கள்`
        : `${stats.monthBills} bills this month`,
      icon: TrendingUp,
      color: 'from-blue-500 to-indigo-600',
      bg: 'bg-blue-500/10',
    },
    {
      title: t('totalProducts'),
      value: stats.totalProducts,
      sub: lang === 'ta'
        ? `மொத்தம் ${stats.totalInvoices} இன்வாய்ஸ்கள்`
        : `${stats.totalInvoices} total invoices`,
      icon: Package,
      color: 'from-accent-500 to-orange-600',
      bg: 'bg-accent-500/10',
    },
    {
      title: t('lowStockAlerts'),
      value: stats.lowStockCount,
      sub: t('lowStockHint'),
      icon: AlertTriangle,
      color: stats.lowStockCount > 0 ? 'from-red-500 to-rose-600' : 'from-green-500 to-emerald-600',
      bg: stats.lowStockCount > 0 ? 'bg-red-500/10' : 'bg-green-500/10',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-surface-800 dark:text-white font-[var(--font-heading)]">
          {t('sidebarDashboard')}
        </h1>
        <p className="text-sm text-surface-500 mt-1">{t('welcomeText')}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-5 rounded-2xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 card-hover"
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center shadow-lg`}>
                <card.icon className="w-5 h-5 text-white" />
              </div>
            </div>
            <p className="text-2xl font-black text-surface-800 dark:text-white">{card.value}</p>
            <p className="text-xs text-surface-400 mt-1">{card.title}</p>
            <p className="text-[10px] text-surface-400 mt-0.5">{card.sub}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent Invoices */}
      <div className="bg-white dark:bg-surface-800 rounded-2xl border border-surface-200 dark:border-surface-700 overflow-hidden">
        <div className="px-5 py-4 border-b border-surface-200 dark:border-surface-700 flex items-center gap-2">
          <Receipt className="w-4 h-4 text-primary-500" />
          <h3 className="text-sm font-bold text-surface-800 dark:text-white">{t('recentInvoices')}</h3>
        </div>
        {stats.recentInvoices.length > 0 ? (
          <div className="divide-y divide-surface-100 dark:divide-surface-700">
            {stats.recentInvoices.map(inv => (
              <div key={inv.invoiceNumber} className="px-5 py-3 flex items-center justify-between hover:bg-surface-50 dark:hover:bg-surface-750 transition-colors">
                <div>
                  <p className="text-sm font-bold text-surface-800 dark:text-white font-mono">{inv.invoiceNumber}</p>
                  <p className="text-[10px] text-surface-400">
                    {inv.date} • {inv.time} {inv.customer.name && `• ${inv.customer.name}`}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-primary-600 dark:text-primary-400">₹{inv.grandTotal.toFixed(2)}</p>
                  <p className="text-[10px] text-surface-400">
                    {inv.totalItems} {lang === 'ta' ? 'பொருட்கள்' : 'items'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="px-5 py-10 text-center">
            <p className="text-sm text-surface-400">{t('noInvoicesYet')}</p>
          </div>
        )}
      </div>
    </div>
  );
}
