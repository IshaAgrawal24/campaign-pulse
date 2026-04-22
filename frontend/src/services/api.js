import axios from "axios";
console.log("import.meta.env.API_URL:", import.meta.env.VITE_API_URL);
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
    const res = error.response;

    console.log("API Error:", res?.data?.return_message || error.message);

    if (res?.status === 401) {
      console.log("Unauthorized - token expired or invalid");

      // Example: logout user
      localStorage.removeItem("token");
    }

    return Promise.reject(error);
  },
);

export default api;
