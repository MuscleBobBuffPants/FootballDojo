import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../services/api';

export const fetchFixturesByLeagueId = createAsyncThunk(
    'fixtures/fetchFixturesByLeagueId',
    async ({ leagueId, seasonYear, teamId }, thunkAPI) => {
        try {
            const response = await api.get(`fixtures/leagueId=${leagueId}/seasonYear=${seasonYear}/teamId=${teamId}`);
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

const fixturesByLeagueId = createSlice({
    name: 'fixturesByLeagueId',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFixturesByLeagueId.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchFixturesByLeagueId.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.list = action.payload;
            })
            .addCase(fetchFixturesByLeagueId.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Something went wrong';
            });
    },
});

export default fixturesByLeagueId.reducer;