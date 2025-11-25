// Redux Toolkit slice para manejar subida de archivos
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = 'http://localhost:8080/files';

// Thunk para subir múltiples archivos
export const uploadFiles = createAsyncThunk('files/uploadMultiple', async ({ files, token }) => {
    const formData = new FormData();
    files.forEach(file => {
        formData.append('files', file);
    });

    const { data } = await axios.post(`${API_URL}/upload-multiple`, formData, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
    });

    // Convertir las URLs relativas a URLs absolutas
    const fileUrls = data.fileUrls.map(url => `http://localhost:8080${url}`);
    return fileUrls;
});

const fileSlice = createSlice({
    name: "files",
    initialState: {
        uploadedUrls: [],
        loading: false,
        error: null
    },
    reducers: {
        clearUploadedFiles: (state) => {
            state.uploadedUrls = [];
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(uploadFiles.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(uploadFiles.fulfilled, (state, action) => {
                state.loading = false;
                state.uploadedUrls = action.payload;
            })
            .addCase(uploadFiles.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export const { clearUploadedFiles } = fileSlice.actions;
export default fileSlice.reducer;
