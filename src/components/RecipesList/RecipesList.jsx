import RecipeCard from "../RecipeCard/RecipeCard";
import css from "./RecipesList.module.css";

const RecipesList = () => {
  return (
    <ul className={css.recipe_list}>
      <RecipeCard />
      <RecipeCard />
      <RecipeCard />
      <RecipeCard />
      <RecipeCard />
      <RecipeCard />
      <RecipeCard />
      <RecipeCard />
      <RecipeCard />
    </ul>
  );
};

export default RecipesList;
