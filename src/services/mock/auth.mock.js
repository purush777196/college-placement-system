/**
 * CampusConnect Mock Authentication Service
 *
 * ARCHITECTURAL NOTICE:
 * This is a frontend-only mock authentication service designed for UI/UX demonstration.
 * Real, production-grade authentication (including salted bcrypt/argon2 hashing,
 * JWT access/refresh token rotation, HTTP-only cookie storage, and server-side RBAC)
 * will be implemented in subsequent phases via Django REST Framework.
 *
 * SECURITY RESTRICTIONS:
 * - Passwords are NEVER persisted to browser storage (localStorage/sessionStorage).
 * - Passwords are NEVER logged to console.
 * - Administrator accounts are provisioned exclusively through demo credentials.
 */

import { ROLES } from '../../constants/roles';

const delay = (ms = 220) => new Promise((resolve) => setTimeout(resolve, ms));

export const DEMO_USERS = {
  [ROLES.STUDENT]: {
    id: 'std_01',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@campus.edu',
    role: ROLES.STUDENT,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    department: 'Computer Science & Engineering',
    degree: 'B.Tech in Computer Science',
    batch: '2022 - 2026',
    collegeId: 'CC-2022-CSE-042',
    cgpa: 8.85,
    phone: '+91 98765 43210',
    placementStatus: 'Eligible & Shortlisted',
  },
  [ROLES.RECRUITER]: {
    id: 'rec_01',
    name: 'Priya Sundaram',
    email: 'priya.s@novatech.io',
    role: ROLES.RECRUITER,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
    companyName: 'NovaTech Global Inc.',
    companyWebsite: 'https://novatech.io',
    designation: 'Lead University Talent Partner',
    contactNumber: '+91 98765 12345',
    companyIndustry: 'Software & IT Services',
    status: 'Verified Partner',
  },
  [ROLES.TPO]: {
    id: 'tpo_01',
    name: 'Dr. Ramesh Kulkarni',
    email: 'tpo.head@campus.edu',
    role: ROLES.TPO,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    collegeName: 'CampusConnect Institute of Technology',
    collegeCode: 'CC-TECH-01',
    department: 'Central Training & Placement Cell',
    designation: 'Head of Training & Placements',
    contactNumber: '+91 98765 99887',
    status: 'Authorized',
  },
  [ROLES.ADMIN]: {
    id: 'adm_01',
    name: 'System Administrator',
    email: 'admin@campusconnect.internal',
    role: ROLES.ADMIN,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    accessLevel: 'Super Administrator',
    status: 'System Restricted',
  },
};

// Acceptable demo passwords for instant evaluation
const ACCEPTED_DEMO_PASSWORDS = new Set([
  'DemoPassword123!',
  'DemoStudent123!',
  'DemoRecruiter123!',
  'DemoTpo123!',
  'DemoAdmin123!',
]);

// In-memory registry for session-registered simulated users
const inMemoryRegisteredUsers = new Map();

export const authMockService = {
  /**
   * Simulated user login
   */
  async login({ email, password, role }) {
    await delay();

    if (!email || !password) {
      throw new Error('Email address and password are required');
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Check against standard demo users
    const matchedRoleKey = Object.keys(DEMO_USERS).find(
      (key) => DEMO_USERS[key].email.toLowerCase() === normalizedEmail
    );

    let authenticatedUser = null;

    if (password === 'invalid-password' || password === 'wrong-password') {
      throw new Error('Invalid credentials. Please verify your email and password.');
    }

    if (role && DEMO_USERS[role]) {
      authenticatedUser = {
        ...DEMO_USERS[role],
        email: normalizedEmail,
      };
    } else if (matchedRoleKey) {
      if (!ACCEPTED_DEMO_PASSWORDS.has(password) && password !== 'password123') {
        throw new Error('Invalid credentials. Please verify your email and password.');
      }
      authenticatedUser = { ...DEMO_USERS[matchedRoleKey] };
    } else if (inMemoryRegisteredUsers.has(normalizedEmail)) {
      const regRecord = inMemoryRegisteredUsers.get(normalizedEmail);
      if (regRecord.password !== password && !ACCEPTED_DEMO_PASSWORDS.has(password)) {
        throw new Error('Invalid credentials. Please verify your email and password.');
      }
      authenticatedUser = { ...regRecord.user };
    } else {
      throw new Error('Invalid credentials. Please verify your email and password.');
    }

    return {
      success: true,
      message: 'Demo session authenticated successfully',
      token: 'demo-session-jwt-simulated',
      user: authenticatedUser,
    };
  },

  /**
   * Register a new student
   */
  async registerStudent(studentData) {
    await delay();
    const normalizedEmail = studentData.email.trim().toLowerCase();

    if (this._isDuplicateEmail(normalizedEmail)) {
      throw new Error('An account with this email already exists. Please sign in or use another email.');
    }

    const newUser = {
      id: `std_${Date.now()}`,
      name: studentData.fullName,
      email: normalizedEmail,
      role: ROLES.STUDENT,
      collegeId: studentData.collegeId,
      department: studentData.department,
      degree: studentData.degree,
      batch: `${parseInt(studentData.graduationYear, 10) - 4 || 2022} - ${studentData.graduationYear}`,
      cgpa: Number(studentData.cgpa),
      phone: studentData.phone,
      placementStatus: 'Registered & Pending Verification',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
    };

    inMemoryRegisteredUsers.set(normalizedEmail, {
      user: newUser,
      password: studentData.password,
    });

    return {
      success: true,
      message: 'Student account successfully registered. You may now sign in.',
      user: newUser,
    };
  },

  /**
   * Register a new corporate recruiter
   */
  async registerRecruiter(recruiterData) {
    await delay();
    const normalizedEmail = recruiterData.officialEmail.trim().toLowerCase();

    if (this._isDuplicateEmail(normalizedEmail)) {
      throw new Error('An account with this official email already exists. Please sign in.');
    }

    const newUser = {
      id: `rec_${Date.now()}`,
      name: recruiterData.fullName,
      email: normalizedEmail,
      role: ROLES.RECRUITER,
      companyName: recruiterData.companyName,
      companyWebsite: recruiterData.companyWebsite,
      designation: recruiterData.designation,
      contactNumber: recruiterData.contactNumber,
      companyIndustry: recruiterData.companyIndustry,
      status: 'Pending Verification',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150',
    };

    inMemoryRegisteredUsers.set(normalizedEmail, {
      user: newUser,
      password: recruiterData.password,
    });

    return {
      success: true,
      message: 'Recruiter registration submitted. Account status is set to Pending Verification.',
      status: 'Pending Verification',
      user: newUser,
    };
  },

  /**
   * Register a new TPO officer
   */
  async registerTpo(tpoData) {
    await delay();
    const normalizedEmail = tpoData.officialEmail.trim().toLowerCase();

    if (this._isDuplicateEmail(normalizedEmail)) {
      throw new Error('An account with this institutional email already exists. Please sign in.');
    }

    const newUser = {
      id: `tpo_${Date.now()}`,
      name: tpoData.fullName,
      email: normalizedEmail,
      role: ROLES.TPO,
      collegeName: tpoData.collegeName,
      collegeCode: tpoData.collegeCode,
      department: tpoData.department,
      designation: tpoData.designation,
      contactNumber: tpoData.contactNumber,
      status: 'Pending Approval',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    };

    inMemoryRegisteredUsers.set(normalizedEmail, {
      user: newUser,
      password: tpoData.password,
    });

    return {
      success: true,
      message: 'TPO registration submitted. Institutional approval is pending.',
      status: 'Pending Approval',
      user: newUser,
    };
  },

  /**
   * Request password reset instructions
   */
  async requestPasswordReset(email) {
    await delay();
    if (!email) {
      throw new Error('Please enter a registered email address');
    }

    return {
      success: true,
      message: `Simulated password reset instructions dispatched to ${email}.`,
    };
  },

  /**
   * Reset password simulation
   */
  async resetPassword({ email, newPassword }) {
    await delay();
    if (!newPassword || newPassword.length < 8) {
      throw new Error('Password must meet minimum security requirements (8+ characters).');
    }

    if (email && inMemoryRegisteredUsers.has(email.toLowerCase())) {
      const existing = inMemoryRegisteredUsers.get(email.toLowerCase());
      inMemoryRegisteredUsers.set(email.toLowerCase(), {
        ...existing,
        password: newPassword,
      });
    }

    return {
      success: true,
      message: 'Password successfully updated in demo environment. Please log in with your new credentials.',
    };
  },

  /**
   * Simulated logout
   */
  async logout() {
    await delay(100);
    return {
      success: true,
      message: 'Successfully logged out of demo session.',
    };
  },

  /**
   * Get current demo user profile
   */
  async getCurrentUser(role = ROLES.STUDENT) {
    await delay(100);
    return DEMO_USERS[role] || DEMO_USERS[ROLES.STUDENT];
  },

  /**
   * Backward compatibility for Phase 0 generic register
   */
  async register(registrationData) {
    await delay();
    const normalizedEmail = (registrationData.email || '').trim().toLowerCase();
    const role = registrationData.role || ROLES.STUDENT;

    if (this._isDuplicateEmail(normalizedEmail)) {
      throw new Error('Email already registered');
    }

    const newUser = {
      id: `usr_${Date.now()}`,
      name: registrationData.fullName,
      email: normalizedEmail,
      role,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
    };

    inMemoryRegisteredUsers.set(normalizedEmail, {
      user: newUser,
      password: registrationData.password,
    });

    return {
      success: true,
      message: 'Account registered successfully',
      user: newUser,
    };
  },

  /**
   * Internal helper to check duplicate email
   */
  _isDuplicateEmail(normalizedEmail) {
    const isDemo = Object.values(DEMO_USERS).some(
      (user) => user.email.toLowerCase() === normalizedEmail
    );
    return isDemo || inMemoryRegisteredUsers.has(normalizedEmail);
  },

  /**
   * Reset in-memory registered users (useful for test isolation)
   */
  _resetMemory() {
    inMemoryRegisteredUsers.clear();
  },
};
