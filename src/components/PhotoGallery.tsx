import { useState, useCallback, useMemo, memo, useRef } from 'react';
import { X, Heart, MapPin, Clock, ArrowRight } from 'lucide-react';
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
    gsap.from(".gallery-header", {
      scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      opacity: 0, y: 40, duration: 1.8, ease: "expo.out"
    });
    gsap.from(".gallery-filters", {
      scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      opacity: 0, y: 20, duration: 1.6, ease: "expo.out"
    });
  }, { scope: sectionRef });

  useGSAP(() => {
    gsap.fromTo(".gallery-item", 
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.6, stagger: 0.1, ease: "expo.out" }
    );
  }, { dependencies: [filteredItems], scope: sectionRef });

  useGSAP(() => {
    if (selectedImage && modalRef.current) {
      gsap.fromTo(modalRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.6, ease: "expo.out" }
      );
      gsap.fromTo(".modal-backdrop",
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: "expo.out" }
      );
    }
  }, { dependencies: [selectedImage] });

  return (
    <section ref={sectionRef} id="gallery" className="py-24 md:py-32 bg-ivory">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="gallery-header flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-24 gap-6 md:gap-8">
          <div>
            <p className="script-name text-3xl md:text-5xl text-[#c08267] mb-4 md:mb-6 tracking-wide">
              Portfolio
            </p>
            <h2 className="text-4xl md:text-6xl font-light tracking-tight text-deep-maroon uppercase">
              Our Work
            </h2>
          </div>
          <p className="max-w-md text-deep-maroon/70 font-light leading-relaxed">
            A curated selection of our finest bridal and editorial transformations. Each look is meticulously crafted to perfection.
          </p>
        </div>

        <div className="gallery-filters flex overflow-x-auto md:flex-wrap snap-x gap-6 md:gap-12 mb-12 md:mb-24 border-b border-deep-maroon/10 pb-4 md:pb-6 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`snap-start whitespace-nowrap pb-2 text-sm md:text-base tracking-widest uppercase transition-all duration-300 relative ${
                selectedCategory === category.id
                  ? 'text-deep-maroon font-medium'
                  : 'text-deep-maroon/40 font-light hover:text-deep-maroon'
              }`}
            >
              {category.label}
              {selectedCategory === category.id && (
                <div className="absolute bottom-[-17px] md:bottom-[-25px] left-0 w-full h-[1px] bg-deep-maroon"></div>
              )}
            </button>
          ))}
        </div>

        {/* Desktop View: Masonry Grid */}
        <div className="hidden sm:block gallery-grid columns-2 lg:columns-3 xl:columns-4 gap-6 md:gap-8 space-y-6 md:space-y-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="gallery-item relative group cursor-pointer overflow-hidden break-inside-avoid bg-soft-blush/20 rounded-sm"
              onClick={() => setSelectedImage(item)}
              onMouseEnter={() => preloadImage(item.image)}
            >
              <img
                src={item.image.replace('/upload/', '/upload/w_800/')}
                alt={`${item.client} - ${item.style}`}
                className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-deep-maroon/0 group-hover:bg-deep-maroon/40 transition-colors duration-500"></div>
              <div className="absolute inset-0 flex flex-col justify-end p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <p className="text-white/90 font-light text-xs uppercase tracking-[0.2em] mb-3">{item.category}</p>
                <div className="flex items-end justify-between">
                  <h4 className="text-white text-3xl font-light">{item.client}</h4>
                  <ArrowRight className="text-white w-6 h-6 transform -translate-x-4 group-hover:translate-x-0 transition-transform duration-500" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View: Horizontal Swipe Carousel */}
        <div className="sm:hidden flex overflow-x-auto snap-x snap-mandatory gap-4 pb-10 -mx-4 px-4 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="gallery-item flex-shrink-0 w-[80vw] snap-center relative group cursor-pointer overflow-hidden bg-soft-blush/20 rounded-sm shadow-xl shadow-black/5"
              onClick={() => setSelectedImage(item)}
            >
              <div className="aspect-[3/4] w-full">
                <img
                  src={item.image.replace('/upload/', '/upload/w_600/')}
                  alt={`${item.client} - ${item.style}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 pt-12">
                <p className="text-white/80 font-light text-[10px] uppercase tracking-[0.2em] mb-2">{item.category}</p>
                <h4 className="text-white text-2xl font-light">{item.client}</h4>
                <p className="text-white/60 text-xs mt-1">Tap to view details</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Mobile Swipe Indicator */}
        <div className="sm:hidden flex justify-center items-center gap-2 mt-2 opacity-40">
          <div className="w-1.5 h-1.5 rounded-full bg-deep-maroon"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-deep-maroon/30"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-deep-maroon/30"></div>
          <span className="text-[10px] uppercase tracking-widest text-deep-maroon ml-2">Swipe Gallery</span>
        </div>

        {selectedImage && (
          <div
            className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-0 md:p-8 bg-ivory/95 backdrop-blur-md"
            onClick={() => {
              gsap.to(".modal-backdrop", { opacity: 0, duration: 0.4 });
              gsap.to(modalRef.current, { y: 50, opacity: 0, duration: 0.4, onComplete: () => setSelectedImage(null) });
            }}
          >
            <div
              ref={modalRef}
              className="relative bg-white w-full h-full md:h-auto max-w-7xl md:max-h-[90vh] flex flex-col md:flex-row overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-6 right-6 z-10 text-deep-maroon/50 hover:text-deep-maroon transition-colors bg-white/80 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none p-2 md:p-0 rounded-full"
                onClick={() => {
                  gsap.to(".modal-backdrop", { opacity: 0, duration: 0.4 });
                  gsap.to(modalRef.current, { y: 50, opacity: 0, duration: 0.4, onComplete: () => setSelectedImage(null) });
                }}
              >
                <X className="w-6 h-6 md:w-8 md:h-8 font-light" />
              </button>

              <div className="w-full md:w-3/5 h-[45vh] md:h-[90vh] relative bg-soft-blush/20 overflow-hidden">
                <img
                  src={selectedImage.image.replace('/upload/', '/upload/w_1600/')}
                  alt={`${selectedImage.client} - ${selectedImage.style}`}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>

              <div className="w-full md:w-2/5 p-8 md:p-16 flex flex-col overflow-y-auto bg-white max-h-[55vh] md:max-h-none">
                <div className="mb-10 md:mb-16">
                  <p className="text-[#c08267] text-xs md:text-sm tracking-[0.2em] uppercase mb-4">{selectedImage.category}</p>
                  <h3 className="text-deep-maroon text-4xl md:text-6xl font-light mb-6">{selectedImage.client}</h3>
                  <div className="w-12 h-[1px] bg-deep-maroon/20 mb-8"></div>
                  <p className="text-deep-maroon/70 leading-relaxed font-light text-base md:text-lg">
                    {selectedImage.description}
                  </p>
                </div>

                <div className="space-y-6 mb-12">
                  <div className="flex items-center gap-6 text-deep-maroon/70 font-light">
                    <MapPin className="w-5 h-5 text-[#c08267]" />
                    <span className="text-base md:text-lg">{selectedImage.location}</span>
                  </div>
                  <div className="flex items-center gap-6 text-deep-maroon/70 font-light">
                    <Clock className="w-5 h-5 text-[#c08267]" />
                    <span className="text-base md:text-lg">{selectedImage.duration}</span>
                  </div>
                  <div className="flex items-center gap-6 text-deep-maroon/70 font-light">
                    <Heart className="w-5 h-5 text-[#c08267]" />
                    <span className="text-base md:text-lg">{selectedImage.style} Style</span>
                  </div>
                </div>

                <div className="mt-auto pt-8 border-t border-deep-maroon/10">
                  <h5 className="text-deep-maroon text-xs tracking-[0.2em] uppercase mb-6">Tags</h5>
                  <div className="flex flex-wrap gap-3">
                    {selectedImage.tags.map((tag) => (
                      <span key={tag} className="border border-deep-maroon/20 text-deep-maroon/60 px-4 py-2 text-xs font-light uppercase tracking-widest hover:border-rose-gold hover:text-rose-gold transition-colors duration-300">
                        {tag}
                      </span>
                    ))}
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