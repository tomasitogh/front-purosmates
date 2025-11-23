// Redux Toolkit slice para manejar autenticación
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = 'http://localhost:8080/api/v1/auth';

// Thunk para login
export const loginUser = createAsyncThunk('auth/login', async ({ email, password }) => {
    const { data } = await axios.post(`${API_URL}/authenticate`, { email, password });
    const accessToken = data.access_token;
    
    // Decodificar el token JWT para obtener el rol
    const tokenPayload = JSON.parse(atob(accessToken.split('.')[1]));
    
    const userData = {
        email: tokenPayload.sub,
        role: tokenPayload.role || tokenPayload.authorities?.[0]?.replace('ROLE_', '') || 'USER',
        token: accessToken
    };

    return userData;
});

// Thunk para registro
export const registerUser = createAsyncThunk('auth/register', async ({ firstname, lastname, email, password }) => {
    const { data } = await axios.post(`${API_URL}/register`, {
        firstname,
        lastname,
        email,
        password,
        role: 'USER'
    });
    return data;
});

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        token: null,
        loading: false,
        error: null
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.error = null;
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('authToken');
        },
        setAuthFromStorage: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        }
    },
    extraReducers: (builder) => {
        builder
            // Login
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = {
                    email: action.payload.email,
                    role: action.payload.role
                };
                state.token = action.payload.token;
                // Guardar en localStorage
                localStorage.setItem('token', action.payload.token);
                localStorage.setItem('user', JSON.stringify(state.user));
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Register
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export const { logout, setAuthFromStorage } = authSlice.actions;
export default authSlice.reducer;
