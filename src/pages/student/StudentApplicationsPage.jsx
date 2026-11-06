import React, { useState, useEffect, useCallback } from 'react';
import {
  Search,
  CheckCircle2,
  Clock,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';

import PageHeader from '../../components/common/PageHeader';
import LoadingState from '../../components/common/LoadingState';
import EmptyState from '../../components/common/EmptyState';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Modal from '../../components/ui/Modal';

import { applicationsMockService, PIPELINE_STAGES } from '../../services/mock/applications.mock';
import { useAuth } from '../../hooks/useAuth';

export const StudentApplicationsPage = () => {
  const { user } = useAuth();

  const [applications, setApplications] = useState([]);
  const [pipelineCounts, setPipelineCounts] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStage, setSelectedStage] = useState('all');
  const [selectedCompany, setSelectedCompany] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Detail Modal State
  const [selectedApp, setSelectedApp] = useState(null);

  const loadApplications = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await applicationsMockService.getStudentApplications(user?.id, {
        search: searchQuery,
        stage: selectedStage,
        company: selectedCompany,
        sortBy,
      });
      setApplications(res.data);
      setPipelineCounts(res.pipelineCounts);
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, selectedStage, selectedCompany, sortBy, user?.id]);

  useEffect(() => {
    loadApplications();
  }, [loadApplications]);

  // Unique companies list for filter
  const companiesList = Array.from(
    new Set(applications.map((a) => a.companyName))
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Placement Applications"
        subtitle="Track the full timeline status, assessment evaluations, and interview invitations for your active applications."
        breadcrumbItems={[
          { label: 'Student Portal', href: '/student/dashboard' },
          { label: 'My Applications' },
        ]}
      />

      {/* Stage Pipeline Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          type="button"
          onClick={() => setSelectedStage('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer border ${
            selectedStage === 'all'
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300'
          }`}
        >
          All Applications ({pipelineCounts.all || 0})
        </button>

        {PIPELINE_STAGES.map((stage) => {
          const count = pipelineCounts[stage] || 0;
          return (
            <button
              key={stage}
              type="button"
              onClick={() => setSelectedStage(stage)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer border ${
                selectedStage === stage
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300'
              }`}
            >
              {stage} ({count})
            </button>
          );
        })}
      </div>

      {/* Search & Sort Controls */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="flex-1 max-w-md">
          <Input
            placeholder="Search application by company, role, or ID..."
            leftIcon={<Search className="h-4 w-4" />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-3">
          <Select
            className="w-44 text-xs"
            options={[
              { value: 'all', label: 'All Companies' },
              ...companiesList.map((c) => ({ value: c, label: c })),
            ]}
            value={selectedCompany}
            onChange={(e) => setSelectedCompany(e.target.value)}
          />

          <Select
            className="w-40 text-xs"
            options={[
              { value: 'newest', label: 'Newest Applied' },
              { value: 'oldest', label: 'Oldest Applied' },
            ]}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          />
        </div>
      </div>

      {/* Applications List */}
      {isLoading ? (
        <LoadingState message="Loading your placement applications..." />
      ) : applications.length === 0 ? (
        <EmptyState
          title="No Applications Found"
          description={
            selectedStage !== 'all'
              ? `No applications currently in '${selectedStage}' stage.`
              : 'You have not submitted any placement applications yet.'
          }
          actionLabel="Discover Active Drives"
          onAction={() => (window.location.href = '/student/drives')}
        />
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <Card
              key={app.id}
              className="border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-700 transition-all p-5 shadow-xs"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-mono text-slate-400">{app.id}</span>
                    <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
                      {app.roleTitle}
                    </h3>
                    <Badge
                      variant={
                        app.currentStage === 'Offered'
                          ? 'success'
                          : app.currentStage === 'Rejected'
                          ? 'danger'
                          : 'primary'
                      }
                      className="text-xs"
                    >
                      {app.currentStage}
                    </Badge>
                  </div>
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                    {app.companyName} • <span className="text-emerald-600 dark:text-emerald-400">₹{app.packageLPA} LPA</span>
                  </p>
                  <p className="text-[11px] text-slate-500">{app.roundSummary}</p>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 shrink-0">
                  <div className="text-right text-xs text-slate-400 hidden lg:block">
                    <p>Applied: {app.appliedAt}</p>
                    <p className="text-[10px]">Updated: {app.updatedAt}</p>
                  </div>

                  <Button
                    size="sm"
                    variant="outline"
                    rightIcon={<ChevronRight className="h-4 w-4" />}
                    onClick={() => setSelectedApp(app)}
                  >
                    View Timeline
                  </Button>
                </div>
              </div>

              {/* Mini Stepper Progress Preview */}
              <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-xs">
                  {app.timeline?.slice(0, 6).map((step, idx) => (
                    <div
                      key={idx}
                      className={`p-2 rounded-lg border text-center transition-colors ${
                        step.completed
                          ? 'bg-emerald-50/60 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300'
                          : step.current
                          ? 'bg-blue-50/80 dark:bg-blue-950/40 border-blue-300 dark:border-blue-700 text-blue-900 dark:text-blue-200 font-semibold'
                          : 'bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 text-slate-400'
                      }`}
                    >
                      <span className="block text-[10px] font-bold uppercase truncate">
                        {step.step}
                      </span>
                      <span className="block text-[9px] mt-0.5 truncate">{step.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Comprehensive Timeline Inspect Modal */}
      {selectedApp && (
        <Modal
          isOpen={!!selectedApp}
          onClose={() => setSelectedApp(null)}
          title={`Application Details: ${selectedApp.companyName}`}
          description={`${selectedApp.roleTitle} (ID: ${selectedApp.id})`}
          size="lg"
        >
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">Current Pipeline Stage</span>
                <p className="text-base font-extrabold text-slate-900 dark:text-slate-100">
                  {selectedApp.currentStage}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">{selectedApp.roundSummary}</p>
              </div>
              <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                ₹{selectedApp.packageLPA} LPA
              </span>
            </div>

            {/* If interview scheduled, show meeting card */}
            {selectedApp.interview && (
              <div className="rounded-xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/50 dark:bg-amber-950/30 p-3.5 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-amber-600" />
                    Scheduled Interview
                  </span>
                  <Badge variant="warning">{selectedApp.interview.status}</Badge>
                </div>
                <p className="text-amber-800 dark:text-amber-300 font-medium">{selectedApp.interview.round}</p>
                <p className="text-slate-600 dark:text-slate-400">
                  Time: {new Date(selectedApp.interview.scheduledAt).toLocaleString()} ({selectedApp.interview.durationMinutes} mins)
                </p>
                <a
                  href={selectedApp.interview.meetingUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 font-semibold hover:underline pt-1"
                >
                  Join Meeting URL <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            )}

            {/* Full Vertical Timeline */}
            <div className="space-y-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Stage-by-Stage History
              </h4>
              <div className="space-y-2">
                {selectedApp.timeline?.map((step, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3 rounded-lg border border-slate-100 dark:border-slate-800 text-xs"
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
                        <span className="font-bold text-slate-900 dark:text-slate-100">{step.step}</span>
                        <span className="text-[10px] text-slate-400">{step.date}</span>
                      </div>
                      {step.note && <p className="text-slate-500 mt-0.5 leading-relaxed">{step.note}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-100 dark:border-slate-800">
              <Button variant="outline" onClick={() => setSelectedApp(null)}>
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default StudentApplicationsPage;
