import { Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStandingsByLeagueId } from "../../redux/standings/fetchStandingsByLeagueId";

const columns = [
    { field: "rank", headerName: "", width: 1, sortable: false },
    {
        field: "teamName", headerName: "", headerAlign: 'center', align: 'left', width: 150, fontSize: 10, sortable: false,
        renderCell: (params) => (
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <img
                    src={params.row.teamLogo}
                    alt={params.value}
                    style={{ width: 20, height: 20 }}
                />
                <span style={{ fontSize: "13px" }}>{params.value}</span>
            </div>
        ),
    },
    { field: "gamesPlayed", headerName: "GP", headerAlign: 'center', align: 'center', width: 5, sortable: false },
    { field: "goalDifference", headerName: "+/-", headerAlign: 'center', align: 'center', width: 5, sortable: false },
    { field: "points", headerName: "PTS", headerAlign: 'center', align: 'center', width: 5, sortable: false }
];

function StandingsGrid() {
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
        dispatch(fetchStandingsByLeagueId({ leagueId: 39, seasonYear: 2025 }));
    }, [dispatch]);


    const standings = standingsByLeagueId.map((response, index) => {
        return {
            id: index,
            rank: response.rank,
            teamName: response.team.name,
            teamLogo: response.team.logo,
            gamesPlayed: response.all.played,
            goalDifference: response.goalsDiff,
            points: response.points
        }
    })

    return (
        <div style={{ textAlign: "left" }}>
            <div style={{ maxWidth: 400, border: "3px solid #ccc", borderRadius: 8 }}>
                <Typography
                    variant="h6"
                    sx={{ textAlign: "center", p: 1 }}
                >
                    Premier League Table
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
                    sx={{
                        maxWidth: 480,
                        height: 52 * 4 + 56, // 3 items at 52px height + padding
                        '& .MuiDataGrid-cell': {
                            cursor: 'default',
                            '&:hover': {
                                backgroundColor: 'transparent',
                            },
                        },
                        '& .MuiDataGrid-columnHeader': {
                            cursor: 'default',
                            fontSize: 15,
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
                        }
                    }}
                />
            </div>
        </div>
    );
}

export default StandingsGrid;