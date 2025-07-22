import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import httpClient from "../../httpClient/clientV1";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ page, limit, search }, thunkAPI) => {
    try {
      const params = {
        page,
        limit,
        search,
      };

      const response = await httpClient.get("/products", {
        params,
      });

      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);
const initialState = {
  items: [],
  total: 0,
  page: 1,
  pages: 1,
  status: null,
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addToProducts(state, action) {
      state.items.push(action.payload);
    },
    removeFromProducts(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearProducts(state) {
      state.items = [];
      state.total = 0;
      state.page = 1;
      state.pages = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { products, page } = action.payload;
        if (page === 1) {
          state.items = products;
        } else {
          state.items = [...state.items, ...products];
        }
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.pages = action.payload.pages;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { addToProducts, removeFromProducts, clearProducts } =
  productsSlice.actions;

export default productsSlice.reducer;

export const selectProductsItems = (state) => state.products.items;
export const selectProductsStatus = (state) => state.products.status;
export const selectProductsError = (state) => state.products.error;

export const selectProductsTotal = (state) => state.products.total;
export const selectProductsPage = (state) => state.products.page;
export const selectProductsPages = (state) => state.products.pages;
