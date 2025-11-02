// API Configuration
export const getApiUrl = (): string => {
  // Check environment variable first (highest priority)
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }

  // Check if running on production domain
  if (typeof window !== 'undefined' && window.location.hostname === 'www.blizzencreations.com') {
    return 'https://api.blizzencreations.com';
  }

  if (typeof window !== 'undefined' && window.location.hostname === 'blizzencreations.com') {
    return 'https://api.blizzencreations.com';
  }

  // Development mode: use localhost
  if (import.meta.env.DEV) {
    return 'http://localhost:5001';
  }

  // Default to localhost for development
  return 'http://localhost:5001';
};

export const API_BASE_URL = getApiUrl();
