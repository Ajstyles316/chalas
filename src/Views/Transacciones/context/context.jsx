import { createContext, useState, useEffect, useMemo, useCallback } from "react";
export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Decoración Floral', precio: 250 },
    { id: 2, name: 'Catering', precio: 460 },
    { id: 3, name: 'Bebidas', precio: 40 },
    { id: 4, name: 'Entretenimiento', precio: 100 },
    { id: 5, name: 'Mobiliario', precio: 200 },
    { id: 6, name: 'Música', precio: 100 }
  ]);
  
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [discountCode, setDiscountCode] = useState('');
  const [discountedTotal, setDiscountedTotal] = useState(0);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cartData")) || [];
    setCart(storedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem("cartData", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const newTotal = cart.reduce((acc, item) => acc + (item.precio * item.quantity), 0);
    setTotal(newTotal);
  }, [cart]);

  const addToCart = useCallback((id) => {
    const isInCart = cart.some(item => item.id === id);
    if (!isInCart) {
      const selectedProduct = products.find(product => product.id === id);
      if (selectedProduct) {
        setCart(prevCart => [...prevCart, { ...selectedProduct, quantity: 1 }]);
      }
    }
  }, [cart, products]);

  const applyDiscount = (code) => {
   
    const discountData = {
      'DESC10': 0.10, 
      'DESC20': 0.20, 
      'DESC50': 0.50, 
      'DESC70': 0.70,
    };
    
    if (discountData[code]) {
      const discountAmount = total * discountData[code];
      const newTotal = total - discountAmount;
      setDiscountedTotal(newTotal);
      setDiscountCode(code);
     
      console.log(`Código de descuento aplicado: ${code}, Nuevo total: ${newTotal}`);
    } else {
      alert("Código de descuento inválido");
    }
  };

  const value = useMemo(() => ({
    products,
    cart: [cart, setCart],
    addToCart,
    total: [total, setTotal],
    discountedTotal, 
    applyDiscount, 
    discountCode,
  }), [products, cart, total, discountedTotal, applyDiscount, discountCode]);

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};
