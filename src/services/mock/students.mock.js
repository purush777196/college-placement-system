/**
 * Mock Students Service
 * Illustrative student dataset, profile metrics, and student dashboard aggregations.
 */

import { MOCK_DRIVES } from './drives.mock';

const delay = (ms = 180) => new Promise((resolve) => setTimeout(resolve, ms));

export const MOCK_STUDENTS = [
  {
    id: 'STD-2022-001',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@campus.edu',
    rollNumber: '22CS014',
    department: 'Computer Science & Engineering',
    degree: 'B.Tech in Computer Science',
    batch: '2022 - 2026',
    academicYear: 'Final Year (7th Semester)',
    cgpa: 8.85,
    backlogs: 0,
    placementStatus: 'Eligible & Shortlisted',
    profileCompletion: 85,
    skills: ['React 19', 'Python', 'Node.js', 'PostgreSQL', 'Docker', 'Kubernetes', 'Algorithms', 'FastAPI'],
    certifications: [
      { title: 'AWS Certified Cloud Practitioner', issuer: 'Amazon Web Services', year: 2025 },
      { title: 'Meta Certified Frontend Developer', issuer: 'Coursera / Meta', year: 2024 },
    ],
    offersCount: 1,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    activityTimeline: [
      {
        id: 'act-1',
        title: 'Interview confirmed with Google Cloud India',
        timestamp: '2 hours ago',
        category: 'interview',
        icon: 'calendar',
      },
      {
        id: 'act-2',
        title: 'Job offer received from NovaTech Global Inc. (₹18.5 LPA)',
        timestamp: '2 days ago',
        category: 'offer',
        icon: 'award',
      },
      {
        id: 'act-3',
        title: 'Shortlisted for Microsoft IDC SDE-1 panel',
        timestamp: '4 days ago',
        category: 'shortlist',
        icon: 'check',
      },
      {
        id: 'act-4',
        title: 'New Tier-1 drive announced: Amazon Web Services',
        timestamp: '1 week ago',
        category: 'drive',
        icon: 'briefcase',
      },
    ],
  },
  {
    id: 'STD-2022-002',
    name: 'Rohan Mehra',
    email: 'rohan.mehra@campus.edu',
    rollNumber: '22CS045',
    department: 'Computer Science & Engineering',
    batch: '2026',
    cgpa: 9.20,
    backlogs: 0,
    skills: ['Java', 'Spring Boot', 'AWS', 'Kubernetes'],
    status: 'Placed',
    offersCount: 2,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
  },
  {
    id: 'STD-2022-003',
    name: 'Ananya Verma',
    email: 'ananya.v@campus.edu',
    rollNumber: '22IT012',
    department: 'Information Technology',
    batch: '2026',
    cgpa: 8.40,
    backlogs: 0,
    skills: ['Python', 'Machine Learning', 'TensorFlow', 'Data Science'],
    status: 'Interview Scheduled',
    offersCount: 0,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
  },
  {
    id: 'STD-2022-004',
    name: 'Karthik Rao',
    email: 'karthik.r@campus.edu',
    rollNumber: '22ECE033',
    department: 'Electronics & Communication',
    batch: '2026',
    cgpa: 7.95,
    backlogs: 0,
    skills: ['Embedded C', 'IoT', 'VLSI', 'Python'],
    status: 'Registered',
    offersCount: 0,
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150',
  },
  {
    id: 'STD-2022-005',
    name: 'Sneha Patel',
    email: 'sneha.p@campus.edu',
    rollNumber: '22CS089',
    department: 'Computer Science & Engineering',
    batch: '2026',
    cgpa: 9.45,
    backlogs: 0,
    skills: ['Go', 'Distributed Systems', 'C++', 'System Design'],
    status: 'Placed',
    offersCount: 3,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
  },
];

export const studentsMockService = {
  async getStudents(filters = {}) {
    await delay();
    let result = [...MOCK_STUDENTS];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.rollNumber.toLowerCase().includes(q) ||
          s.department.toLowerCase().includes(q)
      );
    }

    if (filters.department && filters.department !== 'all') {
      result = result.filter((s) => s.department === filters.department);
    }

    if (filters.status && filters.status !== 'all') {
      result = result.filter((s) => s.status === filters.status);
    }

    return {
      data: result,
      total: result.length,
    };
  },

  async getStudentById(id) {
    await delay();
    const student = MOCK_STUDENTS.find((s) => s.id === id || s.email === id);
    if (!student) {
      throw new Error(`Student ${id} not found.`);
    }
    return student;
  },

  /**
   * Aggregate student dashboard profile metrics & standing
   */
  async getStudentDashboard(_studentId = 'std_01') {
    await delay();
    const student = MOCK_STUDENTS[0];

    // Compute eligible drives dynamically
    const eligibleDrives = MOCK_DRIVES.filter(
      (d) => d.minCGPA <= student.cgpa && d.status !== 'Deadline Expired'
    );

    return {
      student,
      academicStanding: {
        cgpa: student.cgpa,
        scale: '10.0',
        backlogs: student.backlogs,
        standingTitle: 'Exemplary Standing (First Class with Distinction)',
        tierEligibility: 'Tier-1 & Super Dream Eligible',
        department: student.department,
        batch: student.batch,
        academicYear: student.academicYear,
      },
      kpis: {
        totalApplications: 6,
        applicationsShortlisted: 3,
        interviewsScheduled: 2,
        offersReceived: 1,
        eligiblePlacementDrives: eligibleDrives.length,
        profileCompletionPercentage: student.profileCompletion,
      },
      announcements: [
        {
          id: 'ann-1',
          title: 'Mandatory Pre-Placement Briefing for Dream Recruiters',
          issuedBy: 'Dr. Ramesh Kulkarni (Head TPO)',
          date: '2026-11-08 at 03:00 PM',
          location: 'Auditorium Hall 2 & Live Stream',
          priority: 'High',
        },
        {
          id: 'ann-2',
          title: 'Resume Freezing Notice for Phase 1 Dream Drives',
          issuedBy: 'Central Placement Office',
          date: 'Deadline: 2026-11-15',
          priority: 'Medium',
        },
      ],
    };
  },

  /**
   * Placement stats KPI numbers for card presentation
   */
  async getStudentPlacementStats(_studentId = 'std_01') {
    await delay();
    return {
      totalApplications: 6,
      applicationsShortlisted: 3,
      interviewsScheduled: 2,
      offersReceived: 1,
      eligiblePlacementDrives: 8,
      profileCompletionPercentage: 85,
    };
  },

  /**
   * Student summary profile information
   */
  async getStudentProfileSummary(_studentId = 'std_01') {
    await delay();
    const student = MOCK_STUDENTS[0];
    return {
      name: student.name,
      email: student.email,
      rollNumber: student.rollNumber,
      department: student.department,
      degree: student.degree,
      batch: student.batch,
      cgpa: student.cgpa,
      skills: student.skills,
      certifications: student.certifications,
      profileCompletion: student.profileCompletion,
    };
  },
};
