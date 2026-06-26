import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const testimonials = [
  {
    name: "Monisha",
    role: "Model",
    image: "https://res.cloudinary.com/dyecmgvcy/image/upload/f_auto,q_auto/v1757837118/Magictouch/IMG_0651_jvwvwd.webp",
    text: "Bhavani made my wedding day absolutely perfect! The makeup lasted all day and I felt like the most beautiful version of myself. Every photo turned out stunning.",
    rating: 5
  },
  {
    name: "Janani",
    role: "Bride",
    image: "https://res.cloudinary.com/dyecmgvcy/image/upload/f_auto,q_auto/v1757498591/Magictouch/IMG-20250910-WA0018_ab74ze.webp",
    text: "I was so nervous about my makeup, but Bhavani was incredibly professional and understood exactly what I wanted. The trial session was perfect and the wedding day exceeded all expectations!",
    rating: 5
  },
  {
    name: "Monica",
    role: "Bride",
    image: "https://res.cloudinary.com/dyecmgvcy/image/upload/f_auto,q_auto:eco/v1757495337/Magictouch/V_P09832_copy_mapk7j.webp",
    text: "From the initial consultation to the wedding day, everything was flawless. The makeup enhanced my natural features beautifully and I received so many compliments from our guests.",
    rating: 5
  },
  {
    name: "Sindhu",
    role: "Bride",
    image: "https://res.cloudinary.com/dyecmgvcy/image/upload/f_auto,q_auto/v1757498589/Magictouch/IMG-20250910-WA0025_xmczob.webp",
    text: "The attention to detail and artistry is exceptional. I felt pampered and beautiful, and the makeup photographs amazingly. Highly recommend for any special occasion!",
    rating: 5
  }
];

export function TestimonialsSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const prevTestimonialRef = useRef(currentTestimonial);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  useGSAP(() => {
    gsap.from(".testimonials-header", {
      scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      opacity: 0, y: 40, duration: 1.8, stagger: 0.15, ease: "expo.out"
    });
    gsap.from(contentRef.current, {
      scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      opacity: 0, y: 50, duration: 1.8, ease: "expo.out"
    });
  }, { scope: sectionRef });

  useGSAP(() => {
    if (prevTestimonialRef.current === currentTestimonial) return;

    const ctx = gsap.context(() => {
      const direction = currentTestimonial > prevTestimonialRef.current ? -20 : 20;
      
      gsap.fromTo(".testimonial-image", 
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "expo.out" }
      );
      gsap.fromTo(".testimonial-text", 
        { opacity: 0, y: direction },
        { opacity: 1, y: 0, duration: 0.8, ease: "expo.out", delay: 0.1 }
      );
    }, contentRef);

    prevTestimonialRef.current = currentTestimonial;
    return () => ctx.revert();
  }, { dependencies: [currentTestimonial] });

  return (
    <section ref={sectionRef} id="testimonials" className="py-24 md:py-32 px-4 md:px-8 bg-deep-maroon overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-16 md:mb-24">
          <p className="testimonials-header script-name text-3xl md:text-5xl text-rose-gold mb-6 tracking-wide">
            Love Notes
          </p>
          <h2 className="testimonials-header text-4xl md:text-6xl font-light tracking-tight text-white uppercase">
            What Our Brides Say
          </h2>
        </div>

        <div ref={contentRef} className="relative max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          {/* Large decorative quote mark */}
          <div className="absolute top-[-50px] left-[-20px] lg:left-[-50px] text-[150px] lg:text-[250px] text-white/5 font-serif leading-none z-0 select-none">
            "
          </div>

          <div className="w-full lg:w-1/2 relative z-10 flex justify-center lg:justify-end">
            <div className="testimonial-image relative w-[280px] h-[350px] md:w-[400px] md:h-[500px] overflow-hidden rounded-sm group shadow-2xl shadow-black/20">
              <ImageWithFallback
                src={testimonials[currentTestimonial].image}
                alt={testimonials[currentTestimonial].name}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-deep-maroon/20 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-0"></div>
            </div>
            
            {/* Nav Buttons overlaying image area */}
            <div className="absolute bottom-[-24px] left-1/2 -translate-x-1/2 lg:left-auto lg:-translate-x-0 lg:-right-6 flex gap-4 z-20">
              <button
                onClick={prevTestimonial}
                className="w-14 h-14 flex items-center justify-center bg-white text-deep-maroon rounded-full shadow-xl hover:bg-rose-gold hover:text-white transition-all duration-300 group border border-deep-maroon/5"
              >
                <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
              </button>
              <button
                onClick={nextTestimonial}
                className="w-14 h-14 flex items-center justify-center bg-white text-deep-maroon rounded-full shadow-xl hover:bg-rose-gold hover:text-white transition-all duration-300 group border border-deep-maroon/5"
              >
                <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          <div className="w-full lg:w-1/2 relative z-10 pt-8 lg:pt-0">
            <div className="testimonial-text text-center lg:text-left">
              <div className="flex justify-center lg:justify-start mb-8 gap-1.5">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-rose-gold text-rose-gold" />
                ))}
              </div>
              
              <blockquote className="text-2xl md:text-3xl lg:text-4xl text-white font-light leading-relaxed mb-12">
                "{testimonials[currentTestimonial].text}"
              </blockquote>
              
              <div className="flex flex-col items-center lg:items-start">
                <div className="w-12 h-[1px] bg-rose-gold mb-6"></div>
                <h4 className="text-xl md:text-2xl text-white uppercase tracking-widest font-light mb-2">
                  {testimonials[currentTestimonial].name}
                </h4>
                <p className="text-white/50 uppercase tracking-[0.2em] text-xs md:text-sm">
                  {testimonials[currentTestimonial].role}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-24 gap-4">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentTestimonial(index);
                setIsAutoPlaying(false);
              }}
              className={`transition-all duration-500 ease-out h-[1px] ${
                index === currentTestimonial ? 'w-16 bg-white' : 'w-8 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}