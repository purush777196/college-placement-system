import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  ChevronLeft,
  GraduationCap,
  Sparkles,
  X,
} from 'lucide-react';
import { useUIStore } from '../../store/uiStore';
import { useAuth } from '../../hooks/useAuth';
import { ROLE_NAVIGATION } from '../../constants/navigation';
import { ROLE_LABELS, ROLE_COLORS } from '../../constants/roles';
import { Badge } from '../ui/Badge';
import { cn } from '../../utils/cn';

export const Sidebar = ({ role }) => {
  const isSidebarCollapsed = useUIStore((state) => state.isSidebarCollapsed);
  const toggleSidebar = useUIStore((state) => state.toggleSidebar);
  const isMobileSidebarOpen = useUIStore((state) => state.isMobileSidebarOpen);
  const setMobileSidebarOpen = useUIStore((state) => state.setMobileSidebarOpen);
  const { currentRole } = useAuth();

  const activeRole = role || currentRole;
  const navItems = ROLE_NAVIGATION[activeRole] || [];
  const roleStyles = ROLE_COLORS[activeRole] || ROLE_COLORS.student;

  const NavContent = ({ isMobile = false }) => (
    <div className="flex h-full flex-col justify-between">
      <div>
        {/* Brand Header */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-slate-200 dark:border-slate-800">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-[#172554] text-white shadow-md">
              <GraduationCap className="h-5 w-5" />
            </div>
            {(!isSidebarCollapsed || isMobile) && (
              <div className="flex flex-col">
                <span className="font-bold text-base tracking-tight text-slate-900 dark:text-slate-100">
                  Campus<span className="text-blue-600">Connect</span>
                </span>
                <span className="text-[10px] text-slate-400 font-medium">Placement Platform</span>
              </div>
            )}
          </Link>

          {isMobile && (
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(false)}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800"
              aria-label="Close mobile navigation"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Role Badge Pill */}
        {(!isSidebarCollapsed || isMobile) && (
          <div className="px-4 py-3">
            <div className="flex items-center justify-between rounded-lg bg-slate-50 dark:bg-slate-800/60 p-2.5 border border-slate-200/60 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className={cn('h-2 w-2 rounded-full', roleStyles.dot)} />
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                  {ROLE_LABELS[activeRole] || 'Portal'}
                </span>
              </div>
              <Badge variant="outline" className="text-[10px] uppercase font-bold py-0">
                {activeRole}
              </Badge>
            </div>
          </div>
        )}

        {/* Navigation Items */}
        <nav className="space-y-1 px-3 py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.href}
                to={item.href}
                onClick={() => isMobile && setMobileSidebarOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100',
                    isSidebarCollapsed && !isMobile && 'justify-center px-2'
                  )
                }
                title={isSidebarCollapsed && !isMobile ? item.label : undefined}
              >
                {Icon && <Icon className="h-5 w-5 shrink-0" />}
                {(!isSidebarCollapsed || isMobile) && (
                  <span className="flex-1 truncate">{item.label}</span>
                )}
                {(!isSidebarCollapsed || isMobile) && item.badge && (
                  <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Footer */}
      <div className="border-t border-slate-200 dark:border-slate-800 p-3">
        {(!isSidebarCollapsed || isMobile) && (
          <div className="mb-2 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 p-3 border border-blue-100 dark:from-slate-800/80 dark:to-slate-800/40 dark:border-slate-700">
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 dark:text-blue-400">
              <Sparkles className="h-3.5 w-3.5" />
              <span>CampusConnect AI</span>
            </div>
            <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
              Auto-matching profiles & drives.
            </p>
          </div>
        )}

        {!isMobile && (
          <button
            type="button"
            onClick={toggleSidebar}
            className={cn(
              'flex w-full items-center justify-center rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200 transition-colors cursor-pointer',
              isSidebarCollapsed && 'rotate-180'
            )}
            aria-label={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside
        className={cn(
          'hidden lg:flex flex-col border-r border-slate-200 bg-white transition-all duration-300 dark:border-slate-800 dark:bg-slate-900 h-screen sticky top-0 shrink-0 z-40',
          isSidebarCollapsed ? 'w-20' : 'w-64'
        )}
      >
        <NavContent />
      </aside>

      {/* Mobile Drawer Overlay & Sidebar */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileSidebarOpen(false)}
            aria-hidden="true"
          />
          <div className="fixed inset-y-0 left-0 w-72 bg-white dark:bg-slate-900 shadow-2xl border-r border-slate-200 dark:border-slate-800 z-50">
            <NavContent isMobile />
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
