import { Box } from "@mui/material";
import React, { useMemo } from "react";
import SoccerLineupSlot from "../../components/lineupBuilder/soccerLineupSlot";

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
                <SoccerLineupSlot
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

export default SoccerField;