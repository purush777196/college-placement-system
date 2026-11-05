import React, { useState, useEffect } from 'react';
import { Outlet, Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  ArrowRight,
  Menu,
  X,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Twitter,
} from 'lucide-react';
import { PUBLIC_NAV_ITEMS } from '../constants/navigation';
import ThemeSwitcher from '../components/common/ThemeSwitcher';
import Button from '../components/ui/Button';
import { cn } from '../utils/cn';

export const PublicLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Handle smooth scroll when navigating to hash anchors
  useEffect(() => {
    if (location.hash) {
      const elementId = location.hash.replace('#', '');
      const el = document.getElementById(elementId);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  // Close mobile drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  const handleNavClick = (item) => {
    setIsMobileMenuOpen(false);
    if (item.isAnchor) {
      const hash = item.href.replace('/', '');
      if (location.pathname === '/') {
        const el = document.getElementById(hash.replace('#', ''));
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        navigate(`/${hash}`);
      }
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Sticky Public Navigation Bar */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/90 transition-colors">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo & Brand Identity */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-[#172554] text-white shadow-md transition-transform group-hover:scale-105">
              <GraduationCap className="h-5 w-5" />
            </div>
            <span className="font-bold text-lg tracking-tight">
              Campus<span className="text-blue-600">Connect</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-7" aria-label="Main Navigation">
            {PUBLIC_NAV_ITEMS.map((item) => {
              if (item.isAnchor) {
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => {
                      if (location.pathname === '/') {
                        e.preventDefault();
                        handleNavClick(item);
                      }
                    }}
                    className="text-sm font-medium text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors"
                  >
                    {item.label}
                  </a>
                );
              }

              return (
                <NavLink
                  key={item.label}
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
              );
            })}
          </nav>

          {/* Desktop Right CTAs & Theme Toggle */}
          <div className="hidden sm:flex items-center gap-3">
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

          {/* Mobile Hamburger & Theme Toggle Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeSwitcher />
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle navigation menu"
              className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 px-4 pt-3 pb-6 space-y-4 shadow-xl">
            <nav className="flex flex-col space-y-2">
              {PUBLIC_NAV_ITEMS.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => handleNavClick(item)}
                  className="flex items-center justify-between p-2 rounded-lg text-left text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <span>{item.label}</span>
                  <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
                </button>
              ))}
            </nav>

            <div className="flex flex-col gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <Link to="/auth/login" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full justify-center">
                  Sign In
                </Button>
              </Link>
              <Link to="/auth/register" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="primary" className="w-full justify-center" rightIcon={<ArrowRight className="h-4 w-4" />}>
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Comprehensive Public Footer */}
      <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 py-16 transition-colors">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Information */}
            <div className="space-y-4">
              <Link to="/" className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-slate-100">
                  Campus<span className="text-blue-600">Connect</span>
                </span>
              </Link>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Centralized placement management platform connecting students, university placement offices, and corporate recruiters to streamline recruitment workflows.
              </p>
              <div className="flex items-center gap-3 text-slate-400">
                <a href="#github" aria-label="GitHub Repository" className="hover:text-blue-600 transition-colors">
                  <Github className="h-4 w-4" />
                </a>
                <a href="#linkedin" aria-label="LinkedIn" className="hover:text-blue-600 transition-colors">
                  <Linkedin className="h-4 w-4" />
                </a>
                <a href="#twitter" aria-label="Twitter / X" className="hover:text-blue-600 transition-colors">
                  <Twitter className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Platform Links */}
            <div className="space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
                Platform Links
              </p>
              <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
                <li><Link to="/" className="hover:text-blue-600 transition-colors">Home Landing Page</Link></li>
                <li><Link to="/about" className="hover:text-blue-600 transition-colors">About CampusConnect</Link></li>
                <li><Link to="/features" className="hover:text-blue-600 transition-colors">Platform Features Suite</Link></li>
                <li><Link to="/careers" className="hover:text-blue-600 transition-colors">Careers at CampusConnect</Link></li>
                <li><Link to="/faq" className="hover:text-blue-600 transition-colors">Frequently Asked Questions</Link></li>
                <li><Link to="/contact" className="hover:text-blue-600 transition-colors">Contact Relations Desk</Link></li>
              </ul>
            </div>

            {/* Role Portals Demo */}
            <div className="space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
                Demo Portals
              </p>
              <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
                <li><Link to="/student/dashboard" className="hover:text-blue-600 transition-colors">Student Candidate Portal</Link></li>
                <li><Link to="/tpo/dashboard" className="hover:text-blue-600 transition-colors">Training & Placement Console</Link></li>
                <li><Link to="/recruiter/dashboard" className="hover:text-blue-600 transition-colors">Corporate Recruiter Hub</Link></li>
                <li><Link to="/admin/dashboard" className="hover:text-blue-600 transition-colors">System Admin Console</Link></li>
                <li><Link to="/auth/login" className="hover:text-blue-600 transition-colors">Role Switcher Access</Link></li>
              </ul>
            </div>

            {/* Institutional Support Contact */}
            <div className="space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
                Institutional Desk
              </p>
              <div className="space-y-2.5 text-xs text-slate-500 dark:text-slate-400">
                <p className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-blue-600 shrink-0" />
                  <span>partners@campusconnect.edu</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>+91 (80) 4122-8900</span>
                </p>
                <p className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span>Tech Park, Electronic City, Bengaluru, India</span>
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
            <p>© 2026 CampusConnect. All rights reserved. Enterprise Placement System.</p>
            <div className="flex items-center gap-6">
              <Link to="/privacy" className="hover:text-blue-600 transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-blue-600 transition-colors">Terms of Service</Link>
              <span className="text-[11px] text-slate-400">Phase 1 Public Release</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
