import { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import RecipeCard from "../RecipeCard/RecipeCard";
import css from "./RecipesList.module.css";
import Loading from "../Loading/Loading";

const RecipesList = () => {
  const recipes = useSelector((state) => state.recipes.recipes);
  const isLoading = useSelector((state) => state.recipes.isLoading);
  const error = useSelector((state) => state.recipes.error);
  const search = useSelector((state) => state.filters.search || "");

  useEffect(() => {
    if (error) {
      toast.error(`Error: ${error}`);
    }
  }, [error]);

  useEffect(() => {
    if (!isLoading && recipes.length === 0 && search) {
      toast.info(`No recipes found for "${search}"`);
    }
  }, [recipes, isLoading, search]);

  if (isLoading)
    return (
      <p className={css.message}>
        <Loading />
      </p>
    );

  return (
    <ul className={css.recipe_list}>
      {recipes.map((recipe) => (
        <li key={recipe._id}>
          <RecipeCard recipe={recipe} />
        </li>
      ))}
    </ul>
  );
};

export default RecipesList;
