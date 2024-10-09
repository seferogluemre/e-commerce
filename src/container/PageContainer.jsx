import { Container } from "react-bootstrap";
function PageContainer({ children }) {
  return (
    <>
      <Container fluid className="custom-container">
        {children}
      </Container>
    </>
  );
}

export default PageContainer;
