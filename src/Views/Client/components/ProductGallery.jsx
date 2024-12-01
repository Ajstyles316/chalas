import React, { useState } from "react";
import { Hits } from "react-instantsearch";
import { useNavigate } from "react-router-dom";
import ProductCardDetailed from "../../Products Module/components/ProductCardDetailed";

const ProductCard = ({ hit }) => {
  const navigate = useNavigate();
  const [showDetail, setShowDetail] = useState(false);

  const handleCardClick = () => {
    setShowDetail(true);
  };

  const handleCloseModal = () => {
    setShowDetail(false);
  };
  return (
    <>
      <div onClick={() => handleCardClick()}>
        <img
          src={hit.imageUrl}
          alt={hit.name_product}
          className="w-full h-48 object-cover mb-4 rounded"
        />
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {hit.name_product}
        </h3>
        <p className="text-gray-600">{hit.description}</p>
        <p className="text-sm text-gray-600 cursor-pointer hover:text-gray-800">
          Proveedor: {hit.provider}
        </p>
      </div>
      {showDetail && (
        <div className="overlay-item" onClick={handleCloseModal}>
          <div className="modal-item" onClick={(e) => e.stopPropagation()}>
            <ProductCardDetailed
              name_product={hit.name_product}
              description={hit.description}
              provider={hit.provider}
              provider_id={hit.provider_id}
              imageUrl={hit.imageUrl}
              categories={hit.categories}
            />
          </div>
        </div>
      )}
    </>
  );
};
const ProductGallery = () => {
  return (
    <div>
      <Hits
        classNames={{
          list: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8",
          item: "bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300",
        }}
        hitComponent={ProductCard}
      />
    </div>
  );
};

export default ProductGallery;
