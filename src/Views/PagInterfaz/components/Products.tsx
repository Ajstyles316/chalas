import React, { useEffect, useState } from "react";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import appFirebase from "../../../Firebase/config";

const db = getFirestore(appFirebase);

type Product = {
  id: string; // Se incluye el ID de Firestore
  categories: string[];
  description: string;
  imageUrl: string;
  name_product: string;
  provider: string;
  provider_id: string;
};

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const fetchedProviders: Product[] = querySnapshot.docs.map((doc) => ({
          id: doc.id, // Incluye el ID de Firestore
          categories: doc.data().categories || [], // Garantiza que sea un array
          description: doc.data().description || "Sin descripción",
          imageUrl: doc.data().imageUrl || "https://via.placeholder.com/150",
          name_product: doc.data().name_product || "Producto sin nombre",
          provider: doc.data().provider || "Proveedor desconocido",
          provider_id: doc.data().provider_id
        }));
        setProducts(fetchedProviders);
      } catch (error) {
        console.error("Error fetching providers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="bg-white p-6 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Productos</h1>
        <div className="space-y-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex flex-col md:flex-row items-center bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
            >
              {/* Imagen del producto */}
              <img
                src={product.imageUrl}
                alt={product.name_product}
                className="w-32 h-32 md:w-40 md:h-40 rounded-lg object-cover"
              />
              {/* Información del producto */}
              <div className="flex-1 mt-4 md:mt-0 md:ml-6">
                <h2 className="text-xl font-semibold text-gray-700">
                  {product.name_product}
                </h2>
                <p className="text-sm text-gray-500">{product.description}</p>
                <div className="flex items-center mt-2">
                  <span className="text-sm font-medium text-gray-600">
                    Proveedor:
                  </span>
                  <span className="ml-2 text-sm text-gray-700">
                    {product.provider}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {product.categories.map((category, i) => (
                    <span
                      key={i}
                      className="text-xs font-medium bg-orange-100 text-orange-600 py-1 px-3 rounded-full"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
