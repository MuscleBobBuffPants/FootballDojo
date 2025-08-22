import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Select
} from "@mui/material";
import { isNonEmptyObject, TOP5LEAGUES } from "../../global/constants";

function LeagueSelectDropdown({ selectedLeague, handleLeagueChange }) {
    return (
        <Box>
            <FormControl sx={{ minWidth: 200 }} size="small">
                <InputLabel id="league-select-label">
                    League
                </InputLabel>
                <Select
                    labelId="league-select-label"
                    id="league-select"
                    value={isNonEmptyObject(selectedLeague) ? selectedLeague : ""}
                    label="League"
                    onChange={handleLeagueChange}
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
                    {[...TOP5LEAGUES]
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map(( league ) => (
                            <MenuItem key={league.id} value={league}>
                                {league.name}
                            </MenuItem>
                        ))}
                </Select>
            </FormControl>
        </Box>
    )
}

export default LeagueSelectDropdown;
