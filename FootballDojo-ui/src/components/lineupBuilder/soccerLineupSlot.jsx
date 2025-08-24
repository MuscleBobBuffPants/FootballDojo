import { Avatar, Box, MenuItem, Select, Typography } from "@mui/material";
import React from "react";

const SoccerLineupSlot = React.memo(
    ({ slot, players, value, onChange }) => {
        const selectedPlayer = players.find((p) => p.id === value);

        return (
            <Box
                sx={{
                    position: "absolute",
                    top: slot.top,
                    left: slot.left,
                    transform: "translateX(-50%)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                {!selectedPlayer && (
                    <Typography
                        variant="caption"
                        sx={(theme) => ({
                            bgcolor: theme.palette.background.paper,
                            color: theme.palette.primary,
                            mb: 0.5,
                            px: 1,
                            py: 0.25,
                            borderRadius: 1,
                            boxShadow: 1,
                            display: "inline-block",
                        })}
                    >
                        {slot.label}
                    </Typography>
                )}
                {selectedPlayer?.photo && (
                    <Avatar
                        src={selectedPlayer.photo}
                        alt={selectedPlayer.name}
                        sx={{
                            width: 73,
                            height: 73,
                            mb: 0.5,
                            boxShadow: 2,
                        }}
                    />
                )}
                <Select
                    size="small"
                    displayEmpty
                    MenuProps={{
                        PaperProps: {
                            style: { maxHeight: 48 * 4 + 8 }, // 4 items
                        },
                    }}
                    value={value ?? ""}
                    onChange={(e) =>
                        onChange(slot.id, e.target.value ? e.target.value : null)
                    }
                    sx={(theme) => ({
                        bgcolor: theme.palette.background.paper,
                        color: theme.palette.primary,
                        borderRadius: 1,
                        textAlign: "center",
                        width: "auto",
                        minWidth: 80,
                        alignItems: "center",
                        mb: 0.75,
                    })}
                    renderValue={(selectedId) => {
                        const player = players.find((p) => p.id === selectedId);
                        return player?.name ?? <em>--</em>;
                    }}
                >
                    {players.map((p) => (
                        <MenuItem key={p.id} value={p.id}>
                            {p.name}
                        </MenuItem>
                    ))}
                </Select>
            </Box>
        );
    },
    (prev, next) => prev.value === next.value && prev.players === next.players
);

export default SoccerLineupSlot;
