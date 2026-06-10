import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Phone, Mail, MapPin, Clock, Send, MessageCircle,
  CheckCircle, MapPinned
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Contact() {
  const { t, lang } = useLanguage();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 3000);
  };

  return (
    <div className="page-transition">
      {/* Spacer for fixed navbar */}
      <div className="h-16 md:h-20" />
      {/* Hero */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-primary-900" />
        <div className="relative container-custom text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-white mb-4 font-[var(--font-heading)]"
          >
            {t('contactTitle')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-primary-100 text-lg"
          >
            {t('contactSubtitle')}
          </motion.p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-12 bg-white dark:bg-surface-900 -mt-8 relative z-10">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: Phone,
                title: t('phone'),
                value: '+91 99424 24050',
                href: 'tel:+919942424050',
                color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
              },
              {
                icon: Mail,
                title: t('email'),
                value: 'kcp7673@gmail.com',
                href: 'mailto:kcp7673@gmail.com',
                color: 'bg-red-500/10 text-red-600 dark:text-red-400',
              },
              {
                icon: MapPin,
                title: t('address'),
                value: '123 Main Road, Anna Nagar, Chennai',
                href: '#map',
                color: 'bg-green-500/10 text-green-600 dark:text-green-400',
              },
              {
                icon: MessageCircle,
                title: t('whatsappOrder'),
                value: 'Chat with us',
                href: `https://wa.me/919942424050?text=${encodeURIComponent('Hi! I would like to know more about KCP Maligai.')}`,
                color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
                external: true,
              },
            ].map((card, i) => (
              <motion.a
                key={card.title}
                href={card.href}
                target={card.external ? '_blank' : undefined}
                rel={card.external ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-5 rounded-2xl bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 card-hover text-center group"
              >
                <div className={`w-12 h-12 mx-auto rounded-xl ${card.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <card.icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-surface-800 dark:text-white text-sm mb-1">{card.title}</h3>
                <p className="text-xs text-surface-500">{card.value}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Form & Info */}
      <section className="section-padding bg-surface-50 dark:bg-surface-950">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-10">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-surface-800 dark:text-white mb-6 font-[var(--font-heading)]">
                {t('sendMessage')}
              </h2>

              {submitted ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="p-8 rounded-2xl bg-primary-50 dark:bg-primary-500/10 border border-primary-200 dark:border-primary-500/20 text-center"
                >
                  <CheckCircle className="w-16 h-16 text-primary-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-primary-700 dark:text-primary-400 mb-2">{t('messageSent')}</h3>
                  <p className="text-sm text-primary-600 dark:text-primary-300">
                    {lang === 'ta' ? 'நாங்கள் 24 மணி நேரத்திற்குள் உங்களைத் தொடர்புகொள்வோம்.' : "We'll get back to you within 24 hours."}
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {[
                    { key: 'name', label: t('yourName'), type: 'text' },
                    { key: 'email', label: t('yourEmail'), type: 'email' },
                    { key: 'phone', label: t('yourPhone'), type: 'tel' },
                  ].map(field => (
                    <div key={field.key}>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        value={formData[field.key]}
                        onChange={(e) => setFormData(prev => ({ ...prev, [field.key]: e.target.value }))}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 text-surface-800 dark:text-surface-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all"
                        id={`contact-${field.key}`}
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">
                      {t('yourMessage')}
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      required
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 text-surface-800 dark:text-surface-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all resize-none"
                      id="contact-message"
                    />
                  </div>
                  <button type="submit" className="btn-primary w-full justify-center">
                    <Send className="w-4 h-4" />
                    {t('send')}
                  </button>
                </form>
              )}
            </motion.div>

            {/* Right Column */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {/* Business Hours */}
              <div className="p-6 rounded-2xl bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-accent-500/10 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-accent-600 dark:text-accent-400" />
                  </div>
                  <h3 className="font-bold text-surface-800 dark:text-white font-[var(--font-heading)]">{t('businessHours')}</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-surface-100 dark:border-surface-700">
                    <span className="text-sm text-surface-600 dark:text-surface-400">{t('monSat')}</span>
                    <span className="text-sm font-medium text-surface-800 dark:text-white">
                      {lang === 'ta' ? 'காலை 7:00 - இரவு 10:00' : '7:00 AM - 10:00 PM'}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-surface-100 dark:border-surface-700">
                    <span className="text-sm text-surface-600 dark:text-surface-400">{t('sunday')}</span>
                    <span className="text-sm font-medium text-surface-800 dark:text-white">
                      {lang === 'ta' ? 'காலை 8:00 - இரவு 9:00' : '8:00 AM - 9:00 PM'}
                    </span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-sm text-surface-600 dark:text-surface-400">
                      {lang === 'ta' ? 'அரசு விடுமுறை நாட்கள்' : 'Public Holidays'}
                    </span>
                    <span className="text-sm font-medium text-surface-800 dark:text-white">
                      {lang === 'ta' ? 'காலை 9:00 - மாலை 6:00' : '9:00 AM - 6:00 PM'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="rounded-2xl overflow-hidden border border-surface-200 dark:border-surface-700" id="map">
                <div className="p-4 bg-white dark:bg-surface-800 flex items-center gap-3">
                  <MapPinned className="w-5 h-5 text-primary-500" />
                  <h3 className="font-bold text-surface-800 dark:text-white font-[var(--font-heading)] text-sm">{t('findUs')}</h3>
                </div>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.0080692574886!2d80.2098!3d13.0855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDA1JzA3LjgiTiA4MMKwMTInMzUuMyJF!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="KCP Maligai Location"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
