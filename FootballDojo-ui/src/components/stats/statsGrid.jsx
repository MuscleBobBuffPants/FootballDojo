import {
    Box,
    FormControl, InputLabel,
    MenuItem,
    Select
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useMemo, useState } from 'react';
import {
    DARKMODE_TEXT
} from "../../global/constants";
import StatsSeasonDropdown from '../players/playerProfiles/statsSeasonDropdown';
import YouTubeCard from '../players/playerProfiles/youtubeCard';

const STAT_LABELS = {
    appearences: "Apps",
    minutes: "Mins.",
    on: "On Target",
    lineups: "Starts",
    interceptions: "Steals",
    in: "Came On",
    out: "Left"
};

const formatHeaderName = (propName) =>
    STAT_LABELS[propName] || propName.charAt(0).toUpperCase() + propName.slice(1);

function StatsGrid({ selectedPlayer, playerStatsBySeason, selectedSeason, handleSeasonChange }) {
    const categories = useMemo(() => Object.entries(playerStatsBySeason[0]), [playerStatsBySeason]);

    const [selectedCategory, setSelectedCategory] = useState(categories[0][0]);

    const handleChange = (event) => setSelectedCategory(event.target.value);

    const dataGrids = categories.reduce((acc, [categoryName, properties]) => {
        const excludedPropsByCategory = {
            goals: selectedPlayer.position === "Goalkeeper"
                ? ['total', 'assists']
                : ['conceded', 'saves'],
            cards: ['yellowRed']
        };

        const validProps = Object.entries(properties).filter(([propName, value]) =>
            value !== null &&
            value !== undefined
            && !((excludedPropsByCategory[categoryName] || []).includes(propName)));

        const columns = validProps.map(([propName]) => ({
            field: propName,
            headerName: formatHeaderName(propName),
            width: 70,
            flex: 1,
            align: 'center',
            headerAlign: 'center',
            sortable: false
        }));

        const row = { id: categoryName };

        validProps.forEach(([propName, value]) => {
            if (propName === 'rating' && value != null) {
                row[propName] = parseFloat(value).toFixed(2);
            } else if (propName === 'minutes' && value != null) {
                row[propName] = value.toLocaleString();
            } else {
                row[propName] = value;
            }
        });

        acc[categoryName] = (
            <Box
                key={categoryName}
                sx={{
                    width: '100%',
                    maxWidth: 300,
                    maxHeight: 300,
                    overflowY: 'auto',
                    p: 1,
                    marginLeft: 0,
                    borderRadius: 1
                }}
            >
                <DataGrid
                    rows={[row]}
                    columns={columns}
                    autoHeight
                    hideFooter
                    disableColumnMenu
                    disableRowSelectionOnClick
                    disableColumnFilter
                    disableColumnSelector
                    disableDensitySelector
                    hideFooterSelectedRowCount
                    sortingMode="none"
                    sx={(theme) => ({
                        fontSize: 13,
                        pointerEvents: 'none',
                        backgroundColor: theme.palette.mode === "light" ? "transparent" : "",
                        "& .MuiDataGrid-columnHeaders": {
                            backgroundColor: theme.palette.mode === "light" ? DARKMODE_TEXT : ""
                        },
                        '& .MuiDataGrid-cell': {
                            backgroundColor: theme.palette.mode === "light" ? DARKMODE_TEXT : "",
                            cursor: 'default',
                        },
                        '& .MuiDataGrid-columnHeader': {
                            cursor: 'default',
                            fontSize: 12,
                            backgroundColor: theme.palette.mode === "light" ? DARKMODE_TEXT : "",
                            '&:hover': {
                                backgroundColor: 'transparent',
                            },
                        },
                        '& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-cell:focus': {
                            outline: 'none',
                        },
                        '& .MuiDataGrid-columnSeparator': {
                            display: 'none',
                        },
                    })}
                />
            </Box>
        );

        return acc;
    }, {});

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            positon: 'relative'
        }}>
            <Box sx={{ pl: 1, pt: .25, display: 'flex', alignItems: 'center', gap: 2 }}>
                <FormControl size="small" sx={{ minWidth: 115 }}>
                    <InputLabel sx={{ fontSize: 13 }}>
                        Stat Category
                    </InputLabel>
                    <Select
                        value={selectedCategory}
                        onChange={handleChange}
                        label="Stat Category"
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
                        }}                    >
                        {categories.map(([categoryName]) => (
                            <MenuItem key={categoryName} value={categoryName} sx={{ fontSize: 13 }}>
                                {categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Box sx={{ mr: 3 }} >
                    <StatsSeasonDropdown
                        selectedSeason={selectedSeason}
                        handleSeasonChange={handleSeasonChange} />
                </Box>
            </Box>
            <Box sx={{ width: 250 }}>
                {dataGrids[selectedCategory]}
            </Box>
        </Box>
    );
}

export default StatsGrid;