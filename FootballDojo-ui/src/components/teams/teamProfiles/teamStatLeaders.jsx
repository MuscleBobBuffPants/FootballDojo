import {
    Box,
    Typography,
    useTheme
} from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isNonEmptyObject } from "../../../global/constants";
import { clearStatLeaderData, fetchStatLeadersByTeam } from '../../../redux/stats/fetchStatLeadersByTeam';

export default function TeamStatLeaders({ selectedLeague, selectedSeason, selectedTeamStats }) {
    const dispatch = useDispatch();
    const theme = useTheme();

    const playerStatLeaders = useSelector((state) => state.statLeadersByTeam.list);

    useEffect(() => {
        if (isNonEmptyObject(selectedTeamStats) && selectedSeason === 2025) {
            dispatch(fetchStatLeadersByTeam({ leagueId: selectedLeague.id, teamId: selectedTeamStats.team.id, season: selectedSeason }));
        }
        else {
            dispatch(clearStatLeaderData());
        }
    }, [dispatch, selectedTeamStats, selectedSeason]);

    // Group players by description for dynamic top stats
    const groupedTopStats = playerStatLeaders.reduce((stats, player) => {
        if (!stats[player.description]) stats[player.description] = [];
        stats[player.description].push(player);
        return stats;
    }, {});

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                flex: 1
            }}
        >
            <Typography
                variant="body1"
                sx={{
                    fontWeight: 'bold',
                    color: theme.palette.text.primary,
                    textAlign: 'center'
                }}
            >
                Team Leaders
            </Typography>
            <Box
                sx={(theme) => ({
                    border: `3px solid ${theme.palette.divider}`,
                    borderRadius: 1,
                    p: 2,
                    maxHeight: 260,
                    overflowY: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1.5,         // space between different stat groups
                    bgcolor: theme.palette.mode === 'dark'
                        ? theme.palette.background.default
                        : theme.palette.background.paper
                })}
            >
                {Object.entries(groupedTopStats).map(([desc, players], i) => (
                    <Box
                        key={i}
                        sx={{
                            pt: i === 0 ? 0 : 1,
                            borderTop: i === 0 ? 'none' : `1px solid ${theme.palette.divider}`, // border line except for first group
                            maxWidth: '100%'
                        }}>
                        <Typography
                            variant="body2"
                            sx={{
                                fontWeight: 'bold',
                                fontSize: 15,
                                color: theme.palette.text.secondary,
                                mb: .5,
                                textAlign: 'center'
                            }}
                        >
                            {desc}
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            {players.map((p, idx) => (
                                <Box
                                    key={idx}
                                    sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
                                >
                                    <Typography
                                        variant="body2"
                                        sx={{ color: theme.palette.text.primary, flex: 1 }}
                                    >
                                        {p.name || '—'}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}
                                    >
                                        {p.stat ?? '—'}
                                    </Typography>
                                    {p.photo && (
                                        <img
                                            src={p.photo}
                                            alt={p.name}
                                            style={{
                                                width: 45,
                                                height: 45,
                                                borderRadius: '50%',
                                                objectFit: 'contain'
                                            }}
                                        />
                                    )}
                                </Box>
                            ))}
                        </Box>
                    </Box>
                ))}
            </Box>
        </Box>
    );
}