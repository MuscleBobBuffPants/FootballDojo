import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Select
} from "@mui/material";
import { isNonEmptyObject } from "../../global/constants";

function TeamSelectDropdown({ teamsByLeagueId, selectedTeam, handleTeamChange }) {
    return (
        <Box>
            <FormControl sx={{ minWidth: 200 }} size="small">
                <InputLabel id="team-select-label">
                    Team
                </InputLabel>
                <Select
                    labelId="team-select-label"
                    id="team-select"
                    value={isNonEmptyObject(selectedTeam) ? selectedTeam : ""}
                    label="Team"
                    onChange={handleTeamChange}
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
                    {[...teamsByLeagueId]
                        .filter(({ team }) => team)  // remove undefined
                        .sort((a, b) => (a.team?.name || '').localeCompare(b.team?.name || ''))
                        .map(({ team }) => (
                            <MenuItem key={team.id} value={team}>
                                {team.name}
                            </MenuItem>
                        ))}
                </Select>
            </FormControl>
        </Box>
    )
}

export default TeamSelectDropdown;
