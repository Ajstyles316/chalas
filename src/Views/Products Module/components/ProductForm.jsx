import React, { useState, useEffect } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../../Firebase/config";
import { useForm } from "react-hook-form";
import { createProduct, updateProduct } from "../../../Firebase/api.js";
import "../Styles/productForm.css";
import CategoryTag from "./CategoryTag.jsx"; // Ajusta la ruta de acuerdo a tu estructura de carpetas

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
      setValue("price", product.price || "");
      setCategories(product.categories || []);
    }
  }, [product, setValue]);

  const onSubmit = async (data) => {
    try {
      // Subir la imagen si se proporcionó un archivo nuevo
      const imageUrl = imageFile
        ? await uploadImage(imageFile)
        : product?.imageUrl;

      const productData = {
        ...data,
        categories,
        imageUrl, // Guardar solo la URL de la imagen
      };

      if (product) {
        // Actualizar el producto existente
        await updateProduct(product.id, productData);
        console.log("Producto actualizado con éxito");
      } else {
        // Crear un nuevo producto
        await createProduct(productData, imageFile);
        console.log("Producto registrado con éxito");
      }

      onClose();
    } catch (e) {
      console.error("Error al registrar o actualizar el producto:", e);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const uploadImage = async (file) => {
    if (!file) return null;

    try {
      const imageRef = ref(storage, `product_images/${file.name}`);
      const snapshot = await uploadBytes(imageRef, file);
      const imageUrl = await getDownloadURL(snapshot.ref);
      return imageUrl;
    } catch (error) {
      console.error("Error al subir la imagen:", error);
      throw error;
    }
  };

  return (
    <div className="form-container">
      <button className="close-button-form" onClick={onClose}>
        X
      </button>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name-product">Nombre del producto</label>
        <input type="text" {...register("name_product", { required: true })} />
        {errors.name_product && (
          <span>El nombre del producto es requerido</span>
        )}

        <label htmlFor="description">Descripción</label>
        <textarea {...register("description")} />

        <label htmlFor="price">Precio</label>
        <input
          type="number"
          step="1.00"
          {...register("price", { required: true })}
        />
        {errors.price && <span>El precio es requerido</span>}

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
