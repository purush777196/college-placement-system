import React from 'react';
import HeroSection from '../../features/public/sections/HeroSection';
import StatsSection from '../../features/public/sections/StatsSection';
import AboutSection from '../../features/public/sections/AboutSection';
import FeaturesSection from '../../features/public/sections/FeaturesSection';
import RoleBenefitsSection from '../../features/public/sections/RoleBenefitsSection';
import WorkflowSection from '../../features/public/sections/WorkflowSection';
import PartnersSection from '../../features/public/sections/PartnersSection';
import TestimonialsSection from '../../features/public/sections/TestimonialsSection';
import FaqSection from '../../features/public/sections/FaqSection';
import ContactSection from '../../features/public/sections/ContactSection';
import CtaSection from '../../features/public/sections/CtaSection';

export const HomePage = () => {
  return (
    <div className="flex flex-col space-y-0">
      <HeroSection />
      <StatsSection />
      <AboutSection />
      <FeaturesSection />
      <RoleBenefitsSection />
      <WorkflowSection />
      <PartnersSection />
      <TestimonialsSection />
      <FaqSection />
      <ContactSection />
      <CtaSection />
    </div>
  );
};

export default HomePage;
