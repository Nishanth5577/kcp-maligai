import { motion } from 'framer-motion';
import {
  LayoutDashboard, Package, Tags, BarChart3, Warehouse,
  LogOut, Store, ChevronLeft, Menu
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function AdminSidebar({ activeTab, onTabChange, collapsed, onToggle, onLogout }) {
  const { t, lang } = useLanguage();

  const navItems = [
    { key: 'dashboard', label: t('sidebarDashboard'), icon: LayoutDashboard },
    { key: 'products', label: t('sidebarProducts'), icon: Package },
    { key: 'categories', label: t('sidebarCategories'), icon: Tags },
    { key: 'sales', label: t('sidebarSales'), icon: BarChart3 },
    { key: 'inventory', label: t('sidebarInventory'), icon: Warehouse },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {!collapsed && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        className={`fixed lg:static top-0 left-0 h-full z-50 bg-surface-950 border-r border-surface-800 flex flex-col transition-all duration-300 ${
          collapsed ? 'w-0 lg:w-16 -translate-x-full lg:translate-x-0 overflow-hidden' : 'w-64'
        }`}
      >
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-surface-800">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                <Store className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className="text-sm font-bold text-white font-[var(--font-heading)]">
                  {lang === 'ta' ? 'KCP நிர்வாகம்' : 'KCP Admin'}
                </span>
              </div>
            </div>
          )}
          <button
            onClick={onToggle}
            className="p-2 rounded-lg hover:bg-surface-800 text-surface-400 transition-colors"
          >
            {collapsed ? <Menu className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
          {navItems.map(item => (
            <button
              key={item.key}
              onClick={() => { onTabChange(item.key); if (window.innerWidth < 1024) onToggle(); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === item.key
                  ? 'bg-primary-500/15 text-primary-400'
                  : 'text-surface-400 hover:bg-surface-800 hover:text-surface-200'
              }`}
              title={item.label}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-2 border-t border-surface-800">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors"
            title={t('logout')}
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {!collapsed && <span>{t('logout')}</span>}
          </button>
        </div>
      </motion.aside>
    </>
  );
}
