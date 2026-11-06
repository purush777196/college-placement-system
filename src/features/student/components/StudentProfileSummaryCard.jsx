import React from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { cn } from '../../../utils/cn';

export const StudentProfileSummaryCard = ({
  student = {
    name: 'Aarav Sharma',
    email: 'aarav.sharma@campus.edu',
    rollNumber: '22CS014',
    department: 'Computer Science & Engineering',
    degree: 'B.Tech in Computer Science',
    batch: '2022 - 2026',
    cgpa: 8.85,
    profileCompletion: 85,
    skills: ['React 19', 'Python', 'Node.js', 'PostgreSQL', 'Docker', 'Kubernetes', 'Algorithms'],
  },
  className,
}) => {
  return (
    <Card className={cn('border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between', className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-bold flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            Candidate Academic Profile
          </CardTitle>
          <Badge variant="success" className="text-[10px] inline-flex items-center gap-1">
            <ShieldCheck className="h-3 w-3" /> Verified
          </Badge>
        </div>
        <CardDescription className="text-xs">
          Academic standing and credentials evaluated for placement cutoffs
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4 text-xs">
        {/* Profile Completion Bar */}
        <div className="rounded-xl bg-blue-50/60 dark:bg-blue-950/30 p-3 border border-blue-100 dark:border-blue-900/40 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-slate-700 dark:text-slate-300">Profile Completion:</span>
            <span className="text-blue-600 dark:text-blue-400">{student.profileCompletion}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-blue-600 dark:bg-blue-500 rounded-full transition-all duration-500"
              style={{ width: `${student.profileCompletion}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-500">
            Add 1 additional technical certification to achieve 100% profile score.
          </p>
        </div>

        {/* Key Attributes Grid */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <div>
            <span className="text-[10px] font-semibold uppercase text-slate-400">Full Name</span>
            <p className="font-bold text-slate-900 dark:text-slate-100 mt-0.5">{student.name}</p>
          </div>
          <div>
            <span className="text-[10px] font-semibold uppercase text-slate-400">Current CGPA</span>
            <p className="font-extrabold text-emerald-600 dark:text-emerald-400 mt-0.5">
              {student.cgpa} / 10.0
            </p>
          </div>
          <div>
            <span className="text-[10px] font-semibold uppercase text-slate-400">Department</span>
            <p className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5 truncate">
              {student.department}
            </p>
          </div>
          <div>
            <span className="text-[10px] font-semibold uppercase text-slate-400">Cohort / Batch</span>
            <p className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
              {student.batch}
            </p>
          </div>
        </div>

        {/* Skills Chips */}
        <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
          <span className="text-[10px] font-semibold uppercase text-slate-400">Verified Technical Skills</span>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {(student.skills || []).map((skill) => (
              <span
                key={skill}
                className="rounded-md bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[11px] font-medium text-slate-700 dark:text-slate-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
        <Link
          to="/student/resume-builder"
          className="w-full flex items-center justify-between text-blue-600 dark:text-blue-400 font-semibold hover:underline"
        >
          <span>Open AI Resume ATS Builder</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </CardFooter>
    </Card>
  );
};

export default StudentProfileSummaryCard;
