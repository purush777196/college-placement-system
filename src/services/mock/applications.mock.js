/**
 * Mock Applications Service
 * Illustrative student job applications workflow.
 */
const delay = (ms = 180) => new Promise((resolve) => setTimeout(resolve, ms));

export const MOCK_APPLICATIONS = [
  {
    id: 'APP-901',
    driveId: 'DRV-2026-01',
    companyName: 'Google Cloud India',
    roleTitle: 'Cloud Solutions Engineer',
    packageLPA: 32.5,
    appliedAt: '2026-11-01',
    currentStage: 'Technical Interview Round 1',
    status: 'In Progress',
    badgeVariant: 'warning',
    timeline: [
      { step: 'Applied', date: '2026-11-01', completed: true },
      { step: 'Resume Shortlisted', date: '2026-11-03', completed: true },
      { step: 'Coding Assessment', date: '2026-11-04', completed: true },
      { step: 'Technical Round 1', date: '2026-11-06', completed: false, current: true },
      { step: 'Final HR Discussion', date: 'Pending', completed: false },
    ],
  },
  {
    id: 'APP-902',
    driveId: 'DRV-2026-02',
    companyName: 'NovaTech Global Inc.',
    roleTitle: 'Full-Stack Software Engineer',
    packageLPA: 18.5,
    appliedAt: '2026-10-28',
    currentStage: 'Offer Rolled Out',
    status: 'Offer Received',
    badgeVariant: 'success',
    timeline: [
      { step: 'Applied', date: '2026-10-28', completed: true },
      { step: 'Resume Shortlisted', date: '2026-10-29', completed: true },
      { step: 'Technical Evaluation', date: '2026-10-31', completed: true },
      { step: 'HR Leadership Round', date: '2026-11-02', completed: true },
      { step: 'Official Offer Letter', date: '2026-11-04', completed: true },
    ],
  },
  {
    id: 'APP-903',
    driveId: 'DRV-2026-03',
    companyName: 'Microsoft IDC',
    roleTitle: 'Software Development Engineer I',
    packageLPA: 28.0,
    appliedAt: '2026-10-20',
    currentStage: 'Online Assessment Evaluated',
    status: 'Shortlisted',
    badgeVariant: 'info',
    timeline: [
      { step: 'Applied', date: '2026-10-20', completed: true },
      { step: 'Online Assessment', date: '2026-10-24', completed: true },
      { step: 'Shortlisted for Interview', date: '2026-10-29', completed: true },
      { step: 'Interview Panel', date: 'Scheduled Nov 14', completed: false, current: true },
    ],
  },
];

export const applicationsMockService = {
  async getStudentApplications(_studentId = 'std_01') {
    await delay();
    return {
      data: MOCK_APPLICATIONS,
      total: MOCK_APPLICATIONS.length,
    };
  },

  async applyToDrive(driveId, _studentId = 'std_01') {
    await delay();
    return {
      success: true,
      message: 'Application submitted successfully to placement drive!',
      applicationId: `APP-${Math.floor(1000 + Math.random() * 9000)}`,
      driveId,
    };
  },

  async withdrawApplication(applicationId) {
    await delay();
    return {
      success: true,
      message: `Application ${applicationId} withdrawn.`,
    };
  },
};

