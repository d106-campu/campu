import { AxiosError } from 'axios';
import { useDispatch } from 'react-redux';
import { setIsLogin } from '@/features/login/authSlice';

const refresh = async (error: AxiosError) => {
  const dispatch = useDispatch();

  if (error.response?.status === 401) {
    localStorage.setItem('accessToken', '');
    dispatch(setIsLogin(false));
    window.location.href = '/login';
  }

  return Promise.reject(error);
};

export default refresh;