import React from 'react';
import { Quote, Award, CheckCircle2 } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { cn } from '../../../utils/cn';

export const TestimonialCard = ({ testimonial, className }) => {
  return (
    <Card
      className={cn(
        'relative flex flex-col justify-between p-6 sm:p-8 transition-all duration-300 hover:shadow-lg border border-slate-200 dark:border-slate-800',
        className
      )}
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <Badge variant="primary" className="text-[10px] tracking-wide uppercase">
            Verified Student Story (Demo)
          </Badge>
          <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold text-xs">
            <Award className="h-4 w-4" />
            <span>{testimonial.package}</span>
          </div>
        </div>

        <Quote className="h-8 w-8 text-blue-500/20 mb-3" />

        <p className="text-sm text-slate-700 dark:text-slate-300 italic leading-relaxed mb-6">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
      </div>

      <div className="flex items-center gap-3.5 pt-4 border-t border-slate-100 dark:border-slate-800">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="h-11 w-11 rounded-full object-cover ring-2 ring-blue-500/30"
        />
        <div className="truncate">
          <div className="flex items-center gap-1.5">
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate">
              {testimonial.name}
            </h4>
            <CheckCircle2 className="h-3.5 w-3.5 text-blue-600 shrink-0" />
          </div>
          <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
            {testimonial.role} • {testimonial.company}
          </p>
          <p className="text-[11px] text-slate-400">
            {testimonial.batch}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default TestimonialCard;
