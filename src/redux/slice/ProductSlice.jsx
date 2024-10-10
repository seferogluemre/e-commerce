import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const data = {
  products: [],
  selectedProduct: {},
  loading: false,
};

export const getAllProducts = createAsyncThunk("getProduct", async () => {
  try {
    // Response data çekip deger olarak döndürdük
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
    // Eger beklemede ise yanıt bekliyor ise loading true çekip spinner yapısını gösteriyoruz
    builder.addCase(getAllProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllProducts.rejected, (state) => {
      state.loading = false;
    });

    // Apiden gelen data başarılı dönerse gönderecegimiz state yakalıyoruz ve action.payload ile yüklüyoruz
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });
  },
});

export const {} = productSlice.actions;

export default productSlice.reducer;
