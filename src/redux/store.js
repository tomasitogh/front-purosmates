import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import authReducer from "./authSlice";
import categoryReducer from "./categorySlice";
import adminReducer from "./adminSlice";
import orderReducer from "./orderSlice";
import fileReducer from "./fileSlice";
import cartReducer from "./cartSlice";

export const store = configureStore({
    reducer: {
        products: productReducer,
        auth: authReducer,
        categories: categoryReducer,
        admin: adminReducer,
        orders: orderReducer,
        files: fileReducer,
        cart: cartReducer
    }
});

// Subscribe to store updates to persist cart items
store.subscribe(() => {
    const state = store.getState();
    localStorage.setItem('cart_items', JSON.stringify(state.cart.items));
});