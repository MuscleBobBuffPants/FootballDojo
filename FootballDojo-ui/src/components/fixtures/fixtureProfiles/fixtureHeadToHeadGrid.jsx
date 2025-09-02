import { Box, CircularProgress, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    DARKMODE_GRID_BORDER,
    DARKMODE_TEXT,
    LIGHTMODE_GRID_BORDER,
    LIGHTMODE_TEXT,
    formatUtcDate,
    getGoalColor,
    isNonEmptyObject
} from "../../../global/constants";
import { fetchHeadToHeadFixtures } from "../../../redux/fixtures/fetchHeadToHeadFixtures";

function FixtureHeadToHeadGrid({ selectedFixture }) {
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
            width: 80,
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
            width: 230,
            sortable: false,
            renderCell: (params) => (
                <Box
                    display="flex"
                    flexDirection="column"
                    sx={{
                        width: '100%',
                        height: '100%',
                        pt: .75
                    }}>
                    <Typography variant="body2" sx={{ pb: .2 }}>{params.row.matchup}</Typography>
                    <Typography variant="caption" color="textSecondary">
                        {params.row.date}
                    </Typography>
                </Box>
            ),
        },
        {
            field: 'homeTeamGoals',
            headerName: '',
            align: 'center',
            width: 80,
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
                const formattedDate = formatUtcDate(new Date(response.fixture.date));
                return {
                    id: index,
                    homeTeamGoals: response.goals.home,
                    date: formattedDate,
                    rawDate: new Date(response.fixture.date),
                    matchup: response.teams.away.name + ' @ ' + response.teams.home.name,
                    awayTeamGoals: response.goals.away
                }
            })
            .sort((a, b) => b.rawDate - a.rawDate) // descending
        : [];

    return (
        <div style={{ textAlign: "left", position: "relative" }}>
            <Box sx={(theme) => ({
                display: "inline-block",
                marginLeft: 0,
                backgroundColor: DARKMODE_TEXT,
                border: theme.palette.mode === "dark" ? DARKMODE_GRID_BORDER : LIGHTMODE_GRID_BORDER,
                borderRadius: 1,
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
                        slots={{
                            noRowsOverlay: () => <></>, // render nothing
                        }}
                        sx={{
                            width: '100%',   // shrink with container
                            maxWidth: '100%',
                            minWidth: 0,     // allows shrinking below content if needed
                            height: 52 * 3 + 56, // 3 items at 52px height + padding
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
        </div>
    );
}

export default FixtureHeadToHeadGrid;
