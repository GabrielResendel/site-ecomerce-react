import Header from "./components/Header"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home";
import Category from "./pages/Category";
import ItemView from "./pages/ItemView";
import Kart from "./pages/Kart"
import ItemCategory from "./pages/ItemCategory";
function App() {
 
  return (
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element= {<Home />}/>
          <Route path="/category" element={<Category/>}/>
          <Route path="/itemCategory/:id" element={<ItemCategory/>}/>
          <Route path="/itemview/:id" element= {<ItemView/>}/>
          <Route path="/kart" element={<Kart/>}/>
        </Routes>
      
      </BrowserRouter>
  );
}

export default App
