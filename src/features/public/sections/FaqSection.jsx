import React from 'react';
import SectionHeading from '../components/SectionHeading';
import FaqAccordion from '../components/FaqAccordion';
import { FAQS } from '../data/landingData';

export const FaqSection = () => {
  return (
    <section id="faq" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        <SectionHeading
          badge="Frequently Asked Questions"
          title="Everything You Need to Know About CampusConnect"
          subtitle="Answers to common questions regarding student applications, recruiter management, algorithmic eligibility, and institutional reporting."
        />

        <FaqAccordion items={FAQS} />
      </div>
    </section>
  );
};

export default FaqSection;
