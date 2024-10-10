import { createSlice } from "@reduxjs/toolkit";

const getLocalCartData = () => {
  if (localStorage.getItem("cart")) {
    return JSON.parse(localStorage.getItem("cart"));
  }
  return [];
};

const initialState = {
  products: getLocalCartData(),
};

const writeLocalStorage = (products) => {
  localStorage.setItem("cart", JSON.stringify(products));
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      const findProduct = state.products.find(
        (product) => product.id === action.payload.id
      );

      if (findProduct) {
        findProduct.count += action.payload.count;
      } else {
        // Ürün yeni ekleniyor
        state.products = [...state.products, action.payload];
      }

      writeLocalStorage(state.products);
    },
  },
});

export const { addToBasket } = basketSlice.actions;

export default basketSlice.reducer;
