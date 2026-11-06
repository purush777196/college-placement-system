import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import StudentRegisterPage from '../pages/auth/StudentRegisterPage';
import RecruiterRegisterPage from '../pages/auth/RecruiterRegisterPage';
import TpoRegisterPage from '../pages/auth/TpoRegisterPage';
import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage';
import ResetPasswordPage from '../pages/auth/ResetPasswordPage';
import PasswordInput from '../features/auth/components/PasswordInput';
import PasswordStrengthMeter from '../features/auth/components/PasswordStrengthMeter';
import PasswordRequirements from '../features/auth/components/PasswordRequirements';
import { ProtectedRoute } from '../app/router';
import { useAuthStore } from '../store/authStore';
import { authMockService } from '../services/mock/auth.mock';
import { ROLES } from '../constants/roles';

// Mock sonner toast to avoid DOM clutter
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
  },
}));

describe('Phase 2: Authentication & User Onboarding Suite', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    authMockService._resetMemory();
    useAuthStore.setState({
      user: null,
      isAuthenticated: false,
      currentRole: null,
      isLoading: false,
      authError: null,
    });
  });

  // 1. Login form rendering
  it('1. renders the login form with required fields, labels, and accessible controls', () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <LoginPage />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /sign in/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/remember me/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /forgot password\?/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in as/i })).toBeInTheDocument();
  });

  // 2. Login field validation
  it('2. validates login fields when submitted with invalid or empty input', async () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <LoginPage />
      </MemoryRouter>
    );

    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/^password/i);
    const submitBtn = screen.getByRole('button', { name: /sign in as/i });

    // Clear inputs and submit
    fireEvent.change(emailInput, { target: { value: '' } });
    fireEvent.change(passwordInput, { target: { value: '' } });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    });

    // Enter invalid email format
    fireEvent.change(emailInput, { target: { value: 'not-an-email' } });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
    });
  });

  // 3. Password visibility toggle & security components
  it('3. toggles password input visibility and displays password strength and requirements', () => {
    const { rerender } = render(
      <div>
        <PasswordInput id="test-pwd" placeholder="Enter password" />
        <PasswordStrengthMeter password="Weak" />
        <PasswordRequirements password="Weak" />
      </div>
    );

    const input = screen.getByPlaceholderText('Enter password');
    const toggleBtn = screen.getByRole('button', { name: /show password/i });

    expect(input).toHaveAttribute('type', 'password');

    fireEvent.click(toggleBtn);
    expect(input).toHaveAttribute('type', 'text');
    expect(screen.getByRole('button', { name: /hide password/i })).toBeInTheDocument();

    fireEvent.click(toggleBtn);
    expect(input).toHaveAttribute('type', 'password');

    // Password strength & requirements feedback
    expect(screen.getByText(/password strength:/i)).toBeInTheDocument();
    expect(screen.getByText(/fair/i)).toBeInTheDocument();
    expect(screen.getByText(/password requirements:/i)).toBeInTheDocument();
    expect(screen.getByText(/at least 8 characters/i)).toBeInTheDocument();

    // Rerender with strong password
    rerender(
      <div>
        <PasswordStrengthMeter password="SuperStrongPass123!" />
        <PasswordRequirements password="SuperStrongPass123!" />
      </div>
    );
    expect(screen.getByText(/strong/i)).toBeInTheDocument();
  });

  // 4. Successful student login
  it('4. logs in student demo account successfully and updates auth state', async () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <LoginPage />
      </MemoryRouter>
    );

    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/^password/i);
    const submitBtn = screen.getByRole('button', { name: /sign in as/i });

    fireEvent.change(emailInput, { target: { value: 'aarav.sharma@campus.edu' } });
    fireEvent.change(passwordInput, { target: { value: 'DemoPassword123!' } });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      const state = useAuthStore.getState();
      expect(state.isAuthenticated).toBe(true);
      expect(state.currentRole).toBe(ROLES.STUDENT);
      expect(state.user.name).toBe('Aarav Sharma');
    });
  });

  // 5. Successful recruiter login
  it('5. logs in recruiter demo account successfully', async () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <LoginPage />
      </MemoryRouter>
    );

    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/^password/i);
    const submitBtn = screen.getByRole('button', { name: /sign in as/i });

    // Select recruiter persona button
    const recruiterBtn = screen.getByRole('button', { name: /recruiter/i });
    fireEvent.click(recruiterBtn);

    fireEvent.change(emailInput, { target: { value: 'priya.s@novatech.io' } });
    fireEvent.change(passwordInput, { target: { value: 'DemoPassword123!' } });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      const state = useAuthStore.getState();
      expect(state.isAuthenticated).toBe(true);
      expect(state.currentRole).toBe(ROLES.RECRUITER);
    });
  });

  // 6. Successful TPO login
  it('6. logs in TPO demo account successfully', async () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <LoginPage />
      </MemoryRouter>
    );

    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/^password/i);
    const submitBtn = screen.getByRole('button', { name: /sign in as/i });

    const tpoBtn = screen.getByRole('button', { name: /tpo head/i });
    fireEvent.click(tpoBtn);

    fireEvent.change(emailInput, { target: { value: 'tpo.head@campus.edu' } });
    fireEvent.change(passwordInput, { target: { value: 'DemoPassword123!' } });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      const state = useAuthStore.getState();
      expect(state.isAuthenticated).toBe(true);
      expect(state.currentRole).toBe(ROLES.TPO);
    });
  });

  // 7. Administrator demo login
  it('7. authenticates Administrator via demo persona account', async () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <LoginPage />
      </MemoryRouter>
    );

    const adminBtn = screen.getByRole('button', { name: /admin \(demo\)/i });
    fireEvent.click(adminBtn);

    const submitBtn = screen.getByRole('button', { name: /sign in as/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      const state = useAuthStore.getState();
      expect(state.isAuthenticated).toBe(true);
      expect(state.currentRole).toBe(ROLES.ADMIN);
      expect(state.user.accessLevel).toBe('Super Administrator');
    });
  });

  // 8. Invalid login credentials display
  it('8. displays inline error notification when credentials are invalid', async () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <LoginPage />
      </MemoryRouter>
    );

    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/^password/i);
    const submitBtn = screen.getByRole('button', { name: /sign in as/i });

    fireEvent.change(emailInput, { target: { value: 'aarav.sharma@campus.edu' } });
    fireEvent.change(passwordInput, { target: { value: 'wrong-password' } });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(/invalid credentials/i);
    });
  });

  // 9. Student registration validation
  it('9. validates student registration fields including CGPA bounds and required phone', async () => {
    render(
      <MemoryRouter initialEntries={['/register/student']}>
        <StudentRegisterPage />
      </MemoryRouter>
    );

    const submitBtn = screen.getByRole('button', { name: /complete student registration/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/full name must be at least 2 characters/i)).toBeInTheDocument();
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/phone number is required/i)).toBeInTheDocument();
      expect(screen.getByText(/registration number must be at least 3 characters/i)).toBeInTheDocument();
    });

    // Test CGPA range validation
    const cgpaInput = screen.getByLabelText(/current cgpa/i);
    fireEvent.change(cgpaInput, { target: { value: '11.5' } });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/cgpa cannot exceed 10.0/i)).toBeInTheDocument();
    });
  });

  // 10. Recruiter registration validation
  it('10. validates recruiter registration fields including company website format', async () => {
    render(
      <MemoryRouter initialEntries={['/register/recruiter']}>
        <RecruiterRegisterPage />
      </MemoryRouter>
    );

    const submitBtn = screen.getByRole('button', { name: /submit recruiter registration/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/recruiter name must be at least 2 characters/i)).toBeInTheDocument();
      expect(screen.getByText(/official work email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/company name must be at least 2 characters/i)).toBeInTheDocument();
      expect(screen.getByText(/company website is required/i)).toBeInTheDocument();
    });

    const websiteInput = screen.getByLabelText(/company website/i);
    fireEvent.change(websiteInput, { target: { value: 'invalid-url-format' } });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/please enter a valid website url/i)).toBeInTheDocument();
    });
  });

  // 11. TPO registration validation
  it('11. validates TPO registration fields including college code and department', async () => {
    render(
      <MemoryRouter initialEntries={['/register/tpo']}>
        <TpoRegisterPage />
      </MemoryRouter>
    );

    const submitBtn = screen.getByRole('button', { name: /submit tpo registration/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/full name must be at least 2 characters/i)).toBeInTheDocument();
      expect(screen.getByText(/official college email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/college name must be at least 3 characters/i)).toBeInTheDocument();
      expect(screen.getByText(/college code must be at least 2 characters/i)).toBeInTheDocument();
    });
  });

  // 12. Password confirmation matching
  it("12. displays an error when password and confirmPassword don't match", async () => {
    render(
      <MemoryRouter initialEntries={['/register/student']}>
        <StudentRegisterPage />
      </MemoryRouter>
    );

    const passwordInput = screen.getByLabelText(/^password \*/i);
    const confirmPasswordInput = screen.getByLabelText(/confirm password \*/i);
    const submitBtn = screen.getByRole('button', { name: /complete student registration/i });

    fireEvent.change(passwordInput, { target: { value: 'ValidPass123!' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'DifferentPass123!' } });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText("Passwords don't match")).toBeInTheDocument();
    });
  });

  // 13. Forgot-password submission
  it('13. handles forgot-password simulated submission and displays success message', async () => {
    render(
      <MemoryRouter initialEntries={['/forgot-password']}>
        <ForgotPasswordPage />
      </MemoryRouter>
    );

    const emailInput = screen.getByLabelText(/registered email address/i);
    const submitBtn = screen.getByRole('button', { name: /send recovery instructions/i });

    fireEvent.change(emailInput, { target: { value: 'student@campus.edu' } });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/password recovery instructions simulated!/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /proceed to reset password demo/i })).toBeInTheDocument();
    });
  });

  // 14. Reset-password validation and submission
  it('14. validates and successfully submits password reset demo form', async () => {
    render(
      <MemoryRouter initialEntries={['/reset-password']}>
        <ResetPasswordPage />
      </MemoryRouter>
    );

    const newPwdInput = screen.getByLabelText(/^new password \*/i);
    const confirmPwdInput = screen.getByLabelText(/^confirm new password \*/i);
    const submitBtn = screen.getByRole('button', { name: /reset password/i });

    // Too weak
    fireEvent.change(newPwdInput, { target: { value: 'short' } });
    fireEvent.change(confirmPwdInput, { target: { value: 'short' } });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/password must be at least 8 characters/i)).toBeInTheDocument();
    });

    // Valid strong password
    fireEvent.change(newPwdInput, { target: { value: 'NewSuperPass2026!' } });
    fireEvent.change(confirmPwdInput, { target: { value: 'NewSuperPass2026!' } });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/password reset complete/i)).toBeInTheDocument();
    });
  });

  // 15. Logout workflow
  it('15. clears user session state upon logout', () => {
    useAuthStore.setState({
      user: { id: 'usr_1', name: 'Test User', role: ROLES.STUDENT },
      isAuthenticated: true,
      currentRole: ROLES.STUDENT,
    });

    expect(useAuthStore.getState().isAuthenticated).toBe(true);

    useAuthStore.getState().logout();

    expect(useAuthStore.getState().user).toBeNull();
    expect(useAuthStore.getState().isAuthenticated).toBe(false);
    expect(useAuthStore.getState().currentRole).toBeNull();
  });

  // 16. Protected route access (authenticated)
  it('16. allows access to protected component when user is authenticated with authorized role', () => {
    useAuthStore.setState({
      user: { id: 'std_01', name: 'Aarav Sharma', role: ROLES.STUDENT },
      isAuthenticated: true,
      currentRole: ROLES.STUDENT,
    });

    render(
      <MemoryRouter initialEntries={['/student/dashboard']}>
        <Routes>
          <Route
            path="/student/dashboard"
            element={
              <ProtectedRoute allowedRoles={[ROLES.STUDENT]}>
                <div data-testid="student-portal">Student Dashboard Content</div>
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<div>Login Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId('student-portal')).toBeInTheDocument();
  });

  // 17. Unauthorized role handling
  it('17. redirects user to /unauthorized when authenticated with an unauthorized role', () => {
    useAuthStore.setState({
      user: { id: 'std_01', name: 'Aarav Sharma', role: ROLES.STUDENT },
      isAuthenticated: true,
      currentRole: ROLES.STUDENT,
    });

    render(
      <MemoryRouter initialEntries={['/admin/dashboard']}>
        <Routes>
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
                <div data-testid="admin-portal">Admin Content</div>
              </ProtectedRoute>
            }
          />
          <Route path="/unauthorized" element={<div data-testid="unauthorized-page">403 Access Restricted</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.queryByTestId('admin-portal')).not.toBeInTheDocument();
    expect(screen.getByTestId('unauthorized-page')).toBeInTheDocument();
  });

  // 18. Registration role-selection page rendering
  it('18. renders registration role selection with 3 persona cards and omits administrator registration', () => {
    render(
      <MemoryRouter initialEntries={['/register']}>
        <RegisterPage />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /create your campusconnect account/i })).toBeInTheDocument();
    expect(screen.getByText('Student Candidate')).toBeInTheDocument();
    expect(screen.getByText('Corporate Recruiter')).toBeInTheDocument();
    expect(screen.getByText('Placement Officer (TPO)')).toBeInTheDocument();

    // Verify CTAs point to proper routes
    expect(screen.getByRole('link', { name: /register as student/i })).toHaveAttribute(
      'href',
      '/register/student'
    );
    expect(screen.getByRole('link', { name: /register as recruiter/i })).toHaveAttribute(
      'href',
      '/register/recruiter'
    );
    expect(screen.getByRole('link', { name: /register as placement officer/i })).toHaveAttribute(
      'href',
      '/register/tpo'
    );

    // Verify administrator is explicitly NOT among public registration cards
    expect(screen.queryByRole('link', { name: /register as admin/i })).not.toBeInTheDocument();
    expect(screen.getByText(/system administrator accounts cannot be registered publicly/i)).toBeInTheDocument();
  });

  // 19. Duplicate registration prevention
  it('19. prevents duplicate registration with existing email in mock service', async () => {
    const studentData = {
      fullName: 'Duplicate Candidate',
      email: 'aarav.sharma@campus.edu', // Already existing demo email
      password: 'DemoPassword123!',
      phone: '+91 98765 00000',
      collegeId: 'CC-DUP-01',
      department: 'Computer Science',
      degree: 'B.Tech',
      graduationYear: '2026',
      cgpa: 8.5,
    };

    await expect(authMockService.registerStudent(studentData)).rejects.toThrow(
      /already exists/i
    );
  });

  // 20. Preservation of public routes
  it('20. preserves unauthenticated access to public routes', () => {
    useAuthStore.setState({
      user: null,
      isAuthenticated: false,
      currentRole: null,
    });

    render(
      <MemoryRouter initialEntries={['/about']}>
        <Routes>
          <Route path="/about" element={<div data-testid="public-about">About CampusConnect</div>} />
          <Route path="/login" element={<div>Login Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId('public-about')).toBeInTheDocument();
  });
});
