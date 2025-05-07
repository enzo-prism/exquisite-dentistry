
import React, { useState } from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, ToggleLeft, ToggleRight } from 'lucide-react';
import type { PatientTransformation } from '@/data/patientTransformations';

interface PatientTransformationCardProps {
  patient: PatientTransformation;
}

const PatientTransformationCard: React.FC<PatientTransformationCardProps> = ({ patient }) => {
  const [view, setView] = useState<"before" | "after">("after");
  
  const toggleView = () => {
    setView(prev => prev === "before" ? "after" : "before");
  };

  return (
    <div className="transform transition-all duration-300 hover:scale-[1.02]">
      <Card className="overflow-hidden border-0 shadow-lg h-full">
        <div className="relative">
          {/* Patient name badge */}
          <div className="absolute top-0 left-0 z-10 m-4">
            <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md">
              <h3 className="text-lg font-medium text-gray-800 flex items-center">
                <Sparkles className="w-4 h-4 mr-2 text-gold" />
                {patient.name}
              </h3>
            </div>
          </div>

          {/* Image */}
          <AspectRatio ratio={3 / 4} className="bg-black/5">
            <img 
              src={view === "before" ? patient.beforeImg : patient.afterImg} 
              alt={`${patient.name}'s smile ${view} transformation`} 
              className="w-full h-full object-cover transition-all duration-500" 
            />
          </AspectRatio>
          
          {/* Corner label */}
          <div className={`absolute top-0 right-0 ${view === "before" ? "bg-black/80" : "bg-gold"} text-white px-4 py-2 rounded-bl-lg font-medium`}>
            {view.toUpperCase()}
          </div>

          {/* Toggle button */}
          <button 
            onClick={toggleView} 
            className="absolute bottom-4 right-4 bg-white rounded-full p-3 shadow-md hover:bg-gray-100 transition-colors" 
            aria-label={`Toggle ${patient.name}'s before and after`}
          >
            {view === "before" ? 
              <ToggleLeft className="w-6 h-6 text-gray-700" /> : 
              <ToggleRight className="w-6 h-6 text-gold" />
            }
          </button>
        </div>
        <CardContent className={`p-5 ${view === "before" ? "bg-gradient-to-r from-gray-50 to-white" : "bg-gradient-to-r from-gold/10 to-white"}`}>
          <p className="text-center font-medium">
            Click to toggle {view === "before" ? "after" : "before"} image
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientTransformationCard;
