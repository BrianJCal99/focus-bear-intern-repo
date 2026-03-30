import axios from "axios";

// Generate a simple request ID
const generateRequestId = () => {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 10)}`;
};

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 10000, // 10 seconds
  headers: {
    accept: "*/*",
  },
});

// REQUEST INTERCEPTOR
axiosInstance.interceptors.request.use(
  (config) => {
    // Attach dynamic request ID
    config.headers["X-Request-ID"] = generateRequestId();

    // Get token from localStorage
    const token = localStorage.getItem("authToken");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;