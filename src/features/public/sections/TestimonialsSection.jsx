import React from 'react';
import SectionHeading from '../components/SectionHeading';
import TestimonialCard from '../components/TestimonialCard';
import { DEMO_TESTIMONIALS } from '../data/landingData';

export const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-20 md:py-28 bg-slate-100/50 dark:bg-slate-900/30 border-y border-slate-200/80 dark:border-slate-800/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        <SectionHeading
          badge="Sample Success Stories"
          title="Empowering Student Careers Across Every Batch"
          subtitle="Illustrative success stories demonstrating how students navigate eligibility, coding assessments, and interview rounds to secure their dream offers."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {DEMO_TESTIMONIALS.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>

        <div className="text-center">
          <p className="text-xs text-slate-400 dark:text-slate-500">
            * Testimonials shown above are simulated illustrative narratives designed to demonstrate student portal feedback workflows.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
