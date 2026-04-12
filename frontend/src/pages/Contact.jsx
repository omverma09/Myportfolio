import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useForm } from "react-hook-form";
import {
    TextField,
    CircularProgress,
    Alert,
} from "@mui/material";
import toast from "react-hot-toast";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import SendIcon from "@mui/icons-material/Send";
import SectionHeading from "../components/common/SectionHeading";
import { contactService } from "../services/contactService";
import { SOCIAL_LINKS, PERSONAL_INFO } from "../constants";
import { getErrorMessage } from "../utils";

// ── Contact info items ────────────────────────────
const CONTACT_INFO = [
    {
        icon: <EmailIcon style={{ color: "#64ffda" }} />,
        label: "Email",
        value: SOCIAL_LINKS.email,
        href: `mailto:${SOCIAL_LINKS.email}`,
    },
    {
        icon: <LocationOnIcon style={{ color: "#64ffda" }} />,
        label: "Location",
        value: PERSONAL_INFO.location,
        href: null,
    },
];

const SOCIALS = [
    { icon: <GitHubIcon />, href: SOCIAL_LINKS.github, label: "GitHub" },
    { icon: <LinkedInIcon />, href: SOCIAL_LINKS.linkedin, label: "LinkedIn" },
    { icon: <TwitterIcon />, href: SOCIAL_LINKS.twitter, label: "Twitter" },
];

const Contact = () => {
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    // ── Form submit ─────────────────────────────────
    const onSubmit = async (data) => {
        try {
            setSubmitting(true);
            await contactService.sendMessage(data);
            setSubmitted(true);
            reset();
            toast.success("Message sent! I'll get back to you soon 🚀");
        } catch (err) {
            toast.error(getErrorMessage(err));
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="page-wrapper">
            {/* ── Heading ───────────────────────────── */}
            <SectionHeading
                number="04"
                label="Contact"
                title="Get In Touch"
                subtitle="Have a project in mind or want to discuss an opportunity? I'd love to hear from you. Send me a message and I'll get back to you as soon as possible."
            />

            {/* ── Main grid ─────────────────────────── */}
            <div
                ref={ref}
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "4rem",
                    alignItems: "flex-start",
                }}
            >
                {/* ── Left — Info panel ─────────────────── */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <h3
                        style={{
                            color: "#ccd6f6",
                            fontWeight: 700,
                            fontSize: "1.3rem",
                            marginBottom: "0.75rem",
                        }}
                    >
                        Let's work together
                    </h3>

                    <p
                        style={{
                            color: "#8892b0",
                            lineHeight: 1.85,
                            fontSize: "0.95rem",
                            marginBottom: "2.5rem",
                        }}
                    >
                        I'm currently available for freelance projects and full-time
                        roles. Whether you have a question, a project idea, or just
                        want to say hi — my inbox is always open.
                    </p>

                    {/* Contact info cards */}
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "1rem",
                            marginBottom: "2.5rem",
                        }}
                    >
                        {CONTACT_INFO.map((item) => (
                            <div
                                key={item.label}
                                className="glass-card"
                                style={{
                                    padding: "1.1rem 1.25rem",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "1rem",
                                }}
                            >
                                <div
                                    style={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: "50%",
                                        background: "rgba(100,255,218,0.08)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flexShrink: 0,
                                    }}
                                >
                                    {item.icon}
                                </div>
                                <div>
                                    <p
                                        style={{
                                            color: "#475569",
                                            fontSize: "0.72rem",
                                            fontFamily: "monospace",
                                            marginBottom: "0.15rem",
                                        }}
                                    >
                                        {item.label}
                                    </p>

                                    {item.href ? (
                                        <a
                                            href={item.href}
                                            style={{
                                                color: "#94a3b8",
                                                textDecoration: "none",
                                                fontSize: "0.9rem",
                                                transition: "color 0.3s",
                                            }}
                                            onMouseEnter={(e) =>
                                                (e.currentTarget.style.color = "#64ffda")
                                            }
                                            onMouseLeave={(e) =>
                                                (e.currentTarget.style.color = "#94a3b8")
                                            }
                                        >
                                            {item.value}
                                        </a>
                                    ) : (
                                        <p style={{ color: "#94a3b8", fontSize: "0.9rem" }}>
                                            {item.value}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Social links */}
                    <div>
                        <p
                            style={{
                                color: "#64ffda",
                                fontFamily: "monospace",
                                fontSize: "0.75rem",
                                letterSpacing: "0.12em",
                                textTransform: "uppercase",
                                marginBottom: "1rem",
                            }}
                        >
                            Find me on
                        </p>
                        <div style={{ display: "flex", gap: "1rem" }}>
                            {SOCIALS.map((s) => (
                                <motion.a
                                    key={s.label}
                                    href={s.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    whileHover={{ y: -3, scale: 1.1 }}
                                    style={{
                                        width: 42,
                                        height: 42,
                                        borderRadius: "50%",
                                        background: "rgba(100,255,218,0.05)",
                                        border: "1px solid rgba(100,255,218,0.15)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        color: "#64748b",
                                        transition: "all 0.3s",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.color = "#64ffda";
                                        e.currentTarget.style.borderColor = "rgba(100,255,218,0.4)";
                                        e.currentTarget.style.background = "rgba(100,255,218,0.1)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.color = "#64748b";
                                        e.currentTarget.style.borderColor = "rgba(100,255,218,0.15)";
                                        e.currentTarget.style.background = "rgba(100,255,218,0.05)";
                                    }}
                                >
                                    {s.icon}
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* ── Right — Contact form ──────────────── */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {/* Success alert */}
                    {submitted && (
                        <Alert
                            severity="success"
                            onClose={() => setSubmitted(false)}
                            sx={{ mb: 3, borderRadius: 2 }}
                        >
                            Message sent successfully! I'll reply within 24 hours.
                        </Alert>
                    )}

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        noValidate
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "1.25rem",
                        }}
                    >
                        {/* Name + Email row */}
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                                gap: "1rem",
                            }}
                        >
                            <TextField
                                label="Your Name"
                                fullWidth
                                size="small"
                                error={!!errors.name}
                                helperText={errors.name?.message}
                                {...register("name", {
                                    required: "Name is required",
                                    minLength: {
                                        value: 2,
                                        message: "Name must be at least 2 characters",
                                    },
                                })}
                            />

                            <TextField
                                label="Email Address"
                                fullWidth
                                size="small"
                                type="email"
                                error={!!errors.email}
                                helperText={errors.email?.message}
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Enter a valid email address",
                                    },
                                })}
                            />
                        </div>

                        {/* Subject */}
                        <TextField
                            label="Subject"
                            fullWidth
                            size="small"
                            error={!!errors.subject}
                            helperText={errors.subject?.message}
                            {...register("subject", {
                                required: "Subject is required",
                                minLength: {
                                    value: 5,
                                    message: "Subject must be at least 5 characters",
                                },
                            })}
                        />

                        {/* Message */}
                        <TextField
                            label="Message"
                            fullWidth
                            multiline
                            rows={6}
                            error={!!errors.message}
                            helperText={errors.message?.message}
                            {...register("message", {
                                required: "Message is required",
                                minLength: {
                                    value: 20,
                                    message: "Message must be at least 20 characters",
                                },
                            })}
                        />

                        {/* Submit Button */}
                        <motion.button
                            type="submit"
                            disabled={submitting}
                            whileHover={!submitting ? { scale: 1.02 } : {}}
                            whileTap={!submitting ? { scale: 0.98 } : {}}
                            className="btn-primary"
                            style={{
                                justifyContent: "center",
                                opacity: submitting ? 0.75 : 1,
                                cursor: submitting ? "not-allowed" : "pointer",
                                padding: "0.85rem",
                                fontSize: "0.95rem",
                                display: "flex",
                                alignItems: "center",
                                gap: "0.6rem",
                            }}
                        >
                            {submitting ? (
                                <>
                                    <CircularProgress size={18} style={{ color: "#020617" }} />
                                    Sending...
                                </>
                            ) : (
                                <>
                                    <SendIcon style={{ fontSize: 18 }} />
                                    Send Message
                                </>
                            )}
                        </motion.button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default Contact;