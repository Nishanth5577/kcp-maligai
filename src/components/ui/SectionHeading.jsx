import { motion } from 'framer-motion';

export default function SectionHeading({ title, subtitle, center = true, light = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className={`mb-10 md:mb-14 ${center ? 'text-center' : ''}`}
    >
      <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold font-[var(--font-heading)] mb-3 ${
        light ? 'text-white' : 'text-surface-800 dark:text-white'
      }`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-sm sm:text-base max-w-2xl ${center ? 'mx-auto' : ''} ${
          light ? 'text-white/70' : 'text-surface-500 dark:text-surface-400'
        }`}>
          {subtitle}
        </p>
      )}
      <div className={`mt-4 flex gap-1.5 ${center ? 'justify-center' : ''}`}>
        <span className="w-8 h-1 rounded-full bg-primary-500" />
        <span className="w-3 h-1 rounded-full bg-accent-500" />
        <span className="w-1.5 h-1 rounded-full bg-primary-300" />
      </div>
    </motion.div>
  );
}
