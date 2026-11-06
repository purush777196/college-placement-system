import React from 'react';
import { Check, X } from 'lucide-react';
import { evaluatePasswordStrength } from './PasswordStrengthMeter';
import { cn } from '../../../utils/cn';

export const PasswordRequirements = ({ password = '', className }) => {
  const { criteria } = evaluatePasswordStrength(password);

  const rules = [
    { key: 'length', label: 'At least 8 characters', met: criteria.length },
    { key: 'hasUpper', label: 'At least 1 uppercase letter (A-Z)', met: criteria.hasUpper },
    { key: 'hasLower', label: 'At least 1 lowercase letter (a-z)', met: criteria.hasLower },
    { key: 'hasNumber', label: 'At least 1 number (0-9)', met: criteria.hasNumber },
    { key: 'hasSpecial', label: 'At least 1 special character (!@#$%^&*)', met: criteria.hasSpecial },
  ];

  return (
    <div className={cn('rounded-lg bg-slate-50 dark:bg-slate-900/60 p-3 border border-slate-200 dark:border-slate-800 text-xs space-y-1.5', className)}>
      <p className="font-semibold text-slate-700 dark:text-slate-300">Password requirements:</p>
      <ul className="space-y-1">
        {rules.map((rule) => (
          <li
            key={rule.key}
            className={cn(
              'flex items-center gap-2 transition-colors',
              rule.met
                ? 'text-emerald-600 dark:text-emerald-400 font-medium'
                : 'text-slate-500 dark:text-slate-400'
            )}
          >
            {rule.met ? (
              <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
            ) : (
              <X className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500 shrink-0" />
            )}
            <span>{rule.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PasswordRequirements;
