import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    Drawer,
    IconButton,
    List,
    ListItem,
    Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import CodeIcon from "@mui/icons-material/Code";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { NAV_LINKS, PERSONAL_INFO } from "../../constants";
import { useScrolledPast } from "../../hooks/useScrollPosition";

const Navbar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const location = useLocation();
    const isScrolled = useScrolledPast(60);

    // Close drawer on route change
    useEffect(() => {
        setDrawerOpen(false);
    }, [location.pathname]);

    const isActive = (path) =>
        path === "/"
            ? location.pathname === "/"
            : location.pathname.startsWith(path);

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
                    padding: "0 2rem",
                    height: 70,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    background: isScrolled
                        ? "rgba(2, 6, 23, 0.92)"
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
                                onMouseEnter={(e) =>
                                    (e.currentTarget.style.color = "#64ffda")
                                }
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

                    {/* Resume Button (Desktop) */}
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

                    {/* Mobile Hamburger Menu */}
                    <IconButton
                        onClick={() => setDrawerOpen(true)}
                        sx={{
                            color: "#64ffda",
                            display: { xs: "flex", md: "none" },
                            p: 0.5,
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                </nav>
            </motion.header>

            {/* ── Mobile Drawer ────────────────────────── */}
            <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                PaperProps={{
                    sx: {
                        width: "70vw",
                        maxWidth: 300,
                        background: "#0f172a",
                        borderLeft: "1px solid rgba(100,255,218,0.1)",
                        p: "2rem 1.5rem",
                        display: "flex",
                        flexDirection: "column",
                        gap: "2rem",
                    },
                }}
            >
                {/* Drawer Header */}
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <IconButton
                        onClick={() => setDrawerOpen(false)}
                        sx={{ color: "#64ffda" }}
                    >
                        <CloseIcon />
                    </IconButton>
                </div>

                {/* Drawer Navigation Links */}
                <List disablePadding>
                    <AnimatePresence>
                        {NAV_LINKS.map((link, i) => (
                            <motion.div
                                key={link.id}
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.08 }}
                            >
                                <ListItem disablePadding sx={{ mb: 2 }}>
                                    <Link
                                        to={link.path}
                                        style={{
                                            textDecoration: "none",
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "flex-start",
                                        }}
                                        onClick={() => setDrawerOpen(false)}
                                    >
                                        <span
                                            style={{
                                                color: "#64ffda",
                                                fontFamily: "monospace",
                                                fontSize: "0.7rem",
                                                opacity: 0.7,
                                            }}
                                        >
                                            {link.id}.
                                        </span>
                                        <span
                                            style={{
                                                color: isActive(link.path)
                                                    ? "#64ffda"
                                                    : "#ccd6f6",
                                                fontSize: "1.2rem",
                                                fontWeight: 600,
                                            }}
                                        >
                                            {link.label}
                                        </span>
                                    </Link>
                                </ListItem>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </List>

                {/* Resume Button in Drawer */}
                <motion.a
                    href={PERSONAL_INFO.resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                        marginTop: "auto",
                        padding: "0.75rem 1.25rem",
                        borderRadius: "0.5rem",
                        border: "1px solid rgba(100,255,218,0.4)",
                        color: "#64ffda",
                        textDecoration: "none",
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "0.9rem",
                        textAlign: "center",
                        transition: "all 0.3s",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "0.5rem",
                    }}
                    onMouseEnter={(e) =>
                        (e.currentTarget.style.background = "rgba(100,255,218,0.08)")
                    }
                    onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "transparent")
                    }
                >
                    <FileDownloadIcon style={{ fontSize: 18 }} />
                    Download Resume
                </motion.a>
            </Drawer>

            {/* Desktop Nav Media Query */}
            <style jsx>{`
                @media (max-width: 900px) {
                    .desktop-nav {
                        display: none !important;
                    }
                }
            `}</style>
        </>
    );
};

export default Navbar;