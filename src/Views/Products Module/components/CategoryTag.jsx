import React, { useState } from "react";
import "../Styles/categoryTag.css";

const CategoryTag = ({ selectedCategories, setSelectedCategories }) => {
  const [options, setOptions] = useState([
    "Música",
    "Decoración",
    "Comida",
    "Bebidas",
    "Pastelería",
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSelect = (option) => {
    if (!selectedCategories.includes(option)) {
      setSelectedCategories([...selectedCategories, option]);
    }
  };

  const handleRemove = (option) => {
    setSelectedCategories(selectedCategories.filter((tag) => tag !== option));
  };

  const handleCreateOption = () => {
    if (inputValue.trim() && !options.includes(inputValue)) {
      setOptions([...options, inputValue]);
      setSelectedCategories([...selectedCategories, inputValue]);
      setInputValue("");
    }
  };

  return (
    <div className="category-tag-container">
      <div className="selected-tags">
        {selectedCategories.map((tag) => (
          <span key={tag} className="tag">
            {tag}
            <span onClick={() => handleRemove(tag)} className="remove-tag">
              &times;
            </span>
          </span>
        ))}
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Seleccione una categoría"
        className="input-field"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleCreateOption();
          }
        }}
      />
      <div className="options-list">
        {options.map((option) => (
          <div
            key={option}
            onClick={() => handleSelect(option)}
            className={`option-item ${
              selectedCategories.includes(option) ? "option-selected" : ""
            }`}
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryTag;
