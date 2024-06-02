import axios from "axios";

export const http = axios.create({
  baseURL: "http://localhost:4000/users",
  // baseURL: import.meta.env.VITE_BASE_API_URL,
});
http.interceptors.request.use(
  (config) => {
    let token = JSON.parse(localStorage.getItem("token"));
    if (token) {
      if (config.headers) {
        config.headers.token = token;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
