import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { createProduct, updateProduct } from "../../../Firebase/api.js";
import "../Styles/productForm.css";
import CategoryTag from "./CategoryTag.jsx";

const ProductForm = ({ product, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const [imageFile, setImageFile] = useState(null);
  const [categories, setCategories] = useState(
    product ? product.categories || [] : []
  );

  useEffect(() => {
    if (product) {
      setValue("name_product", product.name_product);
      setValue("description", product.description);
      setCategories(product.categories || []);
    }
  }, [product, setValue]);

  const onSubmit = async (data) => {
    try {
      const productData = {
        ...data,
        categories,
        imageUrl: imageFile ? await uploadImage(imageFile) : product?.imageUrl,
      };
      if (product) {
        await updateProduct(product.id, productData);
        console.log("Producto actualizado con éxito");
      } else {
        await createProduct(productData, imageFile);
        console.log("Producto registrado con éxito");
      }
      onClose();
    } catch (e) {
      console.error("Error al registrar o actualizar el producto:", e);
    }
  };

  const uploadImage = async (file) => {
    return file;
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name-product">Nombre del producto</label>
        <input type="text" {...register("name_product", { required: true })} />
        {errors.name_product && <span>El nombre de producto es requerido</span>}

        <label htmlFor="description">Descripción</label>
        <textarea {...register("description")} />

        <label htmlFor="categories">Categorías</label>
        <CategoryTag
          selectedCategories={categories}
          setSelectedCategories={setCategories}
        />

        <label htmlFor="image">Imagen del producto</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />

        <button type="submit">
          {product ? "Actualizar producto" : "Registrar producto"}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
