import { Box, useTheme } from "@mui/material";
import { isNonEmptyObject } from "../../global/constants";

export default function TeamLogoIcon({ selectedTeam, teamLogo }) {
    const theme = useTheme();

    const teamLogoBackground =
        isNonEmptyObject(selectedTeam)
            ? theme.palette.mode === "dark" ? "#ccc"
                : theme.palette.background.paper
            : "transparent";
    return (
        <Box>
            <Box
                sx={(theme) => ({
                    width: 56,
                    height: 56,
                    bgcolor: teamLogoBackground,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "50%",
                    overflow: "hidden",
                    border: `1px solid ${isNonEmptyObject(selectedTeam) ? theme.palette.divider : "transparent"}`,
                    boxShadow: isNonEmptyObject(selectedTeam) ? "0 4px 14px -6px rgba(0,0,0,0.4)" : "none",
                })}
            >
                {isNonEmptyObject(selectedTeam) &&
                    <img
                        src={teamLogo}
                        style={{ width: "95%", height: "95%", objectFit: "contain" }}
                    />
                }
            </Box>
        </Box>
    )
}