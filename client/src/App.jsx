import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState, useCallback } from 'react';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import FloatingElements from './components/FloatingElements';
import NoiseOverlay from './components/NoiseOverlay';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import AuthModal from './components/AuthModal';
import Home from './pages/Home';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import Philosophy from './pages/Philosophy';
import Technology from './pages/Technology';
import Governance from './pages/Governance';
import Media from './pages/Media';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import PureStore from './pages/PureStore';
import Account from './pages/Account';
import Terms from './pages/Terms';
import PrivacyPolicy from './pages/PrivacyPolicy';
import RefundPolicy from './pages/RefundPolicy';
import ShippingPolicy from './pages/ShippingPolicy';
import NotFound from './pages/NotFound';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 30,
    filter: 'blur(4px)',
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    filter: 'blur(4px)',
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 1, 1],
    },
  },
};

function PageWrapper({ children }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ position: 'relative', width: '100%' }}
    >
      {children}
    </motion.div>
  );
}

function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  const handlePreloaderComplete = useCallback(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [loading]);

  return (
    <AuthProvider>
      <CartProvider>
        <Preloader onComplete={handlePreloaderComplete} />
        <CustomCursor />
        <ScrollProgress />
        <FloatingElements />
        <NoiseOverlay />
        <ScrollToTop />
        <Navbar />
        <CartDrawer />
        <CheckoutModal />
        <AuthModal />
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
            <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
            <Route path="/portfolio" element={<PageWrapper><Portfolio /></PageWrapper>} />
            <Route path="/pure" element={<PageWrapper><PureStore /></PageWrapper>} />
            <Route path="/store" element={<PageWrapper><PureStore /></PageWrapper>} />
            <Route path="/account" element={<PageWrapper><Account /></PageWrapper>} />
            <Route path="/philosophy" element={<PageWrapper><Philosophy /></PageWrapper>} />
            <Route path="/technology" element={<PageWrapper><Technology /></PageWrapper>} />
            <Route path="/governance" element={<PageWrapper><Governance /></PageWrapper>} />
            <Route path="/media" element={<PageWrapper><Media /></PageWrapper>} />
            <Route path="/careers" element={<PageWrapper><Careers /></PageWrapper>} />
            <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
            <Route path="/terms" element={<PageWrapper><Terms /></PageWrapper>} />
            <Route path="/privacy" element={<PageWrapper><PrivacyPolicy /></PageWrapper>} />
            <Route path="/refund-policy" element={<PageWrapper><RefundPolicy /></PageWrapper>} />
            <Route path="/refund" element={<PageWrapper><RefundPolicy /></PageWrapper>} />
            <Route path="/shipping-policy" element={<PageWrapper><ShippingPolicy /></PageWrapper>} />
            <Route path="/shipping" element={<PageWrapper><ShippingPolicy /></PageWrapper>} />
            <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
          </Routes>
        </AnimatePresence>
        <Footer />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
