// import { useDispatch, useSelector } from "react-redux";
// import { selectIngredients } from "../../redux/selectors/ingredientsSelector";
// import { useEffect } from "react";
// import { fetchIngredientsThunk } from "../../redux/operations/ingredientsOperations";
// import s from "./IngredientList.module.css";
// import { RiCheckboxBlankCircleFill } from "react-icons/ri";

// const IngredientList = ({ ingredientIds }) => {
//   const dispatch = useDispatch();
//   const allIngredients = useSelector(selectIngredients);

//   useEffect(() => {
//     if (!allIngredients.length) {
//       dispatch(fetchIngredientsThunk());
//     }
//   }, [dispatch, allIngredients.length]);

//   const filteredIngredients = ingredientIds
//     .map(({ id, measure }) => {
//       const ingredient = allIngredients.find((ing) => ing._id === id);

//       return { ...ingredient, measure };
//     })
//     .filter(Boolean);

//   return (
//     <ul className={s.ingredientsContainer}>
//       {filteredIngredients.map((ingredient, index) => {
//         return (
//           <li key={index} className={s.ingredientsItem}>
//             <RiCheckboxBlankCircleFill className={s.ingredientsIcon} />
//             {ingredient.name} — {ingredient.measure}
//           </li>
//         );
//       })}
//     </ul>
//   );
// };

// export default IngredientList;
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";
// import { fetchIngredientsThunk } from "../../redux/operations/ingredientsOperations";
// import { selectIngredients } from "../../redux/selectors/ingredientsSelector";
// import { toast } from "react-toastify";
// import s from "./IngredientList.module.css";
// import { RiCheckboxBlankCircleFill } from "react-icons/ri";

// const IngredientList = ({ ingredientIds }) => {
//   const dispatch = useDispatch();
//   const {
//     items: allIngredients,
//     isLoading,
//     error,
//   } = useSelector(selectIngredients);

//   useEffect(() => {
//     if (!allIngredients?.length && !isLoading && !error) {
//       dispatch(fetchIngredientsThunk());
//     }
//   }, [dispatch, allIngredients, isLoading, error]);

//   useEffect(() => {
//     if (error) {
//       toast.error(`Failed to load ingredients: ${error}`);
//     }
//   }, [error]);

//   if (isLoading) {
//     return <p className={s.loading}>Loading ingredients...</p>;
//   }

//   if (error) {
//     return <p className={s.error}>Error loading ingredients</p>;
//   }

//   if (!Array.isArray(ingredientIds) || ingredientIds.length === 0) {
//     return <p className={s.noIngredients}>No ingredients available</p>;
//   }

//   const filteredIngredients = ingredientIds
//     .map(({ id, measure }) => {
//       const ingredient = allIngredients?.find((ing) => ing._id === id);
//       return ingredient ? { ...ingredient, measure } : null;
//     })
//     .filter(Boolean);

//   return (
//     <ul className={s.ingredientsContainer}>
//       {filteredIngredients.length > 0 ? (
//         filteredIngredients.map((ingredient, index) => (
//           <li key={index} className={s.ingredientsItem}>
//             <RiCheckboxBlankCircleFill className={s.ingredientsIcon} />
//             {ingredient.name} — {ingredient.measure}
//           </li>
//         ))
//       ) : (
//         <li className={s.noIngredients}>No matching ingredients found</li>
//       )}
//     </ul>
//   );
// };

// export default IngredientList;
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchIngredientsThunk } from "../../redux/operations/ingredientsOperations";
import {
  selectIngredients,
  selectIngredientsIsLoading,
  selectIngredientsError,
} from "../../redux/selectors/ingredientsSelector";
import { toast } from "react-toastify";
import s from "./IngredientList.module.css";
import { RiCheckboxBlankCircleFill } from "react-icons/ri";

const IngredientList = ({ ingredientIds }) => {
  const dispatch = useDispatch();
  const allIngredients = useSelector(selectIngredients);
  const isLoading = useSelector(selectIngredientsIsLoading);
  const error = useSelector(selectIngredientsError);

  useEffect(() => {
    if (!allIngredients?.length && !isLoading && !error) {
      dispatch(fetchIngredientsThunk());
    }
  }, [dispatch, allIngredients, isLoading, error]);

  useEffect(() => {
    if (error) {
      toast.error(`Failed to load ingredients: ${error}`);
    }
  }, [error]);

  if (isLoading) {
    return <p className={s.loading}>Loading ingredients...</p>;
  }

  if (error) {
    return <p className={s.error}>Error loading ingredients: {error}</p>;
  }

  if (!Array.isArray(ingredientIds) || ingredientIds.length === 0) {
    return <p className={s.noIngredients}>No ingredients available</p>;
  }

  const filteredIngredients = ingredientIds
    .map(({ id, measure }) => {
      const ingredient = allIngredients?.find((ing) => ing._id === id);
      return ingredient ? { ...ingredient, measure } : null;
    })
    .filter(Boolean);

  return (
    <ul className={s.ingredientsContainer}>
      {filteredIngredients.length > 0 ? (
        filteredIngredients.map((ingredient, index) => (
          <li key={index} className={s.ingredientsItem}>
            <RiCheckboxBlankCircleFill className={s.ingredientsIcon} />
            {ingredient.name} — {ingredient.measure}
          </li>
        ))
      ) : (
        <li className={s.noIngredients}>No matching ingredients found</li>
      )}
    </ul>
  );
};

export default IngredientList;
