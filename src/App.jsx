import { useState } from "react";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Category from "./pages/Category";
import ItemView from "./pages/ItemView";
import Cart from "./pages/Cart";
import ItemCategory from "./pages/ItemCategory";
import Footer from "./components/Footer";
import { CartProvider } from "./context/CartContext";
import Historico from "./pages/Historico";

function App() {
  const [searchQuery, setSearchQuery] = useState(""); // Estado para a pesquisa

  return (
    <CartProvider>
    <BrowserRouter>
      <Header setSearchQuery={setSearchQuery} />
      <Routes>
        <Route path="/" element={<Home searchQuery={searchQuery} />} />
        <Route path="/category/:id" element={<Category />} />
        <Route path="/itemCategory/:id" element={<ItemCategory />} />
        <Route path="/itemview/:id" element={<ItemView />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/historico" element={<Historico />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
    </CartProvider>
  );
}

export default App;
