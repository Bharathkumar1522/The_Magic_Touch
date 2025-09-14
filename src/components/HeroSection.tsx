import { useState, useEffect, useCallback, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';

const carouselImages = [
  {
    url: "https://res.cloudinary.com/dyecmgvcy/image/upload/q_auto/v1757494544/Magictouch/V_P09800_copy_1_z5lsg5.webp",
    title: "Timeless Elegance",
    subtitle: "Creating your perfect bridal look"
  },
  {
    url: "https://res.cloudinary.com/dyecmgvcy/image/upload/q_auto/v1757498585/Magictouch/IMG-20250910-WA0029_rxsb5b.webp",
    title: "Bridal Transformations",
    subtitle: "Enhancing your natural beauty"
  },
  {
    url: "https://res.cloudinary.com/dyecmgvcy/image/upload/q_auto/v1757494807/Magictouch/WhatsApp_Image_2025-09-08_at_08.41.20_b59b49d6_fq6qdm.webp",
    title: "Wedding Day Magic",
    subtitle: "Making every moment picture perfect"
  }
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  }, []);

  const handleSlideClick = useCallback((index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    // Resume autoplay after 8 seconds
    setTimeout(() => setIsAutoPlaying(true), 8000);
  }, []);

  const handleBookConsultation = useCallback(() => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide, isAutoPlaying]);

  const currentImage = useMemo(() => carouselImages[currentSlide], [currentSlide]);

  return (
    <section className="relative h-screen overflow-hidden bg-gradient-to-br from-deep-maroon via-dusty-rose to-blush-pink">
      {/* Carousel Images */}
      <div className="relative w-full h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <ImageWithFallback
              src={currentImage.url}
              alt={currentImage.title}
              className="w-full h-full object-cover"
              loading="eager"
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-black/30" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Hero Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div 
          className="text-center text-white px-4 sm:px-6 max-w-5xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <motion.div 
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <h1 className="signature-name text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white mb-2 leading-tight">
              Bhavani Akurathi
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/90 font-serif italic">
              The Magic Touch
            </p>
          </motion.div>
          
          <motion.p 
            className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 opacity-90 font-light max-w-3xl mx-auto"
            key={currentSlide}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {currentImage.subtitle}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Button 
              size="lg" 
              onClick={handleBookConsultation}
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/30 px-6 sm:px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 cursor-pointer text-sm sm:text-base"
            >
              Book Your Consultation
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Navigation Arrows - Hidden on small screens */}
      <motion.button
        onClick={prevSlide}
        className="hidden sm:block absolute left-4 md:left-6 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 md:p-3 rounded-full transition-all duration-300 hover:scale-110"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
      </motion.button>
      
      <motion.button
        onClick={nextSlide}
        className="hidden sm:block absolute right-4 md:right-6 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 md:p-3 rounded-full transition-all duration-300 hover:scale-110"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
      </motion.button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 sm:space-x-3">
        {carouselImages.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => handleSlideClick(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Touch/Swipe indicators for mobile */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 sm:hidden">
        <p className="text-white/60 text-xs">Swipe to navigate</p>
      </div>
    </section>
  );
}