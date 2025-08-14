import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PlayerProfile from "../../components/players/playerProfiles/playerProfile";
import { isNonEmptyObject, positionOrder } from "../../global/constants";
import { fetchPlayerProfileByPlayerId } from "../../redux/players/fetchPlayerProfileByPlayerId";
import { fetchPlayersByTeam } from '../../redux/players/fetchPlayersByTeam';

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
    { field: "name", headerName: "Name", width: 225, sortable: false },
    {
        field: "position", headerName: "Position", width: 150, sortable: false,
        sortComparator: (v1, v2) => {
            return (
                positionOrder.indexOf(v1) - positionOrder.indexOf(v2)
            );
        }
    }
];

function PlayerGrid({ selectedTeam }) {
    const dispatch = useDispatch();

    const [selectedId, setSelectedId] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const playersByTeam = useSelector((state) => state.playersByTeam.list);
    const selectedPlayer = useSelector((state) => state.playerProfileByPlayerId.list);
    //const status = useSelector((state) => state.playersByTeam.status);
    //const error = useSelector((state) => state.playersByTeam.error);

    //if (status === 'loading') {
    //    return <p>Loading players...</p>;
    //}

    //if (status === 'failed') {
    //    return <p>Error: {error}</p>;
    //}

    useEffect(() => {
        if (isNonEmptyObject(selectedTeam)) {
            dispatch(fetchPlayersByTeam({ teamId: selectedTeam.id }));
        }
    }, [dispatch, selectedTeam]);

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
    };

    const filteredPlayers = isNonEmptyObject(selectedTeam)
        ? playersByTeam.map(player => ({
            id: player.id,
            name: player.name,
            number: `# ${player.number}`,
            age: player.age,
            position: player.position
        }))
        : [];

    return (
        <div style={{ textAlign: "left" }}>
            <div style={{ display: "inline-block", marginLeft: 0, border: "3px solid #ccc", borderRadius: 8 }}>
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
                    sx={{
                        height: 52 * 5 + 56, // 5 items at 52px height + padding
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
                    }}
                />
                <PlayerProfile
                    modalOpen={modalOpen}
                    handleClose={handleClose}
                    selectedPlayer={selectedPlayer} />
            </div>
        </div>
    );
}

export default PlayerGrid;