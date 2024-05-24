import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/types";

interface CartState {
  products: Product[];
}

const initialState: CartState = {
  products: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },
    clearCart: (state) => {
      state.products = [];
    },
    setCart: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
  },
});

export const { addToCart, removeFromCart, clearCart, setCart } =
  cartSlice.actions;
export default cartSlice.reducer;
