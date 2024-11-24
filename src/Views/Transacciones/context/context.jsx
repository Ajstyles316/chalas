import { createContext, useState, useContext } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const DEFAULT_PRICE = 75;
  // Agregar un producto al carrito o incrementar su cantidad
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    setTotalItems((prevTotal) => prevTotal + 1);
  };

  // Eliminar un producto del carrito
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // Obtener el subtotal (cantidad * precio de todos los productos)
  const getSubtotal = () => {
    return totalItems * DEFAULT_PRICE; // Multiplica el precio predeterminado por el total de productos
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, getSubtotal, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook para usar el contexto del carrito
export const useCart = () => useContext(CartContext);
