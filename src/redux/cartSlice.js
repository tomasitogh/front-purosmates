import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import toast from 'react-hot-toast';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1';

// Helper to get initial state from localStorage
const getInitialCart = () => {
  try {
    return JSON.parse(localStorage.getItem("cart_items") || "[]");
  } catch {
    return [];
  }
};

const initialState = {
  items: getInitialCart(),
  open: false,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null
};

// Async Thunk for adding items
export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async (product, { getState, rejectWithValue }) => {
    // Verificar si el producto tiene stock (general)
    if (!product.stock || product.stock <= 0) {
      toast.error('Este producto no tiene stock disponible');
      return rejectWithValue('No stock available');
    }

    const { cart } = getState();
    const existingItem = cart.items.find(p => p.id === product.id);

    if (existingItem) {
      // Verificar que no se exceda el stock disponible
      if (existingItem.qty >= product.stock) {
        toast.error(`Solo hay ${product.stock} unidades disponibles de este producto`);
        return rejectWithValue('Stock limit reached');
      }
    }

    // Si pasa las validaciones, retornamos el producto para que el reducer lo agregue
    return product;
  }
);

// Async Thunk for creating order
export const createOrder = createAsyncThunk(
  'cart/createOrder',
  async ({ items, token }, { rejectWithValue }) => {
    try {
      // Formatear items para el backend: [{ productId: 1, quantity: 2 }, ...]
      const orderItems = items.map(item => ({
        productId: item.id,
        quantity: item.qty
      }));

      const response = await axios.post(`${API_URL}/orders`, orderItems, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data; // Retorna el OrderResponseDTO con el ID
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

// Async Thunk for creating MP Preference
export const createPreference = createAsyncThunk(
  'cart/createPreference',
  async ({ orderId, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/mp/create_preference/${orderId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data; // Retorna el Preference ID (String)
    } catch (error) {
       if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartOpen: (state, action) => {
      state.open = action.payload;
    },
    // addItem se elimina o se mantiene privado si se usa solo internamente, 
    // pero con createAsyncThunk la lógica pasa a extraReducers.
    decrementItem: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      
      if (existingItem) {
        if (existingItem.qty > 1) {
          existingItem.qty -= 1;
        } else {
          state.items = state.items.filter(item => item.id !== id);
        }
      }
    },
    removeItem: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter(item => item.id !== id);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.fulfilled, (state, action) => {
        const product = action.payload;
        const existingItem = state.items.find(item => item.id === product.id);
        
        if (existingItem) {
          existingItem.qty += 1;
        } else {
          state.items.push({ ...product, qty: 1 });
        }
        state.status = 'succeeded';
        // toast.success('Producto agregado'); // Opcional, si queremos feedback positivo
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Create Order
      .addCase(createOrder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createOrder.fulfilled, (state) => {
        state.status = 'succeeded';
        state.items = []; // Vaciar carrito al comprar
        localStorage.removeItem('cart_items');
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Create Preference (Mercado Pago)
      .addCase(createPreference.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createPreference.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // No limpiamos el carrito aquí, se limpia al volver de MP o al crear la orden si fuera efectivo
      })
      .addCase(createPreference.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export const { setCartOpen, decrementItem, removeItem, clearCart } = cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectCartOpen = (state) => state.cart.open;
export const selectCartTotalQty = (state) => state.cart.items.reduce((acc, item) => acc + item.qty, 0);
export const selectCartSubtotal = (state) => state.cart.items.reduce((acc, item) => acc + (item.price || 0) * item.qty, 0);

export const selectHasComboDiscount = (state) => {
  const items = state.cart.items;
  const categories = new Set(items.map(item => item.category?.description || item.category));
  return categories.has('mates') && categories.has('bombillas') && categories.has('accesorios');
};

export const selectCartDiscount = (state) => {
  const hasCombo = selectHasComboDiscount(state);
  const subtotal = selectCartSubtotal(state);
  return hasCombo ? subtotal * 0.10 : 0;
};

export const selectCartTotalPrice = (state) => {
  const subtotal = selectCartSubtotal(state);
  const discount = selectCartDiscount(state);
  return subtotal - discount;
};

export default cartSlice.reducer;

