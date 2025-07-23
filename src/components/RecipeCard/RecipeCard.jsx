import css from "./RecipeCard.module.css";

const RecipeCard = ({ recipe }) => {
  return (
    <div className={css.recipe_card}>
      <img src={recipe.thumb} alt={recipe.title} className={css.recipe_img} />
      <h3>{recipe.title}</h3>
    </div>
  );
};

export default RecipeCard;
