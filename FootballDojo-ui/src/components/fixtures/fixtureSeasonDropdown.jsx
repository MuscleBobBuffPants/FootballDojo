import {
    Box,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select
} from "@mui/material";

function FixtureSeasonDropdown({ selectedSeason, handleSeasonChange }) {
    return (
        <Box display="flex" alignItems="center" gap={2}>

            <FormControl sx={{ minWidth: 200 }} size="small">
                <InputLabel id="season-select-label">
                    Season
                </InputLabel>
                <Select
                    labelId="season-select-label"
                    id="season-select"
                    value={selectedSeason}
                    label="Season"
                    onChange={handleSeasonChange}
                    sx={(theme) => ({
                        backgroundColor: theme.palette.background.paper,
                        color: "text.primary",
                        borderRadius: 1
                    })}
                    MenuProps={{
                        PaperProps: {
                            style: {
                                maxHeight: 48 * 5 + 8, // 5 items at 48px height + padding
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
            <FormHelperText sx={{ color: "text.primary", fontSize: 11 }}>
                (Does Not <br /> Change Roster)
            </FormHelperText>
        </Box>
    )
}
export default FixtureSeasonDropdown;