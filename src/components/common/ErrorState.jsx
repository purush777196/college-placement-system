import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import Button from '../ui/Button';
import { cn } from '../../utils/cn';

export const ErrorState = ({
  title = 'Something went wrong',
  description = 'An error occurred while loading this section. Please try again.',
  onRetry,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-2xl border border-rose-200 bg-rose-50/50 p-8 text-center dark:border-rose-900/50 dark:bg-rose-950/20',
        className
      )}
    >
      <div className="rounded-2xl bg-rose-100 p-4 text-rose-600 dark:bg-rose-900/40 dark:text-rose-400 mb-4">
        <AlertTriangle className="h-8 w-8" />
      </div>
      <h3 className="text-base font-semibold text-rose-900 dark:text-rose-200">
        {title}
      </h3>
      <p className="mt-1 text-sm text-rose-700 dark:text-rose-400 max-w-sm">
        {description}
      </p>
      {onRetry && (
        <div className="mt-5">
          <Button
            variant="destructive"
            size="sm"
            onClick={onRetry}
            leftIcon={<RefreshCw className="h-3.5 w-3.5" />}
          >
            Retry
          </Button>
        </div>
      )}
    </div>
  );
};

export default ErrorState;

