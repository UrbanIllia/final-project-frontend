import { useEffect } from "react";
import { toast } from "react-toastify";
import RecipesList from "../../RecipesList/RecipesList.jsx";
import Loading from "../../Loading/Loading.jsx";
import LoadMoreBtn from "../../LoadMoreBtn/LoadMoreBtn.jsx";
import Filters from "../../Filters/Filters.jsx";
import NoResults from "../../Filters/NoResults/NoResults.jsx";

import { fetchFavoriteRecipesThunk } from "../../../redux/operations/userOperation.js";
import {
  selectFavoriteRecipes,
  selectUserIsLoading,
  selectUserError,
} from "../../../redux/selectors/userSelector.js";
import { useFilteredRecipes } from "../../../hooks/useFilteredRecipes.js";

const SavedRecipes = () => {
  const {
    isLoading,
    error,
    filteredRecipes,
    visibleRecipes,
    hasMore,
    loadMore,
    handleResetFilters,
  } = useFilteredRecipes(
    fetchFavoriteRecipesThunk,
    selectFavoriteRecipes,
    selectUserIsLoading,
    selectUserError
  );

  useEffect(() => {
    if (error) {
      toast.error(`Error: ${error}`);
    }
  }, [error]);

  if (isLoading && filteredRecipes.length === 0) return <Loading />;

  return (
    <div>
      <Filters showTitle={false} totalItems={filteredRecipes.length} />
      {filteredRecipes.length > 0 ? (
        <>
          <RecipesList recipes={visibleRecipes} type="favorites" />
          {hasMore && <LoadMoreBtn loadMore={loadMore} isLoading={isLoading} />}
        </>
      ) : (
        <NoResults onReset={handleResetFilters} />
      )}
    </div>
  );
};

export default SavedRecipes;
