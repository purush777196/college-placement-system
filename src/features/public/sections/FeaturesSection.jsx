import React from 'react';
import SectionHeading from '../components/SectionHeading';
import FeatureCard from '../components/FeatureCard';
import { PLATFORM_FEATURES } from '../data/landingData';

export const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 md:py-28 bg-slate-100/50 dark:bg-slate-900/30 border-y border-slate-200/80 dark:border-slate-800/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        <SectionHeading
          badge="Platform Features"
          title="Engineered for the Entire Recruitment Lifecycle"
          subtitle="Explore the purpose-built modules that empower universities and corporate partners to orchestrate high-volume placements seamlessly."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {PLATFORM_FEATURES.map((feat) => (
            <FeatureCard
              key={feat.id}
              icon={feat.icon}
              title={feat.title}
              description={feat.description}
              tag={feat.tag}
              isPlanned={feat.isPlanned}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
