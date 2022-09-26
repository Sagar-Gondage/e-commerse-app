import Footer from "./components/Footer";
import Header from "./components/Header";
import { Container } from "react-bootstrap";
import HomeScreen from "./pages/HomePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductScreen from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/cart/:id" element={<CartPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
