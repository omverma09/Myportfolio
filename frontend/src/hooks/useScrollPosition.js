import { useState, useEffect } from "react";

// ── Scroll Y Position ─────────────────────────────
export const useScrollPosition = () => {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return scrollY;
};

// ── Scroll Direction ──────────────────────────────
export const useScrollDirection = () => {
    const [direction, setDirection] = useState("up");
    const [lastY, setLastY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentY = window.scrollY;
            setDirection(currentY > lastY ? "down" : "up");
            setLastY(currentY);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastY]);

    return direction;
};

// ── Past Threshold ────────────────────────────────
// Returns true when page is scrolled past a given px value
export const useScrolledPast = (threshold = 100) => {
    const scrollY = useScrollPosition();
    return scrollY > threshold;
};