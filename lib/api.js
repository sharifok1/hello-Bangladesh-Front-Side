import axios from 'axios';
import { NEXT_PUBLIC_API_URL } from './urlUtils';


const API_URL = NEXT_PUBLIC_API_URL

// const isLocalhost = typeof window !== 'undefined' 
//   ? window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
//   : process.env.NODE_ENV === 'development';


const api = axios.create({
    baseURL: `${API_URL}/api/frontend`,
    timeout: 10000,
    headers: {
      'Cache-Control': 'public, max-age=60, stale-while-revalidate=120'
    }
});

// Prevent spamming identical error logs: map url -> last logged timestamp
const errorLogCooldown = new Map();
const ERROR_LOG_COOLDOWN_MS = 60 * 1000; // 1 minute

// Log requests for debugging
api.interceptors.request.use(config => {
  try {
    if (process.env.NODE_ENV === 'development') {
      const method = (config?.method || '').toUpperCase();
      const url = `${config?.baseURL || ''}${config?.url || ''}`;
      try { if (typeof console !== 'undefined' && typeof console.info === 'function') console.info('[api] Request:', method, url); } catch (e) {}
    }
  } catch (e) {}
  return config;
});

// safe logging helpers
const safeLog = {
  info: (...args) => { try { if (typeof console !== 'undefined' && typeof console.info === 'function') console.info(...args); } catch (e) {} },
  warn: (...args) => { try { if (typeof console !== 'undefined' && typeof console.warn === 'function') console.warn(...args); } catch (e) {} },
  error: (...args) => { try { if (process.env.NODE_ENV === 'development') { if (typeof console !== 'undefined' && typeof console.warn === 'function') console.warn(...args); } else { if (typeof console !== 'undefined' && typeof console.error === 'function') console.error(...args); } } catch (e) {} },
  debug: (...args) => { try { if (typeof console !== 'undefined' && typeof console.debug === 'function') console.debug(...args); } catch (e) {} },
};

// Log responses and errors for easier diagnosis of 500s
api.interceptors.response.use(
  res => {
    try {
      if (process.env.NODE_ENV === 'development') {
        const method = (res.config?.method || '').toUpperCase();
        const url = `${res.config?.baseURL || ''}${res.config?.url || ''}`;
        safeLog.info('[api] Response:', res.status, method, url);
      }
    } catch (e) {}
    return res;
  },
  err => {
    try {
      // Be defensive: `err` may be non-standard
      const config = err && err.config ? err.config : null;
      const response = err && err.response ? err.response : null;

      const method = config && typeof config.method === 'string' ? config.method.toUpperCase() : '';
      const url = config ? `${config.baseURL || ''}${config.url || ''}` : (err && err.request && err.request?.url) || 'unknown';

      // Automatic retry for idempotent GET requests (exponential backoff)
      const MAX_RETRIES = 3;
      if (config && method === 'GET') {
        config.__retryCount = config.__retryCount || 0;

        // If server returned 429, prefer Retry-After header when present
        const status = response?.status;
        if (status === 429 && config.__retryCount < MAX_RETRIES) {
          config.__retryCount += 1;
          const ra = response.headers?.['retry-after'];
          let backoff = 1000 * Math.pow(2, config.__retryCount - 1); // base 1s exponential
          if (ra) {
            const raSec = parseInt(ra, 10);
            if (!Number.isNaN(raSec)) backoff = raSec * 1000;
          }
          safeLog.warn(`[api] Received 429, retrying ${config.__retryCount}/${MAX_RETRIES} after ${backoff}ms:`, url);
          return new Promise((resolve) => setTimeout(resolve, backoff)).then(() => api(config));
        }

        // Generic GET retry for other transient errors
        if (config.__retryCount < MAX_RETRIES) {
          config.__retryCount += 1;
          const backoff = 200 * Math.pow(2, config.__retryCount - 1); // exponential
          safeLog.warn(`[api] GET request failed, retrying ${config.__retryCount}/${MAX_RETRIES} after ${backoff}ms:`, url);
          return new Promise((resolve) => setTimeout(resolve, backoff)).then(() => api(config));
        }
      }

      // Throttle identical error logs to avoid flooding console
      const safeMethod = String(method || '');
      const safeUrl = String(url || '');
      const logKey = `${safeMethod} ${safeUrl}`;
      const lastLogged = errorLogCooldown.get(logKey) || 0;
      const now = Date.now();
      const shouldLog = now - lastLogged > ERROR_LOG_COOLDOWN_MS;

      if (shouldLog) {
        try { errorLogCooldown.set(logKey, now); } catch (e) {}
        safeLog.error('[api] Error Request:', safeMethod, safeUrl);
        if (response) {
          safeLog.error('[api] Error Response Status:', response.status);
          // try to stringify response.data safely
          try { safeLog.error('[api] Error Response Data:', JSON.parse(JSON.stringify(response.data))); } catch (e) { safeLog.error('[api] Error Response Data (raw):', response.data); }
        } else {
          safeLog.error('[api] No response received:', err && err.message ? err.message : err);
        }
      } else {
        safeLog.debug('[api] Suppressed repeated error log for', logKey);
      }
    } catch (e) {
      console.error('[api] Error serializing axios error', e);
    }
    return Promise.reject(err);
  }
);

export default api;
