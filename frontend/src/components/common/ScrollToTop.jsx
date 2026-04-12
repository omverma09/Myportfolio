import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useScrolledPast } from "../../hooks/useScrollPosition";
import { Tooltip } from "@mui/material";

const ScrollToTop = () => {
    const isPast = useScrolledPast(400);

    const handleClick = () =>
        window.scrollTo({ top: 0, behavior: "smooth" });

    return (
        <AnimatePresence>
            {isPast && (
                <motion.div
                    initial={{ opacity: 0, scale: 0, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0, y: 20 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    style={{
                        position: "fixed",
                        bottom: "2rem",
                        right: "2rem",
                        zIndex: 999,
                    }}
                >
                    <Tooltip title="Back to top" placement="left">
                        <motion.button
                            onClick={handleClick}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            style={{
                                width: 44,
                                height: 44,
                                borderRadius: "50%",
                                background: "linear-gradient(135deg, #0ea5e9, #64ffda)",
                                border: "none",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                boxShadow: "0 4px 20px rgba(100,255,218,0.3)",
                            }}
                        >
                            <KeyboardArrowUpIcon style={{ color: "#020617", fontSize: 22 }} />
                        </motion.button>
                    </Tooltip>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ScrollToTop;