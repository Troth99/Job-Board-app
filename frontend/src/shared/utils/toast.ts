import { toast } from 'react-toastify';

//This file includes inline toast css styles.

export const showSuccess = (message: string, duration = 3000) => {
  toast.success(message, {
    position: "top-center",
    autoClose: duration,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};



export const showCompanySuccess = (message: string, duration = 3000) => {
  toast.success(message, {
    position: "top-center",
    autoClose: duration,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

export const showCompanyWarning = (message: string, duration = 3000) => {
  toast.warn(message, {
    position: "top-center",
    autoClose: duration,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    style: {
      backgroundColor: '#ff9800',
      color: '#fff',
      padding: '12px 20px',
      borderRadius: '8px',
      fontWeight: 'bold',
      fontSize: '14px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
    },
  });
};