/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { getNewAccessToken } from "./authService";

const TYPE = "application/json";
const CONTENT_TYPE = "Content-Type";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:8787",
  headers: {
    Accept: TYPE,
    [CONTENT_TYPE]: TYPE,
  },
  withCredentials: true,
});

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newAccessToken = await getNewAccessToken();

        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newAccessToken}`;

        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed", refreshError);
      }
    }
    return Promise.reject(error);
  }
);

const apiClient = (method: string, query: string, data?: any, headers?: any) =>
  axiosInstance({
    method,
    url: query,
    data,
    headers: { ...headers },
  });

export default apiClient;
