import { Box } from "@mui/material";
import React, { useMemo } from "react";
import SoccerLineupSlot from "../../components/lineupBuilder/soccerLineupSlot";

const SoccerField = ({ positions, lineup, players, onAssign }) => {
    const filteredPlayersBySlot = useMemo(() => {
        const map = {};
        positions.forEach((pos) => {
            map[pos.id] = players.filter((p) => {
                if (pos.role === "Goalkeeper") {
                    return p.position === "Goalkeeper";
                }
                return ["Defender", "Midfielder", "Attacker"].includes(p.position);
            });
        });
        return map;
    }, [positions, players]);

    return (
        <Box
            sx={(theme) => ({
                position: "relative",
                width: "100%",
                maxWidth: 1120,
                aspectRatio: "1120 / 747",
                mx: "auto",
                bgcolor: theme.palette.mode === "dark" ? "#0B2E17" : "#3E7A3C",
                border: `2px solid ${theme.palette.divider}`,
                borderRadius: 3,
                overflow: "hidden",
            })}
        >
            {/* Center circle at the halfway line — % of each axis relative to the
                original 1120x747 design so it stays circular at any size */}
            <Box
                sx={{
                    position: "absolute",
                    top: 0,
                    left: "50%",
                    width: "8.93%",
                    height: "13.39%",
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
                    width: "62.5%",
                    height: "20.08%",
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
                    width: "22.32%",
                    height: "8.03%",
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