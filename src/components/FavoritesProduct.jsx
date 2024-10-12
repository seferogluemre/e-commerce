import "../css/FavoriteProduct.css";
import { useDispatch, useSelector } from "react-redux";
import { AiFillCloseSquare } from "react-icons/ai";
import { removeFavorites } from "../redux/slice/FavoriteProducts";
function FavoritesProduct() {
  const { favoriteProducts } = useSelector((store) => store.favorites);

  const dispatch = useDispatch();

  const handleFavorites = (product) => {
    dispatch(removeFavorites(product));
  };

  return (
    <div
      className="container"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {favoriteProducts ? (
        favoriteProducts.map(({ id, image, title, price }) => {
          return (
            <div className="favorite-cart" key={id}>
              <div className="image">
                <div className="d-flex justify-content-center">
                  <img src={image} />
                </div>
                {/* En alta alıncak -------- */}
                <div
                  style={{
                    float: "right",
                    fontSize: "46px",
                    cursor: "pointer",
                  }}
                >
                  <AiFillCloseSquare onClick={() => handleFavorites({ id })} />
                </div>
              </div>
              <div>
                <h3>{title}</h3>
              </div>
              <div>
                <h3 style={{ marginTop: "10px" }}>
                  Fiyat: <strong style={{ color: "red" }}>{price}TL</strong>
                </h3>
              </div>
            </div>
          );
        })
      ) : (
        <p>Favoriye Ürün eklenmedi</p>
      )}
    </div>
  );
}

export default FavoritesProduct;
