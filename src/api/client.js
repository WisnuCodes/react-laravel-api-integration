import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api',
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
  config.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate';
  config.headers['Pragma'] = 'no-cache';
  config.headers['Expires'] = '0';
  
  return config;
});

export const apiRequest = async (endpoint, options) => {
  try {
    const method = options?.method || 'GET';

    let data = options?.body;
    if (data && typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (err) {
        void err;
      }
    }

    const response = await api.request({
      url: endpoint,
      method: method,
      data: data,
    });

    return response.data;
  } catch (error) {
    console.error("API Request Error:", error);
    if (error.response && error.response.data) {
        throw error.response.data;
    }
    throw error;
  }
};

export default api;
