import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { ProductProvider } from './context/ProductContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import WhatsAppFloat from './components/layout/WhatsAppFloat';
import ScrollToTop from './components/ui/ScrollToTop';
import SplashIntro from './components/ui/SplashIntro';
import Home from './pages/Home';
import Products from './pages/Products';
import About from './pages/About';
import Contact from './pages/Contact';
import Billing from './pages/Billing';
import Admin from './pages/Admin';

function ScrollRestoration() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Layout wrapper that shows Navbar/Footer only for public pages
function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <WhatsAppFloat />
      <ScrollToTop />
    </>
  );
}

function AppContent() {
  const location = useLocation();
  const isSpecialPage = location.pathname === '/billing' || location.pathname === '/admin';
  const [showSplash, setShowSplash] = useState(() => {
    try {
      return sessionStorage.getItem('kcp-splash-shown') !== 'true';
    } catch {
      return true;
    }
  });

  useEffect(() => {
    if (showSplash) {
      const timer = setTimeout(() => {
        setShowSplash(false);
        try {
          sessionStorage.setItem('kcp-splash-shown', 'true');
        } catch { /* ignored */ }
      }, 2600);
      return () => clearTimeout(timer);
    }
  }, [showSplash]);

  return (
    <div className="min-h-screen bg-white dark:bg-surface-900 text-surface-800 dark:text-surface-200 transition-colors duration-300">
      <ScrollRestoration />
      <AnimatePresence mode="wait">
        {showSplash && <SplashIntro key="splash" />}
      </AnimatePresence>

      {!showSplash && (
        isSpecialPage ? (
          <Routes>
            <Route path="/billing" element={<Billing />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        ) : (
          <PublicLayout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </PublicLayout>
        )
      )}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <ProductProvider>
          <CartProvider>
            <AppContent />
          </CartProvider>
        </ProductProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
