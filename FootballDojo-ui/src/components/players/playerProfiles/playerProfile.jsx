import {
    Avatar,
    Box,
    Button,
    Modal,
    Typography
} from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StatsGrid from '../../../components/stats/statsGrid';
import { isNonEmptyObject } from "../../../global/constants";
import { fetchPlayerStatsBySeason } from '../../../redux/stats/fetchPlayerStatsBySeason';

function PlayerProfile({ modalOpen, handleClose, selectedPlayer }) {
    const dispatch = useDispatch();

    const playerStatsBySeason = useSelector((state) => state.playerStatsBySeason.list);

    useEffect(() => {
        if (isNonEmptyObject(selectedPlayer)) {
            dispatch(fetchPlayerStatsBySeason({ playerId: selectedPlayer.id, leagueId: 39, seasonYear: 2024 }));
        }
    }, [dispatch, selectedPlayer]);

    return (
        <Modal
            open={modalOpen}
            onClose={handleClose}
            BackdropProps={{
                sx: { backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }
            }}
        >
            <Box
                sx={(theme) => ({
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: theme.palette.background.paper,
                    borderRadius: 3,
                    overflow: 'hidden',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                    minWidth: 500,
                    maxWidth: '95vw',
                    border: `4px solid ${theme.palette.divider}`,
                    fontFamily: "'Roboto', sans-serif",
                })}
            >
                <Box sx={{ display: 'flex', p: 3, gap: 3 }}>
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
                            { label: 'Height', value: selectedPlayer.height },
                            { label: 'Weight', value: selectedPlayer.weight },
                            { label: 'Nationality', value: selectedPlayer.nationality },
                        ].map((field, i) => (
                            <Box
                                key={i}
                                sx={(theme) => ({
                                    border: `3px solid ${theme.palette.divider}`,
                                    borderRadius: 1,
                                    px: 1.5,
                                    py: 0.5,
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
                                    sx={(theme) => ({ fontWeight: 'bold', color: theme.palette.text.secondary, fontSize: 12 })}
                                >
                                    {field.label}:
                                </Typography>
                                <Typography variant="body2" sx={(theme) => ({
                                    color: theme.palette.text.primary,
                                    fontSize: field.fullWidth ? 14 : 12,
                                    marginTop: field.fullWidth ? 1 : 0,
                                })}>
                                    {field.value}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                    {playerStatsBySeason && playerStatsBySeason.length >> 0 &&
                        (<StatsGrid selectedPlayer={selectedPlayer} playerStatsBySeason={playerStatsBySeason} />)
                    }
                </Box>
                <Box
                    sx={{
                        px: 3,
                        py: 1,
                        display: 'flex',
                        justifyContent: 'flex-end',
                    }}
                >
                    <Button
                        onClick={handleClose}
                        color="primary"
                        variant="contained"
                        sx={{ borderRadius: 2 }}
                    >
                        Close
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}

export default PlayerProfile;