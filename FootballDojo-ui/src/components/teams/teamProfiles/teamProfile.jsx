import {
    Box,
    Button,
    Modal,
    Typography,
    useTheme
} from '@mui/material';
import React from 'react';
import {
    DARKMODE_PURPLE,
    DARKMODE_TEXT,
    LIGHTMODE_PURPLE,
    LIGHTMODE_TEXT,
    isNonEmptyObject
} from "../../../global/constants";
import RecentFormBubbles from "../../fixtures/fixtureProfiles/recentFormBubbles";
import TeamStatLeaders from './teamStatLeaders';

export default function TeamProfile({ modalOpen, handleClose, selectedLeague, selectedSeason, selectedTeamStats }) {
    const theme = useTheme();

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
                    minWidth: { xs: '95vw', sm: 400, md: 900 },
                    maxWidth: { xs: '95vw', md: 1000 },
                    maxHeight: '80vh',
                    overflowX: 'hidden',
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
                                minWidth: 300,
                                flexShrink: 0,
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