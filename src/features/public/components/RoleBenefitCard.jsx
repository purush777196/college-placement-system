import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import Button from '../../../components/ui/Button';
import { cn } from '../../../utils/cn';

const roleColorStyles = {
  blue: {
    badge: 'primary',
    iconBg: 'bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400',
    checkColor: 'text-blue-600 dark:text-blue-400',
    ctaVariant: 'primary',
    targetRoute: '/student/dashboard',
  },
  emerald: {
    badge: 'success',
    iconBg: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400',
    checkColor: 'text-emerald-600 dark:text-emerald-400',
    ctaVariant: 'primary',
    targetRoute: '/tpo/dashboard',
  },
  amber: {
    badge: 'warning',
    iconBg: 'bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400',
    checkColor: 'text-amber-600 dark:text-amber-400',
    ctaVariant: 'primary',
    targetRoute: '/recruiter/dashboard',
  },
};

export const RoleBenefitCard = ({ _roleKey, roleData, className }) => {
  const styling = roleColorStyles[roleData.color] || roleColorStyles.blue;
  const Icon = roleData.icon;

  return (
    <Card
      className={cn(
        'flex flex-col justify-between p-6 sm:p-8 transition-all duration-300 hover:shadow-xl border border-slate-200 dark:border-slate-800',
        className
      )}
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className={cn('flex h-12 w-12 items-center justify-center rounded-2xl', styling.iconBg)}>
            {Icon && <Icon className="h-6 w-6" />}
          </div>
          <Badge variant={styling.badge} className="text-xs font-semibold px-2.5 py-0.5">
            {roleData.badge}
          </Badge>
        </div>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-1">
          {roleData.title}
        </h3>
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-6">
          {roleData.subtitle}
        </p>

        <ul className="space-y-4">
          {roleData.benefits.map((benefit, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <CheckCircle2 className={cn('h-5 w-5 shrink-0 mt-0.5', styling.checkColor)} />
              <div>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  {benefit.title}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-0.5">
                  {benefit.desc}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
        <Link to={styling.targetRoute}>
          <Button
            variant={styling.ctaVariant}
            className="w-full justify-between"
            rightIcon={<ArrowRight className="h-4 w-4" />}
          >
            Explore {roleData.title}
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default RoleBenefitCard;
