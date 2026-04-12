import api from "./api";

export const projectService = {
    // Get all projects — optional query params: ?category=&featured=
    getAll: (params = {}) =>
        api.get("/projects", { params }),

    // Get single project by ID
    getById: (id) =>
        api.get(`/projects/${id}`),

    // Get only featured projects
    getFeatured: () =>
        api.get("/projects", { params: { featured: true } }),

    // Create new project  (admin)
    create: (data) =>
        api.post("/projects", data),

    // Update project  (admin)
    update: (id, data) =>
        api.put(`/projects/${id}`, data),

    // Delete project  (admin)
    delete: (id) =>
        api.delete(`/projects/${id}`),
};