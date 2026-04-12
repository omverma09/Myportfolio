import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AppThemeProvider } from "./context/ThemeContext";
import AppRoutes from "./routes/AppRoutes";

// ── Toast config
const toastOptions = {
    duration: 4000,
    position: "top-right",
    style: {
        background: "#0f172a",
        color: "#e2e8f0",
        border: "1px solid rgba(100,255,218,0.15)",
        borderRadius: "0.75rem",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: "0.88rem",
        padding: "0.75rem 1rem",
        boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
    },
    success: {
        iconTheme: {
            primary: "#64ffda",
            secondary: "#020617",
        },
    },
    error: {
        iconTheme: {
            primary: "#f87171",
            secondary: "#020617",
        },
    },
};

// ── Root App
const App = () => {
    return (
        // MUI theme + CssBaseline
        <AppThemeProvider>

            {/* Client-side routing */}
            <BrowserRouter>

                {/* All pages and layout */}
                <AppRoutes />

                {/* Global toast notifications */}
                <Toaster
                    toastOptions={toastOptions}
                    containerStyle={{ zIndex: 9999 }}
                />

            </BrowserRouter>

        </AppThemeProvider>
    );
};

export default App;