import React from 'react';
import { cn } from '../../utils/cn';

export const Textarea = React.forwardRef(
  ({ className, error, helperText, rows = 4, ...props }, ref) => {
    return (
      <div className="w-full">
        <textarea
          ref={ref}
          rows={rows}
          className={cn(
            'flex w-full rounded-lg border border-slate-300 bg-white p-3 text-sm text-slate-900 transition-colors placeholder:text-slate-400',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:border-transparent',
            'disabled:cursor-not-allowed disabled:bg-slate-100 disabled:opacity-60',
            'dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus-visible:ring-blue-500',
            error && 'border-rose-500 focus-visible:ring-rose-500 dark:border-rose-500',
            className
          )}
          {...props}
        />
        {error ? (
          <p className="mt-1.5 text-xs text-rose-600 dark:text-rose-400 font-medium">{error}</p>
        ) : helperText ? (
          <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
export default Textarea;
