import {
  UserCheck,
  Briefcase,
  CheckCircle2,
  FileText,
  Calendar,
  Award,
  BarChart3,
  Sparkles,
  ClipboardCheck,
  TrendingUp,
  GraduationCap,
  Building2,
  ShieldCheck,
  Search,
  Layers,
  Send,
  Zap,
} from 'lucide-react';

export const PLACEMENT_STATS = [
  {
    id: 'stat-1',
    label: 'Students Registered',
    value: '1,450+',
    subtext: 'Across 6 Engineering Cohorts',
    icon: GraduationCap,
    variant: 'primary',
  },
  {
    id: 'stat-2',
    label: 'Partner Companies',
    value: '112+',
    subtext: 'Tier-1 & Dream Recruiters',
    icon: Building2,
    variant: 'secondary',
  },
  {
    id: 'stat-3',
    label: 'Placement Drives',
    value: '140+',
    subtext: 'Coordinated Campus Drives',
    icon: Briefcase,
    variant: 'navy',
  },
  {
    id: 'stat-4',
    label: 'Placement Conversion',
    value: '82.1%',
    subtext: '1,190+ Placed Candidates',
    icon: TrendingUp,
    variant: 'success',
  },
];

export const PLATFORM_FEATURES = [
  {
    id: 'feat-1',
    title: 'Student Profile Management',
    description: 'Centralized profiles featuring academic metrics, verified transcripts, GitHub links, and structured technical portfolios.',
    icon: UserCheck,
    tag: 'Core Portal',
  },
  {
    id: 'feat-2',
    title: 'Placement Drive Management',
    description: 'End-to-end recruitment drive publishing with custom cutoff parameters, department restrictions, and deadline tracking.',
    icon: Briefcase,
    tag: 'TPO Suite',
  },
  {
    id: 'feat-3',
    title: 'Automated Eligibility Checking',
    description: 'Instant algorithmic validation against CGPA thresholds, active backlog allowances, and graduation year criteria.',
    icon: CheckCircle2,
    tag: 'Automation',
  },
  {
    id: 'feat-4',
    title: 'Job Application Tracking',
    description: 'Visual multi-stage status tracking from drive discovery through shortlisting, interviews, and final offers.',
    icon: ClipboardCheck,
    tag: 'Pipeline',
  },
  {
    id: 'feat-5',
    title: 'Resume Management',
    description: 'Version-controlled PDF resume uploads with ATS keyword match analytics and dynamic role-targeted resumes.',
    icon: FileText,
    tag: 'Productivity',
  },
  {
    id: 'feat-6',
    title: 'Online Assessments',
    description: 'Integrated screening tests with automated scoring, timed coding rounds, and domain-specific multiple choice evaluations.',
    icon: Zap,
    tag: 'Evaluation',
  },
  {
    id: 'feat-7',
    title: 'Interview Scheduling',
    description: 'Frictionless calendar scheduling for multi-round technical, leadership, and HR interviews with automated slot booking.',
    icon: Calendar,
    tag: 'Coordination',
  },
  {
    id: 'feat-8',
    title: 'Offer Management',
    description: 'Digital offer letter dispatch, acceptance workflows, institutional multi-offer policies, and salary package verification.',
    icon: Award,
    tag: 'Governance',
  },
  {
    id: 'feat-9',
    title: 'Placement Analytics',
    description: 'Real-time NIRF compliance dashboards, package distribution graphs, and historical year-over-year hiring metrics.',
    icon: BarChart3,
    tag: 'Reporting',
  },
  {
    id: 'feat-10',
    title: 'AI-Powered Career Insights',
    description: 'Intelligent skill-gap analysis and predictive role recommendations tailored to candidate profiles.',
    icon: Sparkles,
    tag: 'Planned AI',
    isPlanned: true,
  },
];

export const ROLE_BENEFITS = {
  students: {
    title: 'For Students',
    subtitle: 'Streamline Your Path From Campus To Career',
    badge: 'Candidate Portal',
    icon: GraduationCap,
    color: 'blue',
    benefits: [
      {
        title: 'Maintain Verified Academic Profiles',
        desc: 'Keep your CGPA, semester transcripts, certifications, and technical projects centrally up to date.',
      },
      {
        title: 'Instant Eligibility Discovery',
        desc: 'Explore active recruitment drives where your profile matches academic criteria without guesswork.',
      },
      {
        title: 'One-Click Drive Applications',
        desc: 'Apply directly with customized resumes and receive instant confirmation for upcoming rounds.',
      },
      {
        title: 'Live Stage-by-Stage Tracking',
        desc: 'Monitor test results, technical interview slots, and offer notifications through visual timeline bars.',
      },
      {
        title: 'Centralized Offer Management',
        desc: 'Review and accept verified compensation letters compliant with institutional placement policies.',
      },
    ],
  },
  tpo: {
    title: 'For Placement Officers (TPO)',
    subtitle: 'Complete Operational Oversight and Institutional Governance',
    badge: 'TPO Console',
    icon: TrendingUp,
    color: 'emerald',
    benefits: [
      {
        title: 'Manage Cohorts and Partner Networks',
        desc: 'Govern student rosters, backlogs, and relationships with hundreds of corporate recruiters.',
      },
      {
        title: 'Publish Targeted Placement Drives',
        desc: 'Configure custom eligibility criteria, package slabs, and allowed academic branches with ease.',
      },
      {
        title: 'Automated Academic Verification',
        desc: 'Prevent ineligible applications automatically using strict algorithmic rules and college cutoff benchmarks.',
      },
      {
        title: 'Monitor Multi-Branch Pipelines',
        desc: 'Track candidate flow across departments and coordinate multi-company on-campus and virtual drives.',
      },
      {
        title: 'Executive NIRF Placement Analytics',
        desc: 'Generate audited placement reports, highest/average package analytics, and department rankings instantly.',
      },
    ],
  },
  recruiters: {
    title: 'For Corporate Recruiters',
    subtitle: 'High-Velocity Hiring and Pre-Screened Talent Access',
    badge: 'Recruiter Hub',
    icon: Building2,
    color: 'amber',
    benefits: [
      {
        title: 'Discover Pre-Verified Candidate Pools',
        desc: 'Filter thousands of university students by verified CGPA, programming skills, and departmental specializations.',
      },
      {
        title: 'Comprehensive Candidate Profiles',
        desc: 'Inspect parsed resumes, project portfolios, and coding proficiency indicators in one structured view.',
      },
      {
        title: 'Manage Drive Stages Seamlessly',
        desc: 'Shortlist applicants, coordinate online coding rounds, and track candidate progressions through every hurdle.',
      },
      {
        title: 'Frictionless Interview Scheduling',
        desc: 'Assign interview slots to company panelists and send automatic schedule confirmations to students.',
      },
      {
        title: 'Direct Digital Offer Rollouts',
        desc: 'Extend job offers directly on the platform with automated acceptance tracking and institutional sign-off.',
      },
    ],
  },
};

export const WORKFLOW_STEPS = [
  {
    step: 1,
    title: 'Student Registration',
    description: 'Students register with institutional credentials and establish verified campus identities.',
    icon: UserCheck,
  },
  {
    step: 2,
    title: 'Profile Completion',
    description: 'Upload transcripts, technical project portfolios, resumes, and verified academic history.',
    icon: Layers,
  },
  {
    step: 3,
    title: 'Eligibility Verification',
    description: 'System automatically checks cutoff CGPA, allowed branches, and active backlog policies.',
    icon: ShieldCheck,
  },
  {
    step: 4,
    title: 'Placement Drive Discovery',
    description: 'Students explore active campus drives and review role requirements, CTC packages, and dates.',
    icon: Search,
  },
  {
    step: 5,
    title: 'Application Submission',
    description: 'One-click application with customized resumes and instant eligibility confirmation.',
    icon: Send,
  },
  {
    step: 6,
    title: 'Assessment & Interview',
    description: 'Participate in online assessments, coding challenges, and scheduled panel interview rounds.',
    icon: Calendar,
  },
  {
    step: 7,
    title: 'Offer & Placement',
    description: 'Receive digital offer letters, celebrate successful campus hiring, and record placement milestones.',
    icon: Award,
  },
];

export const DEMO_PARTNER_COMPANIES = [
  {
    id: 'cmp-1',
    name: 'Apex Cloud Systems',
    industry: 'Enterprise Cloud & DevOps',
    tier: 'Super Dream Tier',
    logoLetter: 'A',
    color: 'bg-blue-600',
  },
  {
    id: 'cmp-2',
    name: 'NexaCorp Solutions',
    industry: 'Artificial Intelligence & Data',
    tier: 'Dream Tier',
    logoLetter: 'N',
    color: 'bg-indigo-600',
  },
  {
    id: 'cmp-3',
    name: 'Vertex Digital Labs',
    industry: 'Financial Technology',
    tier: 'Super Dream Tier',
    logoLetter: 'V',
    color: 'bg-violet-600',
  },
  {
    id: 'cmp-4',
    name: 'Quantum Dynamics',
    industry: 'Embedded Systems & IoT',
    tier: 'Core Engineering',
    logoLetter: 'Q',
    color: 'bg-emerald-600',
  },
  {
    id: 'cmp-5',
    name: 'Horizon FinTech Group',
    industry: 'Distributed Systems & Banking',
    tier: 'Dream Tier',
    logoLetter: 'H',
    color: 'bg-amber-600',
  },
  {
    id: 'cmp-6',
    name: 'CloudScale Technologies',
    industry: 'SaaS & Web Infrastructure',
    tier: 'Tier 1 Partner',
    logoLetter: 'C',
    color: 'bg-rose-600',
  },
];

export const DEMO_TESTIMONIALS = [
  {
    id: 'test-1',
    name: 'Pooja Hegde',
    role: 'Associate Software Engineer',
    company: 'Apex Cloud Systems (Sample Demo)',
    package: '₹28.5 LPA',
    batch: 'Batch of 2026 • Computer Science',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    quote: 'CampusConnect eliminated the confusion of spreadsheet updates. I received automated alerts when Apex Cloud opened applications, verified my CGPA in seconds, and scheduled my interviews seamlessly.',
  },
  {
    id: 'test-2',
    name: 'Devendra Joshi',
    role: 'Cloud Infrastructure Associate',
    company: 'Vertex Digital Labs (Sample Demo)',
    package: '₹22.0 LPA',
    batch: 'Batch of 2026 • Information Technology',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    quote: 'The automated eligibility checker was a game changer. I knew exactly which companies I qualified for before submitting my application. The multi-stage pipeline kept me informed at every step.',
  },
  {
    id: 'test-3',
    name: 'Suhani Roy',
    role: 'Embedded Software Engineer',
    company: 'Quantum Dynamics (Sample Demo)',
    package: '₹18.0 LPA',
    batch: 'Batch of 2026 • Electronics & Communication',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    quote: 'Having our placement drives, assessments, and interview schedules synchronized in one single portal made our entire final year recruiting experience stress-free and transparent.',
  },
];

export const FAQS = [
  {
    id: 'faq-1',
    question: 'What is CampusConnect?',
    answer: 'CampusConnect is a modern, centralized college placement management platform designed to automate, streamline, and coordinate recruitment drives between students, university Training & Placement Officers (TPOs), and corporate recruiters.',
  },
  {
    id: 'faq-2',
    question: 'Who can use the platform?',
    answer: 'CampusConnect supports four specialized roles: (1) Students looking for placement drives and tracking applications; (2) Training & Placement Officers (TPOs) managing batch recruitment operations; (3) Corporate Recruiters screening candidates and scheduling interviews; and (4) College Administrators governing institutional access and compliance.',
  },
  {
    id: 'faq-3',
    question: 'How do students apply for placement drives?',
    answer: 'Students log in to their student portal, browse active drives that match their department, and verify their eligibility with a single click based on CGPA and backlog criteria. Once verified, they can submit their customized resume instantly.',
  },
  {
    id: 'faq-4',
    question: 'How does eligibility checking work?',
    answer: 'Eligibility checking is completely automated. When a placement drive is published with specific requirements (e.g., minimum 8.0 CGPA, no active backlogs, specific engineering branches), the platform validates the student’s verified profile in real time and notifies them of eligibility.',
  },
  {
    id: 'faq-5',
    question: 'Can recruiters manage their end-to-end hiring process?',
    answer: 'Yes! Recruiters have access to a dedicated Recruiter Hub where they can post openings, filter candidates by skills and academic scores, review resumes, schedule multi-round interview slots, and roll out digital offer letters.',
  },
  {
    id: 'faq-6',
    question: 'Can placement officers monitor placement statistics?',
    answer: 'Absolutely. The TPO Console provides comprehensive analytics, including overall placement rates, department-wise recruitment distribution, salary slab breakdowns, and instant report exports aligned with NIRF and NAAC accreditation requirements.',
  },
  {
    id: 'faq-7',
    question: 'Is CampusConnect available on mobile devices?',
    answer: 'Yes. CampusConnect is fully responsive across mobile smartphones, tablets, laptops, and desktops, featuring collapsible sidebars, adaptive data tables, and touch-friendly navigation.',
  },
];
