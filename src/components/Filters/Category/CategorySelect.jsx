import React, { useState, useRef, useEffect } from "react";
import css from "./CategorySelect.module.css";

const CategorySelect = ({ value, categories, onChange }) => {
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

  const displayText = value || "Category";

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
            key="placeholder"
            className={`${css.optionItem} ${!value ? css.activeOption : ""}`}
            onClick={() => handleOptionClick("")}
            
          >
            Category
          </li>
          {categories.map((cat) => (
            <li
              key={cat._id}
              className={`${css.optionItem} ${
                value === cat.name ? css.activeOption : ""
              }`}
              onClick={() => handleOptionClick(cat.name)}
            >
              {cat.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategorySelect;
