import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../redux/slice/ProductSlice";
import { useEffect } from "react";
import {
  CardText,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Button,
  Container,
  CardImg,
  CardFooter,
} from "react-bootstrap";
import "../css/productList.css";
import { useNavigate } from "react-router-dom";

function ProductList() {
  const dispatch = useDispatch();
  // Use Selector ile store havuzundaki products'ları çektik
  const { products } = useSelector((store) => store.products);
  console.log(products);

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  const navigate = useNavigate();

  return (
    <Container>
      <Row
        style={{
          paddingRight: "10%",
          paddingLeft: "10%",
          display: "flex",
          justifyContent: "center",
        }}
        className="mx-auto"
      >
        {products &&
          products.map(({ id, image, title, price, rating }) => (
            <Col key={id} sm={12} lg={4} md={6} xl={3}>
              <Card className="card">
                <CardImg className="productImage" src={image}></CardImg>
                <CardTitle> {title}</CardTitle>
                <CardBody className="card-body">
                  <CardText>Fiyat: {price}</CardText>
                  <CardText>Puan: {rating.rate}</CardText>
                </CardBody>
                <CardFooter>
                  {" "}
                  <Button
                    className="card-btn "
                    onClick={() => navigate("/product-details/" + id)}
                  >
                    Detayları
                  </Button>
                </CardFooter>
              </Card>
            </Col>
          ))}
      </Row>
    </Container>
  );
}

export default ProductList;
