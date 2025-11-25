// Redux Toolkit slice para manejar productos siguiendo el patrón de la profesora
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = 'http://localhost:8080/products';

// Thunk para obtener productos activos (para clientes)
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const { data } = await axios.get(API_URL);
    return data;
});

// Thunk para obtener TODOS los productos (activos e inactivos - solo admin)
export const fetchAllProductsAdmin = createAsyncThunk('products/fetchAllProductsAdmin', async (token) => {
    const { data } = await axios.get(`${API_URL}/admin/all`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return data;
});

const productSlice = createSlice({
    name: "products",
    initialState: {
        items: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // fetchProducts (solo activos)
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // fetchAllProductsAdmin (todos, activos e inactivos)
            .addCase(fetchAllProductsAdmin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllProductsAdmin.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchAllProductsAdmin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export default productSlice.reducer;
