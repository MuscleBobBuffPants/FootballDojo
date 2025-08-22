import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../services/api';

export const fetchVenueByVenueId = createAsyncThunk(
    'venues/fetchVenueByVenueId',
    async ({ venueId }, thunkAPI) => {
        try {
            const response = await api.get(`venues/venueId=${venueId}`);
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

const venueByVenueId = createSlice({
    name: 'venueByVenueId',
    initialState,
    reducers: {
        clearVenue: (state) => {
            state.list = [];
            state.status = 'idle';
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchVenueByVenueId.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchVenueByVenueId.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.list = action.payload;
            })
            .addCase(fetchVenueByVenueId.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Something went wrong';
            });
    },
});

export const { clearVenue } = venueByVenueId.actions;

export default venueByVenueId.reducer;