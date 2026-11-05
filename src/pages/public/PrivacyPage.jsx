import React from 'react';
import { ShieldCheck, Lock, FileText, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionHeading from '../../features/public/components/SectionHeading';
import { Card } from '../../components/ui/Card';
import Button from '../../components/ui/Button';

export const PrivacyPage = () => {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 space-y-12">
      <SectionHeading
        badge="Platform Policy"
        title="Privacy Policy & Student Data Governance"
        subtitle="Last revised: November 2026 • CampusConnect Institutional Compliance"
      />

      <Card className="p-8 sm:p-10 space-y-8 text-sm text-slate-700 dark:text-slate-300 leading-relaxed border border-slate-200 dark:border-slate-800">
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-blue-600" />
            1. Overview & Institutional Commitment
          </h3>
          <p>
            CampusConnect is dedicated to maintaining the confidentiality and integrity of student academic records, resumes, and recruiter interaction data. This platform operates under institutional data-sharing agreements between affiliated higher education colleges and verified corporate partners.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Lock className="h-5 w-5 text-emerald-600" />
            2. Data Collected & Purpose
          </h3>
          <p>
            We process verified academic credentials (such as CGPA, department, graduation year, and backlog status) strictly for the purpose of validating candidate eligibility for participating campus recruitment drives.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <FileText className="h-5 w-5 text-indigo-600" />
            3. Recruiter Access & Transparency
          </h3>
          <p>
            Student profiles, resumes, and contact credentials are only shared with authorized corporate recruiters after a student actively submits an application to that recruiter’s published placement drive.
          </p>
        </div>

        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
          <Link to="/">
            <Button variant="outline" size="sm" leftIcon={<ArrowLeft className="h-4 w-4" />}>
              Return to Home
            </Button>
          </Link>
          <span className="text-xs text-slate-400">
            CampusConnect Policy • Phase 1 Documentation
          </span>
        </div>
      </Card>
    </div>
  );
};

export default PrivacyPage;
