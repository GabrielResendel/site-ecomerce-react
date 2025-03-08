import React from 'react'
import logoGR from '../assets/logoGR.png'
const Header = () => {
  return (
    <div className="Header">
        <img src={logoGR} alt="" />
        <a className="button_header" href="/">CATEGORIAS</a>
						
        <a className="button_header" href="/">OFERTAS</a>
    
    
    </div>

  )
}

export default Header