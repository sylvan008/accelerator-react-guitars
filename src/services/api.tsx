import axios, {AxiosInstance} from 'axios';

const BACKEND_URL = 'https://accelerator-guitar-shop-api-v1.glitch.me/';
const REQUEST_TIMEOUT = 5000;

export function createApi(): AxiosInstance {
  return axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });
}
