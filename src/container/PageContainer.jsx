import { Container, Row } from "react-bootstrap";
function PageContainer({ children }) {
  return (
    <>
      <Container fluid className="custom-container">
        <Row>{children}</Row>
      </Container>
    </>
  );
}

export default PageContainer;
