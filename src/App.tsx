import { Suspense, lazy, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LoadingScreen } from './components/LoadingScreen';
import { SEOHead } from './components/SEOHead';
import { usePerformance } from './components/hooks/usePerformance';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';

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
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const performanceMetrics = usePerformance();

  useEffect(() => {
    // Check if fonts are loaded
    const checkFontsLoaded = async () => {
      try {
        await document.fonts.ready;
        // Small delay to ensure fonts are properly applied
        setTimeout(() => {
          setFontsLoaded(true);
        }, 300);
      } catch {
        // Fallback if font loading fails
        setTimeout(() => {
          setFontsLoaded(true);
        }, 1500);
      }
    };

    checkFontsLoaded();

    // Fallback: Force show content after 4 seconds regardless
    const fallbackTimer = setTimeout(() => {
      if (!isLoadingComplete) {
        setIsLoadingComplete(true);
      }
    }, 4000);

    return () => clearTimeout(fallbackTimer);
  }, [isLoadingComplete]);

  const handleLoadingComplete = () => {
    setIsLoadingComplete(true);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-ivory via-soft-blush to-cream">
      <SEOHead />
      
      <AnimatePresence mode="wait">
        {!isLoadingComplete && (
          <LoadingScreen 
            isLoading={fontsLoaded} 
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
        >
          <Navbar />
          
          <motion.div 
            id="home"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <HeroSection />
          </motion.div>

          <Suspense fallback={<ComponentSkeleton />}>
            <motion.div 
              id="styles"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <SignatureStyles />
            </motion.div>
          </Suspense>

          <Suspense fallback={<ComponentSkeleton />}>
            <motion.div 
              id="services"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <ServicesSection />
            </motion.div>
          </Suspense>

          <Suspense fallback={<ComponentSkeleton />}>
            <motion.div 
              id="gallery"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <PhotoGallery />
            </motion.div>
          </Suspense>

          <Suspense fallback={<ComponentSkeleton />}>
            <motion.div 
              id="testimonials"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <TestimonialsSection />
            </motion.div>
          </Suspense>

          <Suspense fallback={<ComponentSkeleton />}>
            <motion.div 
              id="contact"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <ContactSection />
            </motion.div>
          </Suspense>

          <Suspense fallback={<ComponentSkeleton />}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <Footer />
            </motion.div>
          </Suspense>
        </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}