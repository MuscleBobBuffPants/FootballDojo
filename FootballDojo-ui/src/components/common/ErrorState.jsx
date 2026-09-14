import { Box, Button, Typography } from "@mui/material";
import React from "react";

export default function ErrorState({ message, onRetry }) {
    return (
        <Box sx={{ p: 3, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 1.5 }}>
            <Typography variant="body2" color="text.secondary">
                {message || "Something went wrong."}
            </Typography>
            {onRetry && (
                <Button variant="outlined" size="small" onClick={onRetry}>
                    Retry
                </Button>
            )}
        </Box>
    );
}
