import React from "react";
import css from "./NoResults.module.css"; // створимо стиль теж

const NoResults = () => {
  return (
    <div className={css.wrapper}>
      <p className={css.message}>No recipes found matching your filters.</p>
    </div>
  );
};

export default NoResults;
