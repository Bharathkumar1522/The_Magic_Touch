import { useState } from 'react';
import { Instagram, MessageCircle, Share, Phone, Mail, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card, CardContent } from './ui/card';

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create WhatsApp message
    const whatsappNumber = '918148200139'; // Phone number without spaces or special characters
    const message = `New Contact Form Submission:
    
Name: ${formData.name}
Phone: ${formData.phone}
Message: ${formData.message}`;

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    // Open WhatsApp
    window.open(whatsappUrl, '_blank');

    // Reset form
    setFormData({ name: '', phone: '', message: '' });

    // Show success message
    alert('Thank you for your message! Redirecting to WhatsApp to send your inquiry.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section className="py-16 md:py-24 px-4 md:px-6 bg-gradient-to-b from-ivory to-cream">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4 text-deep-maroon">
            Get In Touch
          </h2>
          <p className="script-name text-2xl md:text-3xl text-deep-maroon mb-4">
            with Bhavani Akurathi
          </p>
          <p className="text-lg text-deep-maroon/80 max-w-2xl mx-auto">
            Ready to look absolutely stunning on your special day? I travel to your location to create the perfect look for you and your bridal party.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="bg-white/70 backdrop-blur-sm border-rose-gold/30">
            <CardContent className="p-8">
              <h3 className="text-2xl mb-6 text-deep-maroon">
                Send us a Message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-deep-maroon mb-2">
                    Full Name *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="border-rose-gold/30 focus:border-rose-gold"
                    placeholder="Your beautiful name"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-deep-maroon mb-2">
                    Phone Number
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="border-rose-gold/30 focus:border-rose-gold"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-deep-maroon mb-2">
                    Tell us about your special day *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="border-rose-gold/30 focus:border-rose-gold"
                    placeholder="Share details about your wedding date, style preferences, and any special requirements..."
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-rose-gold to-deep-maroon hover:from-deep-maroon hover:to-rose-gold text-white py-3 rounded-full transition-all duration-300"
                >
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="bg-white/70 backdrop-blur-sm border-rose-gold/30">
              <CardContent className="p-8">
                <h3 className="text-2xl mb-6 text-deep-maroon">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  {/* Phone */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blush-pink to-rose-gold rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-deep-maroon" />
                    </div>
                    <div>
                      <p className="font-medium text-deep-maroon">Phone</p>
                      <a
                        href="tel:+918148200139"
                        className="text-deep-maroon/70 hover:text-deep-maroon transition-colors duration-200 break-all select-all"
                      >
                        +91 81482 00139
                      </a>
                    </div>
                  </div>
                  {/* Email */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blush-pink to-rose-gold rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-deep-maroon" />
                    </div>
                    <div className="min-w-0 flex flex-col">
                      <p className="font-medium text-deep-maroon">Email</p>
                      <a
                        href="mailto:themagictouch443@gmail.com"
                        className="text-deep-maroon/70 whitespace-normal break-all select-all"
                      >
                        themagictouch443@gmail.com
                      </a>
                    </div>
                  </div>
                  {/* Service Area */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blush-pink to-rose-gold rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-deep-maroon" />
                    </div>
                    <div>
                      <p className="font-medium text-deep-maroon">Service Area</p>
                      <p className="text-deep-maroon/70 break-normal">
                        Based in Vijayawada<br />
                        Available for travel across India.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>


            <Card className="bg-white/70 backdrop-blur-sm border-rose-gold/30">
              <CardContent className="p-8">
                <h3 className="text-2xl mb-6 text-deep-maroon">
                  Connect With Us
                </h3>
                <p className="text-deep-maroon/70 mb-6">
                  Message us directly on WhatsApp or follow our latest work
                </p>
                <div className="flex space-x-4">
                  <a
                    href="https://wa.me/918148200139?text=Hi! I'm interested in your bridal makeup services. Can we discuss?"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-lg"
                    title="Message on WhatsApp"
                  >
                    <MessageCircle className="w-6 h-6 text-white" />
                  </a>
                  <a
                    href="https://www.instagram.com/the.magictouch21?igsh=MW8weWxxNzZwZ2czdQ%3D%3D&utm_source=qr"
                    className="w-12 h-12 bg-gradient-to-br from-blush-pink to-rose-gold rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300"
                    title="Follow on Instagram"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Instagram className="w-6 h-6 text-deep-maroon" />
                  </a>
                  <a
                    href="tel:+918148200139"
                    className="w-12 h-12 bg-gradient-to-br from-blush-pink to-rose-gold rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300"
                    title="Call Now"
                  >
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