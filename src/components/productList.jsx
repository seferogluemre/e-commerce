import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../redux/slice/ProductSlice";
import { useEffect } from "react";

function ProductList() {
  const dispatch = useDispatch();
  const { products } = useSelector((store) => store.products);
  console.log(products);

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  return <div>productList</div>;
}

export default ProductList;
