import {
    Box,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select
} from "@mui/material";

function LineupBuilderSeasonDropdown({ selectedSeason, handleSeasonChange }) {
    return (
        <Box display="flex" alignItems="center" gap={2}>
            <FormControl sx={{ minWidth: 103 }} size="small">
                <InputLabel id="stats-season-select-label">
                    Season
                </InputLabel>
                <Select
                    labelId="stats-season-select-label"
                    id="stats-season-select"
                    value={selectedSeason}
                    label="Season"
                    onChange={(e) => {
                        handleSeasonChange(e.target.value);
                    }}
                    sx={(theme) => ({
                        backgroundColor: theme.palette.background.paper,
                        color: "text.primary",
                        borderRadius: 1,
                        fontSize: 13
                    })}
                    MenuProps={{
                        PaperProps: {
                            style: {
                                maxHeight: 38 * 4 + 8, // 5 items at 48px height + padding
                            },
                        },
                    }}
                >
                    <MenuItem value={2025}>2025</MenuItem>
                    <MenuItem value={2024}>2024</MenuItem>
                    <MenuItem value={2023}>2023</MenuItem>
                    <MenuItem value={2022}>2022</MenuItem>
                    <MenuItem value={2021}>2021</MenuItem>
                    <MenuItem value={2020}>2020</MenuItem>
                </Select>
            </FormControl>
            <FormHelperText sx={{ color: "text.primary", fontSize: 11, width: 100 }}>
                (Only Affects <br /> Stat Calculations)
            </FormHelperText>
        </Box>
    )
}
export default LineupBuilderSeasonDropdown;