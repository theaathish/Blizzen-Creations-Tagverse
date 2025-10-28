// API Configuration
export const getApiUrl = (): string => {
  // Check environment variable first
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }

  // Development: use localhost:5000
  if (import.meta.env.DEV) {
    return 'http://localhost:5000';
  }

  // Production: use relative path or environment variable
  return import.meta.env.VITE_API_URL || '/api';
};

export const API_BASE_URL = getApiUrl();
