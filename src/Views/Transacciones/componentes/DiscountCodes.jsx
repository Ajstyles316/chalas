import { useState, useEffect } from "react";
import { db } from '../../../Firebase/config';
import { collection, getDocs } from "firebase/firestore";
import './codes.css'

const DiscountCodes = () => {
  const [discounts, setDiscounts] = useState([]);

  useEffect(() => {
    const fetchDiscounts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "descount"));
        const discountData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDiscounts(discountData);
      } catch (error) {
        console.error("Error fetching discount codes:", error);
      }
    };

    fetchDiscounts();
  }, []);

  return (
    <div className="discount-codes-container">
      <h3>Códigos de Descuento</h3>
      {discounts.length > 0 ? (
        discounts.map((discount) => (
          discount.valid && ( // Solo mostrar descuentos válidos
            <div key={discount.id} className="discount-card">
              <h4>Código: {discount.code}</h4>
              <p>Descuento: {discount.desc * 100}%</p> {/* Convertir el decimal a porcentaje */}
            </div>
          )
        ))
      ) : (
        <p>No hay códigos de descuento disponibles.</p>
      )}
    </div>
  );
};

export default DiscountCodes;
