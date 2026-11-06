/**
 * Mock Students Service
 * Comprehensive student dataset, profile metrics, education history, skills,
 * projects, certifications, dynamic profile completeness engine, and public preview.
 */

import { MOCK_DRIVES } from './drives.mock';

const delay = (ms = 180) => new Promise((resolve) => setTimeout(resolve, ms));

export const INITIAL_STUDENT_PROFILE = {
  id: 'STD-2022-001',
  studentId: 'STD-2022-001',
  fullName: 'Aarav Sharma',
  name: 'Aarav Sharma',
  email: 'aarav.sharma@campus.edu',
  phone: '+91 98765 43210',
  dob: '2004-05-14',
  gender: 'Male',
  address: '402, Nilgiri Heights, Outer Ring Road, Bellandur',
  city: 'Bengaluru',
  state: 'Karnataka',
  pincode: '560103',
  linkedinUrl: 'https://linkedin.com/in/aarav-sharma-dev',
  githubUrl: 'https://github.com/aaravsharma',
  portfolioUrl: 'https://aaravsharma.dev',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
  bio: 'Final-year Computer Science student passionate about distributed systems, microservices, and React 19 web platforms. Experienced in containerized cloud architectures and full-stack development.',

  // Academic Records
  college: 'National Institute of Engineering & Technology',
  rollNumber: '22CS014',
  department: 'Computer Science & Engineering',
  degree: 'B.Tech in Computer Science & Engineering',
  batch: '2022 - 2026',
  academicYear: 'Final Year (7th Semester)',
  currentSemester: 7,
  graduationYear: 2026,
  admissionYear: 2022,
  cgpa: 8.85,
  cgpaScale: 10.0,
  totalBacklogs: 0,
  activeBacklogs: 0,
  placementStatus: 'Eligible & Shortlisted',
  standingTitle: 'Exemplary Standing (First Class with Distinction)',
  tierEligibility: 'Tier-1 & Super Dream Eligible',

  // Education History
  education: [
    {
      id: 'edu-1',
      institution: 'National Institute of Engineering & Technology',
      qualification: 'B.Tech / B.E. (Undergraduate)',
      board: 'State Technical University',
      startYear: 2022,
      endYear: 2026,
      scoreType: 'CGPA',
      score: '8.85',
      current: true,
    },
    {
      id: 'edu-2',
      institution: 'Delhi Public School, R.K. Puram',
      qualification: 'Senior Secondary (Class XII / Intermediate)',
      board: 'CBSE',
      startYear: 2020,
      endYear: 2022,
      scoreType: 'Percentage',
      score: '94.6',
      current: false,
    },
    {
      id: 'edu-3',
      institution: "St. Xavier's High School",
      qualification: 'Secondary School (Class X / SSC)',
      board: 'CBSE',
      startYear: 2018,
      endYear: 2020,
      scoreType: 'Percentage',
      score: '96.2',
      current: false,
    },
  ],

  // Categorized Skills with Proficiency Levels
  skills: [
    { id: 'sk-1', name: 'React 19', category: 'Frontend Technologies', proficiency: 'Expert' },
    { id: 'sk-2', name: 'JavaScript / JSX', category: 'Frontend Technologies', proficiency: 'Expert' },
    { id: 'sk-3', name: 'Tailwind CSS v4', category: 'Frontend Technologies', proficiency: 'Advanced' },
    { id: 'sk-4', name: 'Python', category: 'Programming Languages', proficiency: 'Advanced' },
    { id: 'sk-5', name: 'Node.js', category: 'Backend Technologies', proficiency: 'Advanced' },
    { id: 'sk-6', name: 'FastAPI', category: 'Backend Technologies', proficiency: 'Intermediate' },
    { id: 'sk-7', name: 'PostgreSQL', category: 'Databases', proficiency: 'Advanced' },
    { id: 'sk-8', name: 'Redis', category: 'Databases', proficiency: 'Intermediate' },
    { id: 'sk-9', name: 'Docker', category: 'Cloud & DevOps', proficiency: 'Advanced' },
    { id: 'sk-10', name: 'Kubernetes', category: 'Cloud & DevOps', proficiency: 'Intermediate' },
    { id: 'sk-11', name: 'Data Structures & Algorithms', category: 'Programming Languages', proficiency: 'Expert' },
    { id: 'sk-12', name: 'Git & GitHub', category: 'Tools & Platforms', proficiency: 'Expert' },
    { id: 'sk-13', name: 'Technical Leadership', category: 'Soft Skills', proficiency: 'Advanced' },
  ],

  // Projects
  projects: [
    {
      id: 'proj-1',
      title: 'CampusConnect Placement Automation Portal',
      description: 'Engineered a modern SaaS platform automating university placement drives, candidate eligibility evaluation, multi-round interview tracking, and administrative governance.',
      technologies: ['React 19', 'Tailwind CSS v4', 'Zustand v5', 'Vite', 'Chart.js'],
      projectType: 'Academic Capstone',
      githubUrl: 'https://github.com/aaravsharma/campusconnect',
      liveUrl: 'https://campusconnect-demo.vercel.app',
      startDate: '2026-08-01',
      endDate: '2026-11-04',
      status: 'Completed',
    },
    {
      id: 'proj-2',
      title: 'Distributed Real-Time Telemetry Pipeline',
      description: 'Constructed an event-driven telemetry stream processing 50,000 requests/sec with Kafka, Redis Pub/Sub, and Prometheus metrics visualizer.',
      technologies: ['Go', 'Kafka', 'Redis', 'Docker', 'Prometheus'],
      projectType: 'Open Source',
      githubUrl: 'https://github.com/aaravsharma/telemetry-stream',
      liveUrl: 'https://telemetry.aaravsharma.dev',
      startDate: '2025-12-01',
      endDate: '2026-04-15',
      status: 'Completed',
    },
    {
      id: 'proj-3',
      title: 'Autonomous Drone Flight Path Simulator',
      description: 'Simulated 3D obstacle avoidance algorithms using A* search and Bezier trajectory smoothing in ROS2 simulation environments.',
      technologies: ['Python', 'C++', 'ROS2', 'NumPy'],
      projectType: 'Research Project',
      githubUrl: 'https://github.com/aaravsharma/drone-path-sim',
      startDate: '2025-06-10',
      endDate: '2025-10-20',
      status: 'Completed',
    },
  ],

  // Achievements
  achievements: [
    {
      id: 'ach-1',
      title: '1st Place Winner – National Smart Campus Hackathon 2025',
      issuingOrganization: 'Ministry of Education & AICTE',
      date: '2025-09-18',
      description: 'Won ₹1,00,000 grand prize for architecting an institutional interview scheduler that eliminated campus schedule collisions by 40%.',
      credentialUrl: 'https://smartcampushack.org/certificates/WIN-2025-992',
    },
    {
      id: 'ach-2',
      title: "Dean's Academic Excellence Honor Roll (Semesters 1-6)",
      issuingOrganization: 'National Institute of Engineering & Technology',
      date: '2025-07-01',
      description: 'Awarded to candidates maintaining CGPA > 8.5 consistently across all academic semesters.',
      credentialUrl: '',
    },
  ],

  // Certifications
  certifications: [
    {
      id: 'cert-1',
      name: 'AWS Certified Solutions Architect – Associate',
      issuingOrganization: 'Amazon Web Services (AWS)',
      issueDate: '2025-04-10',
      expirationDate: '2028-04-10',
      credentialId: 'AWS-SAA-8849204',
      credentialUrl: 'https://aws.amazon.com/verification/AWS-SAA-8849204',
    },
    {
      id: 'cert-2',
      name: 'Meta Certified Frontend Developer Professional',
      issuingOrganization: 'Meta / Coursera',
      issueDate: '2024-09-22',
      expirationDate: '2027-09-22',
      credentialId: 'META-FE-772910',
      credentialUrl: 'https://coursera.org/verify/professional-cert/META-FE-772910',
    },
  ],

  // Document metadata reference
  documents: {
    resumeStatus: 'Uploaded & Verified',
    documentName: 'Aarav_Sharma_SDE_Resume_2026.pdf',
    lastUpdated: '2026-11-04',
    fileSize: '420 KB',
    completenessStatus: 'Verified by TPO Cell',
    atsScoreEstimate: 92,
  },

  // Visibility configuration
  visibility: 'Recruiter-visible', // 'Private' | 'College only' | 'Recruiter-visible'
  profileCompletion: 85,
  updatedAt: new Date().toISOString(),
};

// In-memory active session state
let sessionStudentProfile = JSON.parse(JSON.stringify(INITIAL_STUDENT_PROFILE));

export const MOCK_STUDENTS = [
  {
    ...INITIAL_STUDENT_PROFILE,
    profileCompletion: 85,
    offersCount: 1,
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
    cgpa: 9.2,
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
    cgpa: 8.4,
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
  /**
   * 1. Get complete student profile
   */
  async getStudentProfile(_studentId = 'std_01') {
    await delay();
    const completion = this.calculateProfileCompletion(sessionStudentProfile);
    return {
      ...sessionStudentProfile,
      profileCompletion: completion.percentage,
      completionReport: completion,
    };
  },

  /**
   * 2. Update general profile fields
   */
  async updateStudentProfile(_studentId = 'std_01', updates = {}) {
    await delay();
    sessionStudentProfile = {
      ...sessionStudentProfile,
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    const completion = this.calculateProfileCompletion(sessionStudentProfile);
    sessionStudentProfile.profileCompletion = completion.percentage;
    return {
      success: true,
      data: sessionStudentProfile,
      completion,
    };
  },

  /**
   * 3. Update personal contact information
   */
  async updatePersonalInformation(_studentId = 'std_01', personalInfo = {}) {
    await delay();
    // Validate email cannot be maliciously altered
    const safeInfo = { ...personalInfo };
    delete safeInfo.email; // email is read-only in this phase

    sessionStudentProfile = {
      ...sessionStudentProfile,
      ...safeInfo,
      name: safeInfo.fullName || sessionStudentProfile.name,
      updatedAt: new Date().toISOString(),
    };

    const completion = this.calculateProfileCompletion(sessionStudentProfile);
    sessionStudentProfile.profileCompletion = completion.percentage;

    return {
      success: true,
      message: 'Personal information updated successfully',
      data: sessionStudentProfile,
      completion,
    };
  },

  /**
   * 4. Update academic records
   */
  async updateAcademicInformation(_studentId = 'std_01', academicInfo = {}) {
    await delay();

    if (academicInfo.activeBacklogs > academicInfo.totalBacklogs) {
      throw new Error('Active backlogs cannot exceed total historical backlogs');
    }

    if (academicInfo.cgpa > (academicInfo.cgpaScale || 10.0)) {
      throw new Error('CGPA cannot exceed configured maximum scale');
    }

    sessionStudentProfile = {
      ...sessionStudentProfile,
      ...academicInfo,
      cgpa: parseFloat(academicInfo.cgpa),
      totalBacklogs: parseInt(academicInfo.totalBacklogs, 10),
      activeBacklogs: parseInt(academicInfo.activeBacklogs, 10),
      currentSemester: parseInt(academicInfo.currentSemester, 10),
      graduationYear: parseInt(academicInfo.graduationYear, 10),
      updatedAt: new Date().toISOString(),
    };

    const completion = this.calculateProfileCompletion(sessionStudentProfile);
    sessionStudentProfile.profileCompletion = completion.percentage;

    return {
      success: true,
      message: 'Academic information updated successfully',
      data: sessionStudentProfile,
      completion,
    };
  },

  /**
   * 5. Get education history records
   */
  async getEducationHistory(_studentId = 'std_01') {
    await delay();
    return {
      data: [...(sessionStudentProfile.education || [])],
      total: sessionStudentProfile.education?.length || 0,
    };
  },

  /**
   * 6. Add education record
   */
  async addEducation(_studentId = 'std_01', educationData = {}) {
    await delay();

    if (educationData.startYear > educationData.endYear) {
      throw new Error('Start year cannot be after graduation year');
    }

    const newRecord = {
      id: `edu-${Date.now()}`,
      ...educationData,
      startYear: parseInt(educationData.startYear, 10),
      endYear: parseInt(educationData.endYear, 10),
    };

    sessionStudentProfile.education = [
      newRecord,
      ...(sessionStudentProfile.education || []),
    ];
    sessionStudentProfile.updatedAt = new Date().toISOString();

    const completion = this.calculateProfileCompletion(sessionStudentProfile);
    sessionStudentProfile.profileCompletion = completion.percentage;

    return {
      success: true,
      message: 'Education milestone added successfully',
      data: newRecord,
      allRecords: sessionStudentProfile.education,
      completion,
    };
  },

  /**
   * 7. Update existing education record
   */
  async updateEducation(_studentId = 'std_01', educationId, educationData = {}) {
    await delay();
    const index = sessionStudentProfile.education?.findIndex((e) => e.id === educationId);
    if (index === -1 || index === undefined) {
      throw new Error(`Education record ${educationId} not found`);
    }

    if (educationData.startYear > educationData.endYear) {
      throw new Error('Start year cannot be after graduation year');
    }

    sessionStudentProfile.education[index] = {
      ...sessionStudentProfile.education[index],
      ...educationData,
      id: educationId,
      startYear: parseInt(educationData.startYear, 10),
      endYear: parseInt(educationData.endYear, 10),
    };

    sessionStudentProfile.updatedAt = new Date().toISOString();
    const completion = this.calculateProfileCompletion(sessionStudentProfile);
    sessionStudentProfile.profileCompletion = completion.percentage;

    return {
      success: true,
      message: 'Education milestone updated',
      data: sessionStudentProfile.education[index],
      allRecords: sessionStudentProfile.education,
      completion,
    };
  },

  /**
   * 8. Delete education record
   */
  async deleteEducation(_studentId = 'std_01', educationId) {
    await delay();
    sessionStudentProfile.education = (sessionStudentProfile.education || []).filter(
      (e) => e.id !== educationId
    );
    sessionStudentProfile.updatedAt = new Date().toISOString();
    const completion = this.calculateProfileCompletion(sessionStudentProfile);
    sessionStudentProfile.profileCompletion = completion.percentage;

    return {
      success: true,
      message: 'Education milestone removed',
      allRecords: sessionStudentProfile.education,
      completion,
    };
  },

  /**
   * 9. Get student skills
   */
  async getStudentSkills(_studentId = 'std_01') {
    await delay();
    return {
      data: [...(sessionStudentProfile.skills || [])],
      total: sessionStudentProfile.skills?.length || 0,
    };
  },

  /**
   * 10. Add student skill (prevents duplicates)
   */
  async addStudentSkill(_studentId = 'std_01', skillData = {}) {
    await delay();
    const skillName = skillData.name?.trim();
    if (!skillName) {
      throw new Error('Skill name cannot be empty');
    }

    // Check duplicate skill case-insensitively
    const exists = (sessionStudentProfile.skills || []).some(
      (s) => s.name.toLowerCase() === skillName.toLowerCase()
    );
    if (exists) {
      throw new Error(`Skill '${skillName}' already exists in your profile`);
    }

    const newSkill = {
      id: `sk-${Date.now()}`,
      name: skillName,
      category: skillData.category || 'Programming Languages',
      proficiency: skillData.proficiency || 'Intermediate',
    };

    sessionStudentProfile.skills = [...(sessionStudentProfile.skills || []), newSkill];
    sessionStudentProfile.updatedAt = new Date().toISOString();

    const completion = this.calculateProfileCompletion(sessionStudentProfile);
    sessionStudentProfile.profileCompletion = completion.percentage;

    return {
      success: true,
      message: `Skill '${skillName}' added successfully`,
      data: newSkill,
      allSkills: sessionStudentProfile.skills,
      completion,
    };
  },

  /**
   * 11. Remove student skill
   */
  async removeStudentSkill(_studentId = 'std_01', skillId) {
    await delay();
    sessionStudentProfile.skills = (sessionStudentProfile.skills || []).filter(
      (s) => s.id !== skillId && s.name !== skillId
    );
    sessionStudentProfile.updatedAt = new Date().toISOString();

    const completion = this.calculateProfileCompletion(sessionStudentProfile);
    sessionStudentProfile.profileCompletion = completion.percentage;

    return {
      success: true,
      message: 'Skill removed from profile',
      allSkills: sessionStudentProfile.skills,
      completion,
    };
  },

  /**
   * 12. Update skill proficiency level
   */
  async updateSkillProficiency(_studentId = 'std_01', skillId, proficiency) {
    await delay();
    const skill = (sessionStudentProfile.skills || []).find((s) => s.id === skillId);
    if (!skill) {
      throw new Error(`Skill ${skillId} not found`);
    }

    skill.proficiency = proficiency;
    sessionStudentProfile.updatedAt = new Date().toISOString();

    return {
      success: true,
      message: `Proficiency updated to ${proficiency}`,
      data: skill,
      allSkills: sessionStudentProfile.skills,
    };
  },

  /**
   * 13. Get student projects
   */
  async getStudentProjects(_studentId = 'std_01') {
    await delay();
    return {
      data: [...(sessionStudentProfile.projects || [])],
      total: sessionStudentProfile.projects?.length || 0,
    };
  },

  /**
   * 14. Add project
   */
  async addStudentProject(_studentId = 'std_01', projectData = {}) {
    await delay();

    if (projectData.startDate && projectData.endDate) {
      if (new Date(projectData.startDate) > new Date(projectData.endDate)) {
        throw new Error('Project start date cannot be after end date');
      }
    }

    const newProject = {
      id: `proj-${Date.now()}`,
      title: projectData.title,
      description: projectData.description,
      technologies: Array.isArray(projectData.technologies)
        ? projectData.technologies
        : (projectData.technologies || '').split(',').map((t) => t.trim()).filter(Boolean),
      projectType: projectData.projectType || 'Personal',
      githubUrl: projectData.githubUrl || '',
      liveUrl: projectData.liveUrl || '',
      startDate: projectData.startDate || new Date().toISOString().split('T')[0],
      endDate: projectData.endDate || '',
      status: projectData.status || 'Completed',
    };

    sessionStudentProfile.projects = [newProject, ...(sessionStudentProfile.projects || [])];
    sessionStudentProfile.updatedAt = new Date().toISOString();

    const completion = this.calculateProfileCompletion(sessionStudentProfile);
    sessionStudentProfile.profileCompletion = completion.percentage;

    return {
      success: true,
      message: 'Project added to portfolio',
      data: newProject,
      allProjects: sessionStudentProfile.projects,
      completion,
    };
  },

  /**
   * 15. Update project
   */
  async updateStudentProject(_studentId = 'std_01', projectId, projectData = {}) {
    await delay();
    const index = sessionStudentProfile.projects?.findIndex((p) => p.id === projectId);
    if (index === -1 || index === undefined) {
      throw new Error(`Project ${projectId} not found`);
    }

    if (projectData.startDate && projectData.endDate) {
      if (new Date(projectData.startDate) > new Date(projectData.endDate)) {
        throw new Error('Project start date cannot be after end date');
      }
    }

    sessionStudentProfile.projects[index] = {
      ...sessionStudentProfile.projects[index],
      ...projectData,
      id: projectId,
      technologies: Array.isArray(projectData.technologies)
        ? projectData.technologies
        : (projectData.technologies || '').split(',').map((t) => t.trim()).filter(Boolean),
    };

    sessionStudentProfile.updatedAt = new Date().toISOString();
    const completion = this.calculateProfileCompletion(sessionStudentProfile);
    sessionStudentProfile.profileCompletion = completion.percentage;

    return {
      success: true,
      message: 'Project updated',
      data: sessionStudentProfile.projects[index],
      allProjects: sessionStudentProfile.projects,
      completion,
    };
  },

  /**
   * 16. Delete project
   */
  async deleteStudentProject(_studentId = 'std_01', projectId) {
    await delay();
    sessionStudentProfile.projects = (sessionStudentProfile.projects || []).filter(
      (p) => p.id !== projectId
    );
    sessionStudentProfile.updatedAt = new Date().toISOString();

    const completion = this.calculateProfileCompletion(sessionStudentProfile);
    sessionStudentProfile.profileCompletion = completion.percentage;

    return {
      success: true,
      message: 'Project removed',
      allProjects: sessionStudentProfile.projects,
      completion,
    };
  },

  /**
   * 17. Get student certifications
   */
  async getStudentCertifications(_studentId = 'std_01') {
    await delay();
    return {
      data: [...(sessionStudentProfile.certifications || [])],
      total: sessionStudentProfile.certifications?.length || 0,
    };
  },

  /**
   * 18. Add certification
   */
  async addCertification(_studentId = 'std_01', certData = {}) {
    await delay();

    if (certData.issueDate && certData.expirationDate) {
      if (new Date(certData.issueDate) > new Date(certData.expirationDate)) {
        throw new Error('Issue date cannot be after expiration date');
      }
    }

    const newCert = {
      id: `cert-${Date.now()}`,
      name: certData.name,
      issuingOrganization: certData.issuingOrganization,
      issueDate: certData.issueDate,
      expirationDate: certData.expirationDate || '',
      credentialId: certData.credentialId || '',
      credentialUrl: certData.credentialUrl || '',
    };

    sessionStudentProfile.certifications = [
      newCert,
      ...(sessionStudentProfile.certifications || []),
    ];
    sessionStudentProfile.updatedAt = new Date().toISOString();

    const completion = this.calculateProfileCompletion(sessionStudentProfile);
    sessionStudentProfile.profileCompletion = completion.percentage;

    return {
      success: true,
      message: 'Certification recorded',
      data: newCert,
      allCertifications: sessionStudentProfile.certifications,
      completion,
    };
  },

  /**
   * 19. Update certification
   */
  async updateCertification(_studentId = 'std_01', certId, certData = {}) {
    await delay();
    const index = sessionStudentProfile.certifications?.findIndex((c) => c.id === certId);
    if (index === -1 || index === undefined) {
      throw new Error(`Certification ${certId} not found`);
    }

    if (certData.issueDate && certData.expirationDate) {
      if (new Date(certData.issueDate) > new Date(certData.expirationDate)) {
        throw new Error('Issue date cannot be after expiration date');
      }
    }

    sessionStudentProfile.certifications[index] = {
      ...sessionStudentProfile.certifications[index],
      ...certData,
      id: certId,
    };

    sessionStudentProfile.updatedAt = new Date().toISOString();
    const completion = this.calculateProfileCompletion(sessionStudentProfile);
    sessionStudentProfile.profileCompletion = completion.percentage;

    return {
      success: true,
      message: 'Certification updated',
      data: sessionStudentProfile.certifications[index],
      allCertifications: sessionStudentProfile.certifications,
      completion,
    };
  },

  /**
   * 20. Delete certification
   */
  async deleteCertification(_studentId = 'std_01', certId) {
    await delay();
    sessionStudentProfile.certifications = (
      sessionStudentProfile.certifications || []
    ).filter((c) => c.id !== certId);
    sessionStudentProfile.updatedAt = new Date().toISOString();

    const completion = this.calculateProfileCompletion(sessionStudentProfile);
    sessionStudentProfile.profileCompletion = completion.percentage;

    return {
      success: true,
      message: 'Certification removed',
      allCertifications: sessionStudentProfile.certifications,
      completion,
    };
  },

  /**
   * 20b. Get student achievements
   */
  async getStudentAchievements(_studentId = 'std_01') {
    await delay();
    return sessionStudentProfile.achievements || [];
  },

  /**
   * 20c. Add achievement
   */
  async addAchievement(_studentId = 'std_01', achievementData = {}) {
    await delay();
    const newAchievement = {
      ...achievementData,
      id: `ach-${Date.now()}`,
    };
    if (!sessionStudentProfile.achievements) {
      sessionStudentProfile.achievements = [];
    }
    sessionStudentProfile.achievements.push(newAchievement);
    sessionStudentProfile.updatedAt = new Date().toISOString();

    return {
      success: true,
      message: 'Achievement added successfully',
      data: newAchievement,
      allAchievements: sessionStudentProfile.achievements,
    };
  },

  /**
   * 20d. Delete achievement
   */
  async deleteAchievement(_studentId = 'std_01', achievementId) {
    await delay();
    sessionStudentProfile.achievements = (
      sessionStudentProfile.achievements || []
    ).filter((a) => a.id !== achievementId);
    sessionStudentProfile.updatedAt = new Date().toISOString();

    return {
      success: true,
      message: 'Achievement removed',
      allAchievements: sessionStudentProfile.achievements,
    };
  },

  /**
   * 21. Profile Completeness Engine
   * Calculates overall percentage, section breakdowns, and actionable suggestions
   */
  calculateProfileCompletion(profile = sessionStudentProfile) {
    const missing = [];
    let personalScore = 0;
    const personalMax = 15;

    // Personal info checks (15%)
    if (profile.fullName && profile.fullName.trim().length >= 2) personalScore += 3;
    if (profile.phone && profile.phone.trim().length >= 10) personalScore += 3;
    if (profile.dob) personalScore += 3;
    if (profile.city && profile.state) personalScore += 3;
    if (profile.address && profile.pincode) personalScore += 3;
    if (personalScore < personalMax) {
      missing.push({
        section: 'Personal Details',
        action: 'Complete your residential address and contact information',
      });
    }

    // Academic records (20%)
    let academicScore = 0;
    const academicMax = 20;
    if (profile.college) academicScore += 4;
    if (profile.rollNumber) academicScore += 4;
    if (profile.degree && profile.department) academicScore += 4;
    if (profile.cgpa !== undefined && profile.cgpa > 0) academicScore += 4;
    if (profile.currentSemester && profile.graduationYear) academicScore += 4;
    if (academicScore < academicMax) {
      missing.push({
        section: 'Academic Information',
        action: 'Fill in your current semester, roll number, and verified CGPA',
      });
    }

    // Education milestones (15%)
    let educationScore = 0;
    const educationMax = 15;
    const eduCount = profile.education?.length || 0;
    if (eduCount >= 2) {
      educationScore = 15;
    } else if (eduCount === 1) {
      educationScore = 10;
      missing.push({
        section: 'Education History',
        action: 'Add your 12th/Intermediate or secondary school qualification',
      });
    } else {
      missing.push({
        section: 'Education History',
        action: 'Add your undergraduate degree and high school records',
      });
    }

    // Skills (15%)
    let skillsScore = 0;
    const skillsMax = 15;
    const skillCount = profile.skills?.length || 0;
    if (skillCount >= 6) {
      skillsScore = 15;
    } else if (skillCount >= 3) {
      skillsScore = 10;
      missing.push({
        section: 'Technical Skills',
        action: 'Add 3 more technical skills or frameworks to hit Tier-1 cutoff standards',
      });
    } else if (skillCount >= 1) {
      skillsScore = 5;
      missing.push({
        section: 'Technical Skills',
        action: 'Add at least 5 technical skills to qualify for automated corporate screening',
      });
    } else {
      missing.push({
        section: 'Technical Skills',
        action: 'Add your primary programming languages and technologies',
      });
    }

    // Projects (15%)
    let projectsScore = 0;
    const projectsMax = 15;
    const projCount = profile.projects?.length || 0;
    if (projCount >= 2) {
      projectsScore = 15;
    } else if (projCount === 1) {
      projectsScore = 10;
      missing.push({
        section: 'Projects Portfolio',
        action: 'Add a second software engineering or capstone project to boost ATS ranking',
      });
    } else {
      missing.push({
        section: 'Projects Portfolio',
        action: 'Showcase at least 2 real-world projects with GitHub repository links',
      });
    }

    // Certifications (10%)
    let certScore = 0;
    const certMax = 10;
    const certCount = profile.certifications?.length || 0;
    if (certCount >= 1) {
      certScore = 10;
    } else {
      missing.push({
        section: 'Certifications',
        action: 'Upload at least 1 industry certification (AWS, Google Cloud, Meta, etc.)',
      });
    }

    // Document reference (10%)
    let documentScore = 0;
    const documentMax = 10;
    if (profile.documents?.documentName && profile.documents?.resumeStatus) {
      documentScore = 10;
    } else {
      missing.push({
        section: 'Resume Reference',
        action: 'Attach a primary placement resume metadata record',
      });
    }

    const totalScore =
      personalScore +
      academicScore +
      educationScore +
      skillsScore +
      projectsScore +
      certScore +
      documentScore;

    return {
      percentage: Math.min(100, Math.round(totalScore)),
      sections: {
        personal: { score: personalScore, max: personalMax, percentage: Math.round((personalScore / personalMax) * 100) },
        academic: { score: academicScore, max: academicMax, percentage: Math.round((academicScore / academicMax) * 100) },
        education: { score: educationScore, max: educationMax, percentage: Math.round((educationScore / educationMax) * 100) },
        skills: { score: skillsScore, max: skillsMax, percentage: Math.round((skillsScore / skillsMax) * 100) },
        projects: { score: projectsScore, max: projectsMax, percentage: Math.round((projectsScore / projectsMax) * 100) },
        certifications: { score: certScore, max: certMax, percentage: Math.round((certScore / certMax) * 100) },
        documents: { score: documentScore, max: documentMax, percentage: Math.round((documentScore / documentMax) * 100) },
      },
      missingItems: missing,
      isPlacementReady: totalScore >= 75,
    };
  },

  /**
   * 22. Update Profile Visibility (Simulation)
   */
  async updateProfileVisibility(_studentId = 'std_01', visibility) {
    await delay();
    const valid = ['Private', 'College only', 'Recruiter-visible'];
    if (!valid.includes(visibility)) {
      throw new Error(`Invalid visibility: ${visibility}. Must be one of ${valid.join(', ')}`);
    }

    sessionStudentProfile.visibility = visibility;
    sessionStudentProfile.updatedAt = new Date().toISOString();

    return {
      success: true,
      message: `Profile visibility set to '${visibility}'`,
      visibility,
    };
  },

  /**
   * 23. Public Profile Preview
   * Excludes sensitive personal data (phone, address, pincode, dob)
   */
  async getPublicProfilePreview(_studentId = 'std_01') {
    await delay();
    const full = sessionStudentProfile;

    // Privacy Redaction: remove private phone, residential address, postal code, and DOB
    return {
      id: full.id,
      fullName: full.fullName,
      email: full.email,
      department: full.department,
      degree: full.degree,
      college: full.college,
      batch: full.batch,
      graduationYear: full.graduationYear,
      currentSemester: full.currentSemester,
      cgpa: full.cgpa,
      avatar: full.avatar,
      bio: full.bio,
      visibility: full.visibility,
      linkedinUrl: full.linkedinUrl,
      githubUrl: full.githubUrl,
      portfolioUrl: full.portfolioUrl,
      education: full.education,
      skills: full.skills,
      projects: full.projects,
      certifications: full.certifications,
      achievements: full.achievements,
      // EXPLICITLY OMITTED FOR PRIVACY:
      // phone: undefined,
      // dob: undefined,
      // address: undefined,
      // pincode: undefined,
    };
  },

  // Backward compatibility methods for Phase 0, 1, 2, 3
  async getStudents(filters = {}) {
    await delay();
    let result = [...MOCK_STUDENTS];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.rollNumber?.toLowerCase().includes(q) ||
          s.department?.toLowerCase().includes(q)
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
    const student = MOCK_STUDENTS.find(
      (s) => s.id === id || s.studentId === id || s.email === id || (id === 'std_01' && s.id === 'STD-2022-001')
    );
    if (!student) {
      throw new Error(`Student ${id} not found.`);
    }
    return student;
  },

  async getStudentDashboard(_studentId = 'std_01') {
    await delay();
    const student = sessionStudentProfile;
    const eligibleDrives = MOCK_DRIVES.filter(
      (d) => d.minCGPA <= student.cgpa && d.status !== 'Deadline Expired'
    );

    return {
      student,
      academicStanding: {
        cgpa: student.cgpa,
        scale: '10.0',
        backlogs: student.activeBacklogs || 0,
        standingTitle: student.standingTitle || 'Exemplary Standing (First Class with Distinction)',
        tierEligibility: student.tierEligibility || 'Tier-1 & Super Dream Eligible',
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
        profileCompletionPercentage: student.profileCompletion || 85,
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
      ],
    };
  },

  async getStudentPlacementStats(_studentId = 'std_01') {
    await delay();
    return {
      totalApplications: 6,
      applicationsShortlisted: 3,
      interviewsScheduled: 2,
      offersReceived: 1,
      eligiblePlacementDrives: 8,
      profileCompletionPercentage: sessionStudentProfile.profileCompletion || 85,
    };
  },

  async getStudentProfileSummary(_studentId = 'std_01') {
    await delay();
    const student = sessionStudentProfile;
    return {
      name: student.fullName || student.name,
      email: student.email,
      rollNumber: student.rollNumber,
      department: student.department,
      degree: student.degree,
      batch: student.batch,
      cgpa: student.cgpa,
      skills: (student.skills || []).map((s) => (typeof s === 'string' ? s : s.name)),
      certifications: student.certifications,
      profileCompletion: student.profileCompletion,
    };
  },

  _resetMemory() {
    sessionStudentProfile = JSON.parse(JSON.stringify(INITIAL_STUDENT_PROFILE));
  },
};
