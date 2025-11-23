// Acá vamos a almacenar nuestro gran estado global y nos ahorra toda la parte de middleware
import { configureStore } from "@reduxjs/toolkit";
// importa el reducer de Post (no tenemos posts o publicaciones, es a modo de ejemplo)
import postReducer from "./postSlice";
import productReducer from "./productSlice";
import authReducer from "./authSlice";
import categoryReducer from "./categorySlice";
import adminReducer from "./adminSlice";
import orderReducer from "./orderSlice";
import fileReducer from "./fileSlice";

export const store = configureStore({
    reducer: {
        posts: postReducer,
        products: productReducer,
        auth: authReducer,
        categories: categoryReducer,
        admin: adminReducer,
        orders: orderReducer,
        files: fileReducer
    }
})