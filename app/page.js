import { NEXT_PUBLIC_API_URL } from '@/lib/urlUtils';
import HomePageClient from './page-client-full';

export const revalidate = 60; // ISR - Revalidate every 60 seconds

async function fetchWithTimeout(url, timeout = 30000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'Cache-Control': 'public, max-age=60, stale-while-revalidate=120'
      },
      next: { revalidate: 60 }
    });
    clearTimeout(id);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    clearTimeout(id);
    console.error(`Error fetching ${url}:`, error.message);
    return null;
  }
}

export default async function HomePage() {
  const API_URL = NEXT_PUBLIC_API_URL || 'https://dev.hellobd.news';
  
  // Fetch all data on server
  const [homeRes, adsRes, settingsRes] = await Promise.all([
    fetchWithTimeout(`${API_URL}/api/frontend/home`),
    fetchWithTimeout(`${API_URL}/api/frontend/advertisements`),
    fetchWithTimeout(`${API_URL}/api/frontend/general-settings`)
  ]);

  const initialData = {
    postsData: homeRes || {},
    banner: adsRes?.data || [],
    urlData: settingsRes || {}
  };

  return <HomePageClient initialData={initialData} />;
}
