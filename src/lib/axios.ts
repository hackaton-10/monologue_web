import axios, { AxiosInstance } from 'axios';

export const customAxios: AxiosInstance = axios.create({
  baseURL: 'http://10.129.57.195:5000',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

customAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  config.headers.Authorization = token;
  return config;
});
