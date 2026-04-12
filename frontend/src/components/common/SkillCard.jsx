import React from "react";
import { motion } from "framer-motion";
import { LinearProgress, Tooltip } from "@mui/material";

const SkillCard = ({ skill, index = 0 }) => {
    const {
        name,
        icon,
        proficiency = 80,
        category,
    } = skill;

    return (
        <Tooltip
            title={`${category ? category + " · " : ""}${proficiency}% proficiency`}
            placement="top"
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{
                    scale: 1.05,
                    borderColor: "rgba(100,255,218,0.35)",
                    boxShadow: "0 8px 30px rgba(14,165,233,0.15)",
                }}
                className="glass-card"
                style={{
                    padding: "1.25rem 1rem",
                    textAlign: "center",
                    cursor: "default",
                    transition: "all 0.3s",
                }}
            >
                {/* Icon */}
                {icon && (
                    <div style={{ fontSize: "2.2rem", marginBottom: "0.6rem" }}>
                        {icon}
                    </div>
                )}

                {/* Name */}
                <p
                    style={{
                        color: "#ccd6f6",
                        fontWeight: 600,
                        fontSize: "0.88rem",
                        marginBottom: "0.8rem",
                        lineHeight: 1.3,
                    }}
                >
                    {name}
                </p>

                {/* Progress Bar */}
                <LinearProgress
                    variant="determinate"
                    value={proficiency}
                    sx={{ mb: "0.35rem" }}
                />

                {/* Proficiency % */}
                <p
                    style={{
                        color: "#475569",
                        fontSize: "0.68rem",
                        fontFamily: "'JetBrains Mono', monospace",
                    }}
                >
                    {proficiency}%
                </p>
            </motion.div>
        </Tooltip>
    );
};

export default SkillCard;