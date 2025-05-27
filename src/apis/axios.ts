import axios, { type AxiosInstance } from "axios";

const instance: AxiosInstance = axios.create({
  baseURL: "https://api.to2-chat.shop",
  timeout: 10000,
  withCredentials: true,
});

export default instance;

instance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
