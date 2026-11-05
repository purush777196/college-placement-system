import React from 'react';
import { FileCheck, Scale, Award, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionHeading from '../../features/public/components/SectionHeading';
import { Card } from '../../components/ui/Card';
import Button from '../../components/ui/Button';

export const TermsPage = () => {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 space-y-12">
      <SectionHeading
        badge="Platform Terms"
        title="Terms of Service & Placement Code of Conduct"
        subtitle="Last revised: November 2026 • CampusConnect Terms for Students, TPOs, and Recruiters"
      />

      <Card className="p-8 sm:p-10 space-y-8 text-sm text-slate-700 dark:text-slate-300 leading-relaxed border border-slate-200 dark:border-slate-800">
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Scale className="h-5 w-5 text-blue-600" />
            1. Institutional Participation & Eligibility
          </h3>
          <p>
            By using CampusConnect, all participating candidates agree to maintain truthfulness in reported academic credentials, skills, and project accomplishments. Any falsification of CGPA or backlog records constitutes grounds for immediate disqualification from college placement activities.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <FileCheck className="h-5 w-5 text-emerald-600" />
            2. Campus Drive Applications & Interview Discipline
          </h3>
          <p>
            Candidates who apply to placement drives and clear eligibility checks are obligated to attend scheduled assessments and interview panels unless an authorized institutional exemption has been approved by the Training & Placement Office.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Award className="h-5 w-5 text-amber-600" />
            3. Multi-Offer Guidelines & Acceptance
          </h3>
          <p>
            Institutions may enforce one-offer or dream-tier promotion rules. Once a candidate formally accepts an offer letter on CampusConnect, subsequent applications are automatically restricted in accordance with university placement bylaws.
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

export default TermsPage;
