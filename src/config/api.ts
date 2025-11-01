// API Configuration
export const getApiUrl = (): string => {
  // Check environment variable first (highest priority)
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }

  // Fallback: throw error to ensure proper configuration
  throw new Error(
    'VITE_API_URL environment variable is not set. Please configure it in your .env file.'
  );
};

export const API_BASE_URL = getApiUrl();
