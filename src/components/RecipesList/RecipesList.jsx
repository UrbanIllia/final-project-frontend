import { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import RecipeCard from "../RecipeCard/RecipeCard";
import css from "./RecipesList.module.css";
import Loading from "../Loading/Loading";

const RecipesList = ({ recipes: propRecipes, totallItems }) => {
  const reduxRecipes = useSelector((state) => state.recipes.recipes);
  const isLoading = useSelector((state) => state.recipes.isLoading);
  const error = useSelector((state) => state.recipes.error);
  const search = useSelector((state) => state.filters.search || "");

  const recipesToDisplay = propRecipes || reduxRecipes;

  useEffect(() => {
    if (error && !propRecipes) {
      toast.error(`Error: ${error}`);
    }
  }, [error, propRecipes]);

  useEffect(() => {
    if (!isLoading && recipesToDisplay.length === 0 && search && !propRecipes) {
      toast.info(`No recipes found for "${search}"`);
    }
  }, [recipesToDisplay, isLoading, search, propRecipes]);

  if (isLoading && !propRecipes) {
    return (
      <div className={css.loaderWrapper}>
        <Loading />
      </div>
    );
  }

  if (!recipesToDisplay || recipesToDisplay.length === 0) {
    return <p className={css.message}>No recipes available.</p>;
  }

  return (
    <>
      {totallItems > 0 && (
        <p className={css.total}>
          {totallItems} {totallItems === 1 ? "recept" : "recepts"}
        </p>
      )}
      <ul className={css.recipe_list}>
        {recipesToDisplay.map((recipe) => (
          <li key={recipe._id}>
            <RecipeCard recipe={recipe} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default RecipesList;
