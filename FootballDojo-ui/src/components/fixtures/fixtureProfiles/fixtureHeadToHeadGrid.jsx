import { Box, CircularProgress, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    DARKMODE_GRID_BORDER,
    DARKMODE_TEXT,
    LIGHTMODE_GRID_BORDER,
    LIGHTMODE_TEXT,
    formatUtcDateForHeadToHeadGrid,
    getGoalColor,
    isNonEmptyObject
} from "../../../global/constants";
import { fetchHeadToHeadFixtures } from "../../../redux/fixtures/fetchHeadToHeadFixtures";

export default function FixtureHeadToHeadGrid({ selectedFixture }) {
    const dispatch = useDispatch();
    const theme = useTheme();

    const headToHeadFixtures = useSelector((state) => state.headToHeadFixtures.list);
    const status = useSelector((state) => state.headToHeadFixtures.status);
    //const error = useSelector((state) => state.headToHeadFixtures.error);

    const GoalBubble = ({ teamGoals, otherGoals }) => {
        const size = 23;
        const { bg, fg } = getGoalColor(theme, teamGoals, otherGoals);
        return (
            <Box
                sx={{
                    display: 'inline-flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: size,
                    height: size,
                    borderRadius: '50%',
                    bgcolor: bg,
                    color: fg,
                    fontWeight: 800,
                    fontSize: Math.max(12, size * 0.42),
                    boxShadow: 1,
                    border: `2px solid ${theme.palette.background.paper}`,
                }}
            >
                {teamGoals}
            </Box>
        );
    };

    const headToHeadFixtureHeader = "Previous Matchups (" + headToHeadFixtures.filter(f => {
        const fixtureDate = new Date(f.fixture.date);
        return fixtureDate <= new Date();
    }).length + ")";

    const columns = [
        {
            field: 'awayTeamGoals',
            headerName: '',
            align: 'center',
            width: 60,
            sortable: false,
            renderCell: (params) => (
                <GoalBubble
                    teamGoals={params.row.awayTeamGoals}
                    otherGoals={params.row.homeTeamGoals}
                />
            ),
        },
        {
            field: "matchup",
            headerName: headToHeadFixtureHeader,
            headerAlign: 'center',
            align: 'center',
            width: 200,
            sortable: false,
            renderCell: (params) => (
                <Box
                    display="flex"
                    flexDirection="column"
                    sx={{
                        width: '100%',
                        height: '100%',
                        pt: 2.5
                    }}>
                    <Typography sx={{ pb: 1.5 }}>{params.row.matchup}</Typography>
                    <Typography variant="body2">
                        {params.row.date}
                    </Typography>
                </Box>
            ),
        },
        {
            field: 'homeTeamGoals',
            headerName: '',
            align: 'center',
            width: 60,
            sortable: false,
            renderCell: (params) => (
                <GoalBubble
                    teamGoals={params.row.homeTeamGoals}
                    otherGoals={params.row.awayTeamGoals}
                />
            ),
        }
    ];

    useEffect(() => {
        if (isNonEmptyObject(selectedFixture)) {
            dispatch(fetchHeadToHeadFixtures({ homeTeamId: selectedFixture.homeTeam.id, awayTeamId: selectedFixture.awayTeam.id }));
        }
    }, [dispatch, selectedFixture]);

    const filteredFixtures = isNonEmptyObject(selectedFixture)
        ? headToHeadFixtures
            .filter(f => {
                const fixtureDate = new Date(f.fixture.date);
                return fixtureDate <= new Date();
            })
            .map((response, index) => {
                return {
                    id: index,
                    homeTeamGoals: response.goals.home,
                    date: formatUtcDateForHeadToHeadGrid(new Date(response.fixture.date)),
                    rawDate: new Date(response.fixture.date),
                    matchup: (
                        <Box display="flex" justifyContent="center">
                            <Box display="flex" alignItems="center" gap={4}>
                                <img
                                    src={response.teams.away.logo}
                                    alt={response.teams.away.name}
                                    style={{ width: 37, height: 37 }}
                                />
                                <Typography>@</Typography>
                                <img
                                    src={response.teams.home.logo}
                                    alt={response.teams.home.name}
                                    style={{ width: 37, height: 37 }}
                                />
                            </Box>
                        </Box>
                    ),
                    awayTeamGoals: response.goals.away
                }
            })
            .sort((a, b) => b.rawDate - a.rawDate) // descending
        : [];

    return (
        <Box sx={(theme) => ({
            backgroundColor: DARKMODE_TEXT,
            border: theme.palette.mode === "dark" ? DARKMODE_GRID_BORDER : LIGHTMODE_GRID_BORDER,
            borderRadius: 1,
            maxWidth: "100%",
            position: "relative" // needed for overlay
        })}>
            <div style={{ position: "relative" }}>
                <DataGrid
                    rows={filteredFixtures}
                    columns={columns}
                    sortModel={[{ field: "date", sort: "desc" }]}
                    disableColumnResize={true}
                    disablePagination={true}
                    disableRowSelectionOnClick
                    hideFooter={true}
                    hideFooterSelectedRowCount
                    disableColumnMenu
                    rowHeight={100}
                    slots={{
                        noRowsOverlay: () => <></>, // render nothing
                    }}
                    sx={{
                        maxWidth: '100%',
                        height: 52 * 5.8 + 56, // 2 items at 52px height + padding
                        backgroundColor: theme.palette.mode === "light" ? "transparent" : "",
                        "& .MuiDataGrid-columnHeaders": {
                            backgroundColor: theme.palette.mode === "light" ? DARKMODE_TEXT : ""
                        },
                        '& .MuiDataGrid-cell': {
                            backgroundColor: theme.palette.mode === "light" ? "transparent" : "",
                            cursor: 'default',
                        },
                        '& .MuiDataGrid-columnHeader': {
                            cursor: 'default',
                            fontSize: 15,
                            backgroundColor: theme.palette.mode === "light" ? DARKMODE_TEXT : "",
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
                        filter: status === "loading" ? "blur(2px)" : "none", // blur grid when loading
                    }}
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
                            zIndex: 10,
                        })}
                    >
                        <CircularProgress size={20}
                            sx={(theme) => ({
                                color: theme.palette.mode === "dark"
                                    ? DARKMODE_TEXT
                                    : LIGHTMODE_TEXT, mb: 2
                            })} />
                        <Typography variant="body1" fontWeight="bold">
                            Loading Fixtures...
                        </Typography>
                    </Box>
                )}
            </div>
        </Box>
    );
}