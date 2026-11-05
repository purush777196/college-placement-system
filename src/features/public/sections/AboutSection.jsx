import React from 'react';
import SectionHeading from '../components/SectionHeading';
import { Card } from '../../../components/ui/Card';
import {
  ShieldAlert,
  CheckCircle2,
  Sparkles,
  BarChart,
  Lock,
  Workflow,
} from 'lucide-react';

export const AboutSection = () => {
  return (
    <section id="about" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        <SectionHeading
          badge="About CampusConnect"
          title="Bridging Higher Education and Industry Recruitment"
          subtitle="CampusConnect is an intelligent placement management system designed to eliminate spreadsheet chaos and replace manual workflows with transparent, automated campus hiring."
        />

        {/* Problem vs Solution Comparison Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Legacy Challenges */}
          <Card className="p-8 border-rose-200/80 bg-rose-50/30 dark:border-rose-900/40 dark:bg-rose-950/10 space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-100 text-rose-600 dark:bg-rose-950 dark:text-rose-400">
                <ShieldAlert className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                  The Fragmented Placement Challenge
                </h3>
                <p className="text-xs text-rose-600 dark:text-rose-400 font-medium">Traditional Campus Struggles</p>
              </div>
            </div>

            <ul className="space-y-3.5 text-sm text-slate-600 dark:text-slate-300">
              <li className="flex items-start gap-2.5">
                <span className="text-rose-500 font-bold shrink-0 mt-0.5">✕</span>
                <span><strong>Disjointed Spreadsheets:</strong> Unsynchronized student records, missed deadlines, and manual CGPA recalculations.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-500 font-bold shrink-0 mt-0.5">✕</span>
                <span><strong>Ineligible Applicants:</strong> Recruiters wasting hours reviewing applicants who do not meet institutional or company cutoffs.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-500 font-bold shrink-0 mt-0.5">✕</span>
                <span><strong>Opaque Statuses:</strong> Students left without visibility regarding shortlist decisions, test scores, or interview slots.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-500 font-bold shrink-0 mt-0.5">✕</span>
                <span><strong>Painful NIRF Audits:</strong> Placement officers spending weeks compiling manual reports for national accreditation.</span>
              </li>
            </ul>
          </Card>

          {/* CampusConnect Modern Solution */}
          <Card className="p-8 border-blue-200/80 bg-blue-50/30 dark:border-blue-900/40 dark:bg-blue-950/10 space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                  The CampusConnect Platform Advantage
                </h3>
                <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">Automated Enterprise Recruitment</p>
              </div>
            </div>

            <ul className="space-y-3.5 text-sm text-slate-600 dark:text-slate-300">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Centralized Cloud Platform:</strong> Single source of truth linking candidate portfolios, college officers, and corporate recruiters.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Algorithmic Eligibility Verification:</strong> Instant validation of student CGPA, branch criteria, and backlogs before applying.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>End-to-End Pipeline Transparency:</strong> Clear visual progress stages for candidates, from initial application to offer letter sign-off.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Instant Institutional Analytics:</strong> Real-time salary distributions, company tier distributions, and automated NIRF reports.</span>
              </li>
            </ul>
          </Card>
        </div>

        {/* 3 Core Pillars */}
        <div className="grid sm:grid-cols-3 gap-6 pt-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 dark:bg-slate-900 dark:border-slate-800 space-y-2">
            <div className="h-10 w-10 rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400 flex items-center justify-center mb-3">
              <Workflow className="h-5 w-5" />
            </div>
            <h4 className="font-bold text-base text-slate-900 dark:text-slate-100">
              Speed & Precision
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Accelerates candidate screening cycles by 70% with automatic eligibility checks and direct panel interview scheduling.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 dark:bg-slate-900 dark:border-slate-800 space-y-2">
            <div className="h-10 w-10 rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 flex items-center justify-center mb-3">
              <Lock className="h-5 w-5" />
            </div>
            <h4 className="font-bold text-base text-slate-900 dark:text-slate-100">
              Verified Compliance
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Guarantees academic integrity with registrar-verified grades, one-student-one-offer policies, and audit logs.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 dark:bg-slate-900 dark:border-slate-800 space-y-2">
            <div className="h-10 w-10 rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400 flex items-center justify-center mb-3">
              <BarChart className="h-5 w-5" />
            </div>
            <h4 className="font-bold text-base text-slate-900 dark:text-slate-100">
              Data-Driven Growth
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Equips university leadership with deep cohort intelligence, recruiter tier retention rates, and CTC trend visualizations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
