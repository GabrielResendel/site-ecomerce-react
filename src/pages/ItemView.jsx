import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import API_URL from "../config";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ItemView = () => {
  const { id } = useParams();
  const [produto, setProduto] = useState(null);
  const [imagens, setImagens] = useState([]);
  const [tamanhos, setTamanhos] = useState({});
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState(null);

  useEffect(() => {
    // Buscar dados do produto
    axios
      .get(`${API_URL}/produto/${id}`)
      .then((response) => setProduto(response.data))
      .catch((error) => console.error("Erro ao buscar produto:", error));

    // Buscar imagens do produto
    axios
      .get(`${API_URL}/imagem/${id}`)
      .then((response) => setImagens(response.data))
      .catch((error) => console.error("Erro ao buscar imagens:", error));

    // Buscar tamanhos do produto
    axios
      .get(`${API_URL}/produtotamanho/${id}`)
      .then((response) => {
        console.log("Retorno da API de tamanhos:", response.data); // Teste no console
        if (response.data.length > 0) {
          setTamanhos(response.data[0]); // Pegando o primeiro item do array
        }
      })
      .catch((error) => console.error("Erro ao buscar tamanhos:", error));
  }, [id]);

  if (!produto) return <p>Carregando...</p>;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
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

        {/* Seleção de tamanhos */}
        <div className="tamanhos-container">
          {tamanhos.p > 0 && (
            <button
              className={`tamanho-btn ${
                tamanhoSelecionado === "P" ? "selecionado" : ""
              }`}
              onClick={() => setTamanhoSelecionado("P")}
            >
              P
            </button>
          )}
          {tamanhos.m > 0 && (
            <button
              className={`tamanho-btn ${
                tamanhoSelecionado === "M" ? "selecionado" : ""
              }`}
              onClick={() => setTamanhoSelecionado("M")}
            >
              M
            </button>
          )}
          {tamanhos.g > 0 && (
            <button
              className={`tamanho-btn ${
                tamanhoSelecionado === "G" ? "selecionado" : ""
              }`}
              onClick={() => setTamanhoSelecionado("G")}
            >
              G
            </button>
          )}
          {tamanhos.gg > 0 && (
            <button
              className={`tamanho-btn ${
                tamanhoSelecionado === "GG" ? "selecionado" : ""
              }`}
              onClick={() => setTamanhoSelecionado("GG")}
            >
              GG
            </button>
          )}
        </div>

        {/* Botão de adicionar ao carrinho */}
        <button disabled={!tamanhoSelecionado}>
          {tamanhoSelecionado
            ? `Adicionar  ao Carrinho`
            : "Selecione um tamanho"}
        </button>

        <p className="description">{produto.descricao}</p>
      </div>
    </div>
  );
};

export default ItemView;
