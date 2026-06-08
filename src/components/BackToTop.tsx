import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { useLenis } from 'lenis/react';

export function BackToTop() {
    const [isVisible, setIsVisible] = useState(false);
    const lenis = useLenis();

    useEffect(() => {
        const toggleVisibility = () => {
            // Show button when scrolled down 500px
            if (window.scrollY > 500) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        if (lenis) {
            lenis.scrollTo(0, { duration: 1.5, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
        } else {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    };

    return (
        <button
            onClick={scrollToTop}
            className={`fixed bottom-6 right-6 z-50 p-3 bg-rose-gold/90 text-white rounded-full shadow-lg hover:bg-deep-maroon hover:shadow-xl hover:-translate-y-1 transition-all duration-300 optimize-gpu ${
                isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-50 translate-y-10 pointer-events-none'
            }`}
            aria-label="Scroll back to top"
        >
            <ArrowUp className="w-5 h-5" />
        </button>
    );
}
