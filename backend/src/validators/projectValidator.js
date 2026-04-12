const { body, query, param } = require("express-validator");

// Create / Update project validator
const projectValidator = [
    body("title")
        .trim()
        .notEmpty()
        .withMessage("Project title is required")
        .isLength({ max: 100 })
        .withMessage("Title cannot exceed 100 characters"),

    body("description")
        .trim()
        .notEmpty()
        .withMessage("Description is required")
        .isLength({ max: 500 })
        .withMessage("Description cannot exceed 500 characters"),

    body("longDescription")
        .optional()
        .trim()
        .isLength({ max: 5000 })
        .withMessage("Long description cannot exceed 5000 characters"),

    body("techStack")
        .notEmpty()
        .withMessage("Tech stack is required")
        .isArray({ min: 1 })
        .withMessage("Tech stack must be an array with at least one item"),

    body("techStack.*")
        .trim()
        .notEmpty()
        .withMessage("Each technology must be a non-empty string"),

    body("category")
        .optional()
        .isIn(["Full Stack", "Frontend", "Backend", "API", "Mobile", "Other"])
        .withMessage("Invalid category"),

    body("status")
        .optional()
        .isIn(["completed", "in-progress", "archived"])
        .withMessage("Status must be completed, in-progress, or archived"),

    body("githubUrl")
        .optional({ checkFalsy: true })
        .trim()
        .isURL()
        .withMessage("GitHub URL must be a valid URL"),

    body("liveUrl")
        .optional({ checkFalsy: true })
        .trim()
        .isURL()
        .withMessage("Live URL must be a valid URL"),

    body("imageUrl")
        .optional({ checkFalsy: true })
        .trim()
        .isURL()
        .withMessage("Image URL must be a valid URL"),

    body("featured")
        .optional()
        .isBoolean()
        .withMessage("Featured must be true or false"),

    body("order")
        .optional()
        .isInt({ min: 0 })
        .withMessage("Order must be a non-negative integer"),

    body("features")
        .optional()
        .isArray()
        .withMessage("Features must be an array"),

    body("challenges")
        .optional()
        .trim()
        .isLength({ max: 2000 })
        .withMessage("Challenges cannot exceed 2000 characters"),
];

// Query validator for listing projects
const projectQueryValidator = [
    query("page")
        .optional()
        .isInt({ min: 1 })
        .withMessage("Page must be a positive integer")
        .toInt(),

    query("limit")
        .optional()
        .isInt({ min: 1, max: 50 })
        .withMessage("Limit must be between 1 and 50")
        .toInt(),

    query("category")
        .optional()
        .isIn(["Full Stack", "Frontend", "Backend", "API", "Mobile", "Other", ""])
        .withMessage("Invalid category filter"),

    query("status")
        .optional()
        .isIn(["completed", "in-progress", "archived", ""])
        .withMessage("Invalid status filter"),

    query("featured")
        .optional()
        .isBoolean()
        .withMessage("Featured must be true or false")
        .toBoolean(),
];

// Param validator
const projectIdValidator = [
    param("id")
        .notEmpty()
        .withMessage("Project ID is required")
        .isMongoId()
        .withMessage("Invalid project ID format"),
];

module.exports = {
    projectValidator,
    projectQueryValidator,
    projectIdValidator,
};