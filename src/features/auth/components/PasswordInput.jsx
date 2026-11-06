import React, { useState } from 'react';
import { Eye, EyeOff, Lock } from 'lucide-react';
import { cn } from '../../../utils/cn';

export const PasswordInput = React.forwardRef(
  (
    {
      className,
      error,
      helperText,
      leftIcon = <Lock className="h-4 w-4" />,
      showToggle = true,
      id,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className="w-full">
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
              {leftIcon}
            </div>
          )}
          <input
            type={showPassword ? 'text' : 'password'}
            ref={ref}
            id={id}
            className={cn(
              'flex h-10 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 transition-colors placeholder:text-slate-400',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:border-transparent',
              'disabled:cursor-not-allowed disabled:bg-slate-100 disabled:opacity-60',
              'dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus-visible:ring-blue-500',
              leftIcon && 'pl-10',
              showToggle ? 'pr-10' : 'pr-3',
              error && 'border-rose-500 focus-visible:ring-rose-500 dark:border-rose-500',
              className
            )}
            {...props}
          />
          {showToggle && (
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              tabIndex={0}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          )}
        </div>
        {error ? (
          <p className="mt-1.5 text-xs text-rose-600 dark:text-rose-400 font-medium">{error}</p>
        ) : helperText ? (
          <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;
