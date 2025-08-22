import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Select
} from "@mui/material";
import { isNonEmptyObject } from "../../global/constants";

function FixtureSeasonDropdown({ selectedTeam, selectedSeason }) {
    return (
        <Box>
            <FormControl sx={{ minWidth: 200 }} size="small">
                <InputLabel id="season-select-label">Season</InputLabel>
                <Select
                    labelId="season-select-label"
                    id="season-select"
                    value={isNonEmptyObject(selectedTeam) ? selectedSeason : ""}
                    label="Season"
                    MenuProps={{
                        PaperProps: {
                            style: {
                                maxHeight: 48 * 5 + 8, // 5 items at 48px height + padding
                            },
                        },
                    }}
                    sx={(theme) => ({
                        backgroundColor: theme.palette.background.paper,
                        color: "text.primary",
                        borderRadius: 1,
                        pointerEvents: "none"
                    })}
                >
                    <MenuItem value={2025}>2025</MenuItem>
                </Select>
            </FormControl>
        </Box>
    )
}
export default FixtureSeasonDropdown;
