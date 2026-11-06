/**
 * Mock Applications & Interviews Service
 * Handles multi-stage application pipeline, interview scheduling, and duplicate checks.
 */

import { MOCK_DRIVES, drivesMockService } from './drives.mock';

const delay = (ms = 180) => new Promise((resolve) => setTimeout(resolve, ms));

export const PIPELINE_STAGES = [
  'Applied',
  'Under Review',
  'Shortlisted',
  'Assessment',
  'Interview',
  'Offered',
  'Rejected',
];

export const INITIAL_APPLICATIONS = [
  {
    id: 'APP-901',
    driveId: 'DRV-2026-08',
    companyName: 'Quantum Dynamics Core',
    roleTitle: 'Embedded Robotics Engineer',
    packageLPA: 14.5,
    appliedAt: '2026-11-01',
    updatedAt: '2026-11-05',
    currentStage: 'Interview',
    status: 'Interview Scheduled',
    badgeVariant: 'warning',
    roundSummary: 'Technical Round 1 scheduled on Nov 12',
    interview: {
      id: 'INT-101',
      round: 'Technical Round 1 (Hardware & Firmware)',
      scheduledAt: '2026-11-12T10:30:00',
      durationMinutes: 60,
      mode: 'Online (Google Meet)',
      meetingUrl: 'https://meet.google.com/cc-quant-emb-101',
      interviewer: 'Siddharth Rao (Principal Embedded Engineer)',
      instructions: 'Please be in a quiet room with IDE open. Live problem solving in C/C++.',
      status: 'Confirmed',
    },
    timeline: [
      { step: 'Applied', date: '2026-11-01', completed: true, note: 'Application submitted with verified transcript' },
      { step: 'Under Review', date: '2026-11-02', completed: true, note: 'TPO verified academic eligibility' },
      { step: 'Shortlisted', date: '2026-11-03', completed: true, note: 'Profile shortlisted for technical evaluation' },
      { step: 'Assessment', date: '2026-11-04', completed: true, note: 'Scored 94/100 on Embedded Systems & DSA' },
      { step: 'Interview', date: '2026-11-05', completed: false, current: true, note: 'Technical Round 1 confirmed for Nov 12' },
      { step: 'Offered', date: 'Pending', completed: false, note: 'Awaiting interview outcomes' },
    ],
  },
  {
    id: 'APP-902',
    driveId: 'DRV-2026-02',
    companyName: 'NovaTech Global Inc.',
    roleTitle: 'Full-Stack Software Engineer',
    packageLPA: 18.5,
    appliedAt: '2026-10-28',
    updatedAt: '2026-11-04',
    currentStage: 'Offered',
    status: 'Offer Received',
    badgeVariant: 'success',
    roundSummary: 'Formal offer rolled out (₹18.5 LPA)',
    offerDetails: {
      packageLPA: 18.5,
      role: 'Full-Stack Software Engineer',
      location: 'Pune / Remote',
      acceptanceDeadline: '2026-11-30',
      letterStatus: 'Generated & Downloadable',
    },
    timeline: [
      { step: 'Applied', date: '2026-10-28', completed: true, note: 'Direct campus registration' },
      { step: 'Under Review', date: '2026-10-29', completed: true, note: 'Automated cutoff check passed' },
      { step: 'Shortlisted', date: '2026-10-30', completed: true, note: 'Selected for hands-on evaluation' },
      { step: 'Assessment', date: '2026-10-31', completed: true, note: 'Built full-stack React + Node feature' },
      { step: 'Interview', date: '2026-11-02', completed: true, note: 'Cleared Technical & HR leadership rounds' },
      { step: 'Offered', date: '2026-11-04', completed: true, current: true, note: 'Official letter issued by campus cell' },
    ],
  },
  {
    id: 'APP-903',
    driveId: 'DRV-2026-03',
    companyName: 'Microsoft IDC',
    roleTitle: 'Software Development Engineer I (SDE 1)',
    packageLPA: 28.0,
    appliedAt: '2026-10-20',
    updatedAt: '2026-10-29',
    currentStage: 'Shortlisted',
    status: 'Shortlisted for Interview',
    badgeVariant: 'info',
    roundSummary: 'Candidate pool shortlisted for final panel',
    interview: {
      id: 'INT-102',
      round: 'Technical Panel 1 (DSA & Low-Level Design)',
      scheduledAt: '2026-11-14T14:00:00',
      durationMinutes: 75,
      mode: 'Online (Microsoft Teams)',
      meetingUrl: 'https://teams.microsoft.com/l/meetup-join/ms-idc-sde-102',
      interviewer: 'Ananya Deshmukh (Partner Software Architect)',
      instructions: 'Review graph algorithms and concurrent queue design patterns.',
      status: 'Confirmed',
    },
    timeline: [
      { step: 'Applied', date: '2026-10-20', completed: true, note: 'Profile entered in Microsoft pool' },
      { step: 'Under Review', date: '2026-10-22', completed: true, note: 'Cutoff verified: 8.85 > 8.5' },
      { step: 'Assessment', date: '2026-10-24', completed: true, note: 'Online coding round: 3/3 problems passed' },
      { step: 'Shortlisted', date: '2026-10-29', completed: true, current: true, note: 'Invited to virtual campus interview panel' },
      { step: 'Interview', date: 'Scheduled Nov 14', completed: false, note: 'Panel round pending' },
      { step: 'Offered', date: 'Pending', completed: false, note: 'Pending final AA review' },
    ],
  },
  {
    id: 'APP-904',
    driveId: 'DRV-2026-05',
    companyName: 'Vertex Digital Labs',
    roleTitle: 'AI/ML Systems Engineer',
    packageLPA: 24.0,
    appliedAt: '2026-11-03',
    updatedAt: '2026-11-05',
    currentStage: 'Under Review',
    status: 'Profile Under Review',
    badgeVariant: 'primary',
    roundSummary: 'Resume and machine learning portfolio under recruiter review',
    timeline: [
      { step: 'Applied', date: '2026-11-03', completed: true, note: 'Applied via placement drive discovery' },
      { step: 'Under Review', date: '2026-11-05', completed: false, current: true, note: 'Technical recruiter evaluating model repositories' },
      { step: 'Shortlisted', date: 'Pending', completed: false },
      { step: 'Assessment', date: 'Pending', completed: false },
      { step: 'Interview', date: 'Pending', completed: false },
      { step: 'Offered', date: 'Pending', completed: false },
    ],
  },
  {
    id: 'APP-905',
    driveId: 'DRV-2026-06',
    companyName: 'Horizon FinTech Group',
    roleTitle: 'Quantitative Software Analyst',
    packageLPA: 22.0,
    appliedAt: '2026-11-04',
    updatedAt: '2026-11-06',
    currentStage: 'Assessment',
    status: 'Online Assessment Active',
    badgeVariant: 'warning',
    roundSummary: 'Quantitative probability challenge window closes Nov 09',
    timeline: [
      { step: 'Applied', date: '2026-11-04', completed: true, note: 'Registered for Horizon campus drive' },
      { step: 'Under Review', date: '2026-11-05', completed: true, note: 'Verified by TPO cell' },
      { step: 'Assessment', date: '2026-11-06', completed: false, current: true, note: 'Assessment invite dispatched to candidate' },
      { step: 'Shortlisted', date: 'Pending', completed: false },
      { step: 'Interview', date: 'Pending', completed: false },
      { step: 'Offered', date: 'Pending', completed: false },
    ],
  },
  {
    id: 'APP-906',
    driveId: 'DRV-2026-07',
    companyName: 'Apex Systems Ltd.',
    roleTitle: 'Cloud DevOps Engineer',
    packageLPA: 16.0,
    appliedAt: '2026-10-10',
    updatedAt: '2026-10-18',
    currentStage: 'Rejected',
    status: 'Application Closed',
    badgeVariant: 'danger',
    roundSummary: 'Assessment benchmark not attained for Linux shell test',
    timeline: [
      { step: 'Applied', date: '2026-10-10', completed: true, note: 'Initial registration' },
      { step: 'Under Review', date: '2026-10-12', completed: true, note: 'Profile screened' },
      { step: 'Assessment', date: '2026-10-15', completed: true, note: 'Completed shell benchmark' },
      { step: 'Rejected', date: '2026-10-18', completed: true, current: true, note: 'Score did not meet cohort threshold' },
    ],
  },
];

// Active in-memory state tracking applications during browser session
let sessionApplications = [...INITIAL_APPLICATIONS];

export const applicationsMockService = {
  /**
   * Fetch applications list for a student with filters & search
   */
  async getStudentApplications(_studentId = 'std_01', filters = {}) {
    await delay();
    let result = [...sessionApplications];

    // Filter by stage/status
    if (filters.stage && filters.stage !== 'all') {
      result = result.filter(
        (app) =>
          app.currentStage.toLowerCase() === filters.stage.toLowerCase() ||
          app.status.toLowerCase().includes(filters.stage.toLowerCase())
      );
    }

    // Filter by company
    if (filters.company && filters.company !== 'all') {
      result = result.filter((app) =>
        app.companyName.toLowerCase().includes(filters.company.toLowerCase())
      );
    }

    // Search query
    if (filters.search && filters.search.trim()) {
      const q = filters.search.trim().toLowerCase();
      result = result.filter(
        (app) =>
          app.companyName.toLowerCase().includes(q) ||
          app.roleTitle.toLowerCase().includes(q) ||
          app.id.toLowerCase().includes(q)
      );
    }

    // Sorting
    if (filters.sortBy === 'oldest') {
      result.sort((a, b) => new Date(a.appliedAt) - new Date(b.appliedAt));
    } else {
      // Default newest
      result.sort((a, b) => new Date(b.appliedAt) - new Date(a.appliedAt));
    }

    return {
      data: result,
      total: result.length,
      pipelineCounts: this._calculatePipelineCounts(sessionApplications),
    };
  },

  /**
   * Get single application details by ID
   */
  async getApplicationDetails(applicationId) {
    await delay();
    const app = sessionApplications.find((a) => a.id === applicationId);
    if (!app) {
      throw new Error(`Application ${applicationId} not found.`);
    }
    return app;
  },

  /**
   * Apply to a placement drive with comprehensive validation:
   * - Checks duplicate application
   * - Checks deadline expiration
   * - Checks eligibility criteria
   */
  async applyToDrive(driveId, _studentId = 'std_01', customNotes = '', studentProfile = null) {
    await delay(250);

    // 1. Prevent duplicate application
    const existing = sessionApplications.find((a) => a.driveId === driveId);
    if (existing) {
      throw new Error(
        `You have already submitted an application to this drive (ID: ${existing.id}). Duplicate submissions are not permitted.`
      );
    }

    // 2. Lookup drive details
    const drive = MOCK_DRIVES.find((d) => d.id === driveId);
    if (!drive) {
      throw new Error(`Placement drive ${driveId} not found.`);
    }

    // 3. Verify deadline
    const today = new Date().toISOString().split('T')[0];
    if (drive.deadline < today || drive.status === 'Deadline Expired') {
      throw new Error(
        'The registration deadline for this placement drive has passed. Applications are no longer accepted.'
      );
    }

    // 4. Verify candidate eligibility
    const studentCgpa = studentProfile?.cgpa ?? 8.85;
    const studentDept = studentProfile?.department ?? 'Computer Science & Engineering';
    const eligibility = drivesMockService._evaluateEligibility(drive, studentCgpa, studentDept);

    if (!eligibility.isEligible) {
      const reasonMsg = eligibility.reasons.join(', ');
      throw new Error(
        `Ineligible for this placement drive: ${reasonMsg || 'Candidate credentials do not meet company cutoffs.'}`
      );
    }

    // Create new application
    const newAppId = `APP-${Math.floor(1000 + Math.random() * 9000)}`;
    const newApplication = {
      id: newAppId,
      driveId: drive.id,
      companyName: drive.companyName,
      roleTitle: drive.roleTitle,
      packageLPA: drive.packageLPA,
      appliedAt: today,
      updatedAt: today,
      currentStage: 'Applied',
      status: 'Application Submitted',
      badgeVariant: 'primary',
      customNotes,
      roundSummary: 'Application received and verified by TPO automation',
      timeline: [
        { step: 'Applied', date: today, completed: true, current: true, note: 'Application registered successfully' },
        { step: 'Under Review', date: 'Pending', completed: false, note: 'TPO verification queued' },
        { step: 'Shortlisted', date: 'Pending', completed: false },
        { step: 'Assessment', date: 'Pending', completed: false },
        { step: 'Interview', date: 'Pending', completed: false },
        { step: 'Offered', date: 'Pending', completed: false },
      ],
    };

    sessionApplications.unshift(newApplication);

    return {
      success: true,
      message: `Your application to ${drive.companyName} for '${drive.roleTitle}' has been recorded.`,
      applicationId: newAppId,
      application: newApplication,
    };
  },

  /**
   * Fetch upcoming interviews for the student
   */
  async getUpcomingInterviews(_studentId = 'std_01') {
    await delay();
    const scheduled = sessionApplications
      .filter((app) => app.interview)
      .map((app) => ({
        ...app.interview,
        applicationId: app.id,
        companyName: app.companyName,
        roleTitle: app.roleTitle,
        packageLPA: app.packageLPA,
      }));

    // Sort by scheduled date
    scheduled.sort((a, b) => new Date(a.scheduledAt) - new Date(b.scheduledAt));

    return {
      data: scheduled,
      total: scheduled.length,
    };
  },

  /**
   * Calculate pipeline stage counts
   */
  _calculatePipelineCounts(apps) {
    const counts = {
      all: apps.length,
      Applied: 0,
      'Under Review': 0,
      Shortlisted: 0,
      Assessment: 0,
      Interview: 0,
      Offered: 0,
      Rejected: 0,
    };

    apps.forEach((app) => {
      if (counts[app.currentStage] !== undefined) {
        counts[app.currentStage] += 1;
      }
    });

    return counts;
  },

  /**
   * Reset in-memory session applications (useful for isolated tests)
   */
  _resetMemory() {
    sessionApplications = [...INITIAL_APPLICATIONS];
  },
};
