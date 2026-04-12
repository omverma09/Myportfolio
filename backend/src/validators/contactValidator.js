const { body } = require("express-validator");

// Contact form validator
const contactValidator = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required")
        .isLength({ min: 2, max: 100 })
        .withMessage("Name must be between 2 and 100 characters")
        .matches(/^[a-zA-Z\s'-]+$/)
        .withMessage("Name can only contain letters, spaces, hyphens and apostrophes"),

    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Please enter a valid email address")
        .normalizeEmail()
        .isLength({ max: 254 })
        .withMessage("Email address is too long"),

    body("subject")
        .trim()
        .notEmpty()
        .withMessage("Subject is required")
        .isLength({ min: 5, max: 200 })
        .withMessage("Subject must be between 5 and 200 characters"),

    body("message")
        .trim()
        .notEmpty()
        .withMessage("Message is required")
        .isLength({ min: 20, max: 5000 })
        .withMessage("Message must be between 20 and 5000 characters"),
];

module.exports = { contactValidator };