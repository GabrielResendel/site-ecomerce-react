import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import API_URL from "../config";

const ItemView = () => {
  const { id } = useParams();
  const [produto, setProduto] = useState(null);
  const [imagens, setImagens] = useState([]);

  useEffect(() => {
    // Buscar detalhes do produto
    axios.get(`${API_URL}/produto/${id}`)
      .then(response => {
        setProduto(response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar produto:", error);
      });

    // Buscar todas as imagens do produto
    axios.get(`${API_URL}/imagem/${id}`)
      .then(response => {
        setImagens(response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar imagens:", error);
      });

  }, [id]);

  if (!produto) return <p>Carregando...</p>;

  return (
    <div>
      <h1>{produto.nome}</h1>
      <p>{produto.descricao}</p>
      <p>Preço: R$ {produto.preco.toFixed(2)}</p>

      <h2>Galeria de Imagens</h2>
      <div className="galeria">
        {imagens.map((imagem) => (
          <img key={imagem.id} src={imagem.url} alt={`Imagem ${imagem.id}`} />
        ))}
      </div>
    </div>
  );
};

export default ItemView;