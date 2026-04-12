const { body, query, param } = require("express-validator");

// Create / Update skill validator
const skillValidator = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Skill name is required")
        .isLength({ max: 50 })
        .withMessage("Skill name cannot exceed 50 characters"),

    body("category")
        .notEmpty()
        .withMessage("Category is required")
        .isIn(["Frontend", "Backend", "Database", "DevOps", "Tools", "Other"])
        .withMessage(
            "Category must be one of: Frontend, Backend, Database, DevOps, Tools, Other"
        ),

    body("proficiency")
        .optional()
        .isInt({ min: 1, max: 100 })
        .withMessage("Proficiency must be a number between 1 and 100")
        .toInt(),

    body("icon")
        .optional()
        .trim()
        .isLength({ max: 100 })
        .withMessage("Icon value cannot exceed 100 characters"),

    body("order")
        .optional()
        .isInt({ min: 0 })
        .withMessage("Order must be a non-negative integer")
        .toInt(),

    body("isVisible")
        .optional()
        .isBoolean()
        .withMessage("isVisible must be true or false"),
];

// Query validator for listing skills
const skillQueryValidator = [
    query("category")
        .optional()
        .isIn([
            "Frontend",
            "Backend",
            "Database",
            "DevOps",
            "Tools",
            "Other",
            "",
        ])
        .withMessage("Invalid category filter"),

    query("isVisible")
        .optional()
        .isBoolean()
        .withMessage("isVisible must be true or false")
        .toBoolean(),
];

// Param validator
const skillIdValidator = [
    param("id")
        .notEmpty()
        .withMessage("Skill ID is required")
        .isMongoId()
        .withMessage("Invalid skill ID format"),
];

module.exports = {
    skillValidator,
    skillQueryValidator,
    skillIdValidator,
};