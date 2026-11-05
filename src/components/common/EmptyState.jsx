import React from 'react';
import { Inbox } from 'lucide-react';
import { cn } from '../../utils/cn';

export const EmptyState = ({
  icon: Icon = Inbox,
  title = 'No records available',
  description = 'There are no items matching your criteria at this moment.',
  action,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50/50 p-8 sm:p-12 text-center dark:border-slate-800 dark:bg-slate-900/30',
        className
      )}
    >
      <div className="rounded-2xl bg-blue-50 p-4 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400 mb-4">
        <Icon className="h-8 w-8" />
      </div>
      <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200">
        {title}
      </h3>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 max-w-sm">
        {description}
      </p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
};

export default EmptyState;

