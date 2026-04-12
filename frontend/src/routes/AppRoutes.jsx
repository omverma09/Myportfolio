import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Loader from "../components/common/Loader";

//  Lazy load all pages
const Home = lazy(() => import("../pages/Home"));
const About = lazy(() => import("../pages/About"));
const Projects = lazy(() => import("../pages/Projects"));
const ProjectDetail = lazy(() => import("../pages/ProjectDetail"));
const Contact = lazy(() => import("../pages/Contact"));

// ── Page loading fallback
const PageLoader = () => (
    <div
        style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }}
    >
        <Loader size={52} text="Loading page..." />
    </div>
);

// ── Route definitions
const AppRoutes = () => {
    return (
        <Layout>
            <Suspense fallback={<PageLoader />}>
                <Routes>

                    {/* Public routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/projects/:id" element={<ProjectDetail />} />
                    <Route path="/contact" element={<Contact />} />

                    {/* Catch-all — redirect unknown routes to home */}
                    <Route path="*" element={<Navigate to="/" replace />} />

                </Routes>
            </Suspense>
        </Layout>
    );
};

export default AppRoutes;