import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { testimonials } from '../../data/testimonials';
import SectionHeading from '../ui/SectionHeading';

export default function Testimonials() {
  const { t, lang } = useLanguage();
  const [current, setCurrent] = useState(0);
  const visibleCount = typeof window !== 'undefined' && window.innerWidth >= 768 ? 3 : 1;

  const next = () => setCurrent(prev => (prev + 1) % testimonials.length);
  const prev = () => setCurrent(prev => (prev - 1 + testimonials.length) % testimonials.length);

  const getVisibleTestimonials = () => {
    const result = [];
    for (let i = 0; i < Math.min(visibleCount, testimonials.length); i++) {
      result.push(testimonials[(current + i) % testimonials.length]);
    }
    return result;
  };

  return (
    <section className="section-padding bg-surface-50 dark:bg-surface-950" id="testimonials-section">
      <div className="container-custom">
        <SectionHeading title={t('testimonialsTitle')} subtitle={t('testimonialsSubtitle')} />

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {getVisibleTestimonials().map((testimonial, i) => (
              <motion.div
                key={`${current}-${i}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 shadow-sm"
              >
                <Quote className="w-8 h-8 text-primary-200 dark:text-primary-800 mb-4" />
                <p className="text-sm text-surface-600 dark:text-surface-300 leading-relaxed mb-5">
                  "{lang === 'ta' ? testimonial.textTamil : testimonial.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-white font-bold text-sm">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-surface-800 dark:text-white">
                      {lang === 'ta' ? testimonial.nameTamil : testimonial.name}
                    </p>
                    <p className="text-xs text-surface-400">{testimonial.location}</p>
                  </div>
                  <div className="ml-auto flex">
                    {Array.from({ length: testimonial.rating }).map((_, j) => (
                      <Star key={j} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-3 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 flex items-center justify-center hover:border-primary-400 transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5 text-surface-600 dark:text-surface-300" />
            </button>
            <div className="flex items-center gap-1.5">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === current ? 'bg-primary-500 w-6' : 'bg-surface-300 dark:bg-surface-600'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 rounded-xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 flex items-center justify-center hover:border-primary-400 transition-colors"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5 text-surface-600 dark:text-surface-300" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
