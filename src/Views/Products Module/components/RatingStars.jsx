import React from "react";
import { FaStar } from "react-icons/fa";

import "../Styles/ratingStars.css";

export const RatingStars = () => {
  return (
    <div className="flex ml-0 items-center">
      <FaStar size={32} />
      <FaStar size={32} />
      <FaStar size={32} />
      <FaStar size={32} />
      <FaStar size={32} />
    </div>
  );
};
