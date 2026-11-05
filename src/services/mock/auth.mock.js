/**
 * Mock Auth Service
 * DISCLAIMER: Illustrative mock service for Phase 0 demonstration.
 * In Phase 2, this will be replaced by Django REST Framework JWT authentication.
 */
import { DEMO_PROFILES } from '../../store/authStore';
import { ROLES } from '../../constants/roles';

const delay = (ms = 180) => new Promise((resolve) => setTimeout(resolve, ms));

export const authMockService = {
  async login({ email, password, role }) {
    await delay();
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    const matchedRole = role || ROLES.STUDENT;
    const profile = DEMO_PROFILES[matchedRole] || {
      id: `usr_${Date.now()}`,
      name: email.split('@')[0],
      email,
      role: matchedRole,
    };

    return {
      success: true,
      token: 'demo-jwt-token-xyz-123456789',
      user: profile,
    };
  },

  async register(registrationData) {
    await delay();
    return {
      success: true,
      message: 'Account successfully registered for demonstration.',
      user: {
        id: `usr_${Date.now()}`,
        name: registrationData.fullName,
        email: registrationData.email,
        role: registrationData.role,
      },
    };
  },

  async requestPasswordReset(email) {
    await delay();
    return {
      success: true,
      message: `Password reset instructions sent to ${email}`,
    };
  },

  async getCurrentUser(role = ROLES.STUDENT) {
    await delay(100);
    return DEMO_PROFILES[role] || DEMO_PROFILES[ROLES.STUDENT];
  },
};
