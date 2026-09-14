import { Box, useTheme } from "@mui/material";
import { TOP5LEAGUES, isNonEmptyObject } from "../../global/constants";

export default function LeagueLogoIcon({ selectedLeague }) {
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
                sx={(theme) => ({
                    width: 56,
                    height: 56,
                    bgcolor: leagueLogoBackground,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "50%",
                    overflow: "hidden",
                    border: `1px solid ${isNonEmptyObject(selectedLeague) ? theme.palette.divider : "transparent"}`,
                    boxShadow: isNonEmptyObject(selectedLeague) ? "0 4px 14px -6px rgba(0,0,0,0.4)" : "none",
                })}
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