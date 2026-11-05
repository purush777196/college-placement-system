import React from 'react';
import StatCard from '../components/StatCard';
import { PLACEMENT_STATS } from '../data/landingData';

export const StatsSection = () => {
  return (
    <section id="stats" className="py-12 bg-slate-100/60 dark:bg-slate-900/40 border-y border-slate-200/80 dark:border-slate-800/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Institutional Placement Track Record • Illustrative Sample Metrics
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PLACEMENT_STATS.map((stat) => (
            <StatCard
              key={stat.id}
              icon={stat.icon}
              label={stat.label}
              value={stat.value}
              subtext={stat.subtext}
              variant={stat.variant}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
