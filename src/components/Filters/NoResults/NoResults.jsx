import React from "react";
import css from "./NoResults.module.css";

const NoResults = ({ onReset }) => {
  return (
    <div className="container">
      <div className={css.centered}>
        <div className={css.wrapper}>
          <div className={css.messageBox}>
            <p className={css.message}>
              We’re sorry! We were not able to find a match.
            </p>
            <button className={css.resetBtn} onClick={onReset}>
              Reset search and filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoResults;
