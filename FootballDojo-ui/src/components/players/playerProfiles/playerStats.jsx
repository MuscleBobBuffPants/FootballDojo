import { Box, Typography, useTheme } from "@mui/material";
import React, { useMemo } from 'react';

const STAT_LABELS = {
    appearences: "Apps",
    minutes: "Mins.",
    on: "On Target",
    lineups: "Starts",
    interceptions: "Steals",
    in: "Came On",
    out: "Left"
};

const formatLabel = (propName) =>
    STAT_LABELS[propName] || propName.charAt(0).toUpperCase() + propName.slice(1);

function StatsList({ selectedLeague, selectedPlayer, selectedSeason, playerStatsBySeason }) {
    const theme = useTheme();

    const categories = useMemo(
        () => (playerStatsBySeason?.[0] ? Object.entries(playerStatsBySeason[0]) : []),
        [playerStatsBySeason]
    );

    // Transform stats per category and filter out empty stats
    const transformedStats = categories.map(([categoryName, properties]) => {
        const excludedPropsByCategory = {
            goals: selectedPlayer.position === "Goalkeeper"
                ? ["total", "assists"]
                : ["conceded", "saves"],
            cards: ["yellowRed"],
            penalty: selectedPlayer.position === "Goalkeeper"
                ? ["scored", "missed"]
                : ["saved"]
        };

        // Only keep valid, non-zero, non-null props
        const validProps = Object.entries(properties).filter(
            ([propName, value]) =>
                value !== null &&
                value !== undefined &&
                value !== 0 &&
                !((excludedPropsByCategory[categoryName] || []).includes(propName))
        );

        const stats = validProps.map(([propName, value]) => {
            let displayValue = value;
            if (propName === "rating") displayValue = parseFloat(value).toFixed(2);
            if (propName === "minutes") displayValue = value.toLocaleString();
            return { label: formatLabel(propName), value: displayValue };
        });

        return { category: categoryName, stats };
    }).filter(cat => cat.stats.length > 0); // Remove categories with no stats

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                p: 2,
                maxHeight: 323,
                minWidth: 175,
                boxSizing: 'border-box',
                overflowY: "auto",
                border: `2px solid ${theme.palette.divider}`,
                borderRadius: 1,
                bgcolor: theme.palette.mode === "dark"
                    ? theme.palette.background.default
                    : theme.palette.background.paper
            }}
        >
            {categories.length === 0 ? (
                <Box
                    sx={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ textAlign: 'center' }}
                    >
                        Loading stats...
                    </Typography>
                </Box>
            ) : transformedStats.length === 0 ? (
                <Box
                    sx={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ textAlign: 'center' }}
                    >
                        No {selectedLeague.name} <br /> Stats ({selectedSeason})...
                    </Typography>
                </Box>
            ) : (transformedStats.map((category, idx) => (
                <Box
                    key={idx}
                    sx={{
                        borderTop: idx === 0 ? "none" : `1px solid ${theme.palette.divider}`,
                        pt: idx === 0 ? 0 : 1,
                        minWidth: 0,
                        width: '100%',
                        boxSizing: 'border-box',
                    }}
                >
                    <Typography
                        variant="body2"
                        sx={{ fontWeight: "bold", color: theme.palette.text.secondary, mb: 1 }}
                    >
                        {category.category.charAt(0).toUpperCase() + category.category.slice(1)}
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                        {category.stats.map((stat, sIdx) => (
                            <Box
                                key={sIdx}
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    minWidth: 0
                                }}
                            >
                                <Typography
                                    variant="body2"
                                    sx={{ color: theme.palette.text.primary, minWidth: 0 }}
                                >
                                    {stat.label}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{ fontWeight: "bold", color: theme.palette.text.primary, minWidth: 0 }}
                                >
                                    {stat.value}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </Box>
            ))
            )}
        </Box>
    );
}

export default StatsList;
