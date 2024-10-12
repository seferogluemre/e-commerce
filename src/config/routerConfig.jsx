import { Routes, Route } from "react-router-dom";
import Home from "../pages/home";
import ProductDetails from "../components/ProductDetails";
import FavoritesProduct from "../components/FavoritesProduct";

function routerConfig() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/product-details/:id" element={<ProductDetails />}></Route>
      <Route path="/favorite-products" element={<FavoritesProduct />}></Route>
    </Routes>
  );
}

export default routerConfig;
