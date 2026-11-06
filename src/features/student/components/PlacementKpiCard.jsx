import React from 'react';
import { Card } from '../../../components/ui/Card';
import { cn } from '../../../utils/cn';

export const PlacementKpiCard = ({
  icon: Icon,
  label,
  value,
  subtext,
  badgeText,
  badgeVariant = 'primary',
  colorClass = 'text-blue-600 bg-blue-50 dark:bg-blue-950/50 dark:text-blue-400',
  className,
}) => {
  return (
    <Card className={cn('p-5 flex flex-col justify-between transition-all hover:shadow-md border-slate-200 dark:border-slate-800', className)}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {label}
        </span>
        {Icon && (
          <div className={cn('rounded-xl p-2.5', colorClass)}>
            <Icon className="h-5 w-5" />
          </div>
        )}
      </div>

      <div className="mt-3">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
            {value}
          </span>
          {badgeText && (
            <span
              className={cn(
                'inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold',
                badgeVariant === 'success' && 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300',
                badgeVariant === 'warning' && 'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300',
                badgeVariant === 'primary' && 'bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300'
              )}
            >
              {badgeText}
            </span>
          )}
        </div>
        {subtext && (
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            {subtext}
          </p>
        )}
      </div>
    </Card>
  );
};

export default PlacementKpiCard;

