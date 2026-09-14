import {
    Box,
    Button,
    Typography,
    useTheme
} from '@mui/material';
import React from 'react';
import { isNonEmptyObject } from "../../../global/constants";
import AnimatedModal from '../../common/AnimatedModal';
import RecentFormBubbles from "../../fixtures/fixtureProfiles/recentFormBubbles";
import TeamStatLeaders from './teamStatLeaders';

export default function TeamProfile({ modalOpen, handleClose, selectedLeague, selectedSeason, selectedTeamStats }) {
    const theme = useTheme();

    return (
        <AnimatedModal open={modalOpen} onClose={handleClose}>
            <Box
                sx={{
                    bgcolor: theme.palette.background.default,
                    borderRadius: 4,
                    boxShadow: '0 24px 60px -20px rgba(0,0,0,0.5)',
                    border: `1px solid ${theme.palette.divider}`,
                    minWidth: { xs: '95vw', sm: 400, md: 900 },
                    maxWidth: { xs: '95vw', md: 1000 },
                    maxHeight: '80vh',
                    overflowX: 'hidden',
                    overflowY: 'auto',
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
                                minWidth: { xs: 0, md: 300 },
                                flexShrink: { xs: 1, md: 0 },
                                flex: 1
                            }}
                        >
                            {[
                                { label: 'Club', value: selectedTeamStats.team.name },
                                { label: 'Country', value: selectedTeamStats.league.country },
                                { label: 'Games Played', value: selectedTeamStats.fixtures.played.total },
                                {
                                    label: 'Wins - Losses - Draws', value: selectedTeamStats.fixtures.wins.total
                                        + ' - '
                                        + selectedTeamStats.fixtures.loses.total
                                        + ' - '
                                        + selectedTeamStats.fixtures.draws.total
                                },
                                {
                                    label: 'Goals (For - Against)',
                                    value: selectedTeamStats.goals.for.total.total
                                        + ' - '
                                        + selectedTeamStats.goals.against.total.total
                                },
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
                        <TeamStatLeaders
                            selectedLeague={selectedLeague}
                            selectedSeason={selectedSeason}
                            selectedTeamStats={selectedTeamStats} />
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
                    <Button variant="contained" color="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Box>
            </Box>
        </AnimatedModal>
    );
}