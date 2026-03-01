// Simple proxy + in-memory cache for frontend -> backend calls
// - Caches GET responses for a short TTL
// - Proxies request to BACKEND_URL (env) or package.json proxy (default to http://127.0.0.1:8000)
// - Returns safe JSON fallbacks for known endpoints when backend is down

import { BACKEND_URL } from '@/lib/urlUtils';

const CACHE_TTL_MS = 30 * 1000; // 30 seconds
const cache = new Map();

const getBackendUrl = () => {
  // Allow overriding via env in production
  if (BACKEND_URL) return BACKEND_URL.replace(/\/$/, '');
  // fallback to proxy defined in package.json or localhost
  try {
    // eslint-disable-next-line no-undef
    // require is available in Node runtime
    // eslint-disable-next-line global-require
    const pkg = require('../../../../package.json');
    if (pkg && pkg.proxy) return String(pkg.proxy).replace(/\/$/, '');
  } catch (e) {}
  return 'http://127.0.0.1:8000';
};

const BACKEND = getBackendUrl();

async function proxyGet(path, search) {
  const target = `${BACKEND}/${path}${search || ''}`;

  // Check cache
  const key = `GET ${target}`;
  const cached = cache.get(key);
  if (cached && cached.expiresAt > Date.now()) {
    return new Response(cached.body, { status: cached.status, headers: cached.headers });
  }

  // Fetch from backend
  try {
    // Disable Next.js data cache for large responses (>2MB limit)
    const res = await fetch(target, { 
      method: 'GET',
      cache: 'no-store' // Bypass Next.js data cache
    });
    const contentType = res.headers.get('content-type') || '';
    const body = await res.text();

    // Store in cache
    try {
      const headers = {};
      // only copy a few safe headers
      if (contentType) headers['content-type'] = contentType;
      cache.set(key, { expiresAt: Date.now() + CACHE_TTL_MS, status: res.status, headers, body });
    } catch (e) {}

    return new Response(body, { status: res.status, headers: { 'content-type': contentType } });
  } catch (e) {
    // On network error, return cached if available
    if (cached) {
      return new Response(cached.body, { status: cached.status, headers: cached.headers });
    }

    // Provide small fallback for known endpoints
    if (path.includes('/home') || path === 'home') {
      const fallback = JSON.stringify({ popular: [], breaking: [] });
      return new Response(fallback, { status: 200, headers: { 'content-type': 'application/json' } });
    }

    if (path.includes('advertisements')) {
      const fallback = JSON.stringify([]);
      return new Response(fallback, { status: 200, headers: { 'content-type': 'application/json' } });
    }

    return new Response(JSON.stringify({ error: 'backend_unavailable' }), { status: 502, headers: { 'content-type': 'application/json' } });
  }
}

export async function GET(request, { params }) {
  const pathParts = params?.path || [];
  const path = pathParts.join('/');
  const search = request.nextUrl?.search || '';

  // Only proxy GET for now
  try {
    return await proxyGet(path, search);
  } catch (err) {
    // Log full error for production debugging (check server logs)
    // Keep response small but include message for immediate debugging
    // Remove or harden this before long-term production use.
    // eslint-disable-next-line no-console
    console.error('[api/frontend] proxy error:', err);
    const msg = (err && err.message) ? String(err.message) : 'unknown_error';
    return new Response(JSON.stringify({ error: 'internal_server_error', message: msg }), { status: 500, headers: { 'content-type': 'application/json' } });
  }
}

