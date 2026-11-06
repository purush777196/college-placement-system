import { create } from 'zustand';
import { ROLES } from '../constants/roles';
import { DEMO_USERS, authMockService } from '../services/mock/auth.mock';

// Compatibility export
export const DEMO_PROFILES = DEMO_USERS;

const SESSION_STORAGE_KEY = 'campusconnect_demo_session';

/**
 * Safe helper to read session without exposing sensitive data
 */
const getInitialSession = () => {
  if (typeof window === 'undefined') {
    return { user: DEMO_USERS[ROLES.STUDENT], isAuthenticated: true, currentRole: ROLES.STUDENT };
  }
  try {
    const stored =
      localStorage.getItem(SESSION_STORAGE_KEY) ||
      sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed && parsed.role) {
        return {
          user: parsed,
          isAuthenticated: true,
          currentRole: parsed.role,
        };
      }
    }
  } catch {
    // Fallback if storage access fails
  }
  return {
    user: DEMO_USERS[ROLES.STUDENT],
    isAuthenticated: true,
    currentRole: ROLES.STUDENT,
  };
};

const initialSession = getInitialSession();

export const useAuthStore = create((set, get) => ({
  user: initialSession.user,
  isAuthenticated: initialSession.isAuthenticated,
  currentRole: initialSession.currentRole,
  isLoading: false,
  authError: null,

  /**
   * Safe login action integrating with mock auth service
   */
  login: async ({ email, password, role, rememberMe = false }) => {
    set({ isLoading: true, authError: null });
    try {
      const response = await authMockService.login({ email, password, role });
      const authenticatedUser = response.user;

      // Safe non-sensitive profile storage (NO passwords, NO fake JWTs)
      const safeProfile = {
        id: authenticatedUser.id,
        name: authenticatedUser.name,
        email: authenticatedUser.email,
        role: authenticatedUser.role,
        avatar: authenticatedUser.avatar,
        department: authenticatedUser.department,
        companyName: authenticatedUser.companyName,
        collegeName: authenticatedUser.collegeName,
        placementStatus: authenticatedUser.placementStatus,
      };

      if (typeof window !== 'undefined') {
        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem(SESSION_STORAGE_KEY, JSON.stringify(safeProfile));
      }

      set({
        user: authenticatedUser,
        isAuthenticated: true,
        currentRole: authenticatedUser.role,
        isLoading: false,
        authError: null,
      });

      return { success: true, user: authenticatedUser };
    } catch (err) {
      const errorMsg = err.message || 'Authentication failed. Please verify credentials.';
      set({ isLoading: false, authError: errorMsg });
      throw err;
    }
  },

  /**
   * Handle successful registration state
   */
  handleRegistrationSuccess: (registeredUser) => {
    if (!registeredUser) return;
    set({
      user: registeredUser,
      isAuthenticated: true,
      currentRole: registeredUser.role,
    });
  },

  /**
   * Instant demo role switcher (convenience helper for testing)
   */
  loginAsRole: (role) => {
    const profile = DEMO_USERS[role] || DEMO_USERS[ROLES.STUDENT];
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(profile));
    }
    set({
      user: profile,
      isAuthenticated: true,
      currentRole: role,
      authError: null,
    });
  },

  /**
   * Custom demo login with simulated profile
   */
  demoLogin: ({ email, role = ROLES.STUDENT }) => {
    const base = DEMO_USERS[role] || DEMO_USERS[ROLES.STUDENT];
    const profile = {
      ...base,
      email: email || base.email,
    };
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(profile));
    }
    set({
      user: profile,
      isAuthenticated: true,
      currentRole: role,
      authError: null,
    });
  },

  /**
   * Switch active demonstration role
   */
  switchRole: (role) => {
    if (DEMO_USERS[role]) {
      const profile = DEMO_USERS[role];
      if (typeof window !== 'undefined') {
        sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(profile));
      }
      set({
        user: profile,
        currentRole: role,
      });
    }
  },

  /**
   * Retrieve current user profile asynchronously
   */
  getCurrentUser: async () => {
    const role = get().currentRole || ROLES.STUDENT;
    set({ isLoading: true });
    try {
      const user = await authMockService.getCurrentUser(role);
      set({ user, isLoading: false });
      return user;
    } catch {
      set({ isLoading: false });
      return null;
    }
  },

  /**
   * Initialize or restore demo session from storage
   */
  initializeSession: () => {
    const session = getInitialSession();
    set(session);
  },

  /**
   * Clear error state
   */
  clearAuthError: () => {
    set({ authError: null });
  },

  /**
   * Demo logout action
   */
  logout: () => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(SESSION_STORAGE_KEY);
        sessionStorage.removeItem(SESSION_STORAGE_KEY);
      } catch {
        // ignore
      }
    }
    set({
      user: null,
      isAuthenticated: false,
      currentRole: null,
      authError: null,
    });
  },
}));
