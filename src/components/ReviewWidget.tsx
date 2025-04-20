
import React, { useEffect } from 'react';

const ReviewWidget = () => {
  useEffect(() => {
    // Create and append the script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://birdeye.com/embed/v7/173163061159627/9/9876543219915183';
    script.async = true;
    document.body.appendChild(script);

    // Cleanup function
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <div id="bf-revz-widget-9876543219915183"></div>;
};

export default ReviewWidget;
