import React from 'react';
import {
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';
import { Badge } from '../../../components/ui/Badge';
import { cn } from '../../../utils/cn';

export const DashboardMockup = ({ className }) => {
  return (
    <div
      className={cn(
        'relative mx-auto w-full max-w-4xl rounded-2xl border border-slate-200/80 bg-white/95 p-4 sm:p-6 shadow-2xl backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/95',
        className
      )}
    >
      {/* Window Controls Bar */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-rose-500/80" />
          <span className="h-3 w-3 rounded-full bg-amber-500/80" />
          <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
          <span className="ml-2 text-xs font-medium text-slate-400">
            campusconnect.portal/demo-preview
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 text-[10px] font-bold">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live Sync Active
          </span>
        </div>
      </div>

      {/* Main Mock Interface */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Left: Candidate Card */}
        <div className="rounded-xl border border-slate-200/70 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-800/40 space-y-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
              AS
            </div>
            <div>
              <p className="font-bold text-xs text-slate-900 dark:text-slate-100">Aarav Sharma</p>
              <p className="text-[10px] text-slate-500">Computer Science • CGPA 8.85</p>
            </div>
          </div>

          <div className="rounded-lg bg-white p-3 border border-slate-200/60 dark:bg-slate-900 dark:border-slate-800 space-y-2">
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-slate-500 font-medium">Algorithmic Match</span>
              <span className="font-extrabold text-blue-600 dark:text-blue-400">94%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-1.5 dark:bg-slate-800">
              <div className="bg-blue-600 h-1.5 rounded-full w-[94%]" />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[11px]">
              <span className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                Verified Transcripts
              </span>
              <span className="text-emerald-600 font-semibold text-[10px]">Pass</span>
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                Zero Backlogs
              </span>
              <span className="text-emerald-600 font-semibold text-[10px]">Clear</span>
            </div>
          </div>
        </div>

        {/* Center: Active Drive Pipeline */}
        <div className="md:col-span-2 rounded-xl border border-slate-200/70 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                  Cloud Solutions Engineer
                </h4>
                <Badge variant="primary" className="text-[10px]">
                  Applications Open
                </Badge>
              </div>
              <p className="text-[11px] text-slate-500">Apex Cloud Systems • ₹28.5 LPA Base CTC</p>
            </div>
            <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400">
              15 Vacancies
            </span>
          </div>

          {/* Stepper Pipeline */}
          <div className="grid grid-cols-4 gap-2 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
            <div className="text-center">
              <div className="flex items-center justify-center h-6 w-6 rounded-full bg-emerald-600 text-white mx-auto mb-1 text-[10px] font-bold">
                ✓
              </div>
              <p className="text-[10px] font-semibold text-slate-700 dark:text-slate-300">Applied</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center h-6 w-6 rounded-full bg-emerald-600 text-white mx-auto mb-1 text-[10px] font-bold">
                ✓
              </div>
              <p className="text-[10px] font-semibold text-slate-700 dark:text-slate-300">Eligibility</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center h-6 w-6 rounded-full bg-blue-600 text-white mx-auto mb-1 text-[10px] font-bold animate-pulse">
                3
              </div>
              <p className="text-[10px] font-semibold text-blue-600 dark:text-blue-400">Shortlisted</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center h-6 w-6 rounded-full bg-slate-200 text-slate-500 mx-auto mb-1 text-[10px] font-bold dark:bg-slate-700 dark:text-slate-400">
                4
              </div>
              <p className="text-[10px] font-semibold text-slate-400">Offer Rollout</p>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-2 pt-1 text-center">
            <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/40">
              <p className="text-[10px] text-slate-500">Cutoff CGPA</p>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200">8.0+</p>
            </div>
            <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/40">
              <p className="text-[10px] text-slate-500">Drive Date</p>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Nov 28</p>
            </div>
            <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/40">
              <p className="text-[10px] text-slate-500">Panel Slots</p>
              <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">24 Ready</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardMockup;
