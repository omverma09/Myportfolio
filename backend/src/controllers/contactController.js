const {
    sendContactNotification,
    sendContactAutoReply,
} = require("../utils/sendEmail");
const { successResponse, errorResponse } = require("../utils/apiResponse");
const { config } = require("../config/env");

const sendMessage = async (req, res, next) => {
    try {
        const { name, email, subject, message } = req.body;

        let emailSent = false;

        try {
            await Promise.all([
                // Notify admin
                sendContactNotification({ name, email, subject, message }),
                // Auto-reply to sender
                sendContactAutoReply({ name, email }),
            ]);
            emailSent = true;
        } catch (emailErr) {
            // Log email error but don't fail the request
            console.error("Email send failed:", emailErr.message);

            // In development log the message details
            if (config.isDev) {
                console.log("Contact form submission:", {
                    name,
                    email,
                    subject,
                    message,
                });
            }
        }

        return successResponse(
            res,
            200,
            emailSent
                ? "Message sent successfully! I'll get back to you soon."
                : "Message received! There was an issue sending the email notification, but your message was recorded.",
            {
                name,
                email,
                subject,
                emailSent,
            }
        );

    } catch (err) {
        next(err);
    }
};

const contactHealth = async (req, res) => {
    return successResponse(res, 200, "Contact route is healthy", {
        timestamp: new Date().toISOString(),
        smtp: {
            host: config.SMTP_HOST || "not configured",
            port: config.SMTP_PORT || "not configured",
        },
    });
};

module.exports = { sendMessage, contactHealth };