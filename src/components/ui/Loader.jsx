import { motion } from 'framer-motion';

export default function Loader({ type = 'spinner', count = 4 }) {
  if (type === 'card') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="p-4 rounded-2xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 space-y-4 animate-pulse"
          >
            {/* Image Placeholder */}
            <div className="w-full h-48 rounded-xl bg-surface-200 dark:bg-surface-750" />
            {/* Category Placeholder */}
            <div className="h-4 bg-surface-200 dark:bg-surface-750 rounded-lg w-1/4" />
            {/* Title Placeholder */}
            <div className="h-6 bg-surface-200 dark:bg-surface-750 rounded-lg w-3/4" />
            {/* Rating Placeholder */}
            <div className="h-4 bg-surface-200 dark:bg-surface-750 rounded-lg w-1/3" />
            {/* Footer Placeholder */}
            <div className="flex justify-between items-center pt-2">
              <div className="h-6 bg-surface-200 dark:bg-surface-750 rounded-lg w-1/3" />
              <div className="h-10 bg-surface-200 dark:bg-surface-750 rounded-xl w-1/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'detail') {
    return (
      <div className="space-y-6 animate-pulse p-6 rounded-2xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700">
        <div className="h-8 bg-surface-200 dark:bg-surface-750 rounded-lg w-1/3" />
        <div className="h-4 bg-surface-200 dark:bg-surface-750 rounded-lg w-1/4" />
        <div className="space-y-3 pt-4 border-t border-surface-200 dark:border-surface-700">
          <div className="h-6 bg-surface-200 dark:bg-surface-750 rounded-lg w-full" />
          <div className="h-6 bg-surface-200 dark:bg-surface-750 rounded-lg w-5/6" />
          <div className="h-6 bg-surface-200 dark:bg-surface-750 rounded-lg w-4/5" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
        className="w-12 h-12 border-4 border-primary-500/20 border-t-primary-600 rounded-full"
      />
      <p className="text-sm text-surface-500 mt-4 animate-pulse">Loading details...</p>
    </div>
  );
}
