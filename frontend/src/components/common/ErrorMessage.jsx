import React from "react";
import { motion } from "framer-motion";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import RefreshIcon from "@mui/icons-material/Refresh";

const ErrorMessage = ({
    message = "Something went wrong. Please try again.",
    onRetry = null,
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "4rem 2rem",
                textAlign: "center",
                gap: "1.25rem",
            }}
        >
            {/* Icon */}
            <div
                style={{
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    background: "rgba(248,113,113,0.1)",
                    border: "1px solid rgba(248,113,113,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <ErrorOutlineIcon style={{ color: "#f87171", fontSize: 32 }} />
            </div>

            {/* Message */}
            <p
                style={{
                    color: "#94a3b8",
                    fontSize: "0.95rem",
                    maxWidth: 400,
                    lineHeight: 1.7,
                }}
            >
                {message}
            </p>

            {/* Retry Button */}
            {onRetry && (
                <button
                    onClick={onRetry}
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        padding: "0.6rem 1.4rem",
                        borderRadius: "0.5rem",
                        border: "1px solid rgba(100,255,218,0.3)",
                        background: "transparent",
                        color: "#64ffda",
                        cursor: "pointer",
                        fontSize: "0.85rem",
                        fontFamily: "'JetBrains Mono', monospace",
                        transition: "all 0.3s",
                    }}
                    onMouseEnter={(e) =>
                        (e.currentTarget.style.background = "rgba(100,255,218,0.08)")
                    }
                    onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "transparent")
                    }
                >
                    <RefreshIcon style={{ fontSize: 16 }} />
                    Try Again
                </button>
            )}
        </motion.div>
    );
};

export default ErrorMessage;