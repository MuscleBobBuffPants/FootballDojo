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
            const existingIndex = state.playerStats.findIndex(p => p.slotId === slotId);

            const entry = { slotId, id: player.id, ...player };

            if (existingIndex !== -1) {
                state.playerStats[existingIndex] = entry;
            } else {
                state.playerStats.push(entry);
            }
        },
        clearPerformancePredictionData(state) {
            state.playerStats = [];
        }
    }
});

export const { setPlayerStatsForLineup, clearPerformancePredictionData } = selectedPlayers.actions;
export default selectedPlayers.reducer;
