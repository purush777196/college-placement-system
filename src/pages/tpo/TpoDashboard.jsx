import React, { useState, useEffect } from 'react';
import {
  Building2,
  TrendingUp,
  Award,
  Plus,
  Download,
} from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import DataTable from '../../components/ui/DataTable';
import SearchBar from '../../components/ui/SearchBar';
import LoadingState from '../../components/common/LoadingState';
import PlacementStatsChart from '../../components/charts/PlacementStatsChart';
import PackageDistributionChart from '../../components/charts/PackageDistributionChart';
import { analyticsMockService } from '../../services/mock/analytics.mock';
import { companiesMockService } from '../../services/mock/companies.mock';

export const TpoDashboard = () => {
  const [kpis, setKpis] = useState(null);
  const [yearlyData, setYearlyData] = useState(null);
  const [packageData, setPackageData] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadTpoData() {
      try {
        setIsLoading(true);
        const [kpiRes, trendsRes, pkgRes, compsRes] = await Promise.all([
          analyticsMockService.getDashboardKPIs(),
          analyticsMockService.getYearlyTrends(),
          analyticsMockService.getSalaryDistribution(),
          companiesMockService.getCompanies(),
        ]);
        setKpis(kpiRes);
        setYearlyData(trendsRes);
        setPackageData(pkgRes);
        setCompanies(compsRes.data);
      } finally {
        setIsLoading(false);
      }
    }
    loadTpoData();
  }, []);

  const filteredCompanies = companies.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.industry.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const companyColumns = [
    {
      key: 'name',
      title: 'Company Partner',
      render: (val, row) => (
        <div>
          <p className="font-semibold text-slate-900 dark:text-slate-100">{val}</p>
          <p className="text-xs text-slate-500">{row.location}</p>
        </div>
      ),
    },
    {
      key: 'industry',
      title: 'Industry Sector',
    },
    {
      key: 'tier',
      title: 'Recruiter Tier',
      render: (val) => (
        <Badge variant={val.includes('Super') ? 'primary' : 'default'}>
          {val}
        </Badge>
      ),
    },
    {
      key: 'avgPackage',
      title: 'Avg CTC',
      render: (val) => <span className="font-semibold text-emerald-600 dark:text-emerald-400">₹{val} LPA</span>,
    },
    {
      key: 'hiredCount',
      title: 'Students Placed',
      render: (val) => <span className="font-semibold">{val}</span>,
    },
    {
      key: 'status',
      title: 'Partnership Status',
      render: (val) => <Badge variant="success" dot>{val}</Badge>,
    },
  ];

  if (isLoading) {
    return <LoadingState message="Loading Training & Placement operations console..." />;
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Training & Placement Office (TPO) Console"
        subtitle="Manage batch recruitment drives, partner corporate tiers, and institution-wide placement KPIs."
        breadcrumbItems={[{ label: 'TPO Portal' }, { label: 'Executive Dashboard' }]}
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" leftIcon={<Download className="h-4 w-4" />}>
              Export NIRF Report
            </Button>
            <Button variant="primary" size="sm" leftIcon={<Plus className="h-4 w-4" />}>
              Create New Drive
            </Button>
          </div>
        }
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase text-slate-500">Placement Rate</span>
            <div className="rounded-lg bg-emerald-100 p-2 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-3 text-2xl font-bold text-slate-900 dark:text-slate-100">
            {kpis?.placementPercentage}%
          </p>
          <p className="mt-1 text-xs text-emerald-600 font-medium">
            {kpis?.placedStudents} of {kpis?.totalStudents} students placed
          </p>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase text-slate-500">Partner Companies</span>
            <div className="rounded-lg bg-blue-100 p-2 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
              <Building2 className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-3 text-2xl font-bold text-slate-900 dark:text-slate-100">
            {kpis?.participatingCompanies}
          </p>
          <p className="mt-1 text-xs text-slate-500">Tier-1 & Core active recruiters</p>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase text-slate-500">Total Offers</span>
            <div className="rounded-lg bg-indigo-100 p-2 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
              <Award className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-3 text-2xl font-bold text-slate-900 dark:text-slate-100">
            {kpis?.totalOffers}
          </p>
          <p className="mt-1 text-xs text-slate-500">1.41 offers / placed candidate</p>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase text-slate-500">Average Package</span>
            <div className="rounded-lg bg-amber-100 p-2 text-amber-600 dark:bg-amber-950 dark:text-amber-400">
              <Award className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-3 text-2xl font-bold text-slate-900 dark:text-slate-100">
            ₹{kpis?.averagePackageLPA} LPA
          </p>
          <p className="mt-1 text-xs text-amber-600 font-medium">
            Highest: ₹{kpis?.highestPackageLPA} LPA
          </p>
        </Card>
      </div>

      {/* Analytics Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {yearlyData && <PlacementStatsChart data={yearlyData} />}
        {packageData && <PackageDistributionChart data={packageData} />}
      </div>

      {/* Corporate Partner Directory */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              Active Corporate Partners & Drives
            </h3>
            <p className="text-xs text-slate-500">Current recruiters on campus</p>
          </div>
          <div className="w-full sm:w-72">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search companies or sector..."
              size="sm"
            />
          </div>
        </div>

        <DataTable columns={companyColumns} data={filteredCompanies} />
      </div>
    </div>
  );
};

export default TpoDashboard;
