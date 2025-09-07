import {
    Avatar,
    Box,
    Button,
    Modal,
    Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StatsList from '../../../components/players/playerProfiles/playerStats';
import {
    DARKMODE_PURPLE,
    DARKMODE_TEXT,
    LIGHTMODE_PURPLE,
    LIGHTMODE_TEXT,
    convertCmToFeetInches,
    convertKgToLbs
} from "../../../global/constants";
import { fetchPlayerStatsBySeason } from '../../../redux/stats/fetchPlayerStatsBySeason';
import StatsSeasonDropdown from '../../players/playerProfiles/statsSeasonDropdown';


function PlayerProfile({ modalOpen, handleClose, selectedLeague, selectedPlayer }) {
    const dispatch = useDispatch();
    const [selectedSeason, setSelectedSeason] = useState(2025);

    const playerStatsBySeason = useSelector((state) => state.playerStatsBySeason.list);
    //const status = useSelector((state) => state.playerStatsBySeason.status);
    //const error = useSelector((state) => state.playerStatsBySeason.error);

    useEffect(() => {
        setSelectedSeason(2025);
    }, [modalOpen]);

    useEffect(() => {
        dispatch(fetchPlayerStatsBySeason({
            playerId: selectedPlayer.id,
            leagueId: selectedLeague.id,
            season: selectedSeason
        }));
    }, [dispatch, selectedLeague, selectedPlayer, selectedSeason]);

    const handleSeasonChange = (event) => {
        setSelectedSeason(event.target.value);
    }

    return (
        <Modal
            open={modalOpen}
            onClose={handleClose}
            BackdropProps={{
                sx: { backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(5px)' }
            }}
        >
            <Box
                sx={(theme) => ({
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: theme.palette.background.default,
                    borderRadius: 3,
                    boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                    border: `4px solid ${theme.palette.divider}`,
                    fontFamily: "'Roboto', sans-serif",
                    width: 'fit-content',
                    minWidth: { xs: '95vw', sm: 500 },
                    maxWidth: { xs: '95vw', md: 950 },
                    maxHeight: '80vh',
                    overflowX: 'hidden',
                    overflowY: 'auto',
                    animation: "fadeIn 0.3s ease-in-out",
                })}
            >
                <Box sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    p: 3,
                    gap: 3
                }}>
                    <Avatar
                        src={selectedPlayer.photo}
                        alt={`${selectedPlayer.firstName} ${selectedPlayer.lastName}`}
                        sx={(theme) => ({
                            width: 100,
                            height: 100,
                            border: `3px solid ${theme.palette.divider}`,
                            boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                        })}
                    />
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                        minWidth: 220,
                        flexShrink: 0,
                    }}>
                        {[
                            { label: 'Full Name', value: `${selectedPlayer.firstName} ${selectedPlayer.lastName}`, fullWidth: true },
                            { label: 'Number', value: `#${selectedPlayer.number}` },
                            { label: 'Position', value: selectedPlayer.position },
                            { label: 'Age', value: selectedPlayer.age },
                            { label: 'Height', value: convertCmToFeetInches(selectedPlayer.height) },
                            { label: 'Weight', value: convertKgToLbs(selectedPlayer.weight) },
                            { label: 'Nationality', value: selectedPlayer.nationality },
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
                                    display: 'inline-flex',
                                    flexDirection: field.fullWidth ? 'column' : 'row',
                                    justifyContent: 'space-between',
                                    fontSize: 12,
                                    boxShadow: theme.palette.mode === 'light'
                                        ? 'inset 0 1px 2px rgba(0,0,0,0.05)'
                                        : 'none',
                                })}
                            >
                                <Typography
                                    variant="body2"
                                    sx={(theme) => ({
                                        fontWeight: 'bold',
                                        color: theme.palette.text.secondary,
                                        fontSize: 14
                                    })}
                                >
                                    {field.label}:
                                </Typography>
                                <Typography variant="body2" sx={(theme) => ({
                                    color: theme.palette.text.primary,
                                    fontSize: field.fullWidth ? 15 : 14,
                                    marginTop: field.fullWidth ? 1 : 0,
                                })}>
                                    {field.value}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                    <Box
                        sx={{
                            flex: 1,
                            minWidth: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1,
                        }}
                    >
                        <StatsSeasonDropdown
                            selectedSeason={selectedSeason}
                            handleSeasonChange={handleSeasonChange}
                        />
                        <Box
                            sx={(theme) => ({
                                minHeight: 150,
                                maxHeight: 326,
                                minWidth: 125,
                                overflowY: 'auto',
                                overflowX: 'hidden',
                                borderRadius: 1,
                                boxSizing: 'border-box',
                                bgcolor: theme.palette.mode === 'dark'
                                    ? theme.palette.background.default
                                    : theme.palette.background.paper,
                            })}
                        >
                            <StatsList
                                selectedPlayer={selectedPlayer}
                                playerStatsBySeason={playerStatsBySeason}
                            />
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
                        sx={(theme) =>
                        ({
                            borderRadius: 2,
                            backgroundColor: theme.palette.mode === "dark" ? DARKMODE_PURPLE : LIGHTMODE_PURPLE,
                            color: theme.palette.mode === "dark" ? DARKMODE_TEXT : LIGHTMODE_TEXT
                        })}
                    >
                        Close
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}

export default PlayerProfile;