import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../services/api';

export const fetchPlayerProfileByPlayerId = createAsyncThunk(
    'players/fetchPlayerProfileByPlayerId',
    async ({ playerId }, thunkAPI) => {
        try {
            const response = await api.get(`players/playerId=${playerId}`);
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

const playerProfileByPlayerId = createSlice({
    name: 'playerProfileByPlayerId',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPlayerProfileByPlayerId.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchPlayerProfileByPlayerId.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.list = action.payload;
            })
            .addCase(fetchPlayerProfileByPlayerId.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Something went wrong';
            });
    },
});

export default playerProfileByPlayerId.reducer;