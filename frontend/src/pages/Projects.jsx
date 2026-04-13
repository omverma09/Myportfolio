import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SectionHeading from "../components/common/SectionHeading";
import ProjectCard from "../components/common/ProjectCard";
import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";
import { useProjects } from "../hooks/useProjects";
import { PROJECT_FILTERS } from "../constants";

// Demo fallback
const DEMO_PROJECTS = [
    { _id: "1", title: "E-Commerce Platform", category: "Full Stack", description: "Full-stack e-commerce app with cart, Stripe payments, and admin dashboard.", techStack: ["MongoDB", "Express", "React", "Node.js", "Stripe"], status: "completed", githubUrl: "#", liveUrl: "#" },
    { _id: "2", title: "Task Manager REST API", category: "Backend", description: "RESTful API with JWT auth, RBAC, file uploads, and Socket.io notifications.", techStack: ["Node.js", "Express", "MongoDB", "JWT", "Socket.io"], status: "completed", githubUrl: "#" },
    { _id: "3", title: "Analytics Dashboard", category: "Frontend", description: "Responsive dashboard with MUI data tables, Chart.js graphs, and dark mode.", techStack: ["React", "MUI", "Chart.js", "Tailwind", "Axios"], status: "in-progress", githubUrl: "#", liveUrl: "#" },
    { _id: "4", title: "Blog CMS", category: "Full Stack", description: "Headless CMS with rich text editor, image uploads via AWS S3, and user roles.", techStack: ["MongoDB", "Express", "React", "Node.js", "AWS S3"], status: "completed", githubUrl: "#", liveUrl: "#" },
    { _id: "5", title: "Auth Microservice", category: "Backend", description: "Standalone auth service with OAuth2, JWT refresh tokens, and rate limiting.", techStack: ["Node.js", "Express", "MongoDB", "OAuth2", "Redis"], status: "completed", githubUrl: "#" },
    { _id: "6", title: "Portfolio Website", category: "Frontend", description: "Personal portfolio built with React, Tailwind CSS, and Framer Motion animations.", techStack: ["React", "Tailwind", "MUI", "Framer Motion"], status: "completed", githubUrl: "#", liveUrl: "#" },
];

const Projects = () => {
    const { projects, loading, error, refetch } = useProjects();
    const [activeFilter, setActiveFilter] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    const displayProjects = projects.length ? projects : DEMO_PROJECTS;

    // Filter + Search
    const filtered = useMemo(() => {
        return displayProjects.filter((p) => {
            const matchFilter =
                activeFilter === "All" ||
                p.category?.toLowerCase() === activeFilter.toLowerCase();

            const matchSearch =
                !searchQuery ||
                p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.techStack?.some((t) =>
                    t.toLowerCase().includes(searchQuery.toLowerCase())
                );

            return matchFilter && matchSearch;
        });
    }, [displayProjects, activeFilter, searchQuery]);

    return (
        <div className="page-wrapper">

            {/* Heading */}
            <SectionHeading
                number="03"
                label="My Work"
                title="All Projects"
                subtitle="A collection of projects I've built — from full-stack web apps to REST APIs and everything in between."
            />

            {/* Search bar */}
            <div style={{ marginBottom: "2rem", maxWidth: 440 }}>
                <TextField
                    fullWidth
                    size="small"
                    placeholder="Search by name, tech, or description..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon style={{ color: "#64748b", fontSize: 20 }} />
                            </InputAdornment>
                        ),
                    }}
                />
            </div>

            {/* Filter pills */}
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "0.6rem",
                    marginBottom: "3rem",
                }}
            >
                {PROJECT_FILTERS.map((filter) => (
                    <motion.button
                        key={filter}
                        onClick={() => setActiveFilter(filter)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                        style={{
                            padding: "0.4rem 1.1rem",
                            borderRadius: 999,
                            border: activeFilter === filter
                                ? "1px solid #64ffda"
                                : "1px solid rgba(100,255,218,0.15)",
                            background: activeFilter === filter
                                ? "rgba(100,255,218,0.1)"
                                : "transparent",
                            color: activeFilter === filter ? "#64ffda" : "#64748b",
                            fontFamily: "monospace",
                            fontSize: "0.8rem",
                            cursor: "pointer",
                            transition: "all 0.25s",
                        }}
                    >
                        {filter}
                    </motion.button>
                ))}
            </div>

            {/* Content */}
            {loading && <Loader fullScreen text="Loading projects..." />}

            {!loading && error && (
                <ErrorMessage message={error} onRetry={refetch} />
            )}

            {!loading && !error && (
                <>
                    {/* Result count */}
                    <p
                        style={{
                            color: "#475569",
                            fontFamily: "monospace",
                            fontSize: "0.8rem",
                            marginBottom: "1.5rem",
                        }}
                    >
                        Showing {filtered.length} of {displayProjects.length} projects
                    </p>

                    {/* Grid */}
                    <AnimatePresence mode="popLayout">
                        {filtered.length > 0 ? (
                            <motion.div
                                layout
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(auto-fill, minmax(310px, 1fr))",
                                    gap: "1.5rem",
                                }}
                            >
                                {filtered.map((project, i) => (
                                    <motion.div
                                        key={project._id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <ProjectCard project={project} index={i} />
                                    </motion.div>
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                style={{ textAlign: "center", padding: "5rem 0" }}
                            >
                                <p style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔍</p>
                                <p style={{ color: "#475569", fontFamily: "monospace" }}>
                                    No projects match your search.
                                </p>
                                <button
                                    onClick={() => {
                                        setSearchQuery("");
                                        setActiveFilter("All");
                                    }}
                                    className="btn-outline"
                                    style={{ marginTop: "1.5rem", fontSize: "0.85rem" }}
                                >
                                    Clear Filters
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </>
            )}
        </div>
    );
};

export default Projects;