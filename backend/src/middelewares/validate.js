const { validationResult } = require("express-validator");

// Validation middleware
// Runs after express-validator chains.
// If errors exist, returns 400 with structured errors.
// If no errors, calls next() to proceed to controller.

const validate = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const formatted = {};

        errors.array().forEach((err) => {
            // Only keep the first error per field
            if (!formatted[err.path]) {
                formatted[err.path] = err.msg;
            }
        });

        return res.status(400).json({
            success: false,
            message: "Validation failed. Please check your input.",
            errors: formatted,
        });
    }

    next();
};

module.exports = validate;