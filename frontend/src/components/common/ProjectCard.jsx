import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import GitHubIcon from "@mui/icons-material/GitHub";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import { Chip, Tooltip } from "@mui/material";
import { truncateText } from "../../utils";

const ProjectCard = ({ project, index = 0 }) => {
    const {
        _id,
        title,
        description,
        techStack = [],
        githubUrl,
        liveUrl,
        imageUrl,
        status,
    } = project;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -8 }}
            className="glass-card"
            style={{
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                height: "100%",
            }}
        >
            {/* Project Image */}
            {imageUrl && (
                <div
                    style={{
                        height: 180,
                        overflow: "hidden",
                        position: "relative",
                    }}
                >
                    <motion.img
                        src={imageUrl}
                        alt={title}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.4 }}
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                        }}
                    />
                    {/* Gradient overlay */}
                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            background: "linear-gradient(to bottom, transparent 40%, #020617)",
                        }}
                    />
                    {/* Status badge */}
                    {status && (
                        <span
                            style={{
                                position: "absolute",
                                top: "0.75rem",
                                right: "0.75rem",
                                padding: "0.2rem 0.6rem",
                                borderRadius: 999,
                                fontSize: "0.65rem",
                                fontFamily: "monospace",
                                fontWeight: 600,
                                background:
                                    status === "completed"
                                        ? "rgba(74,222,128,0.15)"
                                        : "rgba(251,191,36,0.15)",
                                color: status === "completed" ? "#4ade80" : "#fbbf24",
                                border:
                                    status === "completed"
                                        ? "1px solid rgba(74,222,128,0.3)"
                                        : "1px solid rgba(251,191,36,0.3)",
                            }}
                        >
                            {status.toUpperCase()}
                        </span>
                    )}
                </div>
            )}

            {/* Card Body */}
            <div
                style={{
                    padding: "1.5rem",
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem",
                }}
            >
                {/* Top row — folder icon + links */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <FolderOpenIcon style={{ color: "#64ffda", fontSize: 30 }} />

                    <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                        {githubUrl && (
                            <Tooltip title="View Source" arrow>
                                <a
                                    href={githubUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    style={{
                                        color: "#64748b",
                                        display: "flex",
                                        transition: "color 0.3s",
                                    }}
                                    onMouseEnter={(e) => (e.currentTarget.style.color = "#64ffda")}
                                    onMouseLeave={(e) => (e.currentTarget.style.color = "#64748b")}
                                >
                                    <GitHubIcon style={{ fontSize: 20 }} />
                                </a>
                            </Tooltip>
                        )}

                        {liveUrl && (
                            <Tooltip title="Live Demo" arrow>
                                <a
                                    href={liveUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    style={{
                                        color: "#64748b",
                                        display: "flex",
                                        transition: "color 0.3s",
                                    }}
                                    onMouseEnter={(e) => (e.currentTarget.style.color = "#64ffda")}
                                    onMouseLeave={(e) => (e.currentTarget.style.color = "#64748b")}
                                >
                                    <OpenInNewIcon style={{ fontSize: 20 }} />
                                </a>
                            </Tooltip>
                        )}
                    </div>
                </div>

                {/* Title */}
                <Link to={`/projects/${_id}`} style={{ textDecoration: "none" }}>
                    <h3
                        style={{
                            color: "#ccd6f6",
                            fontWeight: 700,
                            fontSize: "1.05rem",
                            transition: "color 0.3s",
                            lineHeight: 1.3,
                        }}
                        onMouseEnter={(e) => (e.target.style.color = "#64ffda")}
                        onMouseLeave={(e) => (e.target.style.color = "#ccd6f6")}
                    >
                        {title}
                    </h3>
                </Link>

                {/* Description */}
                <p
                    style={{
                        color: "#8892b0",
                        fontSize: "0.88rem",
                        lineHeight: 1.7,
                        flex: 1,
                    }}
                >
                    {truncateText(description, 120)}
                </p>

                {/* Tech Stack chips */}
                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "0.4rem",
                        marginTop: "0.5rem",
                    }}
                >
                    {techStack.slice(0, 4).map((tech) => (
                        <Chip
                            key={tech}
                            label={tech}
                            size="small"
                            variant="outlined"
                            color="primary"
                        />
                    ))}
                    {techStack.length > 4 && (
                        <Chip
                            label={`+${techStack.length - 4}`}
                            size="small"
                            variant="outlined"
                            color="primary"
                        />
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default ProjectCard;