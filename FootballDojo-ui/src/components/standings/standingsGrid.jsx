import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    DARKMODE_PURPLE,
    DARKMODE_TEXT,
    LIGHTMODE_PURPLE,
    LIGHTMODE_TEXT,
    isNonEmptyObject
} from "../../global/constants";
import { fetchStandingsByLeagueId } from "../../redux/standings/fetchStandingsByLeagueId";

function CustomNoRowsOverlay({ selectedLeague }) {
    return (
        <Box
            sx={{
                p: 2,
                textAlign: "center",
                width: "100%",
                color: "#777",
            }}
        >
            <Typography variant="body1">
                {!selectedLeague
                    ? "Please select a league..." : null}
            </Typography>
        </Box>
    );
}

const columns = [
    { field: "rank", headerName: "", width: 1, sortable: false },
    {
        field: "teamName", headerName: "", headerAlign: 'center', align: 'left', width: 250, sortable: false,
        renderCell: (params) => (
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <img
                    src={params.row.teamLogo}
                    alt={params.value}
                    style={{ width: 20, height: 20 }}
                />
                <span>{params.value}</span>
            </div>
        ),
    },
    { field: "gamesPlayed", headerName: "GP", headerAlign: 'center', align: 'center', width: 5, sortable: false },
    {
        field: "goalDifference", headerName: "+/-", headerAlign: 'center', align: 'center', width: 5, sortable: false,
        renderCell: (params) => {
            const value = params.value;
            return (
                <span>
                    {value > 0 ? `+${value}` : value}
                </span>
            );
        },
    },
    { field: "points", headerName: "PTS", headerAlign: 'center', align: 'center', width: 5, sortable: false }
];

function StandingsGrid({ selectedLeague, selectedTeam }) {
    const dispatch = useDispatch();

    const standingsByLeagueId = useSelector((state) => state.standingsByLeagueId.list);
    //const status = useSelector((state) => state.standingsByLeagueId.status);
    //const error = useSelector((state) => state.standingsByLeagueId.error);

    //if (status === 'loading') {
    //    return <p>Loading players...</p>;
    //}

    //if (status === 'failed') {
    //    return <p>Error: {error}</p>;
    //}

    useEffect(() => {
        if (selectedLeague) {
            dispatch(fetchStandingsByLeagueId({ leagueId: selectedLeague.id, seasonYear: 2025 }));
        }
    }, [dispatch, selectedLeague]);


    const standings = isNonEmptyObject(selectedLeague)
        ? standingsByLeagueId.map((response, index) => {
            return {
                id: index,
                rank: response.rank,
                teamName: response.team.name,
                teamLogo: response.team.logo,
                gamesPlayed: response.all.played,
                goalDifference: response.goalsDiff,
                points: response.points
            }
        }) : [];

    return (
        <div style={{ textAlign: "left" }}>
            <div style={{ width: 505, border: "3px solid #ccc", borderRadius: 8 }}>
                <Typography
                    variant="h6"
                    sx={{ textAlign: "center", p: 1 }}
                >
                    {selectedLeague ? `${selectedLeague.name} Table` : "\u00A0"}
                </Typography>
                <DataGrid
                    rows={standings}
                    columns={columns}
                    disableColumnResize={true}
                    disablePagination={true}
                    hideFooter={true}
                    hideFooterSelectedRowCount
                    disableRowSelectionOnClick
                    disableColumnMenu
                    slots={{
                        noRowsOverlay: () => (
                            <CustomNoRowsOverlay selectedLeague={selectedLeague} />
                        ),
                    }}
                    getRowClassName={(params) =>
                        selectedTeam && params.row.teamName === selectedTeam.name
                            ? "highlighted-row"
                            : ""
                    }
                    sx={{
                        width: 500,
                        height: 52 * 4 + 56, // 3 items at 52px height + padding
                        fontSize: 15,
                        '& .MuiDataGrid-cell': {
                            cursor: 'default',
                            '&:hover': {
                                backgroundColor: 'transparent',
                            },
                        },
                        '& .MuiDataGrid-columnHeader': {
                            cursor: 'default',
                            '&:hover': {
                                backgroundColor: 'transparent',
                            },
                        },
                        '& .MuiDataGrid-row:hover': {
                            backgroundColor: 'transparent !important',
                        },
                        '& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-cell:focus': {
                            outline: 'none',
                        },
                        '& .MuiDataGrid-columnSeparator': {
                            display: 'none',
                        },
                        "& .highlighted-row": {
                            backgroundColor: (theme) =>
                                theme.palette.mode === "dark" ? DARKMODE_PURPLE : LIGHTMODE_PURPLE,
                            color: (theme) =>
                                theme.palette.mode === "dark" ? DARKMODE_TEXT : LIGHTMODE_TEXT
                        },
                        "& .highlighted-row:hover": {
                            backgroundColor: (theme) =>
                                theme.palette.mode === "dark" ? `${DARKMODE_PURPLE} !important` : `${LIGHTMODE_PURPLE} !important`
                        }
                    }}
                />
            </div>
        </div>
    );
}

export default StandingsGrid;