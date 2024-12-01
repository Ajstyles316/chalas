import { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext"; // Importa el contexto de autenticación
import { db } from "../../../Firebase/config";
import { collection, query, where, getDocs } from "firebase/firestore";
import "./codes.css";

const DiscountCodes = () => {
  const { user } = useAuth(); 
  const [discounts, setDiscounts] = useState([]);

  useEffect(() => {
    const fetchDiscounts = async () => {
      if (!user) {
        console.error("Usuario no autenticado. No se pueden cargar los descuentos.");
        return;
      }

      try {
        const discountsQuery = query(
          collection(db, "descount"),
          where("userId", "==", user.uid)
        );

        const querySnapshot = await getDocs(discountsQuery);
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
  }, [user]);

  return (
    <div className="discount-codes-container">
      <h3>Códigos de Descuento</h3>
      {discounts.length > 0 ? (
        discounts.map((discount) => (
          discount.valid && ( 
            <div key={discount.id} className="discount-card">
              <h4>Código: {discount.code}</h4>
              <p>Descuento: {discount.desc * 100}%</p> 
            </div>
          )
        ))
      ) : (
        <p>Aún no tienes Códigos de descuento.</p>
      )}
    </div>
  );
};

export default DiscountCodes;
