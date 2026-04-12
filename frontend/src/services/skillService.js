import api from "./api";

export const skillService = {
    // Get all skills — optional query params: ?category=
    getAll: (params = {}) =>
        api.get("/skills", { params }),

    // Get single skill by ID
    getById: (id) =>
        api.get(`/skills/${id}`),

    // Create new skill  (admin)
    create: (data) =>
        api.post("/skills", data),

    // Update skill  (admin)
    update: (id, data) =>
        api.put(`/skills/${id}`, data),

    // Delete skill  (admin)
    delete: (id) =>
        api.delete(`/skills/${id}`),
};