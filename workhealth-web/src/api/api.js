import axios from 'axios';
import { TOKEN_KEY } from '../utils';
import { logoutUser } from '../redux/pages/Login/actions';
import store from '../store';

export const API_BASE_ADDRESS = `http://37.139.8.242:3000/`;

const axiosInstance = axios.create({
  baseURL: API_BASE_ADDRESS,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'credentials': 'same-origin',
  },
});

axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      config.headers.authorization = `Basic ${token}`;
    }

    return config;
  },
  error => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (!error.response) {
      return Promise.reject(error);
    }

    if (error.response.status === 401 || error.response.status === 403) {
      store.dispatch(logoutUser());
    }

    return Promise.reject(error);
  },
);

export default {
  get: (url, config) => axiosInstance.get(url, config),
  post: (url, data, config) => axiosInstance.post(url, data, config),
  put: (url, data, config) => axiosInstance.put(url, data, config),
  delete: (url, config) => axiosInstance.delete(url, config),
  patch: (url, data, config) => axiosInstance.patch(url, data, config),
};
