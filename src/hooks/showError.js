import {toast} from 'react-toastify';

export const showError = error => {
  toast(error?.response?.data?.message || 'Something went wrong', {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    type: 'error',
  });
};

export const successMessage = message => {
  toast(message || 'Done Successfully.', {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    type: 'success',
  });
};
