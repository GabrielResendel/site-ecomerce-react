
import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    const existingItem = cartItems.find(
      (i) =>
        i.id === item.id &&
        i.tamanho === item.tamanho &&
        i.cor === item.cor
    );

    if (existingItem) {
      setCartItems(
        cartItems.map((i) =>
          i.id === item.id &&
          i.tamanho === item.tamanho &&
          i.cor === item.cor
            ? { ...i, quantidade: i.quantidade + item.quantidade }
            : i
        )
      );
    } else {
      setCartItems([...cartItems, item]);
    }
  };

  const removeFromCart = (id, tamanho, cor) => {
    setCartItems(
      cartItems.filter((item) => {
        const mesmoId = item.id === id;
        const mesmoTamanho = item.tamanho === tamanho;
        const mesmaCor = cor ? item.cor === cor : true;
  
        return !(mesmoId && mesmoTamanho && mesmaCor);
      })
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantidade, 0);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.preco * item.quantidade,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
