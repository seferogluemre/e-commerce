import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import "../css/header.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaBasketShopping } from "react-icons/fa6";
import { CiLight } from "react-icons/ci";
import { FaMoon } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Badge from "@mui/material/Badge";
import { useDispatch, useSelector } from "react-redux";
import {  setDrawer } from "../redux/slice/BasketSlice";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products } = useSelector((store) => store.products);
  // const { cartLength } = useSelector((store) => store.basket);
  const [cartLength, setCartLength] = useState(0); // Sepet uzunluğu için state

  // console.log(cartLength);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartLength(storedCart.length);
  }, []);

  const [theme, setTheme] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false); // Dropdown görünürlüğü için state

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

  // Dropdown açılmasını kontrol et
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setShowDropdown(e.target.value.length > 0);
  };

  // Dropdown'u kapat
  const handleDropdownClose = () => {
    setShowDropdown(false);
  };

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
                onChange={handleSearchChange}
                onBlur={handleDropdownClose} // Dropdown dışına tıklandığında kapat
                placeholder="Arama..."
              />
            </div>
            {showDropdown && filteredProducts.length > 0 && (
              <div className="dropdown">
                {filteredProducts.map((data) => (
                  <div key={data.id} className="dropdown-item">
                    <div>
                      <img src={data.image} alt={data.title} className="img" />
                    </div>
                    <div className="columnTwo">
                      <h3 style={{ fontSize: "14px" }}>
                        Ürün adı: {data.title}
                      </h3>
                      <small style={{ fontSize: "13px" }}>
                        Ürün Fiyat:{" "}
                        <strong
                          style={{
                            color: "red",
                            fontWeight: "bold",
                            fontSize: "16px",
                          }}
                        >
                          {data.price}
                        </strong>
                      </small>
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
                badgeContent={cartLength}
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
