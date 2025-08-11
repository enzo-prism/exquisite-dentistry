import React from 'react';
import VideoHero from '@/components/VideoHero';
import ClientExperienceSection from '@/components/PatientExperienceSection';
import { Helmet } from 'react-helmet-async';
import ServicesSection from '@/components/ServicesSection';
import ReviewWidget from '@/components/ReviewWidget';
import SeasonalTreatments from '@/components/SeasonalTreatments';
import PracticeVideoSection from '@/components/PracticeVideoSection';
import TestimonialThumbnail from '@/components/TestimonialThumbnail';
import DoctorIntroSection from '@/components/DoctorIntroSection';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import SeoStructuredData from '@/components/SeoStructuredData';
import ReviewStructuredData from '@/components/ReviewStructuredData';
import ImageComponent from '@/components/Image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { VIDEO_TESTIMONIALS } from '@/components/video-hero/video-constants';
import FloatingActionButton from '@/components/mobile/FloatingActionButton';
import ProgressiveLoader from '@/components/mobile/ProgressiveLoader';

const IndexPage: React.FC = () => {
  // Scroll progress for animations
  const { scrollYProgress } = useScroll();
  const yProgress = useTransform(scrollYProgress, [0, 1], [0, 100]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.6
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Best Cosmetic Dentist Los Angeles | Exquisite Dentistry Dr. Alexie Aguil</title>
        <link rel="canonical" href="https://exquisitedentistryla.com/" />
        <meta name="description" content="Transform your smile with Los Angeles' premier cosmetic dentist Dr. Alexie Aguil. Specializing in veneers, teeth whitening, and smile makeovers in Beverly Hills area. Book your consultation today!" />
        <meta name="keywords" content="cosmetic dentist Los Angeles, porcelain veneers, teeth whitening, smile makeover, Beverly Hills dentist, dental implants, cosmetic dentistry" />
        <meta property="og:title" content="Best Cosmetic Dentist Los Angeles | Exquisite Dentistry Dr. Alexie Aguil" />
        <meta property="og:description" content="Transform your smile with Los Angeles' premier cosmetic dentist Dr. Alexie Aguil. Specializing in veneers, teeth whitening, and smile makeovers in Beverly Hills area." />
        <meta property="og:image" content="/lovable-uploads/2e2732fc-c4a6-4f21-9829-3717d9b2b36d.png" />
        <meta property="og:url" content="https://exquisitedentistryla.com/" />
      </Helmet>
      <SeoStructuredData />
      <ReviewStructuredData />
      
      <VideoHero 
        title={<>Welcome to <span className="text-gold">Exquisite Dentistry</span></>} 
        subtitle="Experience world-class cosmetic dentistry in Los Angeles with Dr. Alexie Aguil." 
        primaryCta={{
          text: "Schedule a Consultation",
          href: "https://scheduling.simplifeye.co/#key=g5zcQrkS2CtYq4odV42VrV7GyZrpy2F&gaID=null"
        }}
        secondaryCta={{
          text: "Discover Our Practice",
          href: "/about"
        }}
        useGradient={false}
      />
      
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{ willChange: 'transform' }}
      >
        <SeasonalTreatments />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ willChange: 'transform' }}
      >
        <PracticeVideoSection />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
        style={{ willChange: 'transform' }}
      >
        <DoctorIntroSection />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{ willChange: 'transform' }}
      >
        <ServicesSection />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ willChange: 'transform' }}
      >
        <ClientExperienceSection />
      </motion.div>
      <motion.section 
        className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ willChange: 'transform' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.span 
              className="inline-block text-sm text-gold font-medium mb-3"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              TESTIMONIALS
            </motion.span>
            <motion.h2 
              className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Client <span className="text-gold">Reviews</span>
            </motion.h2>
            <motion.div 
              className="separator mx-auto"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            />
            <motion.p 
              className="text-gray-600 mt-6 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              See what our clients are saying about their experience at Exquisite Dentistry
            </motion.p>
          </motion.div>
          
          {/* Video Testimonials */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8 mb-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {VIDEO_TESTIMONIALS.map((testimonial, index) => (
              <motion.div key={testimonial.vimeoId} variants={itemVariants}>
                <TestimonialThumbnail
                  vimeoId={testimonial.vimeoId}
                  thumbnailUrl={testimonial.thumbnailUrl}
                  title={testimonial.title}
                />
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="bg-white shadow-lg rounded-sm border border-gray-100 p-8"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{ willChange: 'transform' }}
          >
            <ReviewWidget />
          </motion.div>
        </div>
      </motion.section>

      {/* Mobile Floating Action Button */}
      <FloatingActionButton />
    </>
  );
};

export default IndexPage;