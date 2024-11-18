import React from "react";
import { FaStar } from "react-icons/fa";

import "../Styles/ratingStars.css";

export const RatingStars = () => {
  return (
    <div className="rating-container">
      <FaStar size={32} />
      <FaStar size={32} />
      <FaStar size={32} />
      <FaStar size={32} />
      <FaStar size={32} />
    </div>
  );
};
