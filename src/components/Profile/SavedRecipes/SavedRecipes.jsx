import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import RecipesList from "../../RecipesList/RecipesList.jsx";
import Loading from "../../Loading/Loading.jsx";

import { fetchFavoriteRecipesThunk } from "../../../redux/operations/userOperation.js";
import {
  selectFavoriteRecipes,
  selectUser,
  selectUserError,
  selectUserIsLoading,
} from "../../../redux/selectors/userSelector.js";

const SavedRecipes = () => {
  const dispatch = useDispatch();
  const favoriteRecipes = useSelector(selectFavoriteRecipes);
  const loading = useSelector(selectUserIsLoading);
  const error = useSelector(selectUserError);
  const user = useSelector(selectUser);

  useEffect(() => {
    if (user?.token) {
      dispatch(fetchFavoriteRecipesThunk());
    }
  }, [dispatch, user?.token]);

  if (loading) return <Loading />;
  if (error) return <>Error: {error}</>;

  return (
    <div>
      <RecipesList
        recipes={favoriteRecipes}
        totallItems={favoriteRecipes.length}
        type="favorites"
      />
    </div>
  );
};

export default SavedRecipes;
