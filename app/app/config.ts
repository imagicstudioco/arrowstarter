export const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL || 'https://arrowstarter.vercel.app';
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

// API endpoints
export const API_ENDPOINTS = {
  USER_INFO: (address: string) => `${API_BASE_URL}/user-info/${address}`,
  // Add other endpoints as needed
};