import { createSlice } from "@reduxjs/toolkit";
import { isNonEmptyObject } from "../../global/constants";

const initialState = {
    selectedPlayerIds: {}, // { slotId: playerId }
    playerStats: [],       // [{ playerId, stats }]
};

const selectedPlayersSlice = createSlice({
    name: "selectedPlayers",
    initialState,
    reducers: {
        assignPlayer(state, action) {
            const { slotId, player } = action.payload; // player = { id, name, stats }

            const oldPlayerId = state.selectedPlayerIds[slotId];
            state.selectedPlayerIds[slotId] = player?.id ?? null;

            // Remove old player stats if replaced
            state.playerStats = state.playerStats.filter(p => p.playerId !== oldPlayerId);

            // Remove duplicate if player is already in another slot
            state.playerStats = state.playerStats.filter(p => p.playerId !== player?.id);

            // Add new player stats
            if (isNonEmptyObject(player.stats)) state.playerStats.push({ playerId: player.id, ...player.stats.payload[0] });
        },
        clearPerformancePredictionData(state) {
            state.selectedPlayerIds = {};
            state.playerStats = [];
        }
    }
});

export const { assignPlayer, clearPerformancePredictionData } = selectedPlayersSlice.actions;
export default selectedPlayersSlice.reducer;
