import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoriesThunk } from "../../redux/operations/categoriesOperations.js";
import { fetchIngredientsThunk } from "../../redux/operations/ingredientsOperations.js";
import { fetchRecipesByFiltersThunk } from "../../redux/operations/recipesOperation.js";
import { setFilters, resetFilters } from "../../redux/slices/filtersSlice";

import CategorySelect from "./Category/CategorySelect.jsx";
import IngredientSelect from "./Ingredient/IngredientSelect.jsx";
import MobileFiltersModal from "./MobileFiltersModal/MobileFiltersModal.jsx";

import css from "./Filters.module.css";

const Filters = () => {
  
  const dispatch = useDispatch();
  const [category, setCategory] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const { items: categories = [] } = useSelector((state) => state.categories);
  const { items: ingredients = [] } = useSelector((state) => state.ingredients);
  const totalItems = useSelector((state) => state.recipes.totalItems || 0);
 const search = useSelector((state) => state.filters.search || "");


  const isMobile = window.innerWidth < 768;

  useEffect(() => {
    dispatch(fetchCategoriesThunk());
    dispatch(fetchIngredientsThunk());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setFilters({ category, ingredient }));
  }, [category, ingredient, dispatch]);

useEffect(() => {
  dispatch(fetchRecipesByFiltersThunk({ category, ingredient, search }));
}, [dispatch, category, ingredient, search]);


  const handleReset = () => {
    setCategory("");
    setIngredient("");
    dispatch(resetFilters());
  };

  return (
    <div className={css.recipeFiltering}>
      <div className={css.leftSide}>
        <h2 className={css.h2reception}>Recipes</h2>
        <p className={css.recipesCount}>{totalItems} recipes</p>
      </div>

      {!isMobile && (
        <div className={css.rightSide}>
          <button onClick={handleReset} className={css.resetBtn}>
            Reset filters
          </button>
          <CategorySelect
            value={category}
            categories={categories.map((cat) => cat.name)}
            onChange={(e) => setCategory(e.target.value)}
          />
          <IngredientSelect
            value={ingredient}
            ingredients={ingredients.map((ing) => ing.name)}
            onChange={(e) => setIngredient(e.target.value)}
          />
        </div>
      )}

      {isMobile && (
        <div
          className={css.filterCategories}
          onClick={() => setIsMobileFiltersOpen(true)}
        >
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
      )}

      {isMobile && isMobileFiltersOpen && (
        <MobileFiltersModal
          onClose={() => setIsMobileFiltersOpen(false)}
          category={category}
          ingredient={ingredient}
          setCategory={setCategory}
          setIngredient={setIngredient}
          onReset={handleReset}
          categories={categories.map((c) => c.name)}
          ingredients={ingredients.map((i) => i.name)}
        />
      )}
    </div>
  );
};

export default Filters;
