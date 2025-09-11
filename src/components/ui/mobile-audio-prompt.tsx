import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MobileAudioPromptProps {
  isVisible: boolean;
  isMuted: boolean;
  onAudioEnable: () => void;
  onDismiss: () => void;
  className?: string;
}

const MobileAudioPrompt: React.FC<MobileAudioPromptProps> = ({
  isVisible,
  isMuted,
  onAudioEnable,
  onDismiss,
  className
}) => {
  if (!isVisible) return null;

  return (
    <div 
      className={cn(
        "absolute inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4",
        className
      )}
      onClick={(e) => e.stopPropagation()}
    >
      <div 
        className="bg-white rounded-lg shadow-xl max-w-sm mx-auto p-6 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center mb-4">
          {isMuted ? (
            <VolumeX className="h-12 w-12 text-gray-400" />
          ) : (
            <Volume2 className="h-12 w-12 text-gold" />
          )}
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Enable Audio
        </h3>
        
        <p className="text-gray-600 mb-6 text-sm">
          Tap to enable audio for this video. Mobile browsers require user interaction to play sound.
        </p>
        
        <div className="flex gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDismiss();
            }}
            className="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Keep Muted
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAudioEnable();
            }}
            className="flex-1 px-4 py-2 bg-gold text-white rounded-md hover:bg-gold/90 transition-colors font-medium"
          >
            Enable Audio
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileAudioPrompt;