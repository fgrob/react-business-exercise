import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getSalesData } from "../services/getData";

export const fetchSales = createAsyncThunk(
    'sales/fetchSales',
    async () => {
        const salesData = await getSalesData();
        return salesData;
    }
);

export const salesSlice = createSlice({
    name: 'sales',
    initialState: {
        salesData: [],
        isLoading: false,
        error: null,
    },
    reducers: {
        clearSalesData: (state) => {
            state.salesData = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSales.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchSales.fulfilled, (state, action) => {
                state.isLoading = false;
                state.salesData = action.payload;
            })
            .addCase(fetchSales.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },
});

export const { clearSalesData } = salesSlice.actions;
export default salesSlice.reducer;
