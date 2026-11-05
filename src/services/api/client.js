import axios from 'axios';

/**
 * CampusConnect API Client
 *
 * NOTE: In Phase 0, all requests are handled by asynchronous mock services
 * located in src/services/mock/. This Axios instance establishes the foundation
 * contract that will integrate directly with the Django REST API backend in Phase 2.
 */
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request interceptor for attaching authorization tokens (Phase 2 integration)
apiClient.interceptors.request.use(
  (config) => {
    // Phase 2: Add Bearer token from authStore / cookie
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling & normalization
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const errorPayload = {
      message: error.response?.data?.message || error.message || 'An unexpected network error occurred',
      status: error.response?.status || 500,
      details: error.response?.data?.errors || null,
    };
    return Promise.reject(errorPayload);
  }
);

export default apiClient;
