import React from 'react';
import { Card } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { cn } from '../../../utils/cn';

export const FeatureCard = ({
  icon: Icon,
  title,
  description,
  tag,
  isPlanned = false,
  className,
}) => {
  return (
    <Card
      className={cn(
        'group relative flex flex-col justify-between p-6 transition-all duration-300 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-800',
        className
      )}
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          {Icon && (
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white dark:bg-blue-950/60 dark:text-blue-400 dark:group-hover:bg-blue-600 dark:group-hover:text-white">
              <Icon className="h-5 w-5" />
            </div>
          )}
          {tag && (
            <Badge
              variant={isPlanned ? 'warning' : 'outline'}
              className="text-[11px] font-semibold"
            >
              {tag}
            </Badge>
          )}
        </div>

        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {title}
        </h3>

        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          {description}
        </p>
      </div>

      {isPlanned && (
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
          <p className="text-[11px] font-medium text-amber-600 dark:text-amber-400">
            * Planned feature for upcoming release
          </p>
        </div>
      )}
    </Card>
  );
};

export default FeatureCard;
