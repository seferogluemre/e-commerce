import { Routes, Route } from "react-router-dom";
import Home from "../pages/home";
import ProductDetails from "../components/ProductDetails";

function routerConfig() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/product-details/:id" element={<ProductDetails />}></Route>
    </Routes>
  );
}

export default routerConfig;
