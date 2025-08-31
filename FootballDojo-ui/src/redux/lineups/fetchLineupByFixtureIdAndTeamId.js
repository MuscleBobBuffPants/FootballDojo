import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../services/api';

export const fetchLineupByFixtureIdAndTeamId = createAsyncThunk(
    'fixtures/fetchLineupByFixtureIdAndTeamId',
    async ({ fixtureId, teamId }, thunkAPI) => {
        try {
            const response = await api.get(`fixtures/fixtureId=${fixtureId}/teamId=${teamId}`);
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

const lineupByFixtureIdAndTeamId = createSlice({
    name: 'lineupByFixtureIdAndTeamId',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchLineupByFixtureIdAndTeamId.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchLineupByFixtureIdAndTeamId.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.list = action.payload;
            })
            .addCase(fetchLineupByFixtureIdAndTeamId.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Something went wrong';
            });
    },
});

export default lineupByFixtureIdAndTeamId.reducer;