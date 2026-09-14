import { createTheme } from "@mui/material/styles";

// Modern Sports Dashboard palette — dark-first, electric green primary,
// purple secondary (ties into the existing lineup-builder accent), plus a
// semantic `result` palette so win/loss/draw colors live in one place.
const darkPalette = {
    mode: "dark",
    primary: { main: "#22E07A", contrastText: "#04140B" },
    secondary: { main: "#A855F7", contrastText: "#ffffff" },
    background: {
        default: "#0F1720",
        paper: "#161D27",
        secondary: "#1D2530",
    },
    divider: "rgba(255,255,255,0.08)",
    text: {
        primary: "#F3F6F9",
        secondary: "rgba(243,246,249,0.64)",
    },
    result: {
        win: "#1FB865",
        winText: "#04140B",
        loss: "#F0475C",
        lossText: "#2A0107",
        draw: "#5B6472",
        drawText: "#ffffff",
    },
};

const lightPalette = {
    mode: "light",
    primary: { main: "#12A150", contrastText: "#ffffff" },
    secondary: { main: "#8E24CF", contrastText: "#ffffff" },
    background: {
        default: "#F1F3F6",
        paper: "#FFFFFF",
        secondary: "#E7EAF0",
    },
    divider: "rgba(15,23,32,0.1)",
    text: {
        primary: "#0F1720",
        secondary: "rgba(15,23,32,0.64)",
    },
    result: {
        win: "#78E3A6",
        winText: "#04140B",
        loss: "#FFA3AD",
        lossText: "#2A0107",
        draw: "#C6CCD6",
        drawText: "#0F1720",
    },
};

export const getTheme = (mode) =>
    createTheme({
        palette: mode === "dark" ? darkPalette : lightPalette,
        shape: {
            borderRadius: 14,
        },
        typography: {
            fontFamily: "'Inter', system-ui, Avenir, Helvetica, Arial, sans-serif",
            h4: { fontFamily: "'Space Grotesk', 'Inter', sans-serif", fontWeight: 700 },
            h5: { fontFamily: "'Space Grotesk', 'Inter', sans-serif", fontWeight: 700 },
            h6: { fontFamily: "'Space Grotesk', 'Inter', sans-serif", fontWeight: 600 },
        },
        components: {
            MuiCssBaseline: {
                styleOverrides: {
                    body: {
                        backgroundImage:
                            mode === "dark"
                                ? "radial-gradient(circle at 15% -10%, rgba(34,224,122,0.10), transparent 40%), radial-gradient(circle at 85% 0%, rgba(168,85,247,0.10), transparent 35%)"
                                : "radial-gradient(circle at 15% -10%, rgba(18,161,80,0.08), transparent 40%), radial-gradient(circle at 85% 0%, rgba(142,36,207,0.06), transparent 35%)",
                        backgroundAttachment: "fixed",
                    },
                },
            },
            MuiButton: {
                defaultProps: { disableElevation: true },
                styleOverrides: {
                    root: {
                        borderRadius: 999,
                        textTransform: "none",
                        fontWeight: 600,
                        paddingLeft: 18,
                        paddingRight: 18,
                    },
                },
            },
            MuiPaper: {
                styleOverrides: {
                    root: {
                        backgroundImage: "none",
                    },
                },
            },
            MuiModal: {
                styleOverrides: {
                    backdrop: {
                        backgroundColor: "rgba(6,10,14,0.72)",
                        backdropFilter: "blur(6px)",
                    },
                },
            },
            MuiFormControl: {
                styleOverrides: {
                    root: {
                        minWidth: 0,
                    },
                },
            },
            MuiOutlinedInput: {
                styleOverrides: {
                    root: {
                        borderRadius: 999,
                    },
                },
            },
            MuiSelect: {
                styleOverrides: {
                    root: {
                        borderRadius: 999,
                    },
                },
            },
            MuiChip: {
                styleOverrides: {
                    root: {
                        fontWeight: 600,
                    },
                },
            },
        },
    });
