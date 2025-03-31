
import React, { useRef, useEffect } from 'react';
import { X } from 'lucide-react';

interface VideoModalProps {
  youtubeId: string;
  isOpen: boolean;
  onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ youtubeId, isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4">
      <div ref={modalRef} className="relative w-full max-w-4xl rounded-lg bg-white overflow-hidden">
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 z-10 rounded-full bg-white/90 p-2 text-gray-800 hover:bg-white transition-colors"
          aria-label="Close video"
        >
          <X size={24} />
        </button>
        
        <div className="relative aspect-video w-full">
          <iframe 
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
