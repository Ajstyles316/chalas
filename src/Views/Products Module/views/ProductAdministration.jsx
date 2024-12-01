import React, { useState, useEffect } from "react";
import ProductForm from "../components/ProductForm"; // Componente para crear o editar productos
import {
  getVisibleProducts,
  softDeleteProduct,
  updateProduct,
} from "../../../Firebase/api"; // Importa funciones necesarias de la API
import "../Styles/productAdministration.css";
import editIcon from "../../../assets/svg/edit_icon.svg";
import trashIcon from "../../../assets/svg/trash_icon.svg";
import eyeIcon from "../../../assets/svg/eye_icon.svg";
import eyeOffIcon from "../../../assets/svg/eye_off_icon.svg";
import Footer from "../../Client/components/Footer";
import { useAuth } from "../../../context/AuthContext";

function ProductAdministration() {

  const {user} = useAuth();


  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    description: "",
    category: "",
  });
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showSelectColumn, setShowSelectColumn] = useState(false);
  const [productsLoaded, setProductsLoaded] = useState(false);

  const fetchProducts = async () => {
    try {
      // console.log({user})
      const visibleProducts = await getVisibleProducts(user.uid);
      setProducts(visibleProducts);
      setProductsLoaded(true);
    } catch (error) {
      console.error("Error al obtener productos :", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const filteredProducts = products.filter(
    (product) =>
      (!filters.name ||
        product.name_product
          .toLowerCase()
          .includes(filters.name.toLowerCase())) &&
      (!filters.description ||
        product.description
          .toLowerCase()
          .includes(filters.description.toLowerCase())) &&
      (!filters.category ||
        (product.categories || []).some((category) =>
          category.toLowerCase().includes(filters.category.toLowerCase())
        ))
  );

  const handleProductSelect = (productId) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.includes(productId)
        ? prevSelected.filter((id) => id !== productId)
        : [...prevSelected, productId]
    );
  };

  const handleDeleteSelected = async () => {
    try {
      for (const productId of selectedProducts) {
        await softDeleteProduct(productId);
      }
      setSelectedProducts([]);
      await fetchProducts();
    } catch (error) {
      console.error("Error al eliminar productos:", error);
    }
  };

  // Nueva función para manejar la eliminación individual
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

  const handleCloseForm = () => {
    setShowForm(false);
    fetchProducts();
  };

  const toggleSelectionMode = () => {
    setShowSelectColumn(!showSelectColumn);
    setSelectedProducts([]); // Limpia la selección cuando se cambia el modo
  };

  return (
    <>
      <div className="admin-product-view">
        <div className="menu">
          <button onClick={handleAddProductClick}>Crear Nuevo</button>
          <button onClick={toggleSelectionMode}>
            {showSelectColumn ? "Cancelar selección" : "Seleccionar"}
          </button>
          {showSelectColumn && (
            <button
              onClick={handleDeleteSelected}
              disabled={selectedProducts.length === 0}
            >
              Eliminar seleccionados
            </button>
          )}
          <button onClick={fetchProducts}>Listar</button>
        </div>
        {showForm && (
          <div className="overlay">
            <div className="modal">
              <button className="close-button" onClick={handleCloseForm}>
                X
              </button>
              <ProductForm
                product={selectedProduct}
                onClose={handleCloseForm}
              />
            </div>
          </div>
        )}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Buscar por nombre"
            name="name"
            value={filters.name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            placeholder="Buscar por descripción"
            name="description"
            value={filters.description}
            onChange={handleInputChange}
          />
          <input
            type="text"
            placeholder="Buscar por categoría"
            name="category"
            value={filters.category}
            onChange={handleInputChange}
          />
        </div>
        <div className="product-table">
          {!productsLoaded ? (
            <p>No hay productos cargados. Presiona "Listar" para verlos.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  {showSelectColumn && <th>Seleccionar</th>}
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th>Categoría(s)</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <tr key={product.id}>
                      {showSelectColumn && (
                        <td>
                          <input
                            className="check"
                            type="checkbox"
                            checked={selectedProducts.includes(product.id)}
                            onChange={() => handleProductSelect(product.id)}
                          />
                        </td>
                      )}
                      <td>{product.name_product}</td>
                      <td>{product.description}</td>
                      <td>{(product.categories || []).join(", ")}</td>
                      <td className="actions">
                        <button
                          className="edit-button"
                          onClick={() => handleEditProduct(product)}
                        >
                          <img src={editIcon} alt="Editar" />
                        </button>
                        <button
                          className="delete-button"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <img src={trashIcon} alt="Eliminar" />
                        </button>
                        <button
                          className="visibility-button"
                          onClick={() => handleToggleVisibility(product)}
                        >
                          <img
                            src={product.visible ? eyeIcon : eyeOffIcon}
                            alt="Visibilidad"
                          />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={showSelectColumn ? 5 : 4}>
                      No se encontraron productos
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ProductAdministration;
