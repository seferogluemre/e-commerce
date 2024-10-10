import { Routes, Route } from "react-router-dom";
import Home from "../pages/home";

function routerConfig() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
    </Routes>
  );
}

export default routerConfig;
