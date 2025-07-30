import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RecipesList from "../../RecipesList/RecipesList.jsx";
import Loading from "../../Loading/Loading.jsx";
import LoadMoreBtn from "../../LoadMoreBtn/LoadMoreBtn.jsx";

import { fetchFavoriteRecipesThunk } from "../../../redux/operations/userOperation.js";
import {
  selectFavoriteRecipes,
  selectUser,
  selectUserError,
  selectUserIsLoading,
} from "../../../redux/selectors/userSelector.js";

const SavedRecipes = () => {
  const dispatch = useDispatch();
  const favoriteRecipes = useSelector(selectFavoriteRecipes) || [];
  const loading = useSelector(selectUserIsLoading);
  const error = useSelector(selectUserError);
  const user = useSelector(selectUser);

  const [visibleCount, setVisibleCount] = useState(12);

  useEffect(() => {
    if (user?.token) {
      dispatch(fetchFavoriteRecipesThunk());
    }
  }, [dispatch, user?.token]);

  useEffect(() => {
    if (favoriteRecipes.length > 0) {
      setVisibleCount(12);
    }
  }, [favoriteRecipes.length]);

  const visibleRecipes = favoriteRecipes.slice(0, visibleCount);

  const loadMore = () => {
    setVisibleCount((prev) => {
      const nextCount = prev + 12;
      return nextCount > favoriteRecipes.length
        ? favoriteRecipes.length
        : nextCount;
    });
  };

  const hasMore =
    favoriteRecipes.length > 12 &&
    visibleCount < favoriteRecipes.length &&
    !loading;

  if (loading && favoriteRecipes.length === 0) return <Loading />;
  if (error) return <>Error: {error}</>;

  return (
    <div>
      <RecipesList
        recipes={visibleRecipes}
        totallItems={favoriteRecipes.length}
        type="favorites"
      />
      {loading && favoriteRecipes.length > 0 && <Loading />}
      {hasMore && <LoadMoreBtn loadMore={loadMore} />}
    </div>
  );
};

export default SavedRecipes;
