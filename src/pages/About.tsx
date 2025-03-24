
import React, { useEffect } from 'react';
import { User2, Medal, HeartHandshake, Stethoscope } from 'lucide-react';
import Button from '@/components/Button';
import { cn } from '@/lib/utils';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen pt-24 page-transition-in">
      {/* Hero Section */}
      <section className="relative py-24">
        <div className="absolute top-0 inset-0 bg-[url('https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center h-[50vh]">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-xs"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block bg-gold/90 text-white px-4 py-1 rounded-sm text-sm font-medium mb-6">
              ABOUT OUR PRACTICE
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-semibold text-white leading-tight mb-6">
              Excellence in <span className="text-gold">Dental Care</span>
            </h1>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="-mt-32 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow-xl rounded-sm p-8 md:p-12 lg:p-16">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="heading-lg mb-6">Our Mission & Vision</h2>
              <div className="separator"></div>
              <p className="paragraph">
                At Exquisite Dentistry, our mission is to provide exceptional dental care in a comfortable, welcoming environment. We believe that every patient deserves personalized attention and the highest quality treatment available.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-16">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto text-gold">
                  <HeartHandshake size={30} />
                </div>
                <h3 className="heading-sm">Patient-Centered Care</h3>
                <p className="text-black-light/80">
                  We prioritize your comfort and satisfaction, ensuring every visit is a positive experience.
                </p>
              </div>
              
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto text-gold">
                  <Medal size={30} />
                </div>
                <h3 className="heading-sm">Excellence & Precision</h3>
                <p className="text-black-light/80">
                  Our commitment to clinical excellence and attention to detail ensures optimal results.
                </p>
              </div>
              
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto text-gold">
                  <Stethoscope size={30} />
                </div>
                <h3 className="heading-sm">Advanced Technology</h3>
                <p className="text-black-light/80">
                  We leverage cutting-edge dental technology to provide efficient, effective treatments.
                </p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                  <div className="aspect-square rounded-sm overflow-hidden shadow-lg">
                    <img 
                      src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=2564&auto=format&fit=crop" 
                      alt="Dr. Alexie Aguil" 
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                </div>
                
                <div className="space-y-6">
                  <span className="inline-block text-sm text-gold font-medium">MEET OUR DOCTOR</span>
                  <h2 className="heading-lg">Dr. Alexie Aguil</h2>
                  <div className="separator-left"></div>
                  <p className="paragraph">
                    Dr. Alexie Aguil is the founder and lead dentist at Exquisite Dentistry. With over 15 years of experience and a passion for combining artistry with advanced dental techniques, Dr. Aguil has established himself as a premier dental professional in Beverly Hills.
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
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
            { 
              name: "Michael Chen", 
              role: "Dental Assistant",
              image: "https://images.unsplash.com/photo-1622902046580-2b47f47f5471?q=80&w=1887&auto=format&fit=crop",
              description: "Michael's attention to detail and caring approach helps ensure that patients are comfortable throughout their treatment."
            },
          ].map((member, index) => (
            <div 
              key={member.name} 
              className={cn(
                "bg-white rounded-sm shadow-md overflow-hidden opacity-0",
                index % 2 === 0 ? "animate-fade-in-left" : "animate-fade-in-right"
              )}
              style={{ animationDelay: `${index * 150}ms` }}
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
