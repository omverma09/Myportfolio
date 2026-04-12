import axios from "axios";

// Automatically picks correct URL
// Development : http://localhost:5000/api
// Production  : https://your-render-url.onrender.com/api
const API_BASE_URL =
    process.env.REACT_APP_API_URL || "http://localhost:5000/api";

console.log("API URL:", API_BASE_URL);

// Create Axios Instance
const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 10000,
});

// Request Interceptor
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor
// Auto refresh token on 401
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (
            error.response?.status === 401 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;

            try {
                // Try to refresh token
                const res = await axios.post(
                    `${API_BASE_URL}/auth/refresh`,
                    {},
                    { withCredentials: true }
                );

                const newToken = res.data.data?.accessToken;

                if (newToken) {
                    localStorage.setItem("accessToken", newToken);

                    originalRequest.headers.Authorization = `Bearer ${newToken}`;
                    return api(originalRequest);
                }
            } catch (refreshError) {
                localStorage.removeItem("accessToken");
                window.location.href = "/";
            }
        }

        return Promise.reject(error);
    }
);

export default api;