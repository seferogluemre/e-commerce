import { configureStore } from "@reduxjs/toolkit";
import appReducer from "../redux/slice/appSlice";
import productReducer from "../redux/slice/ProductSlice";
import basketSlice from "./slice/BasketSlice";
import FavoritesProductSlice from "./slice/FavoriteProducts";

export const store = configureStore({
  reducer: {
    app: appReducer,
    products: productReducer,
    basket: basketSlice,
    favorites: FavoritesProductSlice,
  },
});
