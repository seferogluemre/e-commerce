import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import "../css/header.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaBasketShopping } from "react-icons/fa6";
import { CiLight } from "react-icons/ci";
import { FaMoon } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Badge from "@mui/material/Badge";
import { useDispatch, useSelector } from "react-redux";
import { setDrawer } from "../redux/slice/BasketSlice";
import PropTypes from "prop-types";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products } = useSelector((store) => store.products);

  const [theme, setTheme] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

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
  console.log("Search Term:", searchTerm);
  console.log(
    "Filtered Products:",
    products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
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
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Arama..."
              />
              {products
                .filter((product) => {
                  if (searchTerm === "") {
                    return true; // Tüm ürünleri döndür
                  }
                  return product.title
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());
                })
                .map((data) => {
                  return (
                    <div key={data.id}>
                      <img src={data.image} alt={data.title} />
                      <h3>Ürün adı: {data.title}</h3>
                    </div>
                  );
                })}
            </div>
            <div className="d-flex align-items-center">
              {theme ? (
                <FaMoon className="moon-icon icon" onClick={changeTheme} />
              ) : (
                <CiLight className="light-icon icon" onClick={changeTheme} />
              )}

              <Badge
                onClick={() => dispatch(setDrawer())}
                badgeContent={products.length}
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

Header.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
};

export default Header;
