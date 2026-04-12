import React from "react";
import { motion } from "framer-motion";

const Loader = ({ fullScreen = false, size = 44, text = "" }) => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "1rem",
                ...(fullScreen
                    ? { minHeight: "60vh" }
                    : { padding: "3rem 1rem" }),
            }}
        >
            {/* Outer ring */}
            <div style={{ position: "relative", width: size, height: size }}>
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                    style={{
                        position: "absolute",
                        inset: 0,
                        borderRadius: "50%",
                        border: `2px solid rgba(100,255,218,0.15)`,
                        borderTopColor: "#64ffda",
                    }}
                />
                {/* Inner ring */}
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
                    style={{
                        position: "absolute",
                        inset: 8,
                        borderRadius: "50%",
                        border: `2px solid rgba(14,165,233,0.15)`,
                        borderBottomColor: "#0ea5e9",
                    }}
                />
                {/* Center dot */}
                <motion.div
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                        position: "absolute",
                        inset: "35%",
                        borderRadius: "50%",
                        background: "#64ffda",
                    }}
                />
            </div>

            {/* Optional loading text */}
            {text && (
                <motion.p
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    style={{
                        color: "#64748b",
                        fontSize: "0.8rem",
                        fontFamily: "'JetBrains Mono', monospace",
                    }}
                >
                    {text}
                </motion.p>
            )}
        </div>
    );
};

export default Loader;