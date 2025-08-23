import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    playerStats: {}, // [{ playerId, stats }]
};

const selectedPlayers = createSlice({
    name: "selectedPlayers",
    initialState,
    reducers: {
        setPlayerStatsForLineup(state, action) {
            const { slotId, player } = action.payload;

            // Remove any previous entry for this slot
            state.playerStats = state.playerStats.filter(p => p.slotId !== slotId && p.id !== player.id);

            // Add new entry
            state.playerStats.push({ slotId, id: player.id, ...player });
        },
        clearPerformancePredictionData(state) {
            state.playerStats = [];
        }
    }
});

export const { setPlayerStatsForLineup, clearPerformancePredictionData } = selectedPlayers.actions;
export default selectedPlayers.reducer;
