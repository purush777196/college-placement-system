import React from 'react';
import SectionHeading from '../../features/public/components/SectionHeading';
import FeaturesSection from '../../features/public/sections/FeaturesSection';
import WorkflowSection from '../../features/public/sections/WorkflowSection';
import CtaSection from '../../features/public/sections/CtaSection';

export const FeaturesPage = () => {
  return (
    <div className="space-y-16 py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <SectionHeading
          badge="Complete Capability Suite"
          title="All Platform Features & Capabilities"
          subtitle="A comprehensive inventory of tools designed to automate college placement drives, evaluate candidates, and deliver transparent reporting."
        />
      </div>

      <FeaturesSection />
      <WorkflowSection />
      <CtaSection />
    </div>
  );
};

export default FeaturesPage;
