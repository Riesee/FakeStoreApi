/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { CartItem, Product, ProductState } from '../../types/Product';

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async () => {
        const response = await axios.get<Product[]>('https://fakestoreapi.com/products');
        return response.data;
    }
);

export const fetchFilteredProducts = createAsyncThunk(
    'products/fetchFilteredProducts',
    async (filter: string) => {
        const response = await axios.get<Product[]>('https://fakestoreapi.com/products/category/' + filter);
        return response.data;
    }
);

const initialState: ProductState = {
    products: [],
    cart: [],
    loading: 'idle',
    filterLoading: 'idle',
    error: null,
    filterError: null,
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Product>) => {
            const itemInCart = state.cart.find((item) => item.product.id === action.payload.id);
            if (itemInCart) {
                itemInCart.quantity++;
            } else {
                state.cart.push({ product: action.payload, quantity: 1 });
            }
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            state.cart = state.cart.filter((item) => item.product.id !== action.payload);
        },
        setCart: (state, action: PayloadAction<CartItem[]>) => {
            state.cart = action.payload;
        },
        clearCart: (state) => {
            state.cart = [];
        },
        increaseQuantity: (state, action: PayloadAction<number>) => {
            const item = state.cart.find((item) => item.product.id === action.payload);
            if (item) {
                item.quantity++;
            }
        },
        decreaseQuantity: (state, action: PayloadAction<number>) => {
            const item = state.cart.find((item) => item.product.id === action.payload);
            if (item) {
                if (item.quantity === 1) {
                    state.cart = state.cart.filter((item) => item.product.id !== action.payload);
                } else {
                    item.quantity--;
                }
            }
        },
    },
    extraReducers: (builder) => {
        const handlePending = (state: ProductState) => {
            state.loading = 'pending';
            state.error = null;
        };

        const handleFulfilled = (state: ProductState, action: PayloadAction<Product[]>) => {
            state.loading = 'succeeded';
            state.products = action.payload;
        };

        const handleRejected = (state: ProductState, action: unknown) => { 
            state.loading = 'failed';
            state.error = (action as any).error?.message || "Ürünler yüklenirken bir hata oluştu.";
        };

        builder
            .addCase(fetchProducts.pending, handlePending)
            .addCase(fetchProducts.fulfilled, handleFulfilled)
            .addCase(fetchProducts.rejected, handleRejected)

            .addCase(fetchFilteredProducts.pending, (state) => {
                state.filterLoading = 'pending';
                state.filterError = null;
            })
            .addCase(fetchFilteredProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
                state.filterLoading = 'succeeded';
                state.products = action.payload;
            })
            .addCase(fetchFilteredProducts.rejected, (state, action: unknown) => { 
                state.filterLoading = 'failed';
                state.filterError = (action as any).error?.message || "Filtrelenmiş ürünler yüklenirken bir hata oluştu.";
            });
    },
});

export default productSlice.reducer;
export const { addToCart, removeFromCart, clearCart, setCart, increaseQuantity, decreaseQuantity } = productSlice.actions;

// Selector'lar
export const selectProducts = (state: { products: ProductState }) => state.products.products;
export const selectCart = (state: { products: ProductState }) => state.products.cart;
export const selectLoading = (state: { products: ProductState }) => state.products.loading;
export const selectError = (state: { products: ProductState }) => state.products.error;
export const selectFilterLoading = (state: { products: ProductState }) => state.products.filterLoading;
export const selectFilterError = (state: { products: ProductState }) => state.products.filterError;