import { useState, useCallback, useMemo, memo, useRef } from 'react';
import { X, Filter, Heart, Calendar, MapPin, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface GalleryItem {
  id: string;
  image: string;
  client: string;
  style: string;
  category: 'bridal' | 'editorial' | 'engagement' | 'prewedding' | 'reception';
  location: string;
  duration: string;
  description: string;
  tags: string[];
}

const galleryData: GalleryItem[] = [
  {
    id: '1',
    image: 'https://res.cloudinary.com/dyecmgvcy/image/upload/f_auto,q_auto/v1757495329/Magictouch/IMG-20250909-WA0003_bumonf.webp',
    client: 'Ramya',
    style: 'Natural Glam',
    category: 'reception',
    location: 'Chateau de Loire',
    duration: '4 hours',
    description: 'A stunning natural glam look featuring dewy skin, soft contouring, and romantic rose-gold tones perfect for an outdoor garden ceremony.',
    tags: ['Natural', 'Glam', 'Outdoor', 'Garden Wedding']
  },
  {
    id: '2',
    image: 'https://res.cloudinary.com/dyecmgvcy/image/upload/f_auto,q_auto/v1757498591/Magictouch/IMG-20250910-WA0018_ab74ze.webp',
    client: 'Janani',
    style: 'Traditional',
    category: 'bridal',
    location: 'Grand Ballroom',
    duration: '5 hours',
    description: 'Exquisite traditional bridal makeup with rich burgundy undertones, bold eyes, and perfect coverage for a grand ballroom celebration.',
    tags: ['Traditional', 'Bold', 'Cultural', 'Evening']
  },
  {
    id: '3',
    image: 'https://res.cloudinary.com/dyecmgvcy/image/upload/f_auto,q_auto/v1757498589/Magictouch/IMG-20250910-WA0025_xmczob.webp',
    client: 'Sindhu',
    style: 'Contemporary',
    category: 'engagement',
    location: 'Modern Art Gallery',
    duration: '3 hours',
    description: 'Modern and sophisticated bridal look with clean lines, subtle shimmer, and contemporary color palette for an art gallery venue.',
    tags: ['Contemporary', 'Modern', 'Sophisticated', 'Gallery']
  },
  {
    id: '4',
    image: 'https://res.cloudinary.com/dyecmgvcy/image/upload/f_auto,q_auto/v1757498585/Magictouch/IMG-20250910-WA0029_rxsb5b.webp',
    client: 'Gayathri',
    style: 'Minimalistic',
    category: 'bridal',
    location: 'Beach Resort',
    duration: '2 hours',
    description: 'Effortlessly beautiful minimalist makeup featuring fresh, dewy skin and subtle enhancement for a beachside ceremony.',
    tags: ['Minimalist', 'Beach', 'Natural', 'Fresh']
  },
  {
    id: '5',
    image: 'https://res.cloudinary.com/dyecmgvcy/image/upload/f_auto,q_auto:low/v1757837118/Magictouch/IMG_0651_jvwvwd.webp',
    client: 'Monisha',
    style: 'Bold',
    category: 'editorial',
    location: 'Gothic Cathedral',
    duration: '4 hours',
    description: 'Dramatic and bold bridal makeup with intense smoky eyes and striking features for a gothic cathedral setting.',
    tags: ['Bold', 'Dramatic', 'Gothic', 'Evening']
  },
  {
    id: '6',
    image: 'https://res.cloudinary.com/dyecmgvcy/image/upload/f_auto,q_auto/a_270/v1767937418/Magictouch/DSC04747_m7ae4f.webp',
    client: 'Janani',
    style: 'Vintage',
    category: 'engagement',
    location: 'Historic Manor',
    duration: '3 hours',
    description: 'Timeless vintage-inspired bridal makeup with classic red lips and soft winged liner for a historic manor wedding.',
    tags: ['Vintage', 'Classic', 'Timeless', 'Historic']
  },
  {
    id: '7',
    image: 'https://res.cloudinary.com/dyecmgvcy/image/upload/f_auto,q_auto:low/v1757495337/Magictouch/V_P09832_copy_mapk7j.webp',
    client: 'Monica',
    style: 'Artistic',
    category: 'engagement',
    location: 'Studio',
    duration: '6 hours',
    description: 'Creative editorial makeup featuring innovative color combinations and artistic techniques for a fashion magazine spread.',
    tags: ['Editorial', 'Artistic', 'Creative', 'Fashion']
  },
  {
    id: '8',
    image: 'https://res.cloudinary.com/dyecmgvcy/image/upload/f_auto,q_auto/v1757495329/Magictouch/IMG-20250909-WA0011_pnijju.webp',
    client: 'Sumathi',
    style: 'Glamorous',
    category: 'prewedding',
    location: 'City Rooftop',
    duration: '2 hours',
    description: 'Glamorous engagement shoot makeup with sultry eyes and luminous skin perfect for golden hour photography.',
    tags: ['Glamorous', 'Engagement', 'Golden Hour', 'Sultry']
  }
];

const categories = [
  { id: 'all', label: 'All Work' },
  { id: 'bridal', label: 'Bridal' },
  { id: 'editorial', label: 'Editorial' },
  { id: 'engagement', label: 'Engagement' },
  { id: 'prewedding', label: 'Pre-Wedding' },
  { id: 'reception', label: 'Reception' }
];

export const PhotoGallery = memo(function PhotoGallery() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const preloadImage = useCallback((url: string) => {
    const img = new Image();
    img.src = url.replace('/upload/', '/upload/w_1200/');
  }, []);

  const filteredItems = useMemo(() => {
    return selectedCategory === 'all'
      ? galleryData
      : galleryData.filter(item => item.category === selectedCategory);
  }, [selectedCategory]);

  useGSAP(() => {
    // Header reveal
    gsap.from(".gallery-header", {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none none"
      },
      opacity: 0,
      y: 30,
      duration: 1,
      ease: "power3.out"
    });

    // Filters reveal
    gsap.from(".gallery-filters", {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        toggleActions: "play none none none"
      },
      opacity: 0,
      y: 20,
      duration: 0.8,
      delay: 0.2,
      ease: "power2.out"
    });
  }, { scope: sectionRef });

  // Animate items when filter changes
  useGSAP(() => {
    gsap.fromTo(".gallery-item", 
      { opacity: 0, scale: 0.95, y: 20 },
      { 
        opacity: 1, 
        scale: 1, 
        y: 0, 
        duration: 0.5, 
        stagger: 0.05, 
        ease: "power2.out"
      }
    );
  }, { dependencies: [filteredItems], scope: sectionRef });

  // Modal Animation
  useGSAP(() => {
    if (selectedImage && modalRef.current) {
      gsap.fromTo(modalRef.current,
        { opacity: 0, scale: 0.9, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "power3.out" }
      );
      gsap.fromTo(".modal-backdrop",
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      );
    }
  }, { dependencies: [selectedImage] });

  return (
    <section ref={sectionRef} id="gallery" className="py-16 md:py-24 bg-gradient-to-b from-soft-blush to-cream">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="gallery-header text-center mb-8 md:mb-16 optimize-gpu">
          <h2 className="text-3xl md:text-4xl lg:text-5xl mb-4 md:mb-6 text-deep-maroon">
            Gallery
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground text-sm md:text-base px-4">
            Discover our portfolio of beautiful transformations. Each look is carefully crafted
            to enhance natural beauty and create unforgettable moments.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="gallery-filters mb-8 md:mb-12 optimize-gpu">
          <div className="flex items-center justify-center mb-4 md:hidden">
            <Filter className="w-4 h-4 text-deep-maroon mr-2" />
            <span className="text-sm text-deep-maroon">Filter by category</span>
          </div>

          <div className="md:hidden overflow-x-auto pb-2">
            <div className="flex gap-3 px-4 min-w-max">
              <Filter className="w-5 h-5 text-deep-maroon mr-2 hidden md:block" />
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  size="sm"
                  className={`transition-all duration-300 whitespace-nowrap text-xs ${selectedCategory === category.id
                    ? 'bg-deep-maroon text-ivory shadow-lg'
                    : 'bg-transparent border-deep-maroon text-deep-maroon hover:bg-deep-maroon hover:text-ivory'
                    }`}
                >
                  {category.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="hidden md:flex flex-wrap justify-center gap-4">
            <Filter className="w-5 h-5 text-deep-maroon mr-2" />
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={`transition-all duration-300 ${selectedCategory === category.id
                  ? 'bg-deep-maroon text-ivory shadow-lg'
                  : 'bg-transparent border-deep-maroon text-deep-maroon hover:bg-deep-maroon hover:text-ivory'
                  }`}
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="gallery-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="gallery-item relative group cursor-pointer overflow-hidden rounded-lg lg:rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 optimize-gpu"
              onClick={() => setSelectedImage(item)}
              onMouseEnter={() => preloadImage(item.image)}
            >
              <div className="relative overflow-hidden aspect-[4/5]">
                <img
                  src={item.image.replace('/upload/', '/upload/w_800/')}
                  alt={`${item.client} - ${item.style}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-deep-maroon/70 via-transparent to-transparent opacity-60 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 text-white">
                    <h4 className="mb-1 sm:mb-2 text-sm sm:text-base">{item.client}</h4>
                    <Badge variant="secondary" className="bg-white/20 text-white border-white/30 text-xs">
                      {item.style}
                    </Badge>
                  </div>
                </div>

                <Badge className="absolute top-3 left-3 bg-white/90 text-deep-maroon border-0 text-xs">
                  {item.category}
                </Badge>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedImage && (
          <div
            className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4 bg-black/90 optimize-gpu"
            onClick={() => {
              gsap.to(".modal-backdrop", { opacity: 0, duration: 0.3 });
              gsap.to(modalRef.current, { scale: 0.9, y: 20, opacity: 0, duration: 0.3, onComplete: () => setSelectedImage(null) });
            }}
          >
            <div
              ref={modalRef}
              className="relative bg-white rounded-xl md:rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] md:max-h-[85vh] flex flex-col overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                variant="outline"
                size="icon"
                className="absolute top-3 right-3 md:top-4 md:right-4 z-10 bg-white/90 hover:bg-white border-0 shadow-lg w-8 h-8 md:w-10 md:h-10 rounded-full"
                onClick={() => {
                  gsap.to(".modal-backdrop", { opacity: 0, duration: 0.3 });
                  gsap.to(modalRef.current, { scale: 0.9, y: 20, opacity: 0, duration: 0.3, onComplete: () => setSelectedImage(null) });
                }}
              >
                <X className="w-5 h-5 text-deep-maroon" />
              </Button>

              <div className="flex-1 flex flex-col md:grid md:grid-cols-2 gap-0 overflow-y-auto min-h-0">
                <div className="relative min-h-[50vh] md:min-h-0 bg-soft-blush/20 md:h-[85vh]">
                  <img
                    src={selectedImage.image.replace('/upload/', '/upload/w_1200/')}
                    alt={`${selectedImage.client} - ${selectedImage.style}`}
                    className="w-full h-full object-cover absolute inset-0"
                    loading="eager"
                  />
                </div>

                <div className="p-4 md:p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-3 md:mb-4">
                      <Badge variant="outline" className="border-deep-maroon text-deep-maroon text-xs">
                        {selectedImage.category}
                      </Badge>
                      <Heart className="w-4 h-4 text-rose-gold" />
                    </div>
                    <h3 className="text-deep-maroon mb-1 md:mb-2 text-lg md:text-xl">
                      {selectedImage.client}
                    </h3>
                    <h4 className="text-dusty-rose mb-4 md:mb-6 text-sm md:text-base">
                      {selectedImage.style} Style
                    </h4>
                    <p className="text-muted-foreground mb-6 md:mb-8 leading-relaxed text-sm md:text-base">
                      {selectedImage.description}
                    </p>
                    <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                      <div className="flex items-center gap-3 text-xs md:text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4 text-deep-maroon flex-shrink-0" />
                        <span>{selectedImage.location}</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs md:text-sm text-muted-foreground">
                        <Clock className="w-4 h-4 text-deep-maroon flex-shrink-0" />
                        <span>{selectedImage.duration}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h5 className="text-xs md:text-sm mb-2 md:mb-3 text-deep-maroon">Tags</h5>
                    <div className="flex flex-wrap gap-1.5 md:gap-2">
                      {selectedImage.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="bg-soft-blush text-deep-maroon border-0 text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
});