import { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  canonicalUrl?: string;
}

export function SEOHead({
  title = "Bhavani Akurathi - The Magic Touch | Professional Bridal Makeup Artist in Vijayawada",
  description = "Transform your special day with Bhavani Akurathi's expert bridal makeup services in Vijayawada. Specializing in bridal transformations, party makeup, and editorial shoots. Book your consultation today!",
  keywords = "bridal makeup artist, wedding makeup, Vijayawada makeup artist, bridal transformation, party makeup, editorial makeup, professional makeup artist, beauty services, wedding beauty, makeup consultation",
  ogImage = "https://images.unsplash.com/photo-1553540751-988bd7918c7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmlkYWwlMjBtYWtldXAlMjBicmlkZSUyMHdlZGRpbmd8ZW58MXx8fHwxNzU2ODA2NDE2fDA&ixlib=rb-4.1.0&q=80&w=1200",
  canonicalUrl = "https://themagictouch.com"
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
    updateMetaTag('business:contact_data:street_address', 'Vijayawada, Andhra Pradesh');
    updateMetaTag('business:contact_data:locality', 'Vijayawada');
    updateMetaTag('business:contact_data:region', 'Andhra Pradesh');
    updateMetaTag('business:contact_data:postal_code', '520001');
    updateMetaTag('business:contact_data:country_name', 'India');

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
      'https://images.unsplash.com'
    ];

    preconnectDomains.forEach(domain => {
      let preconnect = document.querySelector(`link[href="${domain}"]`) as HTMLLinkElement;
      if (!preconnect) {
        preconnect = document.createElement('link');
        preconnect.rel = 'preconnect';
        preconnect.href = domain;
        if (domain.includes('gstatic')) {
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
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Vijayawada",
        "addressRegion": "Andhra Pradesh",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "16.5062",
        "longitude": "80.6480"
      },
      "openingHours": "Mo-Su 08:00-20:00",
      "priceRange": "$$",
      "servesCuisine": [],
      "serviceType": ["Bridal Makeup", "Party Makeup", "Editorial Makeup", "Pre-Wedding Makeup"],
      "founder": {
        "@type": "Person",
        "name": "Bhavani Akurathi"
      },
      "image": ogImage,
      "sameAs": [
        "https://instagram.com/themagictouch",
        "https://facebook.com/themagictouch"
      ]
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