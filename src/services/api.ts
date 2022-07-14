import axios, { AxiosInstance } from "axios";
import { getBaseAPIUrl } from "../config";

let axiosInstance = axios.create({
  baseURL: getBaseAPIUrl(),
  responseType: "json",
});

export function setupInterceptorsTo(
  axiosInstance: AxiosInstance
): AxiosInstance {
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    function (error) {
      if (error.response.status === 401) {
        localStorage.removeItem("accessToken");
      }
      return Promise.reject(error);
    }
  );
  return axiosInstance;
}

axiosInstance = setupInterceptorsTo(axiosInstance);

export default axiosInstance;
