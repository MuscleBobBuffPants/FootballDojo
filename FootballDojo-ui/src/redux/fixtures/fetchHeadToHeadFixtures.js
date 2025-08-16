import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../services/api';

export const fetchHeadToHeadFixtures = createAsyncThunk(
    'fixtures/fetchHeadToHeadFixtures',
    async ({ homeTeamId, awayTeamId }, thunkAPI) => {
        try {
            const response = await api.get(`fixtures/homeTeamId=${homeTeamId}/awayTeamId=${awayTeamId}`);
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

const headToHeadFixtures = createSlice({
    name: 'headToHeadFixtures',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchHeadToHeadFixtures.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchHeadToHeadFixtures.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.list = action.payload;
            })
            .addCase(fetchHeadToHeadFixtures.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Something went wrong';
            });
    },
});

export default headToHeadFixtures.reducer;