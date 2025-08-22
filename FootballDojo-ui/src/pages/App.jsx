import { DarkMode, LightMode } from "@mui/icons-material";
import { CssBaseline, IconButton, ThemeProvider, Typography } from "@mui/material";
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
        <>
            <ThemeProvider theme={getTheme(mode)}>
                <CssBaseline />
                <div style={{ display: "flex" }}>
                    <IconButton onClick={toggleMode} color="inherit">
                        {mode === "light" ? <LightMode /> : <DarkMode />}
                    </IconButton>
                </div>
                <div style={{ textAlign: "center" }}>
                    <Typography variant="h4" component="h2" sx={{ pb: 3 }}>
                        {"F\u00fatbol"} Dojo
                    </Typography>
                </div>
                <Home />
                <Typography component="h2" sx={{ pt: 12 }}>
                    2025 {"F\u00fatbol"} Dojo. All Rights Reserved. Made & Operated by MuscleBobBuffPants.
                </Typography>
            </ThemeProvider>
        </>
    )
}

export default App;