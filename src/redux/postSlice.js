// Va a administrar todas los productos de nuestra API y guardarlas en nuestro estado global
// Ahora todas nuestras llamadas a la API van a pasar a estar adentro de Redux

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Ejemplo de uso de Redux por la profesora con Posts (usamos el link de products y debería estar implementado con productos, 
// no con posteos, pero fue el ejemplo que dió la profesora)

const API_URL = 'http://localhost:8080/products';

export const fetchPosts = createAsyncThunk('post/fetchPosts', async() => {
    const {data} = await axios.get(API_URL)
    return data
})

const postSlice = createSlice({
    name : "posts",
    initialState: {
        items: [],
        loading: false,
        error: null
    },
    reducers:{},
    extraReducers: (builder)=> {
        builder
        .addCase(fetchPosts.pending, (state)=> {
            state.loading = true
            state.error = null
        })
        .addCase(fetchPosts.fulfilled, (state, action)=>{
            state.loading = false
            state.items = action.payload
        })
        .addCase(fetchPosts.rejected, (state, action)=> {
            state.loading = false
            state.error = action.error.message
        })
    }
})

export default postSlice.reducer

// Lo que sigue es reemplazar las llamadas anteriores que teníamos a la API
// Para usar, vamos a hacer un hook en el componente que hacía la llamada

/** Archivo PostList.jsx
 * import {useDispatch} from 'react-redux'
 * const PostList = () => {
 *      const dispatch = useDispatch();
 *      const {items, error, loading} = useSelector((state)=> state.posts)
 *      useEffect (()=> {
 *          dispatch(fetchPosts())
 *      }, [dispatch])
 * 
 * if (loading) retrun <p>Cargando publicaciones...</p>
 * if (error) return <p>Error al cargar las publicaciones: {error}</p>
 * }
 * Este ejemplo etá pensado para una app muy chiquita de unas publicaciones, en nuestro caso tendríamos que abarcar muhco más
 * 
 * 
 * 
 * 
 * 
 */