import React from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Calendar,
  GraduationCap,
  Users,
  CheckCircle2,
  XCircle,
  Clock,
} from 'lucide-react';
import { Card, CardHeader, CardContent, CardFooter } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import Button from '../../../components/ui/Button';

export const DriveCard = ({
  drive,
  onApply,
  isApplied = false,
  viewMode = 'grid',
}) => {
  const isExpired = drive.isExpired || drive.status === 'Deadline Expired';
  const isEligible = drive.isEligible && !isExpired;

  if (viewMode === 'list') {
    return (
      <Card className="p-4 border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-700 transition-all">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5 min-w-0">
            <img
              src={drive.companyLogo}
              alt={drive.companyName}
              className="h-11 w-11 rounded-xl object-cover border border-slate-200 dark:border-slate-800 shrink-0"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 truncate">
                  {drive.roleTitle}
                </h3>
                {isApplied ? (
                  <Badge variant="primary" className="text-[10px]">
                    Applied
                  </Badge>
                ) : isExpired ? (
                  <Badge variant="secondary" className="text-[10px]">
                    Expired
                  </Badge>
                ) : isEligible ? (
                  <Badge variant="success" className="text-[10px]">
                    Eligible
                  </Badge>
                ) : (
                  <Badge variant="danger" className="text-[10px]">
                    Ineligible
                  </Badge>
                )}
              </div>
              <p className="text-xs text-slate-500 font-medium">{drive.companyName}</p>

              <div className="flex items-center gap-4 mt-2 text-xs text-slate-500 dark:text-slate-400 flex-wrap">
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  ₹{drive.packageLPA} LPA
                </span>
                <span className="flex items-center gap-1">
                  <GraduationCap className="h-3.5 w-3.5" /> Cutoff: {drive.minCGPA} CGPA
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" /> {drive.location}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" /> Deadline: {drive.deadline}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
            <Link to={`/student/drives/${drive.id}`}>
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </Link>
            <Button
              size="sm"
              variant={isEligible && !isApplied ? 'primary' : 'secondary'}
              disabled={!isEligible || isApplied || isExpired}
              onClick={() => onApply && onApply(drive)}
            >
              {isApplied ? 'Applied' : isExpired ? 'Closed' : isEligible ? 'Apply Now' : 'Ineligible'}
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col justify-between border-slate-200 dark:border-slate-800 hover:shadow-md transition-all hover:border-blue-400 dark:hover:border-blue-700">
      <CardHeader className="p-5 pb-3 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <img
              src={drive.companyLogo}
              alt={drive.companyName}
              className="h-12 w-12 rounded-xl object-cover border border-slate-200 dark:border-slate-800"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                {drive.companyName}
              </p>
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 line-clamp-1">
                {drive.roleTitle}
              </h3>
            </div>
          </div>

          <div>
            {isApplied ? (
              <Badge variant="primary" className="text-[10px]">
                Applied
              </Badge>
            ) : isExpired ? (
              <Badge variant="secondary" className="text-[10px]">
                Expired
              </Badge>
            ) : isEligible ? (
              <Badge variant="success" className="text-[10px] inline-flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" /> Eligible
              </Badge>
            ) : (
              <Badge variant="danger" className="text-[10px] inline-flex items-center gap-1">
                <XCircle className="h-3 w-3" /> Ineligible
              </Badge>
            )}
          </div>
        </div>

        <div className="flex items-baseline justify-between pt-1">
          <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">
            ₹{drive.packageLPA} LPA
          </span>
          <span className="text-xs text-slate-500">
            {drive.jobType || 'Full-Time'}
          </span>
        </div>
      </CardHeader>

      <CardContent className="p-5 pt-0 space-y-3 text-xs flex-1">
        <div className="grid grid-cols-2 gap-2 text-slate-600 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-1.5">
            <GraduationCap className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            <span className="truncate">Min. {drive.minCGPA} CGPA</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{drive.vacancies} Openings</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{drive.location}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            <span className="truncate">Ends: {drive.deadline}</span>
          </div>
        </div>

        {/* Ineligibility Reason Note if ineligible */}
        {!isEligible && !isExpired && drive.eligibilityReasons && drive.eligibilityReasons.length > 0 && (
          <div className="rounded-lg bg-rose-50 dark:bg-rose-950/40 p-2 text-[11px] text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900/40">
            <p className="font-semibold">Cutoff Requirement:</p>
            <p className="line-clamp-1">{drive.eligibilityReasons[0]}</p>
          </div>
        )}
      </CardContent>

      <CardFooter className="p-5 pt-0 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
        <Link to={`/student/drives/${drive.id}`} className="flex-1">
          <Button variant="outline" size="sm" className="w-full">
            Details
          </Button>
        </Link>
        <Button
          size="sm"
          className="flex-1"
          variant={isEligible && !isApplied ? 'primary' : 'secondary'}
          disabled={!isEligible || isApplied || isExpired}
          onClick={() => onApply && onApply(drive)}
        >
          {isApplied ? 'Applied' : isExpired ? 'Closed' : isEligible ? 'Apply' : 'Ineligible'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DriveCard;
