import React from 'react';
import { Card } from '../../../components/ui/Card';
import { cn } from '../../../utils/cn';

const variantStyles = {
  primary: {
    iconBg: 'bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400',
    number: 'text-blue-600 dark:text-blue-400',
  },
  secondary: {
    iconBg: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400',
    number: 'text-indigo-600 dark:text-indigo-400',
  },
  navy: {
    iconBg: 'bg-[#172554]/10 text-[#172554] dark:bg-blue-900/40 dark:text-blue-300',
    number: 'text-[#172554] dark:text-blue-300',
  },
  success: {
    iconBg: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400',
    number: 'text-emerald-600 dark:text-emerald-400',
  },
};

export const StatCard = ({
  icon: Icon,
  label,
  value,
  subtext,
  variant = 'primary',
  className,
}) => {
  const styles = variantStyles[variant] || variantStyles.primary;

  return (
    <Card
      className={cn(
        'relative overflow-hidden p-6 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 border border-slate-200 dark:border-slate-800',
        className
      )}
    >
      <div className="flex items-center justify-between mb-4">
        {Icon && (
          <div className={cn('flex h-12 w-12 items-center justify-center rounded-xl', styles.iconBg)}>
            <Icon className="h-6 w-6" />
          </div>
        )}
        <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
          Sample Demo
        </span>
      </div>

      <div className="space-y-1">
        <p className={cn('text-3xl sm:text-4xl font-extrabold tracking-tight', styles.number)}>
          {value}
        </p>
        <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
          {label}
        </p>
        {subtext && (
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {subtext}
          </p>
        )}
      </div>
    </Card>
  );
};

export default StatCard;
