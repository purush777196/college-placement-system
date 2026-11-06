import React from 'react';
import { cn } from '../../utils/cn';
import { Loader2 } from 'lucide-react';

export const buttonVariants = {
  primary:
    'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 shadow-sm focus-visible:ring-blue-500',
  secondary:
    'bg-slate-100 text-slate-800 hover:bg-slate-200 active:bg-slate-300 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700 focus-visible:ring-slate-400',
  outline:
    'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 active:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 focus-visible:ring-blue-500',
  ghost:
    'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100 focus-visible:ring-slate-400',
  destructive:
    'bg-rose-600 text-white hover:bg-rose-700 active:bg-rose-800 shadow-sm focus-visible:ring-rose-500',
  navy:
    'bg-[#172554] text-white hover:bg-[#1e3a8a] active:bg-[#1e40af] shadow-sm focus-visible:ring-blue-600',
};

export const buttonSizes = {
  sm: 'h-8 px-3 text-xs gap-1.5 rounded-md',
  md: 'h-10 px-4 text-sm gap-2 rounded-lg',
  lg: 'h-12 px-6 text-base gap-2.5 rounded-lg',
  icon: 'h-9 w-9 p-0 rounded-lg justify-center items-center',
};

export const Button = React.forwardRef(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      loading = false,
      disabled = false,
      children,
      type = 'button',
      leftIcon,
      rightIcon,
      ...props
    },
    ref
  ) => {
    const isBusy = isLoading || loading;
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isBusy}
        className={cn(
          'inline-flex items-center justify-center font-medium transition-colors select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
          buttonVariants[variant] || buttonVariants.primary,
          buttonSizes[size] || buttonSizes.md,
          className
        )}
        {...props}
      >
        {isBusy && <Loader2 className="h-4 w-4 animate-spin" />}
        {!isBusy && leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
        {children}
        {!isBusy && rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;

