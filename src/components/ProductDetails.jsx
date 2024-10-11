import { useEffect, useState } from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setSelectedProduct } from "../redux/slice/ProductSlice";
import { IoMdAdd, IoMdRemove } from "react-icons/io";
import "../css/ProductDetails.css";
import { addToBasket, calculateBasket } from "../redux/slice/BasketSlice"; // Doğru fonksiyon adı

function ProductDetails() {
  const { products, selectedProduct } = useSelector((store) => store.products);
  const { id } = useParams();
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();

  const { title, description, price, image } = selectedProduct;

  const getProductById = () => {
    products &&
      products.map((product) => {
        if (product.id == id) {
          dispatch(setSelectedProduct(product));
        }
      });
  };

  const addBasket = () => {
    const payload = {
      id,
      price,
      title,
      description,
      image,
      count: count,
    };

    dispatch(addToBasket(payload));
    dispatch(calculateBasket());
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
      <Row className="details">
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
              onClick={increment}
              style={{
                fontSize: "50px",
                border: "2px solid black",
                cursor: "pointer",
                borderRadius: "50%",
              }}
            />
            <strong className="fs-4">{count}</strong>
            <IoMdRemove
              onClick={decrement}
              style={{
                fontSize: "50px",
                border: "2px solid black",
                cursor: "pointer",
                borderRadius: "50%",
              }}
            />
          </div>
          <div className="m-2">
            <Button className="btn btn-danger fs-5" onClick={addBasket}>
              Sepete Ekle
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductDetails;
