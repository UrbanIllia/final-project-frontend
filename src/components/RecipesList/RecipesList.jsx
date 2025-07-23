import { useSelector } from "react-redux";
import RecipeCard from "../RecipeCard/RecipeCard";
import css from "./RecipesList.module.css";

const RecipesList = () => {
const recipes = useSelector((state) => state.recipes.recipes);
  const isLoading = useSelector((state) => state.recipes.isLoading);
  const error = useSelector((state) => state.recipes.error);
  const searchQuery = useSelector((state) => state.filters.search || ""); 

  if (isLoading) return <p className={css.message}>Loading...</p>;
  if (error) return <p className={css.message}>Error: {error}</p>;

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (filteredRecipes.length === 0)
    return <p className={css.message}>No recipes found</p>;

  return (
    <ul className={css.recipe_list}>
      {filteredRecipes.map((recipe) => (
        <li key={recipe._id}>
          <RecipeCard recipe={recipe} />
        </li>
      ))}
    </ul>
  );
};

export default RecipesList;
