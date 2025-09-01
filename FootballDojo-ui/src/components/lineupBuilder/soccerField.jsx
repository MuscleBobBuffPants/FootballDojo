import { Box } from "@mui/material";
import React, { useMemo } from "react";
import SoccerLineupSlot from "../../components/lineupBuilder/soccerLineupSlot";

const SoccerField = ({ positions, lineup, players, onAssign }) => {
    const filteredPlayersBySlot = useMemo(() => {
        const map = {};
        positions.forEach((pos) => {
            map[pos.id] = players.filter((p) => {
                // Always allow only GK in GK slot
                if (pos.role === "Goalkeeper") {
                    return p.position === "Goalkeeper";
                }
                // For any other slot, allow Defender, Midfielder, or Attacker
                return ["Defender", "Midfielder", "Attacker"].includes(p.position);
            });
        });
        return map;
    }, [positions, players]);

    return (
        <Box
            sx={(theme) => ({
                position: "relative",
                width: 1120,
                height: 720,
                bgcolor: theme.palette.mode === "dark" ? "#003300" : "#42763c",
                border: "2px solid #eaeaea",
                borderRadius: 1,
                overflow: "hidden",
            })}
        >
            {/* Center circle at the halfway line */}
            <Box
                sx={{
                    position: "absolute",
                    top: 0,
                    left: "50%",
                    width: 100,
                    height: 100,
                    border: "2px solid #eaeaea",
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
                    borderLeft: "2px solid #eaeaea",
                    borderRight: "2px solid #eaeaea",
                    borderTop: "2px solid #eaeaea",
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
                    borderLeft: "2px solid #eaeaea",
                    borderRight: "2px solid #eaeaea",
                    borderTop: "2px solid #eaeaea",
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