import axios from 'axios';
import { API_BASE_URL } from '@/config/api';

// Create axios instance with optimized defaults
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 second timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Simple in-memory cache
const cache = new Map<string, { data: any; timestamp: number; ttl: number }>();

// Cache TTL (Time To Live) in milliseconds
const CACHE_TTL = {
  SHORT: 2 * 60 * 1000,    // 2 minutes
  MEDIUM: 5 * 60 * 1000,   // 5 minutes
  LONG: 15 * 60 * 1000,    // 15 minutes
};

// Cache helper functions
const getCacheKey = (url: string, params?: any) => {
  return `${url}${params ? JSON.stringify(params) : ''}`;
};

const isValidCache = (cacheEntry: any) => {
  return Date.now() - cacheEntry.timestamp < cacheEntry.ttl;
};

const getFromCache = (key: string) => {
  const cacheEntry = cache.get(key);
  if (cacheEntry && isValidCache(cacheEntry)) {
    return cacheEntry.data;
  }
  cache.delete(key); // Remove expired cache
  return null;
};

const setCache = (key: string, data: any, ttl: number) => {
  cache.set(key, {
    data,
    timestamp: Date.now(),
    ttl,
  });
};

// API service functions with caching
export const apiService = {
  // Home content - cache for 5 minutes
  async getHomeContent() {
    const cacheKey = getCacheKey('/api/home-content');
    const cached = getFromCache(cacheKey);
    if (cached) return cached;

    const response = await apiClient.get('/api/home-content');
    const data = response.data;
    setCache(cacheKey, data, CACHE_TTL.MEDIUM);
    return data;
  },

  // Courses - cache for 5 minutes
  async getCourses() {
    const cacheKey = getCacheKey('/api/courses');
    const cached = getFromCache(cacheKey);
    if (cached) return cached;

    const response = await apiClient.get('/api/courses');
    const data = response.data;
    setCache(cacheKey, data, CACHE_TTL.MEDIUM);
    return data;
  },

  // Single course - cache for 15 minutes
  async getCourse(id: string) {
    const cacheKey = getCacheKey(`/api/courses/${id}`);
    const cached = getFromCache(cacheKey);
    if (cached) return cached;

    const response = await apiClient.get(`/api/courses/${id}`);
    const data = response.data;
    setCache(cacheKey, data, CACHE_TTL.LONG);
    return data;
  },

  // Placements - cache for 5 minutes
  async getPlacements() {
    const cacheKey = getCacheKey('/api/placements');
    const cached = getFromCache(cacheKey);
    if (cached) return cached;

    const response = await apiClient.get('/api/placements');
    const data = response.data;
    setCache(cacheKey, data, CACHE_TTL.MEDIUM);
    return data;
  },

  // Contact info - cache for 15 minutes
  async getContactInfo() {
    const cacheKey = getCacheKey('/api/contact-info');
    const cached = getFromCache(cacheKey);
    if (cached) return cached;

    const response = await apiClient.get('/api/contact-info');
    const data = response.data;
    setCache(cacheKey, data, CACHE_TTL.LONG);
    return data;
  },

  // About info - cache for 15 minutes
  async getAboutInfo() {
    const cacheKey = getCacheKey('/api/about');
    const cached = getFromCache(cacheKey);
    if (cached) return cached;

    const response = await apiClient.get('/api/about');
    const data = response.data;
    setCache(cacheKey, data, CACHE_TTL.LONG);
    return data;
  },

  // Enquiries - no cache (always fresh)
  async getEnquiries() {
    const response = await apiClient.get('/api/enquiries');
    return response.data;
  },

  // Post enquiry - no cache
  async postEnquiry(data: any) {
    const response = await apiClient.post('/api/enquiries', data);
    return response.data;
  },

  // Batch fetch multiple endpoints in parallel
  async batchFetch(endpoints: string[]) {
    const promises = endpoints.map(endpoint => {
      const cacheKey = getCacheKey(endpoint);
      const cached = getFromCache(cacheKey);
      if (cached) return Promise.resolve(cached);
      return apiClient.get(endpoint).then(res => res.data);
    });

    return Promise.all(promises);
  },

  // Clear cache (useful for admin operations)
  clearCache() {
    cache.clear();
  },

  // Clear specific cache entry
  clearCacheEntry(key: string) {
    cache.delete(key);
  }
};

// Request interceptor for performance monitoring
apiClient.interceptors.request.use((config) => {
  (config as any).metadata = { startTime: Date.now() };
  return config;
});

// Response interceptor for performance monitoring and protection
apiClient.interceptors.response.use(
  (response) => {
    const duration = Date.now() - (response.config as any).metadata.startTime;
    if (duration > 1000) {
      console.warn(`Slow API call: ${response.config.url} took ${duration}ms`);
    }
    return response;
  },
  (error) => {
    const duration = Date.now() - (error.config as any)?.metadata?.startTime;
    console.error(`API error: ${error.config?.url} failed after ${duration}ms`, error);
    
    // Check for potential tampering
    if (error.code === 'ECONNREFUSED' || error.code === 'NETWORK_ERROR') {
      console.log('%c🚨 POTENTIAL TAMPERING DETECTED', 'color: red; font-size: 16px; font-weight: bold;');
      console.log('%c📧 Contact Admin: strucureo@gmail.com', 'color: green; font-size: 14px;');
    }
    
    return Promise.reject(error);
  }
);

export default apiService;