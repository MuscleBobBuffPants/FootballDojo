import { Box, Skeleton, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";
import ErrorState from "./ErrorState";
import { listVariants } from "./motionVariants";

function DefaultSkeletonRow({ index }) {
    return (
        <Stack direction="row" alignItems="center" spacing={1.5} sx={{ px: 1.5, py: 1.1 }}>
            <Skeleton variant="circular" width={28} height={28} />
            <Skeleton variant="text" width={`${55 - index * 4}%`} height={20} sx={{ flexShrink: 0 }} />
            <Box sx={{ flex: 1 }} />
            <Skeleton variant="rounded" width={36} height={20} />
        </Stack>
    );
}

/**
 * Shared "titled card" chrome for the standings / roster / fixtures panels:
 * header with optional control (e.g. a season dropdown), a scrollable body,
 * skeleton loading state, and an empty-state message.
 */
export default function PanelCard({
    title,
    control,
    loading = false,
    error = null,
    onRetry,
    isEmpty = false,
    emptyMessage,
    skeletonRows = 5,
    maxHeight = 340,
    children,
}) {
    return (
        <Box
            component={motion.div}
            layout
            sx={(theme) => ({
                borderRadius: 3,
                border: `1px solid ${theme.palette.divider}`,
                bgcolor: theme.palette.background.paper,
                boxShadow:
                    theme.palette.mode === "dark"
                        ? "0 12px 32px -18px rgba(0,0,0,0.6)"
                        : "0 12px 28px -20px rgba(15,23,32,0.25)",
                overflow: "hidden",
                width: "100%",
            })}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 1,
                    px: 2,
                    py: 1.5,
                }}
            >
                <Typography variant="h6" sx={{ fontSize: 17 }}>
                    {title || " "}
                </Typography>
                {control}
            </Box>

            <Box sx={{ maxHeight, overflowY: "auto" }}>
                {loading ? (
                    <Stack divider={<Box sx={(theme) => ({ borderTop: `1px solid ${theme.palette.divider}` })} />}>
                        {Array.from({ length: skeletonRows }).map((_, i) => (
                            <DefaultSkeletonRow key={i} index={i} />
                        ))}
                    </Stack>
                ) : error ? (
                    <ErrorState message={error} onRetry={onRetry} />
                ) : isEmpty ? (
                    <Box sx={{ p: 3, textAlign: "center" }}>
                        <Typography variant="body2" color="text.secondary">
                            {emptyMessage}
                        </Typography>
                    </Box>
                ) : (
                    <Box
                        component={motion.div}
                        variants={listVariants}
                        initial="hidden"
                        animate="show"
                    >
                        {children}
                    </Box>
                )}
            </Box>
        </Box>
    );
}
