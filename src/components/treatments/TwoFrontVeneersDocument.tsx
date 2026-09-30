import React from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import SkipToContent from '../SkipToContent';
import TwoFrontVeneersContent from './TwoFrontVeneersContent';

/** Router supplied by StaticRouter during prerender and BrowserRouter at hydration. */
export default function TwoFrontVeneersDocument() {
  return (
    <div className="flex min-h-screen flex-col">
      <SkipToContent />
      <Navbar />
      <main id="main-content" className="flex-grow"><TwoFrontVeneersContent /></main>
      <Footer />
    </div>
  );
}
