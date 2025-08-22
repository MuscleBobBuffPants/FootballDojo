import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../services/api';

export const fetchStandingsByLeagueId = createAsyncThunk(
    'standings/fetchStandingsByLeagueId',
    async ({ leagueId, seasonYear }, thunkAPI) => {
        try {
            const response = await api.get(`standings/leagueId=${leagueId}/seasonYear=${seasonYear}`);
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

const standingsByLeagueId = createSlice({
    name: 'standingsByLeagueId',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchStandingsByLeagueId.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchStandingsByLeagueId.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.list = action.payload;
            })
            .addCase(fetchStandingsByLeagueId.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Something went wrong';
            });
    },
});

export default standingsByLeagueId.reducer;