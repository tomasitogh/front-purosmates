// Redux Toolkit slice para manejar categorías
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = 'http://localhost:8080/categories';

// Thunk para obtener todas las categorías
export const fetchCategories = createAsyncThunk('categories/fetchCategories', async (token) => {
    const config = token ? {
        headers: { 'Authorization': `Bearer ${token}` }
    } : {};
    const { data } = await axios.get(API_URL, config);
    return data.content || data;
});

const categorySlice = createSlice({
    name: "categories",
    initialState: {
        items: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export default categorySlice.reducer;
