import { ImageWithFallback } from './figma/ImageWithFallback';

const styles = [
  {
    name: "Natural Glam",
    description: "Effortless beauty that enhances your natural features with a radiant, dewy finish perfect for romantic ceremonies.",
    image: "https://res.cloudinary.com/dyecmgvcy/image/upload/q_auto/v1757495371/Magictouch/WhatsApp_Image_2025-09-10_at_14.38.17_e2171e99_khzagn.webp"
  },
  {
    name: "Bold & Dramatic",
    description: "Statement-making looks with striking eyes and bold features for brides who want to make an unforgettable impression.",
    image: "https://res.cloudinary.com/dyecmgvcy/image/upload/q_auto/v1757498591/Magictouch/IMG-20250910-WA0016_iywybp.webp"
  },
    {
    name: "Minimalistic Beauty",
    description: "Less is more approach focusing on flawless skin and subtle enhancements that create an ethereal, understated elegance.",
    image: "https://res.cloudinary.com/dyecmgvcy/image/upload/q_auto/v1757495331/Magictouch/IMG-20250909-WA0012_px01qk.webp"
  },
  {
    name: "Traditional Elegance",
    description: "Classic bridal makeup with timeless appeal, featuring sophisticated techniques that honor tradition while maintaining modern elegance.",
    image: "https://res.cloudinary.com/dyecmgvcy/image/upload/q_auto/v1757498587/Magictouch/IMG-20250910-WA0026_xt0nfj.webp"
  },
  {
    name: "Contemporary Chic",
    description: "Modern, fashion-forward looks that blend current trends with bridal sophistication for the contemporary bride.",
    image: "https://images.unsplash.com/photo-1727988450989-c1aeb120b856?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBtb2Rlcm4lMjBicmlkYWwlMjBtYWtldXB8ZW58MXx8fHwxNzU2ODA2NDQyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },


];

export function SignatureStyles() {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-ivory to-soft-blush">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4 text-deep-maroon">
            Signature Styles
          </h2>
          <p className="script-name text-2xl md:text-3xl text-deep-maroon mb-4">
            by Bhavani Akurathi
          </p>
          <p className="text-lg text-deep-maroon/80 max-w-2xl mx-auto">
            Discover our carefully curated collection of bridal makeup styles, each designed to bring out your unique beauty on your special day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {styles.map((style, index) => (
            <div 
              key={index}
              className="bg-white/60 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <ImageWithFallback
                  src={style.image}
                  alt={style.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl mb-3 text-deep-maroon">
                  {style.name}
                </h3>
                <p className="text-deep-maroon/70 leading-relaxed">
                  {style.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}