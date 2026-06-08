import { useState, useRef } from 'react';
import { Instagram, MessageCircle, Phone, Mail, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card, CardContent } from './ui/card';
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
    const message = `New Contact Form Submission:\n\nName: ${formData.name}\nPhone: ${formData.phone}\nMessage: ${formData.message}`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    setFormData({ name: '', phone: '', message: '' });
    alert('Thank you for your message! Redirecting to WhatsApp to send your inquiry.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useGSAP(() => {
    gsap.from(".contact-header", {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none none"
      },
      opacity: 0,
      y: 30,
      duration: 1,
      stagger: 0.15,
      ease: "power3.out"
    });

    gsap.from(".contact-form-anim", {
      scrollTrigger: {
        trigger: ".contact-grid",
        start: "top 75%",
        toggleActions: "play none none none"
      },
      opacity: 0,
      x: -30,
      duration: 1,
      ease: "power3.out"
    });

    gsap.from(".contact-info-anim", {
      scrollTrigger: {
        trigger: ".contact-grid",
        start: "top 75%",
        toggleActions: "play none none none"
      },
      opacity: 0,
      x: 30,
      duration: 1,
      delay: 0.2,
      ease: "power3.out"
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="contact" className="py-16 md:py-24 px-4 md:px-6 bg-gradient-to-b from-ivory to-cream overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 optimize-gpu">
          <h2 className="contact-header text-4xl md:text-5xl mb-4 text-deep-maroon">
            Get In Touch
          </h2>
          <p className="contact-header script-name text-2xl md:text-3xl text-deep-maroon mb-4">
            with Bhavani Akurathi
          </p>
          <p className="contact-header text-lg text-deep-maroon/80 max-w-2xl mx-auto">
            Ready to look absolutely stunning on your special day? I travel to your location to create the perfect look for you and your bridal party.
          </p>
        </div>

        <div className="contact-grid grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="contact-form-anim optimize-gpu">
            <Card className="bg-white/70 backdrop-blur-sm border-rose-gold/30 h-full">
              <CardContent className="p-8 h-full flex flex-col">
                <h3 className="text-2xl mb-6 text-deep-maroon">
                  Send us a Message
                </h3>
                <form onSubmit={handleSubmit} className="space-y-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-deep-maroon mb-2">Full Name *</label>
                      <Input
                        id="name" name="name" value={formData.name} onChange={handleChange} required
                        className="border-rose-gold/30 focus:border-rose-gold transition-colors duration-300"
                        placeholder="Your beautiful name"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-deep-maroon mb-2">Phone Number</label>
                      <Input
                        id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange}
                        className="border-rose-gold/30 focus:border-rose-gold transition-colors duration-300"
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-deep-maroon mb-2">Tell us about your special day *</label>
                      <Textarea
                        id="message" name="message" value={formData.message} onChange={handleChange} required rows={5}
                        className="border-rose-gold/30 focus:border-rose-gold transition-colors duration-300"
                        placeholder="Share details about your wedding date, style preferences, and any special requirements..."
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-rose-gold to-deep-maroon hover:from-deep-maroon hover:to-rose-gold text-white py-3 rounded-full transition-all duration-300 hover:scale-105 shadow-md mt-6"
                  >
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="contact-info-anim space-y-8 optimize-gpu">
            <Card className="bg-white/70 backdrop-blur-sm border-rose-gold/30 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-2xl mb-6 text-deep-maroon">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 group">
                    <div className="w-12 h-12 bg-gradient-to-br from-blush-pink to-rose-gold rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <Phone className="w-6 h-6 text-deep-maroon" />
                    </div>
                    <div>
                      <p className="font-medium text-deep-maroon">Phone</p>
                      <a href="tel:+918148200139" className="text-deep-maroon/70 hover:text-deep-maroon transition-colors duration-200">
                        +91 81482 00139
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 group">
                    <div className="w-12 h-12 bg-gradient-to-br from-blush-pink to-rose-gold rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <Mail className="w-6 h-6 text-deep-maroon" />
                    </div>
                    <div className="min-w-0 flex flex-col">
                      <p className="font-medium text-deep-maroon">Email</p>
                      <a href="mailto:themagictouch443@gmail.com" className="text-deep-maroon/70 break-all hover:text-deep-maroon transition-colors duration-200">
                        themagictouch443@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 group">
                    <div className="w-12 h-12 bg-gradient-to-br from-blush-pink to-rose-gold rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <MapPin className="w-6 h-6 text-deep-maroon" />
                    </div>
                    <div>
                      <p className="font-medium text-deep-maroon">Service Area</p>
                      <p className="text-deep-maroon/70">Based in Vijayawada<br />Available for travel across India.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-rose-gold/30 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-2xl mb-6 text-deep-maroon">Connect With Us</h3>
                <p className="text-deep-maroon/70 mb-6">Message us directly on WhatsApp or follow our latest work</p>
                <div className="flex space-x-4">
                  <a href="https://wa.me/918148200139?text=Hi! I'm interested in your bridal makeup services. Can we discuss?" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center hover:scale-110 hover:rotate-12 transition-all duration-300 shadow-lg" title="Message on WhatsApp">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </a>
                  <a href="https://www.instagram.com/bhavsbeautystudio?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" className="w-12 h-12 bg-gradient-to-br from-blush-pink to-rose-gold rounded-full flex items-center justify-center hover:scale-110 hover:-rotate-12 transition-all duration-300 shadow-md" title="Follow on Instagram" target="_blank" rel="noopener noreferrer">
                    <Instagram className="w-6 h-6 text-deep-maroon" />
                  </a>
                  <a href="tel:+918148200139" className="w-12 h-12 bg-gradient-to-br from-blush-pink to-rose-gold rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-md" title="Call Now">
                    <Phone className="w-6 h-6 text-deep-maroon" />
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}