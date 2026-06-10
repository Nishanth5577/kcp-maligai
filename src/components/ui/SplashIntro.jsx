import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Store } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function SplashIntro() {
  const { lang } = useLanguage();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const titleText = "KCP MALIGAI";
  const subtitleText = lang === 'ta' 
    ? "உங்கள் நம்பகமான அருகிலுள்ள மளிகை கடை" 
    : "Your Trusted Neighborhood Grocery Store";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        damping: 10,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, transition: { duration: 0.6, ease: 'easeInOut' } }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-surface-900 via-surface-950 to-primary-950 dark:from-surface-950 dark:via-black dark:to-primary-950 overflow-hidden"
    >
      {/* Animated background glowing circles */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center max-w-lg px-4 text-center">
        {/* Emblem/Logo Area */}
        <motion.div
          initial={{ scale: 0, rotate: -180, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ type: 'spring', damping: 15, stiffness: 80, delay: 0.2 }}
          className="relative mb-8"
        >
          {/* Glowing Ring */}
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-primary-500 to-accent-500 opacity-75 blur-md"
          />
          <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-2xl">
            <Store className="w-10 h-10 text-white" />
          </div>
        </motion.div>

        {/* Title Character Animation */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-3xl md:text-5xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white via-primary-100 to-accent-400 font-[var(--font-heading)] mb-3 flex justify-center flex-wrap"
        >
          {titleText.split('').map((char, index) => (
            <motion.span
              key={index}
              variants={letterVariants}
              className={char === ' ' ? 'mr-3' : ''}
            >
              {char}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-xs md:text-sm font-semibold tracking-wide text-primary-200/70 mb-10 max-w-sm leading-relaxed"
        >
          {subtitleText}
        </motion.p>

        {/* Progress Loader Bar */}
        <div className="w-48 h-1 rounded-full bg-white/10 overflow-hidden relative">
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-gradient-to-r from-primary-500 to-accent-500"
          />
        </div>

        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 1.5 }}
          className="text-[10px] text-white/50 font-mono tracking-widest mt-2 uppercase"
        >
          Loading {Math.min(100, Math.floor(progress))}%
        </motion.span>
      </div>
    </motion.div>
  );
}
