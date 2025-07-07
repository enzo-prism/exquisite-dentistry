
import React from 'react';
import { Helmet } from 'react-helmet-async';
import PageHeader from '@/components/PageHeader';
import WebPageStructuredData from '@/components/WebPageStructuredData';

const HipaaCompliance: React.FC = () => {
  return (
    <>
      <WebPageStructuredData 
        title="HIPAA Compliance | Patient Health Information Protection"
        description="Learn about our HIPAA compliance practices and how Exquisite Dentistry protects your health information privacy and security in accordance with federal regulations."
        url="https://exquisitedentistryla.com/hipaa-compliance"
        breadcrumbs={[{ name: 'HIPAA Compliance', url: 'https://exquisitedentistryla.com/hipaa-compliance' }]}
      />
      <Helmet>
        <title>HIPAA Compliance | Patient Health Information Protection</title>
        <meta name="description" content="Learn about our HIPAA compliance practices and how Exquisite Dentistry protects your health information privacy and security in accordance with federal regulations." />
        <meta name="keywords" content="HIPAA compliance, health information privacy, patient data protection, medical records security, dental office compliance" />
        <meta property="og:title" content="HIPAA Compliance | Patient Health Information Protection" />
        <meta property="og:description" content="Learn how Exquisite Dentistry protects your health information privacy and security in accordance with HIPAA regulations." />
        <meta property="og:image" content="/lovable-uploads/2e2732fc-c4a6-4f21-9829-3717d9b2b36d.png" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://exquisitedentistryla.com/hipaa-compliance/" />
      </Helmet>

      <PageHeader 
        title="HIPAA Compliance"
        subtitle="Your health information privacy and security is our priority."
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-black">Our Commitment to HIPAA Compliance</h2>
            <p className="text-gray-600 mb-4">
              Exquisite Dentistry is committed to protecting your health information in accordance with 
              the Health Insurance Portability and Accountability Act (HIPAA). We implement comprehensive 
              safeguards to ensure your protected health information (PHI) remains secure and confidential.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-black">What is HIPAA?</h2>
            <p className="text-gray-600 mb-4">
              HIPAA is a federal law that protects the privacy and security of your health information. 
              It gives you rights over your health information and sets rules and limits on who can look 
              at and receive your health information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-black">Your Rights Under HIPAA</h2>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li><strong>Right to Access:</strong> You can request to see and get a copy of your health records</li>
              <li><strong>Right to Amend:</strong> You can ask to correct your health information if you think it's wrong or incomplete</li>
              <li><strong>Right to Restrict:</strong> You can ask to limit how we use or share your health information</li>
              <li><strong>Right to Confidential Communications:</strong> You can ask us to contact you in a specific way</li>
              <li><strong>Right to a List:</strong> You can get a list of those we've shared your information with</li>
              <li><strong>Right to File a Complaint:</strong> You can file a complaint if you feel your rights have been violated</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-black">How We Protect Your Information</h2>
            
            <h3 className="text-xl font-medium mb-3 text-black">Physical Safeguards</h3>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>Secure storage of physical records in locked cabinets</li>
              <li>Restricted access to areas containing health information</li>
              <li>Proper disposal of documents containing PHI</li>
            </ul>

            <h3 className="text-xl font-medium mb-3 text-black">Technical Safeguards</h3>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>Encrypted electronic health records systems</li>
              <li>Secure network connections and firewalls</li>
              <li>Regular software updates and security patches</li>
              <li>User authentication and access controls</li>
            </ul>

            <h3 className="text-xl font-medium mb-3 text-black">Administrative Safeguards</h3>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>Comprehensive HIPAA training for all staff members</li>
              <li>Written policies and procedures for handling PHI</li>
              <li>Regular risk assessments and security evaluations</li>
              <li>Incident response procedures</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-black">When We May Share Your Information</h2>
            <p className="text-gray-600 mb-4">
              We may use and disclose your health information for:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li><strong>Treatment:</strong> To provide, coordinate, or manage your dental care</li>
              <li><strong>Payment:</strong> To obtain payment for services or to determine coverage</li>
              <li><strong>Healthcare Operations:</strong> For quality improvement, staff training, and business operations</li>
              <li><strong>Legal Requirements:</strong> When required by law or court order</li>
              <li><strong>Public Health:</strong> To prevent or control disease, injury, or disability</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-black">Notice of Privacy Practices</h2>
            <p className="text-gray-600 mb-4">
              We provide all patients with a detailed Notice of Privacy Practices that explains how we 
              may use and disclose your health information. This notice is available at our office and 
              will be provided to you during your first visit.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-black">Questions or Concerns</h2>
            <p className="text-gray-600 mb-4">
              If you have questions about our HIPAA compliance or privacy practices, or if you believe 
              your privacy rights have been violated, please contact our Privacy Officer:
            </p>
            <div className="mt-4 text-gray-600">
              <p><strong>Privacy Officer</strong></p>
              <p>Exquisite Dentistry</p>
              <p>6227 Wilshire Blvd, Los Angeles, CA 90048</p>
              <p>Phone: (323) 272-2388</p>
              <p>Email: privacy@exquisitedentistry.com</p>
            </div>
            <p className="text-gray-600 mt-4">
              You also have the right to file a complaint with the U.S. Department of Health and Human Services.
            </p>
          </section>
        </div>
      </div>
    </>
  );
};

export default HipaaCompliance;
