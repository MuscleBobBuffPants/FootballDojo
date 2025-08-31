import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchLineupByFixtureIdAndTeamId } from '../lineups/fetchLineupByFixtureIdAndTeamId';
import { api } from '../../services/api';

export const fetchLastCompletedFixtureId = createAsyncThunk(
    'fixtures/fetchLastCompletedFixtureId',
    async ({ leagueId, season, teamId }, thunkAPI) => {
        try {
            const response = await api.get(`fixtures/lastFixture/leagueId=${leagueId}/season=${season}/teamId=${teamId}`);
            const id = response.data;

            // Dispatch lineup fetch immediately
            thunkAPI.dispatch(fetchLineupByFixtureIdAndTeamId({ fixtureId: id, teamId }));

        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    });

const initialState = {
    id: null,
    status: 'idle',
    error: null,
};

const lastCompletedFixtureId = createSlice({
    name: 'lastCompletedFixtureId',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchLastCompletedFixtureId.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchLastCompletedFixtureId.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.list = action.payload;
            })
            .addCase(fetchLastCompletedFixtureId.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Something went wrong';
            });
    },
});

export default lastCompletedFixtureId.reducer;