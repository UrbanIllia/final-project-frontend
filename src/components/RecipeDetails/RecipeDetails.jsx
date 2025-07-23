import css from "./RecipeDetails.module.css";

const RecipeDetails = () => {
  return (
    <div className={css.details}>
      <h2 className={css.recipeTitle}>French Omelette</h2>
      <div className={css.imageWrapper}>
        <img />
      </div>
    </div>
  );
};

export default RecipeDetails;
