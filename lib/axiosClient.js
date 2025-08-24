// utils/axiosClient.js
import axios from "axios";
import Cookies from "js-cookie";

// Create axios instance
const axiosClient = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to attach access token
axiosClient.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get("accessToken"); // read from cookie
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor (optional: handle 401 globally)
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Optionally, redirect to login page or refresh token
      console.log("Unauthorized - maybe redirect to login");
    }
    return Promise.reject(error);
  }
);

export default axiosClient;