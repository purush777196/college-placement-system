import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  MapPin,
  Calendar,
  Users,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Briefcase,
  Layers,
  Award,
  HelpCircle,
} from 'lucide-react';
import { toast } from 'sonner';

import LoadingState from '../../components/common/LoadingState';
import ErrorState from '../../components/common/ErrorState';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import ApplyDriveDialog from '../../features/student/components/ApplyDriveDialog';

import { drivesMockService } from '../../services/mock/drives.mock';
import { applicationsMockService } from '../../services/mock/applications.mock';
import { useAuth } from '../../hooks/useAuth';

export const StudentDriveDetailPage = () => {
  const { driveId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [drive, setDrive] = useState(null);
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isApplying, setIsApplying] = useState(false);

  useEffect(() => {
    async function loadDrive() {
      try {
        setIsLoading(true);
        setLoadError(null);

        const [driveDetails, appsRes] = await Promise.all([
          drivesMockService.getDriveDetails(driveId, user),
          applicationsMockService.getStudentApplications(user?.id),
        ]);

        setDrive(driveDetails);
        setApplications(appsRes.data);
      } catch (err) {
        setLoadError(err.message || 'Drive details not found.');
      } finally {
        setIsLoading(false);
      }
    }
    loadDrive();
  }, [driveId, user]);

  const isAlreadyApplied = applications.some((a) => a.driveId === driveId);
  const isExpired = drive?.isExpired || drive?.status === 'Deadline Expired';
  const isEligible = drive?.isEligible && !isExpired;

  const handleConfirmApply = async () => {
    try {
      setIsApplying(true);
      const res = await applicationsMockService.applyToDrive(
        drive.id,
        user?.id,
        'Applied via Drive Details page',
        user
      );

      toast.success('Application Submitted Successfully!', {
        description: res.message,
      });

      // Reload applications to reflect new status
      const updatedApps = await applicationsMockService.getStudentApplications(user?.id);
      setApplications(updatedApps.data);
      setIsApplyModalOpen(false);
    } catch (err) {
      toast.error('Application Blocked', {
        description: err.message || 'Failed to submit application.',
      });
    } finally {
      setIsApplying(false);
    }
  };

  if (isLoading) {
    return <LoadingState message="Loading placement drive specification..." />;
  }

  if (loadError || !drive) {
    return (
      <ErrorState
        title="Placement Drive Not Found"
        description={loadError || 'The requested placement drive does not exist.'}
        onRetry={() => navigate('/student/drives')}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Breadcrumb & Return Action */}
      <div className="flex items-center justify-between">
        <Link
          to="/student/drives"
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 font-medium transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to All Drives
        </Link>
        <span className="text-xs text-slate-400">ID: {drive.id}</span>
      </div>

      {/* Hero Overview Header */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <img
              src={drive.companyLogo}
              alt={drive.companyName}
              className="h-16 w-16 rounded-2xl object-cover border border-slate-200 dark:border-slate-800 shrink-0"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                  {drive.roleTitle}
                </h1>
                {isAlreadyApplied ? (
                  <Badge variant="primary">Applied</Badge>
                ) : isExpired ? (
                  <Badge variant="secondary">Expired</Badge>
                ) : isEligible ? (
                  <Badge variant="success" className="inline-flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" /> Eligible Candidate
                  </Badge>
                ) : (
                  <Badge variant="danger" className="inline-flex items-center gap-1">
                    <XCircle className="h-3 w-3" /> Ineligible
                  </Badge>
                )}
              </div>
              <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                {drive.companyName}
              </p>
              <div className="flex items-center gap-4 text-xs text-slate-500 pt-1 flex-wrap">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" /> {drive.location}
                </span>
                <span className="flex items-center gap-1">
                  <Briefcase className="h-3.5 w-3.5" /> {drive.jobType || 'Full-Time'}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-3.5 w-3.5" /> {drive.vacancies} Openings
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 text-amber-500" /> Deadline: {drive.deadline}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:items-end justify-between gap-3 shrink-0">
            <div>
              <span className="text-xs text-slate-400 block md:text-right uppercase font-semibold">
                Annual Compensation (CTC)
              </span>
              <span className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
                ₹{drive.packageLPA} LPA
              </span>
            </div>

            <Button
              size="lg"
              variant={isEligible && !isAlreadyApplied ? 'primary' : 'secondary'}
              disabled={!isEligible || isAlreadyApplied || isExpired}
              onClick={() => setIsApplyModalOpen(true)}
              rightIcon={<ArrowRight className="h-4 w-4" />}
            >
              {isAlreadyApplied
                ? 'Application Submitted'
                : isExpired
                ? 'Registration Closed'
                : isEligible
                ? 'Apply for this Drive'
                : 'Ineligible for this Drive'}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2-Columns: Job Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* About Company & Job Description */}
          <Card className="border-slate-200 dark:border-slate-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-bold">Role Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
              <p>{drive.jobDescription}</p>
              <div className="pt-2">
                <h4 className="font-semibold text-slate-900 dark:text-slate-100 text-xs mb-2">
                  Key Responsibilities:
                </h4>
                <ul className="space-y-1.5 list-disc pl-4 text-slate-600 dark:text-slate-400">
                  {drive.responsibilities?.map((resp, i) => (
                    <li key={i}>{resp}</li>
                  ))}
                </ul>
              </div>

              <div className="pt-2">
                <h4 className="font-semibold text-slate-900 dark:text-slate-100 text-xs mb-2">
                  Required Technical Skills & Competencies:
                </h4>
                <div className="flex flex-wrap gap-2 pt-1">
                  {drive.requiredSkills?.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 px-2.5 py-1 text-xs font-semibold border border-blue-200 dark:border-blue-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Selection Process Stages */}
          <Card className="border-slate-200 dark:border-slate-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <Layers className="h-5 w-5 text-blue-600" />
                Hiring & Selection Workflow
              </CardTitle>
              <CardDescription className="text-xs">
                Multi-round technical and managerial evaluation process
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {drive.selectionProcess?.map((round) => (
                <div
                  key={round.roundNumber}
                  className="rounded-xl border border-slate-200 dark:border-slate-800 p-3.5 flex items-start gap-3 bg-slate-50/50 dark:bg-slate-900/40"
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-white text-xs font-bold shrink-0">
                    {round.roundNumber}
                  </div>
                  <div className="text-xs space-y-0.5">
                    <p className="font-bold text-slate-900 dark:text-slate-100">{round.name}</p>
                    <p className="text-slate-500">{round.format}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Compensation Breakdown */}
          {drive.compensationDetails && (
            <Card className="border-slate-200 dark:border-slate-800">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-bold flex items-center gap-2">
                  <Award className="h-5 w-5 text-emerald-600" />
                  Compensation & Benefits Package
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">Fixed Base Salary</span>
                    <p className="text-base font-bold text-slate-900 dark:text-slate-100 mt-0.5">
                      {drive.compensationDetails.baseSalary}
                    </p>
                  </div>
                  {drive.compensationDetails.performanceBonus && (
                    <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <span className="text-[10px] text-slate-400 uppercase font-semibold">Performance Component</span>
                      <p className="text-base font-bold text-slate-900 dark:text-slate-100 mt-0.5">
                        {drive.compensationDetails.performanceBonus}
                      </p>
                    </div>
                  )}
                </div>
                {drive.compensationDetails.stockGrants && (
                  <p className="text-slate-500">
                    <strong>Equity Grants:</strong> {drive.compensationDetails.stockGrants}
                  </p>
                )}
                {drive.compensationDetails.healthBenefits && (
                  <p className="text-slate-500">
                    <strong>Health Coverage:</strong> {drive.compensationDetails.healthBenefits}
                  </p>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column: Eligibility, Timeline & Instructions */}
        <div className="space-y-6">
          {/* Eligibility Card */}
          <Card className="border-slate-200 dark:border-slate-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-blue-600" />
                Candidate Eligibility
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="text-slate-600 dark:text-slate-400">Minimum CGPA Cutoff:</span>
                <span className="font-bold text-slate-900 dark:text-slate-100">{drive.minCGPA} CGPA</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="text-slate-600 dark:text-slate-400">Your CGPA:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                  {user?.cgpa || 8.85} CGPA
                </span>
              </div>

              <div className="space-y-1.5 pt-1">
                <span className="text-slate-500 font-semibold text-[11px]">Eligible Branches:</span>
                <div className="flex flex-wrap gap-1.5">
                  {drive.allowedBranches?.map((branch) => (
                    <span
                      key={branch}
                      className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px]"
                    >
                      {branch}
                    </span>
                  ))}
                </div>
              </div>

              {drive.eligibilityNotes && (
                <p className="text-[11px] text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800">
                  {drive.eligibilityNotes}
                </p>
              )}
            </CardContent>
          </Card>

          {/* Important Dates */}
          <Card className="border-slate-200 dark:border-slate-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <Calendar className="h-5 w-5 text-amber-500" />
                Important Timeline Dates
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Registration Deadline:</span>
                <span className="font-bold text-rose-600 dark:text-rose-400">{drive.deadline}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Drive Evaluation Date:</span>
                <span className="font-semibold text-slate-900 dark:text-slate-100">{drive.driveDate}</span>
              </div>
            </CardContent>
          </Card>

          {/* Application Instructions */}
          {drive.applicationInstructions && (
            <Card className="border-slate-200 dark:border-slate-800 bg-blue-50/40 dark:bg-blue-950/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-bold text-blue-900 dark:text-blue-300 flex items-center gap-1.5">
                  <HelpCircle className="h-4 w-4 text-blue-600" />
                  Application Instructions
                </CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-blue-800 dark:text-blue-300 leading-relaxed">
                {drive.applicationInstructions}
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      <ApplyDriveDialog
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        drive={drive}
        student={user}
        onConfirmApply={handleConfirmApply}
        isSubmitting={isApplying}
      />
    </div>
  );
};

export default StudentDriveDetailPage;
