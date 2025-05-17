import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Category from "./pages/Category/Category";
import ItemView from "./pages/ItemView/ItemView";
import Cart from "./pages/Cart/Cart";
import Footer from "./components/Footer/Footer";
import { CartProvider } from "./context/CartContext";
import Historico from "./pages/Historico/Historico";
import Header from "./components/Header/Header";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  const [searchQuery, setSearchQuery] = useState(""); // Estado para a pesquisa

  return (
    <CartProvider>
      <BrowserRouter>
        <Header setSearchQuery={setSearchQuery} />
        <Routes>
          <Route path="/" element={<Home searchQuery={searchQuery} />} />
          <Route path="/category/:id" element={<Category />} />
          <Route path="/itemview/:id" element={<ItemView />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/historico" element={<Historico />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
