import { motion } from 'framer-motion';
import { Leaf, Clock, BadgePercent, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import SectionHeading from '../ui/SectionHeading';

export default function WhyChooseUs() {
  const { t } = useLanguage();

  const features = [
    {
      icon: Leaf,
      title: t('freshProducts'),
      desc: t('freshProductsDesc'),
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-500/10',
      iconColor: 'text-green-600 dark:text-green-400',
    },
    {
      icon: Clock,
      title: t('quickBilling'),
      desc: t('quickBillingDesc'),
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'bg-blue-500/10',
      iconColor: 'text-blue-600 dark:text-blue-400',
    },
    {
      icon: BadgePercent,
      title: t('bestPrices'),
      desc: t('bestPricesDesc'),
      color: 'from-orange-500 to-red-600',
      bgColor: 'bg-orange-500/10',
      iconColor: 'text-orange-600 dark:text-orange-400',
    },
    {
      icon: ShieldCheck,
      title: t('qualityAssured'),
      desc: t('qualityAssuredDesc'),
      color: 'from-purple-500 to-pink-600',
      bgColor: 'bg-purple-500/10',
      iconColor: 'text-purple-600 dark:text-purple-400',
    },
  ];

  return (
    <section className="section-padding bg-white dark:bg-surface-900" id="why-choose-section">
      <div className="container-custom">
        <SectionHeading title={t('whyChooseTitle')} subtitle={t('whyChooseSubtitle')} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group p-6 rounded-2xl bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 hover:border-primary-300 dark:hover:border-primary-600 card-hover text-center"
            >
              <div className={`w-14 h-14 mx-auto rounded-2xl ${feature.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className={`w-7 h-7 ${feature.iconColor}`} />
              </div>
              <h3 className="font-bold text-surface-800 dark:text-white mb-2 font-[var(--font-heading)]">
                {feature.title}
              </h3>
              <p className="text-sm text-surface-500 dark:text-surface-400 leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
