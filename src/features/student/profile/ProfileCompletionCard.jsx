import React from 'react';
import {
  Sparkles,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';

export const ProfileCompletionCard = ({
  completionReport = {
    percentage: 85,
    sections: {
      personal: { score: 15, max: 15, percentage: 100 },
      academic: { score: 20, max: 20, percentage: 100 },
      education: { score: 15, max: 15, percentage: 100 },
      skills: { score: 15, max: 15, percentage: 100 },
      projects: { score: 15, max: 15, percentage: 100 },
      certifications: { score: 10, max: 10, percentage: 100 },
      documents: { score: 10, max: 10, percentage: 100 },
    },
    missingItems: [],
    isPlacementReady: true,
  },
  onNavigateSection,
}) => {
  const { percentage = 85, sections = {}, missingItems = [], isPlacementReady = true } =
    completionReport;

  const sectionLabels = [
    { id: 'personal', label: 'Personal Information', max: 15 },
    { id: 'academic', label: 'Academic Standing', max: 20 },
    { id: 'education', label: 'Education History', max: 15 },
    { id: 'skills', label: 'Technical & Soft Skills', max: 15 },
    { id: 'projects', label: 'Project Portfolio', max: 15 },
    { id: 'certifications', label: 'Certifications', max: 10 },
    { id: 'documents', label: 'Resume Reference', max: 10 },
  ];

  return (
    <Card className="border-slate-200 dark:border-slate-800 shadow-xs">
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <CardTitle className="text-base font-bold text-slate-900 dark:text-slate-100">
                Profile Completeness Engine
              </CardTitle>
              <p className="text-xs text-slate-500">
                Calculated dynamically from verified academic credentials, skills, and portfolio milestones.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            {isPlacementReady ? (
              <Badge variant="success" className="text-xs">
                <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                Drive Eligible (&ge; 75%)
              </Badge>
            ) : (
              <Badge variant="warning" className="text-xs">
                <AlertCircle className="h-3.5 w-3.5 mr-1" />
                Action Required (&lt; 75%)
              </Badge>
            )}
            <span className="text-2xl font-black text-blue-600 dark:text-blue-400">
              {percentage}%
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 pt-1">
        {/* Main Progress Bar */}
        <div className="space-y-1.5">
          <div className="h-2.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                percentage >= 80
                  ? 'bg-emerald-500'
                  : percentage >= 60
                  ? 'bg-blue-600'
                  : 'bg-amber-500'
              }`}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        {/* Section Breakdown Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
          {sectionLabels.map((sec) => {
            const secData = sections[sec.id] || { score: 0, max: sec.max, percentage: 0 };
            const isComplete = secData.score >= sec.max;

            return (
              <div
                key={sec.id}
                onClick={() => onNavigateSection && onNavigateSection(sec.id)}
                className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
                  isComplete
                    ? 'border-emerald-200 bg-emerald-50/40 dark:border-emerald-900/40 dark:bg-emerald-950/20'
                    : 'border-slate-200 bg-slate-50/60 dark:border-slate-800 dark:bg-slate-800/40 hover:border-blue-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-slate-700 dark:text-slate-300 truncate text-[11px]">
                    {sec.label.split(' ')[0]}
                  </span>
                  {isComplete ? (
                    <CheckCircle2 className="h-3 w-3 text-emerald-500 shrink-0" />
                  ) : (
                    <span className="text-[10px] text-slate-400">
                      {secData.score}/{sec.max}
                    </span>
                  )}
                </div>
                <div className="h-1 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 dark:bg-blue-500 rounded-full"
                    style={{ width: `${secData.percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Actionable Suggestions */}
        {missingItems.length > 0 && (
          <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-3.5 dark:border-amber-900/40 dark:bg-amber-950/20 space-y-2">
            <h5 className="text-xs font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1.5 uppercase tracking-wider">
              <TrendingUp className="h-3.5 w-3.5 text-amber-600" />
              Actionable Recommendations to Reach 100% Score
            </h5>
            <div className="space-y-1.5">
              {missingItems.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between text-xs text-amber-800 dark:text-amber-300"
                >
                  <span className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                    <strong>{item.section}:</strong> {item.action}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfileCompletionCard;
