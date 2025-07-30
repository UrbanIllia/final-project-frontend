import { useParams } from "react-router-dom";
import s from "./RecipeDetails.module.css";
import {
  selectRecipeDetails,
  selectRecipesIsLoading,
} from "../../redux/selectors/recipesSelector";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { fetchRecipeByIdThunk } from "../../redux/operations/recipesOperation";
import NotFound from "../NotFound/NotFound";
import ButtonSave from "../ButtonSave/ButtonSave";
import IngredientList from "../IngredientList/IngredientList";
import Loading from "../Loading/Loading";

const RecipeDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const loading = useSelector(selectRecipesIsLoading);

  const recipeDetails = useSelector(selectRecipeDetails);

  const data = recipeDetails?.data;

  useEffect(() => {
    if (!data || data._id !== id) {
      dispatch(fetchRecipeByIdThunk(id));
    }
  }, [dispatch, id, data]);

  if (loading) return <Loading />;
  if (!data) return <NotFound />;

  return (
    <>
      <div className={s.recipeDescriptionContainer}>
        <div className={s.imageWrapper}>
          <img src={data.thumb} alt={data.title} className={s.recipeImage} />
        </div>
        <h2 className={s.recipeTitle}>{data.title}</h2>
        <div className={s.recipeDescriptionGeneral}>
          <div className={s.generalANDButtonContainer}>
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
            <ButtonSave id={data._id} />
          </div>
          <div className={s.recipeDetailsContainer}>
            <div className={s.recipeAboutContainer}>
              <h3 className={s.recipeAboutTitle}>About recipe</h3>
              <p className={s.recipeAboutDescription}>{data.description}</p>
            </div>
            <div className={s.recipeIngredientsContainer}>
              <h3 className={s.recipeAboutTitle}>Ingredients:</h3>
              <IngredientList ingredientIds={data.ingredients} />
            </div>

            <div className={s.recipePreparationContainer}>
              <h3 className={s.recipeAboutTitle}>Preparation Steps:</h3>
              <p className={s.recipePreparatioDescription}>
                {data.instructions.split("\n").map((line, index) => (
                  <React.Fragment key={index}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipeDetails;
