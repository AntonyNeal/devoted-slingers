import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  const tenantId = localStorage.getItem('tenantId');
  if (tenantId) {
    config.headers['X-Tenant-Id'] = tenantId;
  }
  
  return config;
});

// Matchmaking API
export const matchmakingApi = {
  getPotentialMatches: async (limit = 10) => {
    const response = await api.get(`/matchmaking/potential`, { params: { limit } });
    return response.data;
  },

  swipe: async (targetUserId: string, action: 'like' | 'pass') => {
    const response = await api.post(`/matchmaking/swipe`, { targetUserId, action });
    return response.data;
  },

  getMatches: async (status?: string) => {
    const response = await api.get(`/matchmaking/matches`, { params: { status } });
    return response.data;
  },

  getMatch: async (matchId: string) => {
    const response = await api.get(`/matchmaking/matches/${matchId}`);
    return response.data;
  },
};

// User API
export const userApi = {
  getProfile: async (userId: string) => {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  },

  updateProfile: async (userId: string, updates: any) => {
    const response = await api.patch(`/users/${userId}`, updates);
    return response.data;
  },

  searchUsers: async (filters: any) => {
    const response = await api.post(`/users/search`, filters);
    return response.data;
  },
};
