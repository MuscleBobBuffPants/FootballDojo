import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../services/api';

export const fetchRecentFormByTeamId = createAsyncThunk(
    'fixtures/fetchRecentFormByTeamId',
    async ({ leagueId, teamId }, thunkAPI) => {
        try {
            const response = await api.get(`fixtures/leagueId=${leagueId}/teamId=${teamId}`);
            return { teamId, data: response.data };
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    });

const initialState = {
    byTeamId: {},
    status: {},
    error: {},
};

const recentFormByTeamId = createSlice({
    name: 'recentFormByTeamId',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRecentFormByTeamId.pending, (state, action) => {
                const { teamId } = action.meta.arg;
                state.status[teamId] = 'loading';
                state.error[teamId] = null;
            })
            .addCase(fetchRecentFormByTeamId.fulfilled, (state, action) => {
                const { teamId, data } = action.payload;
                state.status[teamId] = 'succeeded';
                state.byTeamId[teamId] = data;
            })
            .addCase(fetchRecentFormByTeamId.rejected, (state, action) => {
                const { teamId } = action.meta.arg;
                state.status[teamId] = 'failed';
                state.error[teamId] = action.payload?.error || action.error.message;
            });
    },
});

export default recentFormByTeamId.reducer;