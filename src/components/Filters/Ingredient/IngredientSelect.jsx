import React, { useState, useRef, useEffect } from "react";
import css from "./IngredientSelect.module.css"; 

const IngredientSelect = ({ value, ingredients, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (optionValue) => {
    onChange({ target: { value: optionValue } });
    setIsOpen(false);
  };

  const displayText = value || "Ingredient"; 

  return (
    <div className={css.customSelect} ref={selectRef}>
      <div className={css.selectHeader} onClick={handleToggle}>
        <span className={value ? css.selectedText : css.placeholderText}>
          {displayText}
        </span>
        <svg
          className={`${css.selectArrow} ${isOpen ? css.arrowUp : ""}`}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M5 6L0.669873 0L9.33013 0L5 6Z" fill="currentColor" />
        </svg>
      </div>

      {isOpen && (
        <ul className={css.optionsList}>
          <li
            className={`${css.optionItem} ${!value ? css.activeOption : ""}`}
            onClick={() => handleOptionClick("")}
          >
            Ingredient
          </li>
          {ingredients.map((ingredient) => (
            <li
              key={ingredient}
              className={`${css.optionItem} ${
                value === ingredient ? css.activeOption : ""
              }`}
              onClick={() => handleOptionClick(ingredient)}
            >
              {ingredient}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default IngredientSelect;
