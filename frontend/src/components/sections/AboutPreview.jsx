import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { TECH_STACK, PERSONAL_INFO } from "../../constants";
import profileImg from "../../../src/assets/myprofile.jpg"

const AboutPreview = () => {
    const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });

    return (
        <section
            ref={ref}
            style={{ padding: "7rem 2rem", maxWidth: 1200, margin: "0 auto" }}
        >
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "5rem",
                    alignItems: "center",
                }}
            >
                {/* Left — Text  */}
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                >
                    <p className="section-label">01. About Me</p>

                    <h2
                        style={{
                            fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
                            fontWeight: 800,
                            color: "#ccd6f6",
                            marginBottom: "0.5rem",
                            lineHeight: 1.2,
                        }}
                    >
                        Who I Am
                    </h2>

                    <div className="section-divider" />

                    <p
                        style={{
                            color: "#8892b0",
                            lineHeight: 1.85,
                            marginBottom: "1.25rem",
                            fontSize: "0.97rem",
                        }}
                    >
                        {PERSONAL_INFO.about}
                    </p>

                    <p
                        style={{
                            color: "#8892b0",
                            lineHeight: 1.85,
                            marginBottom: "2rem",
                            fontSize: "0.97rem",
                        }}
                    >
                        When I'm not coding, I explore system design, contribute to
                        open-source projects, and stay current with the latest trends
                        in web development.
                    </p>

                    {/* Tech list */}
                    <div style={{ marginBottom: "2.5rem" }}>
                        <p
                            style={{
                                color: "#64ffda",
                                fontFamily: "monospace",
                                fontSize: "0.8rem",
                                marginBottom: "1rem",
                            }}
                        >
                            Technologies I work with:
                        </p>

                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                                gap: "0.5rem 1rem",
                            }}
                        >
                            {TECH_STACK.slice(0, 8).map((tech) => (
                                <div
                                    key={tech}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "0.5rem",
                                        color: "#94a3b8",
                                        fontSize: "0.88rem",
                                        fontFamily: "monospace",
                                    }}
                                >
                                    <span style={{ color: "#64ffda", fontSize: "0.65rem" }}>
                                        ▸
                                    </span>
                                    {tech}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Link */}
                    <Link
                        to="/about"
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            color: "#64ffda",
                            textDecoration: "none",
                            fontFamily: "monospace",
                            fontSize: "0.9rem",
                            transition: "gap 0.3s",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.gap = "0.9rem")}
                        onMouseLeave={(e) => (e.currentTarget.style.gap = "0.5rem")}
                    >
                        Learn more <ArrowForwardIcon style={{ fontSize: 18 }} />
                    </Link>
                </motion.div>

                {/* ── Right — Image */}
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                    style={{ position: "relative" }}
                >
                    {/* Image frame */}
                    <div
                        style={{
                            width: "100%",
                            aspectRatio: "4/5",
                            borderRadius: "1rem",
                            overflow: "hidden",
                            position: "relative",
                            background: "linear-gradient(135deg, rgba(14,165,233,0.15), rgba(100,255,218,0.08))",
                            border: "1px solid rgba(100,255,218,0.15)",
                        }}
                    >
                        <img 
                            src={profileImg}
                            alt="Your Name"
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />

                        <div
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: 60,
                                height: 60,
                                background: "linear-gradient(135deg, rgba(100,255,218,0.15), transparent)",
                                borderRadius: "1rem 0 1rem 0",
                            }}
                        />
                    </div>

                    {/* Decorative offset border */}
                    <div
                        style={{
                            position: "absolute",
                            top: 16,
                            left: 16,
                            right: -16,
                            bottom: -16,
                            border: "2px solid rgba(100,255,218,0.15)",
                            borderRadius: "1rem",
                            zIndex: -1,
                        }}
                    />

                    {/* Floating badge */}
                    <motion.div
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        style={{
                            position: "absolute",
                            bottom: "2rem",
                            right: "-1.5rem",
                            background: "#0f172a",
                            border: "1px solid rgba(100,255,218,0.2)",
                            borderRadius: "0.75rem",
                            padding: "0.75rem 1rem",
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.2rem",
                            boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
                        }}
                    >
                        <span
                            style={{
                                color: "#64ffda",
                                fontFamily: "monospace",
                                fontSize: "0.7rem",
                            }}
                        >
                            &lt;available /&gt;
                        </span>
                        <span style={{ color: "#64748b", fontSize: "0.72rem" }}>
                            for new projects
                        </span>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default AboutPreview;