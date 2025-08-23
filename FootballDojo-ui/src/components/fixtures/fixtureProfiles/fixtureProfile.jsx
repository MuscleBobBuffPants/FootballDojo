import { Box, Button, CircularProgress, Modal, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    DARKMODE_PURPLE,
    DARKMODE_TEXT,
    LIGHTMODE_PURPLE,
    LIGHTMODE_TEXT,
    formatDateForFixtureProfile,
    isNonEmptyObject,
} from "../../../global/constants";
import { fetchVenueByVenueId } from "../../../redux/venues/fetchVenueByVenueId";
import FixtureHeadToHeadGrid from "../fixtureProfiles/fixtureHeadToHeadGrid";
import RecentFormBubbles from "../fixtureProfiles/recentFormBubbles";

function VenueImageBox({ venue, alt }) {
    const isLoaded = venue && venue.image;

    return (
        <Box
            sx={{
                position: "relative",
                width: "100%",
                maxWidth: 225,
                height: 169,
                mt: 1,
                mb: 5,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
            }}
        >
            {isLoaded ? (
                <Box
                    component={isLoaded ? "img" : "div"}
                    src={isLoaded ? venue.image : undefined}
                    alt={alt}
                    sx={{
                        width: "100%",
                        height: 169, // fixed
                        objectFit: "contain",
                        borderRadius: 2,
                        border: "1px solid rgba(255,255,255,0.3)",
                        zIndex: 1,
                    }}
                />
            ) : (
                <Box
                    sx={{
                        width: "100%",
                        height: 169,
                        borderRadius: 2,
                        border: "1px solid rgba(255,255,255,0.3)",
                        backgroundColor: "rgba(0,0,0,0.05)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "text.secondary",
                        fontWeight: "bold",
                        zIndex: 10,
                        backdropFilter: "blur(3px)",
                        gap: 1,
                    }}
                >
                    <CircularProgress size={20} sx={{ color: "#fff", mb: 2 }} />
                    <Typography>Loading Venue...</Typography>
                </Box>
            )}

            {/* Capacity */}
            {venue && venue.capacity && (
                <Typography
                    variant="subtitle2"
                    fontWeight="bold"
                    color="text.secondary"
                    sx={{
                        mt: 1,
                        textAlign: "center",
                    }}
                >
                    Capacity: {venue.capacity.toLocaleString()}
                </Typography>
            )}
        </Box>
    );
}

function FixtureProfile({ modalOpen, handleClose, selectedLeague, selectedFixture }) {
    const dispatch = useDispatch();
    const selectedVenue = useSelector((state) => state.venueByVenueId.list);

    useEffect(() => {
        if (isNonEmptyObject(selectedFixture)) {
            dispatch(fetchVenueByVenueId({ venueId: selectedFixture.venueId }));
        }
    }, [dispatch, selectedFixture]);

    return (
        <Modal
            open={modalOpen}
            onClose={handleClose}
            BackdropProps={{
                sx: { backgroundColor: "rgba(0,0,0,0.7)", backdropFilter: "blur(5px)" },
            }}
        >
            <Box
                sx={(theme) => ({
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    bgcolor: theme.palette.background.default,
                    boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 3,
                    p: 4,
                    borderRadius: 3,
                    border: `3px solid ${theme.palette.divider}`,
                    minWidth: 500,
                    maxWidth: "90vw",
                    animation: "fadeIn 0.3s ease-in-out",
                })}
            >
                {/* Header */}
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0.5 }}>
                    <Typography variant="h6" fontWeight="bold">
                        {formatDateForFixtureProfile(selectedFixture.date)}
                    </Typography>
                    <Typography variant="subtitle1" fontWeight="bold" color="text.secondary">
                        {selectedFixture.venue}
                    </Typography>

                    {/* Venue Image with Loading */}
                    <VenueImageBox venue={selectedVenue} alt={selectedFixture.venue} />
                </Box>

                {/* Teams and Recent Form */}
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 3, width: "100%" }}>
                    {/* Away Team */}
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
                        <Box
                            component="img"
                            src={selectedFixture.awayTeam.logo}
                            alt={selectedFixture.awayTeam.name}
                            sx={(theme) => ({
                                width: 96,
                                height: 96,
                                objectFit: "contain",
                                border: `2px solid ${theme.palette.divider}`,
                                borderRadius: 1,
                                p: 1,
                                backgroundColor: theme.palette.background.paper,
                            })}
                        />
                        <Typography variant="subtitle1" fontWeight="bold" textAlign="center" mb="+2%">
                            {selectedFixture.awayTeam.name}
                        </Typography>
                        <RecentFormBubbles selectedLeague={selectedLeague} selectedTeamId={selectedFixture.awayTeam.id} />
                    </Box>

                    <Typography variant="subtitle1" fontWeight="bold" color="text.secondary">
                        @
                    </Typography>

                    {/* Home Team */}
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
                        <Box
                            component="img"
                            src={selectedFixture.homeTeam.logo}
                            alt={selectedFixture.homeTeam.name}
                            sx={(theme) => ({
                                width: 96,
                                height: 96,
                                objectFit: "contain",
                                border: `2px solid ${theme.palette.divider}`,
                                borderRadius: 1,
                                p: 1,
                                backgroundColor: theme.palette.background.paper,
                            })}
                        />
                        <Typography variant="subtitle1" fontWeight="bold" textAlign="center" mb="+2%">
                            {selectedFixture.homeTeam.name}
                        </Typography>
                        <RecentFormBubbles selectedLeague={selectedLeague} selectedTeamId={selectedFixture.homeTeam.id} />
                    </Box>
                </Box>

                {/* Head-to-Head Grid */}
                {isNonEmptyObject(selectedFixture) && <FixtureHeadToHeadGrid selectedFixture={selectedFixture} />}

                {/* Close Button */}
                <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
                    <Button
                        variant="contained"
                        onClick={handleClose}
                        sx={(theme) => ({
                            borderRadius: 2,
                            backgroundColor: theme.palette.mode === "dark" ? DARKMODE_PURPLE : LIGHTMODE_PURPLE,
                            color: theme.palette.mode === "dark" ? DARKMODE_TEXT : LIGHTMODE_TEXT,
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
