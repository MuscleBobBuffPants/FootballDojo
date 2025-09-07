import {
    Box,
    Button,
    Modal,
    Typography,
    useTheme
} from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    DARKMODE_PURPLE,
    DARKMODE_TEXT,
    LIGHTMODE_PURPLE,
    LIGHTMODE_TEXT,
    isNonEmptyObject
} from "../../../global/constants";
import { clearStatLeaderData, fetchStatLeadersByTeam } from '../../../redux/stats/fetchStatLeadersByTeam';
import RecentFormBubbles from "../../fixtures/fixtureProfiles/recentFormBubbles";

function TeamProfile({ modalOpen, handleClose, selectedLeague, selectedSeason, selectedTeamStats }) {
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
        <Modal
            open={modalOpen}
            onClose={handleClose}
            BackdropProps={{
                sx: { backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(5px)' }
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: theme.palette.background.default,
                    borderRadius: 3,
                    boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                    border: `4px solid ${theme.palette.divider}`,
                    fontFamily: "'Roboto', sans-serif",
                    minWidth: { xs: '95vw', sm: 400, md: 750 },
                    maxWidth: { xs: '95vw', md: 950 },
                    maxHeight: '90vh',
                    overflowY: 'auto',
                    animation: "fadeIn 0.3s ease-in-out",
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        p: 3,
                        gap: 3
                    }}
                >
                    <Box>
                        <Box
                            sx={{
                                width: 125,
                                height: 125,
                                bgcolor: theme.palette.background.paper,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: 2,
                                mb: 2,
                                ml: 1.5,
                                overflow: "hidden",
                                border: "1px solid ",
                                borderColor: isNonEmptyObject(selectedTeamStats) ? "#ccc" : "transparent"
                            }}
                        >
                            {isNonEmptyObject(selectedTeamStats) &&
                                <img
                                    src={selectedTeamStats.team.logo}
                                    style={{ width: "95%", height: "95%", objectFit: "contain" }}
                                />
                            }
                        </Box>
                        {isNonEmptyObject(selectedTeamStats) && (
                            <RecentFormBubbles
                                selectedLeague={selectedLeague}
                                selectedSeason={selectedSeason}
                                selectedTeamId={selectedTeamStats.team.id}
                            />
                        )}
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', md: 'row' },
                            gap: 3,
                            flex: 1
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 1,
                                minWidth: 220,
                                flexShrink: 0,
                                flex: 1
                            }}
                        >
                            {[
                                { label: 'Club', value: selectedTeamStats.team.name },
                                { label: 'Country', value: selectedTeamStats.league.country },
                                { label: 'Games Played', value: selectedTeamStats.fixtures.played.total },
                                { label: 'Wins', value: selectedTeamStats.fixtures.wins.total },
                                { label: 'Losses', value: selectedTeamStats.fixtures.loses.total },
                                { label: 'Draws', value: selectedTeamStats.fixtures.draws.total },
                                { label: 'Goals For', value: selectedTeamStats.goals.for.total.total },
                                { label: 'Goals Against', value: selectedTeamStats.goals.against.total.total },
                                { label: 'Clean Sheets', value: selectedTeamStats.clean_sheet.total }
                            ].map((field, i) => (
                                <Box
                                    key={i}
                                    sx={(theme) => ({
                                        border: `3px solid ${theme.palette.divider}`,
                                        borderRadius: 1,
                                        px: 1.5,
                                        py: 1,
                                        bgcolor: theme.palette.mode === 'dark'
                                            ? theme.palette.background.default
                                            : theme.palette.background.paper,
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                    })}
                                >
                                    <Typography
                                        variant="body2"
                                        sx={{ fontWeight: 'bold', color: theme.palette.text.secondary }}
                                    >
                                        {field.label}:
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: theme.palette.text.primary }}>
                                        {field.value}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 1,
                                flex: 3
                            }}
                        >
                            <Typography
                                variant="body1"
                                sx={{ fontWeight: 'bold', color: theme.palette.text.primary, textAlign: 'center' }}
                            >
                                Team Leaders
                            </Typography>
                            <Box
                                sx={(theme) => ({
                                    border: `3px solid ${theme.palette.divider}`,
                                    borderRadius: 1,
                                    p: 2,
                                    maxHeight: 410,
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
                                            mb: 1.5,
                                            pt: i === 0 ? 0 : 1,
                                            borderTop: i === 0 ? 'none' : `1px solid ${theme.palette.divider}`, // border line except for first group
                                            width: '100%'
                                        }}>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                fontWeight: 'bold',
                                                fontSize: 15,
                                                color: theme.palette.text.secondary,
                                                mb: 0.5
                                            }}
                                        >
                                            {desc}
                                        </Typography>
                                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
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
                    </Box>
                </Box>
                <Box
                    sx={{
                        px: 3,
                        py: 2,
                        display: 'flex',
                        justifyContent: 'flex-end',
                    }}
                >
                    <Button
                        variant="contained"
                        onClick={handleClose}
                        sx={{
                            borderRadius: 2,
                            backgroundColor: theme.palette.mode === "dark" ? DARKMODE_PURPLE : LIGHTMODE_PURPLE,
                            color: theme.palette.mode === "dark" ? DARKMODE_TEXT : LIGHTMODE_TEXT
                        }}
                    >
                        Close
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}

export default TeamProfile;