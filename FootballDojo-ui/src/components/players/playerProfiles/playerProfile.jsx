import {
    Avatar,
    Box,
    Button,
    Modal,
    Typography
} from '@mui/material';

function PlayerProfile({ modalOpen, handleClose, selectedPlayer }) {

    return (
        <Modal open={modalOpen} onClose={handleClose} BackdropProps={{
            sx: { backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(3px)' }
        }}>
            <Box
                sx={(theme) => ({
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: theme.palette.background.paper,
                    boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                    display: 'inline-flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: 1,
                    p: 4,
                    pr: 1,
                    borderRadius: 2,
                    border: `3px solid ${theme.palette.divider}`,
                    minHeight: 300,
                    minWidth: 350,
                    maxWidth: '90vw', // responsive limit
                    animation: 'fadeIn 0.3s ease-in-out',
                    '@keyframes fadeIn': {
                        from: { opacity: 0, transform: 'translate(-50%, -45%)' },
                        to: { opacity: 1, transform: 'translate(-50%, -50%)' },
                    },
                })}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar
                        src={selectedPlayer.photo}
                        alt={`${selectedPlayer.firstName} ${selectedPlayer.lastName}`}
                        sx={{
                            width: 120,
                            height: 120,
                            border: '2px solid #ccc'
                        }}
                    />
                </Box>
                <Box sx={{ display: 'flex', gap: 4 }}>
                    <Typography variant="h6" component="h2" fontWeight="bold" sx={{ whiteSpace: 'nowrap' }}>
                        {selectedPlayer.firstName} {selectedPlayer.lastName}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 4 }}>
                    <Typography variant="h6" component="h2" sx={{ whiteSpace: 'nowrap' }}>
                        Number: #{selectedPlayer.number}
                    </Typography>
                    <Typography variant="h6" component="h2" sx={{ whiteSpace: 'nowrap' }}>
                        Position: {selectedPlayer.position}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 4 }}>
                    <Typography variant="h6" component="h2" sx={{ whiteSpace: 'nowrap' }}>
                        Age: {selectedPlayer.age}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 4 }}>
                    <Typography variant="h6" component="h2">
                        Height: {selectedPlayer.height}
                    </Typography>
                    <Typography variant="h6" component="h2">
                        Weight: {selectedPlayer.weight}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 4 }}>
                    <Typography variant="h6" component="h2" sx={{ whiteSpace: 'nowrap' }}>
                        Nationality: {selectedPlayer.nationality}
                    </Typography>
                </Box>
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                    <Button onClick={handleClose} color="primary" variant="contained">
                        Close
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}

export default PlayerProfile;