import React from 'react';
import SectionHeading from '../components/SectionHeading';
import WorkflowStep from '../components/WorkflowStep';
import { WORKFLOW_STEPS } from '../data/landingData';

export const WorkflowSection = () => {
  return (
    <section id="workflow" className="py-20 md:py-28 bg-slate-100/60 dark:bg-slate-900/40 border-y border-slate-200/80 dark:border-slate-800/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        <SectionHeading
          badge="Placement Lifecycle"
          title="How CampusConnect Works"
          subtitle="A structured, transparent seven-step journey guiding candidates from institutional enrollment to digital offer letter celebration."
        />

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-6 relative">
          {WORKFLOW_STEPS.map((item, idx) => (
            <WorkflowStep
              key={item.step}
              step={item.step}
              title={item.title}
              description={item.description}
              icon={item.icon}
              isLast={idx === WORKFLOW_STEPS.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkflowSection;
