import api from "./api";

export const authService = {
    // Login — returns { token, user }
    login: (credentials) =>
        api.post("/auth/login", credentials),

    // Register
    register: (data) =>
        api.post("/auth/register", data),

    // Get logged-in user
    getMe: () =>
        api.get("/auth/me"),

    // Logout — just clears local storage
    logout: () => {
        localStorage.removeItem("token");
    },

    // Check if token exists
    isLoggedIn: () =>
        !!localStorage.getItem("token"),
};