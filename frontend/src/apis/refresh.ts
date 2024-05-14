import { AxiosError } from 'axios';

const refresh = async (error: AxiosError) => {

  if (error.response?.status === 401) {
    localStorage.setItem('accessToken', '');
    window.location.href = '/login';
  }

  return Promise.reject(error);
};

export default refresh;