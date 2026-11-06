import { useAuthStore } from '../store/authStore';

export function useAuth() {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const currentRole = useAuthStore((state) => state.currentRole);
  const isLoading = useAuthStore((state) => state.isLoading);
  const authError = useAuthStore((state) => state.authError);

  const login = useAuthStore((state) => state.login);
  const loginAsRole = useAuthStore((state) => state.loginAsRole);
  const demoLogin = useAuthStore((state) => state.demoLogin);
  const switchRole = useAuthStore((state) => state.switchRole);
  const logout = useAuthStore((state) => state.logout);
  const handleRegistrationSuccess = useAuthStore((state) => state.handleRegistrationSuccess);
  const getCurrentUser = useAuthStore((state) => state.getCurrentUser);
  const clearAuthError = useAuthStore((state) => state.clearAuthError);
  const initializeSession = useAuthStore((state) => state.initializeSession);

  return {
    user,
    isAuthenticated,
    currentRole,
    isLoading,
    authError,
    login,
    loginAsRole,
    demoLogin,
    switchRole,
    logout,
    handleRegistrationSuccess,
    getCurrentUser,
    clearAuthError,
    initializeSession,
  };
}

export default useAuth;
