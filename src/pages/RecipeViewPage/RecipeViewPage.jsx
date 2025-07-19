import NotFound from "../../components/NotFound/NotFound";
import RecipeDetails from "../../components/RecipeDetails/RecipeDetails";
import css from "./RecipeViewPage.module.css";

const RecipeViewPage = () => (
  <div className={css.page}>
    <RecipeDetails />
    <NotFound />
  </div>
);
export default RecipeViewPage;
