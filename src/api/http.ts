import { getToken } from "@rt/authentication/auth-utils";
import axios from "axios";


 const axiosInstance = axios.create({
  baseURL: "https://case.nodelabs.dev/api/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",

  },
});


axiosInstance.interceptors.request.use(
  function (config) {
    const token = getToken();
    if (token) {
      config.headers = config.headers ?? {};
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  function (err) {
    return Promise.reject(err);
  }
);


export default axiosInstance;
