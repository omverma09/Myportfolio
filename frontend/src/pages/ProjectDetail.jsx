import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Chip, Divider, Tooltip } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import GitHubIcon from "@mui/icons-material/GitHub";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import CalendarIcon from "@mui/icons-material/CalendarToday";
import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";
import { useProjectById } from "../hooks/useProjects";
import { formatDate } from "../utils";

const ProjectDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { project, loading, error, refetch } = useProjectById(id);

    if (loading) return <Loader fullScreen text="Loading project..." />;
    if (error) return <ErrorMessage message={error} onRetry={refetch} />;
    if (!project) return <ErrorMessage message="Project not found." />;

    const {
        title,
        description,
        longDescription,
        techStack = [],
        githubUrl,
        liveUrl,
        imageUrl,
        status,
        createdAt,
        features = [],
        challenges = "",
    } = project;

    return (
        <div className="page-wrapper">

            {/* ── Back button ───────────────────────── */}
            <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => navigate(-1)}
                style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    background: "none",
                    border: "none",
                    color: "#64748b",
                    cursor: "pointer",
                    fontFamily: "monospace",
                    fontSize: "0.85rem",
                    marginBottom: "2.5rem",
                    padding: 0,
                    transition: "color 0.3s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#64ffda")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#64748b")}
            >
                <ArrowBackIcon style={{ fontSize: 18 }} />
                Back to Projects
            </motion.button>

            {/* ── Hero image ────────────────────────── */}
            {imageUrl && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    style={{
                        width: "100%",
                        height: 400,
                        borderRadius: "1rem",
                        overflow: "hidden",
                        marginBottom: "3rem",
                        border: "1px solid rgba(100,255,218,0.1)",
                    }}
                >
                    <img
                        src={imageUrl}
                        alt={title}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                </motion.div>
            )}

            {/* ── Header row ────────────────────────── */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    flexWrap: "wrap",
                    gap: "1.5rem",
                    marginBottom: "2rem",
                }}
            >
                {/* Title + meta */}
                <div>
                    <h1
                        style={{
                            fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                            fontWeight: 800,
                            color: "#ccd6f6",
                            marginBottom: "0.75rem",
                            lineHeight: 1.2,
                        }}
                    >
                        {title}
                    </h1>

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "1rem",
                            flexWrap: "wrap",
                        }}
                    >
                        {/* Status */}
                        {status && (
                            <span
                                style={{
                                    padding: "0.2rem 0.7rem",
                                    borderRadius: 999,
                                    fontSize: "0.72rem",
                                    fontFamily: "monospace",
                                    fontWeight: 600,
                                    background: status === "completed"
                                        ? "rgba(74,222,128,0.1)"
                                        : "rgba(251,191,36,0.1)",
                                    color: status === "completed" ? "#4ade80" : "#fbbf24",
                                    border: status === "completed"
                                        ? "1px solid rgba(74,222,128,0.25)"
                                        : "1px solid rgba(251,191,36,0.25)",
                                }}
                            >
                                {status}
                            </span>
                        )}

                        {/* Date */}
                        {createdAt && (
                            <span
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.3rem",
                                    color: "#475569",
                                    fontSize: "0.82rem",
                                    fontFamily: "monospace",
                                }}
                            >
                                <CalendarIcon style={{ fontSize: 14 }} />
                                {formatDate(createdAt)}
                            </span>
                        )}
                    </div>
                </div>

                {/* Action links */}
                <div style={{ display: "flex", gap: "0.75rem" }}>
                    {githubUrl && (
                        <Tooltip title="View Source Code">
                            <motion.a
                                href={githubUrl}
                                target="_blank"
                                rel="noreferrer"
                                whileHover={{ scale: 1.05 }}
                                className="btn-outline"
                                style={{ padding: "0.55rem 1.2rem", fontSize: "0.85rem" }}
                            >
                                <GitHubIcon style={{ fontSize: 18 }} />
                                GitHub
                            </motion.a>
                        </Tooltip>
                    )}
                    {liveUrl && (
                        <Tooltip title="Open Live Demo">
                            <motion.a
                                href={liveUrl}
                                target="_blank"
                                rel="noreferrer"
                                whileHover={{ scale: 1.05 }}
                                className="btn-primary"
                                style={{ padding: "0.55rem 1.2rem", fontSize: "0.85rem" }}
                            >
                                <OpenInNewIcon style={{ fontSize: 18 }} />
                                Live Demo
                            </motion.a>
                        </Tooltip>
                    )}
                </div>
            </motion.div>

            <Divider sx={{ mb: "2.5rem" }} />

            {/* ── Main content grid ─────────────────── */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 300px",
                    gap: "3rem",
                    alignItems: "flex-start",
                }}
            >
                {/* Left — description */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {/* Short description */}
                    <p
                        style={{
                            color: "#8892b0",
                            fontSize: "1rem",
                            lineHeight: 1.85,
                            marginBottom: "2rem",
                        }}
                    >
                        {description}
                    </p>

                    {/* Long description */}
                    {longDescription && (
                        <p
                            style={{
                                color: "#64748b",
                                fontSize: "0.95rem",
                                lineHeight: 1.85,
                                marginBottom: "2rem",
                            }}
                        >
                            {longDescription}
                        </p>
                    )}

                    {/* Features list */}
                    {features.length > 0 && (
                        <>
                            <h3
                                style={{
                                    color: "#ccd6f6",
                                    fontWeight: 700,
                                    fontSize: "1.1rem",
                                    marginBottom: "1rem",
                                }}
                            >
                                Key Features
                            </h3>
                            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 2rem" }}>
                                {features.map((feat, i) => (
                                    <li
                                        key={i}
                                        style={{
                                            display: "flex",
                                            alignItems: "flex-start",
                                            gap: "0.6rem",
                                            color: "#8892b0",
                                            fontSize: "0.92rem",
                                            lineHeight: 1.7,
                                            marginBottom: "0.5rem",
                                        }}
                                    >
                                        <span
                                            style={{
                                                color: "#64ffda",
                                                fontSize: "0.7rem",
                                                marginTop: "0.35rem",
                                                flexShrink: 0,
                                            }}
                                        >
                                            ▸
                                        </span>
                                        {feat}
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}

                    {/* Challenges */}
                    {challenges && (
                        <>
                            <h3
                                style={{
                                    color: "#ccd6f6",
                                    fontWeight: 700,
                                    fontSize: "1.1rem",
                                    marginBottom: "1rem",
                                }}
                            >
                                Challenges & Learnings
                            </h3>
                            <p
                                style={{
                                    color: "#64748b",
                                    fontSize: "0.92rem",
                                    lineHeight: 1.85,
                                }}
                            >
                                {challenges}
                            </p>
                        </>
                    )}
                </motion.div>

                {/* Right — sidebar */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    style={{
                        position: "sticky",
                        top: "90px",
                    }}
                >
                    <div
                        className="glass-card"
                        style={{ padding: "1.75rem" }}
                    >
                        <h4
                            style={{
                                color: "#64ffda",
                                fontFamily: "monospace",
                                fontSize: "0.75rem",
                                letterSpacing: "0.12em",
                                textTransform: "uppercase",
                                marginBottom: "1.25rem",
                            }}
                        >
                            Tech Stack
                        </h4>

                        <div
                            style={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: "0.5rem",
                            }}
                        >
                            {techStack.map((tech) => (
                                <Chip
                                    key={tech}
                                    label={tech}
                                    size="small"
                                    variant="outlined"
                                    color="primary"
                                />
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* ── Back link ─────────────────────────── */}
            <div style={{ marginTop: "4rem", textAlign: "center" }}>
                <Link
                    to="/projects"
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        color: "#64ffda",
                        fontFamily: "monospace",
                        fontSize: "0.88rem",
                        textDecoration: "none",
                        transition: "gap 0.3s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.gap = "0.9rem")}
                    onMouseLeave={(e) => (e.currentTarget.style.gap = "0.5rem")}
                >
                    <ArrowBackIcon style={{ fontSize: 18 }} />
                    View All Projects
                </Link>
            </div>
        </div>
    );
};

export default ProjectDetail;