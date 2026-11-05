import React from 'react';
import SectionHeading from '../../features/public/components/SectionHeading';
import AboutSection from '../../features/public/sections/AboutSection';
import WorkflowSection from '../../features/public/sections/WorkflowSection';
import PartnersSection from '../../features/public/sections/PartnersSection';
import CtaSection from '../../features/public/sections/CtaSection';

export const AboutPage = () => {
  return (
    <div className="space-y-16 py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <SectionHeading
          badge="Our Mission & Architecture"
          title="Transforming Campus Placements into Transparent Success"
          subtitle="CampusConnect re-imagines university recruiting with automated eligibility validation, student transparency, and actionable placement analytics."
        />
      </div>

      <AboutSection />
      <WorkflowSection />
      <PartnersSection />
      <CtaSection />
    </div>
  );
};

export default AboutPage;
