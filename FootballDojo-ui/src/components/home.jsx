import { Box } from "@mui/material";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FixturesGrid from "../components/fixtures/fixtureGrid";
import FixtureSeasonDropdown from '../components/fixtures/fixtureSeasonDropdown';
import LeagueLogoIcon from '../components/leagues/leagueLogoIcon';
import LeagueSelectDropdown from '../components/leagues/leagueSelectDropdown';
import LineupBuilder from '../components/lineupBuilder/lineupBuilder';
import PlayerGrid from '../components/players/playerGrid';
import StandingsGrid from '../components/standings/standingsGrid';
import TeamLogoIcon from '../components/teams/teamLogoIcon';
import TeamSelectDropdown from '../components/teams/teamSelectDropdown';
import { isNonEmptyListObject, isNonEmptyObject } from "../global/constants";
import { clearPlayers, fetchPlayersByTeam } from '../redux/players/fetchPlayersByTeam';
import { clearPerformancePredictionData } from '../redux/statTracking/selectedPlayers';
import { fetchTeamByName } from '../redux/teams/fetchTeamByName';
import { fetchTeamsByLeagueId } from '../redux/teams/fetchTeamsByLeagueId';

function Home() {
    const dispatch = useDispatch();

    const [resetFlag, setResetFlag] = useState(false);
    const [selectedLeague, setSelectedLeague] = useState("");
    const [selectedTeam, setSelectedTeam] = useState("");
    const [teamLogo, setTeamLogo] = useState(null);
    const [selectedSeason, setSelectedSeason] = useState(2025);

    const teamsByLeagueId = useSelector((state) => state.teamsByLeagueId.list);
    //const status = useSelector((state) => state.teamsByLeagueId.status);
    //const error = useSelector((state) => state.teamsByLeagueId.error);
    const playersByTeam = useSelector((state) => state.playersByTeam.list);
    //const status = useSelector((state) => state.playersByTeam.status);
    //const error = useSelector((state) => state.playersByTeam.error);

    //if (status === 'loading') {
    //    return <p>Loading team...</p>;
    //}

    //if (status === 'failed') {
    //    return <p>Error: {error}</p>;
    //}

    useEffect(() => {
        if (isNonEmptyObject(selectedLeague)) {
            dispatch(fetchTeamsByLeagueId({ leagueId: selectedLeague.id, seasonYear: 2025 }));
        }
    }, [dispatch, selectedLeague]);

    useEffect(() => {
        if (isNonEmptyObject(selectedTeam)) {
            dispatch(fetchTeamByName({ country: selectedLeague.country, teamName: selectedTeam.name }));
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
        setSelectedSeason(2025);
        setResetFlag(prev => !prev);
        setSelectedLeague(event.target.value);
        setSelectedTeam(null);
        dispatch(clearPlayers());
        dispatch(clearPerformancePredictionData());
    };

    const handleTeamChange = (event) => {
        setSelectedSeason(2025);
        setResetFlag(prev => !prev);
        setSelectedTeam(event.target.value);
        dispatch(clearPerformancePredictionData());
    };

    const handleSeasonChange = (event) => {
        setSelectedSeason(event.target.value);
    }

    const sortedPlayers = isNonEmptyListObject(playersByTeam) ? [...playersByTeam].sort((a, b) =>
        a.name.localeCompare(b.name)
    ) : [];

    return (
        <div>
            <Box sx={{ display: "flex", alignItems: "flex-end", gap: 2, mb: 2 }} >
                <LeagueLogoIcon
                    selectedLeague={selectedLeague} />

                <LeagueSelectDropdown
                    selectedLeague={selectedLeague}
                    handleLeagueChange={handleLeagueChange} />

                <TeamLogoIcon
                    selectedTeam={selectedTeam}
                    teamLogo={teamLogo} />

                <TeamSelectDropdown
                    teamsByLeagueId={teamsByLeagueId}
                    selectedTeam={selectedTeam}
                    handleTeamChange={handleTeamChange} />

                <FixtureSeasonDropdown
                    selectedTeam={selectedTeam}
                    selectedSeason={selectedSeason}
                    handleSeasonChange={handleSeasonChange} />
            </Box>
            <div style={{ display: "flex", gap: "20px" }}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    <StandingsGrid
                        selectedLeague={selectedLeague}
                        selectedTeam={selectedTeam}
                        selectedSeason={selectedSeason} />
                    <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                        <PlayerGrid
                            selectedLeague={selectedLeague}
                            selectedTeam={selectedTeam}
                            playersByTeam={sortedPlayers} />
                        <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                            <FixturesGrid
                                selectedLeague={selectedLeague}
                                selectedTeam={selectedTeam}
                                selectedSeason={selectedSeason} />
                        </Box>
                    </Box>
                </Box>
                <Box>
                    <LineupBuilder
                        selectedTeam={selectedTeam ? selectedTeam.name : ""}
                        playersByTeam={sortedPlayers}
                        resetFlag={resetFlag}
                        selectedLeague={selectedLeague}
                        selectedSeason={selectedSeason} />
                </Box>
            </div>
        </div>
    );
}

export default Home;