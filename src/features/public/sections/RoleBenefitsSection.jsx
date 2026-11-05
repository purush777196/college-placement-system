import React, { useState } from 'react';
import SectionHeading from '../components/SectionHeading';
import RoleBenefitCard from '../components/RoleBenefitCard';
import { ROLE_BENEFITS } from '../data/landingData';
import { GraduationCap, TrendingUp, Building2 } from 'lucide-react';
import { cn } from '../../../utils/cn';

export const RoleBenefitsSection = () => {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <section id="roles" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        <SectionHeading
          badge="Role-Tailored Benefits"
          title="Empowering Every Campus Stakeholder"
          subtitle="Whether you are a student preparing for your first technical interview, a TPO head directing annual drives, or a corporate talent leader scouting top engineers."
        />

        {/* Optional Filter Tabs for Small Screens */}
        <div className="flex justify-center">
          <div className="inline-flex rounded-xl bg-slate-200/70 p-1.5 dark:bg-slate-800">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={cn(
                'rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-colors cursor-pointer',
                activeTab === 'all'
                  ? 'bg-white text-slate-900 shadow-xs dark:bg-slate-900 dark:text-slate-100'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
              )}
            >
              All Roles
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('students')}
              className={cn(
                'rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5',
                activeTab === 'students'
                  ? 'bg-white text-slate-900 shadow-xs dark:bg-slate-900 dark:text-slate-100'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
              )}
            >
              <GraduationCap className="h-3.5 w-3.5 text-blue-600" />
              <span>Students</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('tpo')}
              className={cn(
                'rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5',
                activeTab === 'tpo'
                  ? 'bg-white text-slate-900 shadow-xs dark:bg-slate-900 dark:text-slate-100'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
              )}
            >
              <TrendingUp className="h-3.5 w-3.5 text-emerald-600" />
              <span>TPO Officers</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('recruiters')}
              className={cn(
                'rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5',
                activeTab === 'recruiters'
                  ? 'bg-white text-slate-900 shadow-xs dark:bg-slate-900 dark:text-slate-100'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
              )}
            >
              <Building2 className="h-3.5 w-3.5 text-amber-600" />
              <span>Recruiters</span>
            </button>
          </div>
        </div>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {(activeTab === 'all' || activeTab === 'students') && (
            <div id="students">
              <RoleBenefitCard roleKey="students" roleData={ROLE_BENEFITS.students} />
            </div>
          )}
          {(activeTab === 'all' || activeTab === 'tpo') && (
            <div id="tpo">
              <RoleBenefitCard roleKey="tpo" roleData={ROLE_BENEFITS.tpo} />
            </div>
          )}
          {(activeTab === 'all' || activeTab === 'recruiters') && (
            <div id="recruiters">
              <RoleBenefitCard roleKey="recruiters" roleData={ROLE_BENEFITS.recruiters} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default RoleBenefitsSection;
