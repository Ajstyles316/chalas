import React, { useState, useEffect } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../../Firebase/config";
import { useForm } from "react-hook-form";
import { createProduct, updateProduct } from "../../../Firebase/api.js";
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
      setValue("price", product.price || "");
      setCategories(product.categories || []);
    }
  }, [product, setValue]);

  const onSubmit = async (data) => {
    try {
      const imageUrl = imageFile
        ? await uploadImage(imageFile)
        : product?.imageUrl;

      const productData = {
        ...data,
        categories,
        imageUrl,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className="relative flex flex-col w-[90%] max-w-lg bg-white p-6 rounded-lg shadow-lg 
           transition-all duration-300 ease-out animate-modal"
      >
        <button
          className="absolute top-3 right-3 flex items-center justify-center w-8 h-8 bg-red-500 text-white text-sm rounded-full hover:bg-red-600"
          onClick={onClose}
        >
          X
        </button>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="name-product"
              className="block text-sm font-medium text-gray-700"
            >
              Nombre del producto
            </label>
            <input
              type="text"
              {...register("name_product", { required: true })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-yellow-500 focus:border-yellow-500"
            />
            {errors.name_product && (
              <p className="mt-1 text-sm text-red-500">
                El nombre del producto es requerido
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Descripción
            </label>
            <textarea
              {...register("description")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm resize-none focus:ring-yellow-500 focus:border-yellow-500"
            />
          </div>

          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Precio
            </label>
            <input
              type="number"
              step="0.01"
              {...register("price", { required: true })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-yellow-500 focus:border-yellow-500"
            />
            {errors.price && (
              <p className="mt-1 text-sm text-red-500">El precio es requerido</p>
            )}
          </div>

          <div>
            <label
              htmlFor="categories"
              className="block text-sm font-medium text-gray-700"
            >
              Categorías
            </label>
            <CategoryTag
              selectedCategories={categories}
              setSelectedCategories={setCategories}
            />
          </div>

          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              Imagen del producto
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 block w-full text-sm text-gray-500 border border-gray-300 rounded-lg cursor-pointer focus:ring-yellow-500 focus:border-yellow-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            {product ? "Actualizar producto" : "Registrar producto"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
