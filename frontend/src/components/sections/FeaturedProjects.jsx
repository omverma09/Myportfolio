import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ProjectCard from "../common/ProjectCard";
import Loader from "../common/Loader";
import ErrorMessage from "../common/ErrorMessage";
import { useFeaturedProjects } from "../../hooks/useProjects";

// Fallback data while API is not connected
const DEMO_PROJECTS = [
    {
        _id: "1",
        title: "E-Commerce Platform",
        description: "Full-stack e-commerce app with cart management, payment integration via Stripe, and a complete admin dashboard built on the MERN stack.",
        techStack: ["MongoDB", "Express", "React", "Node.js", "Stripe"],
        status: "completed",
        githubUrl: "#",
        liveUrl: "#",
    },
    {
        _id: "2",
        title: "Task Management REST API",
        description: "Robust RESTful API with JWT authentication, role-based access control, file uploads via Multer, and real-time updates using Socket.io.",
        techStack: ["Node.js", "Express", "MongoDB", "JWT", "Socket.io"],
        status: "completed",
        githubUrl: "#",
    },
    {
        _id: "3",
        title: "Analytics Dashboard",
        description: "Responsive analytics dashboard with data visualization, user management, dark mode, and paginated data tables using React and MUI.",
        techStack: ["React", "MUI", "Chart.js", "Tailwind", "Axios"],
        status: "in-progress",
        githubUrl: "#",
        liveUrl: "#",
    },
];

const FeaturedProjects = () => {
    const { featuredProjects, loading, error, refetch } = useFeaturedProjects();
    const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

    const projects = featuredProjects.length ? featuredProjects : DEMO_PROJECTS;

    return (
        <section
            ref={ref}
            style={{
                padding: "7rem 2rem",
                background: "rgba(15,23,42,0.6)",
            }}
        >
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>

                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <p className="section-label">02. Some Things I've Built</p>

                    <h2
                        style={{
                            fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
                            fontWeight: 800,
                            color: "#ccd6f6",
                            marginBottom: "0.5rem",
                        }}
                    >
                        Featured Projects
                    </h2>

                    <div className="section-divider" />
                </motion.div>

                {/* Content  */}
                {loading && <Loader text="Loading projects..." />}

                {!loading && error && (
                    <ErrorMessage message={error} onRetry={refetch} />
                )}

                {!loading && !error && (
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(310px, 1fr))",
                            gap: "1.5rem",
                        }}
                    >
                        {projects.map((project, i) => (
                            <ProjectCard
                                key={project._id}
                                project={project}
                                index={i}
                            />
                        ))}
                    </div>
                )}

                {/* View All CTA */}
                {!loading && !error && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.5 }}
                        style={{ textAlign: "center", marginTop: "3.5rem" }}
                    >
                        <Link
                            to="/projects"
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "0.6rem",
                                color: "#64ffda",
                                textDecoration: "none",
                                fontFamily: "monospace",
                                fontSize: "0.9rem",
                                border: "1px solid rgba(100,255,218,0.3)",
                                padding: "0.75rem 2rem",
                                borderRadius: "0.5rem",
                                transition: "all 0.3s",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = "rgba(100,255,218,0.08)";
                                e.currentTarget.style.gap = "1rem";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = "transparent";
                                e.currentTarget.style.gap = "0.6rem";
                            }}
                        >
                            View All Projects
                            <ArrowForwardIcon style={{ fontSize: 18 }} />
                        </Link>
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default FeaturedProjects;