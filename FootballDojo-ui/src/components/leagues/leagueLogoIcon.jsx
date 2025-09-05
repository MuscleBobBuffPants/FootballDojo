import { Box, useTheme } from "@mui/material";
import { TOP5LEAGUES, isNonEmptyObject } from "../../global/constants";

function LeagueLogoIcon({ selectedLeague }) {
    const theme = useTheme();

    const getLeagueLogo = (id) => {
        const league = TOP5LEAGUES.find((l) => l.id === id);
        return league ? league.logo : "";
    };

    const leagueLogoBackground =
        isNonEmptyObject(selectedLeague)
            ? theme.palette.mode === "dark" ? "#ccc"
                : theme.palette.background.paper
            : "transparent";

    return (
        <Box>
            <Box
                sx={{
                    width: 69,
                    height: 69,
                    bgcolor: leagueLogoBackground,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 2,
                    overflow: "hidden",
                    border: "1px solid ",
                    borderColor: isNonEmptyObject(selectedLeague) ? "#ccc" : "transparent"
                }}
            >
                {isNonEmptyObject(selectedLeague) &&
                    <img
                        src={getLeagueLogo(selectedLeague.id)}
                        style={{ width: "95%", height: "95%", objectFit: "contain" }}
                    />
                }
            </Box>
        </Box>
    )
}


export default LeagueLogoIcon;