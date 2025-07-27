import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MobileFiltersModal from "./MobileFiltersModal/MobileFiltersModal";
import CategorySelect from "./Category/CategorySelect";
import IngredientSelect from "./Ingredient/IngredientSelect";
import css from "./Filters.module.css";
import { fetchCategoriesThunk } from "../../redux/operations/categoriesOperations.js";
import { fetchIngredientsThunk } from "../../redux/operations/ingredientsOperations.js";
import {
  setCategory,
  setIngredient,
  resetFilters,
  setSearch,
} from "../../redux/slices/filtersSlice.js";
import { fetchRecipesByFiltersThunk } from "../../redux/operations/recipesOperation.js";
import { resetRecipes } from "../../redux/slices/recipesSlice.js";

const Filters = ({ onFiltersChange }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { category, ingredient, search } = useSelector(
    (state) => state.filters
  );
  const categories = useSelector((state) => state.categories.items);
  const ingredients = useSelector((state) => state.ingredients.items);
  const totalItems = useSelector((state) => state.recipes.totalItems || 0);

  useEffect(() => {
    dispatch(fetchCategoriesThunk());
    dispatch(fetchIngredientsThunk());
  }, [dispatch]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleDesktopCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    dispatch(setCategory(selectedCategory));
    dispatch(resetRecipes());

    const newFilters = {
      category: selectedCategory,
      ingredient,
      search,
    };

    dispatch(
      fetchRecipesByFiltersThunk({
        ...newFilters,
        page: 1,
        perPage: 12,
      })
    );

    if (onFiltersChange) {
      onFiltersChange(newFilters);
    }
  };

  const handleDesktopIngredientChange = (e) => {
    const selectedIngredient = e.target.value;
    dispatch(setIngredient(selectedIngredient));
    dispatch(resetRecipes());

    const newFilters = {
      category,
      ingredient: selectedIngredient,
      search,
    };

    dispatch(
      fetchRecipesByFiltersThunk({
        ...newFilters,
        page: 1,
        perPage: 12,
      })
    );

    if (onFiltersChange) {
      onFiltersChange(newFilters);
    }
  };

  const handleDesktopResetFilters = () => {
    dispatch(resetFilters());
    dispatch(setSearch(""));
    dispatch(resetRecipes());

    const resetFiltersData = { category: "", ingredient: "", search: "" };

    dispatch(
      fetchRecipesByFiltersThunk({
        ...resetFiltersData,
        page: 1,
        perPage: 12,
      })
    );

    if (onFiltersChange) {
      onFiltersChange(resetFiltersData);
    }
  };

  const handleMobileFiltersApply = (mobileFilters) => {
    dispatch(setCategory(mobileFilters.category || ""));
    dispatch(setIngredient(mobileFilters.ingredient || ""));
    dispatch(resetRecipes());

    const newFilters = {
      category: mobileFilters.category || "",
      ingredient: mobileFilters.ingredient || "",
      search,
    };

    dispatch(
      fetchRecipesByFiltersThunk({
        ...newFilters,
        page: 1,
        perPage: 12,
      })
    );

    if (onFiltersChange) {
      onFiltersChange(newFilters);
    }
  };

  return (
    <>
      <div className={css.recipeFiltering}>
        <div className={css.leftSide}>
          <h2 className={css.h2reception}>Recipes</h2>
          <p className={css.recipesCount}>{totalItems} recipes</p>
        </div>
        <div className={css.rightSideContainer}>
          <div className={css.filterHeader} onClick={openModal}>
            <span className={css.filterTitle}>Filters</span>
            <svg
              className={css.filterIcon}
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.90822 7.5L23.0918 7.50001C24.1457 7.50001 25 8.35435 25 9.40823C25 9.89532 24.8137 10.364 24.4794 10.7182L18.0769 17.5L18.0769 22.3173C18.0769 23.791 16.5371 24.7586 15.2093 24.1193L15.0554 24.0452C14.3632 23.7119 13.9231 23.0115 13.9231 22.2432L13.9231 17.5L7.52065 10.7182C7.18627 10.364 7 9.89532 7 9.40822C7 8.35434 7.85434 7.5 8.90822 7.5Z"
                stroke="currentColor"
              />
            </svg>
          </div>
          <div className={css.desktopFilters}>
            <button
              type="button"
              className={css.resetBtn}
              onClick={handleDesktopResetFilters}
            >
              Reset Filters
            </button>
            <CategorySelect
              value={category}
              categories={categories}
              onChange={handleDesktopCategoryChange}
            />
            <IngredientSelect
              value={ingredient}
              ingredients={ingredients}
              onChange={handleDesktopIngredientChange}
            />
          </div>
        </div>
      </div>

      {isModalOpen && (
        <MobileFiltersModal
          onClose={closeModal}
          onApplyFilters={handleMobileFiltersApply}
        />
      )}
    </>
  );
};

export default Filters;
