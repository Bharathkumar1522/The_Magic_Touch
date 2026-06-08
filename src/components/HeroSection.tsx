import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';

gsap.registerPlugin(useGSAP);

const carouselImages = [
  {
    url: "https://res.cloudinary.com/dyecmgvcy/image/upload/f_auto,q_auto,w_1920/v1757494544/Magictouch/V_P09800_copy_1_z5lsg5.webp",
    title: "Timeless Elegance",
    subtitle: "South Indian Bridal Makeup Specialist",
    objectPosition: "object-[center_20%] sm:object-center"
  },
  {
    url: "https://res.cloudinary.com/dyecmgvcy/image/upload/f_auto,q_auto,w_1920/v1767937417/Magictouch/DSC04742_aap51g.webp",
    title: "Bridal Transformations",
    subtitle: "Glossy, HD & Airbrush Finish for your Big Day",
    objectPosition: "object-top sm:object-center"
  },
  {
    url: "https://res.cloudinary.com/dyecmgvcy/image/upload/f_auto,q_auto,w_1920/v1757494807/Magictouch/WhatsApp_Image_2025-09-08_at_08.41.20_b59b49d6_fq6qdm.webp",
    title: "Wedding Day Magic",
    subtitle: "Destination Weddings & On-Location Services",
    objectPosition: "object-[center_25%] sm:object-center"
  }
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const prevSlideRef = useRef(currentSlide);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  }, []);

  const handleSlideClick = useCallback((index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
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

  // GSAP Animations
  useGSAP(() => {
    const tl = gsap.timeline();
    
    // Animate the initial background image scale for a premium feel
    tl.fromTo(`.hero-bg-0 img`,
      { scale: 1.15 },
      { scale: 1, duration: 3, ease: "power2.out" }
    );

    // Initial Load Animation for text
    tl.fromTo(".hero-main-text", 
      { opacity: 0, y: 50, filter: "blur(4px)" }, 
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.2, ease: "power4.out" },
      "-=2.5"
    )
    .fromTo(".hero-btn", 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 0.8, ease: "back.out(1.7)" }, 
      "-=1.8"
    );
  }, { scope: containerRef });

  // Slide Change Animations
  useGSAP(() => {
    if (prevSlideRef.current === currentSlide) return;
    
    // Animate the background image fade and scale
    gsap.fromTo(`.hero-bg-${currentSlide}`, 
      { opacity: 0, zIndex: 10 },
      { opacity: 1, duration: 1.5, ease: "power2.out", zIndex: 10 }
    );
    
    gsap.fromTo(`.hero-bg-${currentSlide} img`,
      { scale: 1.1 },
      { scale: 1, duration: 4, ease: "power2.out" }
    );
    
    // Hide previous slide after new one fades in
    gsap.to(`.hero-bg-${prevSlideRef.current}`, { 
      opacity: 0, 
      duration: 1.5, 
      delay: 0.5,
      zIndex: 1,
      onComplete: () => {
        prevSlideRef.current = currentSlide;
      }
    });

    // Animate subtitle text change
    gsap.fromTo(".hero-subtitle",
      { opacity: 0, y: 15, filter: "blur(2px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "power3.out" }
    );

  }, { dependencies: [currentSlide], scope: containerRef });

  return (
    <section ref={containerRef} className="relative h-[100dvh] w-full overflow-hidden bg-gradient-to-br from-deep-maroon via-dusty-rose to-blush-pink">
      {/* Carousel Images - Pre-rendered for smooth crossfading */}
      <div className="absolute inset-0 w-full h-full bg-black">
        {carouselImages.map((img, index) => (
          <div 
            key={index}
            className={`hero-bg-${index} absolute inset-0 w-full h-full optimize-gpu`}
            style={{ 
              opacity: index === currentSlide ? 1 : 0, 
              zIndex: index === currentSlide ? 10 : 1 
            }}
          >
            <ImageWithFallback
              src={img.url}
              alt={img.title}
              className={`w-full h-full object-cover ${img.objectPosition}`}
              loading={index === 0 ? "eager" : "lazy"}
              fetchPriority={index === 0 ? "high" : "auto"}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30" />
          </div>
        ))}
      </div>

      {/* Hero Content */}
      <div className="absolute inset-0 z-20 flex items-center justify-center">
        <div className="text-center text-white px-4 sm:px-6 max-w-5xl optimize-gpu">
          <div className="hero-main-text mb-6 drop-shadow-lg">
            <h1 className="signature-name text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white mb-2 leading-tight drop-shadow-md">
              Bhavani Akurathi
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/95 font-serif italic drop-shadow-md">
              Bhavs Beauty Studio
            </p>
          </div>

          <p className="hero-subtitle text-base sm:text-lg md:text-xl lg:text-2xl mb-8 opacity-95 font-light max-w-3xl mx-auto leading-relaxed drop-shadow-md">
            {carouselImages[currentSlide].subtitle}
          </p>

          <div className="hero-btn">
            <Button
              size="lg"
              onClick={handleBookConsultation}
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/30 px-6 sm:px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 cursor-pointer text-sm sm:text-base"
            >
              Book Your Consultation
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="hidden sm:block absolute z-30 left-4 md:left-6 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 md:p-3 rounded-full transition-all duration-300 hover:scale-110 active:scale-95"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="hidden sm:block absolute z-30 right-4 md:right-6 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 md:p-3 rounded-full transition-all duration-300 hover:scale-110 active:scale-95"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute z-30 bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 sm:space-x-3">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSlideClick(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 hover:scale-125 active:scale-90 ${
              index === currentSlide ? 'bg-white scale-110' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <div className="absolute z-30 bottom-16 left-1/2 -translate-x-1/2 sm:hidden">
        <p className="text-white/60 text-xs">Swipe to navigate</p>
      </div>
    </section>
  );
}