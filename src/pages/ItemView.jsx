import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import API_URL from "../config";
import Slider from "react-slick"; // Importando o react-slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const ItemView = () => {
  const { id } = useParams();
  const [produto, setProduto] = useState(null);
  const [imagens, setImagens] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/produto/${id}`)
      .then(response => setProduto(response.data))
      .catch(error => console.error("Erro ao buscar produto:", error));

    axios.get(`${API_URL}/imagem/${id}`)
      .then(response => setImagens(response.data))
      .catch(error => console.error("Erro ao buscar imagens:", error));

  }, [id]);

  if (!produto) return <p>Carregando...</p>;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true
  };

  return (
    <div className="item-view-container">
      {/* Carrossel de imagens */}
      <div className="image-carousel">
        <Slider {...settings}>
          {imagens.map((imagem) => (
            <div key={imagem.id}>
              <img src={imagem.url} alt={`Imagem ${imagem.id}`} />
            </div>
          ))}
        </Slider>
      </div>

      {/* Informações do produto */}
      <div className="product-details">
        <h1>{produto.nome}</h1>
        <p className="price">R$ {produto.preco.toFixed(2)}</p>
        <button>ADICIONAR AO CARRINHO</button>
        <p className="description">{produto.descricao}</p>
      </div>
    </div>
  );
};

export default ItemView;