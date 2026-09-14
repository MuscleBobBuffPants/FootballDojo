import { Box, Tooltip, Typography, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FixtureProfile from "../../components/fixtures/fixtureProfiles/fixtureProfile";
import {
    formatUtcDate,
    getResultColor,
    isNonEmptyObject
} from "../../global/constants";
import { fetchFixturesByLeagueId } from "../../redux/fixtures/fetchFixturesByLeagueId";
import { clearVenue } from "../../redux/venues/fetchVenueByVenueId";
import PanelCard from "../common/PanelCard";
import { rowVariants } from "../common/motionVariants";
import SeasonDropdown from "../seasonDropdown";

function ResultBubble({ result }) {
    const theme = useTheme();
    const size = 24;

    if (!result) return <Box sx={{ width: size, height: size, flexShrink: 0 }} />;

    const { bg, fg } = getResultColor(theme, result);
    const label = result === "W" ? "Win" : result === "L" ? "Loss" : "Draw";

    return (
        <Tooltip title={label} arrow>
            <Box
                sx={{
                    width: size,
                    height: size,
                    flexShrink: 0,
                    borderRadius: "50%",
                    bgcolor: bg,
                    color: fg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 800,
                    fontSize: 12,
                }}
            >
                {result}
            </Box>
        </Tooltip>
    );
}

function FixtureRow({ fixture, onClick }) {
    return (
        <Box
            component={motion.div}
            variants={rowVariants}
            onClick={onClick}
            sx={(theme) => ({
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                px: 2,
                py: 1.1,
                cursor: "pointer",
                borderTop: `1px solid ${theme.palette.divider}`,
                transition: "background-color 120ms ease",
                "&:hover": { bgcolor: theme.palette.background.secondary },
            })}
        >
            <Typography variant="caption" sx={{ width: 78, flexShrink: 0, color: "text.secondary" }}>
                {fixture.date}
            </Typography>
            <ResultBubble result={fixture.result} />
            <Typography variant="body2" sx={{ flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {fixture.matchup}
            </Typography>
        </Box>
    );
}

export default function FixturesGrid({ selectedLeague, selectedTeam }) {
    const dispatch = useDispatch();

    const [selectedSeason, setSelectedSeason] = useState(2025);
    const [selectedFixture, setSelectedFixture] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const fixturesByLeagueId = useSelector((state) => state.fixturesByLeagueId.list);
    const status = useSelector((state) => state.fixturesByLeagueId.status);
    const error = useSelector((state) => state.fixturesByLeagueId.error);

    useEffect(() => {
        setSelectedSeason(2025);
    }, [selectedLeague, selectedTeam]);

    useEffect(() => {
        if (isNonEmptyObject(selectedTeam)) {
            dispatch(fetchFixturesByLeagueId({ leagueId: selectedLeague.id, season: selectedSeason, teamId: selectedTeam.id }));
        }
    }, [dispatch, selectedLeague, selectedTeam, selectedSeason]);

    useEffect(() => {
        if (selectedFixture) setModalOpen(true);
    }, [selectedFixture]);

    const handleSeasonChange = (event) => {
        setSelectedSeason(event.target.value);
    };

    const handleClose = () => {
        setModalOpen(false);
        setSelectedFixture(null);
        dispatch(clearVenue());
    };

    const filteredFixtures = isNonEmptyObject(selectedTeam)
        ? fixturesByLeagueId.map((response, index) => {
            const formattedDate = formatUtcDate(new Date(response.fixture.date));

            const homeGoals = response.goals?.home ?? null;
            const awayGoals = response.goals?.away ?? null;

            let matchup = "";
            if (selectedTeam.id === response.teams.home.id) {
                matchup = `vs. ${response.teams.away.name}`;
            } else if (selectedTeam.id === response.teams.away.id) {
                matchup = `@ ${response.teams.home.name}`;
            }

            let result = null;
            if (!(homeGoals === null && awayGoals === null)) {
                if (selectedTeam.id === response.teams.home.id) {
                    result = response.teams.home.winner === true ? "W" : response.teams.home.winner === false ? "L" : "D";
                } else if (selectedTeam.id === response.teams.away.id) {
                    result = response.teams.away.winner === true ? "W" : response.teams.away.winner === false ? "L" : "D";
                }
            }

            return {
                id: response.fixture.id,
                matchdayNumber: index + 1,
                date: formattedDate,
                result,
                matchup,
                venueId: response.fixture.venue.id,
                venue: response.fixture.venue.name + " - " + response.fixture.venue.city,
                homeTeam: response.teams.home,
                awayTeam: response.teams.away
            };
        })
        : [];

    return (
        <>
            <PanelCard
                title={selectedTeam ? "Fixtures" : " "}
                control={
                    isNonEmptyObject(selectedTeam) && (
                        <SeasonDropdown selectedSeason={selectedSeason} handleSeasonChange={handleSeasonChange} />
                    )
                }
                loading={status === "loading"}
                error={status === "failed" ? error : null}
                onRetry={() => dispatch(fetchFixturesByLeagueId({ leagueId: selectedLeague.id, season: selectedSeason, teamId: selectedTeam.id }))}
                isEmpty={filteredFixtures.length === 0}
                emptyMessage={
                    !selectedTeam
                        ? "Please select a team..."
                        : `No ${selectedLeague?.name ?? ""} Fixtures (${selectedSeason})`
                }
            >
                {filteredFixtures.map((fixture) => (
                    <FixtureRow key={fixture.id} fixture={fixture} onClick={() => setSelectedFixture(fixture)} />
                ))}
            </PanelCard>
            {selectedFixture && (
                <FixtureProfile
                    modalOpen={modalOpen}
                    handleClose={handleClose}
                    selectedLeague={selectedLeague}
                    selectedSeason={selectedSeason}
                    selectedFixture={selectedFixture}
                />
            )}
        </>
    );
}
