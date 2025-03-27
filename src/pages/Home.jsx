import React, { useEffect, useState } from "react";
import axios from "axios";
import SingleItem from "../components/SingleItem";
import API_URL from "../config";
import CategoryList from "../components/CategoryList";

const Home = ({ searchQuery }) => {
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);

  // Busca todos os produtos
  useEffect(() => {
    axios
      .get(`${API_URL}/produto`)
      .then((response) => setProdutos(response.data))
      .catch((error) => console.error("Erro ao buscar produtos:", error));
  }, []);

  // Busca todas as categorias
  useEffect(() => {
    axios
      .get(`${API_URL}/categoria`)
      .then((response) => setCategorias(response.data))
      .catch((error) => console.error("Erro ao buscar categorias:", error));
  }, []);

  // Filtra os produtos com base na pesquisa
  const produtosFiltrados = produtos.filter((produto) => {
    if (!searchQuery) return true; // Se a busca estiver vazia, mostra todos
    const query = searchQuery.toLowerCase();
    return (
      produto.nome.toLowerCase().includes(query) ||
      categorias.some(
        (categoria) =>
          categoria.id === produto.categoriaId &&
          categoria.nome.toLowerCase().includes(query)
      )
    );
  });

  return (
    <div className="Home">
      <div>
        <h1 className="category-title">Explore as Categorias</h1>
        <div className="grid_categoria">
          {categorias.map((categoria) => (
            <CategoryList key={categoria.id} categoria={categoria} />
          ))}
        </div>
      </div>
      <div className="home-container">
        <h1 className="category-title">Lista de Produtos</h1>
        <div className="home-produtos-container">
          {produtosFiltrados.length > 0 ? (
            produtosFiltrados.map((produto) => (
              <SingleItem
                key={produto.id}
                produto={produto}
                categorias={categorias}
              />
            ))
          ) : (
            <p>Nenhum produto encontrado</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
