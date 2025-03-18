import React from "react";
import { Link } from "react-router-dom";

const SingleItem = ({ produto, categorias }) => {
  console.log("Produto recebido:", produto);
  console.log("Categorias disponíveis:", categorias);

  const categoria = categorias.find(cat => Number(cat.id) === Number(produto.categoriaId));

  return (
    <div className="produto-card">
      <Link to={`/itemview/${produto.id}`}>
        <img src={produto.capa} alt={produto.nome} className="produto-imagem" />
      </Link>
      <h3>{produto.nome}</h3>
      <p className="categoria-produto">{categoria ? categoria.nome : "Categoria não encontrada"}</p>
      <p>R$ {produto.preco.toFixed(2)}</p>
    </div>
  );
};

export default SingleItem;