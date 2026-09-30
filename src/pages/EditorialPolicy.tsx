import React from 'react';
import PageSEO from '@/components/seo/PageSEO';
import PageHeader from '@/components/PageHeader';
import WebPageStructuredData from '@/components/WebPageStructuredData';
import MasterStructuredData from '@/components/seo/MasterStructuredData';
import { getCanonicalUrl } from '@/utils/schemaValidation';
import { EMAIL } from '@/constants/contact';

const EditorialPolicy: React.FC = () => {
  return (
    <>
      <MasterStructuredData includeBusiness={true} includeWebsite={true} />
      <WebPageStructuredData
        title="Editorial Policy | Exquisite Dentistry Los Angeles"
        description="How Exquisite Dentistry creates, reviews, and updates dental information to keep our content accurate, helpful, and trustworthy."
        url={getCanonicalUrl('/editorial-policy')}
        breadcrumbs={[{ name: 'Editorial Policy', url: getCanonicalUrl('/editorial-policy') }]}
      />
      <PageSEO
        title="Editorial Policy | Exquisite Dentistry Los Angeles"
        description="Learn how our team writes and clinically reviews dental content to ensure accuracy, transparency, and usefulness for patients."
        keywords="editorial policy, dental content standards, clinical review, Exquisite Dentistry Los Angeles"
        path="/editorial-policy"
      />

      <PageHeader
        title="Editorial Policy"
        subtitle="How we create and maintain accurate, patient‑focused dental content."
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-8">
            <strong>Last Updated:</strong> September 30, 2026
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-black">1. Purpose of Our Content</h2>
            <p className="text-gray-600 mb-4">
              Our website exists to help patients understand their options for cosmetic and restorative dentistry.
              Content is written to explain what a treatment is, who it may help, what to expect, and what alternatives
              might be appropriate. Nothing on this site replaces an in‑person dental evaluation.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-black">2. Clinical Review</h2>
            <p className="text-gray-600 mb-4">
              Clinical review is recorded separately from authorship and website updates. An article displays a clinical-review
              credit only when the completed review, reviewer, and review date have been documented. An author name
              or publication date alone does not establish clinical review. Treatment suitability depends on your
              dental evaluation.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-black">3. Evidence and Sources</h2>
            <p className="text-gray-600 mb-4">
              We aim to use plain language backed by reputable clinical guidance, manufacturer instructions,
              and peer‑reviewed research where relevant. When we mention benefits or timelines, they reflect typical
              clinical ranges and may vary by patient.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-black">4. Updates and Corrections</h2>
            <p className="text-gray-600 mb-4">
              We update content when corrections or changes are needed. A “Last updated” date records a content change;
              it does not by itself mean a dentist has clinically reviewed that page. Where a completed clinical
              review is documented, the article identifies the reviewer and review date.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-black">5. Advertising and Promotions</h2>
            <p className="text-gray-600 mb-4">
              We do not accept paid placements or affiliate promotions in clinical content. Any offers or promotions are
              clearly labeled and do not influence how we describe treatments or clinical recommendations.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-black">6. Contact Us About Content</h2>
            <p className="text-gray-600 mb-4">
              If you notice an error or want clarification, please email us at{' '}
              <a className="text-secondary underline-offset-4 hover:underline" href={`mailto:${EMAIL}`}>
                {EMAIL}
              </a>. We review feedback and update content as needed.
            </p>
          </section>
        </div>
      </div>
    </>
  );
};

export default EditorialPolicy;

