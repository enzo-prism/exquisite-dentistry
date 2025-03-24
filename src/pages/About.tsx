
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  HeartHandshake, 
  Medal, 
  Stethoscope, 
  GraduationCap,
  Award,
  BookOpen,
  User2
} from 'lucide-react';
import Button from '@/components/Button';
import VideoHero from '@/components/VideoHero';
import { YOUTUBE_VIDEOS } from '@/components/VideoHero';
import { cn } from '@/lib/utils';

// Define the credentials data
const credentials = [
  {
    title: "Doctor of Dental Surgery (DDS)",
    details: "University of Southern California School of Dentistry"
  },
  {
    title: "Advanced Certification in Cosmetic Dentistry",
    details: "American Academy of Cosmetic Dentistry"
  },
  {
    title: "Fellowship in Implant Dentistry",
    details: "International Congress of Oral Implantologists"
  },
  {
    title: "Invisalign® Certified Provider",
    details: "Align Technology Institute"
  }
];

// Define the awards data
const awards = [
  {
    title: "America's Top Dentists",
    year: "2020, 2021, 2022"
  },
  {
    title: "Best Cosmetic Dentist in Los Angeles",
    year: "LA Magazine, 2021"
  },
  {
    title: "Excellence in Patient Care",
    year: "American Dental Association, 2019"
  },
  {
    title: "Top 40 Dentists Under 40",
    year: "Dental Entrepreneurs Society, 2018"
  }
];

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen page-transition-in">
      {/* Hero Section with YouTube Video */}
      <VideoHero
        posterSrc="/lovable-uploads/0fd21f21-b7ba-404a-a028-16662a8dc60a.png"
        youtubeId={YOUTUBE_VIDEOS.OFFICE}
        title={<>About <span className="text-gold">Dr. Alexie Aguil</span></>}
        subtitle="Meet the expert behind Exquisite Dentistry's exceptional cosmetic and general dental services in Los Angeles."
        primaryCta={{ text: "Book a Consultation" }}
        secondaryCta={{ text: "View Our Services", href: "/services" }}
        overlayColor="gradient"
        height="medium"
        badgeText="OUR STORY"
        alignment="left"
        scrollIndicator={false}
      />

      {/* Introduction Section - Adjusted positioning */}
      <section className="-mt-24 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow-xl rounded-sm p-8 md:p-12 lg:p-16">
            <div className="max-w-3xl mx-auto text-center mb-20">
              <h2 className="heading-lg mb-8">Philosophy & Approach</h2>
              <div className="separator"></div>
              <p className="paragraph mt-8">
                At Exquisite Dentistry, Dr. Alexie Aguil's approach centers on the perfect balance of artistry and science. He believes that exceptional dentistry goes beyond technical skill to embrace a personalized, patient-centric philosophy where your comfort, goals, and long-term satisfaction drive every decision.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-16">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto text-gold">
                  <HeartHandshake size={30} />
                </div>
                <h3 className="heading-sm">Patient-Centered Care</h3>
                <p className="text-black-light/80">
                  We prioritize your comfort and satisfaction, ensuring every visit is a positive experience with open communication throughout your treatment.
                </p>
              </div>
              
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto text-gold">
                  <Medal size={30} />
                </div>
                <h3 className="heading-sm">Excellence & Precision</h3>
                <p className="text-black-light/80">
                  Our commitment to clinical excellence and attention to detail ensures optimal results that look natural and enhance your unique features.
                </p>
              </div>
              
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto text-gold">
                  <Stethoscope size={30} />
                </div>
                <h3 className="heading-sm">Advanced Technology</h3>
                <p className="text-black-light/80">
                  We leverage cutting-edge dental technology to provide efficient, effective treatments with improved comfort and precision.
                </p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                  <div className="aspect-square rounded-sm overflow-hidden shadow-lg">
                    <img 
                      src="/lovable-uploads/087a65dd-859a-4356-a682-58793125626f.png" 
                      alt="Dr. Alexie Aguil" 
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                </div>
                
                <div className="space-y-6">
                  <span className="inline-block text-sm text-gold font-medium">ABOUT DR. AGUIL</span>
                  <h2 className="heading-lg">Dr. Alexie Aguil</h2>
                  <div className="separator-left"></div>
                  <p className="paragraph">
                    Dr. Alexie Aguil is the founder and lead dentist at Exquisite Dentistry. With over 15 years of experience and a passion for combining artistry with advanced dental techniques, Dr. Aguil has established himself as a premier cosmetic dental professional in Los Angeles and Beverly Hills.
                  </p>
                  <p className="paragraph">
                    After graduating with honors from the University of Southern California School of Dentistry, Dr. Aguil continued his education with specialized training in cosmetic dentistry, restorative care, and the latest minimally invasive techniques.
                  </p>
                  <p className="paragraph">
                    Dr. Aguil's approach centers on creating personalized treatment plans that address each patient's unique needs and aesthetic goals, resulting in natural-looking, beautiful smiles that enhance confidence and well-being.
                  </p>
                </div>
              </div>
            </div>

            {/* Credentials & Awards Section */}
            <div className="border-t border-gray-200 mt-16 pt-16">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <h2 className="heading-lg mb-6">Credentials & Awards</h2>
                <div className="separator"></div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="bg-gray-50 p-8 rounded-sm">
                  <div className="flex items-center mb-6">
                    <GraduationCap size={30} className="text-gold mr-4" />
                    <h3 className="heading-sm">Education & Credentials</h3>
                  </div>
                  <div className="space-y-4">
                    {credentials.map((credential, index) => (
                      <div key={index} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                        <h4 className="font-medium text-black">{credential.title}</h4>
                        <p className="text-black-light/80 mt-1">{credential.details}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 p-8 rounded-sm">
                  <div className="flex items-center mb-6">
                    <Award size={30} className="text-gold mr-4" />
                    <h3 className="heading-sm">Awards & Recognition</h3>
                  </div>
                  <div className="space-y-4">
                    {awards.map((award, index) => (
                      <div key={index} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                        <h4 className="font-medium text-black">{award.title}</h4>
                        <p className="text-black-light/80 mt-1">{award.year}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Continuing Education */}
            <div className="border-t border-gray-200 mt-16 pt-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-6">
                  <div className="flex items-center">
                    <BookOpen size={30} className="text-gold mr-4" />
                    <h2 className="heading-lg">Commitment to Education</h2>
                  </div>
                  <div className="separator-left"></div>
                  <p className="paragraph">
                    Dr. Aguil believes in the continuous pursuit of knowledge and stays at the forefront of dental innovation through ongoing education and training.
                  </p>
                  <p className="paragraph">
                    He regularly attends advanced courses, conferences, and workshops to bring the latest techniques and technologies to his patients, ensuring they receive the absolute best care available.
                  </p>
                  <p className="paragraph">
                    This dedication to learning and growth is evident in the exceptional results and comfortable experience that define Exquisite Dentistry.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="aspect-[3/4] rounded-sm overflow-hidden shadow-md">
                    <img 
                      src="/lovable-uploads/8632f149-3a68-4157-809c-902a92a3f3a6.png" 
                      alt="Dr. Aguil explaining dental x-rays" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-[3/4] rounded-sm overflow-hidden shadow-md">
                    <img 
                      src="/lovable-uploads/087a65dd-859a-4356-a682-58793125626f.png" 
                      alt="Dr. Aguil with patient" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-sm text-gold font-medium mb-3">OUR EXPERT TEAM</span>
          <h2 className="heading-lg mb-6">Meet Our Dental Professionals</h2>
          <div className="separator"></div>
          <p className="paragraph">
            Our team of experienced dental professionals is dedicated to providing exceptional care and ensuring your comfort at every visit.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div 
            className="bg-white rounded-sm shadow-md overflow-hidden opacity-0 animate-fade-in-left"
            style={{ animationDelay: '0ms' }}
          >
            <div className="aspect-[3/2]">
              <img 
                src="/lovable-uploads/0fd21f21-b7ba-404a-a028-16662a8dc60a.png" 
                alt="Dr. Alexie Aguil" 
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="p-6">
              <h3 className="heading-sm mb-1">Dr. Alexie Aguil</h3>
              <p className="text-gold font-medium mb-4">Founder & Lead Dentist</p>
              <p className="text-black-light/80 mb-6">With over 15 years of experience, Dr. Aguil combines artistic vision with technical expertise to deliver exceptional results in cosmetic and restorative dentistry.</p>
              <div className="flex items-center">
                <User2 size={16} className="text-gold mr-2" />
                <span className="text-sm font-medium">View Full Profile</span>
              </div>
            </div>
          </div>
          
          {[
            { 
              name: "Dr. Emily Carter", 
              role: "Associate Dentist",
              image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=1887&auto=format&fit=crop",
              description: "Specializing in pediatric dentistry and preventive care, Dr. Carter ensures our youngest patients receive gentle, thorough treatment."
            },
            { 
              name: "Lisa Johnson", 
              role: "Dental Hygienist",
              image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop",
              description: "With over 10 years of experience, Lisa is dedicated to helping patients maintain optimal oral health through thorough cleanings and education."
            },
          ].map((member, index) => (
            <div 
              key={member.name} 
              className={cn(
                "bg-white rounded-sm shadow-md overflow-hidden opacity-0",
                index % 2 === 0 ? "animate-fade-in-left" : "animate-fade-in-right"
              )}
              style={{ animationDelay: `${(index + 1) * 150}ms` }}
            >
              <div className="aspect-[3/2]">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="p-6">
                <h3 className="heading-sm mb-1">{member.name}</h3>
                <p className="text-gold font-medium mb-4">{member.role}</p>
                <p className="text-black-light/80 mb-6">{member.description}</p>
                <div className="flex items-center">
                  <User2 size={16} className="text-gold mr-2" />
                  <span className="text-sm font-medium">View Full Profile</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-sans font-semibold text-white leading-tight mb-6">
              Ready to Experience <span className="text-gold">Exceptional Dental Care?</span>
            </h2>
            <p className="text-xl text-white/80 mb-10 font-light">
              Schedule your consultation today and discover the Exquisite Dentistry difference.
            </p>
            <Button size="lg">Book an Appointment</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
