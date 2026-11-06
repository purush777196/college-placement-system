/**
 * Mock Placement Drives Service
 * Comprehensive recruitment drives catalog, eligibility calculations, and specifications.
 */

const delay = (ms = 180) => new Promise((resolve) => setTimeout(resolve, ms));

export const MOCK_DRIVES = [
  {
    id: 'DRV-2026-01',
    companyName: 'Google Cloud India',
    companyLogo: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=80',
    roleTitle: 'Cloud Solutions Engineer',
    packageLPA: 32.5,
    packageBreakup: '₹28 LPA Base + ₹4.5 LPA Retention & Sign-on Bonus',
    minCGPA: 8.0,
    allowedBranches: ['Computer Science & Engineering', 'Information Technology', 'Electronics & Communication', 'CSE', 'IT', 'ECE'],
    graduationYear: '2026',
    jobType: 'Full-Time',
    deadline: '2026-11-20',
    driveDate: '2026-11-28',
    location: 'Bengaluru / Hybrid',
    vacancies: 15,
    appliedCount: 142,
    shortlistedCount: 38,
    status: 'Applications Open',
    eligibilityNotes: 'No active backlogs allowed. Minimum 75% in 10th & 12th standard.',
    companyDescription: 'Google Cloud provides organizations with leading infrastructure, platform capabilities, and industry solutions.',
    jobDescription: 'As a Cloud Solutions Engineer, you will build scalable cloud infrastructure, automate deployment pipelines, and partner with enterprise architects to solve distributed systems challenges.',
    responsibilities: [
      'Architect robust multi-region microservice deployments on Google Kubernetes Engine (GKE).',
      'Optimize network latency and cloud observability using Prometheus, Grafana, and Cloud Monitoring.',
      'Implement enterprise security policies and IAM access governance.',
      'Collaborate with global technical solutions teams on customer migration pilots.',
    ],
    requiredSkills: ['Kubernetes', 'Go / Python', 'Docker', 'GCP / Cloud Networking', 'Distributed Systems'],
    compensationDetails: {
      baseSalary: '₹28,00,000',
      performanceBonus: '₹3,00,000',
      relocationBonus: '₹1,50,000',
      healthBenefits: 'Comprehensive family medical coverage (₹10 Lakh)',
      stockGrants: 'Google Alphabet GSU equity units vested over 4 years',
    },
    selectionProcess: [
      { roundNumber: 1, name: 'Online Coding Assessment', format: 'DSA, Algo & Cloud Fundamentals (90 mins)' },
      { roundNumber: 2, name: 'Technical Round 1', format: 'Live System Architecture & Concurrency Problem Solving' },
      { roundNumber: 3, name: 'Technical Round 2', format: 'Linux Internals, Networking Protocols & Code Review' },
      { roundNumber: 4, name: 'Googleyness & Leadership Discussion', format: 'Culture, Values & Behavioral Interview' },
    ],
    importantDates: {
      registrationOpen: '2026-11-01',
      registrationDeadline: '2026-11-20',
      onlineTest: '2026-11-23',
      interviews: '2026-11-28',
      resultsAnnouncement: '2026-12-02',
    },
    applicationInstructions: 'Ensure your college registration number matches your student profile. Resumes must clearly state GitHub repositories and open-source contributions.',
  },
  {
    id: 'DRV-2026-02',
    companyName: 'NovaTech Global Inc.',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=80',
    roleTitle: 'Full-Stack Software Engineer',
    packageLPA: 18.5,
    packageBreakup: '₹16 LPA Fixed + ₹2.5 LPA Annual Performance Bonus',
    minCGPA: 7.5,
    allowedBranches: ['Computer Science & Engineering', 'Information Technology', 'CSE', 'IT'],
    graduationYear: '2026',
    jobType: 'Full-Time',
    deadline: '2026-11-15',
    driveDate: '2026-11-22',
    location: 'Pune / Remote',
    vacancies: 20,
    appliedCount: 210,
    shortlistedCount: 45,
    status: 'Applications Open',
    eligibilityNotes: 'Proficiency in React 19, Node.js, and SQL schema design required.',
    companyDescription: 'NovaTech Global is a high-growth SaaS engineering partner delivering high-velocity fintech and enterprise solutions.',
    jobDescription: 'Build next-generation responsive web interfaces, resilient REST/GraphQL APIs, and asynchronous data workers.',
    responsibilities: [
      'Develop modular component systems with React and modern state stores.',
      'Design clean PostgreSQL relational schemas and query optimizations.',
      'Maintain CI/CD test coverage with automated unit and integration pipelines.',
    ],
    requiredSkills: ['React', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'TypeScript/JavaScript'],
    compensationDetails: {
      baseSalary: '₹16,00,000',
      performanceBonus: '₹2,50,000',
      healthBenefits: 'Group Health Insurance (₹5 Lakh)',
    },
    selectionProcess: [
      { roundNumber: 1, name: 'Frontend & API Assessment', format: 'React + JavaScript hands-on sandbox (120 mins)' },
      { roundNumber: 2, name: 'Technical Code Review', format: 'Component architecture and database design' },
      { roundNumber: 3, name: 'Cultural Fit & HR', format: 'Values alignment and communication' },
    ],
    importantDates: {
      registrationOpen: '2026-10-25',
      registrationDeadline: '2026-11-15',
      onlineTest: '2026-11-18',
      interviews: '2026-11-22',
    },
    applicationInstructions: 'Attach your latest resume and portfolio link demonstrating production frontend projects.',
  },
  {
    id: 'DRV-2026-03',
    companyName: 'Microsoft IDC',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=80',
    roleTitle: 'Software Development Engineer I (SDE 1)',
    packageLPA: 28.0,
    packageBreakup: '₹24 LPA Base + Stock Grants + Performance Award',
    minCGPA: 8.5,
    allowedBranches: ['Computer Science & Engineering', 'Information Technology', 'Electronics & Communication', 'Electrical & Electronics', 'CSE', 'IT', 'ECE', 'EEE'],
    graduationYear: '2026',
    jobType: 'Full-Time',
    deadline: '2026-11-08',
    driveDate: '2026-11-14',
    location: 'Hyderabad',
    vacancies: 25,
    appliedCount: 380,
    shortlistedCount: 60,
    status: 'Shortlisting in Progress',
    eligibilityNotes: 'Must clear online coding round on Data Structures & Algorithms.',
    companyDescription: 'Microsoft India Development Center (IDC) is one of Microsoft’s largest R&D centers outside of Redmond.',
    jobDescription: 'Work on core cloud services, Azure platform reliability, and intelligence experiences touching hundreds of millions of users.',
    responsibilities: [
      'Write clean, reliable, and high-performance server-side services.',
      'Debug production concurrency issues and memory bottlenecks.',
      'Contribute to large-scale distributed databases and telemetry engines.',
    ],
    requiredSkills: ['C++', 'C# / Java', 'Data Structures & Algorithms', 'System Architecture'],
    compensationDetails: {
      baseSalary: '₹24,00,000',
      performanceBonus: '₹4,00,000',
      stockGrants: '$15,000 equity vesting over 4 years',
    },
    selectionProcess: [
      { roundNumber: 1, name: 'Online Coding Challenge', format: '3 DSA questions (90 mins)' },
      { roundNumber: 2, name: 'Technical Round 1', format: 'Advanced Algorithms & Problem Solving' },
      { roundNumber: 3, name: 'Technical Round 2', format: 'Low-Level Design & Concurrency' },
      { roundNumber: 4, name: 'AA (As-Appropriate) Final Round', format: 'Leadership & Architectural Mindset' },
    ],
    importantDates: {
      registrationOpen: '2026-10-20',
      registrationDeadline: '2026-11-08',
      onlineTest: '2026-11-10',
      interviews: '2026-11-14',
    },
    applicationInstructions: 'Review Microsoft values and prepare algorithmic solutions in your primary programming language.',
  },
  {
    id: 'DRV-2026-04',
    companyName: 'Amazon Web Services',
    companyLogo: 'https://images.unsplash.com/photo-1523474255658-4af61b1684c4?w=80',
    roleTitle: 'Associate Solutions Architect',
    packageLPA: 30.0,
    packageBreakup: '₹26 LPA Fixed + ₹4 LPA Sign-on Bonus',
    minCGPA: 8.0,
    allowedBranches: ['Computer Science & Engineering', 'Information Technology', 'Electronics & Communication', 'CSE', 'IT', 'ECE'],
    graduationYear: '2026',
    jobType: 'Full-Time',
    deadline: '2026-11-25',
    driveDate: '2026-12-05',
    location: 'Bengaluru',
    vacancies: 18,
    appliedCount: 165,
    shortlistedCount: 0,
    status: 'Upcoming',
    eligibilityNotes: 'Cloud certifications (AWS Certified Solutions Architect) preferred.',
    companyDescription: 'Amazon Web Services (AWS) is the world’s most comprehensive and broadly adopted cloud platform.',
    jobDescription: 'Help enterprise customers design scalable, highly available, and cost-effective cloud architectures.',
    responsibilities: [
      'Deliver architectural guidance and proof-of-concept prototypes.',
      'Conduct cloud well-architected reviews across security, reliability, and cost.',
    ],
    requiredSkills: ['Cloud Computing', 'Networking', 'Python', 'Linux Internals', 'Security Architecture'],
    compensationDetails: {
      baseSalary: '₹26,00,000',
      performanceBonus: '₹4,00,000',
    },
    selectionProcess: [
      { roundNumber: 1, name: 'Online Assessment', format: 'Cloud fundamentals + algorithmic logic' },
      { roundNumber: 2, name: 'Architecture Review', format: 'Scenario-based system design' },
      { roundNumber: 3, name: 'Bar Raiser Round', format: 'Amazon Leadership Principles evaluation' },
    ],
    importantDates: {
      registrationOpen: '2026-11-05',
      registrationDeadline: '2026-11-25',
      interviews: '2026-12-05',
    },
    applicationInstructions: 'Demonstrate hands-on experience building on public cloud infrastructure.',
  },
  {
    id: 'DRV-2026-05',
    companyName: 'Vertex Digital Labs',
    companyLogo: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=80',
    roleTitle: 'AI/ML Systems Engineer',
    packageLPA: 24.0,
    packageBreakup: '₹21 LPA Base + ₹3 LPA Performance Component',
    minCGPA: 8.2,
    allowedBranches: ['Computer Science & Engineering', 'Information Technology', 'Data Science & AI', 'CSE', 'IT'],
    graduationYear: '2026',
    jobType: 'Full-Time',
    deadline: '2026-11-18',
    driveDate: '2026-11-26',
    location: 'Gurugram',
    vacancies: 12,
    appliedCount: 110,
    shortlistedCount: 22,
    status: 'Applications Open',
    eligibilityNotes: 'Experience with PyTorch, model quantization, and vector embeddings.',
    companyDescription: 'Vertex Digital Labs engineers enterprise generative AI applications and high-throughput vector retrieval infrastructure.',
    jobDescription: 'Design, optimize, and serve machine learning pipelines, LLM retrieval agents, and low-latency inference services.',
    responsibilities: [
      'Deploy transformer inference models with vLLM and Triton Inference Server.',
      'Optimize vector similarity indexing across millions of document embeddings.',
      'Benchmark GPU memory utilization and latency budgets.',
    ],
    requiredSkills: ['Python', 'PyTorch', 'Vector Databases', 'FastAPI', 'Docker'],
    compensationDetails: {
      baseSalary: '₹21,00,000',
      performanceBonus: '₹3,00,000',
    },
    selectionProcess: [
      { roundNumber: 1, name: 'Machine Learning Evaluation', format: 'Model fine-tuning challenge (120 mins)' },
      { roundNumber: 2, name: 'System Design for ML', format: 'Vector search & embedding pipeline design' },
      { roundNumber: 3, name: 'Founders Round', format: 'Project deep-dive and alignment' },
    ],
    importantDates: {
      registrationOpen: '2026-11-02',
      registrationDeadline: '2026-11-18',
      interviews: '2026-11-26',
    },
    applicationInstructions: 'Provide links to Hugging Face or GitHub repositories featuring machine learning experiments.',
  },
  {
    id: 'DRV-2026-06',
    companyName: 'Horizon FinTech Group',
    companyLogo: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=80',
    roleTitle: 'Quantitative Software Analyst',
    packageLPA: 22.0,
    packageBreakup: '₹19 LPA Fixed + ₹3 LPA Performance Bonus',
    minCGPA: 7.8,
    allowedBranches: ['Computer Science & Engineering', 'Information Technology', 'Electronics & Communication', 'Electrical & Electronics', 'CSE', 'IT', 'ECE', 'EEE'],
    graduationYear: '2026',
    jobType: 'Full-Time',
    deadline: '2026-11-19',
    driveDate: '2026-11-27',
    location: 'Mumbai',
    vacancies: 16,
    appliedCount: 175,
    shortlistedCount: 30,
    status: 'Applications Open',
    eligibilityNotes: 'Strong foundation in probability, statistics, and low-latency data structures.',
    companyDescription: 'Horizon FinTech operates automated algorithmic execution engines and institutional market-making platforms.',
    jobDescription: 'Develop high-frequency order processing services, risk valuation calculators, and real-time ledger auditing microservices.',
    responsibilities: [
      'Write deterministic, zero-allocation data processing pipelines in C++ and Java.',
      'Maintain automated risk validation and margin management calculations.',
    ],
    requiredSkills: ['C++', 'Java', 'Data Structures', 'SQL', 'Financial Math'],
    compensationDetails: {
      baseSalary: '₹19,00,000',
      performanceBonus: '₹3,00,000',
    },
    selectionProcess: [
      { roundNumber: 1, name: 'Quant & Logic Test', format: 'Probabilistic modeling and logic puzzles' },
      { roundNumber: 2, name: 'Data Structures Technical', format: 'Low-latency algorithms' },
      { roundNumber: 3, name: 'Final Panel', format: 'Trading systems architecture' },
    ],
    importantDates: {
      registrationOpen: '2026-11-03',
      registrationDeadline: '2026-11-19',
      interviews: '2026-11-27',
    },
    applicationInstructions: 'Prior trading knowledge is not required; strong mathematical problem solving is essential.',
  },
  {
    id: 'DRV-2026-07',
    companyName: 'Apex Systems Ltd.',
    companyLogo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=80',
    roleTitle: 'Cloud DevOps Engineer',
    packageLPA: 16.0,
    packageBreakup: '₹14 LPA Base + ₹2 LPA Retention Bonus',
    minCGPA: 7.0,
    allowedBranches: ['Computer Science & Engineering', 'Information Technology', 'Electronics & Communication', 'Electrical & Electronics', 'Mechanical Engineering', 'CSE', 'IT', 'ECE', 'EEE', 'Mechanical'],
    graduationYear: '2026',
    jobType: 'Full-Time',
    deadline: '2026-11-30',
    driveDate: '2026-12-10',
    location: 'Hyderabad / Hybrid',
    vacancies: 30,
    appliedCount: 260,
    shortlistedCount: 50,
    status: 'Applications Open',
    eligibilityNotes: 'Familiarity with Linux shell scripting, GitHub Actions, and containerization.',
    companyDescription: 'Apex Systems delivers enterprise infrastructure automation and platform engineering to global clients.',
    jobDescription: 'Build infrastructure-as-code automation, container pipelines, and monitoring solutions.',
    responsibilities: [
      'Configure automated CI/CD workflows using GitHub Actions and Terraform.',
      'Manage container registry security scanning and vulnerability patching.',
    ],
    requiredSkills: ['Linux', 'Docker', 'Bash', 'Terraform', 'CI/CD'],
    compensationDetails: {
      baseSalary: '₹14,00,000',
      performanceBonus: '₹2,00,000',
    },
    selectionProcess: [
      { roundNumber: 1, name: 'Aptitude & Shell Test', format: 'Linux, networking & script debugging' },
      { roundNumber: 2, name: 'Technical Interview', format: 'DevOps architecture and scenarios' },
      { roundNumber: 3, name: 'HR Interview', format: 'Role expectations and location confirmation' },
    ],
    importantDates: {
      registrationOpen: '2026-11-04',
      registrationDeadline: '2026-11-30',
      interviews: '2026-12-10',
    },
    applicationInstructions: 'Ensure hands-on Linux experience is highlighted on your profile.',
  },
  {
    id: 'DRV-2026-08',
    companyName: 'Quantum Dynamics Core',
    companyLogo: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=80',
    roleTitle: 'Embedded Robotics Engineer',
    packageLPA: 14.5,
    packageBreakup: '₹13 LPA Fixed + ₹1.5 LPA Performance Component',
    minCGPA: 7.2,
    allowedBranches: ['Electronics & Communication', 'Electrical & Electronics', 'Mechanical Engineering', 'ECE', 'EEE', 'Mechanical'],
    graduationYear: '2026',
    jobType: 'Full-Time',
    deadline: '2026-11-24',
    driveDate: '2026-12-02',
    location: 'Chennai',
    vacancies: 14,
    appliedCount: 95,
    shortlistedCount: 18,
    status: 'Applications Open',
    eligibilityNotes: 'C/C++ firmware development on ARM Cortex / ESP32 platforms.',
    companyDescription: 'Quantum Dynamics engineers industrial autonomous mobile robots and smart warehouse automation systems.',
    jobDescription: 'Develop real-time sensor fusion firmware, motor control algorithms, and hardware communication drivers.',
    responsibilities: [
      'Write hard-real-time embedded C drivers for CAN, SPI, and UART sensor buses.',
      'Implement PID control loops and telemetry interfaces for warehouse robots.',
    ],
    requiredSkills: ['Embedded C', 'RTOS', 'ARM Cortex', 'CAN Bus', 'Hardware Debugging'],
    compensationDetails: {
      baseSalary: '₹13,00,000',
      performanceBonus: '₹1,50,000',
    },
    selectionProcess: [
      { roundNumber: 1, name: 'Firmware Test', format: 'Embedded C coding & schematic reading' },
      { roundNumber: 2, name: 'Hardware Technical Round', format: 'Controller architecture discussion' },
      { roundNumber: 3, name: 'Final HR', format: 'Offer rollouts and briefing' },
    ],
    importantDates: {
      registrationOpen: '2026-11-01',
      registrationDeadline: '2026-11-24',
      interviews: '2026-12-02',
    },
    applicationInstructions: 'Include project links detailing robotic hardware builds and microcontrollers used.',
  },
  {
    id: 'DRV-2026-09',
    companyName: 'CloudScale Technologies',
    companyLogo: 'https://images.unsplash.com/photo-1542744094-3a31727221eb?w=80',
    roleTitle: 'Site Reliability Engineer (SRE)',
    packageLPA: 26.0,
    packageBreakup: '₹23 LPA Fixed + ₹3 LPA Performance Bonus',
    minCGPA: 8.0,
    allowedBranches: ['Computer Science & Engineering', 'Information Technology', 'CSE', 'IT'],
    graduationYear: '2026',
    jobType: 'Full-Time',
    deadline: '2026-11-16',
    driveDate: '2026-11-23',
    location: 'Bengaluru / Remote',
    vacancies: 10,
    appliedCount: 130,
    shortlistedCount: 20,
    status: 'Applications Open',
    eligibilityNotes: 'Must understand distributed tracing, fault tolerance, and chaos engineering principles.',
    companyDescription: 'CloudScale provides mission-critical uptime engineering for Fortune 500 digital enterprises.',
    jobDescription: 'Ensure high reliability, zero-downtime upgrades, and automated incident recovery across multi-cloud infrastructure.',
    responsibilities: [
      'Define Service Level Objectives (SLOs) and automated error budget alerts.',
      'Automate system healing and auto-scaling rules using Kubernetes operators.',
    ],
    requiredSkills: ['Kubernetes', 'Golang', 'Linux', 'Terraform', 'Prometheus'],
    compensationDetails: {
      baseSalary: '₹23,00,000',
      performanceBonus: '₹3,00,000',
    },
    selectionProcess: [
      { roundNumber: 1, name: 'SRE Assessment', format: 'Incident triage and debugging' },
      { roundNumber: 2, name: 'Technical Architecture', format: 'High availability design' },
      { roundNumber: 3, name: 'HR Leadership', format: 'Communication and on-call culture' },
    ],
    importantDates: {
      registrationOpen: '2026-11-01',
      registrationDeadline: '2026-11-16',
      interviews: '2026-11-23',
    },
    applicationInstructions: 'Submit your resume and mention your favorite troubleshooting experience in system architecture.',
  },
  {
    id: 'DRV-2026-10',
    companyName: 'Legacy Tech Systems',
    companyLogo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=80',
    roleTitle: 'Associate Software Trainee',
    packageLPA: 6.5,
    packageBreakup: '₹6.5 LPA Fixed Package',
    minCGPA: 6.0,
    allowedBranches: ['Computer Science & Engineering', 'Information Technology', 'Electronics & Communication', 'Electrical & Electronics', 'Mechanical Engineering', 'Civil Engineering', 'CSE', 'IT', 'ECE', 'EEE', 'Civil', 'Mechanical'],
    graduationYear: '2026',
    jobType: 'Full-Time',
    deadline: '2026-10-15',
    driveDate: '2026-10-25',
    location: 'Noida',
    vacancies: 50,
    appliedCount: 420,
    shortlistedCount: 90,
    status: 'Deadline Expired',
    eligibilityNotes: 'Registrations are permanently closed. Test drive record for expired cutoff validation.',
    companyDescription: 'Legacy Tech Systems coordinates IT support and digital transformation solutions.',
    jobDescription: 'Participate in foundation software testing, database administration, and operational monitoring.',
    responsibilities: ['Support database backup operations.', 'Perform exploratory test runs.'],
    requiredSkills: ['SQL', 'Java', 'Problem Solving'],
    compensationDetails: { baseSalary: '₹6,50,000' },
    selectionProcess: [{ roundNumber: 1, name: 'Aptitude Test', format: 'Logical reasoning' }],
    importantDates: { registrationDeadline: '2026-10-15' },
    applicationInstructions: 'This drive is closed.',
  },
];

export const drivesMockService = {
  /**
   * General get drives with support for search & status filter
   */
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

  /**
   * Enhanced drive discovery with multi-faceted filtering & sorting
   */
  async getAvailableDrives(filters = {}, studentProfile = null) {
    await delay();
    let result = [...MOCK_DRIVES];

    // Search query
    if (filters.search && filters.search.trim()) {
      const q = filters.search.trim().toLowerCase();
      result = result.filter(
        (d) =>
          d.companyName.toLowerCase().includes(q) ||
          d.roleTitle.toLowerCase().includes(q) ||
          d.location.toLowerCase().includes(q) ||
          (d.requiredSkills && d.requiredSkills.some((s) => s.toLowerCase().includes(q)))
      );
    }

    // Department filter
    if (filters.department && filters.department !== 'all') {
      result = result.filter((d) =>
        d.allowedBranches.some(
          (b) =>
            b.toLowerCase() === filters.department.toLowerCase() ||
            (filters.department.includes('Computer') && (b === 'CSE' || b === 'IT')) ||
            (filters.department.includes('Electronics') && b === 'ECE')
        )
      );
    }

    // Minimum CGPA filter
    if (filters.minCGPA) {
      const targetCgpa = parseFloat(filters.minCGPA);
      if (!isNaN(targetCgpa)) {
        result = result.filter((d) => d.minCGPA <= targetCgpa);
      }
    }

    // Job type filter
    if (filters.jobType && filters.jobType !== 'all') {
      result = result.filter((d) => d.jobType.toLowerCase() === filters.jobType.toLowerCase());
    }

    // Location filter
    if (filters.location && filters.location !== 'all') {
      result = result.filter((d) => d.location.toLowerCase().includes(filters.location.toLowerCase()));
    }

    // Deadline status filter
    if (filters.deadlineStatus) {
      const today = new Date().toISOString().split('T')[0];
      if (filters.deadlineStatus === 'active') {
        result = result.filter((d) => d.deadline >= today && d.status !== 'Deadline Expired');
      } else if (filters.deadlineStatus === 'expired') {
        result = result.filter((d) => d.deadline < today || d.status === 'Deadline Expired');
      }
    }

    // Calculate eligibility status on each drive for the student
    const studentCgpa = studentProfile?.cgpa ?? 8.85;
    const studentDept = studentProfile?.department ?? 'Computer Science & Engineering';

    result = result.map((drive) => {
      const eligibility = this._evaluateEligibility(drive, studentCgpa, studentDept);
      return {
        ...drive,
        isEligible: eligibility.isEligible,
        eligibilityReasons: eligibility.reasons,
      };
    });

    // "Show only eligible drives" filter
    if (filters.onlyEligible) {
      result = result.filter((d) => d.isEligible);
    }

    // Sorting
    if (filters.sortBy === 'deadline') {
      result.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
    } else if (filters.sortBy === 'packageHigh') {
      result.sort((a, b) => b.packageLPA - a.packageLPA);
    } else if (filters.sortBy === 'packageLow') {
      result.sort((a, b) => a.packageLPA - b.packageLPA);
    } else {
      // Default newest
      result.sort((a, b) => (b.id > a.id ? 1 : -1));
    }

    return {
      data: result,
      total: result.length,
    };
  },

  /**
   * Fetch single placement drive by ID
   */
  async getDriveDetails(driveId, studentProfile = null) {
    await delay();
    const drive = MOCK_DRIVES.find((d) => d.id === driveId);
    if (!drive) {
      throw new Error(`Placement drive ${driveId} not found.`);
    }

    const studentCgpa = studentProfile?.cgpa ?? 8.85;
    const studentDept = studentProfile?.department ?? 'Computer Science & Engineering';
    const eligibility = this._evaluateEligibility(drive, studentCgpa, studentDept);

    return {
      ...drive,
      isEligible: eligibility.isEligible,
      eligibilityReasons: eligibility.reasons,
    };
  },

  /**
   * Filter and return drives that match student's CGPA and branch
   */
  async getEligibleDrives(studentCgpa = 8.85, studentDept = 'Computer Science & Engineering') {
    await delay();
    const eligible = MOCK_DRIVES.filter((drive) => {
      const evalResult = this._evaluateEligibility(drive, studentCgpa, studentDept);
      return evalResult.isEligible;
    });

    return {
      data: eligible,
      total: eligible.length,
    };
  },

  /**
   * Check eligibility of a specific drive for candidate
   */
  async checkEligibility(driveId, studentCgpa = 8.85, studentDept = 'Computer Science & Engineering') {
    await delay(120);
    const drive = MOCK_DRIVES.find((d) => d.id === driveId);
    if (!drive) {
      throw new Error('Drive not found');
    }

    return this._evaluateEligibility(drive, studentCgpa, studentDept);
  },

  /**
   * Internal eligibility evaluation engine
   */
  _evaluateEligibility(drive, studentCgpaOrProfile, studentDept) {
    let cgpa = studentCgpaOrProfile;
    let dept = studentDept;

    if (studentCgpaOrProfile && typeof studentCgpaOrProfile === 'object') {
      cgpa = studentCgpaOrProfile.cgpa;
      dept = studentCgpaOrProfile.department || studentDept;
    }

    const reasons = [];
    let isEligible = true;

    // Check CGPA cutoff
    if (cgpa !== undefined && drive.minCGPA !== undefined && cgpa < drive.minCGPA) {
      isEligible = false;
      reasons.push(`CGPA ${cgpa} is below minimum requirement of ${drive.minCGPA}`);
    }

    // Check allowed academic branches / departments
    const allowed = drive.allowedBranches || drive.eligibleDepartments;
    if (dept && allowed && allowed.length > 0) {
      const matchesBranch = allowed.some(
        (b) =>
          b.toLowerCase() === dept.toLowerCase() ||
          (dept.toLowerCase().includes('computer') && (b === 'CSE' || b === 'IT' || b.toLowerCase().includes('computer'))) ||
          (dept.toLowerCase().includes('information') && (b === 'IT' || b === 'CSE' || b.toLowerCase().includes('information'))) ||
          (dept.toLowerCase().includes('electronics') && (b === 'ECE' || b === 'EEE' || b.toLowerCase().includes('electronics')))
      );

      if (!matchesBranch) {
        isEligible = false;
        reasons.push(`Academic department '${dept}' is not in allowed branches`);
      }
    }

    // Check deadline expiration
    const today = new Date().toISOString().split('T')[0];
    const isExpired = drive.deadline < today || drive.status === 'Deadline Expired';
    if (isExpired) {
      isEligible = false;
      reasons.push('Application deadline has expired');
    }

    return {
      eligible: isEligible,
      isEligible,
      isExpired,
      reasons,
      reason: reasons.join('; '),
      cutoff: drive.minCGPA,
      candidateCgpa: cgpa,
      deadline: drive.deadline,
    };
  },

  _resetMemory() {
    // Reset memory state if applicable
  },
};
