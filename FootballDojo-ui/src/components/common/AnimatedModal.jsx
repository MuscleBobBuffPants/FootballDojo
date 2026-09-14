import { Box, Modal } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

const contentVariants = {
    hidden: { opacity: 0, scale: 0.94, y: 12 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.22, ease: "easeOut" } },
    exit: { opacity: 0, scale: 0.96, y: 8, transition: { duration: 0.16, ease: "easeIn" } },
};

/**
 * Wraps MUI's Modal (kept for backdrop / focus-trap / a11y) with a
 * Framer Motion scale+fade transition on the content. `open` gates whether
 * the Modal is rendered at all; AnimatePresence keeps it mounted just long
 * enough to play the exit animation before actually unmounting.
 *
 * Centering is done via flexbox (not a translate(-50%,-50%) transform) so it
 * doesn't fight with framer-motion's own transform-based scale/y animation.
 */
export default function AnimatedModal({ open, onClose, children, contentStyle }) {
    return (
        <AnimatePresence>
            {open && (
                <Modal open onClose={onClose} keepMounted>
                    <Box
                        sx={{
                            position: "fixed",
                            inset: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            p: 2,
                            outline: "none",
                        }}
                    >
                        <Box
                            component={motion.div}
                            variants={contentVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            sx={{ ...contentStyle }}
                        >
                            {children}
                        </Box>
                    </Box>
                </Modal>
            )}
        </AnimatePresence>
    );
}
