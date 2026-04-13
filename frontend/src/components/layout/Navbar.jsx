import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
    Tooltip,
} from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";
import ContactMailIcon from "@mui/icons-material/ContactMail";

import { NAV_LINKS, PERSONAL_INFO } from "../../constants";
import { useScrolledPast } from "../../hooks/useScrollPosition";

const Navbar = () => {
    const location = useLocation();
    const isScrolled = useScrolledPast(60);

    const isActive = (path) =>
        path === "/"
            ? location.pathname === "/"
            : location.pathname.startsWith(path);

    // Icon mapping for mobile nav
    const getIcon = (label) => {
        switch (label.toLowerCase()) {
            case "home":
                return <HomeIcon sx={{ fontSize: 22 }} />;
            case "about":
                return <PersonIcon sx={{ fontSize: 22 }} />;
            case "projects":
                return <WorkIcon sx={{ fontSize: 22 }} />;
            case "contact":
                return <ContactMailIcon sx={{ fontSize: 22 }} />;
            default:
                return null;
        }
    };

    return (
        <>
            {/* ── Main Nav Bar ─────────────────────────── */}
            <motion.header
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 1000,
                    padding: "0 1.5rem",
                    height: 70,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    background: isScrolled
                        ? "rgba(2, 6, 23, 0.95)"
                        : "transparent",
                    backdropFilter: isScrolled ? "blur(14px)" : "none",
                    borderBottom: isScrolled
                        ? "1px solid rgba(100,255,218,0.08)"
                        : "none",
                    transition: "all 0.4s ease",
                }}
            >
                {/* ── Logo ───────────────────────────────── */}
                <Link
                    to="/"
                    style={{
                        textDecoration: "none",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.6rem",
                    }}
                >
                    <motion.div
                        whileHover={{ rotate: 15, scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                        style={{
                            width: 36,
                            height: 36,
                            borderRadius: 8,
                            background: "linear-gradient(135deg, #0ea5e9, #64ffda)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <CodeIcon style={{ color: "#020617", fontSize: 20 }} />
                    </motion.div>

                    <span
                        style={{
                            color: "#e2e8f0",
                            fontWeight: 700,
                            fontSize: "1.05rem",
                        }}
                    >
                        {PERSONAL_INFO.name.split(" ")[0].toLowerCase()}
                        <span style={{ color: "#64ffda" }}>.dev</span>
                    </span>
                </Link>

                {/* ── Desktop Navigation ───────────────────────── */}
                <nav
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "2.5rem",
                    }}
                >
                    {/* Desktop Nav Links */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "2.5rem",
                        }}
                        className="desktop-nav"
                    >
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.id}
                                to={link.path}
                                style={{
                                    textDecoration: "none",
                                    color: isActive(link.path) ? "#64ffda" : "#94a3b8",
                                    fontFamily: "'JetBrains Mono', monospace",
                                    fontSize: "0.82rem",
                                    transition: "color 0.3s",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.3rem",
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.color = "#64ffda")}
                                onMouseLeave={(e) =>
                                    (e.currentTarget.style.color = isActive(link.path)
                                        ? "#64ffda"
                                        : "#94a3b8")
                                }
                            >
                                <span
                                    style={{
                                        color: "#64ffda",
                                        fontSize: "0.68rem",
                                        opacity: 0.7,
                                    }}
                                >
                                    {link.id}.
                                </span>
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Resume Button (Desktop + Mobile) */}
                    <Tooltip title="Download Resume" placement="bottom">
                        <motion.a
                            href={PERSONAL_INFO.resumeUrl}
                            target="_blank"
                            rel="noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.97 }}
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "0.4rem",
                                padding: "0.45rem 1.1rem",
                                borderRadius: "0.5rem",
                                fontFamily: "'JetBrains Mono', monospace",
                                fontSize: "0.8rem",
                                color: "#64ffda",
                                border: "1px solid rgba(100,255,218,0.4)",
                                textDecoration: "none",
                                transition: "all 0.3s",
                            }}
                            onMouseEnter={(e) =>
                                (e.currentTarget.style.background = "rgba(100,255,218,0.08)")
                            }
                            onMouseLeave={(e) =>
                                (e.currentTarget.style.background = "transparent")
                            }
                        >
                            <FileDownloadIcon style={{ fontSize: 16 }} />
                            Resume
                        </motion.a>
                    </Tooltip>
                </nav>
            </motion.header>

            {/* ── Mobile Bottom Navigation ───────────────────────── */}
            <div className="mobile-nav">
                {NAV_LINKS.map((link) => (
                    <Link
                        key={link.id}
                        to={link.path}
                        className={`mobile-nav-item ${isActive(link.path) ? "active" : ""}`}
                    >
                        <div className="mobile-nav-icon">
                            {getIcon(link.label)}
                        </div>
                        <span className="mobile-nav-label">{link.label}</span>
                    </Link>
                ))}
            </div>

            {/* ── Responsive Styles ───────────────────────── */}
            <style jsx>{`
                /* Hide desktop nav on mobile */
                @media (max-width: 900px) {
                    .desktop-nav {
                        display: none !important;
                    }

                    /* Mobile Bottom Navigation */
                    .mobile-nav {
                        position: fixed;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        height: 65px;
                        background: rgba(2, 6, 23, 0.98);
                        backdrop-filter: blur(12px);
                        border-top: 1px solid rgba(100, 255, 218, 0.1);
                        display: flex;
                        align-items: center;
                        justify-content: space-around;
                        z-index: 999;
                        padding: 0 10px;
                    }

                    .mobile-nav-item {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        gap: 4px;
                        color: #94a3b8;
                        text-decoration: none;
                        font-size: 0.75rem;
                        font-family: 'JetBrains Mono', monospace;
                        transition: all 0.3s ease;
                        flex: 1;
                        padding: 6px 0;
                    }

                    .mobile-nav-item .mobile-nav-icon {
                        transition: all 0.3s ease;
                    }

                    .mobile-nav-item.active {
                        color: #64ffda;
                    }

                    .mobile-nav-item.active .mobile-nav-icon {
                        transform: scale(1.15);
                    }

                    .mobile-nav-label {
                        font-size: 0.68rem;
                        font-weight: 500;
                        letter-spacing: 0.5px;
                    }
                }

                /* Hide mobile nav on desktop */
                @media (min-width: 901px) {
                    .mobile-nav {
                        display: none !important;
                    }
                }
            `}</style>
        </>
    );
};

export default Navbar;