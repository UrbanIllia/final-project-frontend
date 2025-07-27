import React, { useEffect } from "react"; // Убрали useState, так как локальное состояние не нужно
import { useDispatch, useSelector } from "react-redux";
import {
  setCategory,
  setIngredient,
  resetFilters,
  setSearch,
} from "../../../redux/slices/filtersSlice.js";
import { fetchRecipesByFiltersThunk } from "../../../redux/operations/recipesOperation.js";
import { fetchCategoriesThunk } from "../../../redux/operations/categoriesOperations.js";
import { fetchIngredientsThunk } from "../../../redux/operations/ingredientsOperations.js";
import CategorySelect from "../Category/CategorySelect";
import IngredientSelect from "../Ingredient/IngredientSelect";
import css from "./MobileFiltersModal.module.css";

const MobileFiltersModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const { category, ingredient, search } = useSelector(
    (state) => state.filters
  );

  const categories = useSelector((state) => state.categories.items);
  const ingredients = useSelector((state) => state.ingredients.items);

    useEffect(() => {
      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.overflow = "";
      };
    }, []);

  useEffect(() => {
    dispatch(fetchCategoriesThunk());
    dispatch(fetchIngredientsThunk());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchRecipesByFiltersThunk({ category, ingredient, search }));
  }, [dispatch, category, ingredient, search]);

  const handleCategoryChange = (e) => {
    dispatch(setCategory(e.target.value));
  //  onClose(); 
  };

  const handleIngredientChange = (e) => {
    dispatch(setIngredient(e.target.value));
    // onClose();
  };

  const handleResetFilters = () => {
    dispatch(resetFilters()); 
    dispatch(setSearch("")); 

    dispatch(
      fetchRecipesByFiltersThunk({ category: "", ingredient: "", search: "" })
    );
    onClose(); 
  };

  return (
    <div className={css.backdrop}>
      <div className={css.modal}>
        <div className={css.modalHeader}>
          <h3 className={css.title}>Filters</h3>
          <button className={css.closeButton} onClick={onClose}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.125 12C19.125 15.935 15.935 19.125 12 19.125C8.06497 19.125 4.875 15.935 4.875 12C4.875 8.06497 8.06497 4.875 12 4.875C15.935 4.875 19.125 8.06497 19.125 12Z"
                stroke="black"
              />
              <path
                d="M14.7745 9.25965L12 12.0341M12 12.0341L9.22559 14.8086M12 12.0341L14.7745 14.8086M12 12.0341L9.22559 9.25964"
                stroke="black"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <CategorySelect
          value={category}
          categories={categories} 
          onChange={handleCategoryChange}
        />

        <IngredientSelect
          value={ingredient}
          ingredients={ingredients} 
          onChange={handleIngredientChange}
        />

        <div className={css.btnGroup}>
          <button onClick={handleResetFilters} className={css.resetBtn}>
            Reset filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileFiltersModal;
