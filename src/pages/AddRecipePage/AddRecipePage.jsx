import AddRecipeForm from "../../components/AddRecipeForm/AddRecipeForm";
import css from "./AddRecipePage.module.css";

export default function AddRecipePage() {
  return (
    <div className={css.page}>
      <h2 className={css.title}>Add Recipe</h2>
      <AddRecipeForm />
    </div>
  );
}
