
import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Button from "@/components/Button";
import { checkForSectionGaps, fixBackgroundConsistency } from "@/utils/sectionAudit";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    
    // Check and fix any section gaps
    setTimeout(() => {
      checkForSectionGaps();
      fixBackgroundConsistency();
    }, 500);
  }, [location.pathname]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 bg-gray-50">
      <div className="text-center max-w-lg">
        <span className="inline-block text-sm text-gold font-medium mb-3">404 ERROR</span>
        <h1 className="heading-xl mb-6">Page Missing</h1>
        <div className="separator"></div>
        <p className="paragraph my-8">
          We're sorry, but the page you're looking for doesn't exist or has been moved. Please return to our homepage or contact us if you need assistance.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link to="/">
            <Button>Return Home</Button>
          </Link>
          <Link to="/contact">
            <Button variant="outline">Contact Us</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
