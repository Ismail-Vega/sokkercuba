/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse } from "axios";
import { getNewAccessToken } from "./authService";

const TYPE = "application/json";
const CONTENT_TYPE = "Content-Type";

const axiosAdapter = async (config: any) => {
  const { method, url, data, headers: reqHeaders } = config;

  const headers = new Headers(
    {
      ...reqHeaders,
      [CONTENT_TYPE]: TYPE,
    } || {}
  );

  const requestInit: RequestInit = {
    method: method.toLowerCase(),
    headers,
    body: data,
    credentials: "include",
  };

  return new Promise<AxiosResponse>((resolve, reject) => {
    import.meta.env.API.fetch(url, requestInit)
      .then((response: Response) => {
        console.log("response check: ", response);

        const axiosResponse: AxiosResponse = {
          data: null,
          status: response.status,
          statusText: response.statusText,
          headers: {} as any,
          config,
        };

        response.headers.forEach((value, key) => {
          axiosResponse.headers[key] = value;
        });

        response
          .json()
          .then((data) => {
            axiosResponse.data = data;
            resolve(axiosResponse);
          })
          .catch((err) => {
            reject(err);
          });
      })
      .catch((error: any) => {
        reject(error);
      });
  });
};

const axiosInstance = axios.create({
  headers: {
    Accept: TYPE,
    [CONTENT_TYPE]: TYPE,
  },
  withCredentials: true,
  adapter: axiosAdapter,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error?.config;

    if (error?.response?.status === 401 && !originalRequest?._retry) {
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
