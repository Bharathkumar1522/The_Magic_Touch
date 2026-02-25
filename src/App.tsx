import { Suspense, lazy, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LoadingScreen } from './components/LoadingScreen';
import { SEOHead } from './components/SEOHead';
import { usePerformance } from './components/hooks/usePerformance';
import { ReactLenis, useLenis } from 'lenis/react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { BackToTop } from './components/BackToTop';

// Lazy load components for better performance
const SignatureStyles = lazy(() => import('./components/SignatureStyles').then(module => ({ default: module.SignatureStyles })));
const ServicesSection = lazy(() => import('./components/ServicesSection').then(module => ({ default: module.ServicesSection })));
const PhotoGallery = lazy(() => import('./components/PhotoGallery').then(module => ({ default: module.PhotoGallery })));
const TestimonialsSection = lazy(() => import('./components/TestimonialsSection').then(module => ({ default: module.TestimonialsSection })));
const ContactSection = lazy(() => import('./components/ContactSection').then(module => ({ default: module.ContactSection })));
const Footer = lazy(() => import('./components/Footer').then(module => ({ default: module.Footer })));

// Component skeleton for loading states
function ComponentSkeleton() {
  return (
    <div className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="animate-pulse">
          <div className="h-8 bg-blush-pink/30 rounded w-1/3 mx-auto mb-4"></div>
          <div className="h-4 bg-blush-pink/20 rounded w-2/3 mx-auto mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-64 bg-blush-pink/20 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const performanceMetrics = usePerformance();

  useEffect(() => {
    // Check if fonts are loaded using the document.fonts API
    const checkFontsLoaded = async () => {
      try {
        await document.fonts.ready;
      } catch {
        // Silently proceed if font API fails or times out
      }
    };

    // Preload the First Hero Image (LCP Asset)
    const preloadHeroImage = async () => {
      return new Promise((resolve) => {
        const img = new Image();
        // The primary LCP image from HeroSection with Cloudinary optimizations
        img.src = "https://res.cloudinary.com/dyecmgvcy/image/upload/f_auto,q_auto,w_1920/v1757494544/Magictouch/V_P09800_copy_1_z5lsg5.webp";
        img.onload = resolve;
        img.onerror = resolve; // proceed even if it fails
      });
    };

    const initializeApp = async () => {
      // Wait for both critical assets to load before signaling ready
      await Promise.all([
        checkFontsLoaded(),
        preloadHeroImage()
      ]);
      setIsReady(true);
    };

    initializeApp();

    // Fallback: Force ready state after 4 seconds to prevent infinite lock
    const fallbackTimer = setTimeout(() => {
      setIsReady(true);
    }, 4000);

    return () => clearTimeout(fallbackTimer);
  }, []);

  const handleLoadingComplete = () => {
    setIsLoadingComplete(true);
  };

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true, syncTouch: false, touchMultiplier: 0 }}>
      {/* App Wrapper */}
      <div className="app-wrapper flex flex-col min-h-[100dvh]">
        <SEOHead />

        <AnimatePresence mode="wait">
          {!isLoadingComplete && (
            <LoadingScreen
              isReady={isReady}
              onComplete={handleLoadingComplete}
            />
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {isLoadingComplete && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="optimize-gpu"
            >
              <Navbar />

              <motion.div
                id="home"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 50, damping: 20, delay: 0.1 }}
                className="optimize-gpu"
              >
                <HeroSection />
              </motion.div>

              <Suspense fallback={<ComponentSkeleton />}>
                <motion.div
                  id="styles"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "0px 0px -100px 0px", amount: 0.1 }}
                  transition={{ type: "spring", stiffness: 60, damping: 20 }}
                  className="optimize-gpu"
                >
                  <SignatureStyles />
                </motion.div>
              </Suspense>

              <Suspense fallback={<ComponentSkeleton />}>
                <motion.div
                  id="services"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "0px 0px -100px 0px", amount: 0.1 }}
                  transition={{ type: "spring", stiffness: 60, damping: 20 }}
                  className="optimize-gpu"
                >
                  <ServicesSection />
                </motion.div>
              </Suspense>

              <Suspense fallback={<ComponentSkeleton />}>
                <motion.div
                  id="gallery"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "0px 0px -100px 0px", amount: 0.1 }}
                  transition={{ type: "spring", stiffness: 60, damping: 20 }}
                  className="optimize-gpu"
                >
                  <PhotoGallery />
                </motion.div>
              </Suspense>

              <Suspense fallback={<ComponentSkeleton />}>
                <motion.div
                  id="testimonials"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "0px 0px -100px 0px", amount: 0.1 }}
                  transition={{ type: "spring", stiffness: 60, damping: 20 }}
                  className="optimize-gpu"
                >
                  <TestimonialsSection />
                </motion.div>
              </Suspense>

              <Suspense fallback={<ComponentSkeleton />}>
                <motion.div
                  id="contact"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "0px 0px -100px 0px", amount: 0.1 }}
                  transition={{ type: "spring", stiffness: 60, damping: 20 }}
                  className="optimize-gpu"
                >
                  <ContactSection />
                </motion.div>
              </Suspense>

              <Suspense fallback={<ComponentSkeleton />}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "0px 0px -100px 0px", amount: 0.1 }}
                  transition={{ type: "spring", stiffness: 60, damping: 20 }}
                  className="optimize-gpu"
                >
                  <Footer />
                </motion.div>
              </Suspense>

              <BackToTop />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ReactLenis>
  );
}