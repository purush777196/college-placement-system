/**
 * CampusConnect API Endpoints Catalog
 * Prepared for seamless integration with Django REST Framework endpoints.
 */
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/token/',
    REFRESH: '/auth/token/refresh/',
    REGISTER: '/auth/register/',
    LOGOUT: '/auth/logout/',
    ME: '/auth/me/',
    FORGOT_PASSWORD: '/auth/password/reset/',
  },
  STUDENTS: {
    LIST: '/students/',
    DETAIL: (id) => `/students/${id}/`,
    PROFILE: '/students/profile/',
    RESUME: '/students/resume/',
    APPLICATIONS: '/students/applications/',
  },
  COMPANIES: {
    LIST: '/companies/',
    DETAIL: (id) => `/companies/${id}/`,
    REGISTER: '/companies/register/',
  },
  DRIVES: {
    LIST: '/drives/',
    DETAIL: (id) => `/drives/${id}/`,
    CREATE: '/drives/',
    APPLY: (id) => `/drives/${id}/apply/`,
    ELIGIBILITY: (id) => `/drives/${id}/check-eligibility/`,
  },
  APPLICATIONS: {
    LIST: '/applications/',
    DETAIL: (id) => `/applications/${id}/`,
    UPDATE_STATUS: (id) => `/applications/${id}/status/`,
  },
  ANALYTICS: {
    OVERVIEW: '/analytics/overview/',
    TPO_DASHBOARD: '/analytics/tpo/',
    PACKAGE_DISTRIBUTION: '/analytics/packages/',
    DEPARTMENT_STATS: '/analytics/departments/',
  },
};

