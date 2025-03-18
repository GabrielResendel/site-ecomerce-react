import React from 'react'
import { Link } from 'react-router-dom'
import LogoGR from '../assets/logoGR.png'
import sapatos from '../assets/Sapatos.jpg'
function CategoryList({categoria}) {
  
  const images = {
      Sapatos: sapatos

  }

  const imagePath = images[categoria.nome] || LogoGR;
  return (
    <div className="category-card">
    <Link to={`/category/${categoria.id}`}>
      <img src={imagePath} alt={categoria.nome} className="categoria-imagem" />
    </Link>
    <h3>{categoria.nome}</h3>
  </div>
  )
}

export default CategoryList