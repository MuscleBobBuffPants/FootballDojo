import { Box, CircularProgress, Tooltip, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FixtureProfile from "../../components/fixtures/fixtureProfiles/fixtureProfile";
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
    isNonEmptyListObject,
    isNonEmptyObject
} from "../../global/constants";
import { fetchFixturesByLeagueId } from "../../redux/fixtures/fetchFixturesByLeagueId";
import { clearVenue } from "../../redux/venues/fetchVenueByVenueId";
import SeasonDropdown from '../seasonDropdown';

function CustomNoRowsOverlay({ selectedLeague, selectedTeam, filteredFixtures, selectedSeason }) {
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
                {
                    !selectedTeam ? "Please select a team..." :
                        !isNonEmptyListObject(filteredFixtures) ? "No " + selectedLeague.name + " Fixtures (" + selectedSeason + ")"
                            : null
                }
            </Typography>
        </Box>
    );
}


function FixturesGrid({ selectedLeague, selectedTeam }) {
    const dispatch = useDispatch();
    const theme = useTheme();

    const [selectedSeason, setSelectedSeason] = useState(2025);
    const [selectedFixture, setSelectedFixture] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const fixturesByLeagueId = useSelector(
        (state) => state.fixturesByLeagueId.list
    );
    const status = useSelector(
        (state) => state.fixturesByLeagueId.status
    );

    useEffect(() => {
        if (isNonEmptyObject(selectedTeam)) {
            dispatch(fetchFixturesByLeagueId({ leagueId: selectedLeague.id, season: selectedSeason, teamId: selectedTeam.id }));
        }
    }, [dispatch, selectedLeague, selectedTeam, selectedSeason]);

    useEffect(() => {
        setSelectedSeason(2025);
    }, [selectedLeague, selectedTeam]);

    useEffect(() => {
        setModalOpen(true);
    }, [selectedFixture]);

    const handleSeasonChange = (event) => {
        setSelectedSeason(event.target.value);
    }

    const handleRowClick = (fixture) => {
        setSelectedFixture(fixture.row);
    };

    const handleClose = () => {
        setModalOpen(false);
        setSelectedFixture(null);
        dispatch(clearVenue());
    };

    const ResultBubble = ({ result }) => {
        const size = 25;

        let bg, fg, label;
        switch (result) {
            case "W":
                bg = theme.palette.mode === "dark" ? DARKMODE_GREEN : LIGHTMODE_GREEN;
                fg = theme.palette.mode === "dark" ? DARKMODE_TEXT : LIGHTMODE_TEXT;
                label = "Win";
                break;
            case "D":
                bg = theme.palette.grey[500];
                fg = theme.palette.getContrastText(theme.palette.grey[500]);
                label = "Draw";
                break;
            case "L":
                bg = theme.palette.mode === "dark" ? DARKMODE_RED : LIGHTMODE_RED;
                fg = theme.palette.mode === "dark" ? DARKMODE_TEXT : LIGHTMODE_TEXT;
                label = "Loss";
                break;
            default:
                bg = theme.palette.background.paper;
                fg = theme.palette.text.disabled;
                label = "";
        }

        return (
            <Tooltip title={label} arrow>
                <Box
                    sx={{
                        width: size,
                        height: size,
                        borderRadius: "50%",
                        bgcolor: bg,
                        color: fg,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 800,
                        fontSize: Math.max(12, size * 0.42),
                        boxShadow: 1,
                        border: `2px solid ${theme.palette.background.paper}`,
                    }}
                >
                    {result}
                </Box>
            </Tooltip>
        );
    };

    const columns = [
        {
            field: "matchdayNumber",
            headerName: "MD #",
            headerAlign: "center",
            align: "center",
            width: 58,
            sortable: false,
        },
        {
            field: "date",
            headerName: "Date",
            headerAlign: "center",
            align: "center",
            width: 120,
            sortable: false,
        },
        {
            field: 'result',
            headerName: '',
            align: 'center',
            sortable: false,
            renderCell: (params) => {
                if (!params.value) return null; // don't render if null
                return (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%",
                            height: "100%",
                        }}
                    >
                        <ResultBubble result={params.value} />
                    </Box>
                );
            },
        },
        {
            field: "matchup",
            headerName: "Matchup",
            headerAlign: "left",
            align: "left",
            width: 205,
            sortable: false,
        }
    ];

    const filteredFixtures = isNonEmptyObject(selectedTeam)
        ? fixturesByLeagueId.map((response, index) => {
            const formattedDate = formatUtcDate(new Date(response.fixture.date));

            const homeGoals = response.goals?.home ?? null;
            const awayGoals = response.goals?.away ?? null;

            let matchup = "";
            if (selectedTeam.id === response.teams.home.id) {
                matchup = `vs. ${response.teams.away.name}`;
            } else if (selectedTeam.id === response.teams.away.id) {
                matchup = `@ ${response.teams.home.name}`;
            }

            // skip result if no goals yet
            let result = null;
            if (!(homeGoals === null && awayGoals === null)) {
                if (selectedTeam.id === response.teams.home.id) {
                    result =
                        response.teams.home.winner === true ? "W" :
                            response.teams.home.winner === false ? "L" : "D";
                } else if (selectedTeam.id === response.teams.away.id) {
                    result =
                        response.teams.away.winner === true ? "W" :
                            response.teams.away.winner === false ? "L" : "D";
                }
            }

            return {
                id: response.fixture.id,
                matchdayNumber: index + 1,
                date: formattedDate,
                result,
                matchup,
                venueId: response.fixture.venue.id,
                venue: response.fixture.venue.name + " - " + response.fixture.venue.city,
                homeTeam: response.teams.home,
                awayTeam: response.teams.away
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
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        p: 1,
                        backgroundColor: (theme) =>
                            theme.palette.mode === "light"
                                ? "transparent"
                                : theme.palette.background.default,
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={(theme) => ({
                            textAlign: "center",
                            p: 1,
                            backgroundColor:
                                theme.palette.mode === "light"
                                    ? "transparent"
                                    : theme.palette.background.default
                        })}
                    >
                        {selectedTeam ? `Fixtures` : "\u00A0"}
                    </Typography>
                    {isNonEmptyObject(selectedTeam) ?
                        <SeasonDropdown
                            selectedSeason={selectedSeason}
                            handleSeasonChange={handleSeasonChange} /> : null
                    }
                </Box>
                <div style={{ position: "relative" }}>
                    <DataGrid
                        rows={filteredFixtures}
                        columns={columns}
                        sortModel={[{ field: "position", sort: "asc" }]}
                        disableColumnResize
                        disablePagination
                        hideFooter
                        hideFooterSelectedRowCount
                        disableColumnMenu
                        onRowClick={handleRowClick}
                        slots={{
                            noRowsOverlay: () => (
                                <CustomNoRowsOverlay
                                    selectedLeague={selectedLeague}
                                    selectedTeam={selectedTeam}
                                    filteredFixtures={filteredFixtures}
                                    selectedSeason={selectedSeason} />
                            ),
                        }}
                        sx={(theme) => ({
                            width: 500,
                            height: 52 * 5 + 56, // 5 rows visible
                            fontSize: 15,
                            backgroundColor:
                                theme.palette.mode === "light" ? "transparent" : "",
                            "& .MuiDataGrid-cell": {
                                backgroundColor:
                                    theme.palette.mode === "light" ? "transparent" : "",
                            },
                            "& .MuiDataGrid-columnHeader": {
                                backgroundColor:
                                    theme.palette.mode === "light" ? DARKMODE_TEXT : "",
                            },
                            "& .MuiDataGrid-columnHeaders": {
                                backgroundColor:
                                    theme.palette.mode === "light" ? DARKMODE_TEXT : "",
                            },
                            "& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-cell:focus": {
                                outline: "none",
                                userSelect: "none",
                            },
                            "& .MuiDataGrid-columnSeparator": {
                                display: "none",
                            },
                            "& .MuiDataGrid-row:hover": {
                                cursor: "pointer",
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
                {selectedFixture && (
                    <FixtureProfile
                        modalOpen={modalOpen}
                        handleClose={handleClose}
                        selectedLeague={selectedLeague}
                        selectedFixture={selectedFixture}
                    />
                )}
            </Box>
        </div>
    );
}

export default FixturesGrid;