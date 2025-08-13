import { DarkMode, LightMode } from "@mui/icons-material";
import { CssBaseline, IconButton, ThemeProvider, Typography } from "@mui/material";
import { useState } from "react";
import TeamSelect from '../components/teams/teamSelect';
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
                    <Typography variant="h5" component="h2" sx={{ pl: 5 }}>
                        Football Dojo
                    </Typography>
                </div>
                <div className="card">
                    <TeamSelect />
                </div>
                <Typography component="h2" sx={{ pt: 12 }}>
                    2025 Football Dojo. All Rights Reserved. Made & Operated by MuscleBobBuffPants.
                </Typography>
            </ThemeProvider>
        </>
    )
}

export default App;