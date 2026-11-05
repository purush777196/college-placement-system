import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout';
import AuthLayout from '../layouts/AuthLayout';
import StudentLayout from '../layouts/StudentLayout';
import TpoLayout from '../layouts/TpoLayout';
import RecruiterLayout from '../layouts/RecruiterLayout';
import AdminLayout from '../layouts/AdminLayout';

import HomePage from '../pages/public/HomePage';
import AboutPage from '../pages/public/AboutPage';
import CareersPage from '../pages/public/CareersPage';
import ContactPage from '../pages/public/ContactPage';
import FeaturesPage from '../pages/public/FeaturesPage';
import FaqPage from '../pages/public/FaqPage';
import PrivacyPage from '../pages/public/PrivacyPage';
import TermsPage from '../pages/public/TermsPage';

import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage';

import StudentDashboard from '../pages/student/StudentDashboard';
import TpoDashboard from '../pages/tpo/TpoDashboard';
import RecruiterDashboard from '../pages/recruiter/RecruiterDashboard';
import AdminDashboard from '../pages/admin/AdminDashboard';

import UnauthorizedPage from '../pages/UnauthorizedPage';
import NotFoundPage from '../pages/NotFoundPage';
import { useAuthStore } from '../store/authStore';
import { ROLES } from '../constants/roles';

/**
 * Mock Role Demonstration Guard
 * IMPORTANT: This client-side guard is strictly for UI demonstration purposes.
 * Real, hardened authorization is enforced server-side via Django REST Framework
 * JWT permissions in subsequent phases.
 */
export const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, currentRole } = useAuthStore.getState();

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(currentRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export const router = createBrowserRouter([
  // Public marketing & informational routes
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'features', element: <FeaturesPage /> },
      { path: 'careers', element: <CareersPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'faq', element: <FaqPage /> },
      { path: 'privacy', element: <PrivacyPage /> },
      { path: 'terms', element: <TermsPage /> },
    ],
  },

  // Authentication routes
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: 'forgot-password', element: <ForgotPasswordPage /> },
    ],
  },

  // Student portal routes
  {
    path: '/student',
    element: (
      <ProtectedRoute allowedRoles={[ROLES.STUDENT, ROLES.ADMIN]}>
        <StudentLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: 'dashboard', element: <StudentDashboard /> },
      { path: 'drives', element: <StudentDashboard /> },
      { path: 'applications', element: <StudentDashboard /> },
      { path: 'resume-builder', element: <StudentDashboard /> },
      { path: 'assessments', element: <StudentDashboard /> },
      { path: 'interviews', element: <StudentDashboard /> },
      { path: 'offers', element: <StudentDashboard /> },
      { path: 'notifications', element: <StudentDashboard /> },
    ],
  },

  // TPO portal routes
  {
    path: '/tpo',
    element: (
      <ProtectedRoute allowedRoles={[ROLES.TPO, ROLES.ADMIN]}>
        <TpoLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: 'dashboard', element: <TpoDashboard /> },
      { path: 'students', element: <TpoDashboard /> },
      { path: 'companies', element: <TpoDashboard /> },
      { path: 'drives', element: <TpoDashboard /> },
      { path: 'analytics', element: <TpoDashboard /> },
      { path: 'offers', element: <TpoDashboard /> },
      { path: 'announcements', element: <TpoDashboard /> },
      { path: 'settings', element: <TpoDashboard /> },
    ],
  },

  // Recruiter portal routes
  {
    path: '/recruiter',
    element: (
      <ProtectedRoute allowedRoles={[ROLES.RECRUITER, ROLES.ADMIN]}>
        <RecruiterLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: 'dashboard', element: <RecruiterDashboard /> },
      { path: 'drives', element: <RecruiterDashboard /> },
      { path: 'candidates', element: <RecruiterDashboard /> },
      { path: 'resumes', element: <RecruiterDashboard /> },
      { path: 'interviews', element: <RecruiterDashboard /> },
      { path: 'offers', element: <RecruiterDashboard /> },
      { path: 'profile', element: <RecruiterDashboard /> },
    ],
  },

  // Admin portal routes
  {
    path: '/admin',
    element: (
      <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: 'dashboard', element: <AdminDashboard /> },
      { path: 'users', element: <AdminDashboard /> },
      { path: 'roles', element: <AdminDashboard /> },
      { path: 'departments', element: <AdminDashboard /> },
      { path: 'audit', element: <AdminDashboard /> },
      { path: 'analytics', element: <AdminDashboard /> },
      { path: 'settings', element: <AdminDashboard /> },
    ],
  },

  // Error and Fallback routes
  {
    path: '/unauthorized',
    element: (
      <PublicLayout>
        <UnauthorizedPage />
      </PublicLayout>
    ),
  },
  {
    path: '*',
    element: (
      <PublicLayout>
        <NotFoundPage />
      </PublicLayout>
    ),
  },
]);

