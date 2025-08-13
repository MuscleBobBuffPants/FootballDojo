import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../services/api';

export const fetchTeamByName = createAsyncThunk(
    'teams/fetchTeamByName',
    async ({ country, teamName }, thunkAPI) => {
        try {
            const response = await api.get(`teams/country=${country}/teamName=${teamName}`);
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

const teamByName = createSlice({
    name: 'teamByName',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTeamByName.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchTeamByName.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.list = action.payload;
            })
            .addCase(fetchTeamByName.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Something went wrong';
            });
    },
});

export default teamByName.reducer;