import React from "react";
import css from "../../Filters/Category/CategorySelect.module.css";

const CategorySelect = ({ value, categories, onChange }) => {
  return (
    <div className={css.selectGroup}>
      <label className={css.label}>Category</label>
      <select value={value} onChange={onChange} className={css.select}>
        <option value=""></option>
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategorySelect;
