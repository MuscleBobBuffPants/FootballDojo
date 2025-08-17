import { Box, MenuItem, Select, Typography } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";

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
            map[pos.id] = players.filter((p) => p.position === pos.role);
        });
        return map;
    }, [positions, players]);

    return (
        <Box
            sx={{
                position: "relative",
                width: 970,
                height: 800,
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

    const formations = useMemo(
        () => ({
            "4-3-3": [
                // Attackers
                { id: 2, label: "ST", role: "Attacker", top: "10%", left: "50%" },
                { id: 3, label: "LW", role: "Attacker", top: "15%", left: "25%" },
                { id: 4, label: "RW", role: "Attacker", top: "15%", left: "75%" },

                // Midfielders
                { id: 5, label: "CM1", role: "Midfielder", top: "40%", left: "30%" },
                { id: 6, label: "CM2", role: "Midfielder", top: "40%", left: "70%" },
                { id: 7, label: "CDM", role: "Midfielder", top: "55%", left: "50%" },

                // Defenders
                { id: 8, label: "LB", role: "Defender", top: "75%", left: "15%" },
                { id: 9, label: "RB", role: "Defender", top: "75%", left: "85%" },
                { id: 10, label: "CB1", role: "Defender", top: "75%", left: "40%" },
                { id: 11, label: "CB2", role: "Defender", top: "75%", left: "60%" },

                // Goalkeeper
                { id: 1, label: "GK", role: "Goalkeeper", top: "90%", left: "50%" }
            ],
            "4-4-2": [
                // Attackers
                { id: 2, label: "ST1", role: "Attacker", top: "15%", left: "40%" },
                { id: 3, label: "ST2", role: "Attacker", top: "15%", left: "60%" },

                // Midfielders
                { id: 4, label: "LM", role: "Midfielder", top: "35%", left: "25%" },
                { id: 5, label: "RM", role: "Midfielder", top: "35%", left: "75%" },
                { id: 6, label: "CM1", role: "Midfielder", top: "35%", left: "45%" },
                { id: 7, label: "CM2", role: "Midfielder", top: "35%", left: "55%" },

                // Defenders
                { id: 8, label: "LB", role: "Defender", top: "75%", left: "15%" },
                { id: 9, label: "RB", role: "Defender", top: "75%", left: "85%" },
                { id: 10, label: "CB1", role: "Defender", top: "75%", left: "40%" },
                { id: 11, label: "CB2", role: "Defender", top: "75%", left: "60%" },

                // Goalkeeper
                { id: 1, label: "GK", role: "Goalkeeper", top: "90%", left: "50%" }
            ]
        }),
        []
    );

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
                    <MenuItem value="4-3-3">4-3-3</MenuItem>
                    <MenuItem value="4-4-2">4-4-2</MenuItem>
                </Select>
            </Box>
            <Box sx={{ width: 970, position: "relative", mt: "-1%" }}>
                <Typography
                    variant="h5"
                    component="h2"
                    align="center"
                    sx={{ mb: 2 }}
                >
                    Lineup Builder
                </Typography>

                <SoccerField
                    positions={formations[formation]}
                    lineup={lineup}
                    players={playersByTeam}
                    onAssign={handleAssign}
                />
            </Box>
        </Box>
    );
}
