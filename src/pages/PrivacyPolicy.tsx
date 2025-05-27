
import React from 'react';
import { Helmet } from 'react-helmet-async';
import PageHeader from '@/components/PageHeader';

const PrivacyPolicy: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - Exquisite Dentistry</title>
        <meta name="description" content="Privacy Policy for Exquisite Dentistry. Learn how we protect and handle your personal information." />
      </Helmet>

      <PageHeader 
        title="Privacy Policy"
        subtitle="Your privacy is important to us. Learn how we protect and handle your personal information."
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-8">
            <strong>Last Updated:</strong> January 1, 2024
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-black">1. Information We Collect</h2>
            <p className="text-gray-600 mb-4">
              We collect information you provide directly to us, such as when you schedule an appointment, 
              complete patient forms, or contact us. This may include:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>Personal identification information (name, address, phone number, email)</li>
              <li>Health information and medical history</li>
              <li>Insurance information</li>
              <li>Payment information</li>
              <li>Communication preferences</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-black">2. How We Use Your Information</h2>
            <p className="text-gray-600 mb-4">We use the information we collect to:</p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>Provide dental care and treatment</li>
              <li>Schedule and manage appointments</li>
              <li>Process payments and insurance claims</li>
              <li>Communicate with you about your care</li>
              <li>Send appointment reminders and follow-up care instructions</li>
              <li>Comply with legal and regulatory requirements</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-black">3. Information Sharing</h2>
            <p className="text-gray-600 mb-4">
              We do not sell, trade, or otherwise transfer your personal information to third parties 
              without your consent, except as described in this policy. We may share your information:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>With healthcare providers involved in your care</li>
              <li>With insurance companies for payment purposes</li>
              <li>As required by law or legal process</li>
              <li>With service providers who assist in our operations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-black">4. Data Security</h2>
            <p className="text-gray-600 mb-4">
              We implement appropriate security measures to protect your personal information against 
              unauthorized access, alteration, disclosure, or destruction. This includes physical, 
              electronic, and administrative safeguards.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-black">5. Your Rights</h2>
            <p className="text-gray-600 mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 text-gray-600 mb-4">
              <li>Access your personal information</li>
              <li>Request corrections to your information</li>
              <li>Request deletion of your information (subject to legal requirements)</li>
              <li>Opt-out of certain communications</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-black">6. Contact Us</h2>
            <p className="text-gray-600">
              If you have questions about this Privacy Policy, please contact us at:
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

export default PrivacyPolicy;
