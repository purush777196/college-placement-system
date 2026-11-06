import React from 'react';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

import StudentProfilePage from '../pages/student/StudentProfilePage';
import PersonalInfoSection from '../features/student/profile/PersonalInfoSection';
import AcademicInfoSection from '../features/student/profile/AcademicInfoSection';
import EducationHistorySection from '../features/student/profile/EducationHistorySection';
import SkillsManagementSection from '../features/student/profile/SkillsManagementSection';
import ProjectsSection from '../features/student/profile/ProjectsSection';
import CertificationsSection from '../features/student/profile/CertificationsSection';
import AchievementsSection from '../features/student/profile/AchievementsSection';
import DocumentReferenceSection from '../features/student/profile/DocumentReferenceSection';
import PublicProfilePreviewModal from '../features/student/profile/PublicProfilePreviewModal';

import {
  personalInfoSchema,
  academicInfoSchema,
  educationRecordSchema,
  projectSchema,
  certificationSchema,
} from '../schemas/profileSchemas';
import { studentsMockService, INITIAL_STUDENT_PROFILE } from '../services/mock/students.mock';
import { useAuthStore } from '../store/authStore';
import { ROLES } from '../constants/roles';

// Mock Sonner toast
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
  },
}));

describe('Phase 4: Student Profile Management & Academic Records Suite', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    studentsMockService._resetMemory();
    useAuthStore.setState({
      isAuthenticated: true,
      currentRole: ROLES.STUDENT,
      user: {
        id: 'STD-2022-001',
        name: 'Aarav Sharma',
        email: 'aarav.sharma@campus.edu',
        role: ROLES.STUDENT,
      },
    });
  });

  // 1. Overall Profile Page Rendering
  it('1. renders student profile page with header, completion status, and tab navigation', async () => {
    render(
      <MemoryRouter initialEntries={['/student/profile']}>
        <StudentProfilePage />
      </MemoryRouter>
    );

    // Verify loading disappears and main profile loads
    await waitFor(() => {
      expect(screen.getAllByText(/Aarav Sharma/i).length).toBeGreaterThan(0);
    });

    expect(screen.getAllByText(/22CS014/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Computer Science & Engineering/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Recruiter Preview/i)).toBeInTheDocument();
    expect(screen.getByText(/Profile Completeness/i)).toBeInTheDocument();
  });

  // 2. Personal Information Section
  it('2. renders personal information section in view mode and toggles into edit mode', async () => {
    render(
      <MemoryRouter>
        <PersonalInfoSection
          profile={INITIAL_STUDENT_PROFILE}
          onUpdate={vi.fn()}
        />
      </MemoryRouter>
    );

    expect(screen.getByText(/Personal Information & Contact/i)).toBeInTheDocument();
    expect(screen.getByText(/Bengaluru/i)).toBeInTheDocument();
    expect(screen.getByText(/Karnataka/i)).toBeInTheDocument();

    const editBtn = screen.getByRole('button', { name: /Edit Personal Info/i });
    fireEvent.click(editBtn);

    expect(screen.getByText(/Residential Address/i)).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /Cancel/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole('button', { name: /Save Personal Info/i }).length).toBeGreaterThan(0);
  });

  // 3. Personal Information Validation
  it('3. validates personal information schema against invalid phone and postal codes', () => {
    const invalidData = {
      fullName: 'A',
      email: 'invalid-email',
      phone: '1234',
      dob: '2020-01-01', // Age < 16
      address: 'ab',
      city: 'B',
      state: 'K',
      pincode: '12',
    };

    const result = personalInfoSchema.safeParse(invalidData);
    expect(result.success).toBe(false);

    const issues = result.error.flatten().fieldErrors;
    expect(issues.fullName).toBeDefined();
    expect(issues.email).toBeDefined();
    expect(issues.phone).toBeDefined();
    expect(issues.dob).toBeDefined();
    expect(issues.pincode).toBeDefined();
  });

  // 4. Student Age Range Validation
  it('4. validates student age range requirement (16 to 60 years)', () => {
    const today = new Date();
    const tooYoungDate = `${today.getFullYear() - 12}-05-10`;
    const validAgeDate = `${today.getFullYear() - 21}-05-10`;

    const youngRes = personalInfoSchema.safeParse({
      fullName: 'Valid Name',
      email: 'valid@campus.edu',
      phone: '+91 9876543210',
      dob: tooYoungDate,
      address: 'Valid address street 123',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560100',
    });
    expect(youngRes.success).toBe(false);

    const validRes = personalInfoSchema.safeParse({
      fullName: 'Valid Name',
      email: 'valid@campus.edu',
      phone: '+91 9876543210',
      dob: validAgeDate,
      address: 'Valid address street 123',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560100',
    });
    expect(validRes.success).toBe(true);
  });

  // 5. Academic Information Management
  it('5. renders academic records section with CGPA, scale, and backlog details', () => {
    render(
      <MemoryRouter>
        <AcademicInfoSection
          academicData={INITIAL_STUDENT_PROFILE}
          onUpdate={vi.fn()}
        />
      </MemoryRouter>
    );

    expect(screen.getByText(/Academic Standing & University Records/i)).toBeInTheDocument();
    expect(screen.getByText(/8.85/i)).toBeInTheDocument();
    expect(screen.getByText(/First Class with Distinction/i)).toBeInTheDocument();
    expect(screen.getByText(/Tier-1 & Super Dream Eligible/i)).toBeInTheDocument();
  });

  // 6. Academic CGPA Scale Validation
  it('6. validates academic information: CGPA cannot exceed configured scale', () => {
    const invalidCGPA = {
      college: 'National Institute',
      rollNumber: '22CS014',
      degree: 'B.Tech',
      department: 'CSE',
      graduationYear: 2026,
      currentSemester: 7,
      cgpa: 10.5, // Exceeds scale of 10.0
      cgpaScale: 10.0,
      totalBacklogs: 0,
      activeBacklogs: 0,
    };

    const res = academicInfoSchema.safeParse(invalidCGPA);
    expect(res.success).toBe(false);
    expect(res.error.issues.some((i) => i.path.includes('cgpa'))).toBe(true);
  });

  // 7. Academic Backlog Constraint Validation
  it('7. validates academic information: active backlogs cannot exceed total backlogs', () => {
    const invalidBacklogs = {
      college: 'National Institute',
      rollNumber: '22CS014',
      degree: 'B.Tech',
      department: 'CSE',
      graduationYear: 2026,
      currentSemester: 7,
      cgpa: 8.5,
      cgpaScale: 10.0,
      totalBacklogs: 1,
      activeBacklogs: 2, // Active cannot exceed total
    };

    const res = academicInfoSchema.safeParse(invalidBacklogs);
    expect(res.success).toBe(false);
    expect(res.error.issues.some((i) => i.path.includes('activeBacklogs'))).toBe(true);
  });

  // 8. Education History Milestones
  it('8. renders education history list with multiple milestones', () => {
    render(
      <MemoryRouter>
        <EducationHistorySection
          educationList={INITIAL_STUDENT_PROFILE.education}
          onAddEducation={vi.fn()}
          onUpdateEducation={vi.fn()}
          onDeleteEducation={vi.fn()}
        />
      </MemoryRouter>
    );

    expect(screen.getByText(/Education History & Milestones/i)).toBeInTheDocument();
    expect(screen.getByText(/Delhi Public School, R.K. Puram/i)).toBeInTheDocument();
    expect(screen.getByText(/St. Xavier's High School/i)).toBeInTheDocument();
    expect(screen.getByText(/94.6/i)).toBeInTheDocument();
  });

  // 9. Education Date-Range Validation
  it('9. validates education record date range (startYear cannot exceed endYear)', () => {
    const invalidRange = {
      institution: 'State Technical University',
      qualification: 'B.Tech / B.E. (Undergraduate)',
      board: 'State University',
      startYear: 2026,
      endYear: 2022, // Invalid: startYear > endYear
      scoreType: 'CGPA',
      score: '8.5',
    };

    const res = educationRecordSchema.safeParse(invalidRange);
    expect(res.success).toBe(false);
    expect(res.error.issues.some((i) => i.path.includes('endYear'))).toBe(true);
  });

  // 10. Education Modal Add Action
  it('10. opens add education modal and triggers onAddEducation', async () => {
    const handleAdd = vi.fn().mockResolvedValue({});

    render(
      <MemoryRouter>
        <EducationHistorySection
          educationList={INITIAL_STUDENT_PROFILE.education}
          onAddEducation={handleAdd}
          onUpdateEducation={vi.fn()}
          onDeleteEducation={vi.fn()}
        />
      </MemoryRouter>
    );

    const addBtn = screen.getByRole('button', { name: /Add Education/i });
    fireEvent.click(addBtn);

    expect(screen.getByText(/Add Education Milestone/i)).toBeInTheDocument();
    const instInput = screen.getByLabelText(/School \/ College \/ Institution Name/i);
    fireEvent.change(instInput, { target: { value: 'Kendriya Vidyalaya' } });
    const boardInput = screen.getByLabelText(/Board or Affiliated University/i);
    fireEvent.change(boardInput, { target: { value: 'CBSE' } });

    const submitBtn = screen.getByRole('button', { name: /Add Milestone/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(handleAdd).toHaveBeenCalled();
    });
  });

  // 11. Education Deletion Confirmation
  it('11. opens delete confirmation dialog and confirms deletion', async () => {
    const handleDelete = vi.fn().mockResolvedValue({});

    render(
      <MemoryRouter>
        <EducationHistorySection
          educationList={INITIAL_STUDENT_PROFILE.education}
          onAddEducation={vi.fn()}
          onUpdateEducation={vi.fn()}
          onDeleteEducation={handleDelete}
        />
      </MemoryRouter>
    );

    const deleteButtons = screen.getAllByTitle(/Delete record/i);
    fireEvent.click(deleteButtons[0]);

    expect(screen.getByText(/Are you sure you want to remove this educational milestone/i)).toBeInTheDocument();
    const modal = screen.getByRole('dialog');
    const confirmBtn = within(modal).getByRole('button', { name: /Delete Record/i });
    fireEvent.click(confirmBtn);

    await waitFor(() => {
      expect(handleDelete).toHaveBeenCalledWith('edu-1');
    });
  });

  // 12. Skills Management Taxonomy & Display
  it('12. displays skills categorized across domains with proficiency badges', () => {
    render(
      <MemoryRouter>
        <SkillsManagementSection
          skills={INITIAL_STUDENT_PROFILE.skills}
          onAddSkill={vi.fn()}
          onRemoveSkill={vi.fn()}
          onUpdateProficiency={vi.fn()}
        />
      </MemoryRouter>
    );

    expect(screen.getByText(/Technical & Professional Skills/i)).toBeInTheDocument();
    expect(screen.getByText(/React 19/i)).toBeInTheDocument();
    expect(screen.getByText(/Docker/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Expert/i).length).toBeGreaterThan(0);
  });

  // 13. Skill Filtering and Search
  it('13. filters skills by category domain tabs', () => {
    render(
      <MemoryRouter>
        <SkillsManagementSection
          skills={INITIAL_STUDENT_PROFILE.skills}
          onAddSkill={vi.fn()}
          onRemoveSkill={vi.fn()}
          onUpdateProficiency={vi.fn()}
        />
      </MemoryRouter>
    );

    const devopsTab = screen.getByRole('button', { name: /Cloud & DevOps/i });
    fireEvent.click(devopsTab);

    expect(screen.getByText(/Docker/i)).toBeInTheDocument();
    expect(screen.getByText(/Kubernetes/i)).toBeInTheDocument();
    expect(screen.queryByText(/React 19/i)).not.toBeInTheDocument();
  });

  // 14. Duplicate Skill Prevention
  it('14. prevents adding duplicate skills case-insensitively in mock service', async () => {
    await expect(
      studentsMockService.addStudentSkill('std_01', {
        name: 'react 19', // duplicate of 'React 19'
        category: 'Frontend Technologies',
        proficiency: 'Advanced',
      })
    ).rejects.toThrow(/already exists/i);
  });

  // 15. Skill Proficiency Inline Update
  it('15. triggers updateSkillProficiency when changing proficiency selector', async () => {
    const handleUpdateProf = vi.fn();

    render(
      <MemoryRouter>
        <SkillsManagementSection
          skills={INITIAL_STUDENT_PROFILE.skills}
          onAddSkill={vi.fn()}
          onRemoveSkill={vi.fn()}
          onUpdateProficiency={handleUpdateProf}
        />
      </MemoryRouter>
    );

    const selects = screen.getAllByRole('combobox');
    // First select is category filter, subsequent selects are inline proficiencies
    fireEvent.change(selects[1], { target: { value: 'Intermediate' } });

    expect(handleUpdateProf).toHaveBeenCalled();
  });

  // 16. Technical Project Showcase
  it('16. renders projects portfolio with technologies, status, and repository links', () => {
    render(
      <MemoryRouter>
        <ProjectsSection
          projects={INITIAL_STUDENT_PROFILE.projects}
          onAddProject={vi.fn()}
          onUpdateProject={vi.fn()}
          onDeleteProject={vi.fn()}
        />
      </MemoryRouter>
    );

    expect(screen.getByText(/Technical Projects & Capstone/i)).toBeInTheDocument();
    expect(screen.getByText(/CampusConnect Placement Automation Portal/i)).toBeInTheDocument();
    expect(screen.getByText(/Distributed Real-Time Telemetry Pipeline/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Completed/i).length).toBeGreaterThan(0);
  });

  // 17. Project Date Range Validation
  it('17. enforces project date range constraint (startDate <= endDate)', () => {
    const invalidProject = {
      title: 'Invalid Date Build',
      description: 'Long enough description for validating the project date refinement properly',
      technologies: ['React', 'Node.js'],
      projectType: 'Personal Project',
      startDate: '2026-10-01',
      endDate: '2026-05-01', // Invalid: end before start
      status: 'Completed',
    };

    const res = projectSchema.safeParse(invalidProject);
    expect(res.success).toBe(false);
    expect(res.error.issues.some((i) => i.path.includes('endDate'))).toBe(true);
  });

  // 18. Project Creation Modal
  it('18. opens add project modal and triggers onAddProject', async () => {
    const handleAddProj = vi.fn().mockResolvedValue({});

    render(
      <MemoryRouter>
        <ProjectsSection
          projects={INITIAL_STUDENT_PROFILE.projects}
          onAddProject={handleAddProj}
          onUpdateProject={vi.fn()}
          onDeleteProject={vi.fn()}
        />
      </MemoryRouter>
    );

    const addBtn = screen.getByRole('button', { name: /Add Project/i });
    fireEvent.click(addBtn);

    expect(screen.getByText(/Add Project to Portfolio/i)).toBeInTheDocument();
    const titleInput = screen.getByLabelText(/Project Title/i);
    fireEvent.change(titleInput, { target: { value: 'Neural Network Optimizer' } });
    const descInput = screen.getByLabelText(/Project Description/i);
    fireEvent.change(descInput, { target: { value: 'Deep learning accelerator and optimizer platform' } });

    const submitBtn = screen.getByRole('button', { name: /Create Project/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(handleAddProj).toHaveBeenCalled();
    });
  });

  // 19. Industry Certifications Management
  it('19. renders industry credentials with active status and verification link', () => {
    render(
      <MemoryRouter>
        <CertificationsSection
          certifications={INITIAL_STUDENT_PROFILE.certifications}
          onAddCertification={vi.fn()}
          onUpdateCertification={vi.fn()}
          onDeleteCertification={vi.fn()}
        />
      </MemoryRouter>
    );

    expect(screen.getByText(/Industry Certifications & Licenses/i)).toBeInTheDocument();
    expect(screen.getByText(/AWS Certified Solutions Architect – Associate/i)).toBeInTheDocument();
    expect(screen.getByText(/Amazon Web Services \(AWS\)/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Active/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Verify Credential Authenticity/i).length).toBeGreaterThan(0);
  });

  // 20. Certification Date Validation
  it('20. validates certification date constraint (issueDate <= expirationDate)', () => {
    const invalidCert = {
      name: 'Google Cloud Architect',
      issuingOrganization: 'Google Cloud',
      issueDate: '2028-01-01',
      expirationDate: '2025-01-01', // Invalid: expired before issued
    };

    const res = certificationSchema.safeParse(invalidCert);
    expect(res.success).toBe(false);
    expect(res.error.issues.some((i) => i.path.includes('expirationDate'))).toBe(true);
  });

  // 21. Honors and Achievements Section
  it('21. displays competitive achievements and hackathon awards', () => {
    render(
      <MemoryRouter>
        <AchievementsSection
          achievements={INITIAL_STUDENT_PROFILE.achievements}
          onAddAchievement={vi.fn()}
          onDeleteAchievement={vi.fn()}
        />
      </MemoryRouter>
    );

    expect(screen.getByText(/Honors, Hackathons & Awards/i)).toBeInTheDocument();
    expect(screen.getByText(/1st Place Winner – National Smart Campus Hackathon 2025/i)).toBeInTheDocument();
    expect(screen.getByText(/Ministry of Education & AICTE/i)).toBeInTheDocument();
  });

  // 22. Placement Resume Reference Section
  it('22. renders placement resume metadata and Phase 11 builder advisory', () => {
    render(
      <MemoryRouter>
        <DocumentReferenceSection
          documents={INITIAL_STUDENT_PROFILE.documents}
          onUpdateDocument={vi.fn()}
        />
      </MemoryRouter>
    );

    expect(screen.getByText(/Verified Placement Resume/i)).toBeInTheDocument();
    expect(screen.getByText(/Aarav_Sharma_SDE_Resume_2026.pdf/i)).toBeInTheDocument();
    expect(screen.getByText(/ATS 92%/i)).toBeInTheDocument();
    expect(screen.getByText(/AI Resume Builder Integration \(Phase 11\):/i)).toBeInTheDocument();
  });

  // 23. Dynamic Profile Completion Calculator Engine
  it('23. dynamically evaluates profile completion across all 7 weighted dimensions', () => {
    const report = studentsMockService.calculateProfileCompletion(INITIAL_STUDENT_PROFILE);

    expect(report.percentage).toBe(100);
    expect(report.isPlacementReady).toBe(true);
    expect(report.sections.personal.score).toBe(15);
    expect(report.sections.academic.score).toBe(20);
    expect(report.sections.education.score).toBe(15);
    expect(report.sections.skills.score).toBe(15);
    expect(report.sections.projects.score).toBe(15);
    expect(report.sections.certifications.score).toBe(10);
    expect(report.sections.documents.score).toBe(10);
  });

  // 24. Profile Visibility Configuration
  it('24. updates profile visibility state to Private, College only, or Recruiter-visible', async () => {
    const res1 = await studentsMockService.updateProfileVisibility('std_01', 'College only');
    expect(res1.success).toBe(true);
    expect(res1.visibility).toBe('College only');

    const res2 = await studentsMockService.updateProfileVisibility('std_01', 'Private');
    expect(res2.success).toBe(true);
    expect(res2.visibility).toBe('Private');

    await expect(
      studentsMockService.updateProfileVisibility('std_01', 'PublicToEntireWorld')
    ).rejects.toThrow(/Invalid visibility/i);
  });

  // 25. Privacy Protection in Recruiter Preview
  it('25. strictly omits sensitive private data in recruiter profile preview', async () => {
    const preview = await studentsMockService.getPublicProfilePreview('std_01');

    // Verified public credentials exist
    expect(preview.fullName).toBe('Aarav Sharma');
    expect(preview.degree).toBe('B.Tech in Computer Science & Engineering');
    expect(preview.cgpa).toBe(8.85);
    expect(preview.skills.length).toBeGreaterThan(0);
    expect(preview.projects.length).toBeGreaterThan(0);

    // Private contact details MUST be omitted
    expect(preview.phone).toBeUndefined();
    expect(preview.dob).toBeUndefined();
    expect(preview.address).toBeUndefined();
    expect(preview.pincode).toBeUndefined();
  });

  // 26. Recruiter Profile Preview Modal UI
  it('26. displays recruiter profile preview modal with safety banner and credentials', () => {
    const mockPreviewData = {
      fullName: 'Aarav Sharma',
      degree: 'B.Tech in Computer Science',
      department: 'Computer Science & Engineering',
      college: 'National Institute',
      graduationYear: 2026,
      currentSemester: 7,
      cgpa: 8.85,
      visibility: 'Recruiter-visible',
      skills: ['React 19', 'FastAPI'],
      projects: [],
      certifications: [],
      achievements: [],
    };

    render(
      <PublicProfilePreviewModal
        isOpen={true}
        onClose={vi.fn()}
        previewData={mockPreviewData}
      />
    );

    expect(screen.getByText(/Corporate Recruiter Profile Preview/i)).toBeInTheDocument();
    expect(screen.getByText(/Recruiter View Simulation:/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Aarav Sharma/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/8.85/i)).toBeInTheDocument();
  });
});
