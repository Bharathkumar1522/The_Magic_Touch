import { useState, useRef } from 'react';
import { Instagram, MessageCircle, Phone, Mail, MapPin, ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });

  const sectionRef = useRef<HTMLElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappNumber = '918148200139';
    const message = `New Inquiry:\n\nName: ${formData.name}\nPhone: ${formData.phone}\nMessage: ${formData.message}`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    setFormData({ name: '', phone: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useGSAP(() => {
    gsap.from(".contact-elem", {
      scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      opacity: 0, y: 40, duration: 1.8, stagger: 0.15, ease: "expo.out"
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="contact" className="py-24 md:py-32 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Left Column - Contact Info */}
          <div className="w-full lg:w-5/12 flex flex-col justify-between">
            <div>
              <p className="contact-elem script-name text-3xl md:text-5xl text-rose-gold mb-6 tracking-wide">
                Get In Touch
              </p>
              <h2 className="contact-elem text-4xl md:text-6xl font-light tracking-tight text-deep-maroon uppercase mb-8">
                Let's Create Magic
              </h2>
              <div className="contact-elem w-12 h-[1px] bg-deep-maroon/30 mb-8"></div>
              <p className="contact-elem text-lg text-deep-maroon/70 font-light leading-relaxed mb-16 max-w-md">
                Ready to look absolutely stunning on your special day? I travel to your location to create the perfect look for you and your bridal party.
              </p>
            </div>

            <div className="space-y-12">
              <div className="contact-elem group">
                <p className="text-xs uppercase tracking-[0.2em] text-deep-maroon/40 mb-2 font-medium">Email</p>
                <a href="mailto:themagictouch443@gmail.com" className="text-xl md:text-2xl font-light text-deep-maroon hover:text-rose-gold transition-colors inline-block relative break-all">
                  themagictouch443@gmail.com
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-rose-gold transition-all duration-500 group-hover:w-full"></span>
                </a>
              </div>
              
              <div className="contact-elem group">
                <p className="text-xs uppercase tracking-[0.2em] text-deep-maroon/40 mb-2 font-medium">Phone</p>
                <a href="tel:+918148200139" className="text-xl md:text-2xl font-light text-deep-maroon hover:text-rose-gold transition-colors inline-block relative">
                  +91 81482 00139
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-rose-gold transition-all duration-500 group-hover:w-full"></span>
                </a>
              </div>

              <div className="contact-elem">
                <p className="text-xs uppercase tracking-[0.2em] text-deep-maroon/40 mb-2 font-medium">Service Area</p>
                <p className="text-xl md:text-2xl font-light text-deep-maroon">
                  Based in Vijayawada<br/>
                  <span className="text-lg text-deep-maroon/70">Available across India</span>
                </p>
              </div>

              <div className="contact-elem pt-8 flex gap-6">
                <a href="https://wa.me/918148200139?text=Hi! I'm interested in your bridal makeup services." target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-full border border-deep-maroon/20 flex items-center justify-center text-deep-maroon hover:bg-deep-maroon hover:text-white transition-all duration-500 hover:-translate-y-1 shadow-sm hover:shadow-lg">
                  <MessageCircle className="w-6 h-6" />
                </a>
                <a href="https://www.instagram.com/bhavsbeautystudio?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-full border border-deep-maroon/20 flex items-center justify-center text-deep-maroon hover:bg-deep-maroon hover:text-white transition-all duration-500 hover:-translate-y-1 shadow-sm hover:shadow-lg">
                  <Instagram className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="w-full lg:w-7/12 bg-ivory/50 p-8 md:p-16 rounded-sm contact-elem shadow-2xl shadow-deep-maroon/5 border border-deep-maroon/5">
            <h3 className="text-2xl md:text-3xl font-light text-deep-maroon mb-12">Inquire About Your Date</h3>
            <form onSubmit={handleSubmit} className="space-y-12">
              <div className="relative group">
                <input
                  type="text" id="name" name="name" value={formData.name} onChange={handleChange} required
                  className="w-full bg-transparent border-b border-deep-maroon/20 py-4 text-lg font-light text-deep-maroon focus:outline-none focus:border-rose-gold transition-colors peer"
                  placeholder=" "
                />
                <label htmlFor="name" className="absolute left-0 top-4 text-lg font-light text-deep-maroon/50 transition-all duration-300 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-rose-gold peer-valid:-top-4 peer-valid:text-xs peer-valid:text-deep-maroon/40 uppercase tracking-[0.2em] pointer-events-none">
                  Full Name
                </label>
              </div>

              <div className="relative group">
                <input
                  type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required
                  className="w-full bg-transparent border-b border-deep-maroon/20 py-4 text-lg font-light text-deep-maroon focus:outline-none focus:border-rose-gold transition-colors peer"
                  placeholder=" "
                />
                <label htmlFor="phone" className="absolute left-0 top-4 text-lg font-light text-deep-maroon/50 transition-all duration-300 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-rose-gold peer-valid:-top-4 peer-valid:text-xs peer-valid:text-deep-maroon/40 uppercase tracking-[0.2em] pointer-events-none">
                  Phone Number
                </label>
              </div>

              <div className="relative group">
                <textarea
                  id="message" name="message" value={formData.message} onChange={handleChange} required rows={4}
                  className="w-full bg-transparent border-b border-deep-maroon/20 py-4 text-lg font-light text-deep-maroon focus:outline-none focus:border-rose-gold transition-colors peer resize-none"
                  placeholder=" "
                />
                <label htmlFor="message" className="absolute left-0 top-4 text-lg font-light text-deep-maroon/50 transition-all duration-300 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-rose-gold peer-valid:-top-4 peer-valid:text-xs peer-valid:text-deep-maroon/40 uppercase tracking-[0.2em] pointer-events-none">
                  Event Details (Date, Location, Requirements)
                </label>
              </div>

              <button
                type="submit"
                className="group flex items-center justify-between w-full md:w-auto bg-deep-maroon text-white px-10 py-5 hover:bg-rose-gold transition-colors duration-500 rounded-sm shadow-xl shadow-deep-maroon/10 hover:shadow-rose-gold/20"
              >
                <span className="uppercase tracking-[0.2em] text-xs font-medium mr-8">Send Inquiry via WhatsApp</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-500" />
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}