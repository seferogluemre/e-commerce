import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import "../css/header.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaBasketShopping } from "react-icons/fa6";
import { CiLight } from "react-icons/ci";
import { FaMoon } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Badge from "@mui/material/Badge";
import { useDispatch, useSelector } from "react-redux";
import { IoHeartDislikeOutline } from "react-icons/io5";
import { setDrawer } from "../redux/slice/BasketSlice";
import { FaHeart } from "react-icons/fa6";
import {
  addToFavorite,
  removeFavorites,
} from "../redux/slice/FavoriteProducts";

function Header() {
  const [theme, setTheme] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products } = useSelector((store) => store.products);
  const [cartArray, setCartArray] = useState([]);
  const [favoriteProducts, setFavoriteProducts] = useState({}); // Her ürün için favori durumu

  const inputRef = useRef(null); // Input alanı için referans
  const dropdownRef = useRef(null); // Dropdown için referans

  useEffect(() => {
    // localStorage verileri al
    const storedItems = JSON.parse(localStorage.getItem("cart")) || [];
    setCartArray(storedItems);

    // storage olayını dinleme
    const handleStorageChange = () => {
      const updatedItems = JSON.parse(localStorage.getItem("cart")) || [];
      setCartArray(updatedItems);
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  let badgeContent = cartArray.length;

  const changeTheme = () => {
    const root = document.getElementById("root");
    const icons = document.querySelectorAll(".icon");

    if (theme) {
      root.style.backgroundColor = "black";
      root.style.color = "#fff";
      icons.forEach((icon) => (icon.style.color = "#fff")); // İkonları beyaz yap
    } else {
      root.style.backgroundColor = "#fff";
      root.style.color = "black";
      icons.forEach((icon) => (icon.style.color = "black")); // İkonları siyah yap
    }

    setTheme(!theme);
  };

  const favoriteControl = (product) => {
    // Dışardan aldıgımız ürün favoriÜrünler Dizisinde Varmı yokmu kontrol ettik
    const isFavorited = favoriteProducts[product.id];

    // isFavori true dönerse ürün var demektir ve olan ürünü çıkarmamız gerekiyor
    if (isFavorited) {
      // Çıkarmak istedigimiz ürünü parametre olarak geçip sildik
      dispatch(removeFavorites(product));
      // Ve Favori ürünleri günncelemek için hepsini proc olarak yakalayıp var olan procları tekrar güncelledikten sonra bizim product.id mizi false çekerek favorilerden kaldırdık
      setFavoriteProducts((proc) => ({ ...proc, [product.id]: false }));
    } else {
      // Burdada aynı mantık ama tam tersi busefer ekleme yapıp alt kısımda eklendigini anlamak için true yaptık
      dispatch(addToFavorite(product));
      setFavoriteProducts((proc) => ({ ...proc, [product.id]: true }));
    }
  };

  // Dropdown açılmasını kontrol et
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setShowDropdown(e.target.value.length > 0);
  };

  // Dropdown dışına tıklanmasını kontrol et
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target) && // Input dışına tıklandığında
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) // Dropdown dışına tıklandığında
      ) {
        setShowDropdown(false); // Dropdown'u kapat
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [inputRef, dropdownRef]);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Navbar className="header">
      <Container>
        <Navbar.Brand href="#home">
          <div className="brand-logo" onClick={() => navigate("/")}></div>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text className="d-flex">
            <div style={{ position: "relative" }}>
              <input
                type="text"
                className="nav-input"
                value={searchTerm}
                ref={inputRef} // Input için referans
                onChange={handleSearchChange}
                placeholder="Arama..."
              />
            </div>
            {showDropdown && filteredProducts.length > 0 && (
              <div className="dropdown" ref={dropdownRef}>
                {" "}
                {/* Dropdown referansı */}
                {filteredProducts.map(({ id, image, price, title }) => (
                  <div key={id} className="dropdown-item">
                    <div>
                      <img src={image} alt={title} className="img" />
                    </div>
                    <div className="columnTwo">
                      <h3
                        style={{
                          fontSize: "14px",
                          paddingRight: "80px",
                          height: "30px",
                          textWrap: "wrap",
                        }}
                      >
                        Ürün adı: {title}
                      </h3>
                      <small style={{ fontSize: "13px", textAlign: "start" }}>
                        Ürün Fiyat:
                        <strong
                          style={{
                            color: "red",
                            fontWeight: "bold",
                            fontSize: "16px",
                          }}
                        >
                          {price}
                        </strong>
                      </small>
                    </div>
                    <div>
                      <h4>
                        {favoriteProducts[id] ? (
                          <IoHeartDislikeOutline
                            onClick={() =>
                              favoriteControl({ id, image, price, title })
                            }
                            style={{ cursor: "pointer" }}
                          />
                        ) : (
                          <FaHeart
                            onClick={() =>
                              favoriteControl({ id, image, price, title })
                            }
                            style={{ cursor: "pointer" }}
                          />
                        )}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="d-flex align-items-center">
              {theme ? (
                <FaMoon className="moon-icon icon" onClick={changeTheme} />
              ) : (
                <CiLight className="light-icon icon" onClick={changeTheme} />
              )}

              <Badge
                onClick={() => {
                  dispatch(setDrawer());
                }}
                badgeContent={badgeContent}
                color="error"
              >
                <FaBasketShopping className="cart-icon icon" />
              </Badge>
            </div>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
