import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.RASENGAN_PUBLIC_BACKEND_SERVER_URL || "",
  timeout: 0,
  maxBodyLength: Infinity,
  maxContentLength: Infinity,
});

axiosInstance.interceptors.request.use(async (config) => {
  // Check if we're in a browser environment before accessing localStorage
  if (typeof window !== "undefined") {
    const AUTH_TOKEN = localStorage.getItem("AUTH_TOKEN");
    if (AUTH_TOKEN) {
      config.headers.Authorization = `Bearer ${AUTH_TOKEN}`;
    }
  }
  return config;
});

export { axiosInstance };
