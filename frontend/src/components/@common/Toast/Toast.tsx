import { ReactNode } from 'react';
import { toast, ToastOptions, Flip } from 'react-toastify';
import './Toast.css';

const defaultToastOption: ToastOptions = {
  autoClose: 1000, // 자동 닫힘 시간 (2000ms)
  hideProgressBar: true,
  pauseOnHover: false,
  closeButton: false, 
  delay: 100, 
  transition: Flip,
};

const Toast = {
  info: (message: ReactNode, options: ToastOptions = {}) => {
    toast.info(message, { ...defaultToastOption, icon: false, ...options });
  },
  success: (message: ReactNode, options: ToastOptions = {}) => {
    toast.success(message, { ...defaultToastOption, icon: false, ...options });
  },
  error: (message: ReactNode, options: ToastOptions = {}) => {
    toast.error(message, { ...defaultToastOption, icon: false, ...options });
  },
};

export default Toast;
