import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, ArrowRight, Star, ShieldCheck, Clock } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-[100vh] flex items-center overflow-hidden" id="hero-section">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/95 via-primary-800/90 to-surface-900/95 z-10" />
        <img
          src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=1920&h=1080&fit=crop"
          alt="Fresh groceries"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[15%] right-[10%] text-6xl md:text-8xl opacity-20"
        >
          🥕
        </motion.div>
        <motion.div
          animate={{ y: [10, -10, 10], rotate: [0, -5, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[35%] right-[25%] text-5xl md:text-7xl opacity-15"
        >
          🍎
        </motion.div>
        <motion.div
          animate={{ y: [-8, 12, -8], rotate: [0, 3, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-[20%] right-[15%] text-5xl md:text-6xl opacity-20"
        >
          🌾
        </motion.div>
        <motion.div
          animate={{ y: [5, -15, 5] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[60%] right-[40%] text-4xl md:text-5xl opacity-10"
        >
          🥛
        </motion.div>
        <motion.div
          animate={{ y: [-12, 8, -12] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-[30%] left-[5%] text-4xl md:text-5xl opacity-15"
        >
          🍌
        </motion.div>

        {/* Gradient Orbs */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary-400/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent-400/10 rounded-full blur-[120px]" />
      </div>

      {/* Content */}
      <div className="relative z-20 container-custom py-32 md:py-0">
        <div className="max-w-2xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm mb-6"
          >
            <Clock className="w-4 h-4 text-primary-300" />
            Fresh Daily | Open 7 AM - 10 PM
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white font-[var(--font-heading)] mb-4 leading-[1.1]"
          >
            {t('heroTitle')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg sm:text-xl md:text-2xl text-primary-100 font-medium mb-2 font-[var(--font-heading)]"
          >
            Your Trusted Neighborhood Grocery Store
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-sm sm:text-base text-white/60 mb-8 max-w-lg"
          >
            Quality products at best prices. Visit our store for the freshest groceries, grains, dairy, and household essentials.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-white text-primary-700 font-bold text-sm hover:bg-primary-50 hover:shadow-xl hover:shadow-white/20 transition-all hover:-translate-y-1"
            >
              <ShoppingBag className="w-5 h-5" />
              View Products
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl border-2 border-white/30 text-white font-bold text-sm hover:bg-white/10 hover:border-white/60 transition-all hover:-translate-y-1"
            >
              Visit Our Store
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 flex flex-wrap gap-8"
          >
            {[
              { icon: Star, value: '4.8★', label: 'Rating' },
              { icon: ShoppingBag, value: '500+', label: 'Products' },
              { icon: ShieldCheck, value: '15K+', label: 'Happy Customers' },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                  <stat.icon className="w-5 h-5 text-primary-300" />
                </div>
                <div>
                  <p className="text-white font-bold text-lg leading-tight">{stat.value}</p>
                  <p className="text-white/50 text-xs">{stat.label}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 50L48 45C96 40 192 30 288 28C384 26 480 32 576 40C672 48 768 58 864 55C960 52 1056 36 1152 30C1248 24 1344 28 1392 30L1440 32V100H1392C1344 100 1248 100 1152 100C1056 100 960 100 864 100C768 100 672 100 576 100C480 100 384 100 288 100C192 100 96 100 48 100H0V50Z"
            className="fill-white dark:fill-surface-900"
          />
        </svg>
      </div>
    </section>
  );
}
