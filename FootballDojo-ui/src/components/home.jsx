import { Box } from "@mui/material";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FixturesGrid from "../components/fixtures/fixtureGrid";
import LeagueLogoIcon from '../components/leagues/leagueLogoIcon';
import LeagueSelectDropdown from '../components/leagues/leagueSelectDropdown';
import LineupBuilder from '../components/lineupBuilder/lineupBuilder';
import PlayerGrid from '../components/players/playerGrid';
import StandingsGrid from '../components/standings/standingsGrid';
import TeamLogoIcon from '../components/teams/teamLogoIcon';
import TeamSelectDropdown from '../components/teams/teamSelectDropdown';
import { isNonEmptyListObject, isNonEmptyObject } from "../global/constants";
import { fetchLastCompletedFixtureId } from "../redux/fixtures/fetchLastCompletedFixtureId";
import { clearPlayers, fetchPlayersByTeam } from '../redux/players/fetchPlayersByTeam';
import { clearPerformancePredictionData } from '../redux/statTracking/selectedPlayers';
import { fetchTeamByName } from '../redux/teams/fetchTeamByName';
import { fetchTeamsByLeagueId } from '../redux/teams/fetchTeamsByLeagueId';

export default function Home() {
    const dispatch = useDispatch();

    const [selectedLeague, setSelectedLeague] = useState("");
    const [selectedTeam, setSelectedTeam] = useState("");
    const [teamLogo, setTeamLogo] = useState(null);
    const [selectedLineupSeason, setSelectedLineupSeason] = useState(2025);

    const teamsByLeagueId = useSelector((state) => state.teamsByLeagueId.list);
    const lineupByFixtureIdAndTeamId = useSelector((state) => state.lineupByFixtureIdAndTeamId.list);
    const playersByTeam = useSelector((state) => state.playersByTeam.list);
    const playersByTeamStatus = useSelector((state) => state.playersByTeam.status);

    useEffect(() => {
        if (isNonEmptyObject(selectedLeague)) {
            dispatch(fetchTeamsByLeagueId({ leagueId: selectedLeague.id, season: 2025 }));
        }
    }, [dispatch, selectedLeague]);

    useEffect(() => {
        if (isNonEmptyObject(selectedTeam)) {
            dispatch(fetchTeamByName({ country: selectedLeague.country, teamName: selectedTeam.name }));
            dispatch(fetchLastCompletedFixtureId({ leagueId: selectedLeague.id, season: 2025, teamId: selectedTeam.id }));
        }
    }, [dispatch, selectedLeague, selectedTeam]);

    useEffect(() => {
        if (isNonEmptyObject(selectedTeam)) {
            setTeamLogo(selectedTeam.logo);
        }
    }, [selectedTeam]);

    useEffect(() => {
        if (isNonEmptyObject(selectedTeam)) {
            dispatch(fetchPlayersByTeam({ teamId: selectedTeam.id }));
        }
    }, [dispatch, selectedTeam]);

    const handleLeagueChange = (event) => {
        setSelectedLeague(event.target.value);
        setSelectedTeam(null);
        dispatch(clearPlayers());
        dispatch(clearPerformancePredictionData());
    };

    const handleTeamChange = (event) => {
        setSelectedTeam(event.target.value);
        dispatch(clearPerformancePredictionData());
    };

    const sortedPlayers = isNonEmptyListObject(playersByTeam) ? [...playersByTeam].sort((a, b) =>
        a.name.localeCompare(b.name)
    ) : [];

    return (
        <Box sx={{ maxWidth: 1600, mx: "auto" }}>
            <Box
                sx={(theme) => ({
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "flex-end",
                    gap: 2,
                    mb: 4,
                    p: 2,
                    borderRadius: 3,
                    border: `1px solid ${theme.palette.divider}`,
                    bgcolor: theme.palette.background.paper,
                })}
            >
                <LeagueLogoIcon selectedLeague={selectedLeague} />
                <LeagueSelectDropdown selectedLeague={selectedLeague} handleLeagueChange={handleLeagueChange} />
                <TeamLogoIcon selectedTeam={selectedTeam} teamLogo={teamLogo} />
                <TeamSelectDropdown
                    teamsByLeagueId={teamsByLeagueId}
                    selectedTeam={selectedTeam}
                    handleTeamChange={handleTeamChange} />
            </Box>

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", lg: "minmax(320px, 460px) 1fr" },
                    gap: 3,
                    alignItems: "start",
                }}
            >
                <Box sx={{ display: "flex", flexDirection: "column", gap: 3, minWidth: 0 }}>
                    <StandingsGrid selectedLeague={selectedLeague} selectedTeam={selectedTeam} />
                    <PlayerGrid
                        selectedLeague={selectedLeague}
                        selectedTeam={selectedTeam}
                        playersByTeam={sortedPlayers}
                        playersByTeamStatus={playersByTeamStatus} />
                    <FixturesGrid selectedLeague={selectedLeague} selectedTeam={selectedTeam} />
                </Box>
                <Box sx={{ minWidth: 0 }}>
                    <LineupBuilder
                        selectedTeam={selectedTeam ? selectedTeam.name : ""}
                        playersByTeam={sortedPlayers}
                        selectedLeague={selectedLeague}
                        setSelectedSeason={setSelectedLineupSeason}
                        selectedSeason={selectedLineupSeason}
                        lineupByFixtureIdAndTeamId={lineupByFixtureIdAndTeamId}
                    />
                </Box>
            </Box>
        </Box>
    );
}
