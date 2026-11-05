import React from 'react';
import { Breadcrumb } from '../ui/Breadcrumb';
import { cn } from '../../utils/cn';

export const PageHeader = ({
  title,
  subtitle,
  breadcrumbItems,
  actions,
  badge,
  className,
}) => {
  return (
    <div className={cn('mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between', className)}>
      <div className="space-y-1">
        {breadcrumbItems && <Breadcrumb items={breadcrumbItems} className="mb-2" />}
        <div className="flex items-center gap-3">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            {title}
          </h1>
          {badge}
        </div>
        {subtitle && (
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {subtitle}
          </p>
        )}
      </div>

      {actions && (
        <div className="flex items-center gap-3 flex-wrap">
          {actions}
        </div>
      )}
    </div>
  );
};

export default PageHeader;

