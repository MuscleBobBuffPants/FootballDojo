import { Box, CircularProgress, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    DARKMODE_GREEN,
    DARKMODE_GRID_BORDER,
    DARKMODE_RED,
    DARKMODE_TEXT,
    LIGHTMODE_GREEN,
    LIGHTMODE_GRID_BORDER,
    LIGHTMODE_RED,
    LIGHTMODE_TEXT,
    formatUtcDate,
    isNonEmptyObject
} from "../../../global/constants";
import { fetchHeadToHeadFixtures } from "../../../redux/fixtures/fetchHeadToHeadFixtures";

function FixtureHeadToHeadGrid({ selectedFixture }) {
    const dispatch = useDispatch();
    const theme = useTheme();

    const headToHeadFixtures = useSelector((state) => state.headToHeadFixtures.list);
    const status = useSelector((state) => state.headToHeadFixtures.status);
    //const error = useSelector((state) => state.headToHeadFixtures.error);

    //if (status === 'loading') {
    //    return <p>Loading players...</p>;
    //}

    //if (status === 'failed') {
    //    return <p>Error: {error}</p>;
    //}

    const getGoalColor = (teamGoals, otherGoals) => {
        if (teamGoals > otherGoals)
            return {
                bg: theme.palette.mode === "dark" ? DARKMODE_GREEN : LIGHTMODE_GREEN,
                fg: theme.palette.mode === "dark" ? DARKMODE_TEXT : LIGHTMODE_TEXT
            };
        if (teamGoals < otherGoals)
            return {
                bg: theme.palette.mode === "dark" ? DARKMODE_RED : LIGHTMODE_RED,
                fg: theme.palette.mode === "dark" ? DARKMODE_TEXT : LIGHTMODE_TEXT
            };
        return {
            bg: theme.palette.grey[500],
            fg: theme.palette.getContrastText(theme.palette.grey[500])
        };
    };

    const GoalBubble = ({ teamGoals, otherGoals }) => {
        const { bg, fg } = getGoalColor(teamGoals, otherGoals);
        return (
            <Box
                sx={{
                    display: 'inline-flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 18,
                    height: 18,
                    borderRadius: '50%',
                    bgcolor: bg,
                    color: fg,
                    fontWeight: 'bold',
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
        },
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
                        sx={{
                            maxWidth: 415,
                            height: 52 * 3 + 56, // 3 items at 52px height + padding
                            backgroundColor: theme.palette.mode === "light" ? "transparent" : "",
                            "& .MuiDataGrid-columnHeaders": {
                                borderBottom: "1px solid #4b0052",
                                backgroundColor: theme.palette.mode === "light" ? DARKMODE_TEXT : ""
                            },
                            '& .MuiDataGrid-cell': {
                                borderBottom: "1px solid #4b0052",
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
                            sx={{
                                position: "absolute",
                                inset: 0,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: "rgba(0,0,0,0.4)", // semi-transparent dark overlay
                                color: "#fff",
                                zIndex: 10,
                            }}
                        >
                            <CircularProgress size={20} sx={{ color: "#fff", mb: 2 }} />
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
