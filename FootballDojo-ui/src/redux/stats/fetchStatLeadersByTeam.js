import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../services/api';

export const fetchStatLeadersByTeam = createAsyncThunk(
    'stats/fetchStatLeadersByTeam',
    async ({ leagueId, teamId, season }, thunkAPI) => {
        try {
            const response = await api.get(`stats/leagueId=${leagueId}/teamId=${teamId}/season=${season}`);
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

const statLeadersByTeam = createSlice({
    name: 'statLeadersByTeam',
    initialState,
    reducers: {
        clearStatLeaderData(state) {
            state.list = [];
        }
},
    extraReducers: (builder) => {
        builder
            .addCase(fetchStatLeadersByTeam.pending, (state) => {
                state.status = 'loading';
                state.error = null;
                state.list = [];
            })
            .addCase(fetchStatLeadersByTeam.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.list = action.payload;
            })
            .addCase(fetchStatLeadersByTeam.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Something went wrong';
            });
    },
});

export const { clearStatLeaderData } = statLeadersByTeam.actions;
export default statLeadersByTeam.reducer;