import React, { useState } from "react";
import logoGR from "../assets/logoGR.png";
import { Link } from "react-router-dom";

const Header = ({ setSearchQuery }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    setSearchQuery(value); // Envia a pesquisa para o Home
  };

  return (
    <div className="Header">
      {/* ESQUERDA: Logo + Botão Ofertas */}
      <div className="header-left">
        <Link to="/">
          <img src={logoGR} alt="Logo G&R" className="logo" />
        </Link>
        <Link to="/Oferta" className="button_header">
        <img width="25" height="25" src="https://img.icons8.com/ios/50/commercial--v1.png" alt="commercial--v1"/>&nbsp;Ofertas
        </Link>
      </div>

      {/* CENTRO: Barra de pesquisa */}
      <div className="header-center">
        <div className="Search">
          <input
            type="text"
            className="Search-Term"
            placeholder="Procure um Produto"
            value={query}
            onChange={handleSearch}
          />
          <button type="submit" className="SearchButton">
          <img width="30" height="30" src="https://img.icons8.com/ios/50/search--v1.png" alt="search--v1"/>
          </button>
        </div>
      </div>

      {/* DIREITA: Ícones + Contato */}
      <div className="header-right">
        <i className="fas fa-user"></i>
        <i className="fas fa-shopping-cart"></i>
        <Link to="/Kart" className="button_header">
        <img width="25" height="25" src="https://img.icons8.com/ios/50/shopping-cart--v1.png" alt="shopping-cart--v1"/>&nbsp;Carrinho
        </Link>
        <a
          href="https://wa.me/5531999999999"
          target="_blank"
          rel="noreferrer"
          className="button_header"
        >
          <img width="25" height="25" src="https://img.icons8.com/ios-glyphs/30/whatsapp.png" alt="whatsapp"/>&nbsp;Contato
        </a>
      </div>
    </div>
  );
};

export default Header;
