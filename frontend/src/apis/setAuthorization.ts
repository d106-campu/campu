import { InternalAxiosRequestConfig } from 'axios';

const setAuthorization = (config: InternalAxiosRequestConfig) => {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
};

export default setAuthorization;