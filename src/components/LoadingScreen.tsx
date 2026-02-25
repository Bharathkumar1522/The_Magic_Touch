import { useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  isReady: boolean;
  onComplete: () => void;
}

export function LoadingScreen({ isReady, onComplete }: LoadingScreenProps) {

  // As soon as the app signals it's ready, trigger completion smoothly
  useEffect(() => {
    if (isReady) {
      // Give the bar a tiny moment to hit 100% visibly
      const timer = setTimeout(() => {
        onComplete();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isReady, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 bg-gradient-to-br from-ivory via-soft-blush to-cream flex items-center justify-center"
    >
      <div className="text-center">
        {/* Main Logo Animation */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <h1 className="signature-name text-6xl md:text-8xl text-deep-maroon mb-2 drop-shadow-sm">
            Bhavani Akurathi
          </h1>
          <p className="script-name text-2xl md:text-3xl text-deep-maroon/80 drop-shadow-sm">
            The Magic Touch
          </p>
        </motion.div>

        {/* CSS-Powered Progress Bar (Hardware Accelerated) */}
        <div className="w-64 mx-auto mb-6">
          <div className="h-1 bg-deep-maroon/20 rounded-full overflow-hidden relative">
            <motion.div
              initial={{ width: '0%' }}
              // Without isReady, animate to 80% very slowly. If ready, snap to 100%.
              animate={{ width: isReady ? '100%' : '80%' }}
              transition={{ duration: isReady ? 0.3 : 10, ease: "easeOut" }}
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-rose-gold to-deep-maroon rounded-full"
            />
          </div>
        </div>

        {/* Loading Text */}
        <AnimatePresence mode="wait">
          {!isReady && (
            <motion.p
              key="loading-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-deep-maroon/70 text-lg"
            >
              Creating beauty...
            </motion.p>
          )}
        </AnimatePresence>

        {/* Floating Elements Animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                x: Math.random() * window.innerWidth,
                y: window.innerHeight + 100,
                opacity: 0
              }}
              animate={{
                y: -100,
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                delay: Math.random() * 2,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute w-2 h-2 bg-rose-gold/30 rounded-full"
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}