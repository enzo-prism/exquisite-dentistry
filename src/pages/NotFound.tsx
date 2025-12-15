import React from "react";
import { Link } from "react-router-dom";
import PageSEO from "@/components/seo/PageSEO";

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-20">
      <PageSEO
        title="Page Not Found"
        description="The page you’re looking for doesn’t exist. Explore our services, smile gallery, or contact Exquisite Dentistry in Los Angeles."
        path="/not-found"
        noindex={true}
      />
      <main className="max-w-2xl text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
          Page Not Found
        </h1>
        <p className="text-lg text-muted-foreground">
          We couldn’t find that URL. It may have moved or never existed.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
          >
            Go to Homepage
          </Link>
          <Link
            to="/services/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-border bg-background font-semibold hover:bg-muted transition-colors"
          >
            View Services
          </Link>
        </div>
        <nav className="pt-6 text-sm text-muted-foreground">
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <li>
              <Link to="/veneers/" className="hover:text-foreground underline">
                Veneers
              </Link>
            </li>
            <li>
              <Link to="/invisalign/" className="hover:text-foreground underline">
                Invisalign
              </Link>
            </li>
            <li>
              <Link to="/zoom-whitening/" className="hover:text-foreground underline">
                Zoom Whitening
              </Link>
            </li>
            <li>
              <Link to="/smile-gallery/" className="hover:text-foreground underline">
                Smile Gallery
              </Link>
            </li>
            <li>
              <Link to="/contact/" className="hover:text-foreground underline">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </main>
    </div>
  );
};

export default NotFound;
