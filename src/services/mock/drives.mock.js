/**
 * Mock Placement Drives Service
 * Illustrative recruitment drives data and workflows.
 */
const delay = (ms = 180) => new Promise((resolve) => setTimeout(resolve, ms));

export const MOCK_DRIVES = [
  {
    id: 'DRV-2026-01',
    companyName: 'Google Cloud India',
    companyLogo: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=80',
    roleTitle: 'Cloud Solutions Engineer',
    packageLPA: 32.5,
    packageBreakup: '28 LPA Base + 4.5 LPA Retention Bonus',
    minCGPA: 8.0,
    allowedBranches: ['CSE', 'IT', 'ECE'],
    deadline: '2026-11-20',
    driveDate: '2026-11-28',
    location: 'Bengaluru / Hybrid',
    vacancies: 15,
    appliedCount: 142,
    shortlistedCount: 38,
    status: 'Applications Open',
    eligibilityNotes: 'No active backlogs allowed. 75%+ in 10th and 12th standard.',
  },
  {
    id: 'DRV-2026-02',
    companyName: 'NovaTech Global Inc.',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=80',
    roleTitle: 'Full-Stack Software Engineer',
    packageLPA: 18.5,
    packageBreakup: '16 LPA Fixed + 2.5 LPA Performance Bonus',
    minCGPA: 7.5,
    allowedBranches: ['CSE', 'IT'],
    deadline: '2026-11-15',
    driveDate: '2026-11-22',
    location: 'Pune / Remote',
    vacancies: 20,
    appliedCount: 210,
    shortlistedCount: 45,
    status: 'Applications Open',
    eligibilityNotes: 'Proficiency in React, Node.js and SQL database modeling required.',
  },
  {
    id: 'DRV-2026-03',
    companyName: 'Microsoft IDC',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=80',
    roleTitle: 'Software Development Engineer I (SDE 1)',
    packageLPA: 28.0,
    packageBreakup: '24 LPA Base + Stock Grants',
    minCGPA: 8.5,
    allowedBranches: ['CSE', 'IT', 'ECE', 'EEE'],
    deadline: '2026-11-08',
    driveDate: '2026-11-14',
    location: 'Hyderabad',
    vacancies: 25,
    appliedCount: 380,
    shortlistedCount: 60,
    status: 'Shortlisting in Progress',
    eligibilityNotes: 'Must clear online coding round on DSA and System Fundamentals.',
  },
  {
    id: 'DRV-2026-04',
    companyName: 'Amazon Web Services',
    companyLogo: 'https://images.unsplash.com/photo-1523474255658-4af61b1684c4?w=80',
    roleTitle: 'Associate Solutions Architect',
    packageLPA: 30.0,
    packageBreakup: '26 LPA Fixed + 4 LPA Sign-on Bonus',
    minCGPA: 8.0,
    allowedBranches: ['CSE', 'IT', 'ECE'],
    deadline: '2026-11-25',
    driveDate: '2026-12-05',
    location: 'Bengaluru',
    vacancies: 18,
    appliedCount: 165,
    shortlistedCount: 0,
    status: 'Upcoming',
    eligibilityNotes: 'Cloud certifications (AWS Certified Solutions Architect) preferred.',
  },
];

export const drivesMockService = {
  async getDrives(filters = {}) {
    await delay();
    let result = [...MOCK_DRIVES];

    if (filters.status && filters.status !== 'all') {
      result = result.filter((d) => d.status.toLowerCase() === filters.status.toLowerCase());
    }

    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (d) =>
          d.companyName.toLowerCase().includes(q) ||
          d.roleTitle.toLowerCase().includes(q) ||
          d.location.toLowerCase().includes(q)
      );
    }

    return {
      data: result,
      total: result.length,
    };
  },

  async getDriveById(id) {
    await delay();
    const drive = MOCK_DRIVES.find((d) => d.id === id);
    if (!drive) throw new Error(`Drive with ID ${id} not found`);
    return drive;
  },

  async checkEligibility(driveId, studentCGPA = 8.85) {
    await delay(100);
    const drive = MOCK_DRIVES.find((d) => d.id === driveId);
    if (!drive) return { eligible: false, reason: 'Drive not found' };
    const eligible = studentCGPA >= drive.minCGPA;
    return {
      eligible,
      reason: eligible
        ? 'You meet all academic criteria (CGPA & Branch)'
        : `Minimum required CGPA is ${drive.minCGPA}, your CGPA is ${studentCGPA}`,
    };
  },
};

