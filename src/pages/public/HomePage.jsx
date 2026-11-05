import React from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  Building2,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
} from 'lucide-react';
import Button from '../../components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';

export const HomePage = () => {
  return (
    <div className="space-y-24 py-12 md:py-20">
      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-semibold text-blue-700 dark:border-blue-900/60 dark:bg-blue-950/40 dark:text-blue-300">
          <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <span>Next-Generation College Placement Ecosystem</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 max-w-4xl mx-auto leading-tight">
          Accelerating Campus Placements with{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            Intelligent Automation
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          CampusConnect bridges university placement cells, prospective talent, and industry recruiters with automated eligibility verification, AI resume scoring, and end-to-end recruitment pipelines.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link to="/auth/login">
            <Button size="lg" rightIcon={<ArrowRight className="h-4 w-4" />}>
              Explore Demo Portals
            </Button>
          </Link>
          <Link to="/about">
            <Button variant="outline" size="lg">
              Architecture & Features
            </Button>
          </Link>
        </div>

        {/* Quick Demo Access Bar */}
        <div className="pt-8">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
            Instant Demo Access Across All 4 Roles
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link to="/student/dashboard">
              <Button variant="secondary" size="sm" leftIcon={<GraduationCap className="h-4 w-4 text-blue-600" />}>
                Student Portal
              </Button>
            </Link>
            <Link to="/tpo/dashboard">
              <Button variant="secondary" size="sm" leftIcon={<TrendingUp className="h-4 w-4 text-emerald-600" />}>
                TPO Console
              </Button>
            </Link>
            <Link to="/recruiter/dashboard">
              <Button variant="secondary" size="sm" leftIcon={<Building2 className="h-4 w-4 text-amber-600" />}>
                Recruiter Hub
              </Button>
            </Link>
            <Link to="/admin/dashboard">
              <Button variant="secondary" size="sm" leftIcon={<ShieldCheck className="h-4 w-4 text-rose-600" />}>
                Admin Suite
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* KPI Highlights */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <Card className="p-6 text-center">
            <p className="text-3xl sm:text-4xl font-extrabold text-blue-600 dark:text-blue-400">82.1%</p>
            <p className="mt-1 text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">
              Placement Conversion Rate
            </p>
          </Card>
          <Card className="p-6 text-center">
            <p className="text-3xl sm:text-4xl font-extrabold text-emerald-600 dark:text-emerald-400">500+</p>
            <p className="mt-1 text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">
              Corporate Recruiters
            </p>
          </Card>
          <Card className="p-6 text-center">
            <p className="text-3xl sm:text-4xl font-extrabold text-amber-600 dark:text-amber-400">₹54 LPA</p>
            <p className="mt-1 text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">
              Highest Package Secured
            </p>
          </Card>
          <Card className="p-6 text-center">
            <p className="text-3xl sm:text-4xl font-extrabold text-indigo-600 dark:text-indigo-400">1,680+</p>
            <p className="mt-1 text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">
              Offers Rolled Out
            </p>
          </Card>
        </div>
      </section>

      {/* Role Showcase Grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
            Tailored Experiences for Every Stakeholder
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            Role-based dashboard permissions and specialized workflows designed for modern enterprise colleges.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Student */}
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="h-10 w-10 rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400 flex items-center justify-center mb-2">
                <GraduationCap className="h-5 w-5" />
              </div>
              <CardTitle>Students</CardTitle>
              <CardDescription>Opportunity Discovery</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-blue-600" /> One-click drive applications</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-blue-600" /> AI resume parsing & score</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-blue-600" /> Real-time status tracking</div>
            </CardContent>
          </Card>

          {/* TPO */}
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="h-10 w-10 rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 flex items-center justify-center mb-2">
                <TrendingUp className="h-5 w-5" />
              </div>
              <CardTitle>Placement Officers</CardTitle>
              <CardDescription>Operational Control</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Batch eligibility filters</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Comprehensive drive management</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Real-time NIRF analytics</div>
            </CardContent>
          </Card>

          {/* Recruiter */}
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="h-10 w-10 rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400 flex items-center justify-center mb-2">
                <Building2 className="h-5 w-5" />
              </div>
              <CardTitle>Corporate Recruiters</CardTitle>
              <CardDescription>High-Speed Hiring</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-amber-600" /> Talent pool search & filtering</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-amber-600" /> Interview stage manager</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-amber-600" /> Digital offer letter rollout</div>
            </CardContent>
          </Card>

          {/* Admin */}
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="h-10 w-10 rounded-xl bg-rose-100 text-rose-600 dark:bg-rose-950 dark:text-rose-400 flex items-center justify-center mb-2">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <CardTitle>Administrators</CardTitle>
              <CardDescription>System Governance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-rose-600" /> Role-based access control</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-rose-600" /> Department data audits</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-rose-600" /> Platform audit logging</div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
