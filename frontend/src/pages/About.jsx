import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Divider } from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SectionHeading from "../components/common/SectionHeading";
import SkillCard from "../components/common/SkillCard";
import Loader from "../components/common/Loader";
import { useSkills } from "../hooks/useSkills";
import profileImg from "../../src/assets/myprofile.jpg"
import {
    PERSONAL_INFO,
    STATS,
    EXPERIENCE,
    TECH_STACK,
} from "../constants";

//  Demo skills fallback
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

// ── Stat card ─────────────────────────────────────
const StatCard = ({ value, label, index }) => {
    const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="glass-card"
            style={{ padding: "2rem 1.5rem", textAlign: "center" }}
        >
            <p
                style={{
                    fontSize: "2.5rem",
                    fontWeight: 800,
                    background: "linear-gradient(135deg, #0ea5e9, #64ffda)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    marginBottom: "0.5rem",
                }}
            >
                {value}
            </p>
            <p style={{ color: "#64748b", fontSize: "0.88rem" }}>{label}</p>
        </motion.div>
    );
};

// ── Timeline item ─────────────────────────────────
const TimelineItem = ({ item, index }) => {
    const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            style={{ display: "flex", gap: "1.5rem" }}
        >
            {/* Timeline line */}
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 0,
                    flexShrink: 0,
                }}
            >
                <div
                    style={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #0ea5e9, #64ffda)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                    }}
                >
                    <WorkIcon style={{ color: "#020617", fontSize: 20 }} />
                </div>
                <div
                    style={{
                        width: 1,
                        flex: 1,
                        background: "rgba(100,255,218,0.12)",
                        marginTop: "0.5rem",
                    }}
                />
            </div>

            {/* Content */}
            <div style={{ paddingBottom: "3rem", flex: 1 }}>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        flexWrap: "wrap",
                        gap: "0.5rem",
                        marginBottom: "0.5rem",
                    }}
                >
                    <div>
                        <h3
                            style={{
                                color: "#ccd6f6",
                                fontWeight: 700,
                                fontSize: "1.05rem",
                            }}
                        >
                            {item.role}
                        </h3>
                        <p
                            style={{
                                color: "#64ffda",
                                fontFamily: "monospace",
                                fontSize: "0.85rem",
                            }}
                        >
                            {item.company}
                        </p>
                    </div>

                    <span
                        style={{
                            color: "#64748b",
                            fontFamily: "monospace",
                            fontSize: "0.78rem",
                            background: "rgba(100,255,218,0.05)",
                            border: "1px solid rgba(100,255,218,0.12)",
                            padding: "0.2rem 0.7rem",
                            borderRadius: 999,
                            whiteSpace: "nowrap",
                        }}
                    >
                        {item.duration}
                    </span>
                </div>

                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {item.points.map((pt, i) => (
                        <li
                            key={i}
                            style={{
                                display: "flex",
                                alignItems: "flex-start",
                                gap: "0.6rem",
                                color: "#8892b0",
                                fontSize: "0.9rem",
                                lineHeight: 1.7,
                                marginBottom: "0.4rem",
                            }}
                        >
                            <CheckCircleIcon
                                style={{
                                    color: "#64ffda",
                                    fontSize: 16,
                                    marginTop: "0.25rem",
                                    flexShrink: 0,
                                }}
                            />
                            {pt}
                        </li>
                    ))}
                </ul>
            </div>
        </motion.div>
    );
};

// ── About page ────────────────────────────────────
const About = () => {
    const { skills, loading } = useSkills();
    const displaySkills = skills.length ? skills : DEMO_SKILLS;

    return (
        <div className="page-wrapper">

            {/* ── Hero heading ──────────────────────── */}
            <SectionHeading
                number="02"
                label="About Me"
                title="Who I Am"
                subtitle={PERSONAL_INFO.about}
            />

            {/* ── Stats row ─────────────────────────── */}
            <section style={{ marginBottom: "6rem" }}>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                        gap: "1.25rem",
                    }}
                >
                    {STATS.map((stat, i) => (
                        <StatCard
                            key={stat.label}
                            value={stat.value}
                            label={stat.label}
                            index={i}
                        />
                    ))}
                </div>
            </section>

            <Divider sx={{ mb: "5rem" }} />

            {/* ── About detail ──────────────────────── */}
            <section
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "5rem",
                    alignItems: "flex-start",
                    marginBottom: "6rem",
                }}
            >
                {/* Left — personal text */}
                <div>
                    <p className="section-label">Background</p>
                    <h3
                        style={{
                            color: "#ccd6f6",
                            fontSize: "1.7rem",
                            fontWeight: 700,
                            marginBottom: "1.5rem",
                        }}
                    >
                        My Journey
                    </h3>

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "1rem",
                        }}
                    >
                        {[
                            `I discovered my passion for programming while building small
               web projects in college. What started as curiosity quickly
               turned into a deep love for software development.`,
                            `I specialize in the MERN stack — MongoDB, Express.js,
               React.js, and Node.js — and enjoy building everything from
               clean user interfaces to scalable backend systems.`,
                            `I'm a strong believer in writing maintainable code, following
               industry best practices, and continuously improving through
               code reviews, side projects, and open-source contributions.`,
                        ].map((para, i) => (
                            <p
                                key={i}
                                style={{
                                    color: "#8892b0",
                                    lineHeight: 1.85,
                                    fontSize: "0.96rem",
                                }}
                            >
                                {para}
                            </p>
                        ))}
                    </div>

                    {/* Tech tags */}
                    <div
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "0.5rem",
                            marginTop: "2rem",
                        }}
                    >
                        {TECH_STACK.map((tech) => (
                            <span key={tech} className="skill-badge">{tech}</span>
                        ))}
                    </div>
                </div>

                {/* Right — image */}
                <div style={{ position: "relative" }}>
                    <div
                        style={{
                            width: "100%",
                            aspectRatio: "4/5",
                            borderRadius: "1rem",
                            background: "linear-gradient(135deg, rgba(14,165,233,0.12), rgba(100,255,218,0.06))",
                            border: "1px solid rgba(100,255,218,0.12)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            overflow: "hidden",
                        }}
                    >
                        
             
              <img src={profileImg} alt="Profile"
                style={{ width:"100%", height:"100%", objectFit:"cover" }} />
           
                        {/* <div style={{ textAlign: "center", color: "#334155" }}>
                            <div style={{ fontSize: "5rem" }}>👨‍💻</div>
                            <p style={{ fontFamily: "monospace", fontSize: "0.75rem", marginTop: "0.5rem" }}>
                                Add your photo
                            </p>
                        </div> */}
                    </div>

                    {/* Offset border */}
                    <div
                        style={{
                            position: "absolute",
                            top: 16,
                            left: 16,
                            right: -16,
                            bottom: -16,
                            border: "2px solid rgba(100,255,218,0.12)",
                            borderRadius: "1rem",
                            zIndex: -1,
                        }}
                    />
                </div>
            </section>

            <Divider sx={{ mb: "5rem" }} />

            {/* ── Experience timeline ───────────────── */}
            <section style={{ marginBottom: "6rem" }}>
                <p className="section-label">Experience</p>
                <h3
                    style={{
                        color: "#ccd6f6",
                        fontSize: "1.7rem",
                        fontWeight: 700,
                        marginBottom: "0.5rem",
                    }}
                >
                    Work History
                </h3>
                <div className="section-divider" />

                <div style={{ marginTop: "1rem" }}>
                    {EXPERIENCE.map((item, i) => (
                        <TimelineItem key={item.id} item={item} index={i} />
                    ))}
                </div>
            </section>

            <Divider sx={{ mb: "5rem" }} />

            {/* ── Skills grid ───────────────────────── */}
            <section>
                <p className="section-label">Skills</p>
                <h3
                    style={{
                        color: "#ccd6f6",
                        fontSize: "1.7rem",
                        fontWeight: 700,
                        marginBottom: "0.5rem",
                    }}
                >
                    Technologies I Use
                </h3>
                <div className="section-divider" />

                {loading ? (
                    <Loader text="Loading skills..." />
                ) : (
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(135px, 1fr))",
                            gap: "1rem",
                        }}
                    >
                        {displaySkills.map((skill, i) => (
                            <SkillCard key={skill._id} skill={skill} index={i} />
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

export default About;