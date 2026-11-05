import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../utils/cn';

export const LoadingState = ({
  message = 'Loading data...',
  className,
  fullScreen = false,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center p-8 text-center',
        fullScreen ? 'fixed inset-0 z-50 bg-white/80 backdrop-blur-xs dark:bg-slate-950/80' : 'min-h-[220px]',
        className
      )}
    >
      <Loader2 className="h-8 w-8 animate-spin text-blue-600 dark:text-blue-400 mb-3" />
      <p className="text-sm font-medium text-slate-600 dark:text-slate-400">{message}</p>
    </div>
  );
};

export default LoadingState;

