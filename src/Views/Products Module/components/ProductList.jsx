import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../Firebase/config";
import ItemCard from "./ItemCard";
import "../Styles/productList.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productData);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p>Cargando productos...</p>;
  }

  return (
    <div className="product-list-container">
      {products.map((product) => (
        <ItemCard
          key={product.id}
          imageUrl={product.imageUrl}
          name_product={product.name_product}
          provider={product.provider}
          provider_id={product.provider_id}
          description={product.description}
          categories={product.categories}
          onClick={() => onCardClick(product)}
        />
      ))}
    </div>
  );
};

export default ProductList;
