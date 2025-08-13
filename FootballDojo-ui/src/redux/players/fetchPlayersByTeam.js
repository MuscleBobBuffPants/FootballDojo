import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../services/api';

export const fetchPlayersByTeam = createAsyncThunk(
    'players/fetchPlayersByTeam',
    async ({ teamId }, thunkAPI) => {
        try {
            const response = await api.get(`players/teamId=${teamId}`);
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

const playersByTeam = createSlice({
    name: 'playersByTeam',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPlayersByTeam.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchPlayersByTeam.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.list = action.payload;
            })
            .addCase(fetchPlayersByTeam.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Something went wrong';
            });
    },
});

export default playersByTeam.reducer;