import { ToastOptions, toast as toasts } from "react-toastify";

const toastOptions: ToastOptions = {
  position: "top-right",
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
};

const success = (message: string) => {
  toasts.success(message, toastOptions);
};
const error = (message: string) => {
  toasts.error(message, toastOptions);
};

const info = (message: string) => {
  toasts.info(message, toastOptions);
};

const warning = (message: string) => {
  toasts.warning(message, toastOptions);
};

const toast = {
  success,
  error,
  info,
  warning,
};

export default toast;
