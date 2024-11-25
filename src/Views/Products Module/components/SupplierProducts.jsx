import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import ProductForm from "./ProductForm";
import {
  getVisibleProducts,
  softDeleteProduct,
  updateProduct,
} from "../../../Firebase/api.js";
import "../Styles/supplierProducts.css";

const SupplierProducts = ({ onCardClick }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      const visibleProducts = await getVisibleProducts();
      setProducts(visibleProducts);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDeleteProduct = async (productId) => {
    try {
      await softDeleteProduct(productId);
      await fetchProducts();
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };

  const handleAddProductClick = () => {
    setSelectedProduct(null);
    setShowForm(true);
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setShowForm(true);
  };

  const handleToggleVisibility = async (product) => {
    try {
      await updateProduct(product.id, { visible: !product.visible });
      fetchProducts();
    } catch (error) {
      console.error("Error al cambiar visibilidad del producto:", error);
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setSelectedProduct(null);
    fetchProducts();
  };

  if (loading) {
    return <div className="loading-message">Cargando productos...</div>;
  }

  return (
    <div className="products-container">
      <h1 className="title-products">Productos</h1>
      <button className="add-product" onClick={handleAddProductClick}>
        Añadir nuevo producto
      </button>
      {showForm && (
        <div className="overlay">
          <div className="modal">
            <ProductForm product={selectedProduct} onClose={handleFormClose} />
          </div>
        </div>
      )}
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            {...product}
            onClick={() => onCardClick(product)}
            onDelete={() => handleDeleteProduct(product.id)}
            onEdit={() => handleEditProduct(product)}
            onToggleVisibility={() => handleToggleVisibility(product)}
          />
        ))}
      </div>
    </div>
  );
};

export default SupplierProducts;
