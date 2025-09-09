import React from 'react';
import VideoHero from '@/components/VideoHero';
import ClientExperienceSection from '@/components/PatientExperienceSection';
import PageSEO from '@/components/seo/PageSEO';
import ServicesSection from '@/components/ServicesSection';
import ReviewWidget from '@/components/ReviewWidget';
import SeasonalTreatments from '@/components/SeasonalTreatments';
import PracticeVideoSection from '@/components/PracticeVideoSection';
import TestimonialThumbnail from '@/components/TestimonialThumbnail';
import DoctorIntroSection from '@/components/DoctorIntroSection';
import SmileGalleryPreview from '@/components/SmileGalleryPreview';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import MasterStructuredData from '@/components/seo/MasterStructuredData';
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
      <MasterStructuredData 
        includeBusiness={true}
        includeDoctor={true}
        includeWebsite={true}
        includeReviews={true}
      />
      <PageSEO 
        title="Best Cosmetic Dentist Los Angeles | Exquisite Dentistry Dr. Alexie Aguil"
        description="Cosmetic and restorative dentistry in Los Angeles by Dr. Alexie Aguil—veneers, whitening, Invisalign and more. Concierge care and comfortable visits."
        keywords="cosmetic dentist Los Angeles, porcelain veneers, teeth whitening, smile makeover, Beverly Hills dentist, dental implants, cosmetic dentistry"
        path=""
        ogImage="/lovable-uploads/2e2732fc-c4a6-4f21-9829-3717d9b2b36d.png"
      />
      
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
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
        style={{ willChange: 'transform' }}
      >
        <SmileGalleryPreview />
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
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{ willChange: 'transform' }}
      >
        <SeasonalTreatments />
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
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10 mb-12"
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

      {/* SEO-Rich Content Section */}
      <section className="relative z-10 bg-background py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Los Angeles' Premier Cosmetic Dentist - Dr. Alexie Aguil
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Transform your smile with award-winning cosmetic dentistry in Beverly Hills. 
                Dr. Alexie Aguil specializes in porcelain veneers, teeth whitening, dental implants, 
                and complete smile makeovers using the latest technology and artistic expertise.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-3xl font-semibold text-foreground mb-4">
                  Why Choose Exquisite Dentistry?
                </h3>
                <p className="text-muted-foreground mb-4">
                  Located in the heart of Beverly Hills, our practice combines advanced dental 
                  technology with artistic vision to create stunning, natural-looking smile 
                  transformations. Dr. Aguil's expertise in cosmetic dentistry has made her 
                  the trusted choice for patients throughout Los Angeles, West Hollywood, 
                  Santa Monica, and surrounding areas.
                </p>
                <p className="text-muted-foreground">
                  With over a decade of experience and thousands of successful treatments, 
                  Dr. Aguil understands that every smile is unique. She takes time to listen 
                  to your goals and creates personalized treatment plans that enhance your 
                  natural beauty while improving oral health and function.
                </p>
              </div>
              
              <div>
                <h3 className="text-3xl font-semibold text-foreground mb-4">
                  Our Signature Services
                </h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="text-gold mr-2">•</span>
                    <div>
                      <strong>Porcelain Veneers:</strong> Ultra-thin, custom-crafted shells 
                      that create perfect, Hollywood-worthy smiles
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gold mr-2">•</span>
                    <div>
                      <strong>Professional Teeth Whitening:</strong> Safe, effective treatments 
                      that brighten teeth up to 8 shades in one visit
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gold mr-2">•</span>
                    <div>
                      <strong>Dental Implants:</strong> Permanent solutions for missing teeth 
                      that look and feel completely natural
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gold mr-2">•</span>
                    <div>
                      <strong>Invisalign:</strong> Discreet clear aligners that straighten 
                      teeth without the appearance of traditional braces
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="bg-card p-8 rounded-lg border">
              <h3 className="text-3xl font-semibold text-foreground mb-4 text-center">
                Advanced Technology for Superior Results
              </h3>
              <p className="text-muted-foreground text-center mb-6">
                Our Beverly Hills practice features cutting-edge dental technology including 
                digital X-rays, 3D imaging, computer-guided treatment planning, and same-day 
                crown technology. This advanced equipment allows for more precise diagnoses, 
                comfortable treatments, and exceptional results.
              </p>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Digital Smile Design</h4>
                  <p className="text-sm text-muted-foreground">
                    Preview your new smile before treatment begins with advanced imaging technology
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Minimally Invasive</h4>
                  <p className="text-sm text-muted-foreground">
                    Preserve more natural tooth structure while achieving beautiful results
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Comfort Focused</h4>
                  <p className="text-sm text-muted-foreground">
                    Spa-like environment with sedation options for anxious patients
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Floating Action Button */}
      <FloatingActionButton />
    </>
  );
};

export default IndexPage;