import { Instagram, MessageCircle, Heart } from 'lucide-react';
import { memo, useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export const Footer = memo(function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from(".footer-anim", {
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 90%",
        toggleActions: "play none none none"
      },
      opacity: 0,
      y: 30,
      duration: 0.8,
      stagger: 0.15,
      ease: "expo.out"
    });
  }, { scope: footerRef });

  return (
    <footer ref={footerRef} className="bg-deep-maroon text-ivory py-12 md:py-16 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto optimize-gpu">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="footer-anim md:col-span-2">
            <div className="flex flex-col items-start mb-6">
              <div className="mb-3">
                <h3 className="signature-name text-4xl md:text-5xl text-ivory mb-2">Bhavani Akurathi</h3>
                <p className="text-xl md:text-2xl font-serif italic text-ivory/80">Bhavs Beauty Studio</p>
              </div>
            </div>
            <p className="text-ivory/80 mb-6 leading-relaxed">
              Creating timeless beauty and unforgettable moments through the art of bridal makeup.
              Every bride deserves to feel radiant and confident on her special day.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/bhavsbeautystudio?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                className="w-10 h-10 bg-ivory/20 rounded-full flex items-center justify-center hover:bg-ivory/30 transition-colors duration-300 hover:scale-110"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/918148200139?text=Hi! I'm interested in your bridal makeup services. Can we discuss?"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-ivory/20 rounded-full flex items-center justify-center hover:bg-ivory/30 transition-colors duration-300 hover:scale-110"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-anim">
            <h4 className="font-medium mb-4 text-lg">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="text-ivory/80 hover:text-ivory hover:translate-x-1 inline-block transition-transform duration-200">Home</a></li>
              <li><a href="#styles" className="text-ivory/80 hover:text-ivory hover:translate-x-1 inline-block transition-transform duration-200">Signature Styles</a></li>
              <li><a href="#services" className="text-ivory/80 hover:text-ivory hover:translate-x-1 inline-block transition-transform duration-200">Services</a></li>
              <li><a href="#testimonials" className="text-ivory/80 hover:text-ivory hover:translate-x-1 inline-block transition-transform duration-200">Testimonials</a></li>
              <li><a href="#contact" className="text-ivory/80 hover:text-ivory hover:translate-x-1 inline-block transition-transform duration-200">Contact</a></li>
            </ul>
          </div>

          {/* Services */}
          <div className="footer-anim">
            <h4 className="font-medium mb-4 text-lg">Services</h4>
            <ul className="space-y-2">
              <li><a href="#services" className="text-ivory/80 hover:text-ivory hover:translate-x-1 inline-block transition-transform duration-200">Bridal Makeup</a></li>
              <li><a href="#services" className="text-ivory/80 hover:text-ivory hover:translate-x-1 inline-block transition-transform duration-200">Party Makeup</a></li>
              <li><a href="#gallery" className="text-ivory/80 hover:text-ivory hover:translate-x-1 inline-block transition-transform duration-200">Editorial Shoots</a></li>
              <li><a href="#gallery" className="text-ivory/80 hover:text-ivory hover:translate-x-1 inline-block transition-transform duration-200">Pre-Wedding Sessions</a></li>
              <li><a href="#contact" className="text-ivory/80 hover:text-ivory hover:translate-x-1 inline-block transition-transform duration-200">Makeup Trials</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer-anim border-t border-ivory/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-2 text-center md:text-left">
              <p className="text-ivory/60">
                © 2025 Bhavani Akurathi - Bhavs Beauty Studio. All rights reserved.
              </p>
            </div>
            <div className="flex items-center space-x-2 text-ivory/60">
              <span>Made with</span>
              <Heart className="w-4 h-4 fill-rose-gold text-rose-gold" />
              <span>for beautiful brides</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
});