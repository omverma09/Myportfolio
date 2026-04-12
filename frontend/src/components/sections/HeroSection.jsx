import React from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { Tooltip } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import TwitterIcon from "@mui/icons-material/Twitter";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { PERSONAL_INFO, SOCIAL_LINKS } from "../../constants";

const SOCIALS = [
    { icon: <GitHubIcon />, href: SOCIAL_LINKS.github, label: "GitHub" },
    { icon: <LinkedInIcon />, href: SOCIAL_LINKS.linkedin, label: "LinkedIn" },
    { icon: <TwitterIcon />, href: SOCIAL_LINKS.twitter, label: "Twitter" },
    { icon: <EmailIcon />, href: `mailto:${SOCIAL_LINKS.email}`, label: "Email" },
];

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const HeroSection = () => {
    return (
        <section
            style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                position: "relative",
                overflow: "hidden",
                padding: "0 2rem",
            }}
        >
            {/* Background Effects */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 0,
                    overflow: "hidden",
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        top: "-10%",
                        right: "-5%",
                        width: 500,
                        height: 500,
                        background: "radial-gradient(circle, rgba(14,165,233,0.12) 0%, transparent 70%)",
                        borderRadius: "50%",
                        animation: "float 9s ease-in-out infinite",
                    }}
                />
                {/* Radial glow — bottom left */}
                <div
                    style={{
                        position: "absolute",
                        bottom: "5%",
                        left: "-8%",
                        width: 380,
                        height: 380,
                        background: "radial-gradient(circle, rgba(100,255,218,0.07) 0%, transparent 70%)",
                        borderRadius: "50%",
                        animation: "float 12s ease-in-out infinite reverse",
                    }}
                />
                {/* Dot grid */}
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        backgroundImage: "radial-gradient(rgba(100,255,218,0.06) 1px, transparent 1px)",
                        backgroundSize: "40px 40px",
                    }}
                />
            </div>

            {/* Left Social Sidebar */}
            <div
                style={{
                    position: "fixed",
                    left: "1.5rem",
                    bottom: "25%",
                    zIndex: 10,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "1.1rem",
                }}
            >
                {SOCIALS.map((s, i) => (
                    <Tooltip key={s.label} title={s.label} placement="right">
                        <motion.a
                            href={s.href}
                            target="_blank"
                            rel="noreferrer"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.2 + i * 0.1 }}
                            whileHover={{ y: -3 }}
                            style={{
                                color: "#475569",
                                display: "flex",
                                transition: "color 0.3s",
                            }}
                            onMouseEnter={(e) =>
                                (e.currentTarget.style.color = "#64ffda")
                            }
                            onMouseLeave={(e) =>
                                (e.currentTarget.style.color = "#475569")
                            }
                        >
                            {s.icon}
                        </motion.a>
                    </Tooltip>
                ))}

                {/* Vertical line */}
                <motion.div
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ delay: 1.6, duration: 0.6 }}
                    style={{
                        width: 1,
                        height: 80,
                        background: "rgba(100,255,218,0.2)",
                        transformOrigin: "top",
                    }}
                />
            </div>

            {/* Right Email Sidebar */}
            <div
                style={{
                    position: "fixed",
                    right: "1.5rem",
                    bottom: "25%",
                    zIndex: 10,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "1rem",
                }}
            >
                <motion.a
                    href={`mailto:${SOCIAL_LINKS.email}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.4 }}
                    style={{
                        color: "#475569",
                        textDecoration: "none",
                        fontSize: "0.72rem",
                        fontFamily: "'JetBrains Mono', monospace",
                        letterSpacing: "0.12em",
                        writingMode: "vertical-rl",
                        transition: "color 0.3s",
                    }}
                    onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "#64ffda")
                    }
                    onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "#475569")
                    }
                >
                    {SOCIAL_LINKS.email}
                </motion.a>

                <motion.div
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ delay: 1.6, duration: 0.6 }}
                    style={{
                        width: 1,
                        height: 80,
                        background: "rgba(100,255,218,0.2)",
                        transformOrigin: "top",
                    }}
                />
            </div>

            {/* Main Hero Content */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                style={{
                    maxWidth: 800,
                    margin: "0 auto",
                    width: "100%",
                    paddingTop: "5rem",
                    position: "relative",
                    zIndex: 1,
                }}
            >
                {/* Greeting */}
                <motion.p
                    variants={itemVariants}
                    style={{
                        color: "#64ffda",
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "0.95rem",
                        marginBottom: "1.25rem",
                    }}
                >
                    Hi, my name is
                </motion.p>

                {/* Name */}
                <motion.h1
                    variants={itemVariants}
                    style={{
                        fontSize: "clamp(2.8rem, 8vw, 5.5rem)",
                        fontWeight: 800,
                        color: "#ccd6f6",
                        lineHeight: 1.05,
                        marginBottom: "0.4rem",
                    }}
                >
                    {PERSONAL_INFO.name}.
                </motion.h1>

                {/* Type animation */}
                <motion.h2
                    variants={itemVariants}
                    style={{
                        fontSize: "clamp(1.4rem, 4vw, 3rem)",
                        fontWeight: 700,
                        color: "#8892b0",
                        lineHeight: 1.2,
                        marginBottom: "2rem",
                    }}
                >
                    I build&nbsp;
                    <TypeAnimation
                        sequence={[
                            "full-stack web apps.", 2000,
                            "Node.js Experience.", 2000,
                            "scalable REST APIs.", 2000,
                            "responsive UIs.", 2000,
                            "MongoDB databases.", 2000,
                            "real-time features.", 2000,
                        ]}
                        wrapper="span"
                        speed={50}
                        deletionSpeed={60}
                        repeat={Infinity}
                        style={{ color: "#64ffda" }}
                    />
                </motion.h2>

                {/* Bio */}
                <motion.p
                    variants={itemVariants}
                    style={{
                        color: "#8892b0",
                        fontSize: "1.05rem",
                        lineHeight: 1.85,
                        maxWidth: 540,
                        marginBottom: "3rem",
                    }}
                >
                    I'm a MERN Stack Developer specializing in building exceptional
                    digital experiences. I love writing clean, efficient code and
                    turning complex ideas into production-ready applications.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    variants={itemVariants}
                    style={{
                        display: "flex",
                        gap: "1.25rem",
                        flexWrap: "wrap",
                    }}
                >
                    <motion.a
                        href="/projects"
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        className="btn-primary"
                    >
                        View My Work
                    </motion.a>

                    <motion.a
                        href="/contact"
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        className="btn-outline"
                    >
                        Get In Touch
                    </motion.a>
                </motion.div>
            </motion.div>

            {/* ── Scroll Indicator ────────────────────── */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                style={{
                    position: "absolute",
                    bottom: "2rem",
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 1,
                }}
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "0.3rem",
                        color: "#334155",
                    }}
                >
                    <span
                        style={{
                            fontFamily: "monospace",
                            fontSize: "0.65rem",
                            letterSpacing: "0.1em",
                        }}
                    >
                        scroll
                    </span>
                    <ArrowDownwardIcon style={{ fontSize: 16 }} />
                </motion.div>
            </motion.div>
        </section>
    );
};

export default HeroSection;