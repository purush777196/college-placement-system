import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { GraduationCap, ShieldCheck, Sparkles, Building2 } from 'lucide-react';
import ThemeSwitcher from '../components/common/ThemeSwitcher';

export const AuthLayout = () => {
  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Left Feature Showcase Banner (Desktop) */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between bg-gradient-to-br from-[#172554] via-blue-900 to-blue-800 p-12 text-white relative overflow-hidden">
        {/* Subtle decorative circles */}
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-blue-900 shadow-md">
              <GraduationCap className="h-6 w-6" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white">
              CampusConnect
            </span>
          </Link>
        </div>

        <div className="relative z-10 space-y-6 max-w-lg">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-200 border border-blue-400/30">
            <Sparkles className="h-3.5 w-3.5 text-blue-300" />
            <span>AI-Driven Placement Intelligence</span>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight leading-tight">
            Streamlining campus recruitment with precision AI matching.
          </h1>

          <p className="text-slate-300 text-sm leading-relaxed">
            CampusConnect unifies Students, Training & Placement Officers, Corporate Recruiters, and Academic Administrators into one seamless, high-velocity hiring ecosystem.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-blue-700/50">
            <div className="flex items-start gap-3">
              <ShieldCheck className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-white">Verified Credentials</p>
                <p className="text-[11px] text-slate-300">Automated academic verification</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Building2 className="h-5 w-5 text-blue-300 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-white">500+ Partner Companies</p>
                <p className="text-[11px] text-slate-300">Tier-1 & Dream recruiters</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-between text-xs text-blue-200">
          <span>Enterprise Placement Infrastructure</span>
          <span>Phase 0: Foundation</span>
        </div>
      </div>

      {/* Right Content Area */}
      <div className="flex flex-1 flex-col justify-between p-6 sm:p-12 lg:w-1/2">
        <div className="flex justify-between items-center">
          <Link to="/" className="lg:hidden flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
              <GraduationCap className="h-5 w-5" />
            </div>
            <span className="font-bold text-base text-slate-900 dark:text-slate-100">
              CampusConnect
            </span>
          </Link>
          <div className="ml-auto">
            <ThemeSwitcher />
          </div>
        </div>

        <div className="mx-auto w-full max-w-md my-auto py-8">
          <Outlet />
        </div>

        <div className="text-center text-xs text-slate-400">
          CampusConnect Demo Environment • No real credentials stored
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
