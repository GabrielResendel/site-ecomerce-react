import React, { useEffect, useState } from "react";
import axios from "axios";
import SingleItem from "../components/SingleItem";
import API_URL from "../config";
import Category from "./Category";
import CategoryList from "../components/CategoryList";
const Home = () => {
  const [produtos, setProdutos] = useState([]);
  //busca todos os produtos
  useEffect(() => {
    axios.get(`${API_URL}/produto`)
      .then(response => {
        setProdutos(response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar produtos:", error);
      });
  }, []);

  const [categorias, setCategorias] = useState([]);
  //busca todos as categorias
  useEffect(() => {
    axios.get(`${API_URL}/categoria`)
      .then(response => {
        setCategorias(response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar categorias:", error);
      });
  }, []);


  useEffect(() => {
    axios.get(`${API_URL}/categoria`)
      .then(response => {
        console.log("Categorias carregadas:", response.data); // Verifica os dados
        setCategorias(response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar categorias:", error);
      });
  }, []);

  return (
    <div className="Home">
      <div>
        <h1>Explore as Categorias</h1>
          <div className="grid_categoria">
            {categorias.map(categoria => (
              <CategoryList Key={categoria.id} categoria={categoria} />
            ))}
          </div>
        </div>

        <h1>Lista de Produtos</h1>
      <div className="grid_produto">
        {produtos.map(produto => (
          <SingleItem key={produto.id} produto={produto} categorias={categorias} />
        ))}
      </div>
    </div>
  );
};

export default Home;