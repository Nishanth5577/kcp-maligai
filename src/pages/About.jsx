import { motion } from 'framer-motion';
import { Target, Eye, ShieldCheck, Heart, Award, Users, Package, TrendingUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function About() {
  const { t } = useLanguage();

  const stats = [
    { icon: Award, value: '14+', label: t('yearsExperience') },
    { icon: Users, value: '15,000+', label: t('happyCustomers') },
    { icon: Package, value: '500+', label: t('productsAvailable') },
    { icon: TrendingUp, value: '200+', label: t('dailyOrders') },
  ];

  return (
    <div className="page-transition">
      {/* Spacer for fixed navbar */}
      <div className="h-16 md:h-20" />
      {/* Hero */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-primary-900">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 text-8xl">🏪</div>
            <div className="absolute bottom-10 right-10 text-8xl">🛒</div>
          </div>
        </div>
        <div className="relative container-custom text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-white mb-4 font-[var(--font-heading)]"
          >
            {t('aboutTitle')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-primary-100 text-lg max-w-xl mx-auto"
          >
            {t('aboutSubtitle')}
          </motion.p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white dark:bg-surface-900 -mt-8 relative z-10">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 text-center card-hover"
              >
                <div className="w-12 h-12 mx-auto rounded-xl bg-primary-500/10 flex items-center justify-center mb-3">
                  <stat.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <p className="text-2xl md:text-3xl font-black text-surface-800 dark:text-white gradient-text">{stat.value}</p>
                <p className="text-xs text-surface-500 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-padding bg-white dark:bg-surface-900">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-surface-800 dark:text-white mb-6 font-[var(--font-heading)]">
                {t('ourStory')}
              </h2>
              <p className="text-surface-600 dark:text-surface-300 leading-relaxed mb-6">
                {t('ourStoryText')}
              </p>
              <div className="space-y-4">
                {[
                  { year: '2010', text: 'Started as a small neighborhood shop' },
                  { year: '2015', text: 'Expanded to a full supermarket' },
                  { year: '2020', text: 'Renovated to a Modern Supermarket Layout' },
                  { year: '2024', text: 'Serving 15,000+ happy customers' },
                ].map((milestone, i) => (
                  <motion.div
                    key={milestone.year}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <span className="w-16 h-8 rounded-lg gradient-primary flex items-center justify-center text-white text-xs font-bold shrink-0">
                      {milestone.year}
                    </span>
                    <span className="text-sm text-surface-600 dark:text-surface-400">{milestone.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=600&h=500&fit=crop"
                  alt="KCP Maligai Store"
                  className="w-full h-80 md:h-[400px] object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 rounded-2xl gradient-accent flex flex-col items-center justify-center text-white shadow-lg">
                <span className="text-3xl font-black">14+</span>
                <span className="text-xs">Years</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-surface-50 dark:bg-surface-950">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: Target,
                title: t('missionTitle'),
                text: t('missionText'),
                gradient: 'from-primary-500 to-emerald-600',
              },
              {
                icon: Eye,
                title: t('visionTitle'),
                text: t('visionText'),
                gradient: 'from-accent-500 to-orange-600',
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-2xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 card-hover"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-5 shadow-lg`}>
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-surface-800 dark:text-white mb-3 font-[var(--font-heading)]">
                  {item.title}
                </h3>
                <p className="text-surface-600 dark:text-surface-400 leading-relaxed">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality & Customer First */}
      <section className="section-padding bg-white dark:bg-surface-900">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: ShieldCheck,
                title: t('qualityTitle'),
                text: t('qualityText'),
                iconColor: 'text-primary-600 dark:text-primary-400',
                bg: 'bg-primary-500/10',
              },
              {
                icon: Heart,
                title: t('customerFirst'),
                text: t('customerFirstText'),
                iconColor: 'text-red-500',
                bg: 'bg-red-500/10',
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-5 p-6 rounded-2xl bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700"
              >
                <div className={`w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center shrink-0`}>
                  <item.icon className={`w-6 h-6 ${item.iconColor}`} />
                </div>
                <div>
                  <h3 className="font-bold text-surface-800 dark:text-white mb-2 font-[var(--font-heading)]">
                    {item.title}
                  </h3>
                  <p className="text-sm text-surface-600 dark:text-surface-400 leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
