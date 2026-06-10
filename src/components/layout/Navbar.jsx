import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sun, Moon, Menu, X, Search,
  Languages, Store, Receipt, Settings
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [searchVal, setSearchVal] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();
  const { t, toggleLanguage } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on navigation
  const [prevPathname, setPrevPathname] = useState(location.pathname);
  if (location.pathname !== prevPathname) {
    setPrevPathname(location.pathname);
    setIsMobileMenuOpen(false);
  }

  const navLinks = [
    { path: '/', label: t('home') },
    { path: '/products', label: t('products') },
    { path: '/about', label: t('about') },
    { path: '/contact', label: t('contact') },
  ];

  const isActive = (path) => location.pathname === path;

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter' && searchVal.trim()) {
      setIsSearchOpen(false);
      navigate(`/products?search=${encodeURIComponent(searchVal.trim())}`);
      setSearchVal('');
    }
  };

  const linkClass = (path) => {
    const active = isActive(path);
    if (isScrolled) {
      return active
        ? 'bg-primary-500/10 text-primary-600 dark:text-primary-400'
        : 'text-surface-600 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-800 hover:text-primary-600 dark:hover:text-primary-400';
    } else {
      return active
        ? 'bg-white/20 text-white font-semibold'
        : 'text-white/80 hover:bg-white/10 hover:text-white';
    }
  };

  const buttonClass = `p-2 rounded-xl transition-all duration-200 cursor-pointer ${
    isScrolled
      ? 'text-surface-600 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-800'
      : 'text-white/80 hover:bg-white/10 hover:text-white'
  }`;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white dark:bg-surface-950 border-b border-surface-200 dark:border-surface-800/80 shadow-lg'
            : 'bg-primary-950/40 border-b border-white/5 backdrop-blur-sm'
        }`}
      >
        {showAnnouncement && (
          <div className="gradient-accent text-white py-2 px-4 flex items-center justify-between text-xs sm:text-sm font-semibold shadow-md">
            <div className="flex-1 flex justify-center items-center gap-2">
              <span>🪔</span>
              <span>{t('festivalAnnouncement')}</span>
            </div>
            <button
              onClick={() => setShowAnnouncement(false)}
              className="p-1 hover:bg-white/20 rounded-md transition-colors shrink-0"
              aria-label="Close Announcement"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-lg group-hover:shadow-primary-500/40 transition-shadow">
                <Store className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg md:text-xl font-bold font-[var(--font-heading)] gradient-text leading-tight">
                  KCP Maligai
                </span>
                <span className={`text-[10px] hidden sm:block leading-none transition-colors duration-300 ${
                  isScrolled ? 'text-surface-500 dark:text-surface-400' : 'text-white/60'
                }`}>
                  Your Trusted Neighborhood Grocery Store
                </span>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${linkClass(link.path)}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-1 md:gap-2">
              {/* Search Toggle */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className={buttonClass}
                aria-label="Search"
                id="search-toggle"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Language Toggle */}
              <button
                onClick={toggleLanguage}
                className={`${buttonClass} hidden sm:flex items-center gap-1`}
                aria-label="Toggle Language"
                id="language-toggle"
              >
                <Languages className="w-5 h-5" />
                <span className="text-xs font-medium">{t('language')}</span>
              </button>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={buttonClass}
                aria-label="Toggle Theme"
                id="theme-toggle"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              {/* Billing Link */}
              <Link
                to="/billing"
                className={`${buttonClass} hidden sm:block`}
                aria-label={t('billingSystem')}
                title={t('billingSystem')}
                id="billing-nav"
              >
                <Receipt className="w-5 h-5" />
              </Link>

              {/* Admin Link */}
              <Link
                to="/admin"
                className={`${buttonClass} hidden sm:block`}
                aria-label={t('adminDashboard')}
                title={t('adminDashboard')}
                id="admin-nav"
              >
                <Settings className="w-5 h-5" />
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`${buttonClass} md:hidden`}
                aria-label="Menu"
                id="mobile-menu-toggle"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <AnimatePresence>
            {isSearchOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden pb-3"
              >
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
                  <input
                    type="text"
                    value={searchVal}
                    onChange={(e) => setSearchVal(e.target.value)}
                    onKeyDown={handleSearchSubmit}
                    placeholder={t('search')}
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-surface-100 dark:bg-surface-800 text-surface-800 dark:text-surface-200 placeholder-surface-400 border border-surface-200 dark:border-surface-700 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all text-sm"
                    autoFocus
                    id="navbar-search"
                  />
                  {searchVal && (
                    <button
                      onClick={() => setSearchVal('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-surface-200 dark:hover:bg-surface-700 text-surface-400"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-72 bg-white dark:bg-surface-900 z-50 shadow-2xl md:hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <span className="text-lg font-bold gradient-text font-[var(--font-heading)]">Menu</span>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-800"
                  >
                    <X className="w-5 h-5 text-surface-600 dark:text-surface-300" />
                  </button>
                </div>

                <div className="flex flex-col gap-2">
                  {navLinks.map(link => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                        isActive(link.path)
                          ? 'bg-primary-500/10 text-primary-600 dark:text-primary-400'
                          : 'text-surface-600 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-800'
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}

                  {/* Billing & Admin links in mobile */}
                  <div className="border-t border-surface-200 dark:border-surface-700 my-2" />
                  <Link
                    to="/billing"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-surface-600 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
                  >
                    <Receipt className="w-5 h-5" />
                    <span>{t('billingSystem')}</span>
                  </Link>
                  <Link
                    to="/admin"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-surface-600 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
                  >
                    <Settings className="w-5 h-5" />
                    <span>{t('adminDashboard')}</span>
                  </Link>
                </div>

                <div className="mt-6 pt-6 border-t border-surface-200 dark:border-surface-700 flex flex-col gap-3">
                  <button
                    onClick={toggleLanguage}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-surface-600 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
                  >
                    <Languages className="w-5 h-5" />
                    <span>{t('language')}</span>
                  </button>
                  <button
                    onClick={toggleTheme}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-surface-600 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
                  >
                    {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
