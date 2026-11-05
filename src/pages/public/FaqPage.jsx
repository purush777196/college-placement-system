import React from 'react';
import SectionHeading from '../../features/public/components/SectionHeading';
import FaqSection from '../../features/public/sections/FaqSection';
import ContactSection from '../../features/public/sections/ContactSection';
import CtaSection from '../../features/public/sections/CtaSection';

export const FaqPage = () => {
  return (
    <div className="space-y-16 py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <SectionHeading
          badge="Knowledge Base & FAQs"
          title="CampusConnect Help Center"
          subtitle="Explore detailed answers to common inquiries from students, college administrators, and visiting campus recruiters."
        />
      </div>

      <FaqSection />
      <ContactSection />
      <CtaSection />
    </div>
  );
};

export default FaqPage;
