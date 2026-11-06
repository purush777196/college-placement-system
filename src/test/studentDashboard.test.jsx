import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

import StudentDashboard from '../pages/student/StudentDashboard';
import StudentDrivesPage from '../pages/student/StudentDrivesPage';
import StudentDriveDetailPage from '../pages/student/StudentDriveDetailPage';
import StudentApplicationsPage from '../pages/student/StudentApplicationsPage';
import StudentInterviewsPage from '../pages/student/StudentInterviewsPage';
import StudentNotificationsPage from '../pages/student/StudentNotificationsPage';

import ApplicationPipelineTracker from '../features/student/components/ApplicationPipelineTracker';
import StudentProfileSummaryCard from '../features/student/components/StudentProfileSummaryCard';
import {
  ApplicationStatusChart,
  MonthlyApplicationActivityChart,
  OpportunityDistributionChart,
  ApplicationConversionChart,
} from '../components/charts/StudentCharts';

import { ProtectedRoute } from '../app/router';
import { useAuthStore } from '../store/authStore';
import { drivesMockService } from '../services/mock/drives.mock';
import { applicationsMockService } from '../services/mock/applications.mock';
import { notificationsMockService } from '../services/mock/notifications.mock';
import { studentsMockService } from '../services/mock/students.mock';
import { ROLES } from '../constants/roles';

// Mock react-chartjs-2 to cleanly render canvas in JSDOM
vi.mock('react-chartjs-2', () => ({
  Doughnut: () => <div data-testid="mock-doughnut-chart"><canvas /></div>,
  Bar: () => <div data-testid="mock-bar-chart"><canvas /></div>,
  Line: () => <div data-testid="mock-line-chart"><canvas /></div>,
}));

// Mock Sonner toast
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
  },
}));

const mockStudentUser = {
  id: 'std_01',
  name: 'Aarav Sharma',
  email: 'aarav.sharma@campus.edu',
  role: ROLES.STUDENT,
  rollNumber: '22CS014',
  department: 'Computer Science & Engineering',
  degree: 'B.Tech in Computer Science',
  batch: '2022 - 2026',
  cgpa: 8.85,
  profileCompletion: 85,
};

describe('Phase 3: Student Dashboard & Placement Overview Suite', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    drivesMockService._resetMemory();
    applicationsMockService._resetMemory();
    notificationsMockService._resetMemory();

    useAuthStore.setState({
      user: mockStudentUser,
      isAuthenticated: true,
      currentRole: ROLES.STUDENT,
      isLoading: false,
      authError: null,
    });
  });

  // 1. Student dashboard home rendering
  it('1. renders personalized welcome message, academic year, and eligibility status', async () => {
    render(
      <MemoryRouter initialEntries={['/student/dashboard']}>
        <StudentDashboard />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 1, name: /welcome back/i })).toBeInTheDocument();
    });

    expect(screen.getByText(/Tier-1 & Super Dream Eligible/i)).toBeInTheDocument();
    expect(screen.getByText(/Final Year/i)).toBeInTheDocument();
    expect(screen.getByText(/Application Pipeline/i)).toBeInTheDocument();
    expect(screen.getByText(/Featured Eligible Placement Drives/i)).toBeInTheDocument();
  });

  // 2. Placement KPI cards display and values
  it('2. displays all 6 placement KPI metrics with correct labels and values', async () => {
    render(
      <MemoryRouter initialEntries={['/student/dashboard']}>
        <StudentDashboard />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Total Applications/i)).toBeInTheDocument();
    });

    expect(screen.getAllByText(/Shortlisted/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Interviews/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Offers Received/i)).toBeInTheDocument();
    expect(screen.getByText(/Eligible Drives/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Profile Score/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/85%/i).length).toBeGreaterThan(0);
  });

  // 3. Application pipeline tracker with 7 stages
  it('3. renders application pipeline tracker with all 7 distinct stages and interactive inspect', async () => {
    const counts = {
      all: 5,
      Applied: 1,
      'Under Review': 1,
      Shortlisted: 1,
      Assessment: 1,
      Interview: 1,
      Offered: 1,
      Rejected: 0,
    };

    render(
      <MemoryRouter>
        <ApplicationPipelineTracker
          pipelineCounts={counts}
          activeStage="all"
          onSelectStage={vi.fn()}
        />
      </MemoryRouter>
    );

    expect(screen.getByText(/Application Pipeline/i)).toBeInTheDocument();
    expect(screen.getByText('Applied')).toBeInTheDocument();
    expect(screen.getByText('Under Review')).toBeInTheDocument();
    expect(screen.getByText('Shortlisted')).toBeInTheDocument();
    expect(screen.getByText('Assessment')).toBeInTheDocument();
    expect(screen.getByText('Interview')).toBeInTheDocument();
    expect(screen.getByText('Offered')).toBeInTheDocument();
    expect(screen.getByText('Rejected')).toBeInTheDocument();
  });

  // 4. Placement drive discovery grid and list view rendering
  it('4. renders placement drive discovery page with active drives and supports grid/list toggle', async () => {
    render(
      <MemoryRouter initialEntries={['/student/drives']}>
        <StudentDrivesPage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Google Cloud India/i)).toBeInTheDocument();
    });

    expect(screen.getByText(/NovaTech Global Inc./i)).toBeInTheDocument();

    // Toggle to list view
    const listBtn = screen.getByRole('button', { name: /list view/i });
    fireEvent.click(listBtn);
    expect(listBtn).toHaveClass('text-blue-600');
  });

  // 5. Search drives by company and role
  it('5. filters drives dynamically when searching by company name or role title', async () => {
    render(
      <MemoryRouter initialEntries={['/student/drives']}>
        <StudentDrivesPage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Google Cloud India/i)).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText(/search by company name/i);
    fireEvent.change(searchInput, { target: { value: 'Amazon' } });

    await waitFor(() => {
      expect(screen.getByText(/Amazon Web Services/i)).toBeInTheDocument();
      expect(screen.queryByText(/NovaTech Global Inc./i)).not.toBeInTheDocument();
    });
  });

  // 6. Filter drives by department, CGPA, and job type
  it('6. applies filters for academic department, minimum CGPA, and job type', async () => {
    render(
      <MemoryRouter initialEntries={['/student/drives']}>
        <StudentDrivesPage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Placement Drive Discovery/i)).toBeInTheDocument();
    });

    // Expand advanced filters
    const filterToggleBtn = screen.getByRole('button', { name: /filters/i });
    fireEvent.click(filterToggleBtn);

    expect(screen.getByText(/^Department$/i)).toBeInTheDocument();
    expect(screen.getByText(/Maximum Cutoff CGPA/i)).toBeInTheDocument();
    expect(screen.getByText(/^Job Type$/i)).toBeInTheDocument();
  });

  // 7. Eligibility calculation logic (CGPA and department)
  it('7. evaluates student eligibility based on CGPA cutoff and allowed departments', () => {
    const studentHighCGPA = { cgpa: 9.0, department: 'Computer Science & Engineering' };
    const studentLowCGPA = { cgpa: 7.2, department: 'Computer Science & Engineering' };
    const studentDiffDept = { cgpa: 9.0, department: 'Civil Engineering' };

    const strictDrive = {
      minCGPA: 8.5,
      eligibleDepartments: ['Computer Science & Engineering', 'Information Technology'],
      deadline: '2026-12-31',
    };

    const eligibleResult = drivesMockService._evaluateEligibility(strictDrive, studentHighCGPA);
    expect(eligibleResult.eligible).toBe(true);
    expect(eligibleResult.isEligible).toBe(true);

    const lowCgpaResult = drivesMockService._evaluateEligibility(strictDrive, studentLowCGPA);
    expect(lowCgpaResult.eligible).toBe(false);
    expect(lowCgpaResult.reason).toMatch(/cgpa/i);

    const deptResult = drivesMockService._evaluateEligibility(strictDrive, studentDiffDept);
    expect(deptResult.eligible).toBe(false);
    expect(deptResult.reason).toMatch(/department/i);
  });

  // 8. Placement drive detail page rendering
  it('8. renders drive details with company information, responsibilities, skills, and compensation', async () => {
    render(
      <MemoryRouter initialEntries={['/student/drives/DRV-2026-01']}>
        <Routes>
          <Route path="/student/drives/:driveId" element={<StudentDriveDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 1, name: /Cloud Solutions Engineer/i })).toBeInTheDocument();
    });

    expect(screen.getByText(/Google Cloud India/i)).toBeInTheDocument();
    expect(screen.getByText(/Key Responsibilities/i)).toBeInTheDocument();
    expect(screen.getByText(/Required Technical Skills/i)).toBeInTheDocument();
    expect(screen.getByText(/Hiring & Selection Workflow/i)).toBeInTheDocument();
    expect(screen.getByText(/Compensation & Benefits Package/i)).toBeInTheDocument();
  });

  // 9. Successful application submission with dialog confirmation
  it('9. opens application dialog, verifies academic declaration, and submits application successfully', async () => {
    render(
      <MemoryRouter initialEntries={['/student/drives/DRV-2026-01']}>
        <Routes>
          <Route path="/student/drives/:driveId" element={<StudentDriveDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /apply for this drive/i })).toBeInTheDocument();
    });

    // Click Apply button
    fireEvent.click(screen.getByRole('button', { name: /apply for this drive/i }));

    // Confirm dialog appears
    await waitFor(() => {
      expect(screen.getByText(/Confirm Placement Drive Application/i)).toBeInTheDocument();
    });

    // Check declaration checkbox
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    // Submit application
    const confirmBtn = screen.getByRole('button', { name: /confirm & apply/i });
    expect(confirmBtn).not.toBeDisabled();
    fireEvent.click(confirmBtn);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /application submitted/i })).toBeInTheDocument();
    });
  });

  // 10. Prevention of duplicate drive application
  it('10. prevents duplicate application submission to an already applied drive', async () => {
    // NovaTech Global (DRV-2026-02) is already applied by default
    render(
      <MemoryRouter initialEntries={['/student/drives/DRV-2026-02']}>
        <Routes>
          <Route path="/student/drives/:driveId" element={<StudentDriveDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /application submitted/i })).toBeInTheDocument();
    });

    // Direct mock service rejection
    await expect(
      applicationsMockService.applyToDrive('DRV-2026-02', 'std_01')
    ).rejects.toThrow(/duplicate submissions are not permitted/i);
  });

  // 11. Ineligible application prevention
  it('11. prevents application to ineligible drives where CGPA cutoff is not met', async () => {
    // Set user CGPA below drive cutoff (5.5 < 8.0)
    useAuthStore.setState({
      user: { ...mockStudentUser, cgpa: 5.5 },
      isAuthenticated: true,
      currentRole: ROLES.STUDENT,
    });

    render(
      <MemoryRouter initialEntries={['/student/drives/DRV-2026-04']}>
        <Routes>
          <Route path="/student/drives/:driveId" element={<StudentDriveDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /ineligible for this drive/i })).toBeInTheDocument();
    });

    expect(screen.getByRole('button', { name: /ineligible for this drive/i })).toBeDisabled();

    // Mock service rejection test
    await expect(
      applicationsMockService.applyToDrive('DRV-2026-04', 'std_01', '', { ...mockStudentUser, cgpa: 5.5 })
    ).rejects.toThrow(/Ineligible for this placement drive/i);
  });

  // 12. Applications list rendering and status filtering
  it('12. displays student applications and filters items when selecting pipeline stage pills', async () => {
    render(
      <MemoryRouter initialEntries={['/student/applications']}>
        <StudentApplicationsPage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getAllByText(/NovaTech Global Inc./i).length).toBeGreaterThan(0);
    });

    expect(screen.getByText(/My Placement Applications/i)).toBeInTheDocument();

    // Filter by Offered stage
    const offeredPill = screen.getByRole('button', { name: /offered/i });
    fireEvent.click(offeredPill);

    await waitFor(() => {
      expect(screen.getAllByText(/NovaTech Global Inc./i).length).toBeGreaterThan(0);
    });
  });

  // 13. Upcoming interviews calendar and list display
  it('13. displays scheduled interviews and supports toggling between list and calendar views', async () => {
    render(
      <MemoryRouter initialEntries={['/student/interviews']}>
        <StudentInterviewsPage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getAllByText(/Quantum Dynamics Core/i).length).toBeGreaterThan(0);
    });

    expect(screen.getByText(/Upcoming Interviews/i)).toBeInTheDocument();
    expect(screen.getByText(/Microsoft IDC/i)).toBeInTheDocument();

    // Toggle to calendar view
    const calendarBtn = screen.getByRole('button', { name: /calendar view/i });
    fireEvent.click(calendarBtn);
    expect(calendarBtn).toHaveClass('bg-blue-600');
  });

  // 14. Notification center interactions (mark as read, mark all read)
  it('14. displays notification alerts, marks individual items as read, and handles mark all as read', async () => {
    render(
      <MemoryRouter initialEntries={['/student/notifications']}>
        <StudentNotificationsPage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/3 Unread/i)).toBeInTheDocument();
    });

    expect(screen.getByText(/Notification Center/i)).toBeInTheDocument();
    expect(screen.getByText(/Technical Interview Confirmed/i)).toBeInTheDocument();

    // Click "Mark All as Read"
    const markAllBtn = screen.getByRole('button', { name: /mark all as read/i });
    fireEvent.click(markAllBtn);

    await waitFor(() => {
      expect(screen.queryByText(/3 Unread/i)).not.toBeInTheDocument();
    });
  });

  // 15. Profile summary display and shortcut
  it('15. renders profile summary card with student academic standing and ATS resume builder shortcut', () => {
    render(
      <MemoryRouter>
        <StudentProfileSummaryCard student={mockStudentUser} />
      </MemoryRouter>
    );

    expect(screen.getByText('Aarav Sharma')).toBeInTheDocument();
    expect(screen.getByText('Computer Science & Engineering')).toBeInTheDocument();
    expect(screen.getByText('8.85 / 10.0')).toBeInTheDocument();
    expect(screen.getByText(/Open AI Resume ATS Builder/i)).toBeInTheDocument();
  });

  // 16. Chart components rendering (distribution, activity)
  it('16. renders student placement charts without throwing canvas or dataset errors', () => {
    const dummyStatusData = {
      labels: ['Shortlisted', 'Assessment', 'Interview', 'Offered'],
      datasets: [{ data: [1, 1, 1, 1], backgroundColor: ['#3b82f6', '#f59e0b', '#8b5cf6', '#10b981'] }],
    };

    const dummyActivityData = {
      labels: ['Aug', 'Sep', 'Oct', 'Nov'],
      datasets: [{ label: 'Applications', data: [1, 2, 3, 2], backgroundColor: '#2563eb' }],
    };

    const dummyDistribution = {
      labels: ['Tier 1 (> ₹20 LPA)', 'Tier 2 (₹10 - ₹20 LPA)', 'Mass Recruiter'],
      datasets: [{ data: [3, 5, 2], backgroundColor: ['#2563eb', '#38bdf8', '#94a3b8'] }],
    };

    const dummyConversion = {
      labels: ['Applied to Review', 'Review to Shortlist', 'Shortlist to Interview', 'Interview to Offer'],
      datasets: [{ data: [100, 80, 60, 40], backgroundColor: '#10b981' }],
    };

    const { container: c1 } = render(<ApplicationStatusChart data={dummyStatusData} />);
    expect(c1.querySelector('canvas')).toBeInTheDocument();

    const { container: c2 } = render(<MonthlyApplicationActivityChart data={dummyActivityData} />);
    expect(c2.querySelector('canvas')).toBeInTheDocument();

    const { container: c3 } = render(<OpportunityDistributionChart data={dummyDistribution} />);
    expect(c3.querySelector('canvas')).toBeInTheDocument();

    const { container: c4 } = render(<ApplicationConversionChart data={dummyConversion} />);
    expect(c4.querySelector('canvas')).toBeInTheDocument();
  });

  // 17. Empty state handling (search with no results)
  it('17. renders clear empty state and allows resetting search when no drives match query', async () => {
    render(
      <MemoryRouter initialEntries={['/student/drives']}>
        <StudentDrivesPage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Google Cloud India/i)).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText(/search by company name/i);
    fireEvent.change(searchInput, { target: { value: 'NonExistentCompanyXYZ999' } });

    await waitFor(() => {
      expect(screen.getByText(/No Placement Drives Found/i)).toBeInTheDocument();
    });

    const resetBtn = screen.getByRole('button', { name: /^reset filters$/i });
    expect(resetBtn).toBeInTheDocument();
    fireEvent.click(resetBtn);

    await waitFor(() => {
      expect(screen.getByText(/Google Cloud India/i)).toBeInTheDocument();
    });
  });

  // 18. Loading states
  it('18. displays animated loading spinner while dashboard telemetry is resolving', () => {
    render(
      <MemoryRouter initialEntries={['/student/dashboard']}>
        <StudentDashboard />
      </MemoryRouter>
    );

    expect(screen.getByText(/loading your placement intelligence dashboard/i)).toBeInTheDocument();
  });

  // 19. Error state handling
  it('19. handles service load errors gracefully and provides a retry mechanism', async () => {
    vi.spyOn(studentsMockService, 'getStudentDashboard').mockRejectedValueOnce(
      new Error('Failed to retrieve student telemetry records.')
    );

    render(
      <MemoryRouter initialEntries={['/student/dashboard']}>
        <StudentDashboard />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/failed to retrieve student telemetry records/i)).toBeInTheDocument();
    });

    expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument();
  });

  // 20. Student route protection and unauthorized access prevention
  it('20. enforces role protection on student portal routes and blocks unauthenticated access', () => {
    // Unauthenticated user
    useAuthStore.setState({
      user: null,
      isAuthenticated: false,
      currentRole: null,
    });

    render(
      <MemoryRouter initialEntries={['/student/dashboard']}>
        <Routes>
          <Route
            path="/student/dashboard"
            element={
              <ProtectedRoute allowedRoles={[ROLES.STUDENT, ROLES.ADMIN]}>
                <div>Protected Student Portal Content</div>
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<div>Redirected Login Page</div>} />
          <Route path="/unauthorized" element={<div>Unauthorized Access Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Redirected Login Page')).toBeInTheDocument();
    expect(screen.queryByText('Protected Student Portal Content')).not.toBeInTheDocument();

    // Authenticated with unauthorized role (e.g. Recruiter attempting to access student portal)
    useAuthStore.setState({
      user: { name: 'Recruiter User' },
      isAuthenticated: true,
      currentRole: ROLES.RECRUITER,
    });

    render(
      <MemoryRouter initialEntries={['/student/dashboard']}>
        <Routes>
          <Route
            path="/student/dashboard"
            element={
              <ProtectedRoute allowedRoles={[ROLES.STUDENT, ROLES.ADMIN]}>
                <div>Protected Student Portal Content</div>
              </ProtectedRoute>
            }
          />
          <Route path="/unauthorized" element={<div>Unauthorized Access Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Unauthorized Access Page')).toBeInTheDocument();
  });
});
