import React from 'react';
import SectionHeading from '../components/SectionHeading';
import { Card } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { DEMO_PARTNER_COMPANIES } from '../data/landingData';
import { cn } from '../../../utils/cn';

export const PartnersSection = () => {
  return (
    <section id="partners" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        <SectionHeading
          badge="Sample Industry Partners"
          title="Connecting Top Talent with Leading Enterprises"
          subtitle="CampusConnect facilitates recruitment across Tier-1, Dream, and Core engineering corporate partners (demonstration examples shown below)."
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {DEMO_PARTNER_COMPANIES.map((company) => (
            <Card
              key={company.id}
              className="p-5 flex flex-col items-center text-center justify-between transition-all duration-300 hover:shadow-md hover:-translate-y-1 border border-slate-200 dark:border-slate-800"
            >
              <div
                className={cn(
                  'h-12 w-12 rounded-2xl text-white font-extrabold text-lg flex items-center justify-center shadow-sm mb-3',
                  company.color
                )}
              >
                {company.logoLetter}
              </div>

              <div className="space-y-1 mb-2">
                <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 line-clamp-1">
                  {company.name}
                </h4>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1">
                  {company.industry}
                </p>
              </div>

              <Badge variant="outline" className="text-[9px] py-0 px-1.5 uppercase font-semibold">
                {company.tier}
              </Badge>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <p className="text-xs text-slate-400 dark:text-slate-500">
            * All company entities listed above represent illustrative demo recruiters designed for testing institutional workflows.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
