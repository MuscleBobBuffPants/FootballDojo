import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FixtureProfile from "../../components/fixtures/fixtureProfiles/fixtureProfile";
import {
    DARKMODE_GRID_BORDER,
    DARKMODE_TEXT,
    LIGHTMODE_GRID_BORDER,
    formatUtcDate,
    isNonEmptyObject
} from "../../global/constants";
import { fetchFixturesByLeagueId } from "../../redux/fixtures/fetchFixturesByLeagueId";

function CustomNoRowsOverlay({ selectedTeam }) {
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
                {!selectedTeam
                    ? "Please select a team..." : null}
            </Typography>
        </Box>
    );
}

const columns = [
    { field: "matchdayNumber", headerName: "MD #", headerAlign: 'center', align: 'center', width: 58, sortable: false },
    { field: "date", headerName: "Date", headerAlign: 'center', align: 'center', width: 120, sortable: false },
    { field: "matchup", headerName: "Matchup", headerAlign: 'center', align: 'center', width: 300, sortable: false }
];

function FixturesGrid({ selectedLeague, selectedTeam }) {
    const dispatch = useDispatch();

    const [selectedFixture, setSelectedFixture] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const fixturesByLeagueId = useSelector((state) => state.fixturesByLeagueId.list);
    //const status = useSelector((state) => state.fixturesByLeagueId.status);
    //const error = useSelector((state) => state.fixturesByLeagueId.error);

    //if (status === 'loading') {
    //    return <p>Loading players...</p>;
    //}

    //if (status === 'failed') {
    //    return <p>Error: {error}</p>;
    //}

    useEffect(() => {
        if (isNonEmptyObject(selectedTeam)) {
            dispatch(fetchFixturesByLeagueId({ leagueId: selectedLeague.id, seasonYear: 2025, teamId: selectedTeam.id }));
        }
    }, [dispatch, selectedLeague, selectedTeam]);

    useEffect(() => {
        setModalOpen(true);
    }, [selectedFixture]);


    const handleRowClick = (fixture) => {
        setSelectedFixture(fixture.row);
    };

    const handleClose = () => {
        setModalOpen(false);
        setSelectedFixture(null);
    };

    const filteredFixtures = isNonEmptyObject(selectedTeam)
        ? fixturesByLeagueId.map((response, index) => {
            const formattedDate = formatUtcDate(new Date(response.fixture.date));
            return {
                id: response.fixture.id,
                matchdayNumber: index + 1,
                date: formattedDate,
                matchup: response.teams.away.name + ' @ ' + response.teams.home.name,
                venue: response.fixture.venue.name + ' - ' + response.fixture.venue.city,
                homeTeam: {
                    id: response.teams.home.id,
                    name: response.teams.home.name,
                    logo: response.teams.home.logo
                },
                awayTeam:
                {
                    id: response.teams.away.id,
                    name: response.teams.away.name,
                    logo: response.teams.away.logo
                }
            }
        })
        : [];

    return (
        <div style={{ textAlign: "left" }}>
            <Box sx={(theme) => ({
                display: "inline-block",
                marginLeft: 0,
                backgroundColor: DARKMODE_TEXT,
                border: theme.palette.mode === "dark" ? DARKMODE_GRID_BORDER : LIGHTMODE_GRID_BORDER,
                borderRadius: 1
            })}>
                <DataGrid
                    rows={filteredFixtures}
                    columns={columns}
                    sortModel={[{ field: "position", sort: "asc" }]}
                    disableColumnResize={true}
                    disablePagination={true}
                    hideFooter={true}
                    hideFooterSelectedRowCount
                    disableColumnMenu
                    onRowClick={handleRowClick}
                    slots={{
                        noRowsOverlay: () => (
                            <CustomNoRowsOverlay selectedTeam={selectedTeam} />
                        ),
                    }}
                    sx={(theme) => ({
                        width: 500,
                        height: 52 * 5 + 56, // 5 items at 52px height + padding
                        fontSize: 15,
                        backgroundColor: theme.palette.mode === "light" ? "transparent" : "",
                        "& .MuiDataGrid-cell": {
                            borderBottom: "1px solid #4b0052",
                            backgroundColor: theme.palette.mode === "light" ? "transparent" : "",
                        },
                        "& .MuiDataGrid-columnHeader": {
                            backgroundColor: theme.palette.mode === "light" ? DARKMODE_TEXT : ""
                        },
                        "& .MuiDataGrid-columnHeaders": {
                            borderBottom: "1px solid #4b0052",
                            backgroundColor: theme.palette.mode === "light" ? DARKMODE_TEXT : ""
                        },
                        '& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-cell:focus': {
                            outline: 'none',
                            userSelect: 'none'
                        },
                        '& .MuiDataGrid-columnSeparator': {
                            display: 'none',
                        },
                        "& .MuiDataGrid-row:hover": {
                            cursor: 'pointer'
                        }
                    })}
                />
                {selectedFixture && (
                    <FixtureProfile
                        modalOpen={modalOpen}
                        handleClose={handleClose}
                        selectedLeague={selectedLeague}
                        selectedFixture={selectedFixture} />
                )}

            </Box>
        </div>
    );
}

export default FixturesGrid;