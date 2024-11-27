import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import ProductForm from "./ProductForm";
import {
  getVisibleProducts,
  softDeleteProduct,
  updateProduct,
} from "../../../Firebase/api.js";

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
    return (
      <div className="flex items-center justify-center h-screen text-lg font-semibold text-gray-500">
        Cargando productos...
      </div>
    );
  }

  return (
    <div className="flex flex-col w-4/5 mx-auto bg-white rounded-2xl overflow-hidden">
      <h1 className="text-center font-poppins font-semibold text-2xl mt-8 mb-5">
        Productos
      </h1>
      <button
        className="w-48 h-14 ml-9 bg-orange-400 rounded-xl border-2 border-black shadow-lg hover:scale-105 transition-all"
        onClick={handleAddProductClick}
      >
        Añadir nuevo producto
      </button>
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-lg p-5 animate-fade-in">
            <ProductForm product={selectedProduct} onClose={handleFormClose} />
          </div>
        </div>
      )}
      <div className="grid grid-cols-3 gap-9 p-9 justify-items-center overflow-x-auto sm:grid-cols-2 xs:grid-cols-1">
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
