import React from "react";
import css from "./MobileFiltersModal.module.css";
import CategorySelect from "../Category/CategorySelect.jsx";
import IngredientSelect from "../Ingredient/IngredientSelect.jsx";

const MobileFiltersModal = ({
  onClose,
  category,
  ingredient,
  setCategory,
  setIngredient,
  onReset,
  categories,
  ingredients,
}) => {
  return (
    <div className={css.backdrop}>
      <div className={css.modal}>
        <h3 className={css.title}>Filters</h3>

        <CategorySelect
          value={category}
          categories={categories}
          onChange={(e) => setCategory(e.target.value)}
        />
        <IngredientSelect
          value={ingredient}
          ingredients={ingredients}
          onChange={(e) => setIngredient(e.target.value)}
        />

        <div className={css.btnGroup}>
          <button onClick={onReset} className={css.resetBtn}>
            Reset
          </button>
          <button onClick={onClose} className={css.applyBtn}>
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileFiltersModal;
