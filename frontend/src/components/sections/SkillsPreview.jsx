import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SkillCard from "../common/SkillCard";
import Loader from "../common/Loader";
import ErrorMessage from "../common/ErrorMessage";
import { useSkills } from "../../hooks/useSkills";

// ── Fallback demo skills ──────────────────────────
const DEMO_SKILLS = [
    { _id: "1", name: "MongoDB", proficiency: 90, icon: "🍃", category: "Database" },
    { _id: "2", name: "Express.js", proficiency: 87, icon: "⚡", category: "Backend" },
    { _id: "3", name: "React.js", proficiency: 92, icon: "⚛️", category: "Frontend" },
    { _id: "4", name: "Node.js", proficiency: 88, icon: "🟩", category: "Backend" },
    { _id: "5", name: "Tailwind", proficiency: 85, icon: "🎨", category: "Frontend" },
    { _id: "6", name: "MUI", proficiency: 82, icon: "🖌️", category: "Frontend" },
    { _id: "7", name: "REST APIs", proficiency: 90, icon: "🔗", category: "Backend" },
    { _id: "8", name: "JWT Auth", proficiency: 85, icon: "🔐", category: "Backend" },
    { _id: "9", name: "Git", proficiency: 88, icon: "🐙", category: "Tools" },
    { _id: "10", name: "Docker", proficiency: 70, icon: "🐳", category: "DevOps" },
    { _id: "11", name: "AWS S3", proficiency: 72, icon: "☁️", category: "DevOps" },
    { _id: "12", name: "Socket.io", proficiency: 78, icon: "🔄", category: "Backend" },
];

const SkillsPreview = () => {
    const { skills, loading, error, refetch } = useSkills();
    const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

    const displaySkills = skills.length ? skills : DEMO_SKILLS;

    return (
        <section
            ref={ref}
            style={{ padding: "7rem 2rem", maxWidth: 1200, margin: "0 auto" }}
        >
            {/* ── Heading ───────────────────────────── */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
            >
                <p className="section-label">03. What I Know</p>

                <h2
                    style={{
                        fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
                        fontWeight: 800,
                        color: "#ccd6f6",
                        marginBottom: "0.5rem",
                    }}
                >
                    Skills & Technologies
                </h2>

                <div className="section-divider" />
            </motion.div>

            {/* ── Content ───────────────────────────── */}
            {loading && <Loader text="Loading skills..." />}

            {!loading && error && (
                <ErrorMessage message={error} onRetry={refetch} />
            )}

            {!loading && !error && (
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
                        gap: "1rem",
                    }}
                >
                    {displaySkills.map((skill, i) => (
                        <SkillCard key={skill._id} skill={skill} index={i} />
                    ))}
                </div>
            )}
        </section>
    );
};

export default SkillsPreview;