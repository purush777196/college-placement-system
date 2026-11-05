import React, { useState, useEffect } from 'react';
import {
  Briefcase,
  Award,
  CheckCircle2,
  Clock,
  Sparkles,
  FileCheck,
} from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import DataTable from '../../components/ui/DataTable';
import Modal from '../../components/ui/Modal';
import FileUpload from '../../components/ui/FileUpload';
import LoadingState from '../../components/common/LoadingState';
import { drivesMockService } from '../../services/mock/drives.mock';
import { applicationsMockService } from '../../services/mock/applications.mock';
import { useAuth } from '../../hooks/useAuth';

export const StudentDashboard = () => {
  const { user } = useAuth();
  const [drives, setDrives] = useState([]);
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [selectedDrive, setSelectedDrive] = useState(null);
  const [eligibilityResult, setEligibilityResult] = useState(null);

  useEffect(() => {
    async function loadStudentData() {
      try {
        setIsLoading(true);
        const [drivesRes, appsRes] = await Promise.all([
          drivesMockService.getDrives(),
          applicationsMockService.getStudentApplications(user?.id),
        ]);
        setDrives(drivesRes.data);
        setApplications(appsRes.data);
      } finally {
        setIsLoading(false);
      }
    }
    loadStudentData();
  }, [user]);

  const handleCheckEligibility = async (drive) => {
    setSelectedDrive(drive);
    const result = await drivesMockService.checkEligibility(drive.id, user?.cgpa || 8.85);
    setEligibilityResult(result);
  };

  const driveColumns = [
    {
      key: 'roleTitle',
      title: 'Drive & Role',
      render: (val, row) => (
        <div>
          <p className="font-semibold text-slate-900 dark:text-slate-100">{val}</p>
          <p className="text-xs text-slate-500">{row.companyName}</p>
        </div>
      ),
    },
    {
      key: 'packageLPA',
      title: 'CTC Package',
      render: (val) => <span className="font-semibold text-emerald-600 dark:text-emerald-400">₹{val} LPA</span>,
    },
    {
      key: 'minCGPA',
      title: 'Cutoff CGPA',
      render: (val) => `${val} CGPA`,
    },
    {
      key: 'deadline',
      title: 'Registration Deadline',
    },
    {
      key: 'status',
      title: 'Status',
      render: (val) => (
        <Badge variant={val.includes('Open') ? 'primary' : 'warning'} dot>
          {val}
        </Badge>
      ),
    },
    {
      key: 'actions',
      title: 'Action',
      render: (_, row) => (
        <Button size="sm" variant="outline" onClick={() => handleCheckEligibility(row)}>
          Check Eligibility
        </Button>
      ),
    },
  ];

  if (isLoading) {
    return <LoadingState message="Loading your placement dashboard..." />;
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title={`Welcome back, ${user?.name || 'Aarav'}!`}
        subtitle="Track active recruitment drives, AI resume ATS score, and ongoing application stages."
        breadcrumbItems={[{ label: 'Student Portal' }, { label: 'Dashboard' }]}
        actions={
          <Button
            variant="primary"
            leftIcon={<Sparkles className="h-4 w-4" />}
            onClick={() => setIsResumeModalOpen(true)}
          >
            Upload Resume for AI Score
          </Button>
        }
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase text-slate-500">Active Applications</span>
            <div className="rounded-lg bg-blue-100 p-2 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
              <Briefcase className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-3 text-2xl font-bold text-slate-900 dark:text-slate-100">
            {applications.length}
          </p>
          <p className="mt-1 text-xs text-slate-500">2 currently in interview stage</p>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase text-slate-500">Academic Standing</span>
            <div className="rounded-lg bg-emerald-100 p-2 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
              <FileCheck className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-3 text-2xl font-bold text-slate-900 dark:text-slate-100">
            {user?.cgpa || '8.85'} CGPA
          </p>
          <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
            0 active backlogs • Tier 1 eligible
          </p>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase text-slate-500">Offers Secured</span>
            <div className="rounded-lg bg-amber-100 p-2 text-amber-600 dark:bg-amber-950 dark:text-amber-400">
              <Award className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-3 text-2xl font-bold text-slate-900 dark:text-slate-100">1</p>
          <p className="mt-1 text-xs text-slate-500">NovaTech Global (18.5 LPA)</p>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase text-slate-500">AI ATS Readiness</span>
            <div className="rounded-lg bg-indigo-100 p-2 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
              <Sparkles className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-3 text-2xl font-bold text-slate-900 dark:text-slate-100">92/100</p>
          <p className="mt-1 text-xs text-indigo-600 dark:text-indigo-400 font-medium">
            High match for Cloud & Backend roles
          </p>
        </Card>
      </div>

      {/* Active Applications Pipeline */}
      <Card>
        <CardHeader>
          <CardTitle>My Placement Application Pipelines</CardTitle>
          <CardDescription>Real-time progress stages for registered campus drives</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {applications.map((app) => (
              <div
                key={app.id}
                className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 transition-colors hover:border-blue-300 dark:hover:border-blue-900"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-slate-100">
                      {app.roleTitle}
                    </h4>
                    <p className="text-xs text-slate-500">{app.companyName} • ₹{app.packageLPA} LPA</p>
                  </div>
                  <Badge variant={app.badgeVariant === 'success' ? 'success' : 'primary'} dot>
                    {app.status}
                  </Badge>
                </div>

                {/* Stepper Timeline */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                  {app.timeline.map((step, idx) => (
                    <div key={idx} className="flex flex-col text-xs">
                      <div className="flex items-center gap-1.5 mb-1">
                        {step.completed ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        ) : step.current ? (
                          <Clock className="h-4 w-4 text-blue-600 animate-pulse shrink-0" />
                        ) : (
                          <span className="h-4 w-4 rounded-full border border-slate-300 dark:border-slate-700 shrink-0" />
                        )}
                        <span className={`font-medium truncate ${step.current ? 'text-blue-600 dark:text-blue-400 font-semibold' : 'text-slate-600 dark:text-slate-300'}`}>
                          {step.step}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400">{step.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Eligible Campus Drives */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              Active & Upcoming Placement Drives
            </h3>
            <p className="text-xs text-slate-500">Explore openings and verify instant eligibility</p>
          </div>
        </div>
        <DataTable columns={driveColumns} data={drives} />
      </div>

      {/* Check Eligibility Modal */}
      {selectedDrive && (
        <Modal
          isOpen={!!selectedDrive}
          onClose={() => {
            setSelectedDrive(null);
            setEligibilityResult(null);
          }}
          title={`Eligibility Check: ${selectedDrive.companyName}`}
          description={selectedDrive.roleTitle}
        >
          <div className="space-y-4">
            <div className="rounded-xl bg-slate-50 dark:bg-slate-800/60 p-4 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Offered CTC:</span>
                <span className="font-semibold text-emerald-600">₹{selectedDrive.packageLPA} LPA</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Minimum CGPA Required:</span>
                <span className="font-semibold">{selectedDrive.minCGPA}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Your Current CGPA:</span>
                <span className="font-semibold text-blue-600">{user?.cgpa || '8.85'}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Allowed Branches:</span>
                <span className="font-semibold">{selectedDrive.allowedBranches.join(', ')}</span>
              </div>
            </div>

            {eligibilityResult && (
              <div
                className={`p-3.5 rounded-xl border text-xs font-medium flex items-start gap-2.5 ${
                  eligibilityResult.eligible
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800'
                    : 'bg-rose-50 text-rose-800 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800'
                }`}
              >
                {eligibilityResult.eligible ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <Clock className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
                )}
                <div>
                  <p className="font-semibold">{eligibilityResult.eligible ? 'You are Eligible!' : 'Ineligible'}</p>
                  <p className="mt-0.5 text-[11px] opacity-90">{eligibilityResult.reason}</p>
                </div>
              </div>
            )}

            <div className="flex justify-end gap-3 pt-2">
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedDrive(null);
                  setEligibilityResult(null);
                }}
              >
                Close
              </Button>
              {eligibilityResult?.eligible && (
                <Button variant="primary">
                  Submit Application (Demo)
                </Button>
              )}
            </div>
          </div>
        </Modal>
      )}

      {/* Resume Upload Modal */}
      <Modal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
        title="AI Resume Scanner & ATS Scorer"
        description="Upload your latest resume in PDF format for deep semantic skill parsing and match analytics."
      >
        <div className="space-y-4">
          <FileUpload helperText="PDF format recommended (max 5MB)" />
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" onClick={() => setIsResumeModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              leftIcon={<Sparkles className="h-4 w-4" />}
              onClick={() => setIsResumeModalOpen(false)}
            >
              Scan with AI
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default StudentDashboard;
