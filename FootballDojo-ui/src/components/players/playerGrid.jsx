import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PlayerProfile from "../../components/players/playerProfiles/playerProfile";
import {
    DARKMODE_GRID_BORDER,
    DARKMODE_TEXT,
    LIGHTMODE_GRID_BORDER,
    POSITION_ORDER,
    isNonEmptyObject
} from "../../global/constants";
import { clearPlayer, fetchPlayerProfileByPlayerId } from "../../redux/players/fetchPlayerProfileByPlayerId";

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
    { field: "number", headerName: "", width: 60, sortable: false },
    { field: "name", headerName: "Name", width: 270, sortable: false },
    {
        field: "position", headerName: "Position", width: 150, sortable: false,
        sortComparator: (v1, v2) => {
            return (
                POSITION_ORDER.indexOf(v1) - POSITION_ORDER.indexOf(v2)
            );
        }
    }
];

function PlayerGrid({ selectedLeague, selectedTeam, playersByTeam }) {
    const dispatch = useDispatch();

    const [selectedId, setSelectedId] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const selectedPlayer = useSelector((state) => state.playerProfileByPlayerId.list);
    //const status = useSelector((state) => state.playerProfileByPlayerId.status);
    //const error = useSelector((state) => state.playerProfileByPlayerId.error);

    //if (status === 'loading') {
    //    return <p>Loading players...</p>;
    //}

    //if (status === 'failed') {
    //    return <p>Error: {error}</p>;
    //}

    useEffect(() => {
        if (selectedId) {
            dispatch(fetchPlayerProfileByPlayerId({ playerId: selectedId }));
        }
    }, [dispatch, selectedId]);

    useEffect(() => {
        if (isNonEmptyObject(selectedPlayer)) {
            setModalOpen(true);
        }
    }, [selectedPlayer]);


    const handleRowClick = (player) => {
        setSelectedId(player.id);
    };

    const handleClose = () => {
        setModalOpen(false);
        setSelectedId(null);
        dispatch(clearPlayer());
    };

    const filteredPlayers = isNonEmptyObject(selectedTeam)
        ? playersByTeam
            .filter(player => player.number !== null)
            .map(player => ({
                id: player.id,
                name: player.name,
                number: `# ${player.number}`,
                age: player.age,
                position: player.position
            }))
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
                    rows={filteredPlayers}
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
                <PlayerProfile
                    modalOpen={modalOpen}
                    handleClose={handleClose}
                    selectedLeague={selectedLeague}
                    selectedPlayer={selectedPlayer} />
            </Box>
        </div>
    );
}

export default PlayerGrid;