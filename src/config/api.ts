const LOCAL_API_FALLBACK = 'http://localhost:5001';

const isLocalHostname = (hostname: string | undefined) => {
  if (!hostname) return false;
  return hostname === 'localhost' || hostname === '127.0.0.1' || hostname.endsWith('.local');
};

// API Configuration with smart fallback for local development
export const getApiUrl = (): string => {
  const envApiUrl = import.meta.env.VITE_API_URL?.trim();
  const forceRemote = import.meta.env.VITE_FORCE_REMOTE_API === 'true';

  if (envApiUrl) {
    if (import.meta.env.DEV && !forceRemote) {
      const currentHostname = typeof window !== 'undefined' ? window.location.hostname : '';
      const looksLikeDevTunnel = /devtunnels\.ms/i.test(envApiUrl);

      if (isLocalHostname(currentHostname) && looksLikeDevTunnel) {
        console.warn('[API] Detected dev tunnel URL while running locally. Falling back to localhost to avoid frequent timeouts.');
      } else {
        return envApiUrl;
      }
    } else {
      return envApiUrl;
    }
  }

  if (typeof window !== 'undefined') {
    const host = window.location.hostname;
    if (host === 'www.blizzencreations.com' || host === 'blizzencreations.com') {
      return 'https://api.blizzencreations.com';
    }
  }

  if (import.meta.env.DEV) {
    return LOCAL_API_FALLBACK;
  }

  return LOCAL_API_FALLBACK;
};

export const API_BASE_URL = getApiUrl();
