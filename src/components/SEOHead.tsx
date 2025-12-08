import { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  canonicalUrl?: string;
}

export function SEOHead({
  title = "Bhavani Akurathi - The Magic Touch | Best Bridal Makeup Artist & Hairstylist in Vijayawada",
  description = "Transform your special day with Bhavani Akurathi's expert bridal makeup services in Vijayawada. Specializing in high-definition bridal makeup, saree draping, hairstyling, party makeup, and editorial shoots. Book your consultation today!",
  keywords = "bridal makeup artist Vijayawada, wedding makeup Andhra Pradesh, professional makeup artist India, destination wedding makeup, bridal transformation, party makeup, editorial makeup, best makeup artist Vijayawada, Bhavani Akurathi, The Magic Touch, sangeet makeup, mehendi makeup, reception makeup, engagement makeup, fashion photography makeup, airbrush makeup, HD makeup, saree draping, hair styling, Simple makeup, Sareedraping, Hairstylist Vijayawada, Hairstyling, Sareedrapist Vijayawada, Glossy makeup Vijayawada, Skin finish makeup, marriage bridal makeup artist, makeup artist near me, south indian bridal makeup artist, bride makeup",
  ogImage = "https://res.cloudinary.com/dyecmgvcy/image/upload/q_auto/v1757494544/Magictouch/V_P09800_copy_1_z5lsg5.webp",
  canonicalUrl = "https://the-magic-touch-bhavani.vercel.app"
}: SEOHeadProps) {

  useEffect(() => {
    // Set document title
    document.title = title;

    // Set meta tags
    const updateMetaTag = (name: string, content: string, property = false) => {
      const attribute = property ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('author', 'Bhavani Akurathi - The Magic Touch');
    updateMetaTag('viewport', 'width=device-width, initial-scale=1.0');
    updateMetaTag('robots', 'index, follow');

    // Open Graph tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', ogImage, true);
    updateMetaTag('og:url', canonicalUrl, true);
    updateMetaTag('og:type', 'website', true);
    updateMetaTag('og:site_name', 'The Magic Touch - Bhavani Akurathi', true);
    updateMetaTag('og:locale', 'en_IN', true);

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', ogImage);

    // Additional SEO tags
    updateMetaTag('geo.region', 'IN-AP');
    updateMetaTag('geo.placename', 'Vijayawada');
    updateMetaTag('geo.position', '16.5062;80.6480');
    updateMetaTag('ICBM', '16.5062, 80.6480');

    // Business/Local SEO
    updateMetaTag('business:contact_data:street_address', 'Vijayawada');
    updateMetaTag('business:contact_data:locality', 'Vijayawada');
    updateMetaTag('business:contact_data:region', 'Andhra Pradesh');
    updateMetaTag('business:contact_data:postal_code', '520001');
    updateMetaTag('business:contact_data:country_name', 'India');
    updateMetaTag('business:contact_data:email', 'themagictouch443@gmail.com');
    updateMetaTag('business:contact_data:phone_number', '+91 81482 00139');

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    // Preconnect to external domains for performance
    const preconnectDomains = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
      'https://res.cloudinary.com'
    ];

    preconnectDomains.forEach(domain => {
      let preconnect = document.querySelector(`link[href="${domain}"]`) as HTMLLinkElement;
      if (!preconnect) {
        preconnect = document.createElement('link');
        preconnect.rel = 'preconnect';
        preconnect.href = domain;
        if (domain.includes('gstatic') || domain.includes('cloudinary')) {
          preconnect.crossOrigin = 'anonymous';
        }
        document.head.appendChild(preconnect);
      }
    });

    // Add structured data for local business
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "BeautySalon",
      "name": "The Magic Touch - Bhavani Akurathi",
      "description": description,
      "url": canonicalUrl,
      "telephone": "+91-81482-00139",
      "email": "themagictouch443@gmail.com",
      "image": [
        ogImage,
        "https://res.cloudinary.com/dyecmgvcy/image/upload/q_auto/v1757498585/Magictouch/IMG-20250910-WA0029_rxsb5b.webp",
        "https://res.cloudinary.com/dyecmgvcy/image/upload/q_auto/v1757494807/Magictouch/WhatsApp_Image_2025-09-08_at_08.41.20_b59b49d6_fq6qdm.webp"
      ],
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Vijayawada",
        "addressRegion": "Andhra Pradesh",
        "postalCode": "520001",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "16.5062",
        "longitude": "80.6480"
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "08:00",
        "closes": "20:00"
      },
      "priceRange": "$$",
      "servesCuisine": [],
      "serviceType": [
        "Bridal Makeup",
        "Party Makeup",
        "Editorial Makeup",
        "Pre-Wedding Makeup",
        "Saree Draping",
        "Hair Styling",
        "Engagement Makeup",
        "Reception Makeup",
        "Sangeet Makeup",
        "Mehendi Makeup",
        "HD Makeup",
        "Airbrush Makeup",
        "Glossy Makeup",
        "Skin Finish Makeup",
        "South Indian Bridal Makeup"
      ],
      "founder": {
        "@type": "Person",
        "name": "Bhavani Akurathi"
      },
      "sameAs": [
        "https://www.instagram.com/the.magictouch21",
        "https://wa.me/918148200139"
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Makeup Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Bridal Makeup"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Party Makeup"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Editorial Shoots"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Pre-Wedding Sessions"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Saree Draping"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Hair Styling"
            }
          }
        ]
      }
    };

    // Remove existing structured data
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Add new structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

  }, [title, description, keywords, ogImage, canonicalUrl]);

  return null;
}