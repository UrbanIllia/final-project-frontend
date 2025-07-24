import { useParams } from "react-router-dom";
import s from "./RecipeDetails.module.css";
import { selectRecipeDetails } from "../../redux/selectors/recipesSelector";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchRecipeByIdThunk } from "../../redux/operations/recipesOperation";
import NotFound from "../NotFound/NotFound";
import ButtonSave from "../ButtonSave/ButtonSave";
import IngredientList from "../IngredientList/IngredientList";

const RecipeDetails = () => {
  // const { recipeId } = useParams();
  const dispatch = useDispatch();

  const recipeDetails = useSelector(selectRecipeDetails);
  const data = recipeDetails?.data;

  //  useEffect(() => {
  //   if(data){ dispatch(fetchRecipeByIdThunk(recipeId));}

  // }, [dispatch,recipeId]);

  useEffect(() => {
    dispatch(fetchRecipeByIdThunk("6462a8f74c3d0ddd28897ffc"));
  }, [dispatch]);

  return (
    <>
      {data ? (
        <div className={s.recipeDescriptionContainer}>
          <div className={s.imageWrapper}>
            <img src={data.thumb} alt={data.title} className={s.recipeImage} />
          </div>
          <h2 className={s.recipeTitle}>{data.title}</h2>
          <div className={s.recipeGeneralInfoContainer}>
            <p className={s.recipeGeneralInfoTitle}>General informations</p>
            <p>
              <span className={s.recipeCategoryAccent}>Category:</span>{" "}
              {data.category}
            </p>
            <p>
              <span className={s.recipeCategoryAccent}>Cooking time:</span>{" "}
              {data.time} minutes
            </p>
            <p>
              <span className={s.recipeCategoryAccent}>Caloric content:</span>
              {data.calories
                ? `Approximately ${data.calories} kcal per serving`
                : "N/A"}
            </p>
          </div>
          <ButtonSave />
          <div className={s.recipeDetailsContainer}>
            <ul>
              <li>
                <h3>About recipe</h3>
                <p>{data.description}</p>
              </li>
              <li>
                <h3>Ingredients:</h3>
                <IngredientList ingredientIds={data.ingredients} />
              </li>
              <li></li>
            </ul>
          </div>
        </div>
      ) : (
        <NotFound />
      )}
    </>
  );
};

export default RecipeDetails;
