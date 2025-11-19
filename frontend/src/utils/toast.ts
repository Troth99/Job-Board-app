import { toast } from 'react-toastify';


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


