import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Divider, Tooltip } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import EmailIcon from "@mui/icons-material/Email";
import CodeIcon from "@mui/icons-material/Code";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { NAV_LINKS, SOCIAL_LINKS, PERSONAL_INFO } from "../../constants";

const SOCIALS = [
    { icon: <GitHubIcon />, href: SOCIAL_LINKS.github, label: "GitHub" },
    { icon: <LinkedInIcon />, href: SOCIAL_LINKS.linkedin, label: "LinkedIn" },
    { icon: <TwitterIcon />, href: SOCIAL_LINKS.twitter, label: "Twitter" },
    { icon: <EmailIcon />, href: `mailto:${SOCIAL_LINKS.email}`, label: "Email" },
];

const Footer = () => {
    return (
        <footer
            style={{
                background: "#0f172a",
                borderTop: "1px solid rgba(100,255,218,0.08)",
                padding: "4rem 2rem 2rem",
            }}
        >
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                {/* ── Top Grid ───────────────────────────── */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                        gap: "3rem",
                        marginBottom: "3rem",
                    }}
                >
                    {/* Brand column */}
                    <div>
                        <Link
                            to="/"
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "0.5rem",
                                textDecoration: "none",
                                marginBottom: "1rem",
                            }}
                        >
                            <div
                                style={{
                                    width: 32,
                                    height: 32,
                                    borderRadius: 6,
                                    background: "linear-gradient(135deg, #0ea5e9, #64ffda)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <CodeIcon style={{ color: "#020617", fontSize: 17 }} />
                            </div>
                            <span
                                style={{ color: "#e2e8f0", fontWeight: 700, fontSize: "0.95rem" }}
                            >
                                {PERSONAL_INFO.name.split(" ")[0].toLowerCase()}
                                <span style={{ color: "#64ffda" }}>.dev</span>
                            </span>
                        </Link>

                        <p
                            style={{
                                color: "#475569",
                                fontSize: "0.88rem",
                                lineHeight: 1.8,
                                maxWidth: 240,
                            }}
                        >
                            Building scalable full-stack web applications with the MERN
                            stack and modern tooling.
                        </p>
                    </div>

                    {/* Navigation column */}
                    <div>
                        <h4
                            style={{
                                color: "#64ffda",
                                fontFamily: "'JetBrains Mono', monospace",
                                fontSize: "0.72rem",
                                letterSpacing: "0.15em",
                                textTransform: "uppercase",
                                marginBottom: "1.25rem",
                            }}
                        >
                            Navigation
                        </h4>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "0.75rem",
                            }}
                        >
                            {NAV_LINKS.map((link) => (
                                <Link
                                    key={link.id}
                                    to={link.path}
                                    style={{
                                        color: "#64748b",
                                        textDecoration: "none",
                                        fontSize: "0.9rem",
                                        transition: "color 0.3s",
                                        width: "fit-content",
                                    }}
                                    onMouseEnter={(e) =>
                                        (e.currentTarget.style.color = "#64ffda")
                                    }
                                    onMouseLeave={(e) =>
                                        (e.currentTarget.style.color = "#64748b")
                                    }
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Contact column */}
                    <div>
                        <h4
                            style={{
                                color: "#64ffda",
                                fontFamily: "'JetBrains Mono', monospace",
                                fontSize: "0.72rem",
                                letterSpacing: "0.15em",
                                textTransform: "uppercase",
                                marginBottom: "1.25rem",
                            }}
                        >
                            Contact
                        </h4>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "0.75rem",
                            }}
                        >
                            {/* Email Link */}
                            <a
                                href={`mailto:${SOCIAL_LINKS.email}`}
                                style={{
                                    color: "#64748b",
                                    textDecoration: "none",
                                    fontSize: "0.9rem",
                                    transition: "color 0.3s",
                                    width: "fit-content",
                                }}
                                onMouseEnter={(e) =>
                                    (e.currentTarget.style.color = "#64ffda")
                                }
                                onMouseLeave={(e) =>
                                    (e.currentTarget.style.color = "#64748b")
                                }
                            >
                                {SOCIAL_LINKS.email}
                            </a>

                            <p
                                style={{
                                    color: "#475569",
                                    fontSize: "0.85rem",
                                }}
                            >
                                {PERSONAL_INFO.location}
                            </p>

                            <p
                                style={{
                                    color: "#64ffda",
                                    fontSize: "0.82rem",
                                    fontFamily: "monospace",
                                    marginTop: "0.25rem",
                                }}
                            >
                                Open to opportunities ✦
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Divider ────────────────────────────── */}
            <Divider />

            {/* ── Bottom Row ─────────────────────────── */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "1rem",
                    paddingTop: "1.75rem",
                }}
            >
                {/* Copyright */}
                <p
                    style={{
                        color: "#334155",
                        fontSize: "0.82rem",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.3rem",
                        flexWrap: "wrap",
                    }}
                >
                    © {new Date().getFullYear()} {PERSONAL_INFO.name} · Built with
                    <FavoriteIcon
                        style={{ color: "#f87171", fontSize: 14 }}
                    />
                    using React, Tailwind & MUI
                </p>

                {/* Social Icons */}
                <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                    {SOCIALS.map((s) => (
                        <Tooltip key={s.label} title={s.label} placement="top">
                            <motion.a
                                href={s.href}
                                target={s.href.startsWith("mailto") ? "_self" : "_blank"}
                                rel={s.href.startsWith("mailto") ? undefined : "noreferrer"}
                                whileHover={{ y: -3 }}
                                style={{
                                    color: "#334155",
                                    display: "flex",
                                    transition: "color 0.3s",
                                }}
                                onMouseEnter={(e) =>
                                    (e.currentTarget.style.color = "#64ffda")
                                }
                                onMouseLeave={(e) =>
                                    (e.currentTarget.style.color = "#334155")
                                }
                            >
                                {s.icon}
                            </motion.a>
                        </Tooltip>
                    ))}
                </div>
            </div>
        </footer>
    );
};

export default Footer;