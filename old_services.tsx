import { Camera, Heart, Sparkles, Users } from 'lucide-react';
import { Card, CardContent } from './ui/card';

const services = [
  {
    icon: Heart,
    title: "Bridal Makeup",
    description: "Complete bridal transformation including trial session. Specializing in HD, Airbrush, and Glass Skin finishes.",
    features: ["South Indian Bridal", "HD & Airbrush Makeup", "Contact Lens & Lashes", "On-Location Service"]
  },
  {
    icon: Sparkles,
    title: "Party & Reception",
    description: "Glamorous looks for receptions, sangeet, and parties. We create the perfect glow for every special occasion.",
    features: ["Reception Look", "Sangeet Makeup", "Guest Makeup", "Evening Glamour"]
  },
  {
    icon: Users,
    title: "Saree Draping",
    description: "Professional saree draping services for all styles including South Indian, Gujarati, and Modern drapes.",
    features: ["Bridal Saree Draping", "Pre-pleating Service", "Box-folding Service", "Multiple Styles"]
  },
  {
    icon: Camera,
    title: "Hairstyling",
    description: "Expert hairstyling including traditional poolajada, messy buns, braids, and flower adornment.",
    features: ["Traditional Poolajada", "Modern Buns & Braids", "Flower Decoration", "Hair Extensions"]
  }
];

export function ServicesSection() {
  return (
    <section className="relative py-16 md:py-24 px-4 md:px-6 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://res.cloudinary.com/dyecmgvcy/image/upload/q_auto,w_1920/v1767937417/Magictouch/DSC04820_tck5ao.webp"
          alt="Background"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-cream/70" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl mb-4 md:mb-6 text-deep-maroon drop-shadow-sm">
            Our Services
          </h2>
          <p className="text-base md:text-lg text-deep-maroon/80 max-w-2xl mx-auto px-2">
            From your wedding day to special occasions, we create stunning looks that make every moment memorable and picture-perfect.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="h-full bg-white/90 backdrop-blur-sm border-rose-gold/30 hover:border-rose-gold hover:shadow-lg transition-all duration-300 group"
            >
              <CardContent className="p-6 md:p-8">
                {/* Mobile-first: vertical layout on small screens, horizontal on larger screens */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:space-x-4 space-y-4 sm:space-y-0">
                  <div className="flex-shrink-0 self-center sm:self-start">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blush-pink to-rose-gold rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <service.icon className="w-7 h-7 sm:w-8 sm:h-8 text-deep-maroon" />
                    </div>
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-lg sm:text-xl mb-3 text-deep-maroon">
                      {service.title}
                    </h3>
                    <p className="text-sm sm:text-base text-deep-maroon/70 mb-4 leading-relaxed">
                      {service.description}
                    </p>
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center justify-center sm:justify-start text-sm sm:text-base text-deep-maroon/60">
                          <div className="w-1.5 h-1.5 bg-rose-gold rounded-full mr-3 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}