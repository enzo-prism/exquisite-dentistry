
import React, { useEffect } from 'react';
import { Phone, Mail, MapPin, Clock, Send, User, MessageSquare } from 'lucide-react';
import Button from '@/components/Button';

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log('Form submitted');
  };

  return (
    <div className="min-h-screen pt-24 page-transition-in">
      {/* Hero Section */}
      <section className="relative py-24">
        <div className="absolute top-0 inset-0 bg-[url('https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1968&auto=format&fit=crop')] bg-cover bg-center h-[50vh]">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-xs"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block bg-gold/90 text-white px-4 py-1 rounded-sm text-sm font-medium mb-6">
              GET IN TOUCH
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-semibold text-white leading-tight mb-6">
              Contact <span className="text-gold">Us</span>
            </h1>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="-mt-32 relative z-20 mb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow-xl rounded-sm">
            <div className="grid grid-cols-1 lg:grid-cols-3">
              {/* Contact Details */}
              <div className="bg-black text-white p-10 lg:p-12">
                <h2 className="text-2xl font-semibold mb-8">Contact Information</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <Phone size={20} className="text-gold mt-1 mr-4" />
                    <div>
                      <h3 className="font-medium mb-1">Phone</h3>
                      <p className="text-white/80">(123) 456-7890</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Mail size={20} className="text-gold mt-1 mr-4" />
                    <div>
                      <h3 className="font-medium mb-1">Email</h3>
                      <p className="text-white/80">info@exquisitedentistry.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin size={20} className="text-gold mt-1 mr-4" />
                    <div>
                      <h3 className="font-medium mb-1">Address</h3>
                      <p className="text-white/80">
                        123 Dental Avenue, Suite 100<br />
                        Los Angeles, CA 90210
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock size={20} className="text-gold mt-1 mr-4" />
                    <div>
                      <h3 className="font-medium mb-1">Hours</h3>
                      <div className="text-white/80">
                        <p>Monday-Friday: 9AM-6PM</p>
                        <p>Saturday: 9AM-2PM</p>
                        <p>Sunday: Closed</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-12 pt-6 border-t border-white/20">
                  <h3 className="font-medium mb-4">Follow Us</h3>
                  <div className="flex space-x-4">
                    <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-gold hover:text-white transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                      </svg>
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-gold hover:text-white transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                      </svg>
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-gold hover:text-white transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Contact Form */}
              <div className="col-span-2 p-10 lg:p-12">
                <h2 className="text-2xl font-semibold mb-8">Send Us a Message</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="block font-medium text-black">Name</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User size={18} className="text-gray-400" />
                        </div>
                        <input
                          type="text"
                          id="name"
                          className="block w-full pl-10 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
                          placeholder="Your name"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="email" className="block font-medium text-black">Email</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail size={18} className="text-gray-400" />
                        </div>
                        <input
                          type="email"
                          id="email"
                          className="block w-full pl-10 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
                          placeholder="Your email"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="subject" className="block font-medium text-black">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      className="block w-full py-3 px-4 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
                      placeholder="How can we help you?"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="block font-medium text-black">Message</label>
                    <div className="relative">
                      <div className="absolute top-3 left-3 pointer-events-none">
                        <MessageSquare size={18} className="text-gray-400" />
                      </div>
                      <textarea
                        id="message"
                        rows={6}
                        className="block w-full pl-10 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
                        placeholder="Your message"
                        required
                      ></textarea>
                    </div>
                  </div>
                  
                  <div>
                    <Button type="submit" className="w-full md:w-auto flex items-center justify-center group">
                      Send Message
                      <Send size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="mb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="heading-lg mb-4">Our Location</h2>
            <p className="paragraph">
              Conveniently located in the heart of Beverly Hills, our office is easily accessible with ample parking available.
            </p>
          </div>
          
          <div className="aspect-video bg-gray-200 rounded-sm overflow-hidden shadow-lg">
            {/* Replace with actual map embed code */}
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <p className="text-gray-500 text-lg">Google Maps Embed</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-sans font-semibold text-white leading-tight mb-6">
              Ready for Your <span className="text-gold">Appointment?</span>
            </h2>
            <p className="text-xl text-white/80 mb-10 font-light">
              Schedule your visit today and experience the Exquisite Dentistry difference.
            </p>
            <Button size="lg">Book an Appointment</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
