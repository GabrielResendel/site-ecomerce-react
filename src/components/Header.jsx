import React, { useState } from "react";
import logoGR from "../assets/logoGR.png";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { CONTATO } from "../config";

const Header = ({ setSearchQuery }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    setSearchQuery(value); // Envia a pesquisa para o Home
  };
  const { cartItems } = useContext(CartContext);
  const totalItens = cartItems.reduce(
    (total, item) => total + item.quantidade,
    0
  );

  return (
    <div className="Header">
      {/* ESQUERDA: Logo + Botão Ofertas */}
      <div className="header-left">
        <Link to="/">
          <img src={logoGR} alt="Logo G&R" className="logo" />
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
            <img
              width="30"
              height="30"
              src="https://img.icons8.com/ios/50/search--v1.png"
              alt="search--v1"
            />
          </button>
        </div>
      </div>

      {/* DIREITA: Ícones + Contato */}
      <div className="header-right">
        <i className="fas fa-user"></i>
        <i className="fas fa-shopping-cart"></i>
        <Link to="/Cart" className="button_header cart-button">
          <img
            width="25"
            height="25"
            src="https://img.icons8.com/ios/50/shopping-cart--v1.png"
            alt="shopping-cart--v1"
          />
          &nbsp;Carrinho
          {totalItens > 0 && <span className="cart-badge">{totalItens}</span>}
        </Link>
        <a
          href={`https://wa.me/${CONTATO}`}
          target="_blank"
          rel="noreferrer"
          className="button_header"
        >
          <img
            width="25"
            height="25"
            src="https://img.icons8.com/ios-glyphs/30/whatsapp.png"
            alt="whatsapp"
          />
          &nbsp;Contato
        </a>
        <Link to="/historico" className="button_header cart-button">
          <img
            width="25"
            height="25"
            src="https://img.icons8.com/ios/50/e-commerce.png"
            alt="e-commerce"
          />
          &nbsp;Historico Pedidos
        </Link>
      </div>
    </div>
  );
};

export default Header;
