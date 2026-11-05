import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  GraduationCap,
  TrendingUp,
  Building2,
  ShieldCheck,
} from 'lucide-react';
import Button from '../../../components/ui/Button';
import DashboardMockup from '../components/DashboardMockup';

export const HeroSection = () => {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32">
      {/* Decorative background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-500/10 dark:bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-72 h-72 bg-indigo-500/10 dark:bg-indigo-600/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-8">
        {/* Top Innovation Pill */}
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-semibold text-blue-700 dark:border-blue-900/60 dark:bg-blue-950/40 dark:text-blue-300 shadow-xs">
          <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <span>Centralized Placement Intelligence for Modern Colleges</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 max-w-4xl mx-auto leading-[1.1]">
          Your Career Journey{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-[#172554] dark:to-blue-400">
            Starts Here.
          </span>
        </h1>

        {/* Supporting Copy */}
        <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          One intelligent platform connecting students, colleges, and recruiters to simplify every step of the placement journey.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link to="/auth/login">
            <Button
              size="lg"
              className="w-full sm:w-auto px-8 shadow-md"
              rightIcon={<ArrowRight className="h-4 w-4" />}
            >
              Explore Opportunities
            </Button>
          </Link>
          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto px-8"
            onClick={() => scrollToSection('features')}
          >
            Discover Platform
          </Button>
        </div>

        {/* Quick Role Portal Buttons */}
        <div className="pt-4">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
            Instant 1-Click Interactive Demo Access
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <Link to="/student/dashboard">
              <Button
                variant="secondary"
                size="sm"
                leftIcon={<GraduationCap className="h-4 w-4 text-blue-600" />}
              >
                Student Portal
              </Button>
            </Link>
            <Link to="/tpo/dashboard">
              <Button
                variant="secondary"
                size="sm"
                leftIcon={<TrendingUp className="h-4 w-4 text-emerald-600" />}
              >
                TPO Console
              </Button>
            </Link>
            <Link to="/recruiter/dashboard">
              <Button
                variant="secondary"
                size="sm"
                leftIcon={<Building2 className="h-4 w-4 text-amber-600" />}
              >
                Recruiter Hub
              </Button>
            </Link>
            <Link to="/admin/dashboard">
              <Button
                variant="secondary"
                size="sm"
                leftIcon={<ShieldCheck className="h-4 w-4 text-rose-600" />}
              >
                Admin Suite
              </Button>
            </Link>
          </div>
        </div>

        {/* Hero Product Mockup UI Illustration */}
        <div className="pt-8">
          <DashboardMockup />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
