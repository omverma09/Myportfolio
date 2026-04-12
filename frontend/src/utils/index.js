// ── Date Formatting ───────────────────────────────
export const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
    });
};

// ── Text Truncation ───────────────────────────────
export const truncateText = (text = "", maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trimEnd() + "...";
};

// ── Capitalize ────────────────────────────────────
export const capitalize = (str = "") =>
    str.charAt(0).toUpperCase() + str.slice(1);

// ── Email Validation ──────────────────────────────
export const isValidEmail = (email = "") =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// ── Scroll to Top ─────────────────────────────────
export const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

// ── Get Axios Error Message ───────────────────────
export const getErrorMessage = (error) =>
    error?.response?.data?.message ||
    error?.message ||
    "Something went wrong. Please try again.";

// ── Class Name Joiner ─────────────────────────────
export const cn = (...classes) =>
    classes.filter(Boolean).join(" ");

// ── Delay Helper (for async) ──────────────────────
export const delay = (ms) =>
    new Promise((resolve) => setTimeout(resolve, ms));

// ── Generate Random ID ────────────────────────────
export const generateId = () =>
    Math.random().toString(36).substring(2, 9);

// ── Slugify a string ──────────────────────────────
export const slugify = (str = "") =>
    str
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");