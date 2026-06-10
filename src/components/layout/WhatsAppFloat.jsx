import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';

export default function WhatsAppFloat() {
  const [showTooltip, setShowTooltip] = useState(false);

  const whatsappUrl = `https://wa.me/919942424050?text=${encodeURIComponent('Hi! I would like to inquire about products at KCP Maligai.')}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="bg-white dark:bg-surface-800 rounded-2xl shadow-xl p-4 max-w-[240px] border border-surface-200 dark:border-surface-700"
          >
            <button
              onClick={() => setShowTooltip(false)}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-surface-200 dark:bg-surface-700 flex items-center justify-center"
            >
              <X className="w-3 h-3 text-surface-500" />
            </button>
            <p className="text-sm font-medium text-surface-800 dark:text-white mb-1">Have questions?</p>
            <p className="text-xs text-surface-500 mb-3">Chat with us on WhatsApp for any product queries!</p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#25D366] text-white text-sm font-medium hover:bg-[#20BD5C] transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Chat Now
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setShowTooltip(!showTooltip)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-14 h-14 rounded-2xl bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow relative"
        aria-label="WhatsApp Order"
        id="whatsapp-float"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 border-2 border-white dark:border-surface-900 animate-pulse" />
      </motion.button>
    </div>
  );
}
