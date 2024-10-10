import { useEffect, useState } from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setSelectedProduct } from "../redux/slice/ProductSlice";
import { IoMdAdd } from "react-icons/io";
import { IoMdRemove } from "react-icons/io";
import "../css/ProductDetails.css";

function ProductDetails() {
  // ProductSlice Yapısından State timizi aldık selector aracılıgıyla
  const { products, selectedProduct } = useSelector((store) => store.products);
  //   Adrese gönderilen ürünün id sini UseParams ile seçtik
  const { id } = useParams();
  const [count, setCount] = useState(0);
  console.log(id);
  const dispatch = useDispatch();

  const { title, description, price, image } = selectedProduct;

  //   Bütün ürünlerimizi gezdikten sonra hepsinin id sini parametreden gelen id ile karşılaştırıp eger true ise setSelectedProduct state'ine seçilen productı yükledik ve daha sonra verilerine erişim sagladık
  const getProductById = () => {
    products &&
      products.map((product) => {
        if (product.id == id) {
          dispatch(setSelectedProduct(product));
        }
      });
  };

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  useEffect(() => {
    getProductById();
  }, []);

  return (
    <Container>
      <Row>
        <Col lg={4} sm={12} md={6}>
          <Image src={image} className="image"></Image>
        </Col>
        <Col
          className="d-flex flex-column py-5 row-gap-3 px-3"
          lg={8}
          sm={12}
          md={6}
        >
          <div>{description}</div>
          <div className="fw-bold fs-3"> {title}</div>
          <div className="fs-4">
            <strong className="text-danger fw-bold fs-1">{price}₺</strong>
          </div>
          <div className="d-flex align-items-center column-gap-2">
            <IoMdAdd
              onClick={() => increment()}
              style={{
                fontSize: "50px",
                border: "2px solid black",
                cursor: "pointer",
                borderRadius: "50%",
              }}
            />
            <strong className="fs-4">{count}</strong>
            <IoMdRemove
              onClick={() => decrement()}
              style={{
                fontSize: "50px",
                border: "2px solid black",
                cursor: "pointer",
                borderRadius: "50%",
              }}
            />
          </div>
          <div className="m-2">
            <Button className="btn btn-danger fs-5">Sepete Ekle</Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductDetails;
