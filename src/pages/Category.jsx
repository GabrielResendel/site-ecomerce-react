import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import SingleItem from "../components/SingleItem";
import API_URL from "../config";

const Category = () => {
  const { id } = useParams();
  const [categoria, setCategoria] = useState(null);
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(`${API_URL}/categoria/${id}`);
        setCategoria(response.data);
      } catch (error) {
        console.error("Erro ao buscar categoria:", error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_URL}/produto/categoria/${id}`);
        setProdutos(response.data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    if (id) {
      fetchCategory();
      fetchProducts();
    } else {
      console.warn("ID da categoria está indefinido!");
    }
  }, [id]);

  return (
    <div className="category-container">
      <h2 className="category-title">{categoria ? categoria.nome : "Carregando categoria..."}</h2>

      <div className="produtos-container">
        {produtos.length > 0 ? (
          produtos.map((produto) => <SingleItem key={produto.id} produto={produto} categorias={[categoria]} />)
        ) : (
          <p>Nenhum produto encontrado nesta categoria.</p>
        )}
      </div>
    </div>
  );
};

export default Category;
