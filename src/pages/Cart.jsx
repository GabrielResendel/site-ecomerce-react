import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import API_URL from "../config";

const Cart = () => {
  const { cartItems, removeFromCart, totalItems, totalPrice, clearCart } =
    useContext(CartContext);

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [nome, setNome] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [endereco, setEndereco] = useState("");
  const [formaPagamento, setFormaPagamento] = useState("Pix");

  const confirmarPedido = async () => {
    if (!nome || !whatsapp || !endereco || !formaPagamento) {
      alert("Preencha todos os dados do cliente.");
      return;
    }

    try {
      // Verifica estoque
      const estoqueResponse = await fetch(
        `${API_URL}/pedido/verificar-estoque`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            cartItems.map((item) => ({
              produtoId: item.id,
              tamanho: item.tamanho,
              quantidade: item.quantidade,
            }))
          ),
        }
      );

      const estoqueData = await estoqueResponse.json();

      if (!estoqueResponse.ok) {
        alert(estoqueData);
        return;
      }

      // Monta o pedido
      const pedido = {
        nomeCliente: nome,
        whatsapp: whatsapp,
        endereco: endereco,
        formaPagamento: formaPagamento,
        status: "Novo Pedido",
        valorTotal: totalPrice,
        itens: cartItems.map((item) => ({
          produtoId: item.id,
          nomeProduto: item.nome,
          cor: item.cor,
          tamanho: item.tamanho,
          quantidade: item.quantidade,
          precoUnitario: item.preco,
        })),
      };

      const response = await fetch(`${API_URL}/pedido/created`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pedido),
      });

      const data = await response.json();

      // Mensagem pro WhatsApp
      const textoWhatsapp = encodeURIComponent(`
  🛒 *Novo Pedido Recebido!*
  🆔 Pedido: ${data.id}
  👤 Nome: ${nome}
  📞 WhatsApp: ${whatsapp}
  🏠 Endereço: ${endereco}
  💳 Pagamento: ${formaPagamento}
  
  📦 Itens:
  ${cartItems
    .map(
      (item) =>
        `• ${item.nome} (${item.cor}) - Tam: ${item.tamanho} - Qtd: ${
          item.quantidade
        } - R$ ${(item.preco * item.quantidade).toFixed(2)}`
    )
    .join("\n")}
  
  💰 *Total: R$ ${totalPrice.toFixed(2)}*
  `);

      // 📱 Verifica se é mobile ou desktop
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      const numeroLoja = "5531982593202";

      const linkWhatsapp = isMobile
        ? `https://wa.me/${numeroLoja}?text=${textoWhatsapp}`
        : `https://web.whatsapp.com/send?phone=${numeroLoja}&text=${textoWhatsapp}`;

      // Salva histórico
      const pedidoSalvo = {
        id: data.id,
        nome: nome,
        whatsapp: whatsapp,
        endereco: endereco,
        formaPagamento: formaPagamento,
        total: totalPrice,
        dataHora: new Date().toLocaleString(),
        itens: cartItems,
      };

      const historico =
        JSON.parse(localStorage.getItem("historicoPedidos")) || [];
      historico.push(pedidoSalvo);
      localStorage.setItem("historicoPedidos", JSON.stringify(historico));

      clearCart();
      alert(
        "Pedido realizado com sucesso! Você será redirecionado para o WhatsApp."
      );

      window.open(linkWhatsapp, "_blank");
    } catch (error) {
      alert("Erro ao finalizar pedido.");
      console.error(error);
    }
  };

  return (
    <div className="cart-container">
      <h2>Seu Carrinho</h2>

      {cartItems.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <>
          <ul className="cart-list">
            {cartItems.map((item, index) => (
              <li key={index} className="cart-item">
                <img
                  src={item.imagem}
                  alt={item.nome}
                  className="cart-item-image"
                />
                <div>
                  <strong>{item.nome}</strong> - Tamanho: {item.tamanho}
                  {item.cor && <> - Cor: {item.cor}</>}
                  <br />
                  Quantidade: {item.quantidade}
                  <br />
                  Preço: R$ {(item.preco * item.quantidade).toFixed(2)}
                </div>
                <button
                  className="button-remove"
                  onClick={() =>
                    removeFromCart(item.id, item.tamanho, item.cor)
                  }
                >
                  Remover
                </button>
              </li>
            ))}
          </ul>

          <div className="cart-summary">
            <p>Total de Itens: {totalItems}</p>
            <p>Valor Total: R$ {totalPrice.toFixed(2)}</p>

            <button className="button-cart" onClick={clearCart}>
              Limpar Carrinho
            </button>
            <button
              className="button-cart"
              onClick={() => setMostrarFormulario(true)}
            >
              Finalizar Pedido
            </button>
          </div>

          {mostrarFormulario && (
            <div className="formulario-pedido">
              <h3>Informações do Cliente</h3>
              <input
                type="text"
                placeholder="Nome completo"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
              <input
                type="text"
                placeholder="WhatsApp com DDD"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
              />
              <input
                type="text"
                placeholder="Endereço completo com CEP"
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
              />
              <select
                value={formaPagamento}
                onChange={(e) => setFormaPagamento(e.target.value)}
              >
                <option value="Pix">Pix</option>
                <option value="Cartão de Crédito">Cartão de Crédito</option>
                <option value="Boleto Bancario">Boleto Bancario</option>
              </select>
              <button className="button-cart" onClick={confirmarPedido}>
                Confirmar Pedido
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Cart;
