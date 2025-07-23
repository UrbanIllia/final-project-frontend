import React, { useState, useRef, useEffect } from "react";
import css from "./CategorySelect.module.css";

const CategorySelect = ({ value, categories, onChange }) => {
  const [isOpen, setIsOpen] = useState(false); // Состояние для открытия/закрытия выпадающего списка
  const selectRef = useRef(null); // Ссылка на основной контейнер для отслеживания кликов вне компонента

  // Обработчик клика вне компонента для закрытия списка
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
    onChange({ target: { value: optionValue } }); // Имитируем событие onChange для совместимости с родителем
    setIsOpen(false); // Закрываем список после выбора
  };

  // Текст для отображения: либо выбранная категория, либо "Category"
  const displayText = value || "Category";

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
          <path d="M5 6L0.669873 0L9.33013 0L5 6Z" fill="currentColor" />{" "}
          {/* currentColor для легкости стилизации */}
        </svg>
      </div>

      {isOpen && (
        <ul className={css.optionsList}>
          {/* Опция по умолчанию "Category" (или "Ingredient") */}
          <li
            className={`${css.optionItem} ${!value ? css.activeOption : ""}`}
            onClick={() => handleOptionClick("")}
          >
            Category
          </li>
          {categories.map((category) => (
            <li
              key={category}
              className={`${css.optionItem} ${
                value === category ? css.activeOption : ""
              }`}
              onClick={() => handleOptionClick(category)}
            >
              {category}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategorySelect;
