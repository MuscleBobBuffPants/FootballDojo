import { Box, CircularProgress, Stack, Tooltip, useTheme } from "@mui/material";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    DARKMODE_GREEN,
    DARKMODE_RED,
    DARKMODE_TEXT,
    LIGHTMODE_GREEN,
    LIGHTMODE_RED,
    LIGHTMODE_TEXT
} from "../../../global/constants";
import { fetchRecentFormByTeamId } from "../../../redux/fixtures/fetchRecentFormByTeamId";

function getRecentFormForTeam(fixtures, selectedTeamId) {
    if (!fixtures) return [];
    const sorted = [...fixtures].sort(
        (a, b) => new Date(b.fixture.date) - new Date(a.fixture.date)
    );

    return sorted
        .map((f) => {
            const isHome = f.teams.home.id === selectedTeamId;
            const isAway = f.teams.away.id === selectedTeamId;

            if (!isHome && !isAway) return null;

            const teamWinner = isHome ? f.teams.home.winner : f.teams.away.winner;

            if (teamWinner === null) return "D";
            if (teamWinner === true) return "W";
            return "L";
        })
        .filter(Boolean)
        .slice(0, 5)
        .reverse();
}

function RecentFormBubbles({ selectedLeague, selectedTeamId }) {
    const dispatch = useDispatch();
    const theme = useTheme();
    const size = 23;

    const recentFormByTeamIdAPI = useSelector(
        (state) => state.recentFormByTeamId.byTeamId[selectedTeamId]
    );
    const status =
        useSelector((state) => state.recentFormByTeamId.status[selectedTeamId]) ||
        "idle";

    useEffect(() => {
        if (selectedTeamId) {
            dispatch(
                fetchRecentFormByTeamId({ leagueId: selectedLeague.id, teamId: selectedTeamId })
            );
        }
    }, [dispatch, selectedLeague, selectedTeamId]);

    const recentFormByTeamId = getRecentFormForTeam(
        recentFormByTeamIdAPI,
        selectedTeamId
    );

    const paletteFor = useCallback(
        (r) => {
            switch (r) {
                case "W":
                    return {
                        bg: theme.palette.mode === "dark" ? DARKMODE_GREEN : LIGHTMODE_GREEN,
                        fg: theme.palette.mode === "dark" ? DARKMODE_TEXT : LIGHTMODE_TEXT,
                        label: "Win"
                    };
                case "D":
                    return {
                        bg: theme.palette.grey[500],
                        fg: theme.palette.getContrastText(theme.palette.grey[500]),
                        label: "Draw"
                    };
                case "L":
                default:
                    return {
                        bg: theme.palette.mode === "dark" ? DARKMODE_RED : LIGHTMODE_RED,
                        fg: theme.palette.mode === "dark" ? DARKMODE_TEXT : LIGHTMODE_TEXT,
                        label: "Loss"
                    };
            }
        },
        [theme]
    );

    return (
        <Box sx={{ position: "relative", display: "inline-flex", minHeight: size }}>
            {/* Bubbles */}
            <Stack
                direction="row"
                spacing={1}
                sx={{
                    filter: status === "loading" ? "blur(2px)" : "none",
                    transition: "filter 0.2s ease"
                }}
            >
                {(recentFormByTeamId.length > 0
                    ? recentFormByTeamId
                    : Array(5).fill("-")
                ).map((r, i) => {
                    const { bg, fg, label } = r !== "-" ? paletteFor(r) : { bg: theme.palette.background.paper, fg: theme.palette.text.disabled, label: "" };
                    return (
                        <Tooltip key={`${r}-${i}`} title={label} arrow>
                            <Box
                                role="img"
                                aria-label={label}
                                sx={{
                                    width: size,
                                    height: size,
                                    borderRadius: "50%",
                                    bgcolor: bg,
                                    color: fg,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontWeight: 800,
                                    fontSize: Math.max(12, size * 0.42),
                                    boxShadow: 1,
                                    border: `2px solid ${theme.palette.background.paper}`,
                                    transition: "transform 120ms ease, box-shadow 120ms ease, filter 120ms ease",
                                    filter: i === recentFormByTeamId.length - 1 ? "none" : "grayscale(10%)",
                                    "&:hover": {
                                        transform: "translateY(-2px) scale(1.05)",
                                        boxShadow: 3,
                                        filter: "none"
                                    },
                                    cursor: "default"
                                }}
                            >
                                {r !== "-" ? r : ""}
                            </Box>
                        </Tooltip>
                    );
                })}
            </Stack>

            {/* Loading overlay */}
            {status === "loading" && (
                <Box
                    sx={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        pointerEvents: "none"
                    }}
                >
                    <CircularProgress size={20} sx={{ color: "#fff" }} />
                </Box>
            )}
        </Box>
    );
}

export default RecentFormBubbles;