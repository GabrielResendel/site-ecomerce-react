import React from "react";
import { Link } from "react-router-dom";

const SingleItem = ({ produto }) => {
  return (
    <div className="produto-card">
      <Link to={`/itemview/${produto.id}`}>
        <img src={produto.capa} alt={produto.nome} className="produto-imagem" />
      </Link>
      <h3>{produto.nome}</h3>
      <p>Preço: R$ {produto.preco.toFixed(2)}</p>
    </div>
  );
};

export default SingleItem;