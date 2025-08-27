import { Box, Grid, Typography } from "@mui/material";
import { keyframes } from "@mui/system";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { DARKMODE_GRID_BORDER, LIGHTMODE_GRID_BORDER } from "../../global/constants";
import LineupBuilderSeasonDropdown from "../lineupBuilder/lineupBuilderSeasonDropdown";

const flashGreen = keyframes`
  0% { color: green; }
  99% { color: green; }
  100% { color: inherit; }
`;

const flashRed = keyframes`
  0% { color: red; }
  99% { color: red; }
  100% { color: inherit; }
`;

export default function PerformancePredictor({ selectedSeason, handleSeasonChange, resetTrigger }) {
    const playerStats = useSelector(state => state.selectedPlayers.playerStats);
    const prevValuesRef = useRef({});
    const firstUpdateRef = useRef(true); // skip first animation after mount, reset, or season change

    // Reset previous values on resetTrigger or season change
    useEffect(() => {
        prevValuesRef.current = {};
        firstUpdateRef.current = true;
    }, [resetTrigger]);

    // Calculate per-90 field values
    let fieldValues = {
        TotalShots: 0, ShotsOnTarget: 0, Goals: 0, Assists: 0,
        TotalPasses: 0, KeyPasses: 0, DribblesAttempted: 0, DribblesWon: 0,
        DuelsAttempted: 0, DuelsWon: 0, FoulsCommitted: 0, FoulsDrawn: 0,
        Tackles: 0, Blocks: 0, Interceptions: 0, Rating: 0
    };

    if (playerStats.length > 0) {
        const playersWithMinutes = playerStats.filter(p => (p.games?.minutes ?? 0) > 0);
        const numPlayersWithMinutes = playersWithMinutes.length || 1;
        const per90 = (stat, minutes) => (minutes > 0 ? (stat / minutes) * 90 : 0);
        const sumPer90 = getValue =>
            playersWithMinutes.reduce((sum, p) => sum + per90(getValue(p) ?? 0, p.games.minutes), 0);

        fieldValues = {
            TotalShots: sumPer90(p => p.shots?.total),
            ShotsOnTarget: sumPer90(p => p.shots?.on),
            Goals: sumPer90(p => p.goals?.total),
            Assists: sumPer90(p => p.goals?.assists),
            TotalPasses: sumPer90(p => p.passes?.total),
            KeyPasses: sumPer90(p => p.passes?.key),
            DribblesAttempted: sumPer90(p => p.dribbles?.attempts),
            DribblesWon: sumPer90(p => p.dribbles?.success),
            DuelsAttempted: sumPer90(p => p.duels?.total),
            DuelsWon: sumPer90(p => p.duels?.won),
            FoulsCommitted: sumPer90(p => p.fouls?.committed),
            FoulsDrawn: sumPer90(p => p.fouls?.drawn),
            Tackles: sumPer90(p => p.tackles?.total),
            Blocks: sumPer90(p => p.tackles?.blocks),
            Interceptions: sumPer90(p => p.tackles?.interceptions),
            Rating: playersWithMinutes.reduce(
                (sum, p) => sum + (parseFloat(p.games?.rating) || 0),
                0
            ) / numPlayersWithMinutes
        };

        Object.keys(fieldValues).forEach(key => {
            fieldValues[key] = Number(fieldValues[key].toFixed(2));
        });
    }

    const fields = Object.keys(fieldValues).map(key => ({
        label: key.replace(/([a-z])([A-Z])/g, '$1 $2'),
        value: fieldValues[key],
    }));

    const firstSeasonChangeRef = useRef(true);

    useEffect(() => {
        if (playerStats.length === 0) return;

        const timeout = setTimeout(() => {
            fields.forEach(f => {
                prevValuesRef.current[f.label] = f.value;
            });
            // After first season change, allow normal animation
            firstSeasonChangeRef.current = false;
        }, 500);

        return () => clearTimeout(timeout);
    }, [fields, playerStats]);

    const skipAnimation = playerStats.length === 0 || firstSeasonChangeRef.current;

    return (
        <Box sx={theme => ({
            backgroundColor: theme.palette.background.default,
            height: "100%",
            border: theme.palette.mode === "dark" ? DARKMODE_GRID_BORDER : LIGHTMODE_GRID_BORDER,
            borderRadius: 1,
        })}>
            <Box sx={{ maxWidth: 1000, mx: "auto", mb: 2 }}>
                <Box sx={{ position: 'relative', mb: 3, mt: 1, width: '100%', textAlign: 'center' }}>
                    <Typography variant="h5" sx={{ display: 'inline-flex', alignItems: 'center' }}>
                        Potential Lineup Performance
                        (<Box component="span" sx={{ fontStyle: "italic", fontSize: 20 }}>per 90 mins</Box>)
                    </Typography>
                    <Box sx={{ position: 'absolute', left: "80%", top: 5 }}>
                        <LineupBuilderSeasonDropdown
                            selectedSeason={selectedSeason}
                            handleSeasonChange={handleSeasonChange}
                        />
                    </Box>
                </Box>
                <Grid container spacing={5} wrap="wrap">
                    {fields.map((field, i) => {
                        const prevValue = prevValuesRef.current[field.label];
                        let sx = { fontSize: 15 };

                        if (!skipAnimation && prevValue !== undefined) {
                            if (field.value > prevValue) sx.animation = `${flashGreen} 5s linear`;
                            else if (field.value < prevValue) sx.animation = `${flashRed} 5s linear`;
                        }

                        return (
                            <Grid key={i}>
                                <Box sx={{
                                    width: 220,
                                    border: "1px solid gray",
                                    borderRadius: 1,
                                    px: 1.5,
                                    py: 1,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    bgcolor: "background.paper",
                                }}>
                                    <Typography variant="body2" sx={{ fontSize: 16 }}>
                                        {field.label}:
                                    </Typography>
                                    <Typography variant="body2" sx={sx}>{field.value}</Typography>
                                </Box>
                            </Grid>
                        );
                    })}
                </Grid>
            </Box>
        </Box>
    );
}