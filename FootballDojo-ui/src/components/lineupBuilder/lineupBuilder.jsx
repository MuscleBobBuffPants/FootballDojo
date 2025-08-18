import { Box, MenuItem, Select, Typography } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { FORMATIONS } from "../../global/constants";

const SoccerSlot = React.memo(
    ({ slot, players, value, onChange }) => {
        return (
            <Box
                sx={{
                    position: "absolute",
                    top: slot.top,
                    left: slot.left,
                    transform: "translateX(-50%)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}
            >
                <Typography variant="caption"
                    sx={(theme) => ({
                        bgcolor: theme.palette.background.paper,
                        color: theme.palette.primary,
                        mb: 0.75,
                        px: 1,
                        py: 0.25,
                        borderRadius: 1,
                        boxShadow: 1,
                        display: "inline-block"
                    })}>
                    {slot.label}
                </Typography>
                <Select
                    size="small"
                    displayEmpty
                    MenuProps={{
                        PaperProps: {
                            style: {
                                maxHeight: 48 * 4 + 8, // 4 items at 48px height + padding
                            },
                        },
                    }}
                    value={value ?? ""}
                    onChange={(e) => onChange(slot.id, e.target.value ? e.target.value : null)}
                    sx={(theme) => ({
                        bgcolor: theme.palette.background.paper,
                        color: theme.palette.primary,
                        borderRadius: 1,
                        textAlign: "center",
                        width: "auto",
                        minWidth: 0,
                        alignItems: "center"
                    })}
                    renderValue={(selectedId) => {
                        const player = players.find((p) => p.id === selectedId);
                        return player?.name ?? <em>--</em>;
                    }}
                >
                    {players.map((p) => (
                        <MenuItem key={p.id} value={p.id}>
                            {p.name}
                        </MenuItem>
                    ))}
                </Select>
            </Box>
        );
    },
    (prev, next) => prev.value === next.value && prev.players === next.players
);

const SoccerField = ({ positions, lineup, players, onAssign }) => {
    const filteredPlayersBySlot = useMemo(() => {
        const map = {};
        positions.forEach((pos) => {
            const allowedRoles = Array.isArray(pos.role) ? pos.role : [pos.role];
            map[pos.id] = players.filter((p) => allowedRoles.includes(p.position));
        });
        return map;
    }, [positions, players]);

    return (
        <Box
            sx={{
                position: "relative",
                width: 970,
                height: 550,
                bgcolor: "green",
                border: "4px solid #ccc",
                borderRadius: 2,
                overflow: "hidden",
            }}
        >
            {/* Center circle at the halfway line */}
            <Box
                sx={{
                    position: "absolute",
                    top: 0,
                    left: "50%",
                    width: 100,
                    height: 100,
                    border: "2px solid white",
                    borderRadius: "50%",
                    transform: "translate(-50%, -50%)",
                }}
            />
            {/* Penalty box */}
            <Box
                sx={{
                    position: "absolute",
                    bottom: 0,
                    left: "50%",
                    width: 700,
                    height: 150,
                    border: "2px solid white",
                    transform: "translateX(-50%)", // center it
                }}
            />

            {/* Goal box inside penalty box */}
            <Box
                sx={{
                    position: "absolute",
                    bottom: 0,
                    left: "50%",
                    width: 250,
                    height: 60,
                    border: "2px solid white",
                    transform: "translateX(-50%)",
                }}
            />

            {positions.map((pos) => (
                <SoccerSlot
                    key={pos.id}
                    slot={pos}
                    players={filteredPlayersBySlot[pos.id]}
                    value={lineup[pos.id] ?? null}
                    onChange={onAssign}
                />
            ))}
        </Box>
    );
};

export default function LineupBuilder({ playersByTeam, resetFlag }) {
    const [lineup, setLineup] = useState({});
    const [formation, setFormation] = useState("4-3-3");

    useEffect(() => {
        setLineup({});
    }, [playersByTeam, resetFlag, formation]);

    const handleAssign = (slotId, playerId) => {
        setLineup((prev) => {
            const newLineup = { ...prev };

            // Remove this player from any other slot
            Object.keys(newLineup).forEach((key) => {
                if (newLineup[key] === playerId) {
                    newLineup[key] = null;
                }
            });

            // Assign the player to the selected slot (or null if clearing)
            newLineup[slotId] = playerId ?? null;

            return newLineup;
        });
    };

    return (
        <Box>
            <Box display="flex" pt={2} mb={2}>
                <Typography sx={{ pr: 1, pl: .5 }}>
                    Formation:
                </Typography>
                <Select
                    value={formation}
                    onChange={(e) => setFormation(e.target.value)}
                    size="small"
                >
                    {Object.keys(FORMATIONS)
                        .sort((a, b) => {
                            const defendersA = parseInt(a.split("-")[0], 10);
                            const defendersB = parseInt(b.split("-")[0], 10);
                            return defendersA - defendersB;
                        })
                        .map((formationKey) => (
                            <MenuItem key={formationKey} value={formationKey}>
                                {formationKey}
                            </MenuItem>
                        ))}
                </Select>
            </Box>
            <Box sx={{ width: 970, position: "relative" }}>
                <Typography
                    variant="h5"
                    component="h2"
                    align="center"
                    sx={{ mb: 2 }}
                >
                    Lineup Builder
                </Typography>
                <Box>
                    <SoccerField
                        positions={FORMATIONS[formation]}
                        lineup={lineup}
                        players={playersByTeam}
                        onAssign={handleAssign}
                    />
                </Box>
            </Box>
        </Box>
    );
}
