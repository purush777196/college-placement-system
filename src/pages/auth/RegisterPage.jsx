import React from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  Building2,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  ShieldAlert,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

export const RegisterPage = () => {
  const roles = [
    {
      id: 'student',
      title: 'Student Candidate',
      badge: 'Candidate Portal',
      badgeVariant: 'primary',
      icon: <GraduationCap className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
      borderHover: 'hover:border-blue-500 hover:ring-1 hover:ring-blue-500',
      description:
        'For students seeking internship and full-time campus placement opportunities across verified partner companies.',
      benefits: [
        'Automated eligibility checking across active drives',
        '1-Click applications with live status tracking',
        'AI resume insights and pre-verified profile',
        'Direct interview schedules & offer notices',
      ],
      route: '/register/student',
      ctaText: 'Register as Student',
    },
    {
      id: 'recruiter',
      title: 'Corporate Recruiter',
      badge: 'Employer Portal',
      badgeVariant: 'warning',
      icon: <Building2 className="h-6 w-6 text-amber-600 dark:text-amber-400" />,
      borderHover: 'hover:border-amber-500 hover:ring-1 hover:ring-amber-500',
      description:
        'For enterprise talent partners, campus hiring leads, and technical recruitment teams.',
      benefits: [
        'Access to pre-screened, verified campus talent',
        'Publish multi-tier placement & internship drives',
        'Coordinate online assessments & interview rounds',
        'Issue digital offers with automated pipeline tracking',
      ],
      route: '/register/recruiter',
      ctaText: 'Register as Recruiter',
    },
    {
      id: 'tpo',
      title: 'Placement Officer (TPO)',
      badge: 'Institutional Governance',
      badgeVariant: 'success',
      icon: <TrendingUp className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />,
      borderHover: 'hover:border-emerald-500 hover:ring-1 hover:ring-emerald-500',
      description:
        'For university placement heads, faculty coordinators, and college placement administration.',
      benefits: [
        'Centralized drive scheduling and branch eligibility cutoffs',
        'Automated multi-department candidate verification',
        'Live placement conversion rates & package metrics',
        'One-click NIRF and NBA accreditation data export',
      ],
      route: '/register/tpo',
      ctaText: 'Register as Placement Officer',
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 py-4">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
          Create Your CampusConnect Account
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
          Select your institutional role to access the dedicated onboarding workflow and features.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {roles.map((role) => (
          <Card
            key={role.id}
            className={`flex flex-col justify-between transition-all duration-200 border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md ${role.borderHover}`}
          >
            <CardHeader className="space-y-3 pb-4">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800">
                  {role.icon}
                </div>
                <Badge variant={role.badgeVariant} className="text-[10px]">
                  {role.badge}
                </Badge>
              </div>
              <div>
                <CardTitle className="text-lg font-bold">{role.title}</CardTitle>
                <CardDescription className="text-xs mt-1 leading-relaxed">
                  {role.description}
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-3 text-xs pt-0 flex-1">
              <p className="font-semibold text-slate-700 dark:text-slate-300">Included Benefits:</p>
              <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                {role.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </CardContent>

            <CardFooter className="pt-4 border-t border-slate-100 dark:border-slate-800">
              <Link to={role.route} className="w-full">
                <Button
                  className="w-full"
                  variant={role.id === 'student' ? 'primary' : 'outline'}
                  rightIcon={<ArrowRight className="h-4 w-4" />}
                >
                  {role.ctaText}
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Administrator Policy Disclaimer */}
      <div className="rounded-xl bg-amber-50 dark:bg-amber-950/30 p-4 border border-amber-200 dark:border-amber-900/40 text-xs text-amber-800 dark:text-amber-300 flex items-start gap-3">
        <ShieldAlert className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold">Notice Regarding Administrator Access</p>
          <p className="text-[11px] leading-relaxed">
            System Administrator accounts cannot be registered publicly. Administrator privileges are
            strictly provisioned through institutional governance. To review admin capabilities,
            please sign in using the{' '}
            <Link to="/login" className="font-semibold underline hover:text-amber-900 dark:hover:text-amber-100">
              Demo Administrator account
            </Link>
            .
          </p>
        </div>
      </div>

      <div className="text-center text-xs text-slate-500">
        Already have an account?{' '}
        <Link to="/login" className="font-semibold text-blue-600 hover:underline dark:text-blue-400">
          Sign in here
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
