// THIRD-PARTY
import axios, { AxiosError, AxiosResponse } from 'axios';
import { dispatch } from 'store';
import { openSnackbar } from 'store/slices/snackbar';

const BASE_URL = 'http://localhost:5000/api/';

const access_token = localStorage.getItem('authToken');

const axiosServices = axios.create({
  baseURL: BASE_URL
});

// interceptor for http
axiosServices.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Wrong Services')
);
export const alertRequestError = (error: AxiosError): void => {
  const message = error.response && getErrorMessage(error.response);
  if (message) {
    dispatch(
      openSnackbar({
        open: true,
        severity: 'error',
        message,
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
        variant: 'alert',
        alert: {
          color: 'error'
        },
        close: true
      })
    );
  }
};

export const alertRequestFailure = (message: string): void => {
  dispatch(
    openSnackbar({
      open: true,
      severity: 'error',
      message,
      anchorOrigin: { vertical: 'top', horizontal: 'right' },
      variant: 'alert',
      alert: {
        color: 'error'
      },
      close: true
    })
  );
};

export const alertRequestSuccess = (message: string): void => {
  dispatch(
    openSnackbar({
      open: true,
      severity: 'success',
      message,
      anchorOrigin: { vertical: 'top', horizontal: 'right' },
      variant: 'alert',
      alert: {
        color: 'success'
      },
      close: true
    })
  );
};

export const getErrorMessage = (error: AxiosResponse): string => {
  const msg = error?.data?.message || error?.data?.msg || error?.data?.desc || '';
  if (error) {
    return msg;
  }

  return '間違ったサービス';
};
export default axiosServices;
export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${access_token}` }
});
