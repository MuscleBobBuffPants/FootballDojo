import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Typography
} from "@mui/material";
import html2canvas from "html2canvas";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import PerformancePredictor from '../../components/lineupBuilder/performancePredictor';
import { FORMATIONS } from "../../global/constants";
import { clearPerformancePredictionData, setPlayerStatsForLineup } from "../../redux/statTracking/selectedPlayers";
import { fetchPlayerStatsBySeason } from "../../redux/stats/fetchPlayerStatsBySeason";
import SoccerField from "../lineupBuilder/soccerField";

// Helper: map API lineup to FORMATIONS slots
const mapApiLineupToSlots = (apiLineup) => {
    if (!apiLineup || !apiLineup.startXI) return { formation: "4-3-3", slots: {} };

    const formationName = apiLineup.formation;
    const slots = {};

    apiLineup.startXI.forEach(({ player }) => {
        if (player.grid) {
            slots[player.grid] = player.id; // Use grid directly as slotId
        }
    });

    return { formation: formationName, slots };
};

export default function LineupBuilder({
    selectedTeam,
    playersByTeam,
    selectedLeague,
    setSelectedSeason,
    selectedSeason,
    lineupByFixtureIdAndTeamId
}) {
    const dispatch = useDispatch();
    const fieldRef = useRef(null);

    const [formation, setFormation] = useState("4-3-3");
    const [lineup, setLineup] = useState({});
    const [resetTrigger, setResetTrigger] = useState(0);
    const [pendingStatFetches, setPendingStatFetches] = useState(0);

    // Auto-map lineup from API
    useEffect(() => {
        if (lineupByFixtureIdAndTeamId) {
            const mappedLineup = mapApiLineupToSlots(lineupByFixtureIdAndTeamId);

            // Only set lineup if formation exists in FORMATIONS
            if (FORMATIONS[mappedLineup.formation]) {
                setFormation(mappedLineup.formation);
                setLineup(mappedLineup.slots);
            } else {
                // Formation unknown — do not map players to avoid broken UI
                console.warn(
                    `Received unknown formation "${mappedLineup.formation}" from API. Skipping player mapping.`
                );
                setLineup({}); // clear lineup
            }
        } else {
            setLineup({});
            setFormation("4-3-3"); // default safe formation
        }
    }, [lineupByFixtureIdAndTeamId]);


    // Update player stats whenever season changes
    useEffect(() => {
        if (!selectedSeason) return;

        Object.entries(lineup).forEach(([slotId, playerId]) => {
            const player = playersByTeam.find(p => p.id === playerId);
            if (!player) return;

            setPendingStatFetches(n => n + 1);
            dispatch(fetchPlayerStatsBySeason({
                playerId: player.id,
                leagueId: selectedLeague.id,
                season: selectedSeason
            })).then(action => {
                if (Array.isArray(action.payload) && action.payload.length > 0) {
                    dispatch(setPlayerStatsForLineup({
                        slotId: slotId.toString(),
                        player: { id: player.id, ...action.payload[0] }
                    }));
                }
            }).finally(() => setPendingStatFetches(n => n - 1));
        });
    }, [selectedSeason, lineup]);

    const handleAssign = (slotId, playerId) => {
        const player = playersByTeam.find(p => p.id === playerId);

        // Fetch stats for assigned player
        if (player) {
            setPendingStatFetches(n => n + 1);
            dispatch(fetchPlayerStatsBySeason({
                playerId: player.id,
                leagueId: selectedLeague.id,
                season: selectedSeason
            })).then(action => {
                if (Array.isArray(action.payload) && action.payload.length > 0) {
                    dispatch(setPlayerStatsForLineup({
                        slotId: slotId.toString(),
                        player: { id: player.id, ...action.payload[0] }
                    }));
                }
            }).finally(() => setPendingStatFetches(n => n - 1));
        }

        // Update lineup locally
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

        // Disable animations
        fieldRef.current.classList.add("no-animations");

        try {
            const canvas = await html2canvas(fieldRef.current, {
                backgroundColor: null,
                scale: 2,
                useCORS: true,
            });

            const dataUrl = canvas.toDataURL("image/png");
            const link = document.createElement("a");
            link.href = dataUrl;
            link.download = selectedTeam ? `${selectedTeam}_${formation}.png` : "lineup.png";
            link.click();
        } catch (err) {
            console.error("Failed to generate PNG:", err);
        } finally {
            fieldRef.current.classList.remove("no-animations");
        }
    };

    const handleReset = () => {
        setLineup({});
        setSelectedSeason(2024);
        dispatch(clearPerformancePredictionData());
        setResetTrigger(prev => prev + 1);
    };

    const isLineupComplete = () => {
        const positions = FORMATIONS[formation];
        return positions.every(slot => lineup[slot.id]);
    };

    return (
        <Box
            sx={(theme) => ({
                borderRadius: 3,
                border: `1px solid ${theme.palette.divider}`,
                bgcolor: theme.palette.background.paper,
                p: { xs: 2, sm: 3 },
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: 3,
            })}
        >
            <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography variant="h5" align="center" sx={{ mb: 2 }}>
                    Lineup Builder
                </Typography>
                <Box ref={fieldRef}>
                    <SoccerField
                        positions={FORMATIONS[formation]}
                        lineup={lineup}
                        players={playersByTeam}
                        onAssign={handleAssign}
                    />
                    <Box sx={{ mt: 2.7 }} >
                        <PerformancePredictor
                            selectedSeason={selectedSeason}
                            handleSeasonChange={setSelectedSeason}
                            resetTrigger={resetTrigger}
                            loading={pendingStatFetches > 0} />
                    </Box>
                </Box>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "row", md: "column" },
                    flexWrap: "wrap",
                    alignItems: { xs: "center", md: "stretch" },
                    gap: 2,
                    mt: { md: 8 },
                }}
            >
                <FormControl sx={{ minWidth: 125 }} size="small">
                    <InputLabel id="formation-select-label">
                        Formation:
                    </InputLabel>
                    <Select
                        labelId="formation-select-label"
                        id="formation-select"
                        size="small"
                        value={formation}
                        onChange={e => setFormation(e.target.value)}
                        sx={theme => ({
                            backgroundColor: theme.palette.background.paper,
                            color: "text.primary",
                        })}
                    >
                        {Object.keys(FORMATIONS).map(f => (
                            <MenuItem key={f} value={f}>{f}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Button variant="outlined" color="error" onClick={handleReset}>
                    Reset Lineup
                </Button>

                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleGeneratePNG}
                    disabled={!isLineupComplete()}
                >
                    Download Lineup & Share
                </Button>
            </Box>
        </Box>
    );
}