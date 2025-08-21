import {
    Box,
    Button,
    Modal,
    Typography
} from '@mui/material';
import { isNonEmptyObject } from "../../../global/constants";
import FixtureHeadToHeadGrid from "../fixtureProfiles/fixtureHeadToHeadGrid";
import RecentFormBubbles from "../fixtureProfiles/recentFormBubbles";

function FixtureProfile({ modalOpen, handleClose, selectedLeague, selectedFixture }) {
    return (
        <Modal
            open={modalOpen}
            onClose={handleClose}
            BackdropProps={{
                sx: { backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(3px)' }
            }}
        >
            <Box
                sx={(theme) => ({
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: theme.palette.background.paper,
                    boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 4,
                    p: 5,
                    borderRadius: 3,
                    border: `3px solid ${theme.palette.divider}`,
                    minWidth: 450,
                    maxWidth: '90vw',
                    animation: 'fadeIn 0.3s ease-in-out',
                })}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 0.5,
                        mb: 2,
                    }}
                >
                    <Typography variant="h6" fontWeight="bold" color="text.primary">
                        {selectedFixture.date}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        {selectedFixture.venue}
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 3,
                        width: '100%',
                        px: 2,
                    }}
                >
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                        <Box
                            component="img"
                            src={selectedFixture.awayTeam.logo}
                            alt={selectedFixture.awayTeam.name}
                            sx={(theme) => ({
                                width: 96,
                                height: 96,
                                objectFit: 'contain',
                                border: `2px solid ${theme.palette.divider}`,
                                borderRadius: 1,
                                p: 1,
                                backgroundColor: theme.palette.background.default,
                            })}
                        />
                        <Typography variant="subtitle2" fontWeight="bold" textAlign="center">
                            {selectedFixture.awayTeam.name}
                        </Typography>
                        <RecentFormBubbles
                            selectedLeague={selectedLeague}
                            selectedTeamId={selectedFixture.awayTeam.id} />
                    </Box>

                    <Typography variant="subtitle1" fontWeight="bold" color="text.secondary">
                        @
                    </Typography>

                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                        <Box
                            component="img"
                            src={selectedFixture.homeTeam.logo}
                            alt={selectedFixture.homeTeam.name}
                            sx={(theme) => ({
                                width: 96,
                                height: 96,
                                objectFit: 'contain',
                                border: `2px solid ${theme.palette.divider}`,
                                borderRadius: 1,
                                p: 1,
                                backgroundColor: theme.palette.background.default,
                            })}
                        />
                        <Typography variant="subtitle2" fontWeight="bold" textAlign="center">
                            {selectedFixture.homeTeam.name}
                        </Typography>
                        <RecentFormBubbles
                            selectedLeague={selectedLeague}
                            selectedTeamId={selectedFixture.homeTeam.id} />
                    </Box>
                </Box>
                {isNonEmptyObject(selectedFixture) && <FixtureHeadToHeadGrid selectedFixture={selectedFixture} />}
                <Box
                    sx={{
                        mt: 4,
                        display: 'flex',
                        justifyContent: 'flex-end',
                        width: '100%',
                    }}
                >
                    <Button
                        variant="contained"
                        onClick={handleClose}
                        sx={(theme) =>
                        ({
                            borderRadius: 2,
                            backgroundColor: theme.palette.mode === "dark" ? "#4b0052" : "#d9b3ff",
                            color: theme.palette.mode === "dark" ? "#ffffff" : "#000000"
                        })}
                    >
                        Close
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}

export default FixtureProfile;