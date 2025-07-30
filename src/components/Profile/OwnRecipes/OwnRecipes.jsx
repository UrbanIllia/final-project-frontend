import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import RecipesList from "../../RecipesList/RecipesList";
import LoadMoreBtn from "../../LoadMoreBtn/LoadMoreBtn";
import Loader from "../../Loading/Loading.jsx";
import {
  selectCurrentPage,
  selectHasMore,
  selectOwnRecipes,
  selectRecipesError,
  selectRecipesIsLoading,
  selectTotalItems,
} from "../../../redux/selectors/recipesSelector.js";
import {
  fetchOwnRecipesThunk,
  loadMoreRecipesThunk,
} from "../../../redux/operations/recipesOperation.js";
import NotFoundRecipes from "../../NotFoundRecipes/NotFoundRecipes.jsx";

const OwnRecipes = () => {
  const dispatch = useDispatch();

  const ownRecipes = useSelector(selectOwnRecipes);
  const isLoading = useSelector(selectRecipesIsLoading);
  const error = useSelector(selectRecipesError);
  const hasMore = useSelector(selectHasMore);
  const page = useSelector(selectCurrentPage);
  const totalItems = useSelector(selectTotalItems);

  useEffect(() => {
    dispatch(fetchOwnRecipesThunk());
  }, [dispatch]);

  const handleLoadMore = () => {
    if (!isLoading && hasMore) {
      dispatch(loadMoreRecipesThunk({ page: page + 1 }));
    }
  };

  if (isLoading && ownRecipes.length === 0) return <Loader />;
  if (error) return <p>Error: {error}</p>;
  if (!ownRecipes.length) return <NotFoundRecipes />;

  return (
    <div>
      <RecipesList recipes={ownRecipes} totallItems={totalItems} />
      {isLoading && ownRecipes.length > 0 && <Loader />}
      {hasMore && !isLoading && <LoadMoreBtn onLoad={handleLoadMore} />}
    </div>
  );
};

export default OwnRecipes;
