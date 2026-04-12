const express = require("express");
const router = express.Router();

const {
    getAllSkills,
    getSkillById,
    createSkill,
    updateSkill,
    deleteSkill,
    toggleVisibility,
    bulkCreateSkills,
} = require("../controllers/skillController.js");

const { protect, adminOnly, optionalAuth } = require("../middelewares/auth.js");
const { apiLimiter } = require("../middelewares/rateLimiter.js");
const validate = require("../middelewares/validate.js");

const {
    skillValidator,
    skillQueryValidator,
    skillIdValidator,
} = require("../validators/skillValidator");

// Public routes

// GET /api/skills
// optionalAuth used so admin can see hidden skills too
router.get(
    "/",
    apiLimiter,
    optionalAuth,
    skillQueryValidator,
    validate,
    getAllSkills
);

// GET /api/skills/:id
router.get(
    "/:id",
    apiLimiter,
    skillIdValidator,
    validate,
    getSkillById
);

// Private routes — Admin only

// POST /api/skills/bulk
// Must be defined BEFORE /:id to avoid conflict
router.post(
    "/bulk",
    protect,
    adminOnly,
    bulkCreateSkills
);

// POST /api/skills
router.post(
    "/",
    protect,
    adminOnly,
    skillValidator,
    validate,
    createSkill
);

// PUT /api/skills/:id
router.put(
    "/:id",
    protect,
    adminOnly,
    skillIdValidator,
    skillValidator,
    validate,
    updateSkill
);

// DELETE /api/skills/:id
router.delete(
    "/:id",
    protect,
    adminOnly,
    skillIdValidator,
    validate,
    deleteSkill
);

// PATCH /api/skills/:id/visibility
router.patch(
    "/:id/visibility",
    protect,
    adminOnly,
    skillIdValidator,
    validate,
    toggleVisibility
);

module.exports = router;