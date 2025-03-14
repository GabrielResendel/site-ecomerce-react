import React, { useEffect, useState } from "react";
import axios from "axios";
import SingleItem from "../components/SingleItem";

const Home = () => {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5005/api/produto") // Substitua pela sua URL real
      .then(response => {
        setProdutos(response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar produtos:", error);
      });
  }, []);

  return (
    <div>
      <h1>Lista de Produtos</h1>
      <div className="grid">
        {produtos.map(produto => (
          <SingleItem key={produto.id} produto={produto} />
        ))}
      </div>
    </div>
  );
};

export default Home;