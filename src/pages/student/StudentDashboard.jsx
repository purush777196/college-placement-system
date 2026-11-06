import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Briefcase,
  Award,
  CheckCircle2,
  Clock,
  FileCheck,
  Bell,
  ArrowRight,
  TrendingUp,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { toast } from 'sonner';

import LoadingState from '../../components/common/LoadingState';
import ErrorState from '../../components/common/ErrorState';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';

import PlacementKpiCard from '../../features/student/components/PlacementKpiCard';
import ApplicationPipelineTracker from '../../features/student/components/ApplicationPipelineTracker';
import StudentProfileSummaryCard from '../../features/student/components/StudentProfileSummaryCard';
import DriveCard from '../../features/student/components/DriveCard';
import ApplyDriveDialog from '../../features/student/components/ApplyDriveDialog';
import {
  ApplicationStatusChart,
  MonthlyApplicationActivityChart,
} from '../../components/charts/StudentCharts';

import { studentsMockService } from '../../services/mock/students.mock';
import { drivesMockService } from '../../services/mock/drives.mock';
import { applicationsMockService } from '../../services/mock/applications.mock';
import { analyticsMockService } from '../../services/mock/analytics.mock';
import { useAuth } from '../../hooks/useAuth';

export const StudentDashboard = () => {
  const { user } = useAuth();

  const [dashboardData, setDashboardData] = useState(null);
  const [applications, setApplications] = useState([]);
  const [pipelineCounts, setPipelineCounts] = useState({});
  const [selectedStage, setSelectedStage] = useState('all');
  const [featuredDrives, setFeaturedDrives] = useState([]);
  const [upcomingInterviews, setUpcomingInterviews] = useState([]);
  const [analyticsData, setAnalyticsData] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  // Application inspect dialog
  const [inspectedApp, setInspectedApp] = useState(null);

  // Apply dialog state
  const [selectedDriveToApply, setSelectedDriveToApply] = useState(null);
  const [isApplying, setIsApplying] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        setLoadError(null);

        const [dashRes, appsRes, drivesRes, interviewsRes, analyticsRes] = await Promise.all([
          studentsMockService.getStudentDashboard(user?.id),
          applicationsMockService.getStudentApplications(user?.id),
          drivesMockService.getAvailableDrives({}, user),
          applicationsMockService.getUpcomingInterviews(user?.id),
          analyticsMockService.getStudentAnalytics(user?.id),
        ]);

        setDashboardData(dashRes);
        setApplications(appsRes.data);
        setPipelineCounts(appsRes.pipelineCounts);
        setFeaturedDrives(drivesRes.data.slice(0, 3));
        setUpcomingInterviews(interviewsRes.data.slice(0, 2));
        setAnalyticsData(analyticsRes);
      } catch (err) {
        setLoadError(err.message || 'Failed to load student dashboard.');
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [user]);

  const handleApplyClick = (drive) => {
    setSelectedDriveToApply(drive);
  };

  const handleConfirmApply = async (drive) => {
    try {
      setIsApplying(true);
      const res = await applicationsMockService.applyToDrive(
        drive.id,
        user?.id,
        'Applied via student dashboard',
        user
      );

      toast.success('Application Submitted!', {
        description: res.message,
      });

      // Reload applications and pipeline counts
      const appsRes = await applicationsMockService.getStudentApplications(user?.id);
      setApplications(appsRes.data);
      setPipelineCounts(appsRes.pipelineCounts);
      setSelectedDriveToApply(null);
    } catch (err) {
      toast.error('Application Failed', {
        description: err.message || 'Could not complete application submission.',
      });
    } finally {
      setIsApplying(false);
    }
  };

  if (isLoading) {
    return <LoadingState message="Loading your placement intelligence dashboard..." />;
  }

  if (loadError) {
    return (
      <ErrorState
        title="Dashboard Unavailable"
        description={loadError}
        onRetry={() => window.location.reload()}
      />
    );
  }

  const { student, academicStanding, kpis, announcements } = dashboardData || {};

  // Filter applications by pipeline stage if selected
  const filteredApps =
    selectedStage === 'all'
      ? applications
      : applications.filter(
          (a) =>
            a.currentStage.toLowerCase() === selectedStage.toLowerCase() ||
            a.status.toLowerCase().includes(selectedStage.toLowerCase())
        );

  return (
    <div className="space-y-8">
      {/* Personalized Welcome Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-[#172554] via-blue-900 to-indigo-900 p-6 sm:p-8 text-white relative overflow-hidden shadow-lg">
        {/* Subtle decorative circles */}
        <div className="absolute -top-12 -right-12 h-64 w-64 rounded-full bg-blue-500/15 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 h-64 w-64 rounded-full bg-indigo-500/20 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-200 border border-blue-400/30">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              <span>{academicStanding?.tierEligibility || 'Tier-1 & Super Dream Eligible'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome back, {student?.name || user?.name || 'Aarav'}!
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              {academicStanding?.academicYear || 'Final Year (2025-2026 Cohort)'} • {student?.department || user?.department || 'Computer Science & Engineering'} • Roll No: {student?.rollNumber || '22CS014'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <Link to="/student/drives">
              <Button
                variant="primary"
                className="bg-blue-600 hover:bg-blue-500 shadow-md"
                rightIcon={<ArrowRight className="h-4 w-4" />}
              >
                Explore Active Drives
              </Button>
            </Link>
            <Link to="/student/applications">
              <Button
                variant="outline"
                className="bg-white/10 hover:bg-white/20 text-white border-white/20"
              >
                Track Applications
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* 6 Placement KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <PlacementKpiCard
          label="Total Applications"
          value={kpis?.totalApplications || applications.length}
          subtext="Submitted drives"
          icon={Briefcase}
          badgeText="Active"
          badgeVariant="primary"
          colorClass="text-blue-600 bg-blue-50 dark:bg-blue-950/50 dark:text-blue-400"
        />

        <PlacementKpiCard
          label="Shortlisted"
          value={kpis?.applicationsShortlisted || 3}
          subtext="Cleared screening"
          icon={CheckCircle2}
          badgeText="50% rate"
          badgeVariant="success"
          colorClass="text-sky-600 bg-sky-50 dark:bg-sky-950/50 dark:text-sky-400"
        />

        <PlacementKpiCard
          label="Interviews"
          value={kpis?.interviewsScheduled || 2}
          subtext="Rounds scheduled"
          icon={Clock}
          badgeText="Next: Nov 12"
          badgeVariant="warning"
          colorClass="text-amber-600 bg-amber-50 dark:bg-amber-950/50 dark:text-amber-400"
        />

        <PlacementKpiCard
          label="Offers Received"
          value={kpis?.offersReceived || 1}
          subtext="NovaTech (₹18.5 LPA)"
          icon={Award}
          badgeText="Verified"
          badgeVariant="success"
          colorClass="text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 dark:text-emerald-400"
        />

        <PlacementKpiCard
          label="Eligible Drives"
          value={kpis?.eligiblePlacementDrives || 8}
          subtext="Matching CGPA & branch"
          icon={TrendingUp}
          badgeText="Open now"
          badgeVariant="primary"
          colorClass="text-indigo-600 bg-indigo-50 dark:bg-indigo-950/50 dark:text-indigo-400"
        />

        <PlacementKpiCard
          label="Profile Score"
          value={`${kpis?.profileCompletionPercentage || 85}%`}
          subtext="Academic transcript"
          icon={FileCheck}
          badgeText="Tier 1"
          badgeVariant="success"
          colorClass="text-purple-600 bg-purple-50 dark:bg-purple-950/50 dark:text-purple-400"
        />
      </div>

      {/* Application Pipeline Tracker Component */}
      <ApplicationPipelineTracker
        applications={filteredApps}
        pipelineCounts={pipelineCounts}
        selectedStage={selectedStage}
        onSelectStage={(stage) => setSelectedStage(stage)}
        onInspectApplication={(app) => setInspectedApp(app)}
      />

      {/* Main 2-Column Split: Charts & Profile Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ApplicationStatusChart
              data={analyticsData?.statusDistribution}
              title="Application Distribution"
              subtitle="Candidate progress across hiring stages"
            />
            <MonthlyApplicationActivityChart
              data={analyticsData?.monthlyActivity}
              title="Application Velocity"
              subtitle="Drive registrations per month"
            />
          </div>

          {/* Featured Eligible Placement Drives */}
          <Card className="border-slate-200 dark:border-slate-800">
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base font-bold flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-blue-600" />
                  Featured Eligible Placement Drives
                </CardTitle>
                <CardDescription className="text-xs">
                  Active recruitment opportunities matching your CGPA ({student?.cgpa || 8.85})
                </CardDescription>
              </div>
              <Link to="/student/drives">
                <Button variant="ghost" size="sm" rightIcon={<ChevronRight className="h-4 w-4" />}>
                  View All Drives
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-3">
              {featuredDrives.map((drive) => {
                const isAlreadyApplied = applications.some((a) => a.driveId === drive.id);
                return (
                  <DriveCard
                    key={drive.id}
                    drive={drive}
                    viewMode="list"
                    isApplied={isAlreadyApplied}
                    onApply={handleApplyClick}
                  />
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar: Profile Summary, Interviews & Announcements */}
        <div className="space-y-6">
          {/* Profile Summary Card */}
          <StudentProfileSummaryCard student={student} />

          {/* Upcoming Interviews Quick Card */}
          <Card className="border-slate-200 dark:border-slate-800 shadow-sm">
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <Clock className="h-4 w-4 text-amber-500" />
                Upcoming Interviews
              </CardTitle>
              <Link to="/student/interviews" className="text-xs text-blue-600 hover:underline font-medium">
                View all ({upcomingInterviews.length})
              </Link>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingInterviews.length === 0 ? (
                <p className="text-xs text-slate-500 text-center py-4">No upcoming interviews scheduled.</p>
              ) : (
                upcomingInterviews.map((interview) => (
                  <div
                    key={interview.id}
                    className="rounded-xl border border-slate-200 dark:border-slate-800 p-3 bg-slate-50/50 dark:bg-slate-900/50 space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs text-slate-900 dark:text-slate-100">
                        {interview.companyName}
                      </span>
                      <Badge variant="warning" className="text-[10px]">
                        {interview.status}
                      </Badge>
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 font-medium">
                      {interview.round}
                    </p>
                    <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                      <span>{new Date(interview.scheduledAt).toLocaleDateString()} at {new Date(interview.scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      <a
                        href={interview.meetingUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 dark:text-blue-400 font-semibold hover:underline flex items-center gap-1"
                      >
                        Join Link <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          {/* TPO Announcements */}
          <Card className="border-slate-200 dark:border-slate-800 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <Bell className="h-4 w-4 text-blue-600" />
                Placement Cell Announcements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              {(announcements || []).map((ann) => (
                <div
                  key={ann.id}
                  className="rounded-lg bg-slate-50 dark:bg-slate-900 p-3 border border-slate-200 dark:border-slate-800 space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-900 dark:text-slate-100">
                      {ann.title}
                    </span>
                    <Badge variant={ann.priority === 'High' ? 'danger' : 'primary'} className="text-[9px]">
                      {ann.priority}
                    </Badge>
                  </div>
                  <p className="text-[11px] text-slate-500">{ann.issuedBy}</p>
                  <p className="text-[10px] text-slate-400 pt-0.5">{ann.date}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Application Inspect Modal */}
      {inspectedApp && (
        <Modal
          isOpen={!!inspectedApp}
          onClose={() => setInspectedApp(null)}
          title={`Application Details: ${inspectedApp.companyName}`}
          description={inspectedApp.roleTitle}
          size="lg"
        >
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Current Stage</span>
                <p className="text-sm font-bold text-slate-900 dark:text-slate-100">{inspectedApp.currentStage}</p>
              </div>
              <Badge variant={inspectedApp.currentStage === 'Offered' ? 'success' : 'primary'}>
                {inspectedApp.status}
              </Badge>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Application Timeline Stages
              </h4>
              <div className="space-y-2">
                {inspectedApp.timeline?.map((step, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 text-xs p-2.5 rounded-lg border border-slate-100 dark:border-slate-800"
                  >
                    <div className="mt-0.5">
                      {step.completed ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      ) : step.current ? (
                        <Clock className="h-4 w-4 text-amber-500" />
                      ) : (
                        <div className="h-4 w-4 rounded-full border-2 border-slate-300 dark:border-slate-700" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-slate-900 dark:text-slate-100">{step.step}</span>
                        <span className="text-[10px] text-slate-400">{step.date}</span>
                      </div>
                      {step.note && <p className="text-[11px] text-slate-500 mt-0.5">{step.note}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-slate-100 dark:border-slate-800">
              <Button variant="outline" onClick={() => setInspectedApp(null)}>
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Application Confirmation Modal */}
      <ApplyDriveDialog
        isOpen={!!selectedDriveToApply}
        onClose={() => setSelectedDriveToApply(null)}
        drive={selectedDriveToApply}
        student={student}
        onConfirmApply={handleConfirmApply}
        isSubmitting={isApplying}
      />
    </div>
  );
};

export default StudentDashboard;
