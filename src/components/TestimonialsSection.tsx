import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const testimonials = [
  {
    name: "Monisha",
    role: "Model",
    image: "https://res.cloudinary.com/dyecmgvcy/image/upload/q_auto/v1757837118/Magictouch/IMG_0651_jvwvwd.webp",
    text: "Bhavani made my wedding day absolutely perfect! The makeup lasted all day and I felt like the most beautiful version of myself. Every photo turned out stunning.",
    rating: 5
  },
  {
    name: "Janani ",
    role: "Bride",
    image: "https://res.cloudinary.com/dyecmgvcy/image/upload/q_auto/v1757498591/Magictouch/IMG-20250910-WA0018_ab74ze.webp",
    text: "I was so nervous about my makeup, but Bhavani was incredibly professional and understood exactly what I wanted. The trial session was perfect and the wedding day exceeded all expectations!",
    rating: 5
  },
  {
    name: "Monica",
    role: "Bride",
    image: "https://res.cloudinary.com/dyecmgvcy/image/upload/q_auto:eco/v1757495337/Magictouch/V_P09832_copy_mapk7j.webp",
    text: "From the initial consultation to the wedding day, everything was flawless. The makeup enhanced my natural features beautifully and I received so many compliments from our guests.",
    rating: 5
  },
  {
    name: "Sindhu ",
    role: "Bride",
    image: "https://res.cloudinary.com/dyecmgvcy/image/upload/q_auto/v1757498589/Magictouch/IMG-20250910-WA0025_xmczob.webp",
    text: "The attention to detail and artistry is exceptional. I felt pampered and beautiful, and the makeup photographs amazingly. Highly recommend for any special occasion!",
    rating: 5
  }
];

export function TestimonialsSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-soft-blush to-champagne">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-6 text-deep-maroon">
            What Our Brides Say
          </h2>
          <p className="text-lg text-deep-maroon/80 max-w-2xl mx-auto">
            Every bride deserves to feel radiant and confident. Here's what our beautiful brides have to say about their experience with us.
          </p>
        </div>

        <div className="relative">
          {/* Main Testimonial Display */}
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-rose-gold/30">
                  <ImageWithFallback
                    src={testimonials[currentTestimonial].image}
                    alt={testimonials[currentTestimonial].name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="flex justify-center md:justify-start mb-4">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-rose-gold text-rose-gold" />
                  ))}
                </div>
                <blockquote className="text-lg md:text-xl text-deep-maroon/90 mb-6 leading-relaxed italic">
                  "{testimonials[currentTestimonial].text}"
                </blockquote>
                <div>
                  <h4 className="font-medium text-deep-maroon">
                    {testimonials[currentTestimonial].name}
                  </h4>
                  <p className="text-deep-maroon/60">
                    {testimonials[currentTestimonial].role}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white text-deep-maroon p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white text-deep-maroon p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Indicators */}
          <div className="flex justify-center mt-8 space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial ? 'bg-rose-gold scale-125' : 'bg-rose-gold/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}