import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollToTop from "../common/ScrollToTop";

// ── Page transition variants
const pageVariants = {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 },
};

const pageTransition = {
    duration: 0.4,
    ease: "easeInOut",
};

// ── Layout wrapper
const Layout = ({ children }) => {
    const location = useLocation();

    // Scroll to top on every route change
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
    }, [location.pathname]);

    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                background: "#020617",
            }}
        >
            {/* Fixed navigation */}
            <Navbar />

            {/* Animated page content */}
            <AnimatePresence mode="wait">
                <motion.main
                    key={location.pathname}
                    variants={pageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={pageTransition}
                    style={{ flex: 1 }}
                >
                    {children}
                </motion.main>
            </AnimatePresence>

            {/* Footer */}
            <Footer />

            {/* Scroll-to-top button */}
            <ScrollToTop />
        </div>
    );
};

export default Layout;