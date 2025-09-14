import { useState, useEffect } from 'react';
import { motion } from "framer-motion";

interface LoadingScreenProps {
  isLoading: boolean;
  onComplete: () => void;
}

export function LoadingScreen({ isLoading, onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let interval: number;
    
    // Start progress animation immediately
    interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 2;
        
        // If we've reached 100% and fonts are loaded, complete the loading
        if (newProgress >= 100 && isLoading) {
          clearInterval(interval);
          setTimeout(() => {
            setIsComplete(true);
            setTimeout(onComplete, 500); // Smooth transition delay
          }, 300);
          return 100;
        }
        
        // If fonts not loaded yet, slow down at 90%
        if (newProgress >= 90 && !isLoading) {
          return 90 + (prev - 90) * 0.1; // Very slow increment
        }
        
        return newProgress;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isLoading, onComplete]);

  if (isComplete) return null;

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
          <h1 className="signature-name text-6xl md:text-8xl text-deep-maroon mb-2">
            Bhavani Akurathi
          </h1>
          <p className="script-name text-2xl md:text-3xl text-deep-maroon/80">
            The Magic Touch
          </p>
        </motion.div>

        {/* Progress Bar */}
        <div className="w-64 mx-auto mb-6">
          <div className="h-1 bg-deep-maroon/20 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-rose-gold to-deep-maroon rounded-full"
            />
          </div>
        </div>

        {/* Loading Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-deep-maroon/70 text-lg"
        >
          {progress >= 90 ? 'Almost ready...' : 'Creating beauty...'}
        </motion.p>

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