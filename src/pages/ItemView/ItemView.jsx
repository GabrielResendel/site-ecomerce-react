import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import API_URL from "../../config";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CartContext } from "../../context/CartContext";
import styles from "./ItemView.module.css";
const ItemView = () => {
  const { addToCart } = React.useContext(CartContext);
  const { id } = useParams();

  const [produto, setProduto] = useState(null);
  const [imagens, setImagens] = useState([]);
  const [coresDisponiveis, setCoresDisponiveis] = useState([]);
  const [corSelecionada, setCorSelecionada] = useState(null);
  const [imagensFiltradas, setImagensFiltradas] = useState([]);
  const [tamanhos, setTamanhos] = useState({});
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState(null);
  const [quantidade, setQuantidade] = useState(1);

  useEffect(() => {
    // Buscar produto
    axios
      .get(`${API_URL}/produto/${id}`)
      .then((res) => setProduto(res.data))
      .catch((err) => console.error("Erro ao buscar produto:", err));

    // Buscar imagens
    axios
      .get(`${API_URL}/imagem/${id}`)
      .then((res) => {
        setImagens(res.data);
        const coresCompletas = res.data
          .map((img) => img.cor)
          .filter((cor) => cor && cor.id); // Garante que tenha cor válida
        console.log(res.data);
        // Remove duplicadas por ID
        const coresUnicas = coresCompletas.filter(
          (cor, index, self) => self.findIndex((c) => c.id === cor.id) === index
        );

        setCoresDisponiveis(coresUnicas);

        // Se só tem uma cor, seleciona automaticamente
        if (coresUnicas.length === 1) {
          setCorSelecionada(coresUnicas[0]);
        }

        setCoresDisponiveis(coresUnicas);
      })
      .catch((err) => console.error("Erro ao buscar imagens:", err));

    // Buscar tamanhos
    axios
      .get(`${API_URL}/produtotamanho/${id}`)
      .then((res) => {
        if (res.data.length > 0) setTamanhos(res.data[0]);
      })
      .catch((err) => console.error("Erro ao buscar tamanhos:", err));
  }, [id]);

  useEffect(() => {
    if (corSelecionada) {
      const filtradas = imagens.filter(
        (img) => img.cor && img.cor.id === corSelecionada.id
      );
      setImagensFiltradas(filtradas);
    }
  }, [corSelecionada, imagens]);

  const handleAddToCart = () => {
    const quantidadeDisponivel = getQuantidadeDisponivel();
    if (quantidade > quantidadeDisponivel) {
      alert("Quantidade excede o estoque disponível!");
      return;
    }

    const item = {
      id: produto.id,
      nome: produto.nome,
      preco: produto.preco,
      tamanho: tamanhoSelecionado,
      quantidade: parseInt(quantidade),
      cor: corSelecionada?.nome || "",
      imagem: imagensFiltradas[0]?.url || produto.capa,
    };
    addToCart(item);
  };

  const getQuantidadeDisponivel = () => {
    if (!tamanhoSelecionado) return 0;
    return tamanhos[tamanhoSelecionado.toLowerCase()] || 0;
  };

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
    <div className={styles.itemViewVontainer}>
      {/* Carrossel */}
      <div className={styles.imageCarousel}>
        <Slider {...settings}>
          {(imagensFiltradas.length > 0 ? imagensFiltradas : imagens).map(
            (imagem) => (
              <div key={imagem.id}>
                <img src={imagem.url} alt={`Imagem ${imagem.id}`} />
              </div>
            )
          )}
        </Slider>
      </div>

      <div className={styles.productDetails}>
        <h1>{produto.nome}</h1>
        <p className={styles.price}>R$ {produto.preco.toFixed(2)}</p>

        {/* Seletor de Cores */}
        {coresDisponiveis.length > 0 && (
          <div className={styles.coresContainer}>
            <p>Selecione a cor:</p>
            <div className={styles.botoesCor}>
              {coresDisponiveis.map((cor) => (
                <div
                  key={cor.id}
                  className={styles.corBtnWrapper}
                  onClick={() => setCorSelecionada(cor)}
                >
                  <div
                    className={`${styles.corBtn} ${
                      corSelecionada?.id === cor.id ? styles.selecionada : ""
                    }`}
                    style={{ backgroundColor: cor.hexaDec }}
                  />
                  <span className={styles.corLabel}>{cor.nome}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tamanhos */}
        <div className={styles.tamanhosContainer}>
          {["P", "M", "G", "GG"].map(
            (t) =>
              tamanhos[t.toLowerCase()] > 0 && (
                <button
                  key={t}
                  className={`${styles.tamanhoBtn} ${
                    tamanhoSelecionado === t ? "selecionado" : ""
                  }`}
                  onClick={() => setTamanhoSelecionado(t)}
                >
                  {t}
                </button>
              )
          )}
        </div>

        {/* Quantidade */}
        <div className={styles.quantidadeContainer}>
          <label>Quantidade:</label>
          <input
            type="number"
            min="1"
            max={getQuantidadeDisponivel()}
            value={quantidade}
            onChange={(e) => {
              const novaQuantidade = parseInt(e.target.value);
              const estoque = getQuantidadeDisponivel();
              if (!isNaN(novaQuantidade) && novaQuantidade <= estoque) {
                setQuantidade(novaQuantidade);
              }
            }}
            disabled={!tamanhoSelecionado}
          />
          {tamanhoSelecionado && (
            <p className={styles.estoqueInfo}>
              Disponível: {getQuantidadeDisponivel()} unidades
            </p>
          )}
        </div>

        {/* Botão */}
        <button
          onClick={handleAddToCart}
          disabled={
            !tamanhoSelecionado ||
            !corSelecionada ||
            quantidade > getQuantidadeDisponivel()
          }
        >
          {!tamanhoSelecionado || !corSelecionada
            ? "Selecione cor e tamanho"
            : getQuantidadeDisponivel() === 0
            ? "Indisponível"
            : "Adicionar ao Carrinho"}
        </button>

        <p className={styles.description}>{produto.descricao}</p>
      </div>
    </div>
  );
};

export default ItemView;
