// ── Standard API response helpers ─────────────────
// Use these in every controller for consistent shape.

/**
 * Success response
 * @param {object} res      - Express response object
 * @param {number} statusCode
 * @param {string} message
 * @param {any}    data
 * @param {object} meta     - optional pagination info etc.
 */
const successResponse = (
    res,
    statusCode = 200,
    message = "Success",
    data = null,
    meta = null
) => {
    const payload = {
        success: true,
        message,
        ...(data !== null && { data }),
        ...(meta !== null && { meta }),
    };

    return res.status(statusCode).json(payload);
};

/**
 * Error response
 * @param {object} res
 * @param {number} statusCode
 * @param {string} message
 * @param {any}    errors   - optional field-level errors
 */
const errorResponse = (
    res,
    statusCode = 500,
    message = "Internal Server Error",
    errors = null
) => {
    const payload = {
        success: false,
        message,
        ...(errors !== null && { errors }),
    };

    return res.status(statusCode).json(payload);
};

/**
 * Paginated response
 * @param {object} res
 * @param {Array}  data
 * @param {number} page
 * @param {number} limit
 * @param {number} total
 * @param {string} message
 */
const paginatedResponse = (
    res,
    data = [],
    page = 1,
    limit = 10,
    total = 0,
    message = "Success"
) => {
    return res.status(200).json({
        success: true,
        message,
        data,
        meta: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
            hasNextPage: page < Math.ceil(total / limit),
            hasPrevPage: page > 1,
        },
    });
};

module.exports = {
    successResponse,
    errorResponse,
    paginatedResponse,
};