import { Box } from "@mui/material";
import React, { useMemo } from "react";
import SoccerLineupSlot from "../../components/lineupBuilder/soccerLineupSlot";
import { POSSIBLE_ATTACKER_POSITIONS } from "../../global/constants";

const isAttackerEligible = (pos) => POSSIBLE_ATTACKER_POSITIONS.includes(pos.label);

const SoccerField = ({ positions, lineup, players, onAssign }) => {
    const filteredPlayersBySlot = useMemo(() => {
        const map = {};
        positions.forEach((pos) => {
            const allowedRoles = Array.isArray(pos.role) ? pos.role : [pos.role];

            map[pos.id] = players.filter((p) => {
                const roleMatch = allowedRoles.includes(p.position);
                const attackerEligible =
                    isAttackerEligible(pos) && p.position === "Attacker";

                return roleMatch || attackerEligible;
            });
        });
        return map;
    }, [positions, players]);

    return (
        <Box
            sx={{
                position: "relative",
                width: 1000,
                height: 604,
                bgcolor: "#003300",
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
                    border: "2px solid #eaeaea",
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
                    border: "2px solid #eaeaea",
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