import "./App.css";
import Header from "./components/Header";
import ProductList from "./components/productList";
import PageContainer from "./container/PageContainer";

function App() {
  return (
    <>
      <PageContainer>
        <Header />
      </PageContainer>
      <PageContainer>
        <ProductList />
      </PageContainer>
    </>
  );
}

export default App;
