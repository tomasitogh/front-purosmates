// Redux Toolkit slice para manejar operaciones de administración de productos
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = 'http://localhost:8080/products';

// Thunk para crear un producto
export const createProduct = createAsyncThunk('admin/createProduct', async ({ productData, token }) => {
    const { data } = await axios.post(API_URL, productData, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
    return data;
});

// Thunk para actualizar un producto
export const updateProduct = createAsyncThunk('admin/updateProduct', async ({ productId, productData, token }) => {
    const { data } = await axios.put(`${API_URL}/${productId}`, productData, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
    return data;
});

// Thunk para eliminar un producto
export const deleteProduct = createAsyncThunk('admin/deleteProduct', async ({ productId, token }) => {
    await axios.delete(`${API_URL}/${productId}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
    return productId;
});

const adminSlice = createSlice({
    name: "admin",
    initialState: {
        loading: false,
        error: null,
        successMessage: null
    },
    reducers: {
        clearAdminMessages: (state) => {
            state.error = null;
            state.successMessage = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Create Product
            .addCase(createProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.successMessage = 'Producto creado exitosamente';
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Update Product
            .addCase(updateProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.successMessage = 'Producto actualizado exitosamente';
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Delete Product
            .addCase(deleteProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.successMessage = 'Producto eliminado exitosamente';
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export const { clearAdminMessages } = adminSlice.actions;
export default adminSlice.reducer;
