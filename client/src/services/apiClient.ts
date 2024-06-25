/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { getNewAccessToken } from "./authService";

const TYPE = "application/json";
const CONTENT_TYPE = "Content-Type";

const baseHeaders = {
  Accept: TYPE,
  [CONTENT_TYPE]: TYPE,
};

const axiosInstance = axios.create({
  withCredentials: true,
});

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
    headers: { ...baseHeaders, ...headers },
  });

export default apiClient;
