import React from "react";
import { Link } from "react-router-dom";
import LogoGR from "../assets/logoGR.png";
import sapatos from "../assets/Sapatos.png";
import blusas from "../assets/Blusas.png"
import calças from "../assets/Calças.png"
import bermudas from "../assets/Bermudas.png"
import jaquetas from "../assets/Jaquetas.png"
import acessorios from "../assets/Acessorios.png"
function CategoryList({ categoria }) {
  const images = {
    Sapatos: sapatos,
    Blusas: blusas,
    Calças: calças,
    Bermudas: bermudas,
    "Jaquetas/Moletons": jaquetas,
    Acessórios: acessorios,
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
