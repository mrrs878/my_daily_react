import axios from 'axios';
import MAIN_CONFIG from '../config';

const instance = axios.create({
  timeout: 12 * 1000,
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem(MAIN_CONFIG.TOKEN_NAME);
  config.headers.Authorization = `Bear ${token}`;
  return config;
});
instance.interceptors.response.use((response) => {
  if (response.status !== 200) return Promise.resolve(response.status);
  if (response.data.msg === 'token已过期') {
    localStorage.removeItem(MAIN_CONFIG.TOKEN_NAME);
  }
  return Promise.resolve(response.data);
}, (error: Error) => {
  console.log(error);
  return Promise.resolve(error);
});

export default instance;
