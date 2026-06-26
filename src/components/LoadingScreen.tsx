import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

interface LoadingScreenProps {
  isReady: boolean;
  onComplete: () => void;
}

export function LoadingScreen({ isReady, onComplete }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  // Progress tracker logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (!isReady) {
      // Simulate loading progress up to 85%
      interval = setInterval(() => {
        setProgress(p => {
          if (p >= 85) {
            clearInterval(interval);
            return p;
          }
          return p + Math.floor(Math.random() * 8) + 2;
        });
      }, 150);
    } else {
      // When ready, jump to 100%
      setProgress(100);
    }
    return () => clearInterval(interval);
  }, [isReady]);

  // Initial Entry Animations
  useGSAP(() => {
    gsap.from(".loader-logo", {
      scale: 0.9,
      opacity: 0,
      y: 20,
      duration: 1.6,
      ease: "expo.out"
    });

    gsap.from(".loader-info", {
      opacity: 0,
      y: 10,
      duration: 0.8,
      delay: 0.4,
      ease: "expo.out"
    });

    // Floating particles animation
    const particles = gsap.utils.toArray(".particle");
    particles.forEach((particle: any) => {
      gsap.fromTo(particle, 
        { y: "100vh", opacity: 0, x: () => Math.random() * window.innerWidth },
        { 
          y: "-10vh", 
          opacity: 1, 
          duration: 3 + Math.random() * 3, 
          delay: Math.random() * 2, 
          repeat: -1, 
          ease: "none" 
        }
      );
    });
  }, { scope: containerRef });

    // Handle Exit Animation when isReady is true
  useGSAP(() => {
    if (isReady) {
      const tl = gsap.timeline();
      
      // First make the bar hit 100% smoothly
      tl.to(barRef.current, { width: "100%", duration: 0.6, ease: "expo.out" })
        // Then fade everything out
        .to(".loader-logo", { opacity: 0, y: -20, duration: 0.5, ease: "power2.in" })
        .to(".loader-info", { opacity: 0, duration: 0.3 }, "-=0.3")
        .to(containerRef.current, {
          opacity: 0,
          duration: 0.6,
          ease: "power2.inOut",
          onComplete: () => {
            onComplete();
          }
        }, "-=0.2");
    }
  }, { dependencies: [isReady], scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-gradient-to-br from-ivory via-soft-blush to-cream flex items-center justify-center optimize-gpu"
    >
      <div className="text-center w-full max-w-sm px-6 relative z-10">
        {/* Main Logo */}
        <div className="loader-logo mb-12">
          <h1 className="signature-name text-5xl md:text-7xl text-deep-maroon mb-2 drop-shadow-sm">
            Bhavani Akurathi
          </h1>
          <p className="script-name text-xl md:text-2xl text-deep-maroon/80 drop-shadow-sm">
            Bhavs Beauty Studio
          </p>
        </div>

        {/* Progress Bar & Info */}
        <div className="loader-info">
          <div className="w-full mx-auto mb-3">
            <div className="h-1 bg-deep-maroon/10 rounded-full overflow-hidden relative">
              <div
                ref={barRef}
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-rose-gold to-deep-maroon rounded-full w-0"
              />
            </div>
          </div>
          
          <div className="flex justify-center items-center text-deep-maroon/80 text-xs md:text-sm font-medium tracking-wide">
            <span>Loading aesthetics...</span>
          </div>
        </div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="particle absolute w-2 h-2 md:w-3 md:h-3 bg-rose-gold/30 rounded-full"
          />
        ))}
      </div>
    </div>
  );
}