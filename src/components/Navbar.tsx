import { useState, useEffect, useCallback, useMemo, memo, useRef } from "react";
import { Menu, X } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export const Navbar = memo(function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navContainerRef = useRef<HTMLElement>(null);

  const navLinks = useMemo(() => [
    { href: "#home", label: "Home" },
    { href: "#styles", label: "Styles" },
    { href: "#services", label: "Services" },
    { href: "#gallery", label: "Gallery" },
    { href: "#testimonials", label: "Testimonials" },
    { href: "#contact", label: "Contact" },
  ], []);

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const threshold = window.innerHeight * 0.8;
    setIsScrolled(scrollTop > threshold);
  }, []);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  useEffect(() => {
    let ticking = false;
    const handleScrollThrottle = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScrollThrottle, { passive: true });
    return () => window.removeEventListener("scroll", handleScrollThrottle);
  }, [handleScroll]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isMenuOpen && !target.closest('nav')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  // GSAP Menu Animations
  useGSAP(() => {
    if (!menuRef.current) return;
    
    if (isMenuOpen) {
      gsap.to(menuRef.current, {
        height: "auto",
        duration: 0.4,
        ease: "expo.out",
        display: "block"
      });
      
      gsap.fromTo(".mobile-nav-link", 
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.3, stagger: 0.05, ease: "expo.out", delay: 0.1 }
      );
    } else {
      gsap.to(menuRef.current, {
        height: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          if (menuRef.current) menuRef.current.style.display = "none";
        }
      });
    }
  }, { dependencies: [isMenuOpen], scope: navContainerRef });

  return (
    <nav
      ref={navContainerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 optimize-gpu ${isScrolled
          ? "bg-white/80 backdrop-blur-sm shadow-lg"
          : "bg-transparent backdrop-blur-xs"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <a href="#home" className="flex items-center">
              <div className="flex flex-col">
                <span
                  className={`script-name text-lg md:text-xl transition-all duration-500 ${isScrolled
                      ? "text-deep-maroon"
                      : "text-white drop-shadow-lg [text-shadow:_1px_1px_3px_rgba(0,0,0,0.4)]"
                    }`}
                >
                  Bhavani Akurathi
                </span>
                <span
                  className={`text-xs md:text-sm font-sans italic -mt-1 transition-all duration-500 ${isScrolled
                      ? "text-deep-maroon/70"
                      : "text-white/80 drop-shadow-md"
                    }`}
                >
                  Bhavs Beauty Studio
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`transition-all duration-300 font-medium relative group ${isScrolled
                    ? "text-deep-maroon hover:text-rose-gold"
                    : "text-white/90 hover:text-white drop-shadow-md"
                  }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${isScrolled ? "bg-rose-gold" : "bg-white"
                    }`}
                ></span>
              </a>
            ))}
            <a
              href="#contact"
              className={`px-6 py-2 rounded-full transition-all duration-300 font-medium hover:scale-105 active:scale-95 ${isScrolled
                  ? "bg-deep-maroon text-ivory hover:bg-deep-maroon/90"
                  : "bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 border border-white/30 hover:border-white/50 drop-shadow-lg"
                }`}
            >
              Book Now
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className={`md:hidden p-2 transition-all duration-300 rounded-lg hover:scale-105 active:scale-95 ${isScrolled
                ? "text-deep-maroon hover:text-rose-gold bg-transparent"
                : "text-white/90 hover:text-white bg-white/10 backdrop-blur-sm"
              }`}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          ref={menuRef}
          style={{ height: 0, overflow: 'hidden', display: 'none' }}
          className={`md:hidden backdrop-blur-md rounded-b-lg mx-2 mb-2 ${isScrolled
              ? "bg-ivory/95 border-t border-rose-gold/20"
              : "bg-white/10 border-t border-white/20"
            }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`mobile-nav-link block px-3 py-2 rounded-lg transition-all duration-300 font-medium ${isScrolled
                    ? "text-deep-maroon hover:text-rose-gold hover:bg-rose-gold/10"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                  }`}
                onClick={closeMenu}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className={`mobile-nav-link block mx-3 mt-4 px-6 py-3 rounded-full text-center transition-all duration-300 font-medium ${isScrolled
                  ? "bg-deep-maroon text-ivory hover:bg-deep-maroon/90"
                  : "bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 border border-white/30"
                }`}
              onClick={closeMenu}
            >
              Book Now
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
});