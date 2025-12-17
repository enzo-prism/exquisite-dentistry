import React from 'react';
import { ArrowRight, Camera } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import PatientTransformationCard from '@/components/PatientTransformation';
import CloseUpTransformationCard from '@/components/CloseUpTransformation';
import { patientTransformations } from '@/data/patientTransformations';
import { closeUpTransformations } from '@/data/closeUpTransformations';
import { SCHEDULE_CONSULTATION_PATH } from '@/constants/urls';

const SmileGalleryPreview: React.FC = () => {
  // Select 3 most compelling patient transformations
  const featuredPatients = patientTransformations.slice(0, 3);
  
  // Select first 2 close-up transformations
  const featuredCloseUps = closeUpTransformations.slice(0, 2);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
            <Camera className="w-4 h-4" />
            Real Results from Real Clients
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            See Your Potential Results
          </h2>
          
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover the life-changing transformations our clients have experienced. 
            From subtle enhancements to complete smile makeovers, see the dramatic 
            before and after results that speak for themselves.
          </p>
        </div>

        {/* Patient Transformations Grid */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Client Smile Transformations
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredPatients.map((patient, index) => (
              <div
                key={patient.name}
              >
                <PatientTransformationCard 
                  patient={patient} 
                  className="hover:shadow-lg transition-shadow duration-300"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Close-Up Transformations */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Detailed Transformations
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {featuredCloseUps.map((transformation, index) => (
              <div
                key={transformation.id}
              >
                <CloseUpTransformationCard 
                  transformation={transformation}
                  className="hover:shadow-lg transition-shadow duration-300"
                />
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to See More Amazing Results?
            </h3>
            <p className="text-gray-600 mb-8">
              Join 500+ happy patients who have transformed their smiles with Dr. Aguil. 
              View our complete gallery and imagine your own transformation.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                asChild
                size="lg"
                className="group"
              >
                <Link to="/smile-gallery/">
                  View Full Gallery
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              
              <Button 
                asChild
                variant="outline"
                size="lg"
                className="group"
              >
                <Link to={SCHEDULE_CONSULTATION_PATH}>
                  Schedule Consultation
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SmileGalleryPreview;
