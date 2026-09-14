import { Box, Chip, Typography } from "@mui/material";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PlayerProfile from "../../components/players/playerProfiles/playerProfile";
import { isNonEmptyObject, POSITION_ORDER } from "../../global/constants";
import {
    clearPlayer,
    fetchPlayerProfileByPlayerId,
} from "../../redux/players/fetchPlayerProfileByPlayerId";
import { fetchPlayersByTeam } from "../../redux/players/fetchPlayersByTeam";
import PanelCard from "../common/PanelCard";
import { rowVariants } from "../common/motionVariants";

const POSITION_COLORS = {
    Goalkeeper: "#F5A623",
    Defender: "#3E9CFF",
    Midfielder: "#22E07A",
    Attacker: "#F0475C",
};

function PlayerRow({ player, onClick }) {
    return (
        <Box
            component={motion.div}
            variants={rowVariants}
            onClick={onClick}
            sx={(theme) => ({
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                px: 2,
                py: 1.1,
                cursor: "pointer",
                borderTop: `1px solid ${theme.palette.divider}`,
                transition: "background-color 120ms ease",
                "&:hover": { bgcolor: theme.palette.background.secondary },
            })}
        >
            <Box
                sx={(theme) => ({
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 12,
                    fontWeight: 700,
                    bgcolor: theme.palette.background.secondary,
                    color: "text.secondary",
                })}
            >
                {player.number}
            </Box>
            <Typography variant="body2" sx={{ flex: 1, minWidth: 0, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {player.name}
            </Typography>
            <Chip
                label={player.position}
                size="small"
                sx={{
                    fontSize: 11,
                    height: 22,
                    color: POSITION_COLORS[player.position] ?? "text.secondary",
                    bgcolor: `${POSITION_COLORS[player.position] ?? "#888"}22`,
                }}
            />
        </Box>
    );
}

export default function PlayerGrid({ selectedLeague, selectedTeam, playersByTeam, playersByTeamStatus }) {
    const dispatch = useDispatch();

    const [selectedId, setSelectedId] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const selectedPlayer = useSelector((state) => state.playerProfileByPlayerId.list);
    const playerProfileStatus = useSelector((state) => state.playerProfileByPlayerId.status);
    const playersByTeamError = useSelector((state) => state.playersByTeam.error);

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

    const handleClose = () => {
        setModalOpen(false);
        setSelectedId(null);
        dispatch(clearPlayer());
    };

    const filteredPlayers = isNonEmptyObject(selectedTeam)
        ? playersByTeam
            .filter((player) => player.number !== null)
            .map((player) => ({
                id: player.id,
                name: player.name,
                number: player.number,
                age: player.age,
                position: player.position,
            }))
            .sort((a, b) => POSITION_ORDER.indexOf(a.position) - POSITION_ORDER.indexOf(b.position))
        : [];

    return (
        <>
            <PanelCard
                title={selectedTeam ? "Roster" : " "}
                loading={playersByTeamStatus === "loading" || playerProfileStatus === "loading"}
                error={playersByTeamStatus === "failed" ? playersByTeamError : null}
                onRetry={() => dispatch(fetchPlayersByTeam({ teamId: selectedTeam.id }))}
                isEmpty={filteredPlayers.length === 0}
                emptyMessage="Please select a team..."
            >
                {filteredPlayers.map((player) => (
                    <PlayerRow key={player.id} player={player} onClick={() => setSelectedId(player.id)} />
                ))}
            </PanelCard>
            {isNonEmptyObject(selectedPlayer) && (
                <PlayerProfile
                    modalOpen={modalOpen}
                    handleClose={handleClose}
                    selectedLeague={selectedLeague}
                    selectedPlayer={selectedPlayer}
                />
            )}
        </>
    );
}
