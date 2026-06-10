import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { faqs } from '../../data/faq';
import SectionHeading from '../ui/SectionHeading';

export default function FAQ() {
  const { t, lang } = useLanguage();
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => setOpenId(prev => prev === id ? null : id);

  return (
    <section className="section-padding bg-surface-50 dark:bg-surface-950" id="faq-section">
      <div className="container-custom">
        <SectionHeading title={t('faqTitle')} subtitle={t('faqSubtitle')} />

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 overflow-hidden"
            >
              <button
                onClick={() => toggle(faq.id)}
                className="w-full flex items-center justify-between p-5 text-left"
                id={`faq-${faq.id}`}
              >
                <span className="font-medium text-surface-800 dark:text-white text-sm pr-4">
                  {lang === 'ta' ? faq.questionTamil : faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openId === faq.id ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="shrink-0"
                >
                  <ChevronDown className="w-5 h-5 text-surface-400" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openId === faq.id && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 pt-0">
                      <p className="text-sm text-surface-500 dark:text-surface-400 leading-relaxed">
                        {lang === 'ta' ? faq.answerTamil : faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
