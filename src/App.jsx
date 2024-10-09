import { Container } from "react-bootstrap";

import "./App.css";
import Header from "./components/Header";
import PageContainer from "./container/PageContainer";

function App() {
  return (
    <>
      <PageContainer>
        <Header />
      </PageContainer>
    </>
  );
}

export default App;
