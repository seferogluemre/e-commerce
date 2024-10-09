import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import "../css/header.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Header() {
  return (
    <Navbar className="">
      <Container>
        <Navbar.Brand href="#home">
          <div className="brand-logo"></div>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <input type="text" className="nav-input" placeholder="Arama..." />
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
