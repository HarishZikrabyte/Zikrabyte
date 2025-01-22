// src/axios.js
import axios from "axios";

// Create an Axios instance with a base URL
const apiUrl = import.meta.env.VITE_API_URL;

const instance = axios.create({
  baseURL: apiUrl,
});

// Add a request interceptor to attach the token if available
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken"); // Get the auth token from localStorage
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`; // Attach the token
  } else {
    console.error("No auth token found.");
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Handle responses globally (for 401 Unauthorized)
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Authentication failed. Please log in again.");
      localStorage.removeItem("authToken");  // Remove invalid token
      window.location.href = "/login";  // Redirect to login page
    }
    return Promise.reject(error);
  }
);

export default instance;
