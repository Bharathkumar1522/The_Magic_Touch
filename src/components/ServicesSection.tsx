import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const services = [
  {
    title: "Bridal Makeup",
    description: "Complete bridal transformation including trial session. Specializing in HD, Airbrush, and Glass Skin finishes.",
    features: ["South Indian Bridal", "HD & Airbrush Makeup", "Contact Lens & Lashes", "On-Location Service"]
  },
  {
    title: "Party & Reception",
    description: "Glamorous looks for receptions, sangeet, and parties. We create the perfect glow for every special occasion.",
    features: ["Reception Look", "Sangeet Makeup", "Guest Makeup", "Evening Glamour"]
  },
  {
    title: "Saree Draping",
    description: "Professional saree draping services for all styles including South Indian, Gujarati, and Modern drapes.",
    features: ["Bridal Saree Draping", "Pre-pleating Service", "Box-folding Service", "Multiple Styles"]
  },
  {
    title: "Hairstyling",
    description: "Expert hairstyling including traditional poolajada, messy buns, braids, and flower adornment.",
    features: ["Traditional Poolajada", "Modern Buns & Braids", "Flower Decoration", "Hair Extensions"]
  }
];

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Parallax background
    gsap.fromTo(".services-bg", 
      { scale: 1.05, opacity: 0 },
      { 
        scale: 1, 
        opacity: 1, 
        duration: 1.8, 
        ease: "expo.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      }
    );

    // Header reveal
    gsap.from(".services-header", {
      scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      opacity: 0, y: 40, duration: 1.8, stagger: 0.15, ease: "expo.out"
    });

    // List items reveal
    gsap.from(".service-row", {
      scrollTrigger: { trigger: ".services-list", start: "top 80%" },
      opacity: 0, y: 30, duration: 1.8, stagger: 0.15, ease: "expo.out"
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="services" className="relative py-24 md:py-32 px-4 md:px-8 bg-deep-maroon overflow-hidden">
      
      {/* Background Image - Dark Mood */}
      <div className="services-bg absolute inset-0 z-0">
        <img
          src="https://res.cloudinary.com/dyecmgvcy/image/upload/f_auto,q_auto,w_1920/v1767937417/Magictouch/DSC04820_tck5ao.webp"
          alt="Background"
          className="w-full h-full object-cover opacity-20 mix-blend-luminosity"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-deep-maroon/95 via-deep-maroon/85 to-deep-maroon/95" />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto">
        {/* Top Header */}
        <div className="text-center mb-20 md:mb-28">
          <h2 className="services-header text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-white mb-6 uppercase">
            Our Services
          </h2>
          <div className="services-header w-16 h-[1px] bg-[#c08267] mx-auto mb-8"></div>
          <p className="services-header text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed font-light">
            From your wedding day to special occasions, we create stunning looks that make every moment memorable and picture-perfect.
          </p>
        </div>

        {/* Typographic List */}
        <div className="services-list border-t border-rose-gold/20">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="service-row group flex flex-col md:flex-row md:items-start py-12 md:py-16 border-b border-rose-gold/20 transition-colors duration-500 hover:bg-white/[0.03] px-4 md:px-8 -mx-4 md:-mx-8 rounded-sm"
            >
              {/* Left Column: Number & Title */}
              <div className="w-full md:w-5/12 pr-8 mb-8 md:mb-0 flex gap-6 md:gap-8 items-start">
                <span className="text-2xl md:text-3xl font-serif text-[#c08267] italic mt-1 md:mt-2">
                  0{index + 1}
                </span>
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-light text-white tracking-wide group-hover:text-rose-gold transition-colors duration-500">
                  {service.title}
                </h3>
              </div>

              {/* Right Column: Details */}
              <div className="w-full md:w-7/12 md:pl-8 lg:pl-16">
                <p className="text-white/90 text-lg md:text-xl leading-relaxed font-light mb-8 max-w-xl">
                  {service.description}
                </p>
                
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-base md:text-lg text-white/70 font-light group-hover:text-white/90 transition-colors duration-500">
                      <span className="w-1.5 h-1.5 bg-[#c08267]/50 rounded-full mr-4 flex-shrink-0 group-hover:bg-[#c08267] transition-colors duration-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}