export const ROLES = {
  STUDENT: 'student',
  TPO: 'tpo',
  RECRUITER: 'recruiter',
  ADMIN: 'admin',
};

export const ROLE_LABELS = {
  [ROLES.STUDENT]: 'Student',
  [ROLES.TPO]: 'Placement Officer (TPO)',
  [ROLES.RECRUITER]: 'Corporate Recruiter',
  [ROLES.ADMIN]: 'System Administrator',
};

export const ROLE_COLORS = {
  [ROLES.STUDENT]: {
    badge: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800',
    dot: 'bg-blue-600',
  },
  [ROLES.TPO]: {
    badge: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800',
    dot: 'bg-emerald-600',
  },
  [ROLES.RECRUITER]: {
    badge: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800',
    dot: 'bg-amber-600',
  },
  [ROLES.ADMIN]: {
    badge: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-800',
    dot: 'bg-rose-600',
  },
};
