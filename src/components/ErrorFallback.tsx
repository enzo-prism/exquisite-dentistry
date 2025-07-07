import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import Button from '@/components/Button';

interface ErrorFallbackProps {
  error?: Error;
  onRetry?: () => void;
  title?: string;
  message?: string;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ 
  error, 
  onRetry, 
  title = "Something went wrong",
  message = "We're having trouble loading this page. Please try again."
}) => {
  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-gray-50">
      <div className="max-w-md mx-auto text-center p-8">
        <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center text-red-600 mb-6 mx-auto">
          <AlertTriangle size={32} />
        </div>
        
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          {title}
        </h2>
        
        <p className="text-gray-600 mb-6">
          {message}
        </p>
        
        {error && process.env.NODE_ENV === 'development' && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-left">
            <p className="text-sm text-red-800 font-mono">
              {error.message}
            </p>
          </div>
        )}
        
        <Button onClick={handleRetry} className="group">
          <RefreshCw size={16} className="mr-2 transition-transform group-hover:rotate-180" />
          Try Again
        </Button>
      </div>
    </div>
  );
};

export default ErrorFallback;