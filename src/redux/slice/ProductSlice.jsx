import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const data = {
  products: [],
  selectedProduct: {},
  loading: false,
};

export const getAllProducts = createAsyncThunk("getProduct", async () => {
  try {
    const response = await axios.get(`https://fakestoreapi.com/products/`);
    console.log(response.data); // Gelen veriyi kontrol et
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

export const productSlice = createSlice({
  name: "products",
  initialState: data,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllProducts.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });
  },
});

export const {} = productSlice.actions;

export default productSlice.reducer;
