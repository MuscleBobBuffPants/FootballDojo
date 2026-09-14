import { DarkMode, LightMode, SportsSoccer } from "@mui/icons-material";
import { Box, CssBaseline, IconButton, Link, ThemeProvider, Typography } from "@mui/material";
import { useState } from "react";
import Home from '../components/home';
import { getTheme } from '../global/theme';
import '../styles/App.css';

export default function App() {
    const [mode, setMode] = useState("dark");
    const toggleMode = () => {
        setMode((prev) => (prev === "light" ? "dark" : "light"));
    };

    return (
        <ThemeProvider theme={getTheme(mode)}>
            <CssBaseline />
            <Box sx={{ px: { xs: 2, sm: 3, md: 5 }, py: 3 }}>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mb: { xs: 3, md: 5 },
                    }}
                >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Box
                            sx={(theme) => ({
                                width: 40,
                                height: 40,
                                borderRadius: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                bgcolor: theme.palette.primary.main,
                                color: theme.palette.primary.contrastText,
                            })}
                        >
                            <SportsSoccer fontSize="small" />
                        </Box>
                        <Typography
                            variant="h5"
                            component="h1"
                            sx={{ fontWeight: 800, letterSpacing: -0.5 }}
                        >
                            Football Dojo
                        </Typography>
                    </Box>
                    <IconButton
                        onClick={toggleMode}
                        sx={(theme) => ({
                            bgcolor: theme.palette.background.paper,
                            border: `1px solid ${theme.palette.divider}`,
                        })}
                    >
                        {mode === "light" ? <LightMode fontSize="small" /> : <DarkMode fontSize="small" />}
                    </IconButton>
                </Box>

                <Home />

                <Box sx={{ width: "100%", textAlign: "center", pt: 10, pb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                        2025 Football Dojo | All Rights Reserved | Made & Operated by MuscleBobBuffPants
                        {' '}| Data Provided By:{' '}
                        <Link
                            href="https://api-sports.io/sports/football"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Visit API-Sports website"
                        >
                            API-Sports
                        </Link>
                        {' '}|{' '}
                        <Link
                            href="https://github.com/MuscleBobBuffPants/FootballDojo"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="View FootballDojo GitHub repository"
                        >
                            GitHub
                        </Link>
                    </Typography>
                </Box>
            </Box>
        </ThemeProvider>
    );
}
