import { useDispatch, useSelector } from "react-redux";
import { selectIngredients } from "../../redux/selectors/ingredientsSelector";
import { useEffect } from "react";
import { fetchIngredientsThunk } from "../../redux/operations/ingredientsOperations";

const IngredientList = ({ ingredientIds }) => {
  const dispatch = useDispatch();
  const allIngredients = useSelector(selectIngredients);

  useEffect(() => {
    if (!allIngredients.length) {
      dispatch(fetchIngredientsThunk());
    }
  }, [dispatch, allIngredients.length]);

  const filteredIngredients = ingredientIds
    .map(({ id, measure }) => {
      const ingredient = allIngredients.find((ing) => ing._id === id);

      return { ...ingredient, measure };
    })
    .filter(Boolean);

  return (
    <ul>
      {filteredIngredients.map((ingredient, index) => {
        return (
          <li key={index}>
            {ingredient.name}-{ingredient.measure}
          </li>
        );
      })}
    </ul>
  );
};

export default IngredientList;
