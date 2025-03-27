import { useState } from "react";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Category from "./pages/Category";
import ItemView from "./pages/ItemView";
import Kart from "./pages/Kart";
import ItemCategory from "./pages/ItemCategory";

function App() {
  const [searchQuery, setSearchQuery] = useState(""); // Estado para a pesquisa

  return (
    <BrowserRouter>
      <Header setSearchQuery={setSearchQuery} />
      <Routes>
        <Route path="/" element={<Home searchQuery={searchQuery} />} />
        <Route path="/category/:id" element={<Category />} />
        <Route path="/itemCategory/:id" element={<ItemCategory />} />
        <Route path="/itemview/:id" element={<ItemView />} />
        <Route path="/kart" element={<Kart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
