import { configureStore } from "@reduxjs/toolkit";
import appReducer from "../redux/slice/appSlice";
import productReducer from "../redux/slice/ProductSlice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    products: productReducer,
  },
});
