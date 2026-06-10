import { Link } from 'react-router-dom';
import { ExternalLink, Globe, MessageCircle, Video, MapPin, Phone, Mail, Heart, Store, Receipt, Settings } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-surface-900 dark:bg-surface-950 text-surface-300">
      {/* Main Footer */}
      <div className="container-custom pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* About Column */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                <Store className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white font-[var(--font-heading)]">KCP Maligai</span>
            </Link>
            <p className="text-sm text-surface-400 leading-relaxed mb-6">
              {t('footerAbout')}
            </p>
            <div className="flex gap-3">
              {[
                { icon: Globe, href: '#', label: 'Facebook' },
                { icon: MessageCircle, href: '#', label: 'Instagram' },
                { icon: ExternalLink, href: '#', label: 'Twitter' },
                { icon: Video, href: '#', label: 'YouTube' },
              ].map(social => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-9 h-9 rounded-lg bg-surface-800 hover:bg-primary-600 flex items-center justify-center transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold font-[var(--font-heading)] mb-4">{t('quickLinks')}</h4>
            <ul className="space-y-3">
              {[
                { to: '/', label: t('home') },
                { to: '/products', label: t('products') },
                { to: '/about', label: t('about') },
                { to: '/contact', label: t('contact') },
                { to: '/billing', label: t('billingSystem'), icon: Receipt },
                { to: '/admin', label: t('adminDashboard'), icon: Settings },
              ].map(link => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-surface-400 hover:text-primary-400 transition-colors flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-primary-500" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-semibold font-[var(--font-heading)] mb-4">{t('categoriesFooter')}</h4>
            <ul className="space-y-3">
              {['Rice & Grains', 'Pulses & Dal', 'Fruits & Vegetables', 'Dairy Products', 'Snacks', 'Beverages', 'Personal Care', 'Household Products'].map(cat => (
                <li key={cat}>
                  <Link
                    to={`/products?category=${encodeURIComponent(cat)}`}
                    className="text-sm text-surface-400 hover:text-primary-400 transition-colors flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-accent-500" />
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold font-[var(--font-heading)] mb-4">{t('contactInfo')}</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-primary-400 shrink-0" />
                <span className="text-sm text-surface-400">123, Main Road, Anna Nagar, Chennai - 600040</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary-400 shrink-0" />
                <a href="tel:+919942424050" className="text-sm text-surface-400 hover:text-primary-400 transition-colors">
                  +91 99424 24050
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary-400 shrink-0" />
                <a href="mailto:kcp7673@gmail.com" className="text-sm text-surface-400 hover:text-primary-400 transition-colors">
                  kcp7673@gmail.com
                </a>
              </li>
            </ul>

            {/* Business Hours */}
            <div className="mt-6">
              <p className="text-xs text-surface-500 mb-2 font-semibold uppercase">Business Hours</p>
              <div className="space-y-1">
                <p className="text-xs text-surface-400">Mon-Sat: 7:00 AM - 10:00 PM</p>
                <p className="text-xs text-surface-400">Sunday: 8:00 AM - 9:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-surface-800">
        <div className="container-custom py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-surface-500">
            © {new Date().getFullYear()} KCP Maligai. {t('allRightsReserved')}
          </p>
          <p className="text-xs text-surface-500 flex items-center gap-1">
            {t('madeWith')} <Heart className="w-3 h-3 text-red-500 fill-red-500" /> {t('forOurCustomers')}
          </p>
        </div>
      </div>
    </footer>
  );
}
