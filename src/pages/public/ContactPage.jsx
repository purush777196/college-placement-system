import React from 'react';
import ContactSection from '../../features/public/sections/ContactSection';
import FaqSection from '../../features/public/sections/FaqSection';

export const ContactPage = () => {
  return (
    <div className="py-8">
      <ContactSection />
      <FaqSection />
    </div>
  );
};

export default ContactPage;
