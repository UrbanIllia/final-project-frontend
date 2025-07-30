import { useDispatch, useSelector } from "react-redux";
import { selectIngredients } from "../../redux/selectors/ingredientsSelector";
import { useEffect } from "react";
import { fetchIngredientsThunk } from "../../redux/operations/ingredientsOperations";
import s from "./IngredientList.module.css";
import { RiCheckboxBlankCircleFill } from "react-icons/ri";

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
    <ul className={s.ingredientsContainer}>
      {filteredIngredients.map((ingredient, index) => {
        return (
          <li key={index} className={s.ingredientsItem}>
            <RiCheckboxBlankCircleFill className={s.ingredientsIcon} />
            {ingredient.name}-{ingredient.measure}
          </li>
        );
      })}
    </ul>
  );
};

export default IngredientList;
