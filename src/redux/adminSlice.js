// Redux Toolkit slice para manejar operaciones de administración de productos
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL ? `${import.meta.env.VITE_API_BASE_URL}/products` : 'http://localhost:8080/products';
const ORDERS_API_URL = import.meta.env.VITE_API_BASE_URL ? `${import.meta.env.VITE_API_BASE_URL}/api/v1/orders` : 'http://localhost:8080/api/v1/orders';

// Thunk para obtener todos los pedidos (admin)
export const fetchAllOrders = createAsyncThunk('admin/fetchAllOrders', async (token) => {
    const { data } = await axios.get(ORDERS_API_URL, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return data;
});

// Thunk para actualizar un pedido (admin)
export const updateOrder = createAsyncThunk('admin/updateOrder', async ({ orderId, status, total, token }) => {
    const { data } = await axios.put(`${ORDERS_API_URL}/${orderId}`, { status, total }, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
    return data;
});



// Thunk para eliminar un pedido (admin)
export const deleteOrder = createAsyncThunk('admin/deleteOrder', async ({ orderId, token }) => {
    await axios.delete(`${ORDERS_API_URL}/${orderId}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
    return orderId;
});

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
        orders: [],
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
            })
            // Fetch Orders
            .addCase(fetchAllOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
            })
            .addCase(fetchAllOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Update Order
            .addCase(updateOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(updateOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.successMessage = 'Pedido actualizado exitosamente';
                // Actualizar el pedido en la lista local
                const index = state.orders.findIndex(o => o.id === action.payload.id);
                if (index !== -1) {
                    state.orders[index] = action.payload;
                }
            })
            .addCase(updateOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                state.loading = false;
                state.error = action.error.message;
            })
            // Delete Order
            .addCase(deleteOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(deleteOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.successMessage = 'Pedido eliminado exitosamente';
                state.orders = state.orders.filter(order => order.id !== action.payload);
            })
            .addCase(deleteOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export const { clearAdminMessages } = adminSlice.actions;
export default adminSlice.reducer;
