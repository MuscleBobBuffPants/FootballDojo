// Shared motion variants for staggered row entrances — used by PanelCard's
// skeleton rows and by every grid that renders real rows inside a PanelCard.
export const listVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.045 } },
};

export const rowVariants = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { duration: 0.28, ease: "easeOut" } },
};
