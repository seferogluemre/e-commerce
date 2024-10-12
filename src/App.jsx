import "./App.css";
import Header from "./components/Header";
import PageContainer from "./container/PageContainer";
import RouterConfig from "./config/routerConfig";
import Loading from "./components/Loading";
import { Drawer } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  calculateBasket,
  setDrawer,
  deleteProduct,
} from "./redux/slice/BasketSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const { products, drawer, totalAmount } = useSelector(
    (store) => store.basket
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [favoriteLength, setFavoriteLength] = useState(0);
  const { favoriteProducts } = useSelector((store) => store.favorites);

  useEffect(() => {
    if (favoriteProducts) {
      setFavoriteLength(favoriteProducts.length);
    }
  }, [favoriteProducts]);

  useEffect(() => {
    dispatch(calculateBasket());
  }, [dispatch]);

  useEffect(() => {}, []);

  return (
    <>
      <PageContainer>
        <Header />
      </PageContainer>
      <RouterConfig />
      <Loading />
      <Drawer
        open={drawer}
        anchor="right"
        onClose={() => dispatch(setDrawer())}
      >
        <h3 className="text-center">Alışveriş Sepetim</h3>
        {products &&
          products.map(({ image, id, title, price, count }) => {
            return (
              <div key={id} className="cart-item">
                <img className="product-image" src={image} />
                <p className="title">
                  {title} <br></br>
                  <strong style={{ color: "red" }}>Adet:({count})</strong>
                </p>
                <p className="price">{price}₺</p>
                <button
                  onClick={() =>
                    dispatch(deleteProduct({ id }), calculateBasket())
                  }
                  className="delete-btn"
                >
                  Sil
                </button>
              </div>
            );
          })}

        <div className="cart-footer">
          Toplam Tutar: {totalAmount.toFixed(2)} TL
        </div>
        <div>
          <button
            className="tekrarBtn"
            onClick={() => dispatch(calculateBasket())}
          >
            Tutarı Tekrar Hesapla
          </button>
        </div>
      </Drawer>

      {favoriteLength > 0 && (
        <button
          className="btn btn-warning text-light fs-5 favoriteBtn"
          onClick={() => navigate("/favorite-products")}
        >
          Favoriye Eklenen Ürün: {favoriteLength}
        </button>
      )}
    </>
  );
}

export default App;
