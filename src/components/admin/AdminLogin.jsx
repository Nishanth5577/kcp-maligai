import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Store, Eye, EyeOff, ArrowLeft, Key, CheckCircle, AlertCircle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin({ onLogin }) {
  const navigate = useNavigate();
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const [showPin, setShowPin] = useState(false);
  
  // Change PIN State
  const [isChangingPin, setIsChangingPin] = useState(false);
  const [currentPin, setCurrentPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [changeError, setChangeError] = useState('');
  const [changeSuccess, setChangeSuccess] = useState(false);
  
  const [showCurrentPin, setShowCurrentPin] = useState(false);
  const [showNewPin, setShowNewPin] = useState(false);
  const [showConfirmPin, setShowConfirmPin] = useState(false);

  const { t } = useLanguage();

  const defaultPin = import.meta.env.VITE_ADMIN_PIN || '1234';

  const getCorrectPin = () => {
    try {
      return localStorage.getItem('kcp-admin-pin') || defaultPin;
    } catch {
      return defaultPin;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const correctPin = getCorrectPin();
    if (pin === correctPin) {
      sessionStorage.setItem('kcp-admin-auth', 'true');
      onLogin();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
      setPin('');
    }
  };

  const handleSavePin = (e) => {
    e.preventDefault();
    setChangeError('');

    const activeCorrectPin = getCorrectPin();

    if (currentPin !== activeCorrectPin) {
      setChangeError(t('wrongCurrentPin'));
      return;
    }

    if (newPin.length < 4 || newPin.length > 6) {
      setChangeError(t('pinLengthError'));
      return;
    }

    if (newPin !== confirmPin) {
      setChangeError(t('pinMismatchError'));
      return;
    }

    try {
      localStorage.setItem('kcp-admin-pin', newPin);
      setChangeSuccess(true);
      setTimeout(() => {
        setIsChangingPin(false);
        setChangeSuccess(false);
        setCurrentPin('');
        setNewPin('');
        setConfirmPin('');
        setPin('');
      }, 2000);
    } catch (err) {
      setChangeError('Failed to save PIN');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-900 via-surface-950 to-primary-950 flex items-center justify-center p-4 relative">
      {/* Floating Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white text-sm font-medium transition-all cursor-pointer backdrop-blur-md"
      >
        <ArrowLeft className="w-4 h-4" />
        {t('backToHome')}
      </motion.button>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-sm"
      >
        <div className="text-center mb-8">
          <motion.div
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="w-16 h-16 mx-auto rounded-2xl gradient-primary flex items-center justify-center shadow-2xl shadow-primary-500/30 mb-4"
          >
            <Store className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-2xl font-black text-white font-[var(--font-heading)]">KCP Maligai</h1>
          <p className="text-sm text-surface-400 mt-1">{t('adminDashboard')}</p>
        </div>

        <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 shadow-2xl overflow-hidden">
          <AnimatePresence mode="wait">
            {!isChangingPin ? (
              <motion.div
                key="login-form"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-primary-500/20 flex items-center justify-center">
                    <Lock className="w-5 h-5 text-primary-400" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-white">{t('adminAccess')}</h2>
                    <p className="text-xs text-surface-400">{t('enterPin')}</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <input
                      type={showPin ? 'text' : 'password'}
                      value={pin}
                      onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      placeholder={t('pinPlaceholder')}
                      className={`w-full px-4 py-3.5 rounded-xl bg-white/5 border-2 ${
                        error ? 'border-red-500 animate-[shake_0.3s_ease-in-out]' : 'border-white/10 focus:border-primary-500'
                      } text-white text-center text-2xl tracking-[0.5em] font-mono placeholder-surface-500 focus:outline-none transition-all`}
                      autoFocus
                      id="admin-pin"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPin(!showPin)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-surface-400 hover:text-white transition-colors"
                    >
                      {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-400 text-xs text-center font-medium"
                    >
                      {t('invalidPinError')}
                    </motion.p>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl gradient-primary text-white font-bold text-sm hover:shadow-lg hover:shadow-primary-500/30 transition-all cursor-pointer"
                  >
                    {t('unlockBtn')}
                  </button>
                </form>

                <div className="flex flex-col gap-2 mt-6 border-t border-white/5 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsChangingPin(true);
                      setChangeError('');
                      setChangeSuccess(false);
                    }}
                    className="text-xs text-primary-400 hover:text-primary-300 font-medium transition-colors cursor-pointer flex items-center justify-center gap-1.5 hover:underline"
                  >
                    <Key className="w-3.5 h-3.5" />
                    {t('changePin')}
                  </button>
                  <p className="text-[10px] text-surface-500 text-center">{t('defaultPinHint').replace('1234', defaultPin)}</p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="change-pin-form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-primary-500/20 flex items-center justify-center">
                    <Key className="w-5 h-5 text-primary-400" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-white">{t('changePinTitle')}</h2>
                    <p className="text-xs text-surface-400">Update your access credential</p>
                  </div>
                </div>

                {changeSuccess ? (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center justify-center py-8 text-center"
                  >
                    <CheckCircle className="w-12 h-12 text-emerald-400 mb-3" />
                    <p className="text-emerald-400 font-bold text-sm">{t('pinChangedSuccess')}</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSavePin} className="space-y-4">
                    {/* Current PIN */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-surface-300 block">{t('currentPin')}</label>
                      <div className="relative">
                        <input
                          type={showCurrentPin ? 'text' : 'password'}
                          value={currentPin}
                          onChange={(e) => setCurrentPin(e.target.value.replace(/\D/g, '').slice(0, 6))}
                          className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 focus:border-primary-500 text-white text-lg tracking-[0.2em] font-mono focus:outline-none transition-all"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowCurrentPin(!showCurrentPin)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-surface-400 hover:text-white transition-colors"
                        >
                          {showCurrentPin ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    {/* New PIN */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-surface-300 block">{t('newPin')}</label>
                      <div className="relative">
                        <input
                          type={showNewPin ? 'text' : 'password'}
                          value={newPin}
                          onChange={(e) => setNewPin(e.target.value.replace(/\D/g, '').slice(0, 6))}
                          className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 focus:border-primary-500 text-white text-lg tracking-[0.2em] font-mono focus:outline-none transition-all"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPin(!showNewPin)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-surface-400 hover:text-white transition-colors"
                        >
                          {showNewPin ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    {/* Confirm PIN */}
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-surface-300 block">{t('confirmPin')}</label>
                      <div className="relative">
                        <input
                          type={showConfirmPin ? 'text' : 'password'}
                          value={confirmPin}
                          onChange={(e) => setConfirmPin(e.target.value.replace(/\D/g, '').slice(0, 6))}
                          className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 focus:border-primary-500 text-white text-lg tracking-[0.2em] font-mono focus:outline-none transition-all"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPin(!showConfirmPin)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-surface-400 hover:text-white transition-colors"
                        >
                          {showConfirmPin ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    {changeError && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-1.5 text-red-400 text-xs font-medium bg-red-500/10 p-2.5 rounded-xl border border-red-500/20"
                      >
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{changeError}</span>
                      </motion.div>
                    )}

                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          setIsChangingPin(false);
                          setChangeError('');
                          setCurrentPin('');
                          setNewPin('');
                          setConfirmPin('');
                        }}
                        className="py-2.5 rounded-xl border border-white/10 text-white text-xs font-bold hover:bg-white/5 transition-all cursor-pointer text-center"
                      >
                        {t('cancelBtn')}
                      </button>
                      <button
                        type="submit"
                        className="py-2.5 rounded-xl gradient-primary text-white text-xs font-bold hover:shadow-lg hover:shadow-primary-500/30 transition-all cursor-pointer text-center"
                      >
                        {t('saveChanges')}
                      </button>
                    </div>
                  </form>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
