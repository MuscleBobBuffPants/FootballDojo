import {
    Box,
    Button
} from "@mui/material";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isNonEmptyListObject, isNonEmptyObject } from "../../global/constants";
import { clearPlayers, fetchPlayersByTeam } from '../../redux/players/fetchPlayersByTeam';
import { clearStandings } from '../../redux/standings/fetchStandingsByLeagueId';
import { fetchTeamByName } from '../../redux/teams/fetchTeamByName';
import { fetchTeamsByLeagueId } from '../../redux/teams/fetchTeamsByLeagueId';
import FixturesGrid from "../fixtures/fixtureGrid";
import FixtureSeasonDropdown from '../fixtures/fixtureSeasonDropdown';
import LeagueSelectDropdown from '../leagues/leagueSelectDropdown';
import LineupBuilder from '../lineupBuilder/lineupBuilder';
import PlayerGrid from '../players/playerGrid';
import StandingsGrid from '../standings/standingsGrid';
import TeamLogoIcon from '../teams/teamLogoIcon';
import TeamSelectDropdown from '../teams/teamSelectDropdown';
import LeagueLogoIcon from '../leagues/leagueLogoIcon';


function TeamSelect() {
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
        setResetFlag(prev => !prev);
        setSelectedLeague(event.target.value);
        setSelectedTeam(null);
    };

    const handleTeamChange = (event) => {
        setResetFlag(prev => !prev);
        setSelectedTeam(event.target.value);
    };

    const handleReset = () => {
        setResetFlag(prev => !prev);
        clearAllData();
    };

    const clearAllData = () => {
        setSelectedLeague(null)
        setSelectedTeam(null);
        dispatch(clearPlayers());
        dispatch(clearStandings());
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
                    selectedSeason={selectedSeason} />

                <Button
                    variant="contained"
                    color="error"
                    onClick={handleReset}
                    disabled={!selectedLeague}> Reset </Button>
            </Box>
            <div style={{ display: "flex", gap: "20px" }}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    <StandingsGrid selectedLeague={selectedLeague} />
                    <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                        <PlayerGrid
                            selectedLeague={selectedLeague}
                            selectedTeam={selectedTeam}
                            playersByTeam={sortedPlayers} />
                        <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                            <FixturesGrid
                                selectedLeague={selectedLeague}
                                selectedTeam={selectedTeam} />

                        </Box>
                    </Box>
                </Box>
                <LineupBuilder
                    selectedTeam={selectedTeam ? selectedTeam.name : ""}
                    playersByTeam={sortedPlayers}
                    resetFlag={resetFlag} />
            </div>
        </div>
    );
}

export default TeamSelect;