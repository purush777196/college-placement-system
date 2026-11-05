/**
 * Mock Students Service
 * Illustrative student dataset and operations.
 */
const delay = (ms = 180) => new Promise((resolve) => setTimeout(resolve, ms));

export const MOCK_STUDENTS = [
  {
    id: 'STD-2022-001',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@campus.edu',
    rollNumber: '22CS014',
    department: 'Computer Science & Engineering',
    batch: '2026',
    cgpa: 8.85,
    backlogs: 0,
    skills: ['React', 'Python', 'Node.js', 'PostgreSQL', 'Docker'],
    status: 'Shortlisted',
    offersCount: 1,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
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
      page: 1,
      pageSize: 10,
    };
  },

  async getStudentById(id) {
    await delay();
    const student = MOCK_STUDENTS.find((s) => s.id === id);
    if (!student) throw new Error(`Student with ID ${id} not found`);
    return student;
  },

  async getProfile() {
    await delay(100);
    return MOCK_STUDENTS[0];
  },
};

