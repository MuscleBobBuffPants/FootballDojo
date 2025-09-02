import {
    Box,
    FormControl,
    MenuItem,
    Select
} from "@mui/material";

function SeasonDropdown({ selectedSeason, handleSeasonChange }) {
    return (
        <Box display="flex" alignItems="center" gap={2}>

            <FormControl sx={{ minWidth: 100 }} size="small">
                <Select
                    id="season-select"
                    value={selectedSeason}
                    onChange={handleSeasonChange}
                    sx={(theme) => ({
                        backgroundColor: theme.palette.background.paper,
                        color: "text.primary",
                        borderRadius: 1
                    })}
                    MenuProps={{
                        PaperProps: {
                            style: {
                                maxHeight: 48 * 5 + 8, // 5 items
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
        </Box>
    )
}
export default SeasonDropdown;