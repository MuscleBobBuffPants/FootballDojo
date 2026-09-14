import { Box, Button, CircularProgress, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    formatDateForFixtureProfile,
    isNonEmptyObject,
} from "../../../global/constants";
import { fetchVenueByVenueId } from "../../../redux/venues/fetchVenueByVenueId";
import AnimatedModal from "../../common/AnimatedModal";
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
                maxHeight: 169,
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
                    component="img"
                    src={venue.image}
                    alt={alt}
                    sx={(theme) => ({
                        width: "100%",
                        height: 169,
                        objectFit: "contain",
                        borderRadius: 2,
                        border: `1px solid ${theme.palette.divider}`,
                    })}
                />
            ) : (
                <Box
                    sx={(theme) => ({
                        width: "100%",
                        height: 169,
                        borderRadius: 2,
                        border: `1px solid ${theme.palette.divider}`,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: theme.palette.background.secondary,
                        gap: 1,
                    })}
                >
                    <CircularProgress size={20} sx={{ mb: 2 }} />
                    <Typography>Loading Venue...</Typography>
                </Box>
            )}
            {venue && venue.capacity && (
                <Typography variant="subtitle2" fontWeight="bold" color="text.secondary" sx={{ mt: 1, textAlign: "center" }}>
                    Capacity: {venue.capacity.toLocaleString()}
                </Typography>
            )}
        </Box>
    );
}

export default function FixtureProfile({ modalOpen, handleClose, selectedLeague, selectedSeason, selectedFixture }) {
    const dispatch = useDispatch();
    const selectedVenue = useSelector((state) => state.venueByVenueId.list);

    useEffect(() => {
        if (isNonEmptyObject(selectedFixture)) {
            dispatch(fetchVenueByVenueId({ venueId: selectedFixture.venueId }));
        }
    }, [dispatch, selectedFixture]);

    return (
        <AnimatedModal open={modalOpen} onClose={handleClose}>
            <Box
                sx={(theme) => ({
                    bgcolor: theme.palette.background.default,
                    boxShadow: "0 24px 60px -20px rgba(0,0,0,0.5)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 3,
                    p: 4,
                    borderRadius: 4,
                    border: `1px solid ${theme.palette.divider}`,
                    width: 'fit-content',
                    minWidth: { xs: '95vw', sm: 500 },
                    maxWidth: { xs: '95vw', md: 950 },
                    maxHeight: '80vh',
                    overflowX: 'hidden',
                    overflowY: 'auto',
                })}
            >
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0.5 }}>
                            <Typography variant="h6" fontWeight="bold">
                                {formatDateForFixtureProfile(selectedFixture.date)}
                            </Typography>
                            <Typography variant="subtitle1" fontWeight="bold" color="text.secondary">
                                {selectedFixture.venue}
                            </Typography>
                            <VenueImageBox venue={selectedVenue} alt={selectedFixture.venue} />
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 3, width: "100%" }}>
                            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
                                <Box
                                    component="img"
                                    src={selectedFixture.awayTeam.logo}
                                    alt={selectedFixture.awayTeam.name}
                                    sx={(theme) => ({
                                        width: 96,
                                        height: 96,
                                        objectFit: "contain",
                                        border: `1px solid ${theme.palette.divider}`,
                                        borderRadius: 2,
                                        p: 1,
                                        backgroundColor: theme.palette.background.paper,
                                    })}
                                />
                                <Typography variant="subtitle1" fontWeight="bold" textAlign="center" mb="+2%">
                                    {selectedFixture.awayTeam.name}
                                </Typography>
                                <RecentFormBubbles selectedLeague={selectedLeague} selectedSeason={selectedSeason} selectedTeamId={selectedFixture.awayTeam.id} />
                            </Box>

                            <Typography variant="subtitle1" fontWeight="bold" color="text.secondary">
                                @
                            </Typography>

                            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
                                <Box
                                    component="img"
                                    src={selectedFixture.homeTeam.logo}
                                    alt={selectedFixture.homeTeam.name}
                                    sx={(theme) => ({
                                        width: 96,
                                        height: 96,
                                        objectFit: "contain",
                                        border: `1px solid ${theme.palette.divider}`,
                                        borderRadius: 2,
                                        p: 1,
                                        backgroundColor: theme.palette.background.paper,
                                    })}
                                />
                                <Typography variant="subtitle1" fontWeight="bold" textAlign="center" mb="+2%">
                                    {selectedFixture.homeTeam.name}
                                </Typography>
                                <RecentFormBubbles selectedLeague={selectedLeague} selectedSeason={selectedSeason} selectedTeamId={selectedFixture.homeTeam.id} />
                            </Box>
                        </Box>

                        {isNonEmptyObject(selectedFixture) && (
                            <Box sx={{ width: '100%' }}>
                                <FixtureHeadToHeadGrid selectedFixture={selectedFixture} />
                            </Box>
                        )}
                <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
                    <Button variant="contained" color="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Box>
            </Box>
        </AnimatedModal>
    );
}
