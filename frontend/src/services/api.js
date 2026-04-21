import axios from "axios";
console.log("import.meta.env.API_URL:", import.meta.env.VITE_API_URL)
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // important if using cookies
});

// Request Interceptor (attach token)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Response Interceptor (handle errors globally)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("API Error:", error.response?.data || error.message);

    // if (error.response?.status === 401) {
    //   // auto logout (future improvement)
    // }

    return Promise.reject(error);
  },
);

export default api;
