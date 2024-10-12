import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favoriteProducts: [],
  length: 0,
};

export const favoriteProductSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addToFavorite: (state, action) => {
      const findProduct = state.favoriteProducts.find(
        (product) => product.id === action.payload.id
      );

      if (!findProduct) {
        state.favoriteProducts.push(action.payload);
        localStorage.setItem(
          "favoriteProducts",
          JSON.stringify(state.favoriteProducts)
        );
      }
    },
    removeFavorites: (state, action) => {
      const removedProduct = state.favoriteProducts.filter(
        (product) => product.id !== action.payload.id
      );

      localStorage.setItem(
        "favoritesProducts",
        JSON.stringify([...state.favoriteProducts, removedProduct])
      );

      return removeFavorites;
    },

    setFavoritesFromStorage: (state, action) => {
      return action.payload;
    },
  },
});

export const { addToFavorite, removeFavorites } = favoriteProductSlice.actions;

export default favoriteProductSlice.reducer;
