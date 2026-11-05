import { create } from 'zustand';
import { ROLES } from '../constants/roles';

// Pre-configured mock demo profiles for instant role testing
export const DEMO_PROFILES = {
  [ROLES.STUDENT]: {
    id: 'std_01',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@campus.edu',
    role: ROLES.STUDENT,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    department: 'Computer Science & Engineering',
    batch: '2022 - 2026',
    cgpa: 8.85,
    placementStatus: 'Eligible & Shortlisted',
  },
  [ROLES.TPO]: {
    id: 'tpo_01',
    name: 'Dr. Ramesh Kulkarni',
    email: 'tpo.head@campus.edu',
    role: ROLES.TPO,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    title: 'Head of Training & Placements',
    college: 'CampusConnect Institute of Technology',
  },
  [ROLES.RECRUITER]: {
    id: 'rec_01',
    name: 'Priya Sundaram',
    email: 'priya.s@novatech.io',
    role: ROLES.RECRUITER,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
    company: 'NovaTech Global Inc.',
    designation: 'Lead University Talent Partner',
  },
  [ROLES.ADMIN]: {
    id: 'adm_01',
    name: 'System Admin',
    email: 'admin@campusconnect.internal',
    role: ROLES.ADMIN,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    accessLevel: 'Super Administrator',
  },
};

export const useAuthStore = create((set) => ({
  user: DEMO_PROFILES[ROLES.STUDENT],
  isAuthenticated: true,
  currentRole: ROLES.STUDENT,
  isLoading: false,

  // Demo login function (strictly mock demonstration, zero credentials stored)
  loginAsRole: (role) => {
    const profile = DEMO_PROFILES[role] || DEMO_PROFILES[ROLES.STUDENT];
    set({
      user: profile,
      isAuthenticated: true,
      currentRole: role,
    });
  },

  // Custom demo login with simulated profile
  demoLogin: ({ email, role = ROLES.STUDENT }) => {
    const base = DEMO_PROFILES[role] || DEMO_PROFILES[ROLES.STUDENT];
    set({
      user: {
        ...base,
        email: email || base.email,
      },
      isAuthenticated: true,
      currentRole: role,
    });
  },

  // Switch active demonstration role
  switchRole: (role) => {
    if (DEMO_PROFILES[role]) {
      set({
        user: DEMO_PROFILES[role],
        currentRole: role,
      });
    }
  },

  // Demo logout
  logout: () => {
    set({
      user: null,
      isAuthenticated: false,
      currentRole: null,
    });
  },
}));

