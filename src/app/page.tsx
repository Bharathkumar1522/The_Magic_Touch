"use client"

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { ReactLenis } from 'lenis/react';
import { usePerformance } from '../components/hooks/usePerformance';

import { LoadingScreen } from '../components/LoadingScreen';
import { Navbar } from '../components/Navbar';
import { HeroSection } from '../components/HeroSection';
import { BackToTop } from '../components/BackToTop';

const SignatureStyles = dynamic(() => import('../components/SignatureStyles').then(mod => mod.SignatureStyles), { ssr: false });
const ServicesSection = dynamic(() => import('../components/ServicesSection').then(mod => mod.ServicesSection), { ssr: false });
const PhotoGallery = dynamic(() => import('../components/PhotoGallery').then(mod => mod.PhotoGallery), { ssr: false });
const TestimonialsSection = dynamic(() => import('../components/TestimonialsSection').then(mod => mod.TestimonialsSection), { ssr: false });
const ContactSection = dynamic(() => import('../components/ContactSection').then(mod => mod.ContactSection), { ssr: false });
const Footer = dynamic(() => import('../components/Footer').then(mod => mod.Footer), { ssr: false });

export default function Page() {
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const performanceMetrics = usePerformance();

  useEffect(() => {
    // Wait for critical resources
    const checkFontsLoaded = async () => {
      try {
        await document.fonts.ready;
      } catch {}
    };

    const preloadHeroImage = async () => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = "https://res.cloudinary.com/dyecmgvcy/image/upload/f_auto,q_auto,w_1920/v1757494544/Magictouch/V_P09800_copy_1_z5lsg5.webp";
        img.onload = resolve;
        img.onerror = resolve;
      });
    };

    const initializeApp = async () => {
      await Promise.all([
        checkFontsLoaded(),
        preloadHeroImage()
      ]);
      setIsReady(true);
    };

    initializeApp();

    const fallbackTimer = setTimeout(() => {
      setIsReady(true);
    }, 4000);

    return () => clearTimeout(fallbackTimer);
  }, []);

  return (
    <ReactLenis root options={{ lerp: 0.07, duration: 1.2, smoothWheel: true }}>
      <div className="app-wrapper flex flex-col min-h-[100dvh]">
        
        {!isLoadingComplete && (
          <LoadingScreen
            isReady={isReady}
            onComplete={() => setIsLoadingComplete(true)}
          />
        )}

        {isLoadingComplete && (
          <div>
            <Navbar />
            <div id="home">
              <HeroSection />
            </div>
            <SignatureStyles />
            <ServicesSection />
            <PhotoGallery />
            <TestimonialsSection />
            <ContactSection />
            <Footer />
            <BackToTop />
          </div>
        )}
      </div>
    </ReactLenis>
  );
}
