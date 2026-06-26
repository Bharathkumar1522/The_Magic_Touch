import { ImageWithFallback } from './figma/ImageWithFallback';
import { memo, useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const styles = [
  {
    name: "Natural Glam",
    description: "Effortless beauty that enhances your natural features with a radiant, dewy finish perfect for romantic ceremonies.",
    image: "https://res.cloudinary.com/dyecmgvcy/image/upload/f_auto,q_auto/v1757495371/Magictouch/WhatsApp_Image_2025-09-10_at_14.38.17_e2171e99_khzagn.webp"
  },
  {
    name: "Bold & Dramatic",
    description: "Statement-making looks with striking eyes and bold features for brides who want to make an unforgettable impression.",
    image: "https://res.cloudinary.com/dyecmgvcy/image/upload/f_auto,q_auto/v1757498591/Magictouch/IMG-20250910-WA0016_iywybp.webp"
  },
  {
    name: "Minimalistic Beauty",
    description: "Less is more approach focusing on flawless skin and subtle enhancements that create an ethereal, understated elegance.",
    image: "https://res.cloudinary.com/dyecmgvcy/image/upload/f_auto,q_auto/v1757495331/Magictouch/IMG-20250909-WA0012_px01qk.webp"
  },
  {
    name: "Traditional Elegance",
    description: "Classic bridal makeup with timeless appeal, featuring sophisticated techniques that honor tradition while maintaining modern elegance.",
    image: "https://res.cloudinary.com/dyecmgvcy/image/upload/f_auto,q_auto/v1757498587/Magictouch/IMG-20250910-WA0026_xt0nfj.webp"
  },
  {
    name: "Contemporary Chic",
    description: "Modern, fashion-forward looks that blend current trends with bridal sophistication for the contemporary bride.",
    image: "https://images.unsplash.com/photo-1727988450989-c1aeb120b856?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBtb2Rlcm4lMjBicmlkYWwlMjBtYWtldXB8ZW58MXx8fHwxNzU2ODA2NDQyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  }
];

export const SignatureStyles = memo(function SignatureStyles() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Header Animation
    gsap.from(".style-header-anim", {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      },
      opacity: 0,
      y: 40,
      duration: 1.8,
      stagger: 0.2,
      ease: "expo.out"
    });

    // Staggered Items Animation (Desktop Only)
    const items = gsap.utils.toArray('.style-item');
    items.forEach((item: any) => {
      gsap.from(item, {
        scrollTrigger: {
          trigger: item,
          start: "top 85%",
        },
        opacity: 0,
        y: 60,
        duration: 1.8,
        ease: "expo.out"
      });

      // Image Parallax
      const imgWrapper = item.querySelector('.img-parallax-wrapper');
      const img = item.querySelector('.img-parallax');
      if (imgWrapper && img) {
        gsap.to(img, {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: imgWrapper,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      }
    });

    // Mobile Carousel Animation
    gsap.from(".mobile-carousel-item", {
      scrollTrigger: {
        trigger: ".mobile-carousel-container",
        start: "top 85%",
      },
      opacity: 0,
      x: 50,
      duration: 1.5,
      stagger: 0.15,
      ease: "expo.out"
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="styles" className="py-24 md:py-32 px-4 md:px-8 bg-ivory overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 md:mb-32">
          <p className="style-header-anim script-name text-3xl md:text-5xl text-[#c08267] mb-6 tracking-wide">
            The Collection
          </p>
          <h2 className="style-header-anim text-4xl md:text-6xl font-light tracking-tight text-deep-maroon uppercase mb-6">
            Signature Styles
          </h2>
          <div className="style-header-anim w-16 h-[1px] bg-deep-maroon/30 mx-auto mb-8"></div>
          <p className="style-header-anim text-lg md:text-xl text-deep-maroon/70 max-w-2xl mx-auto font-light leading-relaxed">
            Discover our carefully curated collection of bridal makeup styles, meticulously designed to bring out your unique beauty on your special day.
          </p>
        </div>

        {/* Desktop View: Alternating Stack */}
        <div className="hidden md:block space-y-32 md:space-y-48">
          {styles.map((style, index) => {
            const isEven = index % 2 === 0;
            return (
              <div key={index} className={`style-item flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-24 group`}>
                <div className="w-full md:w-1/2 relative">
                  <div className="img-parallax-wrapper relative overflow-hidden aspect-[3/4] md:aspect-[4/5] w-full max-w-md mx-auto rounded-sm">
                    <div className="absolute inset-[-10%] w-[120%] h-[120%]">
                      <ImageWithFallback
                        src={style.image}
                        alt={style.name}
                        className="img-parallax w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                    </div>
                  </div>
                  {/* Decorative element */}
                  <div className={`absolute top-8 ${isEven ? '-right-4 md:-right-8' : '-left-4 md:-left-8'} text-6xl md:text-8xl font-serif text-deep-maroon/10 z-[-1] font-light italic opacity-0 md:opacity-100`}>
                    0{index + 1}
                  </div>
                </div>
                
                <div className={`w-full md:w-1/2 flex flex-col ${isEven ? 'md:items-start text-center md:text-left' : 'md:items-end text-center md:text-right'}`}>
                  <p className="script-name text-3xl text-[#c08267] mb-4">Style 0{index + 1}</p>
                  <h3 className="text-3xl md:text-5xl font-light text-deep-maroon mb-6 leading-tight uppercase tracking-wide">
                    {style.name}
                  </h3>
                  <p className="text-lg text-deep-maroon/70 leading-relaxed font-light max-w-md">
                    {style.description}
                  </p>
                  <div className={`w-12 h-[1px] bg-[#c08267] mt-8 ${isEven ? 'mx-auto md:mx-0' : 'mx-auto md:ml-auto md:mr-0'}`}></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile View: Swipeable Horizontal Carousel */}
        <div className="md:hidden mobile-carousel-container flex overflow-x-auto snap-x snap-mandatory gap-6 pb-12 -mx-4 px-4 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {styles.map((style, index) => (
            <div key={index} className="mobile-carousel-item flex-shrink-0 w-[85vw] snap-center flex flex-col">
              <div className="relative mb-8">
                <div className="relative overflow-hidden aspect-[4/5] w-full rounded-sm shadow-xl shadow-black/5">
                  <ImageWithFallback
                    src={style.image}
                    alt={style.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Decorative element */}
                <div className="absolute top-4 -right-2 text-6xl font-serif text-deep-maroon/15 z-[-1] font-light italic pointer-events-none">
                  0{index + 1}
                </div>
              </div>
              
              <div className="flex flex-col text-center px-2">
                <p className="script-name text-2xl text-[#c08267] mb-2">Style 0{index + 1}</p>
                <h3 className="text-3xl font-light text-deep-maroon mb-4 leading-tight uppercase tracking-wide">
                  {style.name}
                </h3>
                <p className="text-base text-deep-maroon/70 leading-relaxed font-light">
                  {style.description}
                </p>
                <div className="w-8 h-[1px] bg-[#c08267] mx-auto mt-6"></div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Swipe Indicator for Mobile */}
        <div className="md:hidden flex justify-center items-center gap-2 mt-4 opacity-50">
          <div className="w-1.5 h-1.5 rounded-full bg-deep-maroon"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-deep-maroon/30"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-deep-maroon/30"></div>
          <span className="text-xs uppercase tracking-widest text-deep-maroon ml-2">Swipe</span>
        </div>
        
      </div>
    </section>
  );
});