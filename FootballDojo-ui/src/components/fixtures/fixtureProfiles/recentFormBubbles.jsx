import { Box, Stack, Tooltip, useTheme } from "@mui/material";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecentFormByTeamId } from "../../../redux/fixtures/fetchRecentFormByTeamId";
import { isNonEmptyListObject } from "../../../global/constants";

function getRecentFormForTeam(fixtures, selectedTeamId) {
    if (!fixtures) return [];
    const sorted = [...fixtures].sort((a, b) => new Date(b.fixture.date) - new Date(a.fixture.date));

    return sorted
        .map((f) => {
            const isHome = f.teams.home.id === selectedTeamId;
            const isAway = f.teams.away.id === selectedTeamId;

            if (!isHome && !isAway) return null;

            const teamWinner = isHome ? f.teams.home.winner : f.teams.away.winner;

            if (teamWinner === null) return 'D';
            if (teamWinner === true) return 'W';
            return 'L';
        })
        .filter(Boolean)
        .slice(0, 5);
}

function RecentFormBubbles({ selectedLeague, selectedTeamId }) {
    const dispatch = useDispatch();
    const theme = useTheme();
    const size = 23;

    const recentFormByTeamIdAPI = useSelector((state) => state.recentFormByTeamId.byTeamId[selectedTeamId]);
    //const status = useSelector((state) => state.recentFormByTeamId.status);
    //const error = useSelector((state) => state.recentFormByTeamId.error);

    //if (status === 'loading') {
    //    return <p>Loading players...</p>;
    //}

    //if (status === 'failed') {
    //    return <p>Error: {error}</p>;
    //}

    useEffect(() => {
        if (selectedTeamId) {
            dispatch(fetchRecentFormByTeamId({ leagueId: selectedLeague.id, teamId: selectedTeamId }));
        }
    }, [dispatch, selectedLeague, selectedTeamId]);

    const recentFormByTeamId = getRecentFormForTeam(recentFormByTeamIdAPI, selectedTeamId).reverse();

    const paletteFor = useCallback(
        (r) => {
            switch (r) {
                case 'W':
                    return { bg: theme.palette.success.main, fg: theme.palette.getContrastText(theme.palette.success.main), label: 'Win' };
                case 'D':
                    return { bg: theme.palette.grey[500], fg: theme.palette.getContrastText(theme.palette.grey[500]), label: 'Draw' };
                case 'L':
                default:
                    return { bg: theme.palette.error.main, fg: theme.palette.getContrastText(theme.palette.error.main), label: 'Loss' };
            }
        },
        [theme]
    );

    return (
        <Stack direction="row" alignItems="center" spacing={1}>
            {isNonEmptyListObject(recentFormByTeamId) && recentFormByTeamId.map((r, i) => {
                const { bg, fg, label } = paletteFor(r);
                return (
                    <Tooltip key={`${r}-${i}`} title={label} arrow>
                        <Box
                            role="img"
                            aria-label={label}
                            sx={{
                                width: size,
                                height: size,
                                borderRadius: '50%',
                                bgcolor: bg,
                                color: fg,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 800,
                                fontSize: Math.max(12, size * 0.42),
                                boxShadow: 1,
                                border: `2px solid ${theme.palette.background.paper}`,
                                transition: 'transform 120ms ease, box-shadow 120ms ease, filter 120ms ease',
                                filter: i === recentFormByTeamId.length - 1 ? 'none' : 'grayscale(10%)',
                                '&:hover': {
                                    transform: 'translateY(-2px) scale(1.05)',
                                    boxShadow: 3,
                                    filter: 'none',
                                },
                                cursor: 'default'
                            }}
                        >
                            {r}
                        </Box>
                    </Tooltip>
                );
            })}
        </Stack>
    );
}

export default RecentFormBubbles;