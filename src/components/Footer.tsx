import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Instagram, Facebook, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from './ui/separator';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/use-scroll-animations';
import PhoneLink from '@/components/PhoneLink';
import { 
  PHONE_NUMBER_DISPLAY, 
  EMAIL, 
  ADDRESS, 
  SOCIAL_MEDIA, 
  BUSINESS_HOURS 
} from '@/constants/contact';
import { generateUTMUrl, UTM_PARAMETERS } from '@/utils/utmTracking';

// Scheduling URL constant
const SCHEDULING_URL = "https://scheduling.simplifeye.co/#key=g5zcQrkS2CtYq4odV42VrV7GyZrpy2F&gaID=null";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { ref: footerRef } = useScrollAnimation({ 
    animationClass: 'gpu-slide-in',
    threshold: 0.1 
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <footer 
      ref={footerRef}
      className="bg-gradient-to-b from-gray-900 to-black text-white gpu-accelerated"
      style={{
        minHeight: '400px',
        contain: 'layout',
        containIntrinsicSize: '100% 400px'
      }}
    >
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Practice Info */}
          <motion.div className="lg:col-span-1" variants={itemVariants}>
            <div 
              className="mb-6 flex items-center"
              style={{
                width: '200px',
                height: '37px',
                contain: 'layout',
                containIntrinsicSize: '200px 37px'
              }}
            >
              <img
                src="/lovable-uploads/fd45d438-10a2-4bde-9162-a38816b28958.webp"
                alt="Exquisite Dentistry"
                className="w-full h-full"
                style={{ 
                  objectFit: 'contain',
                  objectPosition: 'left center'
                }}
              />
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Providing exceptional dental care in the heart of Los Angeles with a focus on comfort, quality, and personalized treatment plans.
            </p>
            <div className="flex space-x-4">
              <motion.a 
                href={generateUTMUrl(SOCIAL_MEDIA.instagram, UTM_PARAMETERS.socialMedia.instagram)} 
                className="bg-gray-800 hover:bg-gold transition-colors p-3 rounded-full micro-glow" 
                aria-label="Follow us on Instagram"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Instagram size={20} />
              </motion.a>
              <motion.a 
                href={generateUTMUrl(SOCIAL_MEDIA.facebook, UTM_PARAMETERS.socialMedia.facebook)} 
                className="bg-gray-800 hover:bg-gold transition-colors p-3 rounded-full micro-glow" 
                aria-label="Follow us on Facebook"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Facebook size={20} />
              </motion.a>
              <motion.a 
                href={generateUTMUrl(SOCIAL_MEDIA.youtube, UTM_PARAMETERS.socialMedia.youtube)} 
                className="bg-gray-800 hover:bg-gold transition-colors p-3 rounded-full micro-glow" 
                aria-label="Follow us on YouTube"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Youtube size={20} />
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-semibold mb-6 text-gold">Practice</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors flex items-center group micro-lift">
                  <motion.span 
                    className="group-hover:translate-x-1 transition-transform"
                    whileHover={{ x: 4 }}
                  >
                    Home
                  </motion.span>
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
          </motion.div>

          {/* Patient Resources */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-semibold mb-6 text-gold">Patient Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/transformation-stories" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform">Transformation Stories</span>
                </Link>
              </li>
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
                <Link to="/sitemap" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform">Site Map</span>
                </Link>
              </li>
            </ul>
            
            {/* Special Services - Separated Section */}
            <div className="mt-8 pt-6 border-t border-gray-800">
              <h4 className="text-lg font-medium mb-4 text-gray-400">Special Services</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/wedding" className="text-gray-400 hover:text-gray-300 transition-colors flex items-center group text-sm">
                    <span className="group-hover:translate-x-1 transition-transform">Wedding Smiles</span>
                  </Link>
                </li>
                <li>
                  <Link to="/graduation" className="text-gray-400 hover:text-gray-300 transition-colors flex items-center group text-sm">
                    <span className="group-hover:translate-x-1 transition-transform">Graduation Ready</span>
                  </Link>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-semibold mb-6 text-gold">Visit Us</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin size={20} className="text-gold mt-1 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">Our Location</p>
                  <a 
                    href={generateUTMUrl('https://maps.google.com/maps?q=6227+Wilshire+Blvd,+Los+Angeles,+CA+90048', UTM_PARAMETERS.googleBusinessProfile)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {ADDRESS}
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Phone size={20} className="text-gold mt-1 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">Call Us</p>
                  <PhoneLink 
                    phoneNumber={PHONE_NUMBER_DISPLAY} 
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {PHONE_NUMBER_DISPLAY}
                  </PhoneLink>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Mail size={20} className="text-gold mt-1 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">Email Us</p>
                  <a href={`mailto:${EMAIL}`} className="text-gray-300 hover:text-white transition-colors">
                    {EMAIL}
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Clock size={20} className="text-gold mt-1 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">Office Hours</p>
                  <div className="text-gray-300 text-sm space-y-1">
                    <div><span className="text-gold">Mon:</span> {BUSINESS_HOURS.monday}</div>
                    <div><span className="text-gold">Tue:</span> {BUSINESS_HOURS.tuesday}</div>
                    <div><span className="text-gold">Wed:</span> {BUSINESS_HOURS.wednesday}</div>
                    <div><span className="text-gold">Thu:</span> {BUSINESS_HOURS.thursday}</div>
                    <div><span className="text-gold">Fri:</span> {BUSINESS_HOURS.friday}</div>
                    <div><span className="text-gold">Sat:</span> {BUSINESS_HOURS.saturday}</div>
                    <div><span className="text-gold">Sun:</span> {BUSINESS_HOURS.sunday}</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
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
              <a href="/sitemap.xml" className="text-gray-400 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                XML Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
