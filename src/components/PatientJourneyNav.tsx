import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Circle, Clock } from 'lucide-react';

interface JourneyStep {
  id: string;
  title: string;
  description: string;
  href: string;
  status: 'completed' | 'current' | 'upcoming';
  estimated?: string;
}

interface PatientJourneyNavProps {
  steps: JourneyStep[];
  currentStep?: string;
  title?: string;
  className?: string;
}

const PatientJourneyNav: React.FC<PatientJourneyNavProps> = ({
  steps,
  currentStep,
  title = "Your Journey to a Perfect Smile",
  className = ''
}) => {
  const getStepIcon = (status: string, isLast: boolean) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'current':
        return <Circle className="w-5 h-5 text-gold fill-current" />;
      default:
        return <Circle className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-6">{title}</h3>
      
      <div className="space-y-6">
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1;
          const isCurrent = step.id === currentStep || step.status === 'current';
          
          return (
            <div key={step.id} className="relative">
              {/* Connection line */}
              {!isLast && (
                <div className="absolute left-2.5 top-8 w-0.5 h-6 bg-gray-200"></div>
              )}
              
              <Link
                to={step.href}
                className={`flex items-start gap-4 p-3 rounded-lg transition-all group ${
                  isCurrent 
                    ? 'bg-gold/10 border border-gold/20' 
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex-shrink-0 mt-1">
                  {getStepIcon(step.status, isLast)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className={`font-medium transition-colors ${
                      isCurrent 
                        ? 'text-gold' 
                        : 'text-gray-900 group-hover:text-gold'
                    }`}>
                      {step.title}
                    </h4>
                    
                    {step.estimated && (
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span>{step.estimated}</span>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-2">
                    {step.description}
                  </p>

                  {step.status === 'current' && (
                    <div className="flex items-center gap-1 text-xs text-gold">
                      <span>Current step</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  )}
                </div>
                
                <ArrowRight className={`w-4 h-4 transition-colors flex-shrink-0 mt-1 ${
                  isCurrent 
                    ? 'text-gold' 
                    : 'text-gray-400 group-hover:text-gold'
                }`} />
              </Link>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <Link
          to="/contact"
          className="inline-flex items-center text-sm text-gold hover:text-gold/80 transition-colors"
        >
          Questions about your journey?
          <ArrowRight className="w-3 h-3 ml-1" />
        </Link>
      </div>
    </div>
  );
};

export default PatientJourneyNav;