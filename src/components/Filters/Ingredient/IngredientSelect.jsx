import React from "react";
import css from "./IngredientSelect.module.css";

const IngredientSelect = ({ value, ingredients, onChange }) => {
  return (
    <div className={css.selectGroup}>
      <label className={css.label}>Ingredient</label>
      <select value={value} onChange={onChange} className={css.select}>
        <option value=""></option>
        {ingredients.map((i) => (
          <option key={i} value={i}>
            {i}
          </option>
        ))}
      </select>
    </div>
  );
};

export default IngredientSelect;
