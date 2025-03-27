import React from "react";
import { Link } from "react-router-dom";
import LogoGR from "../assets/logoGR.png";
import sapatos from "../assets/Sapatos.jpg";

function CategoryList({ categoria }) {
  const images = {
    Sapatos: sapatos,
  };

  const imagePath = images[categoria.nome] || LogoGR;

  return (
    <Link to={`/category/${categoria.id}`} className="category-card">
      <img src={imagePath} alt={categoria.nome} className="categoria-imagem" />
      <h3>{categoria.nome}</h3>
    </Link>
  );
}

export default CategoryList;
