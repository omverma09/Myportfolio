const express = require("express");
const router = express.Router();
const upload = require("../config/cloudinary.config.js");

const {
    getAllProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
    toggleFeatured,
    reorderProjects,
} = require("../controllers/projectController");

const { protect, adminOnly } = require("../middelewares/auth.js");
const { apiLimiter } = require("../middelewares/rateLimiter.js");
const validate = require("../middelewares/validate.js");

const {
    projectValidator,
    projectQueryValidator,
    projectIdValidator,
} = require("../validators/projectValidator.js");

// Public routes
// GET /api/projects
router.get(
    "/",
    apiLimiter,
    projectQueryValidator,
    validate,
    getAllProjects
);

// GET /api/projects/:id
router.get(
    "/:id",
    apiLimiter,
    projectIdValidator,
    validate,
    getProjectById
);

// Private routes — Admin only

// PATCH /api/projects/reorder
router.patch(
    "/reorder",
    protect,
    adminOnly,
    reorderProjects
);

// POST /api/projects
router.post(
    "/",
    protect,
    adminOnly,
    upload.single("imageUrl"),
    projectValidator,
    validate,
    createProject
);

// PUT /api/projects/:id
router.put(
    "/:id",
    protect,
    adminOnly,
    projectIdValidator,
    projectValidator,
    validate,
    updateProject
);

// DELETE /api/projects/:id
router.delete(
    "/:id",
    protect,
    adminOnly,
    projectIdValidator,
    validate,
    deleteProject
);

// PATCH /api/projects/:id/featured
router.patch(
    "/:id/featured",
    protect,
    adminOnly,
    projectIdValidator,
    validate,
    toggleFeatured
);

module.exports = router;