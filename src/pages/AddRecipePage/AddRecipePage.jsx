import AddRecipeForm from "../../components/AddRecipeForm/AddRecipeForm";
import css from "./AddRecipePage.module.css";

const AddRecipePage = () => (
  <div className={css.add}>
    <p>Add Recipe Page</p>
    <AddRecipeForm />
  </div>
);
export default AddRecipePage;
