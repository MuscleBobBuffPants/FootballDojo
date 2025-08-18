import {
    Box,
    Button
} from "@mui/material";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isNonEmptyObject } from "../../global/constants";
import { clearPlayers, fetchPlayersByTeam } from '../../redux/players/fetchPlayersByTeam';
import { fetchTeamByName } from '../../redux/teams/fetchTeamByName';
import { fetchTeamsByLeagueId } from '../../redux/teams/fetchTeamsByLeagueId';
import FixturesGrid from "../fixtures/fixtureGrid";
import FixtureSeasonDropdown from '../fixtures/fixtureSeasonDropdown';
import LineupBuilder from '../lineupBuilder/lineupBuilder';
import PlayerGrid from '../players/playerGrid';
import TeamLogoIcon from '../teams/teamLogoIcon';
import TeamSelectDropdown from '../teams/teamSelectDropdown';


function TeamSelect() {
    const dispatch = useDispatch();

    const [resetFlag, setResetFlag] = useState(false);
    const [selectedTeam, setSelectedTeam] = useState("");
    const [teamLogo, setTeamLogo] = useState(null);
    const [selectedSeason, setSelectedSeason] = useState(2025);

    const teamsByLeagueId = useSelector((state) => state.teamsByLeagueId.list);
    const playersByTeam = useSelector((state) => state.playersByTeam.list);
    //const status = useSelector((state) => state.teamsByLeagueId.status);
    //const error = useSelector((state) => state.teamsByLeagueId.error);

    //if (status === 'loading') {
    //    return <p>Loading team...</p>;
    //}

    //if (status === 'failed') {
    //    return <p>Error: {error}</p>;
    //}

    useEffect(() => {
        dispatch(fetchTeamsByLeagueId({ leagueId: 39, seasonYear: 2025 }));
    }, [dispatch]);

    useEffect(() => {
        if (isNonEmptyObject(selectedTeam)) {
            dispatch(fetchTeamByName({ country: "England", teamName: selectedTeam.name }));
        }
    }, [dispatch, selectedTeam]);

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

    const handleChange = (event) => {
        setResetFlag(prev => !prev);
        setSelectedTeam(event.target.value);
    };

    const handleReset = () => {
        setResetFlag(prev => !prev);
        setSelectedTeam(null);
        dispatch(clearPlayers());
    };

    return (
        <div>
            <Box sx={{ display: "flex", alignItems: "flex-end", gap: 2, mb: 2 }} >
                <TeamLogoIcon
                    selectedTeam={selectedTeam}
                    teamLogo={teamLogo} />

                <TeamSelectDropdown
                    teamsByLeagueId={teamsByLeagueId}
                    selectedTeam={selectedTeam}
                    handleChange={handleChange} />

                <Button
                    variant="contained"
                    color="error"
                    onClick={handleReset}
                    disabled={!selectedTeam}> Reset </Button>

                <FixtureSeasonDropdown
                    selectedTeam={selectedTeam}
                    selectedSeason={selectedSeason} />
            </Box>
            <div style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
                <PlayerGrid
                    selectedTeam={selectedTeam}
                    playersByTeam={playersByTeam} />
                <FixturesGrid
                    selectedTeam={selectedTeam} />
            </div>
            <LineupBuilder
                selectedTeam={selectedTeam.name ? selectedTeam.name : ""}
                playersByTeam={playersByTeam}
                resetFlag={resetFlag} />
        </div>
    );
}

export default TeamSelect;