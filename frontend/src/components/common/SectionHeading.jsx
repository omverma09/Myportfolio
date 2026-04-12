import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const SectionHeading = ({
    number = "",
    label = "",
    title = "",
    subtitle = "",
    align = "left",   // "left" | "center"
}) => {
    const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

    const isCenter = align === "center";

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{
                marginBottom: "3rem",
                textAlign: isCenter ? "center" : "left",
            }}
        >
            {/* Number + Label */}
            {(number || label) && (
                <p
                    style={{
                        color: "#64ffda",
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "0.78rem",
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        marginBottom: "0.75rem",
                    }}
                >
                    {number && (
                        <span style={{ opacity: 0.6, marginRight: "0.4rem" }}>
                            {number}.
                        </span>
                    )}
                    {label}
                </p>
            )}

            {/* Main Title */}
            <h2
                style={{
                    fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                    fontWeight: 800,
                    color: "#ccd6f6",
                    lineHeight: 1.2,
                    marginBottom: "0.5rem",
                }}
            >
                {title}
            </h2>

            {/* Divider */}
            <div
                style={{
                    width: isCenter ? 64 : 64,
                    height: 4,
                    borderRadius: 999,
                    background: "linear-gradient(90deg, #0ea5e9, #64ffda)",
                    margin: isCenter ? "1rem auto 0" : "1rem 0 0",
                }}
            />

            {/* Optional subtitle */}
            {subtitle && (
                <p
                    style={{
                        color: "#8892b0",
                        fontSize: "1rem",
                        lineHeight: 1.8,
                        marginTop: "1.25rem",
                        maxWidth: 600,
                        margin: isCenter ? "1.25rem auto 0" : "1.25rem 0 0",
                    }}
                >
                    {subtitle}
                </p>
            )}
        </motion.div>
    );
};

export default SectionHeading;