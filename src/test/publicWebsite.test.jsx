import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout';
import HomePage from '../pages/public/HomePage';
import AboutPage from '../pages/public/AboutPage';
import FeaturesPage from '../pages/public/FeaturesPage';
import ContactPage from '../pages/public/ContactPage';
import FaqPage from '../pages/public/FaqPage';
import PrivacyPage from '../pages/public/PrivacyPage';
import TermsPage from '../pages/public/TermsPage';
import { HeroSection } from '../features/public/sections/HeroSection';
import { FeaturesSection } from '../features/public/sections/FeaturesSection';
import { RoleBenefitsSection } from '../features/public/sections/RoleBenefitsSection';
import { FaqSection } from '../features/public/sections/FaqSection';
import { ContactSection } from '../features/public/sections/ContactSection';
import { PLATFORM_FEATURES, FAQS } from '../features/public/data/landingData';

describe('Phase 1: Public Website & Landing Pages Suite', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Landing Page Rendering', () => {
    it('renders the complete landing page with all hero and section elements', () => {
      render(
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      );

      // Hero Headline
      expect(screen.getByText(/Your Career Journey/i)).toBeInTheDocument();
      expect(screen.getByText(/Starts Here/i)).toBeInTheDocument();

      // CTAs
      expect(screen.getByRole('button', { name: /Explore Opportunities/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Discover Platform/i })).toBeInTheDocument();

      // Stats
      expect(screen.getByText(/1,450\+/i)).toBeInTheDocument();
      expect(screen.getByText(/112\+/i)).toBeInTheDocument();
      expect(screen.getByText(/82.1%/i)).toBeInTheDocument();

      // Problem & Solution
      expect(screen.getByText(/Bridging Higher Education and Industry Recruitment/i)).toBeInTheDocument();
      expect(screen.getByText(/The Fragmented Placement Challenge/i)).toBeInTheDocument();
      expect(screen.getByText(/The CampusConnect Platform Advantage/i)).toBeInTheDocument();

      // Features Header
      expect(screen.getByText(/Engineered for the Entire Recruitment Lifecycle/i)).toBeInTheDocument();

      // Workflow Header
      expect(screen.getByText(/How CampusConnect Works/i)).toBeInTheDocument();

      // Partners Header
      expect(screen.getByText(/Sample Industry Partners/i)).toBeInTheDocument();

      // Testimonials Header
      expect(screen.getByText(/Sample Success Stories/i)).toBeInTheDocument();

      // FAQ Header
      expect(screen.getByText(/Everything You Need to Know About CampusConnect/i)).toBeInTheDocument();

      // Contact Header
      expect(screen.getByText(/Connect with Our Campus Relations Team/i)).toBeInTheDocument();
    });
  });

  describe('Hero Section & Interactive Mockup', () => {
    it('renders hero CTAs and mock dashboard preview', () => {
      render(
        <MemoryRouter>
          <HeroSection />
        </MemoryRouter>
      );

      expect(screen.getByText(/One intelligent platform connecting students, colleges, and recruiters/i)).toBeInTheDocument();
      expect(screen.getByText(/Aarav Sharma/i)).toBeInTheDocument();
      expect(screen.getByText(/Algorithmic Match/i)).toBeInTheDocument();
      expect(screen.getByText(/94%/i)).toBeInTheDocument();
      expect(screen.getByText(/Apex Cloud Systems/i)).toBeInTheDocument();
    });
  });

  describe('Platform Features Section', () => {
    it('renders all 10 core placement features with titles and descriptions', () => {
      render(<FeaturesSection />);

      PLATFORM_FEATURES.forEach((feature) => {
        expect(screen.getByText(feature.title)).toBeInTheDocument();
      });

      // Planned feature indicator for AI career insights
      expect(screen.getByText(/\* Planned feature for upcoming release/i)).toBeInTheDocument();
    });
  });

  describe('Role-Based Platform Benefits', () => {
    it('renders benefits for Students, TPOs, and Recruiters with role filter tabs', () => {
      render(
        <MemoryRouter>
          <RoleBenefitsSection />
        </MemoryRouter>
      );

      expect(screen.getByRole('heading', { name: /For Students/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /For Placement Officers \(TPO\)/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /For Corporate Recruiters/i })).toBeInTheDocument();

      // Filter to students only
      const studentFilterTab = screen.getByRole('button', { name: /^Students$/i });
      fireEvent.click(studentFilterTab);
      expect(screen.getByRole('heading', { name: /For Students/i })).toBeInTheDocument();
      expect(screen.queryByRole('heading', { name: /For Corporate Recruiters/i })).not.toBeInTheDocument();
    });
  });

  describe('FAQ Accordion Interaction', () => {
    it('renders questions and expands answer when clicked', () => {
      render(<FaqSection />);

      // First question is open by default
      expect(screen.getByText(FAQS[0].answer)).toBeInTheDocument();

      // Second question should be collapsed initially
      const secondQBtn = screen.getByRole('button', { name: new RegExp(FAQS[1].question, 'i') });
      expect(screen.queryByText(FAQS[1].answer)).not.toBeInTheDocument();

      // Click to toggle open
      fireEvent.click(secondQBtn);
      expect(screen.getByText(FAQS[1].answer)).toBeInTheDocument();

      // Click again to collapse
      fireEvent.click(secondQBtn);
      expect(screen.queryByText(FAQS[1].answer)).not.toBeInTheDocument();
    });
  });

  describe('Contact Form Validation & Submission', () => {
    it('displays validation errors on invalid or empty submission', async () => {
      render(<ContactSection />);

      const submitBtn = screen.getByRole('button', { name: /Submit Inquiry/i });
      fireEvent.click(submitBtn);

      await waitFor(() => {
        expect(screen.getByText(/Full name must be at least 2 characters/i)).toBeInTheDocument();
        expect(screen.getByText(/Email address is required/i)).toBeInTheDocument();
        expect(screen.getByText(/Subject must be at least 3 characters/i)).toBeInTheDocument();
        expect(screen.getByText(/Message must be at least 10 characters/i)).toBeInTheDocument();
      });
    });

    it('validates invalid email format', async () => {
      const user = userEvent.setup();
      render(<ContactSection />);

      const emailInput = screen.getByPlaceholderText(/name@college.edu/i);
      await user.type(emailInput, 'invalid-email');

      const submitBtn = screen.getByRole('button', { name: /Submit Inquiry/i });
      fireEvent.click(submitBtn);

      await waitFor(() => {
        expect(screen.getByText(/Please enter a valid work or institutional email address/i)).toBeInTheDocument();
      });
    });

    it('submits valid form data, shows simulated success feedback, and resets fields', async () => {
      const user = userEvent.setup();
      render(<ContactSection />);

      const nameInput = screen.getByPlaceholderText(/Dr. Anand Verma/i);
      const emailInput = screen.getByPlaceholderText(/name@college.edu/i);
      const subjectInput = screen.getByPlaceholderText(/Campus Onboarding Inquiry/i);
      const messageInput = screen.getByPlaceholderText(/Describe your college placement requirements/i);

      await user.type(nameInput, 'Dean Ramesh Iyer');
      await user.type(emailInput, 'ramesh.iyer@university.edu');
      await user.type(subjectInput, 'Institutional Onboarding Request 2026');
      await user.type(messageInput, 'We are seeking to integrate CampusConnect for our 1200 computer science students.');

      const submitBtn = screen.getByRole('button', { name: /Submit Inquiry/i });
      fireEvent.click(submitBtn);

      await waitFor(() => {
        expect(screen.getByText(/Message Received \(Demo Mode\)/i)).toBeInTheDocument();
      });

      // Inputs reset
      expect(nameInput).toHaveValue('');
      expect(emailInput).toHaveValue('');
    });
  });

  describe('Navigation & Mobile Drawer Behavior', () => {
    it('toggles mobile drawer navigation on hamburger click', () => {
      render(
        <MemoryRouter>
          <PublicLayout />
        </MemoryRouter>
      );

      const menuBtn = screen.getByRole('button', { name: /Toggle navigation menu/i });
      expect(screen.queryByText(/Platform Links/i)).toBeInTheDocument(); // In footer

      // Click to open mobile drawer
      fireEvent.click(menuBtn);
      const getStartedButtons = screen.getAllByRole('button', { name: /Get Started/i });
      expect(getStartedButtons.length).toBeGreaterThan(1); // One in header, one in mobile drawer

      // Click again to close
      fireEvent.click(menuBtn);
    });
  });

  describe('Public Route Pages Rendering', () => {
    it('renders AboutPage successfully', () => {
      render(
        <MemoryRouter>
          <AboutPage />
        </MemoryRouter>
      );
      expect(screen.getByText(/Transforming Campus Placements into Transparent Success/i)).toBeInTheDocument();
    });

    it('renders FeaturesPage successfully', () => {
      render(
        <MemoryRouter>
          <FeaturesPage />
        </MemoryRouter>
      );
      expect(screen.getByText(/All Platform Features & Capabilities/i)).toBeInTheDocument();
    });

    it('renders ContactPage successfully', () => {
      render(
        <MemoryRouter>
          <ContactPage />
        </MemoryRouter>
      );
      expect(screen.getByText(/Connect with Our Campus Relations Team/i)).toBeInTheDocument();
    });

    it('renders FaqPage successfully', () => {
      render(
        <MemoryRouter>
          <FaqPage />
        </MemoryRouter>
      );
      expect(screen.getByText(/CampusConnect Help Center/i)).toBeInTheDocument();
    });

    it('renders PrivacyPage successfully', () => {
      render(
        <MemoryRouter>
          <PrivacyPage />
        </MemoryRouter>
      );
      expect(screen.getByText(/Privacy Policy & Student Data Governance/i)).toBeInTheDocument();
    });

    it('renders TermsPage successfully', () => {
      render(
        <MemoryRouter>
          <TermsPage />
        </MemoryRouter>
      );
      expect(screen.getByText(/Terms of Service & Placement Code of Conduct/i)).toBeInTheDocument();
    });
  });
});
