
import React, { useEffect } from 'react';
import Button from '@/components/Button';
import VideoHero from '@/components/VideoHero';
import { YOUTUBE_VIDEOS } from '@/components/VideoHero';

// Scheduling URL constant - consistent across site
const SCHEDULING_URL = "https://scheduling.simplifeye.co/#key=g5zcQrkS2CtYq4odV42VrV7GyZrpy2F&gaID=null";

const Wedding = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen">
      <VideoHero
        posterSrc="https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=2070&auto=format&fit=crop"
        youtubeId={YOUTUBE_VIDEOS.SMILE}
        title={<>Wedding <span className="text-gold">Smile</span></>}
        subtitle="Look your absolute best on your special day with our customized wedding smile packages."
        primaryCta={{ 
          text: "Book Consultation", 
          href: SCHEDULING_URL 
        }}
        secondaryCta={{ text: "View Packages", href: "#packages" }}
        overlayColor="gradient"
        height="large"
        badgeText="WEDDING SPECIALS"
        scrollIndicator={true}
        alignment="center"
      />
      
      {/* Additional content for the Wedding page would go here */}
      <div className="py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">Wedding Smile Packages Coming Soon</h2>
        <p className="text-xl mb-8">We're preparing special packages for brides, grooms and wedding parties.</p>
        <a href={SCHEDULING_URL} target="_blank" rel="noopener noreferrer">
          <Button size="lg">Schedule a Consultation</Button>
        </a>
      </div>
    </div>
  );
};

export default Wedding;
