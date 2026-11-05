import React from 'react';
import { cn } from '../../../utils/cn';

export const WorkflowStep = ({
  step,
  title,
  description,
  icon: Icon,
  _isLast = false,
  className,
}) => {
  return (
    <div className={cn('relative flex flex-col items-center text-center group', className)}>
      {/* Icon Badge */}
      <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-white border-2 border-blue-600 text-blue-600 shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white dark:bg-slate-900 dark:border-blue-500 dark:text-blue-400">
        {Icon ? <Icon className="h-6 w-6" /> : <span className="font-extrabold text-lg">{step}</span>}
        <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white text-[11px] font-bold ring-2 ring-white dark:ring-slate-900">
          {step}
        </span>
      </div>

      <div className="mt-4 space-y-1.5 px-2">
        <h4 className="text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {title}
        </h4>
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs mx-auto">
          {description}
        </p>
      </div>
    </div>
  );
};

export default WorkflowStep;
