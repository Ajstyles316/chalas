import { createContext, useState, useContext } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Agregar un producto al carrito o incrementar su cantidad
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        // Incrementar la cantidad si el producto ya está en el carrito
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
      // Agregar un nuevo producto al carrito
      return [...prevCart, { ...product, cantidad: 1 }];
    });
  };
  

  // Eliminar un producto del carrito
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // Calcular el subtotal dinámicamente
  const getSubtotal = () => {
    return cart.reduce((subtotal, item) => {
      return subtotal + item.price * item.cantidad; // Sumar precio * cantidad de cada producto
    }, 0);
  };

  // Actualizar la cantidad de un producto en el carrito
  const updateProductQuantity = (productId, nuevaCantidad) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, cantidad: nuevaCantidad } : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        getSubtotal,
        updateProductQuantity,
        setCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook para usar el contexto del carrito
export const useCart = () => useContext(CartContext);
