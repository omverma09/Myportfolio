import React, {
    createContext,
    useContext,
    useMemo,
} from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Context 
const ThemeContext = createContext();

// MUI Dark Theme
const buildMuiTheme = () =>
    createTheme({
        palette: {
            mode: "dark",
            primary: {
                main: "#0ea5e9",
                light: "#38bdf8",
                dark: "#0369a1",
            },
            secondary: {
                main: "#64ffda",
            },
            background: {
                default: "#020617",
                paper: "#0f172a",
            },
            text: {
                primary: "#e2e8f0",
                secondary: "#94a3b8",
            },
            error: {
                main: "#f87171",
            },
            success: {
                main: "#4ade80",
            },
            divider: "rgba(100, 255, 218, 0.1)",
        },

        typography: {
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            h1: { fontWeight: 800 },
            h2: { fontWeight: 800 },
            h3: { fontWeight: 700 },
            h4: { fontWeight: 700 },
            h5: { fontWeight: 600 },
            h6: { fontWeight: 600 },
            body1: { lineHeight: 1.8 },
            body2: { lineHeight: 1.7 },
        },

        shape: {
            borderRadius: 12,
        },

        components: {
            // ── Button ──────────────────────────────────
            MuiButton: {
                styleOverrides: {
                    root: {
                        textTransform: "none",
                        fontWeight: 600,
                        borderRadius: 8,
                        padding: "0.6rem 1.5rem",
                        transition: "all 0.3s ease",
                    },
                    containedPrimary: {
                        background: "linear-gradient(135deg, #0ea5e9, #64ffda)",
                        color: "#020617",
                        "&:hover": {
                            transform: "translateY(-2px)",
                            boxShadow: "0 10px 30px rgba(100,255,218,0.25)",
                        },
                    },
                    outlinedPrimary: {
                        borderColor: "#64ffda",
                        color: "#64ffda",
                        "&:hover": {
                            background: "rgba(100,255,218,0.08)",
                            borderColor: "#64ffda",
                            transform: "translateY(-2px)",
                        },
                    },
                },
            },

            // ── TextField ───────────────────────────────
            MuiTextField: {
                styleOverrides: {
                    root: {
                        "& .MuiOutlinedInput-root": {
                            borderRadius: 10,
                            background: "rgba(14,165,233,0.04)",
                            "& fieldset": {
                                borderColor: "rgba(100,255,218,0.15)",
                            },
                            "&:hover fieldset": {
                                borderColor: "rgba(100,255,218,0.4)",
                            },
                            "&.Mui-focused fieldset": {
                                borderColor: "#64ffda",
                            },
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                            color: "#64ffda",
                        },
                    },
                },
            },

            // ── Card ────────────────────────────────────
            MuiCard: {
                styleOverrides: {
                    root: {
                        background: "rgba(14,165,233,0.04)",
                        border: "1px solid rgba(100,255,218,0.1)",
                        borderRadius: 16,
                        transition: "border-color 0.3s, box-shadow 0.3s",
                        "&:hover": {
                            borderColor: "rgba(100,255,218,0.25)",
                            boxShadow: "0 20px 60px rgba(14,165,233,0.1)",
                        },
                    },
                },
            },

            // ── Chip ────────────────────────────────────
            MuiChip: {
                styleOverrides: {
                    root: {
                        borderRadius: 999,
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "0.72rem",
                        height: 26,
                    },
                    outlinedPrimary: {
                        borderColor: "rgba(100,255,218,0.3)",
                        color: "#64ffda",
                        background: "rgba(100,255,218,0.05)",
                    },
                },
            },

            // ── Tooltip ─────────────────────────────────
            MuiTooltip: {
                styleOverrides: {
                    tooltip: {
                        background: "#1e293b",
                        color: "#e2e8f0",
                        fontSize: "0.8rem",
                        border: "1px solid rgba(100,255,218,0.15)",
                        borderRadius: 8,
                    },
                },
            },

            // ── Linear Progress ─────────────────────────
            MuiLinearProgress: {
                styleOverrides: {
                    root: {
                        borderRadius: 999,
                        height: 4,
                        background: "rgba(100,255,218,0.1)",
                    },
                    bar: {
                        background: "linear-gradient(90deg, #0ea5e9, #64ffda)",
                        borderRadius: 999,
                    },
                },
            },

            // ── Divider ─────────────────────────────────
            MuiDivider: {
                styleOverrides: {
                    root: {
                        borderColor: "rgba(100,255,218,0.1)",
                    },
                },
            },
        },
    });

// ── Provider ──────────────────────────────────────
export const AppThemeProvider = ({ children }) => {
    const muiTheme = useMemo(() => buildMuiTheme(), []);

    return (
        <ThemeContext.Provider value={{}}>
            <ThemeProvider theme={muiTheme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};

// ── Hook ──────────────────────────────────────────
export const useAppTheme = () => useContext(ThemeContext);

export default ThemeContext;