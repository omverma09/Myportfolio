// API 
export const API_BASE_URL =
    process.env.REACT_APP_API_URL || "http://localhost:5000/api";

// ── Environment ───────────────────────────────────
export const IS_DEV  = process.env.REACT_APP_ENV === "development";
export const IS_PROD = process.env.REACT_APP_ENV === "production";

// Navigation
export const NAV_LINKS = [
    { id: "01", label: "Home", path: "/" },
    { id: "02", label: "About", path: "/about" },
    { id: "03", label: "Projects", path: "/projects" },
    { id: "04", label: "Contact", path: "/contact" },
];

// Social Links
export const SOCIAL_LINKS = {
    github: "https://github.com/omverma09",
    linkedin: "https://www.linkedin.com/in/omverma09/",
    twitter: "https://x.com/_Omverm09_",
    email: "omverma9644@gmail.com",
};

// My Personal Info
export const PERSONAL_INFO = {
    name: "Om' Verma",
    role: "MERN Stack Developer",
    tagline: "Building scalable full-stack web applications",
    location: "India",
    resumeUrl: "https://drive.google.com/drive/u/0/folders/1hVru9KkJ00x18uPNiolovF8ake2smJrt",
    about: `I'm a passionate MERN Stack Developer with hands-on experience
building end-to-end web applications. I love solving complex problems,
writing clean code, and constantly levelling up my skills.`,
};

// Tech Stack
export const TECH_STACK = [
    "MongoDB",
    "Express.js",
    "React.js",
    "Node.js",
    "Tailwind CSS",
    "Material UI",
    "REST APIs",
    "JWT Auth",
    "Git & GitHub",
    "Docker",
    "AWS S3",
    "Socket.io",
];

// Skill Categories
export const SKILL_CATEGORIES = [
    "All",
    "Frontend",
    "Backend",
    "Database",
    "DevOps",
    "Tools",
];

// Project Filter Options
export const PROJECT_FILTERS = [
    "All",
    "Full Stack",
    "Frontend",
    "Backend",
    "API",
];

// Project Status
export const PROJECT_STATUS = {
    COMPLETED: "completed",
    IN_PROGRESS: "in-progress",
    ARCHIVED: "archived",
};

// Stats shown on About page
export const STATS = [
    { label: "Projects Completed", value: "10+" },
    { label: "Technologies Used", value: "15+" },
    { label: "GitHub Commits", value: "100+" },
    { label: "Years of Learning", value: "3+" },
];

// Experience Timeline
export const EXPERIENCE = [
    {
        id: 1,
        role: "MERN Stack Developer",
        company: "Freelance / Self-Employed",
        duration: "2022 – Present",
        points: [
            "Built and deployed full-stack web applications for clients.",
            "Developed RESTful APIs with Node.js, Express, and MongoDB.",
            "Created responsive UIs with React, Tailwind CSS, and MUI.",
        ],
    },
    {
        id: 2,
        role: "Mern stack developer Intern",
        company: "MXPERTZ Infolabs",
        duration: "Jan 2026 – March 2026",
        points: [
            "Developed scalable RESTful APIs for authentication, matching logic in a dating web application.",
            "Implemented secure JWT-based authentication and RBAC, ensuring protected routes and efficient session handling.",
            "Built real-time chat functionality using Socket.io, enabling seamless bidirectional communication",
        ],
    },
];