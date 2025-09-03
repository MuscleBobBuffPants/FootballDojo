import { DarkMode, LightMode } from "@mui/icons-material";
import { Box, CssBaseline, IconButton, Link, ThemeProvider, Typography } from "@mui/material";
import { useState } from "react";
import Home from '../components/home';
import { getTheme } from '../global/theme';
import '../styles/App.css';

function App() {
    const [mode, setMode] = useState("dark");
    const toggleMode = () => {
        setMode((prev) => (prev === "light" ? "dark" : "light"));
    };

    return (
        <ThemeProvider theme={getTheme(mode)}>
            <CssBaseline />
            <Box width="100%" display="flex" justifyContent="flex-start" p={2}>
                <IconButton onClick={toggleMode} color="inherit">
                    {mode === "light" ? <LightMode /> : <DarkMode />}
                </IconButton>
            </Box>
            <Box width="100%" textAlign="center">
                <Typography variant="h4" component="h2" sx={{ pb: 3 }}>
                    Football Dojo
                </Typography>
            </Box>
            <Home />
            <Box width="100%" textAlign="center" sx={{ pt: 12 }}>
                <Typography component="h2" align="center" variant="body2" color="text.secondary">
                    2025 Football Dojo | All Rights Reserved | Made & Operated by MuscleBobBuffPants
                    | Data Provided By:{' '}
                    <Link
                        href="https://api-sports.io/sports/football"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Visit API-Sports website"
                    >
                        API-Sports
                    </Link> {' '}
                    | {' '}
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
        </ThemeProvider>
    );
}

export default App;