import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import "../css/header.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaBasketShopping } from "react-icons/fa6";
import { CiLight } from "react-icons/ci";
import { FaMoon } from "react-icons/fa";
import { useState } from "react";

function Header() {
  const [theme, setTheme] = useState(false);

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

  return (
    <Navbar className="">
      <Container>
        <Navbar.Brand href="#home">
          <div className="brand-logo"></div>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text className="d-flex">
            <input type="text" className="nav-input" placeholder="Arama..." />
            <div className="d-flex align-items-center ">
              {theme ? (
                <FaMoon className="moon-icon icon" onClick={changeTheme} />
              ) : (
                <CiLight className="light-icon icon" onClick={changeTheme} />
              )}

              <FaBasketShopping className="cart-icon icon" />
            </div>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
