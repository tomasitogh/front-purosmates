// Acá vamos a almacenar nuestro gran estado global y nos ahorra toda la parte de middleware
import { configureStore } from "@reduxjs/toolkit";
// importa el reducer de Post (no tenemos posts o publicaciones, es a modo de ejemplo)
import postReducer from "./postSlice";

export const store = configureStore({
    reducer: {posts: postReducer}
})