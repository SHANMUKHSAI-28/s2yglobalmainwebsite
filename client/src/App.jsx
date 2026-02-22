import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState, useCallback } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import FloatingElements from './components/FloatingElements';
import NoiseOverlay from './components/NoiseOverlay';
import Home from './pages/Home';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import Philosophy from './pages/Philosophy';
import Technology from './pages/Technology';
import Governance from './pages/Governance';
import Media from './pages/Media';
import Careers from './pages/Careers';
import Contact from './pages/Contact';

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

  return (
    <>
      <Preloader onComplete={handlePreloaderComplete} />
      {!loading && (
        <>
          <CustomCursor />
          <ScrollProgress />
          <FloatingElements />
          <NoiseOverlay />
          <ScrollToTop />
          <Navbar />
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
              <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
              <Route path="/portfolio" element={<PageWrapper><Portfolio /></PageWrapper>} />
              <Route path="/philosophy" element={<PageWrapper><Philosophy /></PageWrapper>} />
              <Route path="/technology" element={<PageWrapper><Technology /></PageWrapper>} />
              <Route path="/governance" element={<PageWrapper><Governance /></PageWrapper>} />
              <Route path="/media" element={<PageWrapper><Media /></PageWrapper>} />
              <Route path="/careers" element={<PageWrapper><Careers /></PageWrapper>} />
              <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
            </Routes>
          </AnimatePresence>
          <Footer />
        </>
      )}
    </>
  );
}

export default App;
