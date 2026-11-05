import { describe, it, expect, beforeEach } from 'vitest';
import { useAuthStore, DEMO_PROFILES } from '../store/authStore';
import { useThemeStore } from '../store/themeStore';
import { useUIStore } from '../store/uiStore';
import { ROLES } from '../constants/roles';

describe('Zustand Stores Suite', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('authStore', () => {
    it('initializes with a default student user', () => {
      const state = useAuthStore.getState();
      expect(state.isAuthenticated).toBe(true);
      expect(state.currentRole).toBe(ROLES.STUDENT);
      expect(state.user.name).toBe('Aarav Sharma');
    });

    it('switches role to TPO correctly', () => {
      useAuthStore.getState().switchRole(ROLES.TPO);
      const state = useAuthStore.getState();
      expect(state.currentRole).toBe(ROLES.TPO);
      expect(state.user.role).toBe(ROLES.TPO);
      expect(state.user.name).toBe(DEMO_PROFILES[ROLES.TPO].name);
    });

    it('logs out user correctly without leaving credentials', () => {
      useAuthStore.getState().logout();
      const state = useAuthStore.getState();
      expect(state.isAuthenticated).toBe(false);
      expect(state.user).toBeNull();
      expect(state.currentRole).toBeNull();
    });

    it('logs in as Recruiter', () => {
      useAuthStore.getState().loginAsRole(ROLES.RECRUITER);
      const state = useAuthStore.getState();
      expect(state.isAuthenticated).toBe(true);
      expect(state.currentRole).toBe(ROLES.RECRUITER);
    });
  });

  describe('themeStore', () => {
    it('toggles theme between light and dark', () => {
      useThemeStore.getState().setTheme('light');
      expect(useThemeStore.getState().theme).toBe('light');

      useThemeStore.getState().toggleTheme();
      expect(useThemeStore.getState().theme).toBe('dark');

      useThemeStore.getState().toggleTheme();
      expect(useThemeStore.getState().theme).toBe('light');
    });

    it('persists theme selection to localStorage', () => {
      useThemeStore.getState().setTheme('dark');
      expect(localStorage.getItem('campusconnect-theme')).toBe('dark');
    });
  });

  describe('uiStore', () => {
    it('toggles sidebar collapse state', () => {
      const initial = useUIStore.getState().isSidebarCollapsed;
      useUIStore.getState().toggleSidebar();
      expect(useUIStore.getState().isSidebarCollapsed).toBe(!initial);
    });

    it('toggles mobile sidebar drawer', () => {
      useUIStore.getState().setMobileSidebarOpen(true);
      expect(useUIStore.getState().isMobileSidebarOpen).toBe(true);
      useUIStore.getState().setMobileSidebarOpen(false);
      expect(useUIStore.getState().isMobileSidebarOpen).toBe(false);
    });

    it('toggles search modal state', () => {
      useUIStore.getState().setSearchModalOpen(true);
      expect(useUIStore.getState().isSearchModalOpen).toBe(true);
      useUIStore.getState().setSearchModalOpen(false);
      expect(useUIStore.getState().isSearchModalOpen).toBe(false);
    });
  });
});

