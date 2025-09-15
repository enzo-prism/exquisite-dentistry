import React from 'react';

interface SimpleTransformationEmbedProps {
  vimeoId: string;
  title: string;
  className?: string;
}

const SimpleTransformationEmbed: React.FC<SimpleTransformationEmbedProps> = ({
  vimeoId,
  title,
  className = ""
}) => {
  return (
    <div className={`bg-gray-50 rounded-lg overflow-hidden shadow-lg ${className}`}>
      <div style={{padding: '56.25% 0 0 0', position: 'relative'}}>
        <iframe
          src={`https://player.vimeo.com/video/${vimeoId}?badge=0&autopause=0&player_id=0&app_id=58479&loop=1`}
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}}
          title={title}
        ></iframe>
      </div>
      <script src="https://player.vimeo.com/api/player.js"></script>
    </div>
  );
};

export default SimpleTransformationEmbed;