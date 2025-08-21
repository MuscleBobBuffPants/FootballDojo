import { Box, Button, MenuItem, Select, Typography } from "@mui/material";
import { toPng } from "html-to-image";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import PerformancePredictor from '../../components/lineupBuilder/performancePredictor';
import { FORMATIONS } from "../../global/constants";
import { assignPlayer } from "../../redux/statTracking/selectedPlayers";
import { fetchPlayerStatsBySeason } from "../../redux/stats/fetchPlayerStatsBySeason";
import SoccerField from "../lineupBuilder/soccerField";

export default function LineupBuilder({ selectedTeam, playersByTeam, resetFlag, selectedLeague, seasonYear }) {
    const dispatch = useDispatch();
    const fieldRef = useRef(null);
    const [formation, setFormation] = useState("4-3-3");
    const [lineup, setLineup] = useState({});

    useEffect(() => {
        setLineup({});
    }, [resetFlag, formation]);

    const handleAssign = (slotId, playerId) => {
        const player = playersByTeam.find(p => p.id === playerId);

        // Store player id
        dispatch(assignPlayer({ slotId, player: player ? { id: player.id, stats: {} } : null }));

        // Fetch stats per player
        if (player) {
            dispatch(fetchPlayerStatsBySeason({
                playerId: player.id,
                leagueId: selectedLeague.id,
                seasonYear
            })).then((stats) => {
                dispatch(assignPlayer({ slotId, player: { id: player.id, stats } }));
            });
        }

        // Update local lineup to keep the field updated
        setLineup(prev => {
            const newLineup = { ...prev };
            Object.keys(newLineup).forEach(key => {
                if (newLineup[key] === playerId) newLineup[key] = null;
            });
            newLineup[slotId] = playerId ?? null;
            return newLineup;
        });
    };

    const handleGeneratePNG = async () => {
        if (!fieldRef.current) return;
        try {
            const dataUrl = await toPng(fieldRef.current);
            const blob = await (await fetch(dataUrl)).blob();
            const blobUrl = URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = blobUrl;
            link.download = selectedTeam ? `${selectedTeam}_${formation}.png` : "lineup.png";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (err) {
            console.error("Failed to generate PNG:", err);
        }
    };

    //const isLineupComplete = () => {
    //    const positions = FORMATIONS[formation];
    //    return positions.every(slot => lineup[slot.id]);
    //};

    return (
        <Box sx={{ width: 1000, display: "flex", gap: 2 }}>
            <Box flex={1}>
                <Typography variant="h5" align="center" sx={{ mt: "+1%", mb: "+2%" }}>Lineup Builder</Typography>
                <Box ref={fieldRef}>
                    <SoccerField
                        positions={FORMATIONS[formation]}
                        lineup={lineup}
                        players={playersByTeam}
                        onAssign={handleAssign}
                    />
                    <Box sx={{ mt: 3 }} >
                        <PerformancePredictor />
                    </Box>
                </Box>
            </Box>
            <Box mt={"+7%"}>
                <Typography sx={{ mb: "+5%" }}>Formation:</Typography>
                <Select
                    size="small"
                    value={formation}
                    onChange={e => setFormation(e.target.value)}
                >
                    {Object.keys(FORMATIONS).map(f => (
                        <MenuItem key={f} value={f}>{f}</MenuItem>
                    ))}
                </Select>
                <Box mt={2}>
                    <Button
                        variant="contained"
                        onClick={handleGeneratePNG}
                        sx={(theme) =>
                        ({
                            borderRadius: 2,
                            backgroundColor: theme.palette.mode === "dark" ? "#4b0052" : "#d9b3ff",
                            color: theme.palette.mode === "dark" ? "#ffffff" : "#000000"
                        })}
                    //disabled={!isLineupComplete()}
                    >
                        Download Lineup & Share
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}
