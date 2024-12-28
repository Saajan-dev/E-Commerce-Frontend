import axios from "axios";
import { deleteCookie, getCookie, setCookie } from "../../utils/helpers";
import { baseUrl, cookie_user_data } from "../../config";

const headers = {
  "Content-Type": "application/json",
  "ngrok-skip-browser-warning": true,
};

const BASE_URL = baseUrl;

const http = axios.create({
  baseURL: BASE_URL,
  headers,
});

export default http;
http.interceptors.request.use(
  (config) => {
    const value = getCookie(cookie_user_data);
    if (value) {
      config.headers.Authorization = `Bearer ${value?.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

http.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      (error.response.status === 403 || error.response.status === 401) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const value = getCookie(cookie_user_data);

      if (!value) {
        deleteCookie(cookie_user_data);
        return Promise.reject(new Error("No credentials found"));
      }

      const { user_id } = value;

      try {
        const response = await axios.post(
          `${BASE_URL}/admin-auth/refresh-token`,
          { user_id }
        );

        const newToken = response?.data?.data?.token;

        if (!newToken) {
          deleteCookie(cookie_user_data);
          return Promise.reject(new Error("No token received"));
        }

        const newValue = JSON.stringify({ ...value, token: newToken });

        setCookie(cookie_user_data, newValue, 5);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        return axios(originalRequest);
      } catch (refreshError) {
        deleteCookie(cookie_user_data);
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
