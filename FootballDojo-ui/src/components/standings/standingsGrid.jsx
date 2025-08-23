import { Box, CircularProgress, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    DARKMODE_GRID_BORDER,
    DARKMODE_PURPLE,
    DARKMODE_TEXT,
    LIGHTMODE_GRID_BORDER,
    LIGHTMODE_PURPLE,
    LIGHTMODE_TEXT,
    isNonEmptyObject,
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
                {!selectedLeague ? "Please select a league..." : null}
            </Typography>
        </Box>
    );
}

const columns = [
    { field: "rank", headerName: "", width: 1, sortable: false },
    {
        field: "teamName",
        headerName: "",
        headerAlign: "center",
        align: "left",
        width: 275,
        sortable: false,
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
    {
        field: "gamesPlayed",
        headerName: "GP",
        headerAlign: "center",
        align: "center",
        width: 5,
        sortable: false,
    },
    {
        field: "goalDifference",
        headerName: "+/-",
        headerAlign: "center",
        align: "center",
        width: 5,
        sortable: false,
        renderCell: (params) => {
            const value = params.value;
            return <span>{value > 0 ? `+${value}` : value}</span>;
        },
    },
    {
        field: "points",
        headerName: "PTS",
        headerAlign: "center",
        align: "center",
        width: 5,
        sortable: false,
    },
];

function StandingsGrid({ selectedLeague, selectedTeam, selectedSeason }) {
    const dispatch = useDispatch();

    const standingsByLeagueId = useSelector(
        (state) => state.standingsByLeagueId.list
    );
    const status = useSelector((state) => state.standingsByLeagueId.status);

    useEffect(() => {
        if (selectedLeague) {
            dispatch(
                fetchStandingsByLeagueId({
                    leagueId: selectedLeague.id,
                    seasonYear: selectedSeason,
                })
            );
        }
    }, [dispatch, selectedLeague, selectedSeason]);

    const standings = isNonEmptyObject(selectedLeague)
        ? standingsByLeagueId.map((response, index) => {
            return {
                id: index,
                rank: response.rank,
                teamName: response.team.name,
                teamLogo: response.team.logo,
                gamesPlayed: response.all.played,
                goalDifference: response.goalsDiff,
                points: response.points,
            };
        })
        : [];

    return (
        <div style={{ textAlign: "left", position: "relative" }}>
            <Box
                sx={(theme) => ({
                    display: "inline-block",
                    marginLeft: 0,
                    backgroundColor: DARKMODE_TEXT,
                    border:
                        theme.palette.mode === "dark"
                            ? DARKMODE_GRID_BORDER
                            : LIGHTMODE_GRID_BORDER,
                    borderRadius: 1,
                    position: "relative", // needed for overlay
                })}
            >
                <Typography
                    variant="h6"
                    sx={(theme) => ({
                        textAlign: "center",
                        p: 1,
                        backgroundColor:
                            theme.palette.mode === "light"
                                ? "transparent"
                                : theme.palette.background.default,
                        borderBottom: "1px solid #4b0052",
                    })}
                >
                    {selectedLeague ? `${selectedLeague.name} Table` : "\u00A0"}
                </Typography>
                <div style={{ position: "relative" }}>
                    <DataGrid
                        rows={standings}
                        columns={columns}
                        disableColumnResize
                        disablePagination
                        hideFooter
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
                        sx={(theme) => ({
                            width: 500,
                            height: 52 * 4 + 56, // 3 rows visible
                            fontSize: 15,
                            backgroundColor:
                                theme.palette.mode === "light" ? "transparent" : "",
                            "& .MuiDataGrid-columnHeaders": {
                                borderBottom: "1px solid #4b0052",
                                backgroundColor:
                                    theme.palette.mode === "light" ? DARKMODE_TEXT : "",
                            },
                            "& .MuiDataGrid-cell": {
                                borderBottom: "1px solid #4b0052",
                                backgroundColor:
                                    theme.palette.mode === "light" ? "transparent" : "",
                                cursor: "default",
                            },
                            "& .MuiDataGrid-columnHeader": {
                                cursor: "default",
                                backgroundColor:
                                    theme.palette.mode === "light" ? DARKMODE_TEXT : "",
                                "&:hover": {
                                    backgroundColor: "transparent",
                                },
                            },
                            "& .MuiDataGrid-row:hover": {
                                backgroundColor: "transparent !important",
                            },
                            "& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-cell:focus": {
                                outline: "none",
                            },
                            "& .MuiDataGrid-columnSeparator": {
                                display: "none",
                            },
                            "& .highlighted-row": {
                                backgroundColor: (theme) =>
                                    theme.palette.mode === "dark"
                                        ? DARKMODE_PURPLE
                                        : LIGHTMODE_PURPLE,
                                color: (theme) =>
                                    theme.palette.mode === "dark"
                                        ? DARKMODE_TEXT
                                        : LIGHTMODE_TEXT,
                            },
                            "& .highlighted-row:hover": {
                                backgroundColor: (theme) =>
                                    theme.palette.mode === "dark"
                                        ? `${DARKMODE_PURPLE} !important`
                                        : `${LIGHTMODE_PURPLE} !important`,
                            },
                            filter: status === "loading" ? "blur(2px)" : "none"
                        })}
                    />
                    {status === "loading" && (
                        <Box
                            sx={(theme) => ({
                                position: "absolute",
                                inset: 0,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: theme.palette.mode === 'dark'
                                    ? theme.palette.background.secondary
                                    : theme.palette.background.secondary,
                                color: theme.palette.mode === "dark"
                                    ? DARKMODE_TEXT
                                    : LIGHTMODE_TEXT,
                                zIndex: 10
                            })}
                        >
                            <CircularProgress size={20}
                                sx={(theme) => ({
                                    color: theme.palette.mode === "dark"
                                        ? DARKMODE_TEXT
                                        : LIGHTMODE_TEXT, mb: 2
                                })} />
                            <Typography variant="body1" fontWeight="bold">
                                Loading...
                            </Typography>
                        </Box>
                    )}
                </div>
            </Box>
        </div>
    );
}

export default StandingsGrid;
