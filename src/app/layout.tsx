import type { Metadata } from 'next'
import '../index.css'

export const metadata: Metadata = {
  title: 'Bhavani Akurathi - Bhavs Beauty Studio | Best Bridal Makeup Artist & Hairstylist in Vijayawada',
  description: 'Transform your special day with Bhavani Akurathi\'s expert bridal makeup services in Vijayawada. Specializing in high-definition bridal makeup, saree draping, hairstyling, party makeup, and editorial shoots. Book your consultation today!',
  keywords: 'bridal makeup artist Vijayawada, wedding makeup Andhra Pradesh, professional makeup artist India, destination wedding makeup, bridal transformation, party makeup, editorial makeup, best makeup artist Vijayawada, Bhavani Akurathi, Bhavs Beauty Studio, sangeet makeup, mehendi makeup, reception makeup, engagement makeup, fashion photography makeup, airbrush makeup, HD makeup, saree draping, hair styling, Simple makeup, Sareedraping, Hairstylist Vijayawada, Hairstyling, Sareedrapist Vijayawada, Glossy makeup Vijayawada, Skin finish makeup, marriage bridal makeup artist, makeup artist near me, south indian bridal makeup artist, bride makeup',
  authors: [{ name: 'Bhavani Akurathi - Bhavs Beauty Studio' }],
  openGraph: {
    title: 'Bhavani Akurathi - Bhavs Beauty Studio | Best Bridal Makeup Artist & Hairstylist in Vijayawada',
    description: 'Transform your special day with Bhavani Akurathi\'s expert bridal makeup services in Vijayawada.',
    url: 'https://bhavsbeautystudio.netlify.app',
    siteName: 'Bhavs Beauty Studio - Bhavani Akurathi',
    images: [
      {
        url: 'https://res.cloudinary.com/dyecmgvcy/image/upload/f_auto,q_auto/v1757494544/Magictouch/V_P09800_copy_1_z5lsg5.webp',
        width: 1200,
        height: 630,
        alt: 'Bhavs Beauty Studio',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bhavani Akurathi - Bhavs Beauty Studio | Best Bridal Makeup Artist & Hairstylist in Vijayawada',
    description: 'Transform your special day with Bhavani Akurathi\'s expert bridal makeup services in Vijayawada.',
    images: ['https://res.cloudinary.com/dyecmgvcy/image/upload/f_auto,q_auto/v1757494544/Magictouch/V_P09800_copy_1_z5lsg5.webp'],
  },
  alternates: {
    canonical: 'https://bhavsbeautystudio.netlify.app',
  },
  verification: {
    google: ['tLgMY8nZ-fscdwHDoKbG3PUzYv8ymQcOqrNPC51caeU', 'S2g0ngwgdADeVcUZNvzLvlzHU80JTQHbj-8w7g5VvKw', 'DOnMPq7J_psNBXlNRw-uCeP59OXVSHLWSUlySynZKaE', '1q-Uw0dRZDb4p0BzqFVhyVDk-Ebm2YMmw4n6VdzyKeE', 'mfiVdYraP0Ks0DLSRbkqgVYxuPMwoPm5JQHN2stLopM']
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "name": "Bhavs Beauty Studio - Bhavani Akurathi",
    "description": "Transform your special day with Bhavani Akurathi's expert bridal makeup services in Vijayawada.",
    "url": "https://bhavsbeautystudio.netlify.app",
    "telephone": "+91-81482-00139",
    "priceRange": "$$",
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
    "image": "https://res.cloudinary.com/dyecmgvcy/image/upload/f_auto,q_auto/v1757494544/Magictouch/V_P09800_copy_1_z5lsg5.webp",
    "founder": {
      "@type": "Person",
      "name": "Bhavani Akurathi"
    },
    "sameAs": [
      "https://www.instagram.com/bhavsbeautystudio",
      "https://wa.me/918148200139"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Bridal Makeup and Hairstyling Services",
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
            "name": "Airbrush Makeup"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Hairstyling"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Saree Draping"
          }
        }
      ]
    }
  };

  return (
    <html lang="en" className="lenis lenis-smooth">
      <head>
        <link rel="icon" type="image/svg+xml" href="https://res.cloudinary.com/dyecmgvcy/image/upload/t_logo/v1757497071/Magictouch/Gemini_Generated_Image_flt7htflt7htflt7_sotzfh.png" />
        <meta name="theme-color" content="#8b4a6b" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  )
}
