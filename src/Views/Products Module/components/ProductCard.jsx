import React from "react";
import "../Styles/productCard.css";
import edit from "../../../assets/svg/edit_icon.svg";
import trash from "../../../assets/svg/trash_icon.svg";
import eye from "../../../assets/svg/eye_icon.svg";
import eye_off from "../../../assets/svg/eye_off_icon.svg";
import { useAuth } from "../../../context/AuthContext";

const ProductCard = ({
  id,
  name_product,
  description,
  provider,
  imageUrl,
  visible,
  isClient,
  onClick,
  onDelete,
  onEdit,
  onToggleVisibility,
  onAddToCart,
}) => {
  const { user } = useAuth();
  console.log({ user });
  const handleAddToCart = () => {
    navigate("/transacciones", { state: { mostrarCarrito: true } });
  };
  return (
    <div
      className={`flex flex-col items-center h-[540px] w-[400px] bg-[#FFFFFF] rounded-[28px] border-t-2 border-r-2 border-b-8 border-l-2 border-black ${
        !visible ? "bg-gray-200 opacity-60" : ""
      }`}
      onClick={onClick}
    >
      <img
        src={imageUrl || "https://via.placeholder.com/150"}
        alt={name_product}
        className="w-[344px] h-[284px] rounded-[28px] mt-[28px] border-2 border-black"
      />
      <div className="w-full px-9">
        <h1 className="text-black font-poppins text-[18px] font-bold uppercase">
          {name_product}
        </h1>
        <h2 className="text-[#FB9153] font-poppins text-[16px] font-bold capitalize">
          {user.profile.storeName}
        </h2>
        <p className="text-black font-poppins text-[20px] mt-2">
          {description}
        </p>
      </div>
      {!isClient && (
        <div className="buttons-container">
          <button
            className="flex justify-center items-center ml-5 w-11 h-11 bg-[#1375C0] rounded-lg border-t-2 border-r-2 border-b-4 border-l-2 border-black"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(id);
            }}
          >
            <img src={edit} alt="Editar" className="w-5" />
          </button>
          <button
            className="flex justify-center items-center ml-5 w-11 h-11 bg-[#E50E25] rounded-lg border-t-2 border-r-2 border-b-4 border-l-2 border-black"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(id);
            }}
          >
            <img src={trash} alt="Eliminar" className="w-5" />
          </button>
          <button
            className="flex justify-center items-center ml-5 w-11 h-11 bg-white rounded-lg border-t-2 border-r-2 border-b-4 border-l-2 border-black"
            onClick={(e) => {
              e.stopPropagation();
              onToggleVisibility(id, !visible);
            }}
          >
            <img
              src={visible ? eye : eye_off}
              alt="Visibilidad"
              className="w-5"
            />
          </button>
        </div>
      )}
      {/* Botón del cliente (opcional) */}
      {/* {isClient && (
        <div className="flex justify-center items-center mt-4">
          <button
            className="flex justify-center items-center w-[348px] h-12 bg-[#FB9153] text-white font-poppins text-[16px] font-semibold uppercase rounded-[20px] border-2 border-[#FB9153] transition-transform transform hover:scale-105 hover:bg-[#fda65a]"
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart();
            }}
          >
            Agregar
          </button>
        </div>
      )} */}
    </div>
  );
};

export default ProductCard;
