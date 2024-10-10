import "./App.css";
import Header from "./components/Header";
import PageContainer from "./container/PageContainer";
import RouterConfig from "./config/routerConfig";
import Loading from "./components/Loading";

function App() {
  return (
    <>
      <PageContainer>
        <Header />
      </PageContainer>
      <RouterConfig />
      <Loading />
    </>
  );
}

export default App;
