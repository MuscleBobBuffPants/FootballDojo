import {
    Avatar,
    Box,
    Button,
    Modal,
    Typography
} from '@mui/material';

function FixtureProfile({ modalOpen, handleClose }) {
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

export default FixtureProfile;