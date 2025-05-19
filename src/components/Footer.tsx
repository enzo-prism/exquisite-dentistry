
import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Instagram, Facebook } from 'lucide-react';
import Button from './Button';
import OptimizedImage from './OptimizedImage';

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
    <footer className="bg-black text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {/* Logo and Brief Intro */}
          <div className="space-y-6">
            <div className="flex items-center justify-start h-14">
              <OptimizedImage 
                src="/lovable-uploads/fd45d438-10a2-4bde-9162-a38816b28958.png" 
                alt="Exquisite Dentistry" 
                width={180}
                height={48}
                className="w-auto h-full max-h-14"
                objectFit="contain"
              />
            </div>
            <p className="text-gray-300 text-sm max-w-xs">
              Providing exceptional dental care with a focus on comfort, quality, and personalized treatment plans.
            </p>
            <div className="flex space-x-5 pt-2">
              <a 
                href={SOCIAL_URLS.INSTAGRAM} 
                className="text-white hover:text-gold transition-colors" 
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram size={20} />
              </a>
              <a 
                href={SOCIAL_URLS.FACEBOOK} 
                className="text-white hover:text-gold transition-colors" 
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook size={20} />
              </a>
            </div>
            <div className="pt-4">
              <a href={SCHEDULING_URL} target="_blank" rel="noopener noreferrer">
                <Button variant="gold" size="sm">Book an Appointment</Button>
              </a>
            </div>

            {/* Care Plus Financing Banner */}
            <div className="bg-gold/10 p-4 rounded-sm mt-4">
              <h4 className="text-gold font-medium mb-2">Flexible Financing Available</h4>
              <p className="text-sm text-gray-300 mb-3">
                Get the care you need with convenient monthly payments
              </p>
              <Link to="/client-resources">
                <Button variant="gold" size="sm">Learn More</Button>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-sans font-medium text-lg mb-5 text-gold">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-white transition-colors">Services</Link>
              </li>
              <li>
                <Link to="/patient-resources" className="text-gray-300 hover:text-white transition-colors">Patient Resources</Link>
              </li>
              <li>
                <Link to="/testimonials" className="text-gray-300 hover:text-white transition-colors">Testimonials</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link>
              </li>
              <li>
                <Link to="/client-resources" className="text-gray-300 hover:text-white transition-colors">Client Resources</Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-sans font-medium text-lg mb-5 text-gold">Our Services</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/services#cosmetic" className="text-gray-300 hover:text-white transition-colors">Cosmetic Dentistry</Link>
              </li>
              <li>
                <Link to="/services#preventive" className="text-gray-300 hover:text-white transition-colors">Preventive Care</Link>
              </li>
              <li>
                <Link to="/services#restorative" className="text-gray-300 hover:text-white transition-colors">Restorative Dentistry</Link>
              </li>
              <li>
                <Link to="/services#specialty" className="text-gray-300 hover:text-white transition-colors">Specialized Procedures</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-sans font-medium text-lg mb-5 text-gold">Contact Information</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Phone size={18} className="text-gold mt-1 mr-3.5" />
                <span>(323) 272-2388</span>
              </li>
              <li className="flex items-start">
                <Mail size={18} className="text-gold mt-1 mr-3.5" />
                <span>info@exquisitedentistry.com</span>
              </li>
              <li className="flex items-start">
                <MapPin size={18} className="text-gold mt-1 mr-3.5" />
                <span>6227 Wilshire Blvd<br />Los Angeles, CA 90048</span>
              </li>
              <li className="flex items-start">
                <Clock size={18} className="text-gold mt-1 mr-3.5" />
                <div className="space-y-1">
                  <div>Monday-Thursday: 8AM-6PM</div>
                  <div>Friday: Closed</div>
                  <div>Saturday: Closed</div>
                  <div>Sunday: Closed</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-gray-800 text-sm text-gray-400 flex flex-col md:flex-row justify-between items-center">
          <div>
            © {currentYear} Exquisite Dentistry. All rights reserved.
          </div>
          <div className="mt-5 md:mt-0 flex space-x-8">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
            <div>HIPAA Compliant</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
