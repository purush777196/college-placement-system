import React from 'react';
import {
  FileText,
  Search,
  CheckCircle2,
  Clock,
  Sparkles,
  Award,
  XCircle,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { cn } from '../../../utils/cn';

const STAGE_CONFIG = [
  { key: 'Applied', label: '1. Applied', icon: FileText, color: 'text-blue-600 bg-blue-50 dark:bg-blue-950/40 dark:text-blue-400' },
  { key: 'Under Review', label: '2. Under Review', icon: Search, color: 'text-purple-600 bg-purple-50 dark:bg-purple-950/40 dark:text-purple-400' },
  { key: 'Shortlisted', label: '3. Shortlisted', icon: CheckCircle2, color: 'text-sky-600 bg-sky-50 dark:bg-sky-950/40 dark:text-sky-400' },
  { key: 'Assessment', label: '4. Assessment', icon: Clock, color: 'text-amber-600 bg-amber-50 dark:bg-amber-950/40 dark:text-amber-400' },
  { key: 'Interview', label: '5. Interview', icon: Sparkles, color: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 dark:text-indigo-400' },
  { key: 'Offered', label: '6. Offered', icon: Award, color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-400' },
  { key: 'Rejected', label: '7. Rejected', icon: XCircle, color: 'text-rose-600 bg-rose-50 dark:bg-rose-950/40 dark:text-rose-400' },
];

export const ApplicationPipelineTracker = ({
  applications = [],
  pipelineCounts = {},
  selectedStage = 'all',
  onSelectStage,
  onInspectApplication,
  className,
}) => {
  const totalApps = applications.length;

  return (
    <Card className={cn('border-slate-200 dark:border-slate-800 shadow-sm', className)}>
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              Application Pipeline Tracker
            </CardTitle>
            <CardDescription className="text-xs">
              Live progression of your active campus placement applications across all 7 hiring stages
            </CardDescription>
          </div>
          <Badge variant="primary" className="text-xs self-start sm:self-auto">
            {totalApps} Total Registered
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* 7-Stage Horizontal Pipeline Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
          {STAGE_CONFIG.map((stage) => {
            const count = pipelineCounts[stage.key] ?? 0;
            const isSelected = selectedStage === stage.key;
            const StageIcon = stage.icon;

            return (
              <button
                key={stage.key}
                type="button"
                onClick={() => onSelectStage && onSelectStage(isSelected ? 'all' : stage.key)}
                className={cn(
                  'flex flex-col items-center justify-between p-3 rounded-xl border text-center transition-all cursor-pointer',
                  isSelected
                    ? 'border-blue-600 bg-blue-50/80 dark:bg-blue-950/40 ring-2 ring-blue-500/20'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900/60'
                )}
              >
                <div className={cn('p-2 rounded-lg mb-2', stage.color)}>
                  <StageIcon className="h-4 w-4" />
                </div>
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 line-clamp-1">
                  {stage.label.split('. ')[1]}
                </span>
                <span className="mt-1 text-lg font-extrabold text-slate-900 dark:text-slate-100">
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Stage Applications Strip */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-500">
            <span>
              {selectedStage === 'all'
                ? 'Active Applications Overview'
                : `Applications in '${selectedStage}' Stage (${pipelineCounts[selectedStage] || 0})`}
            </span>
            {selectedStage !== 'all' && (
              <button
                type="button"
                onClick={() => onSelectStage && onSelectStage('all')}
                className="text-blue-600 hover:underline cursor-pointer lowercase first-letter:uppercase"
              >
                View all ({totalApps})
              </button>
            )}
          </div>

          {applications.length === 0 ? (
            <div className="text-center py-6 text-xs text-slate-500">
              No applications match this stage.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {applications.slice(0, 4).map((app) => (
                <div
                  key={app.id}
                  className="rounded-xl border border-slate-200 dark:border-slate-800 p-3.5 bg-slate-50/50 dark:bg-slate-900/40 flex items-center justify-between hover:border-blue-300 dark:hover:border-blue-800 transition-colors"
                >
                  <div className="min-w-0 pr-3">
                    <p className="font-semibold text-xs text-slate-900 dark:text-slate-100 truncate">
                      {app.roleTitle}
                    </p>
                    <p className="text-[11px] text-slate-500 truncate">
                      {app.companyName} • ₹{app.packageLPA} LPA
                    </p>
                    <div className="mt-1.5 flex items-center gap-2">
                      <span className="text-[10px] text-slate-400">
                        Applied: {app.appliedAt}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <Badge variant={app.currentStage === 'Offered' ? 'success' : app.currentStage === 'Rejected' ? 'danger' : 'primary'} className="text-[10px]">
                      {app.currentStage}
                    </Badge>
                    {onInspectApplication && (
                      <button
                        type="button"
                        onClick={() => onInspectApplication(app)}
                        className="inline-flex items-center gap-1 text-[11px] text-blue-600 dark:text-blue-400 hover:underline cursor-pointer font-medium"
                      >
                        Details <ArrowRight className="h-3 w-3" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ApplicationPipelineTracker;

