// Redux Toolkit slice para manejar órdenes
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

// Thunk para crear una orden
export const createOrder = createAsyncThunk('orders/createOrder', async ({ orderItems, token }) => {
    const { data } = await axios.post(`${API_URL}/orders`, orderItems, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
    return data;
});

const orderSlice = createSlice({
    name: "orders",
    initialState: {
        currentOrder: null,
        loading: false,
        error: null,
        success: false
    },
    reducers: {
        clearOrderState: (state) => {
            state.currentOrder = null;
            state.error = null;
            state.success = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.currentOrder = action.payload;
                state.success = true;
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                state.success = false;
            });
    }
});

export const { clearOrderState } = orderSlice.actions;
export default orderSlice.reducer;
