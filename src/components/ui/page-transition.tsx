import React from 'react';

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  // Keep initial and route renders visible. A page-wide fade hid usable content
  // after navigation and forced every page into a transformed compositing layer.
  return (
    <div data-page-transition>
      {children}
    </div>
  );
};

export default PageTransition;
