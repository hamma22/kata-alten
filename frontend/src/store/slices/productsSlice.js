import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addToProducts(state, action) {
      state.items.push(action.payload);
      state.total += action.payload.price;
    },
    removeFromProducts(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearProducts(state) {
      state.items = [];
      state.total = 0;
    },
  },
});

export const { addToProducts, removeFromProducts, clearProducts } =
  productsSlice.actions;
export default productsSlice.reducer;

export const selectProductsItems = (state) => state.products.items ?? [];
export const selectProductsCount = (state) => state.products.items.length;
