import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Instagram, Facebook } from 'lucide-react';
import Button from './Button';
import OptimizedImage from './OptimizedImage';
import { Separator } from './ui/separator';

// Scheduling URL constant
const SCHEDULING_URL = "https://scheduling.simplifeye.co/#key=g5zcQrkS2CtYq4odV42VrV7GyZrpy2F&gaID=null";

// Social media URLs
const SOCIAL_URLS = {
  FACEBOOK: "https://www.facebook.com/ExquisiteDentistry/",
  INSTAGRAM: "https://www.instagram.com/exquisitedentistryla/"
};

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      className="bg-gradient-to-b from-gray-900 to-black text-white"
      style={{
        minHeight: '400px',
        contain: 'layout',
        containIntrinsicSize: '100% 400px'
      }}
    >
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Practice Info */}
          <div className="lg:col-span-1">
            <div 
              className="mb-6 flex items-center"
              style={{
                width: '200px',
                height: '48px',
                contain: 'layout',
                containIntrinsicSize: '200px 48px'
              }}
            >
              <OptimizedImage 
                src="/lovable-uploads/fd45d438-10a2-4bde-9162-a38816b28958.png" 
                alt="Exquisite Dentistry" 
                width={200}
                height={48}
                className="w-full h-full"
                objectFit="contain"
                priority={true}
                fallbackSrc="/lovable-uploads/9e823f53-f866-40f9-a3e2-78373640ee8f.png"
                loadingVariant="minimal"
              />
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Providing exceptional dental care in the heart of Los Angeles with a focus on comfort, quality, and personalized treatment plans.
            </p>
            <div className="flex space-x-4">
              <a 
                href={SOCIAL_URLS.INSTAGRAM} 
                className="bg-gray-800 hover:bg-gold transition-colors p-3 rounded-full" 
                aria-label="Follow us on Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram size={20} />
              </a>
              <a 
                href={SOCIAL_URLS.FACEBOOK} 
                className="bg-gray-800 hover:bg-gold transition-colors p-3 rounded-full" 
                aria-label="Follow us on Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-gold">Practice</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform">Home</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform">About Dr. Aguil</span>
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform">Our Services</span>
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform">Blog</span>
                </Link>
              </li>
              <li>
                <Link to="/client-experience" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform">Client Experience</span>
                </Link>
              </li>
              <li>
                <Link to="/testimonials" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform">Testimonials</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform">Contact Us</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Patient Resources */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-gold">Patient Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/smile-gallery" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform">Smile Gallery</span>
                </Link>
              </li>
              <li>
                <Link to="/faqs" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform">FAQs</span>
                </Link>
              </li>
              <li>
                <Link to="/wedding" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform">Wedding Smiles</span>
                </Link>
              </li>
              <li>
                <Link to="/graduation" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform">Graduation Ready</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-gold">Visit Us</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin size={20} className="text-gold mt-1 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">Our Location</p>
                  <p className="text-gray-300">6227 Wilshire Blvd<br />Los Angeles, CA 90048</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Phone size={20} className="text-gold mt-1 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">Call Us</p>
                  <a href="tel:(323) 272-2388" className="text-gray-300 hover:text-white transition-colors">
                    (323) 272-2388
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Mail size={20} className="text-gold mt-1 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">Email Us</p>
                  <a href="mailto:info@exquisitedentistryla.com" className="text-gray-300 hover:text-white transition-colors">
                    info@exquisitedentistryla.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Clock size={20} className="text-gold mt-1 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">Office Hours</p>
                  <div className="text-gray-300 text-sm space-y-1">
                    <div>Mon-Thu: 8AM-6PM</div>
                    <div>Fri-Sun: Closed</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear} Exquisite Dentistry. All rights reserved.
            </div>
            <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm">
              <Link to="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link to="/hipaa-compliance" className="text-gray-400 hover:text-white transition-colors">
                HIPAA Compliance
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
