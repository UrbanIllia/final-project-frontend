import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../redux/slices/categoriesSlice";
import css from "./Filters.module.css";

const Filters = () => {
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.categories?.items || []);
  const isLoading = useSelector((state) => state.categories?.isLoading);
  const error = useSelector((state) => state.categories?.error);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className={css.recipeFiltering}>
      <div className={css.leftSide}>
        <h2 className={css.h2reception}>Recepies</h2>
        <p className={css.recipesCount}>{categories.length} recipes</p>
      </div>

      <div className={css.filterCategories}>
        <p className={css.textFilters}>Filters</p>
        <svg
          className={css.svgFilter}
          width="16"
          height="15"
          viewBox="0 0 16 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.68117 1.125L13.3188 1.12501C14.1092 1.12501 14.75 1.76576 14.75 2.55617C14.75 2.92149 14.6103 3.27298 14.3595 3.53863L9.55769 8.625L9.55769 12.1462C9.55769 13.294 8.35844 14.0476 7.32425 13.5496C6.7851 13.29 6.44231 12.7445 6.44231 12.1462L6.44231 8.625L1.64049 3.53863C1.3897 3.27298 1.25 2.92149 1.25 2.55617C1.25 1.76576 1.89076 1.125 2.68117 1.125Z"
            stroke="black"
          />
        </svg>
      </div>

      {isLoading && <p className={css.loadingRecept}>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Filters;
