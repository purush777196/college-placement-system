import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { cn } from '../../../utils/cn';

export const FaqAccordion = ({ items = [], className }) => {
  const [openIds, setOpenIds] = useState(['faq-1']);

  const toggleItem = (id) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className={cn('space-y-3 max-w-3xl mx-auto', className)}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        return (
          <div
            key={item.id}
            className={cn(
              'rounded-xl border transition-all duration-200 overflow-hidden',
              isOpen
                ? 'border-blue-400 bg-white shadow-sm dark:border-blue-700 dark:bg-slate-900'
                : 'border-slate-200 bg-white/70 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900/60'
            )}
          >
            <button
              type="button"
              onClick={() => toggleItem(item.id)}
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${item.id}`}
              className="flex w-full items-center justify-between p-5 text-left transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-3 pr-4 text-base font-semibold text-slate-900 dark:text-slate-100">
                <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0" />
                <span>{item.question}</span>
              </span>
              <ChevronDown
                className={cn(
                  'h-5 w-5 text-slate-400 transition-transform duration-200 shrink-0',
                  isOpen && 'rotate-180 text-blue-600 dark:text-blue-400'
                )}
              />
            </button>

            {isOpen && (
              <div
                id={`faq-answer-${item.id}`}
                className="px-5 pb-5 pt-1 text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800"
              >
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default FaqAccordion;
