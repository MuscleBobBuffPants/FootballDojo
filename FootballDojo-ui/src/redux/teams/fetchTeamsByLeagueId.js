import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../services/api';

export const fetchTeamsByLeagueId = createAsyncThunk(
    'teams/fetchTeamByLeagueId',
    async ({ leagueId, seasonYear }, thunkAPI) => {
        try {
            const response = await api.get(`teams/leagueId=${leagueId}/seasonYear=${seasonYear}`);
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

const teamsByLeagueId = createSlice({
    name: 'teamsByLeagueId',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTeamsByLeagueId.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchTeamsByLeagueId.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.list = action.payload;
            })
            .addCase(fetchTeamsByLeagueId.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Something went wrong';
            });
    },
});

export default teamsByLeagueId.reducer;