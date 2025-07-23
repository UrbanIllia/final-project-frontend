import { useSelector } from "react-redux";
import RecipeCard from "../RecipeCard/RecipeCard";
import css from "./RecipesList.module.css";

const RecipesList = () => {
  const recipes = useSelector((state) => state.recipes.recipes);
  const isLoading = useSelector((state) => state.recipes.isLoading);
  const error = useSelector((state) => state.recipes.error);

  if (isLoading) return <p className={css.message}>Loading...</p>;
  if (error) return <p className={css.message}>Error: {error}</p>;
  if (recipes.length === 0)
    return <p className={css.message}>No recipes found</p>;
console.log("recipes in list:", recipes);

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
