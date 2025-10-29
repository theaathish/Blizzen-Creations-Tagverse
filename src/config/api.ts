// API Configuration
export const getApiUrl = (): string => {
  // Check environment variable first (highest priority)
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }

  // Development mode: use remote server or localhost
  if (import.meta.env.DEV) {
    return 'https://blizzen-creations-tagverse.onrender.com';
  }

  // Production/Preview mode: use localhost for testing
  // In real production deployment, this would be your production API URL
  return 'http://localhost:5001';
};

export const API_BASE_URL = getApiUrl();
