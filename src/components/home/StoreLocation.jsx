import { motion } from 'framer-motion';
import { MapPin, Clock, Phone, Mail, Navigation } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import SectionHeading from '../ui/SectionHeading';

export default function StoreLocation() {
  const { lang } = useLanguage();

  const businessHoursSlots = [
    {
      day: lang === 'ta' ? 'திங்கள் - சனிக்கிழமை' : 'Monday - Saturday',
      time: lang === 'ta' ? 'காலை 7:00 - இரவு 10:00' : '7:00 AM - 10:00 PM',
      active: true
    },
    {
      day: lang === 'ta' ? 'ஞாயிற்றுக்கிழமை' : 'Sunday',
      time: lang === 'ta' ? 'காலை 8:00 - இரவு 9:00' : '8:00 AM - 9:00 PM',
      active: true
    },
    {
      day: lang === 'ta' ? 'அரசு விடுமுறை நாட்கள்' : 'Public Holidays',
      time: lang === 'ta' ? 'காலை 9:00 - மாலை 6:00' : '9:00 AM - 6:00 PM',
      active: false
    },
  ];

  return (
    <section className="section-padding bg-white dark:bg-surface-900" id="store-location">
      <div className="container-custom">
        <SectionHeading
          title={lang === 'ta' ? 'எங்கள் கடைக்கு வருகை தாருங்கள்' : 'Visit Our Store'}
          subtitle={lang === 'ta' ? 'உங்களை காண்பதில் மகிழ்ச்சி அடைகிறோம்! எங்களை வந்து சந்தியுங்கள்.' : "We'd love to see you! Come visit us at our location."}
        />

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Info Cards */}
          <div className="space-y-4">
            {/* Address */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-5 rounded-2xl bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 flex gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <div>
                <h3 className="font-bold text-surface-800 dark:text-white text-sm mb-1">
                  {lang === 'ta' ? 'கடை முகவரி' : 'Store Address'}
                </h3>
                <p className="text-sm text-surface-600 dark:text-surface-400">
                  {lang === 'ta' ? (
                    <>
                      123, மெயின் ரோடு, அண்ணா நகர்<br />
                      சென்னை - 600040, தமிழ்நாடு
                    </>
                  ) : (
                    <>
                      123, Main Road, Anna Nagar<br />
                      Chennai - 600040, Tamil Nadu
                    </>
                  )}
                </p>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-primary-600 dark:text-primary-400 mt-2 hover:underline"
                >
                  <Navigation className="w-3 h-3" />
                  {lang === 'ta' ? 'திசைகளைப் பெறுங்கள்' : 'Get Directions'}
                </a>
              </div>
            </motion.div>

            {/* Business Hours */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-5 rounded-2xl bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-accent-500/10 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-accent-600 dark:text-accent-400" />
                </div>
                <h3 className="font-bold text-surface-800 dark:text-white text-sm">
                  {lang === 'ta' ? 'வணிக நேரம்' : 'Business Hours'}
                </h3>
              </div>
              <div className="space-y-2">
                {businessHoursSlots.map((slot, i) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b border-surface-100 dark:border-surface-700 last:border-0">
                    <span className="text-sm text-surface-600 dark:text-surface-400">{slot.day}</span>
                    <span className={`text-sm font-semibold ${slot.active ? 'text-primary-600 dark:text-primary-400' : 'text-surface-500'}`}>
                      {slot.time}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-2 gap-3"
            >
              <a
                href="tel:+919942424050"
                className="p-4 rounded-2xl bg-primary-500/5 dark:bg-primary-500/10 border border-primary-200 dark:border-primary-500/20 text-center group card-hover"
              >
                <Phone className="w-5 h-5 text-primary-600 dark:text-primary-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-xs font-bold text-surface-800 dark:text-white">
                  {lang === 'ta' ? 'அழையுங்கள்' : 'Call Us'}
                </p>
                <p className="text-[10px] text-surface-400 mt-0.5">+91 99424 24050</p>
              </a>
              <a
                href="mailto:kcp7673@gmail.com"
                className="p-4 rounded-2xl bg-accent-500/5 dark:bg-accent-500/10 border border-accent-200 dark:border-accent-500/20 text-center group card-hover"
              >
                <Mail className="w-5 h-5 text-accent-600 dark:text-accent-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-xs font-bold text-surface-800 dark:text-white">
                  {lang === 'ta' ? 'மின்னஞ்சல்' : 'Email'}
                </p>
                <p className="text-[10px] text-surface-400 mt-0.5">kcp7673@gmail.com</p>
              </a>
            </motion.div>
          </div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden border border-surface-200 dark:border-surface-700 h-full min-h-[400px]"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.0080692574886!2d80.2098!3d13.0855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDA1JzA3LjgiTiA4MMKwMTInMzUuMyJF!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '400px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={lang === 'ta' ? 'KCP மளிகை இருப்பிடம்' : 'KCP Maligai Location'}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
