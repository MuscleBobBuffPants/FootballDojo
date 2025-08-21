import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

export default function PerformancePredictor() {
    const { selectedPlayerIds, playerStats } = useSelector(state => state.selectedPlayers);

    let fieldValues = {
        Shots: 0,
        Goals: 0,
        Passes: 0,
        Assists: 0,
        Dribbles: 0,
        Tackles: 0,
        Fouls: 0,
        Rating: 0,
    };

    if (playerStats.length > 0) {
        const numPlayers = Object.values(selectedPlayerIds).filter(Boolean).length || 1;

        const per90 = (stat, minutes) => (minutes > 0 ? (stat / minutes) * 90 : 0);

        // Helper: sum a per-90 stat across all players
        const sumPer90 = (getValue) =>
            playerStats.reduce(
                (sum, p) => sum + per90(getValue(p) ?? 0, p.games?.minutes ?? 0),
                0
            );

        fieldValues = {
            Shots: sumPer90(p => p.shots?.total),
            Goals: sumPer90(p => p.goals?.total),
            Passes: sumPer90(p => p.passes?.total),
            Assists: sumPer90(p => p.goals?.assists),
            Dribbles: sumPer90(p => p.dribbles?.success),
            Tackles: sumPer90(p => p.tackles?.total),
            Fouls: sumPer90(p => p.fouls?.committed),

            // Rating = average instead of sum
            Rating:
                playerStats.reduce(
                    (sum, p) => sum + (parseFloat(p.games?.rating) || 0),
                    0
                ) / numPlayers,
        };

        // Round all stats to 2 decimals
        Object.keys(fieldValues).forEach(key => {
            fieldValues[key] = Number(fieldValues[key].toFixed(2));
        });
    }

    const fields = Object.keys(fieldValues).map(key => ({
        label: key,
        value: fieldValues[key],
    }));

    return (
        <Box sx={{ maxWidth: 800, mx: "auto" }}>
            <Typography variant="h5" align="center" sx={{ mb: 5 }}>
                Potential Lineup Performance (<Box component="span" sx={{ fontStyle: "italic", fontSize: 20 }}>per 90 mins</Box>)
            </Typography>
            <Grid container spacing={3} wrap="wrap">
                {fields.map((field, i) => (
                    <Grid key={i}>
                        <Box
                            sx={{
                                width: 180,
                                border: "1px solid gray",
                                borderRadius: 1,
                                px: 1.5,
                                py: 1,
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                bgcolor: "background.paper",
                            }}
                        >
                            <Typography variant="body2" sx={{ fontSize: 18 }}>
                                {field.label}:
                            </Typography>
                            <Typography variant="body2" sx={{ fontSize: 17 }}>
                                {field.value}
                            </Typography>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}