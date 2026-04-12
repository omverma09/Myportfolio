const Auth = require("../models/Auth");
const {
    sendTokenResponse,
    verifyRefreshToken,
    generateAccessToken,
    generateRefreshToken,
    getClearCookieOptions,
    getRefreshCookieOptions,
} = require("../utils/generateTokens");
const { successResponse, errorResponse } = require("../utils/apiResponse");
const { config } = require("../config/env");

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Find user and explicitly select password field
        const user = await Auth.findOne({ email }).select(
            "+password +refreshToken"
        );

        // Check user exists
        if (!user) {
            return errorResponse(res, 401, "Invalid email or password");
        }

        // Check account is active
        if (!user.isActive) {
            return errorResponse(
                res,
                401,
                "Your account has been deactivated. Contact support."
            );
        }

        // Compare password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return errorResponse(res, 401, "Invalid email or password");
        }

        // Update last login timestamp
        await user.updateLastLogin();

        // Generate and send tokens
        return sendTokenResponse(res, user, 200, "Login successful");

    } catch (err) {
        next(err);
    }
};

// ── @access  Public (requires httpOnly refresh token cookie)
const refreshToken = async (req, res, next) => {
    try {
        // Get refresh token from httpOnly cookie
        const token = req.cookies?.refreshToken;

        if (!token) {
            return errorResponse(
                res,
                401,
                "No refresh token. Please log in again."
            );
        }

        // Verify refresh token
        const decoded = verifyRefreshToken(token);

        if (!decoded) {
            return errorResponse(
                res,
                401,
                "Invalid or expired refresh token. Please log in again."
            );
        }

        const user = await Auth.findById(decoded.id).select("+refreshToken");

        if (!user) {
            return errorResponse(res, 401, "User not found. Please log in again.");
        }

        if (!user.isActive) {
            return errorResponse(res, 401, "Account deactivated.");
        }

        const payload = {
            id: user._id,
            email: user.email,
            role: user.role,
        };

        // Rotate tokens — generate both new access + refresh tokens
        const newAccessToken = generateAccessToken(payload);
        const newRefreshToken = generateRefreshToken(payload);

        // Save new refresh token to DB (token rotation)
        user.refreshToken = newRefreshToken;
        await user.save({ validateBeforeSave: false });

        // Set new refresh token cookie
        res.cookie(
            "refreshToken",
            newRefreshToken,
            getRefreshCookieOptions()
        );

        return successResponse(res, 200, "Token refreshed successfully", {
            accessToken: newAccessToken,
        });

    } catch (err) {
        next(err);
    }
};

const logout = async (req, res, next) => {
    try {
        // Clear refresh token from DB
        await Auth.findByIdAndUpdate(
            req.user.id,
            { $unset: { refreshToken: 1 } },
            { new: true }
        );

        // Clear cookie from client
        res.clearCookie("refreshToken", getClearCookieOptions());

        return successResponse(res, 200, "Logged out successfully");

    } catch (err) {
        next(err);
    }
};

const getMe = async (req, res, next) => {
    try {
        const user = await Auth.findById(req.user.id);

        if (!user) {
            return errorResponse(res, 404, "User not found");
        }

        return successResponse(res, 200, "User fetched successfully", user);

    } catch (err) {
        next(err);
    }
};

const updateProfile = async (req, res, next) => {
    try {
        const { name, email } = req.body;

        // Check if email is taken by another user
        if (email && email !== req.user.email) {
            const exists = await Auth.findOne({ email });
            if (exists) {
                return errorResponse(res, 400, "Email is already in use");
            }
        }

        const updated = await Auth.findByIdAndUpdate(
            req.user.id,
            { name, email },
            { new: true, runValidators: true }
        );

        return successResponse(
            res,
            200,
            "Profile updated successfully",
            updated
        );

    } catch (err) {
        next(err);
    }
};

const changePassword = async (req, res, next) => {
    try {
        const { currentPassword, newPassword } = req.body;

        // Get user with password
        const user = await Auth.findById(req.user.id).select("+password");

        if (!user) {
            return errorResponse(res, 404, "User not found");
        }

        // Verify current password
        const isMatch = await user.comparePassword(currentPassword);
        if (!isMatch) {
            return errorResponse(res, 400, "Current password is incorrect");
        }

        // Update password — pre-save hook will hash it
        user.password = newPassword;
        await user.save();

        // Clear all sessions by removing refresh token
        user.refreshToken = undefined;
        await user.save({ validateBeforeSave: false });

        // Clear cookie
        res.clearCookie("refreshToken", getClearCookieOptions());

        return successResponse(
            res,
            200,
            "Password changed successfully. Please log in again."
        );

    } catch (err) {
        next(err);
    }
};

module.exports = {
    login,
    refreshToken,
    logout,
    getMe,
    updateProfile,
    changePassword,
};