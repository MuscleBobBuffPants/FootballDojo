import { Box, useTheme } from "@mui/material";
import { isNonEmptyObject } from "../../global/constants";

function TeamLogoIcon({ selectedTeam, teamLogo }) {
    const theme = useTheme();

    const teamLogoBackground =
        isNonEmptyObject(selectedTeam)
            ? theme.palette.mode === "dark" ? "#ccc"
                : theme.palette.background.paper
            : "transparent";
    return (
        <Box>
            <Box
                sx={{
                    width: 69,
                    height: 69,
                    bgcolor: teamLogoBackground,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 2,
                    overflow: "hidden",
                    border: "1px solid ",
                    borderColor: isNonEmptyObject(selectedTeam) ? "#ccc" : "transparent"
                }}
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


export default TeamLogoIcon;