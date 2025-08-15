import {
    Box,
    FormControl, InputLabel,
    MenuItem,
    Select
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useMemo, useState } from 'react';

function StatsGrid({ selectedPlayer, playerStatsBySeason }) {
    const categories = useMemo(() => Object.entries(playerStatsBySeason[0]), [playerStatsBySeason]);

    const [selectedCategory, setSelectedCategory] = useState(categories[0][0]);
    //const [selectedSeason, setSelectedSeason] = useState("");

    const handleChange = (event) => setSelectedCategory(event.target.value);

    const dataGrids = categories.reduce((acc, [categoryName, properties]) => {
        const excludedPropsByCategory = {
            goals: selectedPlayer.position === "Goalkeeper"
                ? ['total', 'assists']
                : ['conceded', 'saves']
            // Add other categories here if needed
        };

        const validProps = Object.entries(properties).filter(([propName, value]) =>
            value !== null &&
            value !== undefined
            && !((excludedPropsByCategory[categoryName] || []).includes(propName)));

        const columns = validProps.map(([propName]) => ({
            field: propName,
            headerName: propName === "appearences" ? "Apps" :
                propName === "minutes" ? "Mins." :
                    propName === "on" ? "On Target" :
                        propName === "lineups" ? "Starts" :
                            propName.charAt(0).toUpperCase() + propName.slice(1),
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
                    height: 150,
                    overflowY: 'auto',
                    borderRadius: 1,
                    p: 1,
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
                    sx={{
                        fontSize: 13,
                        pointerEvents: 'none',
                        '& .MuiDataGrid-cell': {
                            '&:hover': {
                                backgroundColor: 'transparent',
                            },
                        },
                        '& .MuiDataGrid-columnHeader': {
                            fontSize: 12,
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
                    }}
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
            <Box sx={{ pl: 1, pt: .25, alignSelf: 'flex-start', minWidth: 200 }}>
                <FormControl size="small" sx={{minWidth: 125} }>
                    <InputLabel>Stat Category</InputLabel>
                    <Select value={selectedCategory} onChange={handleChange} label="Stat Category">
                        {categories.map(([categoryName]) => (
                            <MenuItem key={categoryName} value={categoryName}>
                                {categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
            <Box sx={{ width: 250 }}>
                {dataGrids[selectedCategory]}
            </Box>
        </Box>
    );
}

export default StatsGrid;