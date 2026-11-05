import React from 'react';
import { Menu, Search, Sparkles } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';
import ThemeSwitcher from '../common/ThemeSwitcher';
import NotificationMenu from './NotificationMenu';
import UserProfileMenu from './UserProfileMenu';
import { cn } from '../../utils/cn';

export const Header = ({ title, _breadcrumbItems, className }) => {
  const toggleMobileSidebar = useUIStore((state) => state.toggleMobileSidebar);
  const toggleSearchModal = useUIStore((state) => state.toggleSearchModal);

  return (
    <header
      className={cn(
        'sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white/90 px-4 sm:px-6 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/90 transition-colors',
        className
      )}
    >
      <div className="flex items-center gap-3">
        {/* Mobile sidebar toggle button */}
        <button
          type="button"
          onClick={toggleMobileSidebar}
          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 lg:hidden cursor-pointer"
          aria-label="Open sidebar navigation"
        >
          <Menu className="h-5 w-5" />
        </button>

        {title && (
          <h2 className="text-base sm:text-lg font-semibold text-slate-800 dark:text-slate-100 hidden sm:block truncate max-w-[280px]">
            {title}
          </h2>
        )}
      </div>

      {/* Center Search trigger button */}
      <div className="flex-1 max-w-md mx-4 hidden md:block">
        <button
          type="button"
          onClick={toggleSearchModal}
          className="flex h-9 w-full items-center justify-between rounded-lg border border-slate-200 bg-slate-50/80 px-3 text-xs text-slate-400 hover:border-slate-300 hover:bg-slate-100 transition-colors dark:border-slate-800 dark:bg-slate-800/40 dark:text-slate-400 cursor-pointer"
        >
          <span className="flex items-center gap-2">
            <Search className="h-3.5 w-3.5" />
            <span>Search placement drives, students, skills...</span>
          </span>
          <kbd className="hidden lg:inline-flex items-center gap-1 rounded bg-slate-200 px-1.5 py-0.5 text-[10px] font-medium text-slate-600 dark:bg-slate-700 dark:text-slate-300">
            Ctrl K
          </kbd>
        </button>
      </div>

      {/* Right Action Icons */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Mobile search trigger */}
        <button
          type="button"
          onClick={toggleSearchModal}
          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 md:hidden cursor-pointer"
          aria-label="Search"
        >
          <Search className="h-5 w-5" />
        </button>

        {/* AI Assistant Pill */}
        <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-900 text-xs font-medium">
          <Sparkles className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
          <span>AI Assistant Ready</span>
        </div>

        {/* Theme Switcher */}
        <ThemeSwitcher />

        {/* Notification Menu */}
        <NotificationMenu />

        {/* User Profile */}
        <div className="ml-1 pl-2 border-l border-slate-200 dark:border-slate-800">
          <UserProfileMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
