import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout';
import AuthLayout from '../layouts/AuthLayout';
import StudentLayout from '../layouts/StudentLayout';
import TpoLayout from '../layouts/TpoLayout';
import RecruiterLayout from '../layouts/RecruiterLayout';
import AdminLayout from '../layouts/AdminLayout';

describe('Layouts Suite', () => {
  it('renders PublicLayout with navigation and brand', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route index element={<div>Public Home Child</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText(/Public Home Child/i)).toBeInTheDocument();
    expect(screen.getAllByText(/About/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Careers/i).length).toBeGreaterThan(0);
  });

  it('renders AuthLayout with feature showcase', () => {
    render(
      <MemoryRouter initialEntries={['/auth/login']}>
        <Routes>
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="login" element={<div>Auth Form Child</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText(/Auth Form Child/i)).toBeInTheDocument();
    expect(screen.getByText(/AI-Driven Placement Intelligence/i)).toBeInTheDocument();
  });

  it('renders StudentLayout with sidebar and header', () => {
    render(
      <MemoryRouter initialEntries={['/student/dashboard']}>
        <Routes>
          <Route path="/student" element={<StudentLayout />}>
            <Route path="dashboard" element={<div>Student Dashboard View</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText(/Student Dashboard View/i)).toBeInTheDocument();
    expect(screen.getByText(/Student Placement Portal/i)).toBeInTheDocument();
  });

  it('renders TpoLayout with TPO title and navigation', () => {
    render(
      <MemoryRouter initialEntries={['/tpo/dashboard']}>
        <Routes>
          <Route path="/tpo" element={<TpoLayout />}>
            <Route path="dashboard" element={<div>TPO Dashboard View</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText(/TPO Dashboard View/i)).toBeInTheDocument();
    expect(screen.getByText(/Training & Placement Office/i)).toBeInTheDocument();
  });

  it('renders RecruiterLayout with console title', () => {
    render(
      <MemoryRouter initialEntries={['/recruiter/dashboard']}>
        <Routes>
          <Route path="/recruiter" element={<RecruiterLayout />}>
            <Route path="dashboard" element={<div>Recruiter Dashboard View</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText(/Recruiter Dashboard View/i)).toBeInTheDocument();
    expect(screen.getByText(/Corporate Recruiter Console/i)).toBeInTheDocument();
  });

  it('renders AdminLayout with admin title', () => {
    render(
      <MemoryRouter initialEntries={['/admin/dashboard']}>
        <Routes>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<div>Admin Dashboard View</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText(/Admin Dashboard View/i)).toBeInTheDocument();
    expect(screen.getByText(/CampusConnect Administration/i)).toBeInTheDocument();
  });
});
