import React, { useEffect, useState } from "react";

const Historico = () => {
  const [historico, setHistorico] = useState([]);

  useEffect(() => {
    const dados = JSON.parse(localStorage.getItem("historicoPedidos")) || [];
    setHistorico(dados);
  }, []);

  return (
    <div className="historico-container">
      <h2>Histórico de Pedidos</h2>
      {historico.length === 0 ? (
        <p>Nenhum pedido foi feito ainda.</p>
      ) : (
        historico
          .slice()
          .reverse()
          .map((pedido, index) => (
            <div key={index} className="pedido-card">
              <p>
                <strong>ID:</strong> {pedido.id}
              </p>
              <p>
                <strong>Nome:</strong> {pedido.nome}
              </p>
              <p>
                <strong>WhatsApp:</strong> {pedido.whatsapp}
              </p>
              <p>
                <strong>Endereço:</strong> {pedido.endereco}
              </p>
              <p>
                <strong>Forma de pagamento:</strong> {pedido.formaPagamento}
              </p>
              <p>
                <strong>Data:</strong> {pedido.dataHora}
              </p>
              <p>
                <strong>Total:</strong> R$ {pedido.total.toFixed(2)}
              </p>
              <ul>
                {pedido.itens.map((item, idx) => (
                  <li key={idx}>
                    {item.nome} ({item.cor}) - Tam: {item.tamanho} - Qtd:{" "}
                    {item.quantidade} - R${" "}
                    {(item.preco * item.quantidade).toFixed(2)}
                  </li>
                ))}
              </ul>
            </div>
          ))
      )}
    </div>
  );
};

export default Historico;
