import React, { useMemo } from 'react';
import { cn } from '../../../utils/cn';

/**
 * Calculates password strength score (0-4) and criteria feedback
 */
export function evaluatePasswordStrength(password = '') {
  const criteria = {
    length: password.length >= 8,
    hasUpper: /[A-Z]/.test(password),
    hasLower: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecial: /[^A-Za-z0-9]/.test(password),
  };

  const score = Object.values(criteria).filter(Boolean).length;

  let level = { label: 'Too Weak', color: 'bg-slate-300 dark:bg-slate-700', text: 'text-slate-400' };
  if (score <= 1 && password.length > 0) {
    level = { label: 'Weak', color: 'bg-rose-500', text: 'text-rose-500' };
  } else if (score === 2 || score === 3) {
    level = { label: 'Fair', color: 'bg-amber-500', text: 'text-amber-500' };
  } else if (score === 4) {
    level = { label: 'Good', color: 'bg-blue-500', text: 'text-blue-500' };
  } else if (score === 5) {
    level = { label: 'Strong', color: 'bg-emerald-500', text: 'text-emerald-500' };
  }

  return { criteria, score, level };
}

export const PasswordStrengthMeter = ({ password = '', className }) => {
  const { score, level } = useMemo(() => evaluatePasswordStrength(password), [password]);

  if (!password) return null;

  return (
    <div className={cn('space-y-1.5 pt-1', className)}>
      <div className="flex items-center justify-between text-xs">
        <span className="text-slate-500 dark:text-slate-400">Password strength:</span>
        <span className={cn('font-semibold', level.text)}>{level.label}</span>
      </div>
      <div className="grid grid-cols-4 gap-1.5 h-1.5 w-full">
        {[1, 2, 3, 4].map((step) => {
          const isFilled = score >= step + 1 || (step === 1 && score >= 1);
          return (
            <div
              key={step}
              className={cn(
                'rounded-full transition-all duration-300',
                isFilled ? level.color : 'bg-slate-200 dark:bg-slate-800'
              )}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PasswordStrengthMeter;
