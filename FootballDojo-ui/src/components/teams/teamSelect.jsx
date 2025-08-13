import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Select
} from "@mui/material";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isNonEmptyObject, testTeamData } from "../../global/constants";
import { fetchTeamByName } from '../../redux/teams/fetchTeamByName';
import { fetchTeamsByLeagueId } from '../../redux/teams/fetchTeamsByLeagueId';
import PlayerGrid from '../players/playerGrid';

function TeamSelect() {
    const dispatch = useDispatch();

    const [useApi, setUseApi] = useState(true);
    const [selectedTeam, setSelectedTeam] = useState({});
    const [teamLogo, setTeamLogo] = useState(null);

    const teamsByLeagueId = useSelector((state) => state.teamsByLeagueId.list);
    //const status = useSelector((state) => state.teamsByLeagueId.status);
    //const error = useSelector((state) => state.teamsByLeagueId.error);

    //if (status === 'loading') {
    //    return <p>Loading team...</p>;
    //}

    //if (status === 'failed') {
    //    return <p>Error: {error}</p>;
    //}

    useEffect(() => {
        if (useApi) {
            dispatch(fetchTeamsByLeagueId({ leagueId: 39, seasonYear: 2025 }));
        }
    }, [dispatch, useApi]);

    useEffect(() => {
        if (useApi && isNonEmptyObject(selectedTeam)) {
            dispatch(fetchTeamByName({ country: "England", teamName: selectedTeam.name }));
        }
    }, [dispatch, useApi, selectedTeam]);

    useEffect(() => {
        setTeamLogo(selectedTeam.logo);
    }, [selectedTeam]);

    //const handleCheckboxChange = (event) => {
    //    handleReset();
    //    setUseApi(event.target.checked);
    //};

    const handleChange = (event) => {
        setSelectedTeam(event.target.value);
    };

    const handleReset = () => {
        setSelectedTeam({});
    };

    return (
        <div>
            {/*<FormControlLabel*/}
            {/*    control={*/}
            {/*        <Checkbox*/}
            {/*            checked={useApi}*/}
            {/*            onChange={handleCheckboxChange}*/}
            {/*            color="secondary"*/}
            {/*        />*/}
            {/*    }*/}
            {/*    label="Use API"*/}
            {/*    sx={{ display: "flex" }}*/}
            {/*/>*/}
            <Box sx={{ display: "flex", alignItems: "flex-end", gap: 2, mb: 2 }} >
                <Box
                    sx={(theme) => ({
                        width: 69,
                        height: 69,
                        bgcolor: isNonEmptyObject(selectedTeam) ? theme.palette.background.paper : "transparent",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 2,
                        overflow: "hidden",
                        border: "1px solid ",
                        borderColor: isNonEmptyObject(selectedTeam) ? "#ccc" : "transparent"
                    })}
                >
                    {isNonEmptyObject(selectedTeam) ? (
                        <img
                            src={teamLogo}
                            style={{ width: "95%", height: "95%", objectFit: "contain" }}
                        />
                    ) : null}
                </Box>
                <FormControl sx={{ minWidth: 200 }} size="small">
                    <InputLabel id="team-select-label">Team</InputLabel>
                    <Select
                        labelId="team-select-label"
                        id="team-select"
                        value={selectedTeam}
                        label="Team"
                        onChange={handleChange}
                        MenuProps={{
                            PaperProps: {
                                style: {
                                    maxHeight: 48 * 5 + 8, // 5 items at 48px height + padding
                                },
                            },
                        }}
                        sx={(theme) => ({
                            backgroundColor: theme.palette.background.paper,
                            borderRadius: 1,
                        })}
                    >
                        {(useApi ? [...teamsByLeagueId] : [...testTeamData])
                            .sort((a, b) => a.team.name.localeCompare(b.team.name))
                            .map(({ team }) => (
                                <MenuItem key={team.id} value={team}>
                                    {team.name}
                                </MenuItem>
                            ))}
                    </Select>
                </FormControl>
                <Button
                    variant="contained"
                    color="error"
                    onClick={handleReset}
                    disabled={!selectedTeam}
                >
                    Reset
                </Button>
            </Box>
            <PlayerGrid useApi={useApi} selectedTeam={selectedTeam} />
        </div>
    );
}

export default TeamSelect;