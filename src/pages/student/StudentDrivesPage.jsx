import React, { useState, useEffect, useCallback } from 'react';
import {
  Search,
  Grid,
  List,
  SlidersHorizontal,
  CheckCircle2,
  RotateCcw,
} from 'lucide-react';
import { toast } from 'sonner';

import PageHeader from '../../components/common/PageHeader';
import LoadingState from '../../components/common/LoadingState';
import EmptyState from '../../components/common/EmptyState';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Button from '../../components/ui/Button';
import DriveCard from '../../features/student/components/DriveCard';
import ApplyDriveDialog from '../../features/student/components/ApplyDriveDialog';

import { drivesMockService } from '../../services/mock/drives.mock';
import { applicationsMockService } from '../../services/mock/applications.mock';
import { useAuth } from '../../hooks/useAuth';

const DEPARTMENT_FILTER_OPTIONS = [
  { value: 'all', label: 'All Academic Departments' },
  { value: 'Computer Science & Engineering', label: 'Computer Science (CSE)' },
  { value: 'Information Technology', label: 'Information Technology (IT)' },
  { value: 'Electronics & Communication', label: 'Electronics & Communication (ECE)' },
  { value: 'Electrical & Electronics', label: 'Electrical & Electronics (EEE)' },
  { value: 'Mechanical Engineering', label: 'Mechanical Engineering' },
];

const JOB_TYPE_OPTIONS = [
  { value: 'all', label: 'All Job Types' },
  { value: 'Full-Time', label: 'Full-Time Employment' },
  { value: 'Internship', label: 'Internship + PPO' },
];

const SORT_OPTIONS = [
  { value: 'newest', label: 'Sort: Newest First' },
  { value: 'deadline', label: 'Sort: Deadline Approaching' },
  { value: 'packageHigh', label: 'Sort: Package (High to Low)' },
  { value: 'packageLow', label: 'Sort: Package (Low to High)' },
];

export const StudentDrivesPage = () => {
  const { user } = useAuth();

  const [drives, setDrives] = useState([]);
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('all');
  const [minCgpaFilter, setMinCgpaFilter] = useState('');
  const [selectedJobType, setSelectedJobType] = useState('all');
  const [selectedDeadlineStatus, setSelectedDeadlineStatus] = useState('active');
  const [onlyEligible, setOnlyEligible] = useState(false);
  const [sortBy, setSortBy] = useState('newest');

  // View state
  const [viewMode, setViewMode] = useState('grid');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Apply dialog state
  const [selectedDriveToApply, setSelectedDriveToApply] = useState(null);
  const [isApplying, setIsApplying] = useState(false);

  const loadDrivesAndApplications = useCallback(async () => {
    try {
      setIsLoading(true);
      const [drivesRes, appsRes] = await Promise.all([
        drivesMockService.getAvailableDrives(
          {
            search: searchQuery,
            department: selectedDept,
            minCGPA: minCgpaFilter,
            jobType: selectedJobType,
            deadlineStatus: selectedDeadlineStatus,
            onlyEligible,
            sortBy,
          },
          user
        ),
        applicationsMockService.getStudentApplications(user?.id),
      ]);

      setDrives(drivesRes.data);
      setApplications(appsRes.data);
    } finally {
      setIsLoading(false);
    }
  }, [
    searchQuery,
    selectedDept,
    minCgpaFilter,
    selectedJobType,
    selectedDeadlineStatus,
    onlyEligible,
    sortBy,
    user,
  ]);

  useEffect(() => {
    loadDrivesAndApplications();
  }, [loadDrivesAndApplications]);

  const handleApplyClick = (drive) => {
    setSelectedDriveToApply(drive);
  };

  const handleConfirmApply = async (drive) => {
    try {
      setIsApplying(true);
      const res = await applicationsMockService.applyToDrive(
        drive.id,
        user?.id,
        'Applied via placement drive discovery',
        user
      );

      toast.success('Application Successful', {
        description: res.message,
      });

      // Reload drives to update application state
      await loadDrivesAndApplications();
      setSelectedDriveToApply(null);
    } catch (err) {
      toast.error('Application Failed', {
        description: err.message || 'Could not complete application submission.',
      });
    } finally {
      setIsApplying(false);
    }
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedDept('all');
    setMinCgpaFilter('');
    setSelectedJobType('all');
    setSelectedDeadlineStatus('active');
    setOnlyEligible(false);
    setSortBy('newest');
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Placement Drive Discovery"
        subtitle="Explore active campus recruitment drives, review company cutoffs, and submit applications."
        breadcrumbItems={[
          { label: 'Student Portal', href: '/student/dashboard' },
          { label: 'Placement Drives' },
        ]}
        actions={
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 hidden sm:inline">
              Candidate CGPA: <strong className="text-slate-900 dark:text-slate-100">{user?.cgpa || 8.85}</strong>
            </span>
            <Button
              variant={onlyEligible ? 'primary' : 'outline'}
              size="sm"
              leftIcon={<CheckCircle2 className="h-4 w-4" />}
              onClick={() => setOnlyEligible(!onlyEligible)}
            >
              {onlyEligible ? 'Showing Eligible Only' : 'Filter Eligible'}
            </Button>
          </div>
        }
      />

      {/* Search & Top Controls Strip */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-4 shadow-xs">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="flex-1 max-w-lg">
            <Input
              placeholder="Search by company name, job title, skills, or location..."
              leftIcon={<Search className="h-4 w-4" />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Quick Controls */}
          <div className="flex items-center gap-2 flex-wrap justify-between md:justify-end">
            <Select
              className="w-48 text-xs"
              options={SORT_OPTIONS}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            />

            <Button
              variant="outline"
              size="sm"
              leftIcon={<SlidersHorizontal className="h-4 w-4" />}
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            >
              Filters
            </Button>

            {/* View Mode Toggle */}
            <div className="flex items-center rounded-lg border border-slate-200 dark:border-slate-800 p-0.5 bg-slate-50 dark:bg-slate-800">
              <button
                type="button"
                aria-label="Grid view"
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-md text-xs cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-slate-900 text-blue-600 shadow-xs'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="List view"
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-md text-xs cursor-pointer ${
                  viewMode === 'list'
                    ? 'bg-white dark:bg-slate-900 text-blue-600 shadow-xs'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Advanced Filters Expandable Drawer */}
        {showAdvancedFilters && (
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <div className="space-y-1">
              <label className="font-semibold text-slate-700 dark:text-slate-300">Department</label>
              <Select
                options={DEPARTMENT_FILTER_OPTIONS}
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700 dark:text-slate-300">Maximum Cutoff CGPA</label>
              <Input
                type="number"
                step="0.1"
                placeholder="e.g. 8.5"
                value={minCgpaFilter}
                onChange={(e) => setMinCgpaFilter(e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700 dark:text-slate-300">Job Type</label>
              <Select
                options={JOB_TYPE_OPTIONS}
                value={selectedJobType}
                onChange={(e) => setSelectedJobType(e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700 dark:text-slate-300">Registration Status</label>
              <Select
                options={[
                  { value: 'active', label: 'Active (Open Deadlines)' },
                  { value: 'expired', label: 'Expired (Past Deadlines)' },
                  { value: 'all', label: 'All Drives' },
                ]}
                value={selectedDeadlineStatus}
                onChange={(e) => setSelectedDeadlineStatus(e.target.value)}
              />
            </div>

            <div className="sm:col-span-2 lg:col-span-4 flex items-center justify-between pt-2">
              <span className="text-xs text-slate-500">
                Found {drives.length} drives matching criteria
              </span>
              <Button
                variant="ghost"
                size="sm"
                leftIcon={<RotateCcw className="h-3.5 w-3.5" />}
                onClick={handleResetFilters}
              >
                Reset All Filters
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Results View */}
      {isLoading ? (
        <LoadingState message="Discovering placement drives..." />
      ) : drives.length === 0 ? (
        <EmptyState
          title="No Placement Drives Found"
          description="Try broadening your search query or adjusting your cutoff and department filters."
          actionLabel="Reset Filters"
          onAction={handleResetFilters}
        />
      ) : (
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-3'
          }
        >
          {drives.map((drive) => {
            const isAlreadyApplied = applications.some((a) => a.driveId === drive.id);
            return (
              <DriveCard
                key={drive.id}
                drive={drive}
                viewMode={viewMode}
                isApplied={isAlreadyApplied}
                onApply={handleApplyClick}
              />
            );
          })}
        </div>
      )}

      {/* Confirmation Application Dialog */}
      <ApplyDriveDialog
        isOpen={!!selectedDriveToApply}
        onClose={() => setSelectedDriveToApply(null)}
        drive={selectedDriveToApply}
        student={user}
        onConfirmApply={handleConfirmApply}
        isSubmitting={isApplying}
      />
    </div>
  );
};

export default StudentDrivesPage;
