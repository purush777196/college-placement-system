import React from 'react';
import { Badge } from '../../../components/ui/Badge';
import { cn } from '../../../utils/cn';

export const SectionHeading = ({
  badge,
  title,
  subtitle,
  centered = true,
  className,
}) => {
  return (
    <div
      className={cn(
        'space-y-3 mb-12 sm:mb-16',
        centered ? 'text-center max-w-3xl mx-auto' : 'text-left max-w-2xl',
        className
      )}
    >
      {badge && (
        <div>
          <Badge variant="primary" className="px-3 py-1 text-xs font-semibold">
            {badge}
          </Badge>
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
