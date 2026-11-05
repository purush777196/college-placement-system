import { useAuthStore } from '../store/authStore';

export function useAuth() {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const currentRole = useAuthStore((state) => state.currentRole);
  const loginAsRole = useAuthStore((state) => state.loginAsRole);
  const demoLogin = useAuthStore((state) => state.demoLogin);
  const switchRole = useAuthStore((state) => state.switchRole);
  const logout = useAuthStore((state) => state.logout);

  return {
    user,
    isAuthenticated,
    currentRole,
    loginAsRole,
    demoLogin,
    switchRole,
    logout,
  };
}

