import React, { useState } from 'react';
import {
  ShieldCheck,
  Users,
  Building2,
  Activity,
} from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import DataTable from '../../components/ui/DataTable';
import ConfirmDialog from '../../components/common/ConfirmDialog';

const MOCK_SYSTEM_USERS = [
  {
    id: 'USR-01',
    name: 'Dr. Ramesh Kulkarni',
    email: 'tpo.head@campus.edu',
    role: 'TPO Lead',
    status: 'Active',
    lastLogin: 'Today, 09:12 AM',
  },
  {
    id: 'USR-02',
    name: 'Priya Sundaram',
    email: 'priya.s@novatech.io',
    role: 'Corporate Recruiter',
    status: 'Verified',
    lastLogin: 'Yesterday, 04:30 PM',
  },
  {
    id: 'USR-03',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@campus.edu',
    role: 'Student Candidate',
    status: 'Active',
    lastLogin: 'Today, 11:45 AM',
  },
  {
    id: 'USR-04',
    name: 'Prof. S. N. Roy',
    email: 'snroy.cse@campus.edu',
    role: 'Department Head (CSE)',
    status: 'Active',
    lastLogin: 'Nov 02, 2026',
  },
];

export const AdminDashboard = () => {
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  const userColumns = [
    {
      key: 'name',
      title: 'User Identity',
      render: (val, row) => (
        <div>
          <p className="font-semibold text-slate-900 dark:text-slate-100">{val}</p>
          <p className="text-xs text-slate-500">{row.email}</p>
        </div>
      ),
    },
    {
      key: 'role',
      title: 'Assigned Role',
      render: (val) => <Badge variant="outline">{val}</Badge>,
    },
    {
      key: 'status',
      title: 'Status',
      render: (val) => <Badge variant="success" dot>{val}</Badge>,
    },
    {
      key: 'lastLogin',
      title: 'Last Activity',
    },
    {
      key: 'actions',
      title: 'Governance',
      render: () => (
        <Button size="sm" variant="ghost">
          Edit Permissions
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        title="System Administration & Governance"
        subtitle="Manage user access control, academic department cohorts, and security audit registries."
        breadcrumbItems={[{ label: 'Admin Portal' }, { label: 'System Overview' }]}
        actions={
          <Button
            variant="destructive"
            size="sm"
            onClick={() => setIsResetConfirmOpen(true)}
          >
            Clear Demo Cache
          </Button>
        }
      />

      {/* Admin KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase text-slate-500">Total System Users</span>
            <div className="rounded-lg bg-blue-100 p-2 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
              <Users className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-3 text-2xl font-bold text-slate-900 dark:text-slate-100">1,580</p>
          <p className="mt-1 text-xs text-slate-500">1,450 students, 120 recruiters, 10 staff</p>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase text-slate-500">RBAC Roles</span>
            <div className="rounded-lg bg-emerald-100 p-2 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
              <ShieldCheck className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-3 text-2xl font-bold text-slate-900 dark:text-slate-100">4 Scopes</p>
          <p className="mt-1 text-xs text-emerald-600 font-medium">Student, TPO, Recruiter, Admin</p>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase text-slate-500">Active College Depts</span>
            <div className="rounded-lg bg-indigo-100 p-2 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
              <Building2 className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-3 text-2xl font-bold text-slate-900 dark:text-slate-100">6 Depts</p>
          <p className="mt-1 text-xs text-slate-500">CSE, IT, ECE, EEE, MECH, CIVIL</p>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase text-slate-500">System Health</span>
            <div className="rounded-lg bg-emerald-100 p-2 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
              <Activity className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-3 text-2xl font-bold text-emerald-600 dark:text-emerald-400">100%</p>
          <p className="mt-1 text-xs text-slate-500">All services operating normally</p>
        </Card>
      </div>

      {/* User Management Table */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            System Identity & Permission Directory
          </h3>
          <p className="text-xs text-slate-500">Audited users across all four access roles</p>
        </div>

        <DataTable columns={userColumns} data={MOCK_SYSTEM_USERS} />
      </div>

      {/* Confirmation Dialog */}
      <ConfirmDialog
        isOpen={isResetConfirmOpen}
        onClose={() => setIsResetConfirmOpen(false)}
        onConfirm={() => {
          localStorage.clear();
          setIsResetConfirmOpen(false);
          window.location.reload();
        }}
        title="Reset Demo Local State?"
        description="This will clear all localStorage keys and reinitialize default demo state."
        confirmText="Reset State"
      />
    </div>
  );
};

export default AdminDashboard;
