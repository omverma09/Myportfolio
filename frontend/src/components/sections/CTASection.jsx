import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import EmailIcon from "@mui/icons-material/Email";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const CTASection = () => {
    const { ref, inView } = useInView({
        threshold: 0.3,
        triggerOnce: true,
    });

    const email = process.env.REACT_APP_EMAIL || "your.email@gmail.com";

    return (
        <section
            ref={ref}
            style={{
                padding: "8rem 2rem",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* Background glow */}
            <div
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 500,
                    height: 300,
                    background:
                        "radial-gradient(ellipse, rgba(14,165,233,0.08) 0%, transparent 70%)",
                    pointerEvents: "none",
                }}
            />

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, ease: "easeOut" }}
                style={{
                    textAlign: "center",
                    maxWidth: 680,
                    margin: "0 auto",
                    position: "relative",
                    zIndex: 1,
                }}
            >
                {/* Label */}
                <p className="section-label">04. What's Next?</p>

                {/* Heading */}
                <h2
                    style={{
                        fontSize: "clamp(2rem, 5vw, 3.5rem)",
                        fontWeight: 800,
                        color: "#ccd6f6",
                        lineHeight: 1.2,
                        marginBottom: "1.5rem",
                    }}
                >
                    Get In Touch
                </h2>

                {/* Body Text */}
                <p
                    style={{
                        color: "#8892b0",
                        fontSize: "1.05rem",
                        lineHeight: 1.85,
                        marginBottom: "3rem",
                    }}
                >
                    I'm currently open to new opportunities — whether it's a
                    full-time role, freelance project, or just a chat about tech.
                    My inbox is always open. Let's build something great together!
                </p>

                {/* Buttons */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "1.25rem",
                        flexWrap: "wrap",
                    }}
                >
                    {/* Say Hello Button */}
                    <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                        <Link
                            to="/contact"
                            className="btn-primary"
                            style={{
                                fontSize: "1rem",
                                padding: "0.9rem 2.5rem",
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "0.6rem",
                            }}
                        >
                            <EmailIcon style={{ fontSize: 20 }} />
                            Say Hello
                        </Link>
                    </motion.div>

                    {/* Email Directly Button */}
                    <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                        <a
                            href={`mailto:${email}`}
                            className="btn-outline"
                            style={{
                                fontSize: "1rem",
                                padding: "0.9rem 2.5rem",
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "0.6rem",
                                textDecoration: "none",
                            }}
                        >
                            Email Directly
                            <ArrowForwardIcon style={{ fontSize: 18 }} />
                        </a>
                    </motion.div>
                </div>

                {/* Decorative dots */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "0.5rem",
                        marginTop: "4rem",
                    }}
                >
                    {[...Array(5)].map((_, i) => (
                        <motion.div
                            key={i}
                            animate={{ opacity: [0.2, 1, 0.2] }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                delay: i * 0.2,
                            }}
                            style={{
                                width: 6,
                                height: 6,
                                borderRadius: "50%",
                                background: i === 2 ? "#64ffda" : "rgba(100,255,218,0.3)",
                            }}
                        />
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default CTASection;