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
    setIsOpen((prev) => !prev);
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
          width="16"
          height="17"
          viewBox="0 0 16 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.5 6.25L8 10.75L3.5 6.25"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
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
              key={ingredient._id}
              className={`${css.optionItem} ${
                value === ingredient.name ? css.activeOption : ""
              }`}
              onClick={() => handleOptionClick(ingredient.name)}
            >
              <img
                src={ingredient.img}
                alt={ingredient.name}
                className={css.ingredientImg}
              />
              {ingredient.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default IngredientSelect;
