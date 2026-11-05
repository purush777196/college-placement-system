import React, { useState, useEffect } from 'react';
import {
  Users,
  Briefcase,
  CalendarCheck,
  Award,
} from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import DataTable from '../../components/ui/DataTable';
import SearchBar from '../../components/ui/SearchBar';
import LoadingState from '../../components/common/LoadingState';
import Modal from '../../components/ui/Modal';
import { studentsMockService } from '../../services/mock/students.mock';
import { useAuth } from '../../hooks/useAuth';

export const RecruiterDashboard = () => {
  const { user } = useAuth();
  const [candidates, setCandidates] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadCandidates() {
      try {
        setIsLoading(true);
        const res = await studentsMockService.getStudents();
        setCandidates(res.data);
      } finally {
        setIsLoading(false);
      }
    }
    loadCandidates();
  }, []);

  const filteredCandidates = candidates.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
    c.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const candidateColumns = [
    {
      key: 'name',
      title: 'Candidate Name',
      render: (val, row) => (
        <div className="flex items-center gap-3">
          <img
            src={row.avatar}
            alt={val}
            className="h-8 w-8 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold text-slate-900 dark:text-slate-100">{val}</p>
            <p className="text-xs text-slate-500">{row.rollNumber} • {row.department}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'cgpa',
      title: 'CGPA',
      render: (val) => <span className="font-semibold">{val}</span>,
    },
    {
      key: 'skills',
      title: 'Key Competencies',
      render: (skills) => (
        <div className="flex flex-wrap gap-1 max-w-xs">
          {skills.slice(0, 3).map((skill) => (
            <span
              key={skill}
              className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300"
            >
              {skill}
            </span>
          ))}
          {skills.length > 3 && (
            <span className="text-[11px] text-slate-400">+{skills.length - 3}</span>
          )}
        </div>
      ),
    },
    {
      key: 'status',
      title: 'Status',
      render: (val) => (
        <Badge
          variant={
            val === 'Placed'
              ? 'success'
              : val.includes('Interview')
              ? 'warning'
              : 'primary'
          }
          dot
        >
          {val}
        </Badge>
      ),
    },
    {
      key: 'actions',
      title: 'Action',
      render: (_, row) => (
        <Button
          size="sm"
          variant="outline"
          onClick={() => setSelectedCandidate(row)}
        >
          Review Profile
        </Button>
      ),
    },
  ];

  if (isLoading) {
    return <LoadingState message="Loading Recruiter candidate pool..." />;
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title={`${user?.company || 'Corporate'} Talent Console`}
        subtitle="Review applicant pipelines, schedule technical rounds, and roll out verified offer letters."
        breadcrumbItems={[{ label: 'Recruiter Hub' }, { label: 'Candidate Pool' }]}
        actions={
          <Button variant="primary" size="sm" leftIcon={<CalendarCheck className="h-4 w-4" />}>
            Schedule Interview Slot
          </Button>
        }
      />

      {/* Recruiter Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase text-slate-500">Active Job Drives</span>
            <div className="rounded-lg bg-blue-100 p-2 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
              <Briefcase className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-3 text-2xl font-bold text-slate-900 dark:text-slate-100">2 Drives</p>
          <p className="mt-1 text-xs text-slate-500">Cloud Solutions & SWE</p>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase text-slate-500">Total Applicants</span>
            <div className="rounded-lg bg-indigo-100 p-2 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
              <Users className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-3 text-2xl font-bold text-slate-900 dark:text-slate-100">352</p>
          <p className="mt-1 text-xs text-indigo-600 font-medium">83 shortlisted for assessments</p>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase text-slate-500">Interviews Scheduled</span>
            <div className="rounded-lg bg-amber-100 p-2 text-amber-600 dark:bg-amber-950 dark:text-amber-400">
              <CalendarCheck className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-3 text-2xl font-bold text-slate-900 dark:text-slate-100">24 Slots</p>
          <p className="mt-1 text-xs text-slate-500">Next panel: Nov 14, 2026</p>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase text-slate-500">Offers Extended</span>
            <div className="rounded-lg bg-emerald-100 p-2 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
              <Award className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-3 text-2xl font-bold text-slate-900 dark:text-slate-100">12 Offers</p>
          <p className="mt-1 text-xs text-emerald-600 font-medium">9 accepted to date</p>
        </Card>
      </div>

      {/* Candidate Pipeline Table */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              Verified Candidate Directory
            </h3>
            <p className="text-xs text-slate-500">Filter students by branch, CGPA, or skills</p>
          </div>
          <div className="w-full sm:w-72">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search candidate name or skill..."
              size="sm"
            />
          </div>
        </div>

        <DataTable columns={candidateColumns} data={filteredCandidates} />
      </div>

      {/* Candidate Detail Modal */}
      {selectedCandidate && (
        <Modal
          isOpen={!!selectedCandidate}
          onClose={() => setSelectedCandidate(null)}
          title={`Candidate Profile: ${selectedCandidate.name}`}
          description={`${selectedCandidate.rollNumber} • ${selectedCandidate.department}`}
        >
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
              <img
                src={selectedCandidate.avatar}
                alt={selectedCandidate.name}
                className="h-16 w-16 rounded-xl object-cover"
              />
              <div>
                <h4 className="font-bold text-base text-slate-900 dark:text-slate-100">
                  {selectedCandidate.name}
                </h4>
                <p className="text-xs text-slate-500">{selectedCandidate.email}</p>
                <div className="mt-1 flex items-center gap-2">
                  <Badge variant="primary">CGPA: {selectedCandidate.cgpa}</Badge>
                  <Badge variant="success">Zero Backlogs</Badge>
                </div>
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Verified Technical Skills
              </p>
              <div className="flex flex-wrap gap-1.5">
                {selectedCandidate.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 dark:bg-blue-950 dark:text-blue-300 border border-blue-200 dark:border-blue-900"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3">
              <Button variant="outline" onClick={() => setSelectedCandidate(null)}>
                Dismiss
              </Button>
              <Button
                variant="primary"
                leftIcon={<CalendarCheck className="h-4 w-4" />}
                onClick={() => setSelectedCandidate(null)}
              >
                Schedule Technical Round
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default RecruiterDashboard;
