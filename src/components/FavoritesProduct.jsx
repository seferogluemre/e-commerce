import "../css/FavoriteProduct.css";
import { useSelector } from "react-redux";

function FavoritesProduct() {
  const { favoriteProducts } = useSelector((store) => store.favorites);

  return (
    <div>
      {favoriteProducts.map((product) => {
        return (
          <div key={product.id}>
            <h3>{product.title}</h3>
          </div>
        );
      })}
    </div>
  );
}

export default FavoritesProduct;
