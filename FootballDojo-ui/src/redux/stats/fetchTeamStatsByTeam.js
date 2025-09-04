import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../services/api';

export const fetchTeamStatsByTeam = createAsyncThunk(
    'stats/fetchTeamStatsByTeam',
    async ({ teamId, leagueId, season }, thunkAPI) => {
        try {
            const response = await api.get(`stats/teamId=${teamId}/leagueId=${leagueId}/season=${season}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    });

const initialState = {
    stats: {},
    status: 'idle',
    error: null,
};

const teamStatsByTeam = createSlice({
    name: 'teamStatsByTeam',
    initialState,
    reducers: {
        clearTeamStats: (state) => {
            state.stats = {};
            state.status = 'idle';
            state.error = null;
        }
},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTeamStatsByTeam.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchTeamStatsByTeam.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.stats = action.payload;
            })
            .addCase(fetchTeamStatsByTeam.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Something went wrong';
            });
    },
});

export const { clearTeamStats } = teamStatsByTeam.actions;

export default teamStatsByTeam.reducer;