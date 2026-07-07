import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const apiRequest = async (endpoint: string, options?: any) => {
  try {
    const method = options?.method || 'GET';
    
    let data = options?.body;
    if (data && typeof data === 'string') {
      try { data = JSON.parse(data); } catch {}
    }

    const response = await api.request({
      url: endpoint,
      method: method,
      data: data,
    });
    
    return response.data;
  } catch (error: any) {
    console.error("API Request Error:", error);
    if (error.response && error.response.data) {
        throw error.response.data;
    }
    throw error;
  }
};
