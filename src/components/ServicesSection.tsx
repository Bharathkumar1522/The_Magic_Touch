import { Camera, Heart, Sparkles, Users } from 'lucide-react';
import { Card, CardContent } from './ui/card';

const services = [
  {
    icon: Heart,
    title: "Bridal Makeup",
    description: "Complete bridal transformation including trial session, wedding day makeup for your perfect day.",
    features: ["Consultation & Trial", "Wedding Day Service", "Contact lens and Hair extension", "False Lashes Included"]
  },
  {
    icon: Sparkles,
    title: "Party Makeup",
    description: "Glamorous looks for special occasions, anniversaries, galas, and celebrations that require that extra sparkle.",
    features: ["Evening Glamour", "Cocktail Parties", "Anniversary Celebrations", "Special Events"]
  },
  {
    icon: Camera,
    title: "Editorial Shoots",
    description: "Professional makeup for photoshoots, fashion editorials, and commercial projects with long-lasting formulas.",
    features: ["Fashion Photography", "Commercial Shoots", "Portrait Sessions", "Brand Campaigns"]
  },
  {
    icon: Users,
    title: "Pre-Wedding Sessions",
    description: "Beautiful makeup for engagement shoots, mehendi ceremonies, and all pre-wedding celebrations and events.",
    features: ["Engagement Photography", "Mehendi Ceremony", "Sangeet Night", "Rehearsal Events"]
  }
];

export function ServicesSection() {
  return (
    <section className="py-16 md:py-20 px-4 md:px-6 bg-cream">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl mb-4 md:mb-6 text-deep-maroon">
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
              className="bg-white/80 backdrop-blur-sm border-rose-gold/30 hover:border-rose-gold hover:shadow-lg transition-all duration-300 group"
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