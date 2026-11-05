import React from 'react';
import { Outlet, Link, NavLink } from 'react-router-dom';
import { GraduationCap, ArrowRight } from 'lucide-react';
import { PUBLIC_NAV_ITEMS } from '../constants/navigation';
import ThemeSwitcher from '../components/common/ThemeSwitcher';
import Button from '../components/ui/Button';
import { cn } from '../utils/cn';

export const PublicLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Public Navbar */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/80">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-[#172554] text-white shadow-md">
              <GraduationCap className="h-5 w-5" />
            </div>
            <span className="font-bold text-lg tracking-tight">
              Campus<span className="text-blue-600">Connect</span>
            </span>
          </Link>

          {/* Nav links */}
          <nav className="hidden md:flex items-center space-x-6">
            {PUBLIC_NAV_ITEMS.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    'text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400',
                    isActive ? 'text-blue-600 dark:text-blue-400 font-semibold' : 'text-slate-600 dark:text-slate-300'
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Action buttons */}
          <div className="flex items-center gap-3">
            <ThemeSwitcher />
            <Link to="/auth/login">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link to="/auth/register">
              <Button variant="primary" size="sm" rightIcon={<ArrowRight className="h-3.5 w-3.5" />}>
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 py-10 transition-colors">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-white">
              <GraduationCap className="h-4 w-4" />
            </div>
            <span className="font-bold text-sm tracking-tight text-slate-800 dark:text-slate-200">
              CampusConnect
            </span>
            <span className="text-xs text-slate-400">© 2026. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6 text-xs text-slate-500 dark:text-slate-400">
            <Link to="/about" className="hover:text-blue-600 transition-colors">About System</Link>
            <Link to="/careers" className="hover:text-blue-600 transition-colors">Careers</Link>
            <Link to="/contact" className="hover:text-blue-600 transition-colors">Contact Support</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;

