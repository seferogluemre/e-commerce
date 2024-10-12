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
        (product) => product.id == action.payload.id
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
      // Kaldırılan ürünü filtrele
      state.favoriteProducts = state.favoriteProducts.filter(
        (product) => product.id !== action.payload.id
      );

      // Güncellenen favori ürün listesini yerel depolamaya kaydet
      localStorage.setItem(
        "favoriteProducts",
        JSON.stringify(state.favoriteProducts)
      );
    },

    setFavoritesFromStorage: (state, action) => {
      return action.payload;
    },
  },
});

export const { addToFavorite, removeFavorites } = favoriteProductSlice.actions;

export default favoriteProductSlice.reducer;
