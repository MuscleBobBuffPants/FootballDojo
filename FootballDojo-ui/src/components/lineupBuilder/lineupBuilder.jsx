import { Box, MenuItem, Select, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FORMATIONS } from "../../global/constants";
import SoccerField from "../lineupBuilder/soccerField";

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
                    MenuProps={{
                        PaperProps: {
                            style: {
                                maxHeight: 48 * 4 + 8, // 4 items at 48px height + padding
                            },
                        },
                    }}
                >
                    {Object.keys(FORMATIONS)
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
