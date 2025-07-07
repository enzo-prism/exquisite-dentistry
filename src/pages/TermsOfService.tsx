
import React from 'react';
import { Helmet } from 'react-helmet-async';
import PageHeader from '@/components/PageHeader';
import WebPageStructuredData from '@/components/WebPageStructuredData';

const TermsOfService: React.FC = () => {
  return (
    <>
      <WebPageStructuredData 
        title="Terms of Service | Exquisite Dentistry Los Angeles"
        description="Review our terms of service including appointment policies, payment terms, and patient responsibilities at Exquisite Dentistry in Los Angeles."
        url="https://exquisitedentistryla.com/terms-of-service"
        breadcrumbs={[{ name: 'Terms of Service', url: 'https://exquisitedentistryla.com/terms-of-service' }]}
      />
      <Helmet>
        <title>Terms of Service | Exquisite Dentistry Los Angeles</title>
        <meta name="description" content="Review our terms of service including appointment policies, payment terms, and patient responsibilities at Exquisite Dentistry in Los Angeles." />
        <meta name="keywords" content="dental terms of service, appointment policy, payment terms, patient responsibilities, dental office policies" />
        <meta property="og:title" content="Terms of Service | Exquisite Dentistry Los Angeles" />
        <meta property="og:description" content="Review our terms of service including appointment policies, payment terms, and patient responsibilities at Exquisite Dentistry." />
        <meta property="og:image" content="/lovable-uploads/2e2732fc-c4a6-4f21-9829-3717d9b2b36d.png" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://exquisitedentistryla.com/terms-of-service/" />
      </Helmet>

      <PageHeader 
        title="Terms of Service"
        subtitle="Understanding our policies and your responsibilities as a patient."
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-8">
            <strong>Last Updated:</strong> January 1, 2024
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-black">1. Acceptance of Terms</h2>
            <p className="text-gray-600 mb-4">
              By scheduling an appointment or receiving services at Exquisite Dentistry, you agree to 
              these Terms of Service. If you do not agree with these terms, please do not use our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-black">2. Appointment Policy</h2>
            <h3 className="text-xl font-medium mb-3 text-black">Scheduling</h3>
            <p className="text-gray-600 mb-4">
              Appointments may be scheduled by phone, online, or in person. We recommend scheduling 
              routine cleanings and check-ups in advance.
            </p>
            
            <h3 className="text-xl font-medium mb-3 text-black">Cancellation Policy</h3>
            <p className="text-gray-600 mb-4">
              We require at least 24 hours notice for appointment cancellations. Failure to provide 
              adequate notice or missing an appointment without notice may result in a cancellation fee.
            </p>
            
            <h3 className="text-xl font-medium mb-3 text-black">Late Arrivals</h3>
            <p className="text-gray-600 mb-4">
              Please arrive 15 minutes early for your appointment. Patients arriving more than 15 minutes 
              late may need to reschedule, depending on availability.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-black">3. Payment Policy</h2>
            <p className="text-gray-600 mb-4">
              Payment is due at the time of service unless other arrangements have been made in advance. 
              We accept cash, checks, and major credit cards.
            </p>
            <h3 className="text-xl font-medium mb-3 text-black">Insurance</h3>
            <p className="text-gray-600 mb-4">
              We will file insurance claims on your behalf, but you are ultimately responsible for 
              payment of all services. Any remaining balance after insurance payment is due within 30 days.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-black">4. Treatment Consent</h2>
            <p className="text-gray-600 mb-4">
              By receiving treatment, you consent to the dental procedures recommended by Dr. Aguil. 
              All treatment plans will be discussed with you, including risks, benefits, and alternatives.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-black">5. Patient Responsibilities</h2>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>Provide accurate and complete medical and dental history</li>
              <li>Follow pre and post-treatment instructions</li>
              <li>Maintain good oral hygiene as recommended</li>
              <li>Attend scheduled follow-up appointments</li>
              <li>Inform us of any changes to your health status or medications</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-black">6. Limitation of Liability</h2>
            <p className="text-gray-600 mb-4">
              While we strive to provide the highest quality dental care, we cannot guarantee specific 
              treatment outcomes. Our liability is limited to the cost of the dental services provided.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-black">7. Contact Information</h2>
            <p className="text-gray-600">
              For questions about these Terms of Service, please contact us:
            </p>
            <div className="mt-4 text-gray-600">
              <p>Exquisite Dentistry</p>
              <p>6227 Wilshire Blvd, Los Angeles, CA 90048</p>
              <p>Phone: (323) 272-2388</p>
              <p>Email: info@exquisitedentistry.com</p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default TermsOfService;
