import React, { useState } from 'react';
import VideoHero from '@/components/VideoHero';
import ClientExperienceSection from '@/components/PatientExperienceSection';
import { Helmet } from 'react-helmet-async';
import ServicesSection from '@/components/ServicesSection';
import ReviewWidget from '@/components/ReviewWidget';
import SeasonalTreatments from '@/components/SeasonalTreatments';
import PracticeVideoSection from '@/components/PracticeVideoSection';
import VideoModal from '@/components/VideoModal';
import DoctorIntroSection from '@/components/DoctorIntroSection';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import SeoStructuredData from '@/components/SeoStructuredData';
import ReviewStructuredData from '@/components/ReviewStructuredData';
import ImageComponent from '@/components/Image';

const IndexPage: React.FC = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isSecondVideoModalOpen, setIsSecondVideoModalOpen] = useState(false);
  const [isThirdVideoModalOpen, setIsThirdVideoModalOpen] = useState(false);
  const [isFourthVideoModalOpen, setIsFourthVideoModalOpen] = useState(false);
  const [isFifthVideoModalOpen, setIsFifthVideoModalOpen] = useState(false);

  return (
    <>
      <Helmet>
        <title>Best Cosmetic Dentist Los Angeles | Exquisite Dentistry Dr. Alexie Aguil</title>
        <meta name="description" content="Transform your smile with Los Angeles' premier cosmetic dentist Dr. Alexie Aguil. Specializing in veneers, teeth whitening, and smile makeovers in Beverly Hills area. Book your consultation today!" />
        <meta name="keywords" content="cosmetic dentist Los Angeles, porcelain veneers, teeth whitening, smile makeover, Beverly Hills dentist, dental implants, cosmetic dentistry" />
        <meta property="og:title" content="Best Cosmetic Dentist Los Angeles | Exquisite Dentistry Dr. Alexie Aguil" />
        <meta property="og:description" content="Transform your smile with Los Angeles' premier cosmetic dentist Dr. Alexie Aguil. Specializing in veneers, teeth whitening, and smile makeovers in Beverly Hills area." />
        <meta property="og:image" content="/lovable-uploads/2e2732fc-c4a6-4f21-9829-3717d9b2b36d.png" />
        <meta property="og:url" content="https://exquisitedentistryla.com/" />
        <link rel="canonical" href="https://exquisitedentistryla.com/" />
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
      />
      <SeasonalTreatments />
      <PracticeVideoSection />
      <DoctorIntroSection />
      <ServicesSection />
      <ClientExperienceSection />
      <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block text-sm text-gold font-medium mb-3">TESTIMONIALS</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4">
              Client <span className="text-gold">Reviews</span>
            </h2>
            <div className="separator mx-auto"></div>
            <p className="text-gray-600 mt-6 max-w-2xl mx-auto">
              See what our clients are saying about their experience at Exquisite Dentistry
            </p>
          </div>
          
          {/* Video Testimonials */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8 mb-12">
            {/* First Video Testimonial */}
            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-lg">
              <div className="relative aspect-video cursor-pointer group bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100" onClick={() => setIsVideoModalOpen(true)}>
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors duration-300 z-10">
                  <div className="bg-gold text-white rounded-full p-3 sm:p-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg min-h-[44px] min-w-[44px]">
                    <Play className="h-5 w-5 sm:h-6 sm:w-6 ml-1" fill="currentColor" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Second Video Testimonial */}
            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-lg">
              <div className="relative aspect-video cursor-pointer group bg-gradient-to-br from-teal-50 via-emerald-100 to-green-50" onClick={() => setIsSecondVideoModalOpen(true)}>
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors duration-300 z-10">
                  <div className="bg-gold text-white rounded-full p-3 sm:p-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg min-h-[44px] min-w-[44px]">
                    <Play className="h-5 w-5 sm:h-6 sm:w-6 ml-1" fill="currentColor" />
                  </div>
                </div>
              </div>
            </div>

            {/* Third Video Testimonial */}
            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-lg">
              <div className="relative aspect-video cursor-pointer group bg-gradient-to-br from-rose-100 via-pink-50 to-red-50" onClick={() => setIsThirdVideoModalOpen(true)}>
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors duration-300 z-10">
                  <div className="bg-gold text-white rounded-full p-3 sm:p-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg min-h-[44px] min-w-[44px]">
                    <Play className="h-5 w-5 sm:h-6 sm:w-6 ml-1" fill="currentColor" />
                  </div>
                </div>
              </div>
            </div>

            {/* Fourth Video Testimonial */}
            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-lg">
              <div className="relative aspect-video cursor-pointer group bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-50" onClick={() => setIsFourthVideoModalOpen(true)}>
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors duration-300 z-10">
                  <div className="bg-gold text-white rounded-full p-3 sm:p-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg min-h-[44px] min-w-[44px]">
                    <Play className="h-5 w-5 sm:h-6 sm:w-6 ml-1" fill="currentColor" />
                  </div>
                </div>
              </div>
            </div>

            {/* Fifth Video Testimonial */}
            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-lg">
              <div className="relative aspect-video cursor-pointer group bg-gradient-to-br from-purple-100 via-violet-50 to-pink-100" onClick={() => setIsFifthVideoModalOpen(true)}>
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors duration-300 z-10">
                  <div className="bg-gold text-white rounded-full p-3 sm:p-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg min-h-[44px] min-w-[44px]">
                    <Play className="h-5 w-5 sm:h-6 sm:w-6 ml-1" fill="currentColor" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-sm border border-gray-100 p-8">
            <ReviewWidget />
          </div>
        </div>
      </section>
      
      <VideoModal
        youtubeId="1082192427"
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        thumbnailUrl="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
      />
      
      <VideoModal
        youtubeId="1082192501"
        isOpen={isSecondVideoModalOpen}
        onClose={() => setIsSecondVideoModalOpen(false)}
        thumbnailUrl="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
      />

      <VideoModal
        youtubeId="1088876675"
        isOpen={isThirdVideoModalOpen}
        onClose={() => setIsThirdVideoModalOpen(false)}
        thumbnailUrl="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
      />

      <VideoModal
        youtubeId="1088877336"
        isOpen={isFourthVideoModalOpen}
        onClose={() => setIsFourthVideoModalOpen(false)}
        thumbnailUrl="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
      />

      <VideoModal
        youtubeId="1088878160"
        isOpen={isFifthVideoModalOpen}
        onClose={() => setIsFifthVideoModalOpen(false)}
        thumbnailUrl="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP___yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
      />
    </>
  );
};

export default IndexPage;
