import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../services/api';

export const fetchPlayerStatsBySeason = createAsyncThunk(
    'stats/fetchPlayerStatsBySeason',
    async ({ playerId, leagueId, seasonYear }, thunkAPI) => {
        try {
            const response = await api.get(`stats/playerId=${playerId}/leagueId=${leagueId}/seasonYear=${seasonYear}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    });

const initialState = {
    list: [],
    status: 'idle',
    error: null,
};

const playerStatsBySeason = createSlice({
    name: 'playerStatsBySeason',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPlayerStatsBySeason.pending, (state) => {
                state.status = 'loading';
                state.error = null;
                state.list = [];
            })
            .addCase(fetchPlayerStatsBySeason.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.list = action.payload;
            })
            .addCase(fetchPlayerStatsBySeason.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Something went wrong';
            });
    },
});

export default playerStatsBySeason.reducer;